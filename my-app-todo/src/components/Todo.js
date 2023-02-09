import { useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todo = () => {

    const initialState = [
        {
            task: 'Learn vue.js',
            isCompleted: false
        },
        {
            task: 'Learn React Hook',
            isCompleted: false
        },
        {
            task: 'Learn Gatsby.js',
            isCompleted: false
        },     
    ]
    const [todos, setTodos] = useState(initialState);
	const setTodos_ = value =>setTodos(value);

    return (
        <div>
            <h1>ToDo List</h1>
			<AddTodo setTodos_={setTodos_}/>
			<TodoList todos_={todos} setTodos_={setTodos_}/>
        </div>
	);
}

export default Todo;