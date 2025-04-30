const BASE_URL = 'http://localhost:3000/api/todos';

export interface ITodo {
    _id: string
    todo: string
    priority: string
    done: boolean   
}

// funktionen mit fetch aus backend

// create todo
export async function createTodo(todo: ITodo){
   
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    console.log('newTodo', newTodo);
    return newTodo;

    // if (!response.ok) {
    //     throw new Error('Failed to create todo');
    // }

    // return response.json();
}


