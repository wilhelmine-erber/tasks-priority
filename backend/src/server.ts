import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


// Test-route
app.get('/api/todos', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos')
    res.json(result.rows)
})

// POST /api/todos => neues Todo erstellen
app.post('/api/todos', async (req: Request, res: Response, next:NextFunction) => {

    const {todo, priority, done=false} = req.body

    // if (!todo || !priority) {
    //     return res.status(400).json({error: 'Todo und Priorität sind erforderlich.'})
    // }

    try{
        const result = await pool.query('INSERT INTO todos (todo, priority, done) VALUES ($1, $2, $3) RETURNING *', [todo, priority, done])
        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error('Error inserting todo:', error)
        res.status(500).json({error: 'Fehler beim Erstellen des Todos.'})
    }

    res.status(201).json({
        message: 'Todo created successfully'})
})

// PUT /api/todos/:id => Todo aktualisieren

// DELETE /api/todos/:id => Todo löschen
app.delete('/api/todos/:id', async (req: Request, res: Response) => {

    const id = req.params.id
    
    try {
        const result = await pool.query('DELETE FROM todos WHERE _id = $1 RETURNING *', [id])

        const newTodo = result.rows[0]
        console.log('newTodo', newTodo);
        // if(result.rowCount === 0) {
        //     return res.status(404).json({error: 'Todo nicht gefunden.'})
        // }

        res.json({message: 'Todo gelöscht.'})
    } catch (error) {
        console.error('Error deleting todo:', error)
        res.status(500).json({error: 'Fehler beim Löschen des Todos.'})
    }
})



// Server starten
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})