const ProfileForm = ({ formData, handleInputChange, handleSubmit, cancelEdit }) => (
  <form onSubmit={handleSubmit} className="edit-form">
    <div className="form-group">
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
    </div>
    <div className="form-group">
      <label>New Password:</label>
      <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Confirm New Password:</label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
    </div>
    <div className="button-group">
      <button type="submit" className="save-button">Save Changes</button>
      <button type="button" onClick={cancelEdit} className="cancel-button">Cancel</button>
    </div>
  </form>
);

export default ProfileForm;
