import { Trash2, SquareCheckBig } from 'lucide-react';

type todo = {
    _id: string;
    todo: string;
    priority: string;
    done: boolean;
};

type ListitemsProps = {
    todo: todo,
    deleteTodo: (_id: string) => void,
    toggleDone: (_id:string) => void
};

function Listitems({todo, deleteTodo, toggleDone}: ListitemsProps) {
    

    return (
        <li key={todo._id} className="list-row">
            <div>
                <div className={todo.done? 'line-through' : ''}>{todo.todo}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{todo.priority}</div>
            </div>
            <div className='flex justify-end'>
                <button className="btn btn-square btn-ghost" onClick={() => toggleDone(todo._id)}>
                    <SquareCheckBig className='size-5' />
                </button>
                <button className="btn btn-square btn-ghost" onClick={() => deleteTodo(todo._id)}>
                    <Trash2 className='size-5' />
                </button>
            </div>
        </li>
    )
}

export default Listitems