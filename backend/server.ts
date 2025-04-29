import express from 'express';
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


// Server starten
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})