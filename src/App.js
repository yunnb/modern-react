import React, {useState, useRef, useMemo, useCallback, useReducer} from "react";
import './App.css';
import UserList from "./chapter_01/UserList";
import CreateUser from "./chapter_01/CreateUser";

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

// UserDispatch 라는 이름으로 내보내줌
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {users} = state;


  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <UserList users={users} />
        <div>Number of active users: {count}</div>
      </UserDispatch.Provider>
  );
}

export default App;
