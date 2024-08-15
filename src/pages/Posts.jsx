import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPosts(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.id} className="mb-6 overflow-hidden rounded-lg bg-white p-4 shadow-lg md:p-6">
        <div className="mb-4 flex items-center">
          <img
            src={post.avatar}
            alt={`${post.firstName} ${post.lastName}`}
            className="mr-4 h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {post.firstName} {post.lastName}
            </h3>
          </div>
        </div>
        <p className="mb-4 text-gray-800">{post.writeup}</p>
        {post.image && (
          <img src={post.image} alt="Post content" className="h-auto w-full rounded-lg" />
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold">Posts</h2>
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{renderPosts()}</div>
      )}
    </div>
  );
};

export default Posts;
