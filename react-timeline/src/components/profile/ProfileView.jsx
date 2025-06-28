/**
 * ProfileView component displays the user's email with options to edit profile or return.
 * 
 * Props:
 * - email: user's email address (string)
 * - onEdit: callback to trigger editing mode
 * - onReturn: callback to navigate back to the choose page
 *
 * Features:
 * - Responsive layout with clear labeling
 * - Two action buttons with consistent styling and hover effects
 */

const ProfileView = ({ email, onEdit, onReturn }) => {
  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-4">
          <label className="font-bold text-[#006A71] dark:text-gray-100 w-full sm:w-32 mb-1 sm:mb-0">Email:</label>
          <span className="text-gray-700 dark:text-gray-300">{email}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={onEdit}
          className="bg-[#006A71] dark:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#10b2bd] dark:hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
        <button
          onClick={onReturn}
          className="bg-[#006A71] dark:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#10b2bd] dark:hover:bg-blue-700 transition"
        >
          Return to Choose
        </button>
      </div>
    </>
  );
};

export default ProfileView;
