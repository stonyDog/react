import { useState } from 'react';

const TodoList = () => {

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
	const [task, setTask] = useState('')

	const handleNewTask = (event) => {
		setTask( event.target.value )
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if(task === '') return
		setTodos(todos => [...todos,{ task, isCompleted: false}])
		setTask('')
	}
	const handleRemoveTask = index => {
		const newTodos = [...todos]
		newTodos.splice(index,1)
		setTodos(newTodos)
	}
	const handleUpdateTask = index => {
		let newTodos = todos.map((todo,todoIndex) => {
		  if(todoIndex  === index){
			  todo.isCompleted = !todo.isCompleted
		  }
		  return todo;
		})
		setTodos(newTodos);
	}

    return (
        <div>
            <h1>ToDo List</h1>

			<form onSubmit={handleSubmit}>
				Add Task :
				<input
					value={task}
					placeholder="Add New Task"
					onChange={handleNewTask}
				/>
				<button type="submit">Add</button>
			</form>
			
			<ul>
				{todos.map((todo, index) => (
					<li
					key={index}
					style={{
						textDecoration: todo.isCompleted ? 'line-through' : 'none',
					}}
					>
					<input
						type="checkbox"
						checked={todo.isCompleted}
						onChange={() => handleUpdateTask(index)}
					/>
					{todo.task}
					<span
						onClick={() => handleRemoveTask(index)}
						style={{ cursor: 'pointer' }}
					>
						X
					</span>
					</li>
				))}
			</ul>
        </div>
		
  );
}

export default TodoList;