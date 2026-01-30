import { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import { useAuth } from "../Hooks/useAuth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.user?.id) return;

      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );

        if (response.data) {
          setUser(response.data.user);
          setPosts(response.data.posts);
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth?.user?.id, api]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Fetching your profile data....
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* profile info */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* profile image */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
              className="max-w-full rounded-full border-2 border-gray-700"
              src={user?.avatar || "/assets/images/avatars/avatar_1.png"}
              alt={user?.firstName}
            />

            <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
              <img src="/assets/icons/edit.svg" alt="Edit" />
            </button>
          </div>

          {/* name , email */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg text-gray-400">
              {user?.email}
            </p>
          </div>

          {/* bio */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {user?.bio || "No bio available."}
              </p>
              <span className="text-sm text-lwsGreen mt-2 block">
                Total Posts: {posts?.length || 0}
              </span>
            </div>

            <button className="flex-center h-7 w-7 rounded-full">
              <img src="/assets/icons/edit.svg" alt="Edit" />
            </button>
          </div>

          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl text-white">
          Your Posts
        </h4>

        {/* Dynamic Posts Rendering */}
        {posts?.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="card mt-6 lg:mt-8 bg-lighterDark p-4 rounded-lg"
            >
              <header className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="max-w-10 max-h-10 rounded-full"
                    src={user?.avatar || "/assets/images/avatars/avatar_1.png"}
                    alt="avatar"
                  />
                  <div>
                    <h6 className="text-lg lg:text-xl text-white">
                      {user?.firstName} {user?.lastName}
                    </h6>
                    <div className="flex items-center gap-1.5">
                      <img src="/assets/icons/time.svg" alt="time" />
                      <span className="text-sm text-gray-400">12 min ago</span>
                    </div>
                  </div>
                </div>
              </header>

              <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl text-gray-300">
                {post?.image && (
                  <div className="flex items-center justify-center overflow-hidden mb-4">
                    <img
                      className="max-w-full rounded"
                      src={post.image}
                      alt="post"
                    />
                  </div>
                )}
                <p>{post?.content}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between py-4">
                <button className="flex items-center gap-2 text-[#B8BBBF] hover:text-white">
                  <img src="/assets/icons/like.svg" alt="Like" />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-[#B8BBBF] hover:text-white">
                  <img src="/assets/icons/comment.svg" alt="Comment" />
                  <span>Comment ({post?.comments?.length || 0})</span>
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500 mt-4">You haven't posted anything yet.</p>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
