import { useState } from "react";
import { useProfile } from "../../Hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/check.svg";
import { actions } from "../../actions/index.js";
import { api } from "../../api/index.js";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio },
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.USER_DATA_EDITED,
        data: error.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio || "No bio available."}
          </p>
        ) : (
          <textarea
            value={bio}
            rows={4}
            cols={55}
            className="p-2 leading-[188%] text-black lg:text-lg rounded-md"
            id=""
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        )}

        <span className="text-sm text-lwsGreen mt-2 block">
          Total Posts: {state?.posts?.length || 0}
        </span>
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center  h-7 w-7 rounded-full"
        >
          <img src={checkIcon} alt="check" />
        </button>
      )}
    </div>
  );
};

export default Bio;
