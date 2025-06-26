const ProfileView = ({ email, onEdit, onReturn }) => {
  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 rounded-md p-4 mb-4">
          <label className="font-bold text-[#006A71] w-full sm:w-32 mb-1 sm:mb-0">Email:</label>
          <span className="flex-1 break-all">{email}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={onEdit}
          className="bg-[#006A71] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#10b2bd] transition"
        >
          Edit Profile
        </button>
        <button
          onClick={onReturn}
          className="bg-[#006A71] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#10b2bd] transition"
        >
          Return to Choose
        </button>
      </div>
    </>
  );
};

export default ProfileView;
