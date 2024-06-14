import React, { useState } from 'react';
import axios from 'axios';
import './UserDetail.css';

const UserDetail = ({ user, getUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [message, setMessage] = useState('');
  const kural = name.split(" ");

  const handleUpdate = async () => {
    try {
      await axios.put(`https://kural-fullstack.onrender.com/users/${user._id}`, { name, email, age }).then(() => {
        setIsEditing(false);
        showupdatemessage('குறள் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
      })
      // setMessage('குறள் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
    } catch (err) {
      // setMessage('குறளைப் புதுப்பிக்க முடியவில்லை.');
      showupdatemessage('குறளைப் புதுப்பிக்க இயலவில்லை.');
      console.error(err);
      }
      };
      
      const handleDelete = async () => {
        if (window.confirm('இந்த குறளை நிச்சயமாக நீக்க வேண்டுமா?')) {
          try {
            await axios.delete(`https://kural-fullstack.onrender.com/users/${user._id}`).then(() => {
              showupdatemessage('குறள் வெற்றிகரமாக நீக்கப்பட்டது!');
            })
            // setMessage('குறள் வெற்றிகரமாக நீக்கப்பட்டது!');
            } catch (err) {
              // setMessage('குறளை நீக்க முடியவில்லை.');
              showupdatemessage('குறளை நீக்க இயலவில்லை.');
              console.error(err);
      }
    }
  };

  function showupdatemessage(msg) {
    setMessage(msg);
    const errorContainer = document.getElementById('update-container');
    errorContainer.classList.remove('hidden');
    errorContainer.classList.add('show');

    setTimeout(() => {
        errorContainer.classList.remove('show');
        setTimeout(() => {
            errorContainer.classList.add('hidden');
        }, 5000);
    }, 5000);
}


  return (
    <div className="container">
      {isEditing ? (
        <>
        <div className="edit-form">
          <span>எண் : <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input" /></span>
          <span>குறள் : <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" /></span>
          <span>பொருள் : <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" /></span>
          <span><button onClick={handleUpdate} className="button-update">Update</button>
          <button onClick={() => setIsEditing(false)} className="button-cancel">Cancel</button></span>
        </div>
      </>
      ) : (
        <>
        <div className="user-info">
          <span>{age} . {kural.slice(0, 4).join(" ")}</span>
          <span>{kural.slice(4).join(" ")}</span>
          <br/><b>விளக்கம் : </b> <span>{email}<br/><br/>
          <button onClick={() => setIsEditing(true)} className="button-edit">Edit</button>
          <button onClick={handleDelete} className="button-delete">Delete</button></span>
        </div>
        </>
      )}
      <div id="update-container" className="hidden">{message}</div>
    </div>
  );
};

export default UserDetail;
