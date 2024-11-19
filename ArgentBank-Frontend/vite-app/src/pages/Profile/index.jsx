/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Account from '../../components/Account'
import EditProfileForm from '../../components/EditProfileForm';

const Profile = () => {

  // user profile data access from store
  const { firstName, lastName } = useSelector((state) => state.user.profile);
  const [isEditing, setIsEditing] = useState(false);

  // Function to save update and hide form
  const handleSave = () => {
    setIsEditing(false); // hide form after save
  };

  // Function to jump between form display and welcoming message
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditProfileForm onSave={handleSave} onCancel={toggleEdit} />
        ) : (
          <>
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            <button className="edit-button" onClick={toggleEdit}>Edit Name</button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance" />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance" />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance" />
    </main>
  )
};

export default Profile;