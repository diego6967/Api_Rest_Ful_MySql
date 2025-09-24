import express from 'express';
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('API_REST_FUL_mySQL');
});

app.get('/users', (req, res) => {
  res.send('holanda ');
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