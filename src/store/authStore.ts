import { reactive } from 'vue';
import { supabase } from '../supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string | null;
  role?: 'owner' | 'editor' | 'reviewer' | 'user';
  is_admin?: boolean;
  can_create_campaigns?: boolean;
}

const state = reactive({
  user: null as User | null,
  profile: null as UserProfile | null,
  loading: true,
  initialized: false,
  authError: '' as string,
  message: '' as string,
});

const loadProfile = async (user: User | null) => {
  state.profile = null;
  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, is_admin, can_create_campaigns')
    .eq('id', user.id)
    .single();

  if (error) {
    console.warn('Failed to load profile:', error.message);
    state.profile = {
      id: user.id,
      email: user.email ?? null,
      role: 'user',
      is_admin: false,
      can_create_campaigns: false,
    };
    return;
  }

  state.profile = data ?? {
    id: user.id,
    email: user.email ?? null,
    role: 'user',
    is_admin: false,
    can_create_campaigns: false,
  };
};

export const useAuthStore = () => {
  const initAuth = async () => {
    if (state.initialized) {
      return;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      state.authError = error.message;
    }

    state.user = session?.user ?? null;
    await loadProfile(state.user);

    supabase.auth.onAuthStateChange(async (_event, session: Session | null) => {
      state.user = session?.user ?? null;
      await loadProfile(state.user);
    });

    state.initialized = true;
    state.loading = false;
  };

  const signInWithEmail = async (email: string) => {
    state.authError = '';
    state.message = '';

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      state.authError = error.message;
      return false;
    }

    state.message = 'Check your email for a sign-in link.';
    return true;
  };

  const signOut = async () => {
    state.authError = '';
    const { error } = await supabase.auth.signOut();
    if (error) {
      state.authError = error.message;
      return false;
    }

    state.user = null;
    state.profile = null;
    return true;
  };

  const isAdmin = () => !!state.profile?.is_admin;
  const isOwner = () => state.profile?.role === 'owner';
  const isEditor = () => state.profile?.role === 'editor';
  const isReviewer = () => state.profile?.role === 'reviewer';

  return {
    state,
    initAuth,
    signInWithEmail,
    signOut,
    isAdmin,
    isOwner,
    isEditor,
    isReviewer,
  };
};
