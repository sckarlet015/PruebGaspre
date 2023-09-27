const express = require('express');
const mysql = require('mysql');

const dbConfig = {
  host: 'precios-1.c0f6dm2ucnlg.us-east-2.rds.amazonaws.com',
  user: 'candidatoPrueba',
  password: 'gaspre21.M',
  database: 'prueba',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MariaDB');
});

const app = express();

app.get('/brand/:id', (req, res) => {
    const id = req.params.id
  const sql = 'SELECT * FROM stations_brands';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
      return;
    }
    
    // Envía los resultados como respuesta
    res.json(results);
  });
});

// Inicia el servidor en el puerto 3000 (puedes cambiarlo si lo deseas)
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
