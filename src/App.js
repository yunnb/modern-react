import logo from './logo.svg';
import './App.css';
import Hello from "./chapter_01/05/Hello";
import Wrapper from "./chapter_01/05/Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"></Hello>
      <Hello color="pink"></Hello>
    </Wrapper>

  );
}

export default App;
