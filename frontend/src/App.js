import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>CRUD App</h1>
      <UserForm getUsers={getUsers} />
      <UserList users={users} />
    </div>
  );
};

export default App;
