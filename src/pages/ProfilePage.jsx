import { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import { useAuth } from "../Hooks/useAuth";
import { useProfile } from "../Hooks/useProfile";
import { actions } from "../actions";
import ProfileImage from "../components/profile/ProfileImage";
import Bio from "../components/profile/Bio";
import ProfileInfo from "../components/profile/ProfileInfo";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  const user = state?.user;
  const posts = state?.posts;

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      if (!auth?.user?.id) return;

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (err) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: err.message,
        });
        console.error("Fetch Error:", err);
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Fetching your profile data....
      </div>
    );
  }

  if (state?.error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {state?.error}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* profile info */}
        <ProfileInfo></ProfileInfo>

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
