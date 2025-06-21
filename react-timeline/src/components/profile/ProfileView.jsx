import { useState } from 'react';

const ProfileView = ({ email, onEdit, onReturn }) => {
  return (
    <>
      <div className="profile-info">
        <div className="info-item">
          <label>Email:</label>
          <span>{email}</span>
        </div>
      </div>

      <div className="button-row">
        <button onClick={onEdit} className="edit-button">Edit Profile</button>
        <button onClick={onReturn} className="return-button">Return to Choose</button>
      </div>
    </>
  );
};

export default ProfileView;