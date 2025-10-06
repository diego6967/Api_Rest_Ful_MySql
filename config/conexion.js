import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda',
    connectionLimit: 5
});

pool.getConnection()
    .then(Connection => {
        console.log('Conexión hecha');
        Connection.release();
    })
    .catch(error => {
        console.error('Error de conexión');
    });

    export default pool; 