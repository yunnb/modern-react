import React, {useState, useRef, useMemo, useCallback, useReducer} from "react";
import './App.css';
import UserList from "./chapter_01/UserList";
import CreateUser from "./chapter_01/CreateUser";
import useInputs from "./chapter_01/Hooks/useInputs";

function countActiveUsers(users) {
  console.log('Counting active users...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
            user.id === action.id ? {...user, active: !user.active} : user
        )
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [{username, email}, onChange, reset] = useInputs({
    username: '',
    email: '',
  })

  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const {users} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
      <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
        <div>Number of active users: {count}</div>
      </>

  );
}

export default App;
