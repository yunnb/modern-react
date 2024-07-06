# 벨로퍼트와 함께하는 모던 리액트
## 목차
[# 05. props 를 통해 컴포넌트에게 값 전달하기](#05-props-를-통해-컴포넌트에게-값-전달하기)  
[# 06. 조건부 렌더링](#06-조건부-렌더링)  
[# 07. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](#07-usestate-를-통해-컴포넌트에서-바뀌는-값-관리하기)
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