import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ getUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://kural-fullstack.onrender.com/users', { name, email, age });
      getUsers();
      setName('');
      setEmail('');
      setAge('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="age">எண் : </label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="name">குறள் : </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="email">பொருள் : </label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      </div>
      <span><button type="submit" className="button">+Add குறள்</button></span>
    </form>
  );
};

export default UserForm;
