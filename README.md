# 벨로퍼트와 함께하는 모던 리액트
## 목차
[# 05. props 를 통해 컴포넌트에게 값 전달하기](#05-props-를-통해-컴포넌트에게-값-전달하기)  
[# 06. 조건부 렌더링](#06-조건부-렌더링)  
[# 07. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](#07-usestate-를-통해-컴포넌트에서-바뀌는-값-관리하기)  
[# 08. input 상태 관리하기](#08-input-상태-관리하기)  
[# 09. 여러개의 input 상태 관리하기](#09-여러개의-input-상태-관리하기)

## 05. props 를 통해 컴포넌트에게 값 전달하기
### props 는 객체 형태로 전달  
```javascript
function Hello(props) {
    return <div>Hello {props.name}</div>
}
```

### 비구조화 할당
```javascript
function Hello({color, name}) {
    return <div style={{ color }}>Hello {name}</div>
}
```

### props 기본값 설정
```javascript
Hello.defaultProps = {
    name: "no-name",
};
```

### 컴포넌트 태그 사이 넣은 값 조회
```javascript
function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}
```
```javascript
function Wrapper({ children }) {
  return (
    <div style={style}>
      {children}
    </div>
  );
}
```
props.children 을 렌더링해주어야 함


## 06. 조건부 렌더링
```javascript
<Hello name="react" color="red" isSpecial={true}/>
```
isSpecial 은 자바스크립트 값이므로 중괄호로 감싸줌 
### props 값 설정 생략 = {true}
```javascript
<Hello name="react" color="red" isSpecial />
```

## 07. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기
### Element 에 Event 설정
```
```javascript
on이벤트이름={실행하고싶은함수}
```
### useState
컴포넌트에서 동적인 값을 상태(state)라고 함  
```javascript
const [number, setNumber] = useState(0);
```
``useState`` 사용 시 상태의 기본값을 파라미터로 넣어 호출  
함수 호출 시 배열이 반환되는데, ``[현재 상태, Setter 함수]`` 반환

### 함수형 업데이트 
기존 코드
```javascript
 const onIncrease = () => {
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }
```
함수형 업데이트 코드
```javascript
const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  }
```
``onIncrease``와 ``onDecrease`` 에서 ``setNumber`` 사용 시
그 다음 상태를 파라미터로 넣어준 것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어줌   
→ 함수형 업데이트는 주로 컴포넌트를 최적화할 때 사용

>``prevNumber`` 는 선언한 적이 없는데 어떻게 사용할 수 있을까?  
> 우선 ``prevNumber`` 는 개발자가 임의로 작성한 변수명 
> ```javascript
> prevNumber => prevNumber + 1
> ```
> arrow function을 사용해서 축약한 함수.  
> setNumber라는 setter 안에 함수를 인자로 넣어서 사용하기 때문에 함수형 업데이트라고 부름
> ```javascript
> // prevNumber => prevNumber + 1 와 동일한 함수
> function noName (prevNumber) { 
> return prevNumber + 1;
> }
> ```
> ```javascript
> // 익명 함수로 변경 
> function (preveNumber) { 
> return prevNumber +1;
> }
> ```
> ```javascript
> // arrow function 으로 변경
> (prevNumber) => return prevNumber + 1; 
> ```
> ```javascript
> // arrow function 에서 실행줄이 1줄이면 return 생략 가능 
> (prevNumver) => prevNumber +1; 
> ```

## 08. input 상태 관리하기
### onChange 이벤트
```javascript
function InputSample() {
    const [text, setText] = useState('');
 
    const onChange = (e) => {
        setText(e.target.value);
    };
    
    return (
        <div>
            <input onChange={onChange} value={text} />
            <div>
                <b>value: {text} </b>
            </div>
        </div>
    );
}
```
``onChange`` 이벤트는 이벤트 객체 ``e``를 파라미터로 받아와서 사용 가능  
이 객체의 ``e.target``은 이벤트가 발생한 DOM인 input DOM을 가리킴  
이 DOM의 ``value`` 값, 즉 ``e.target.value`` 를 조회하면 현재 input 입력 값 알 수 있음

input 상태 관리 시 input 태그의 value 값도 설정해주는 것이 중요.  
그래야 상태가 바뀌었을 때 input 내용 업데이트 

## 09. 여러개의 input 상태 관리하기
input의 객체가 여러 개일 때는, 단순히 ``useState``와``onChange`` 여러 번 사용하는 것보다  
input에 ``name``을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이 더 좋은 방법  
그리고 ``useState``에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 함 
```javascript
import React, { useState } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });

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
    };

    return (
        <div>
            <input name='name' placeholder='name' onChange={onChange} value={name} />
            <input name='nickname' placeholder='nickname' onChange={onChange} value={nickname} />
            <button onClick={onReset}>reset</button>
            <div>
                <b>value: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;
```
리액트에서 객체 수정 시 
```javascript
inputs [name] = value;
```
이런 식으로 수정하면 안됨.  
새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 함 
```javascript
setInputs({
    ...inputs,
    [name]: value
});
```
``...``: spread 문법. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사함  
=> "불변성을 지킨다"   
- 리액트 컴포넌트에서 상태 업데이트 감지 가능. 필요에 따른 리렌더링 수행  
``inputs[name] = value``처럼 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링 되지 않음   
- 제대로 된 컴포넌트 업데이트 성능 최적화 가능 