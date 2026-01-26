// images

import avatar from "../assets/images/avatars/avatar_1.png";
import poster from "../assets/images/poster.png";

// icons

import addPhotoIcon from "../assets/icons/addPhoto.svg";
import closeIcon from "../assets/icons/close.svg";
import Header from "../components/Shared/Header";
import { useAuth } from "../Hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      {/* CREATE POST */}
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
              Create Post
            </h6>

            <button className="absolute right-3 top-3">
              <img src={closeIcon} alt="close" />
            </button>

            <form>
              <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatar}
                    alt="avatar"
                  />
                  <div>
                    <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
                    <span className="text-sm text-gray-400 lg:text-base">
                      Public
                    </span>
                  </div>
                </div>

                <label
                  className="btn-primary cursor-pointer !text-gray-100"
                  htmlFor="photo"
                >
                  <img src={addPhotoIcon} alt="Add Photo" />
                  Add Photo
                </label>

                <input type="file" id="photo" className="hidden" />
              </div>

              <textarea
                className="mb-4 h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                placeholder="Share your thoughts..."
              />

              {/* Image Preview */}
              <div className="mx-auto mb-4 flex max-w-[90%] items-center justify-center">
                <div className="relative">
                  <img className="max-w-full" src={poster} alt="post" />
                  <button className="absolute right-2 top-2">
                    <img src={closeIcon} alt="remove" />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#3F3F3F] pt-4">
                <button
                  className="auth-input bg-lwsGreen font-bold text-deepDark"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
