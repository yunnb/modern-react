import React, {useContext, useEffect} from 'react';
import {UserDispatch} from "../App1";

const User = React.memo(
    function User({user, onRemove, onToggle}) {
        const dispatch = useContext(UserDispatch);

        return (
            <div>
                <b
                    style={{
                        cursor: 'pointer',
                        color: user.active ? 'green' : 'black'
                    }}
                    onClick={() => {
                        dispatch({type: 'TOGGLE_USER', id:user.id})
                    }}
                >
                    {user.username}
                </b>
                &nbsp;
                <span>({user.email})</span>
                <button onClick={() => {
                    dispatch({type: 'REMOVE_USER', id: user.id})
                }}>remove
                </button>
            </div>
        );
    }
);

function UserList({ users }) {
    return (
        <div>
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);