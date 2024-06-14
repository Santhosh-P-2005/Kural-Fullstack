import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get('https://kural-fullstack.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='home'>
      <h1>திருக்குறள்</h1>
      <UserForm getUsers={getUsers} />
      <UserList users={users} />
    </div>
  );
};

export default App;
