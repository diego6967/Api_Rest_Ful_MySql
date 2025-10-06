import express from 'express';
import pool from './config/conexion.js ';
const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
  const sql = 'SELECT * FROM users';
  try {
    const Connection = await pool.getConnection();//activar coneccion
    const [rows] = await Connection.query(sql); //ejecuta la consulta
    Connection.release(); //liberar la conexion
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

app.get('/users/:id', async (req, res) => { 
  const id = parseInt (req.params.id);
  const sql = 'SELECT * FROM users where Id_user = ?';
  try {
    const Connection = await pool.getConnection();//activar coneccion
    const [rows] = await Connection.query(sql, [id]); //ejecuta la consulta
    Connection.release(); //liberar la conexion
   (rows[0])? res.json(rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

app.use(express.json()); 

app.post('/users', async (req, res) => { 
  const values = req.body
  const sql = 'INSERT INTO users SET ?';

  try {
    const Connection = await pool.getConnection();//activar coneccion
    const [rows] = await Connection.query(sql, [values]); //ejecuta la consulta
    Connection.release(); //liberar la conexion
  console.log(rows);
  res.status(201).send('Usuario creado ');
  } catch (error) {
    res.status(500).json({ error: 'Error, no se realizo la consulta' });
  }
});

app.put('/users/:id', async (req, res) => { 
  const id = req.params.id;
  const new_values = req.body
  const sql = 'UPDATE users SET ? WHERE Id_user = ?';

  try {
    const Connection = await pool.getConnection();//activar coneccion
    const [rows] = await Connection.query(sql, [new_values, id]); //ejecuta la consulta
    Connection.release(); //liberar la conexion 
  console.log(rows)
  (rows.affectedRows == 0) ? res.status(404).send({ error: 'Usuario no encontrado' }) : res.send(`datos actualizado`) ;
res.send(`datos actualizado`);
  } catch (error) {
    res.status(500).json({ error: 'Error, no se realizo la consulta' });
  }
});

app.delete('/users/:id', async (req, res) => { 
  const id = req.params.id;
  const sql = 'DELETE FROM users WHERE Id_user = ?';

  try {
    const Connection = await pool.getConnection();//activar coneccion
    const [rows] = await Connection.query(sql, [id]); //ejecuta la consulta
    Connection.release(); //liberar la conexion     
    

  console.log(rows)
  (rows.affectedRows == 0) ? res.status(404).send({ error: 'Usuario no encontrado' }) : res.send(`usuario eliminado`) ;
  } catch (error) {
    res.status(500).json({ error: 'Error, no se realizo la consulta' });
  } 
});




app.get('/', (req, res) => {
  res.send('API_REST_FUL_mySQL');
});

app.get('/users', (req, res) => {
  res.send('holanda ');
});

app.get('/users/:id', (req, res) => {
  res.send('holando ');
});

app.post('/users', (req, res) => {
    res.send('usuario creado');
});

app.put('/users/:id', (req, res) => {
    res.send(`usuario ${req.body.id} actualizado`);
});

app.delete('/users/:id', (req, res) => {
    res.send(`usuario ${req.body.id} eliminado`);
});

app.use((req, res) => {
    res.status(404).send('pagina no encontrada');
});






app.listen(port, () => console.log(`Server running on http://localhost:${port}`));