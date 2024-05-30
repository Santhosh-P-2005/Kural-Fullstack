import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserDetail = ({ user, getUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`https://kural-fullstack.onrender.com/users/${user._id}`, { name, email, age });
      getUsers();
      setIsEditing(false);
      setMessage('User updated successfully!');
    } catch (err) {
      setMessage('Failed to update user.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://kural-fullstack.onrender.com/users/${user._id}`);
        getUsers();
        setMessage('User deleted successfully!');
      } catch (err) {
        setMessage('Failed to delete user.');
        console.error(err);
      }
    }
  };

  return (
    <Container>
      {isEditing ? (
        <EditForm>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </EditForm>
      ) : (
        <UserInfo>
          <span>{age}</span> . <span>{name}</span>
          <br/><br/><b>விளக்கம் : </b> <span>{email}</span>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </UserInfo>
      )}
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 5px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const Message = styled.div`
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  background-color: #e7f3e7;
  color: #3c763d;
`;
