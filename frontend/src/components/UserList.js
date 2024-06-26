import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';
import './UserList.css';

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://kural-fullstack.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const getUsers = () => {
    axios.get('https://kural-fullstack.onrender.com/users')
    .then(response => {
      const sortedUsers = response.data.sort((a, b) => a.age - b.age);
      setUsers(sortedUsers);
      setLoading(false);
    })
      .catch(error => console.error(error));
  };

  setInterval(getUsers,2000);

  return (
    <div>
     {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
      <div className="user-list-container">
        <h2 className="title">குறள்கள்</h2>
        <ul className="user-list">
          {users.map(user => (
            <UserDetail key={user._id} user={user} getUsers={getUsers} />
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default UserList;
