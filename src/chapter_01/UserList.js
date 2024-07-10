import React, {useEffect} from 'react';

function User({ user, onRemove, onToggle}) {
    useEffect(() => {
        console.log('User value set');
        console.log(user);
        return () => {
            console.log('Before the user changes...');
            console.log(user);
        };
    }, [user]);
    
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>remove</button>
        </div>
    );
}

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);