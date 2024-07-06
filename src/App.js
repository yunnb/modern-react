import logo from './logo.svg';
import './App.css';
import Hello from "./chapter_01/05/Hello";
import Wrapper from "./chapter_01/05/Wrapper";

function App() {
  return (
    <Wrapper>
        {/*isSpecial = {true}: true 는 js 값이므로 중괄호로 감싸줌
            isSpecial: 값 설정 생략 시 true 로 간주 */}
      <Hello name="react" color="red" isSpecial></Hello>
      <Hello color="pink"></Hello>
    </Wrapper>
  );
}

export default App;
