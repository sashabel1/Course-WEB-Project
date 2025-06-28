/**
 * ProfileForm component renders a user profile editing form.
 * 
 * Props:
 * - formData: object containing email, newPassword, and confirmPassword fields
 * - handleInputChange: function to update form data on input change
 * - handleSubmit: function called on form submission to save changes
 * - cancelEdit: function to cancel editing and reset the form
 *
 * Features:
 * - Inputs for email and password change (with confirmation)
 * - Responsive layout with accessible labels
 * - Save and Cancel buttons with hover effects
 */

const ProfileForm = ({ formData, handleInputChange, handleSubmit, cancelEdit }) => (
  <form onSubmit={handleSubmit} className="mt-8 w-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 dark:bg-gray-700 rounded-md p-4">
      <label className="font-bold text-[#006A71] dark:text-gray-100 w-full sm:w-32 mb-1 sm:mb-0">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
        required
      />
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 dark:bg-gray-700 rounded-md p-4">
      <label className="font-bold text-[#006A71] dark:text-gray-100 w-full sm:w-32 mb-1 sm:mb-0">New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
      />
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 dark:bg-gray-700 rounded-md p-4">
      <label className="font-bold text-[#006A71] dark:text-gray-100 w-full sm:w-32 mb-1 sm:mb-0">Confirm New Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
      />
    </div>

    <div className="flex gap-4 justify-center mt-6">
      <button
        type="submit"
        className="bg-green-600 dark:bg-green-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={cancelEdit}
        className="bg-red-600 dark:bg-red-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default ProfileForm;
