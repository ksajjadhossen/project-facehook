import { useRef, useState } from "react"; // useState যোগ করা হয়েছে
import useAxios from "../../Hooks/useAxios";
import { useProfile } from "../../Hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const fileUploadRef = useRef();

  // ইনস্ট্যান্ট প্রিভিউ দেখানোর জন্য একটি লোকাল স্টেট
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // ১. সার্ভারে পাঠানোর আগেই ইউজারকে প্রিভিউ দেখান
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);

      dispatch({ type: actions.profile.DATA_FETCHING });

      const formData = new FormData();
      formData.append("avatar", file);

      // ২. এপিআই কল
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`,
        formData,
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPLOADED,
          data: response.data,
        });
        // সাকসেস হলে লোকাল প্রিভিউ সরিয়ে সার্ভার ইমেজ দেখাবো
        setPreviewImage(null);
      }
    } catch (error) {
      console.error(error);
      setPreviewImage(null); // এরর হলে আগের ছবিতে ফিরে যাবে
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  // ইমেজ সোর্স ডিসাইড করা
  // যদি লোকাল প্রিভিউ থাকে তবে সেটা, নাহলে সার্ভার ইমেজ
  const currentAvatar = previewImage
    ? previewImage
    : `${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}?t=${Date.now()}`;

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full border-2 border-gray-700 object-cover w-[180px] h-[180px]"
        src={currentAvatar}
        alt={state?.user?.firstName}
      />

      <button
        onClick={handleImageUpload}
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80 transition-all"
      >
        <img src={EditIcon} alt="Edit" />
      </button>

      <input
        type="file"
        id="file"
        hidden
        ref={fileUploadRef}
        onChange={uploadImageDisplay}
        accept="image/*"
      />
    </div>
  );
};

export default ProfileImage;
