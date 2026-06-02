export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  content: string;
  author: string;
  imageUrl?: string;
  authorImageUrl?: string;
  authorRole?: string;
}
