"use client";
import {
  deletePost,
  fetchPosts,
  updatePost,
} from "@/redux/features/posts/postSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PostLists() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: posts,
    loading,
    error,
    total,
  } = useSelector((state: RootState) => state.posts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit: postsPerPage }));
  }, [dispatch, currentPage]);
  const totalPages = Math.ceil(total / postsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleEdit = (post: { id: number; title: string; body: string }) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch(updatePost({ id: editingId, title: editTitle, body: editBody }));
      setEditingId(null);
      setEditTitle("");
      setEditBody("");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Posts
      </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow"
          >
            {editingId === post.id ? (
              <form
                onSubmit={handleUpdate}
                className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  Edit Post
                </h2>

                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  placeholder="Edit title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  required
                  placeholder="Edit body"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <strong className="text-lg text-blue-600 block mb-2">
                  {post.title}
                </strong>
                <p className="text-gray-700">{post.body}</p>
                <button
                  className="bg-blue-400 px-5 py-2 rounded text-white"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-400 px-5 py-2 rounded text-white ml-5"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "1rem" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              background: i + 1 === currentPage ? "black" : "white",
              color: i + 1 === currentPage ? "white" : "black",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PostLists;
