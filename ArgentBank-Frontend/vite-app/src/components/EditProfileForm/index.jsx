/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/userSlice';
import PropTypes from 'prop-types';

const EditProfileForm = ({ onSave, onCancel }) => {
  // access data from store
  const { firstName, lastName, userName } = useSelector((state) => state.user.profile);
  
  const dispatch = useDispatch();

  // local state to manage username edit
  const [editedUserName, setEditedUserName] = useState(userName);

  // handle change in username
  const handleUserNameChange = (e) => {
    setEditedUserName(e.target.value);
  };

  // Function to save update in store
  const handleSave = () => {
    dispatch(updateUserProfile({ userName: editedUserName }));
    onCancel();
  };

  return (
    <>
      <h1>Edit user info</h1>
      <form className="edit-profile-form">
        <div className="form-row">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={editedUserName}
            onChange={handleUserNameChange}
            autoComplete='on' />
        </div>
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            readOnly />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            readOnly />
        </div>
        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

EditProfileForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfileForm;