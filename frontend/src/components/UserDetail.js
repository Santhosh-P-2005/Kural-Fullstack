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
      await axios.put(`https://kural-fullstack.onrender.com/users/${user._id}`, { name, email, age });
      getUsers();
      setIsEditing(false);
      setMessage('குறள் updated successfully!');
    } catch (err) {
      setMessage('Failed to update குறள்.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this குறள்?')) {
      try {
        await axios.delete(`https://kural-fullstack.onrender.com/users/${user._id}`);
        getUsers();
        setMessage('குறள் deleted successfully!');
      } catch (err) {
        setMessage('Failed to delete குறள்.');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      {isEditing ? (
        <div className="edit-form">
          <span>எண் : <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input" /></span>
          <span>குறள் : <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" /></span>
          <span>பொருள் : <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" /></span>
          <span><button onClick={handleUpdate} className="button-update">Update</button>
          <button onClick={() => setIsEditing(false)} className="button-cancel">Cancel</button></span>
        </div>
      ) : (
        <div className="user-info">
          <span>{age} . {kural[1] + " " + kural[2] + " " + kural[3] + " " + kural[4]}</span>
          <span>{kural[5] + " " + kural[6] + " " + kural[7]}</span>
          <br/><b>விளக்கம் : </b> <span>{email}<br/><br/>
          <button onClick={() => setIsEditing(true)} className="button-edit">Edit</button>
          <button onClick={handleDelete} className="button-delete">Delete</button></span>
        </div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default UserDetail;
