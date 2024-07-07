import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });

    const nameInput = useRef(null);

    const {name, nickname} = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const {value, name} = e.target;  // 우선 e.target 에서 name 과 value 추출
        setInputs({
            ...inputs,  // 기존 input 객체 복사
            [name]: value,  // name 키를 가진 값을 value 로 설정
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus();
    };

    return (
        <div>
            <input
                name='name'
                placeholder='name'
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name='nickname'
                placeholder='nickname'
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>reset</button>
            <div>
                <b>value: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;