import React from "react";
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from "./chapter_03/components/TodoTemplate";
import TodoHead from "./chapter_03/components/TodoHead";
import TodoList from "./chapter_03/components/TodoList";
import TodoCreate from "./chapter_03/components/TodoCreate";

const GlobalStyle = createGlobalStyle`
    body {
        background: #e9ecef ;
    }
`

function App3() {
    return (
        <>
        <GlobalStyle />
            <TodoTemplate>
                <TodoHead />
                <TodoList />
                <TodoCreate />
            </TodoTemplate>
        </>
    )
}
export default App3;