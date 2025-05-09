import React, { FormEvent, useState, useEffect } from 'react'
import Listitems from './Listitems';
import { createTodo, deleteTodo } from '../services/todo';
import { ITodo } from '../services/todo';

function Tasks() {

    interface Todo {
        _id: string;
        todo: string;
        priority: string;
        done: boolean;
    }

    // states für Todo: besteht aus Aufgabe, Priotität, Done
    const [todos, setTodos] = useState<Todo[]>([])
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState('')
    const [done, setDone] = useState(false)


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (task.trim() === '' || priority === '') {
            alert('Bitte Aufgabe und Fälligkeitsdatum angeben.')
            return
        }

        // todo in funktion für backend und im state speichern
        // createTodo
        createTodo({
            _id: new Date().toISOString(), todo: task, priority: priority, done: done
        })

        setTodos([...todos, { _id: new Date().toISOString(), todo: task, priority: priority, done: done }])

        setTask('')


        setPriority('')
    }

    const toggleDone = (_id: string) => {
        // alle todos durchlaufen, wenn id übereintimmt, dann wird toggle umgekehrt
        setTodos(prev => prev.map(todo => todo._id === _id ? { ...todo, done: !todo.done } : todo))
    }


    function handleDeleteTodo(_id: string): void {
        deleteTodo(_id)
        setTodos(prev => prev.filter(todo => todo._id !== _id))
    }


    useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data)
            })
    }, [])

    return (
        <div className='flex flex-col items-center'>

            <form className='mb-5 flex' onSubmit={handleSubmit}>
                <input
                    className='input pl-2 mr-4 block min-w-0 grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                    type="text"
                    placeholder='Aufgabe'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <select
                    className="select focus:outline-none select-bordered w-32 max-w-xs"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    {/* <option disabled={true}>wann fällig?</option> */}
                    <option>Priorität</option>
                    <option>wichtig & dringend</option>
                    <option>wichtig</option>
                    <option>kann warten</option>
                </select>

                <button
                    type='submit'
                    className='btn btn-soft btn-success ml-5'
                >speichern</button>
            </form>

            <div className='w-4/5'>
                <ul className='list bg-base-100 rounded-box shadow-md'>
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">die wichtigsten Aufgaben</li>

                    {todos.map((todo) => (
                        <Listitems
                            key={todo._id}
                            todo={todo}
                            handleDeleteTodo={handleDeleteTodo}
                            toggleDone={toggleDone}
                        />
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default Tasks