import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';
import image from '../photos/thirukkural.png'

const UserForm = ({ getUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    const list = name.split(" ")
    const value = email.split("");
    console.log(value[0]);
    console.log(age);
    if(list[0]!=null && list[1]!=null && list[2]!=null && list[3]!=null && list[4]!=null && list[5]!=null && list[6]!=null)
      {
        if(value[0]!=null)
          {
            if(age>0 && age<1331)
              {
                e.preventDefault();
                try {
                  await axios.post('https://kural-fullstack.onrender.com/users', { name, email, age }).then(() => {
                    showmessage('குறள் வெற்றிகரமாக சேர்க்கப்பட்டது!');
                  })
                  getUsers();
                  setName('');
                  setEmail('');
                  setAge('');
                } catch (err) {
                  showmessage('குறளை சேர்க்க இயலவில்லை');
                  console.error(err);
                }
              }
              else{
                window.alert("சரியான குறள் எண் கொடுக்கவும்");
              }
          }
          else{
            window.alert("சரியான பொருளை எழுதவும்");
          }
      }
      else{
        window.alert("சரியான திருக்குறளை எழுதவும்");
      }
  };

   function showmessage(msg) {
    setMessage(msg);
    const errorContainer = document.getElementById('update');
    errorContainer.classList.remove('hidden');
    errorContainer.classList.add('show');

    setTimeout(() => {
        errorContainer.classList.remove('show');
        setTimeout(() => {
            errorContainer.classList.add('hidden');
            setMessage('')
        }, 5000);
    }, 5000);
}

  return (
    <form onSubmit={handleSubmit} className="user-form">
    <div className='firstdiv'>
      <div className="form-group">
        <label htmlFor="age">எண் : </label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="name">குறள் : </label>
        <input type="textarea" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="email">பொருள் : </label>
        <textarea type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      </div>
      <span><button type="submit" className="button">+Add குறள்</button></span>
    </div>
      <div>
      <div id="update" className="hidden">{message}</div>
      <img src={image}></img>
      </div>
    </form>
  );
};

export default UserForm;
