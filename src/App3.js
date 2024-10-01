import React from "react";
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from "./chapter_03/components/TodoTemplate";
import TodoHead from "./chapter_03/components/TodoHead";
import TodoList from "./chapter_03/components/TodoList";
import TodoCreate from "./chapter_03/components/TodoCreate";
import {TodoProvider} from "./chapter_03/TodoContext"

const GlobalStyle = createGlobalStyle`
    body {
        background: #e9ecef ;
    }
`

function App3() {
    return (
        <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
        </TodoTemplate>
        </TodoProvider>
    )
}
export default App3;