# 벨로퍼트와 함께하는 모던 리액트
## 목차
[# 05. props 를 통해 컴포넌트에게 값 전달하기](#05-props-를-통해-컴포넌트에게-값-전달하기)  
[# 06. 조건부 렌더링](#06-조건부-렌더링)  
[# 07. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](#07-usestate-를-통해-컴포넌트에서-바뀌는-값-관리하기)  
[# 08. input 상태 관리하기](#08-input-상태-관리하기)  
[# 09. 여러개의 input 상태 관리하기](#09-여러개의-input-상태-관리하기)  
[# 10. useRef 로 특정 DOM 선택하기](#10-useref-로-특정-dom-선택하기)  
[# 11. 배열 렌더링하기](#11-배열-렌더링하기)  
[# 12. useRef 로 컴포넌트 안의 변수 만들기](#12-useref-로-컴포넌트-안의-변수-만들기)  
[# 13. 배열에 항목 추가하기](#13-배열에-항목-추가하기)  
[# 14. 배열에 항목 제거하기](#14-배열에-항목-제거하기)  
[# 15. 배열 항목 수정하기](#15-배열-항목-수정하기)  
[# 16. useEffect 를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기](#16-useeffect-를-사용하여-마운트언마운트업데이트시-할-작업-설정하기)  
[# 17. useMemo 를 사용하여 연산한 값 재사용하기](#17-usememo-를-사용하여-연산한-값-재사용하기)  
[# 18. useCallback 을 사용하여 함수 재사용하기](#18-usecallback-을-사용하여-함수-재사용하기)  
[# 19. React.memo 를 사용한 컴포넌트 리렌더링 방지](#19-reactmemo-를-사용한-컴포넌트-리렌더링-방지)  
[# 20. useReducer 를 사용하여 상태 업데이트 로직 분리하기](#20-usereducer-를-사용하여-상태-업데이트-로직-분리하기)  
[# 21. 커스텀 Hooks 만들기](#21-커스텀-hooks-만들기)  

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
`useState` 사용 시 상태의 기본값을 파라미터로 넣어 호출  
함수 호출 시 배열이 반환되는데, `[현재 상태, Setter 함수]` 반환

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
`onIncrease`와 `onDecrease` 에서 `setNumber` 사용 시
그 다음 상태를 파라미터로 넣어준 것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어줌   
→ 함수형 업데이트는 주로 컴포넌트를 최적화할 때 사용

### 추가 공부 내용
>`prevNumber` 는 선언한 적이 없는데 어떻게 사용할 수 있을까?  
> 우선 `prevNumber` 는 개발자가 임의로 작성한 변수명 
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
> (prevNumber) => {return prevNumber + 1}; 
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
`onChange` 이벤트는 이벤트 객체 `e`를 파라미터로 받아와서 사용 가능  
이 객체의 `e.target`은 이벤트가 발생한 DOM인 input DOM을 가리킴  
이 DOM의 `value` 값, 즉 `e.target.value` 를 조회하면 현재 input 입력 값 알 수 있음

input 상태 관리 시 input 태그의 value 값도 설정해주는 것이 중요.  
그래야 상태가 바뀌었을 때 input 내용 업데이트 

## 09. 여러개의 input 상태 관리하기
input의 객체가 여러 개일 때는, 단순히 `useState`와`onChange` 여러 번 사용하는 것보다  
input에 `name`을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이 더 좋은 방법  
그리고 `useState`에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 함 
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

리액트에서 객체 수정 시 아래처럼 직접 값 수정하면 안됨 
```javascript
inputs [name] = value;
```
새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 함 
```javascript
setInputs({
    ...inputs,
    [name]: value
});
```
`...`: spread 문법. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사함  
=> "불변성을 지킨다"   
- 리액트 컴포넌트에서 상태 업데이트 감지 가능. 필요에 따른 리렌더링 수행  
`inputs[name] = value`처럼 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링 되지 않음   
- 제대로 된 컴포넌트 업데이트 성능 최적화 가능 

### 추가 공부 내용
>```javascript
>const onChange = (e) => {
>       const {value, name} = e.target;  // 우선 e.target 에서 name 과 value 추출
>       setInputs({
>           ...inputs,  // 기존 input 객체 복사
>           [name]: value,  // name 키를 가진 값을 value 로 설정
>       });
>   };
> ```
>- `name`: input 태그의 name 속성 값. 즉 현재 name, nickname 존재
>- `value`: name 속성 값의 value
>- `[name]`: input 태그의 name 속성 값.  
>   `[name]`에는 첫 번째 input 에 변경 발생 시 name, 두 번째 input 에 변경 발생 시 nickname 이 들어감  
>  만약 대괄호가 없다면 nickname 에 대한 값은 업데이트 되지 않음
>- 기존 값을 복사하는 이유는, 새로운 객체 생성하여 업데이트 하는 것이므로 구조 유지를 위해서라고 생각

## 10. useRef 로 특정 DOM 선택하기
JavaScript 에서 특정 DOM 을 선택해야 하는 상황에 `getElementById`, `querySelector` 같은 DOM Selector 함수를 선택했듯이, 리액트에서는 DOM 을 직접 선택해야할 때 `ref` 사용  

함수형 컴포넌트에서 `ref` 사용 시 useRef` 라는 Hook 함수 사용  
클래스 컴포넌트에서는 콜백 함수를 사용하거나 `React.createRef` 함수 사용 (중요 x)

```javascript
const nameInput = useRef();

const onClick = () => {
    nameInput.current.focus(); 
}

return(
    <div>
       <input ref={nameInput} />
        <button onClick={onClick}>클릭</button>
    </div>
);
```

## 11. 배열 렌더링하기
`map()` : 배열 안에 있는 각 원소를 변환하여 새로운 배열로 생성
리액트에서 동적인 배열 렌더링 시 `map()` 함수를 사용해 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환하면 됨 
```javascript
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    /*...,*/
  ];

  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </div>
  );
}

export default UserList;
```
리액트에서 배열 렌더링 시 `key` 라는 props 를 설정해야 함  
만약 배열 안에 `id` 와 같은 고유 값이 없다면 `map()` 함수 사용 시 
설정하는 콜백함수의 두 번째 파라미터 `index`를 `key` 로 사용하면 됨

```javascript
<div>
  {users.map((user, index) => (
    <User user={user} key={index} />
  ))}
</div>
```
`key` 가 없다면, 기본적으로 배열의 `index` 값을 `key`로 사용하며 경고 메시지 출력  
→ 각 고유 원소에 `key`가 있어야만 배열 업데이트 시 효율적인 렌더링이 가능 

### key 의 존재유무에 따른 업데이트 방식 
**`key`가 없을 때**  
(1) 삽입: `[a b c d]` 에서 z를 b와 c 사이에 삽입 시 c->z, d->c 변경, d 삽입   
(2) 제거: `[a b z c d]` 에서 z 제거 시 z->c, c->d 변경, d 제거  
=> Map 에 `key` 가 없다면, 중간 값 변경 시 인덱스 유지를 위해 하위 값들이 모두 변경됨

**`key`가 있을 때**  
수정되지 않는 기존 값은 그대로 두고 원하는 곳에 내용 삽입, 삭제 

### 추가 공부 내용 
> **map()**  
> - 배열 안의 각 원소 변환 시 사용 -> 배열 반환   
> - 다음 배열 안의 숫자를 모두 제곱하여 새 배열을 만들고 싶을 때   
> `const arr = [1, 2, 3, 4, 5];` 
> ```javascript
> const arr1 = [1, 2, 3, 4, 5];
> const arr2 = arr.map(n => n * n);  // arr.map((num) => {return n * n});
> ```


## 12. useRef 로 컴포넌트 안의 변수 만들기
`useRef` Hook 은 DOM 선택 용도 외에, 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리 기능 수행  

`useRef` 로 관리하는 변수는 값이 바뀌어도 컴포넌트가 리렌더링되지 않음.  
리액트 컴포넌트에서 상태는 상태 변환 함수를 호출하고 렌더링 이후 업데이트 된 상태를 조회할 수 있지만, 
`useRef` 로 관리하는 변수는 설정 후 바로 조회 가능 

`useRef` 변수가 관리할 수 있는 값 
- `setTimeout`, `setInterval` 을 통해 만들어진 id
- 외부 라이브러리를 사용해 생성된 인스턴스
- scroll 위치

배열에 새 항목 추가 시 고유 id 관리하는 `useRef()` 변수
```javascript
const nextId = useRef(4);

const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    
    nextId.current += 1;
};
```
`useRef()` 에 파라미터를 넣어주면 `.current` 값의 기본값이 됨  
파라미터 값 수정/조회 시 `.current` 를 수정/조회하면 됨 

## 13. 배열에 항목 추가하기
배열에 변화를 줄 때에는 객체와 마찬가지로 불변성을 지켜야 함  
따라서 `push`, `splice`, `sort` 등의 함수 사용 불가 (만약 사용한다면, 기존 배열 복사 후 사용)

### `spread` 연산자 활용 
```javascript
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
  };
```
### `concat` 함수 사용 
`concat` 함수는 기존 배열을 수정하지 않고, 새 원소가 추가된 새 배열 생성 
```javascript
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));
  };
```

## 14. 배열에 항목 제거하기
삭제 버튼 클릭 시 `user.id` 값을 `onRemove` 함수의 파라미터로 넣어서 호출  
`onRemove` 는 'id가 __인 객체를 삭제하라' 의 역할을 가짐  

배열에 있는 항목 제거 시, 추가할 때와 마찬가지로 불변성을 지키면서 업데이트해야 함  
→ `filter` 배열 내장 함수 사용  
(특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만듦)
```javascript
const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
};
```

## 15. 배열 항목 수정하기
`onToggle` 함수에서 `active` 속성 값 수정하기  
배열의 불변성을 유지하면서 배열 업데이트 할 때도 `map` 함수 사용 가능 

클릭한 컴포넌트의 `id` 값을 비교하여 `id` 가 다르다면 그대로 두고, 같다면 `active` 값 반전시키기
```javascript
const onToggle = id => {
    setUsers(
        users.map( user =>
            user.id === id ? {...user, active: !active} : user
        )
    )
}
```

`onToggle` 함수를 받아와 `active` 속성에 따라 색상 변경하기  
(style 속성에도 js 사용 가능)
```javascript
<b
    style={{
        cursor: 'pointer',
        color: user.active ? 'green' : 'black'
    }}
    onClick={() => onToggle(user.id)}
>
    {user.username}
</b>
```

## 16. useEffect 를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
`useEffect` Hook 을 사용해 컴포넌트가 마운트/언마운트/업데이트 될 때 특정 작업 처리하는 방법
- 마운트: 처음 나타났을 때
- 언마운트: 사라질 때
- 업데이트: 특정 props 가 바뀔 때 

### deps 에 빈 배열 넣기 
컴포넌트 마운트 시에만 호출 
```javascript
useEffect(() => {  // 마운트
    console.log('Components appeared.');
    return () => {  // 언마운트 (cleanup 함수)
        console.log('Components disappeared.');
    };
}, []);
```
`useEffect` 사용 시 첫 번째 파라미터에는 함수, 두 번째 파라미터에는 의존값이 들어있는 배열(`deps`)을 넣음

`useEffect` 에서는 함수를 반환할 수 있는데, 이를 `cleanup` 함수라고 함 (`useEffect` 에 대한 뒷정리)  
→ `deps` 가 비어있는 경우 컴포넌트가 사라질 때 `cleanup` 함수가 호출됨 

마운트 시에 하는 작업들 
- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정 
- 외부 API 요청
- 라이브러리 사용
- setInterval 을 통한 반복 작업 / setTimeout 을 통한 작업 예약  

언마운트 시에 하는 작업들 
- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)  
- 라이브러리 인스턴스 제거 

### deps 에 특정 값 넣기 
컴포넌트가 마운트 될 때, 지정한 값이 바뀔 때 호출  
`deps` 안에 특정 값이 있다면 언마운트 시, 값이 바뀌기 직전에도 호출됨
```javascript
useEffect(() => {
    console.log('User value set');
    console.log(user);
    return () => {
        console.log('Before the user changes...');
        console.log(user);
    };
}, [user]);
```
`useEffect` 안에서 사용하는 상태나, props 가 있다면 `useEffect`의 `deps` 에 넣어주어야 함 (규칙)  
만약 `deps` 에 넣지 않는다면 `useEffect` 에 등록한 함수가 실행될 때 최신 props/상태를 가르키지 않게 됨 

### deps 파라미터를 생략하기 
컴포넌트가 리렌더링될 때마다 호출됨 
```javascript
useEffect(() => {
    console.log(user);
});
```

> 참고  
> 리액트 컴포넌트는 부모 컴포넌트가 리렌더링되면, 자식 컴포넌트도 리렌더링됨  
> 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당함  
> 하지만, Virtual DOM 에는 모든걸 다 렌더링함 → 컴포넌트 최적화 필요 

## 17. useMemo 를 사용하여 연산한 값 재사용하기
`useMemo`: 성능 최적화를 위해 사용
```javascript
function countActiveUsers(users) {
  console.log('Counting active users...');
  return users.filter(user => user.active).length;  // active 값이 true 인 사용자 수
}
```
```javascript
 const count = countActiveUsers(users);
```
콘솔로 함수가 호출되는 것을 확인해보면 users 에 변화가 없을 때, 다른 컴포넌트 값이 바뀔 때에도 리렌더링됨  
불필요할 때에도 호출 → 자원 낭비

`useMemo` Hook 은 이전에 계산한 값 재사용하여 성능 최적화
```javascript
const count = useMemo(() => countActiveUsers(users), [users]);
```
`useMemo` 의 첫 번째 파라미터는 어떻게 연산할지 정의하는 함수, 두 번째 파라미터는 deps 배열을 넣어줌  
deps 배열 안의 내용이 바뀌면 등록된 함수를 호출하여 값을 연산하고, 바뀌지 않았다면 이전 연산 값 재사용 

## 18. useCallback 을 사용하여 함수 재사용하기
`useCallback`: 특정 함수 재사용 (`useMemo`는 특정 결과 값 재사용)
```javascript
const onCreate = useCallback(() => {
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
}, [users, username, email]);
```
```javascript
const onToggle = useCallback(id => {
    setUsers(
        users.map(user =>
            user.id === id ? {...user, active: !user.active} : user
        )
    );
}, [users]);
```
함수 안에서 사용하는 상태, props, props 로 받아온 함수는 꼭 `deps` 배열 안에 포함  
`useCallback` 만으로 눈에 띄는 최적화 x → 컴포넌트 렌더링 최적화 작업 필요 

## 19. React.memo 를 사용한 컴포넌트 리렌더링 방지
`React.memo`: 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 성능 최적화 가능
```javascript
export default React.memo(UserList);
```  

| Username | Email        | [register] |
|----------|--------------|------------|
| velopert | (email1.com) | [remove]   |
| yunnb    | (email2.com) | [remove]   |

User 중 하나라도 수정하면 모든 User 가 리렌더링되는 현상 최적화 방법  
→ `setState` 함수의 함수형 업데이트  
→ `useCallback` 함수의 파라미터에서 최신 props 를 참조하여 `deps` 에 해당 props 를 넣지 않아도 됨 
```javascript
const onCreate = useCallback(() => {
    const user = {
        id: nextId.current,
        username,
        email
    };
    setUsers(users => users.concat(user));

    setInputs({
        username: '',
        email: ''
    });
    nextId.current += 1;
}, [username, email]);
```
```javascript
const onToggle = useCallback(id => {
    setUsers(users =>
        users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
        )
    );
}, []);
```
`React.memo` 는 불필요한 props 비교 방지를 위해 실제 렌더링을 최적화할 수 있는 상황에서만 사용  

```javascript
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
```
`React.memo`로 특정 값들만 비교하는 방법  
→ 두 번째 파라미터로 `propsAreEqual` 함수 사용  
→ 오히려 의도치 않은 버그 발생 우려 (필요한 다른 함수들의 최신 값 참조 x)

## 20. useReducer 를 사용하여 상태 업데이트 로직 분리하기
`useReducer`: `useState`와 같이 상태 업데이트  
컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리 가능 (컴포넌트 바깥, 외부 파일)

```javascript
function reducer(state, action) {
    // 새로운 상태를 만드는 로직
    // const nextState = ...
    return nextState;
}
```
- `reducer(state, action)`: 현재 상태와 액션 객체를 파라미터로 받아와 새로운 상태 반환  
- `action`: 업데이트를 위한 정보를 지님. 주로 `type` 값을 지닌 객체 형태로 사용 (꼭 지킬 필요 x)
- `type` 프로퍼티를 통해 switch 문으로 분기하여 사용 

```javascript
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```
- `action` 의 객체 형태는 자유
- `type` 값은 대문자와 _ 로 구성

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```
- `state`: 앞으로 컴포넌트에서 사용할 수 있는 상태
- `dispatch`: 액션을 발생시키는 함수 → e.g. `dispatch({ type:'INCREMENT' })`
- `useReducer(reducer, initialState)`: `reducer` 함수와 초기 상태를 파라미터로 받음 

```javascript
setUsers(users => users.concat(user));
setInputs({
  username: '',
  email: ''
});
```
이처럼 한 함수에서 setter 를 여러번 사용해야 한다면 `useState` 와 `useReducer` 중 무엇이 편할지 생각하여 선택 

## 21. 커스텀 Hooks 만들기
반복되는 코드가 있을 때 사용. `use` 키워드로 시작   
함수 안에 `useState`, `useEffect`, `useReducer`, `useCallback` 등 Hooks 를 사용해 원하는 기능 구현 후 값 반환 

```javascript
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```
### `useInputs` 를 `useReducer` 로 구현하기
<details>
<summary>코드</summary>
<div>

```javascript
import { useCallback, useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_USER':
            return {
                ...state,
                [action.name]: action.value,
            };

        case 'RESET':
            return (
                Object.keys(state).reduce((acc, current) => {
                    acc[current] = '';
                    return acc;
                }, [])
            );

        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);

    // change
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
            type: 'CHANGE_USER',
            name,
            value
        })
    }, []);

    const reset = useCallback(() => {dispatch({type: 'RESET'})}, []);

    return [form, onChange, reset];
}

export default useInputs;
```
</div>
</details>