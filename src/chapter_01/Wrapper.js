import React from 'react';

function Wrapper({children}) {
    const style = {
        border: '2px solid black',
        padding: '16px',
    };

    return (
        <div style={style}>
            {children}  {/*자식 컴포넌트 출력*/}
        </div>
    )
}

export default Wrapper;