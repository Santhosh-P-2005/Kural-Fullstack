import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://kural-fullstack.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  
  const getUsers = () => {
    axios.get('https://kural-fullstack.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Kural List</h2>
      <ul>
        {users.map(user => (
          <UserDetail key={user._id} user={user} getUsers={getUsers} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
