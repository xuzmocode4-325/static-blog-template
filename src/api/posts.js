export const fetchPosts = async () => {
    const response = await fetch('/api/posts.json');
    if (!response.ok) {
        throw new Error(`Failed to load posts: ${response.status} ${response.statusText}`);
    }
    return (await response.json());
};
//# sourceMappingURL=posts.js.map