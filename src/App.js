import React, {useRef} from "react";
import logo from './logo.svg';
import './App.css';
import Hello from "./chapter_01/Hello";
import Wrapper from "./chapter_01/Wrapper";
import Counter from "./chapter_01/Counter";
import InputSample from "./chapter_01/InputSample";
import UserList from "./chapter_01/UserList";

function App() {
  const users = [
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
  ];

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직

    nextId.current += 1;
  };

  return (
    <UserList users={users}/>
  );
}

export default App;
