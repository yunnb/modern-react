import React, {useRef, useState} from "react";
import logo from './logo.svg';
import './App.css';
import Hello from "./chapter_01/Hello";
import Wrapper from "./chapter_01/Wrapper";
import Counter from "./chapter_01/Counter";
import InputSample from "./chapter_01/InputSample";
import UserList from "./chapter_01/UserList";
import CreateUser from "./chapter_01/CreateUser";

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;
  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }


  const [users, setUsers] =  useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };

    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });

    nextId.current += 1;
  };

  return (
      <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users}/>
      </>

  );
}

export default App;
