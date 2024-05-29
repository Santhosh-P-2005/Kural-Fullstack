import React, { useState } from 'react';
import axios from 'axios';

const UserDetail = ({ user, getUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://kural-fullstack.onrender.com/users/${user._id}`, { name, email, age });
      getUsers();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://kural-fullstack.onrender.com/users/${user._id}`);
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <span>{age}</span> . <span>{name}</span> <br/><br/><b>விளக்கம் : </b> <span>{email}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
