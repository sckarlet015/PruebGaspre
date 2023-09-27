const express = require('express');
const mysql = require('mysql');

const dbConfig = {
  host: 'precios-1.c0f6dm2ucnlg.us-east-2.rds.amazonaws.com',
  user: 'candidatoPrueba',
  password: 'gaspre21.M',
  database: 'prueba',
  port: 3306,
};

// ejemplo utilizado
// http://localhost:3000/station?cre_id=PL/1000/EXP/ES/2015


const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MariaDB');
});

const app = express();

app.get('/station', async (req, res) => {
  const cre_id = req.query.cre_id; 
  const stationQuery = 'SELECT * FROM stations WHERE cre_id = ?';
  const brandQuery = 'SELECT * FROM stations_brands';
  const prices = 'SELECT * FROM prices';
  const nameBrand = 'SELECT * FROM brands WHERE id = ?';

  try {
    const [stations, brands, price] = await Promise.all([
      query(connection, stationQuery, [cre_id]),
      query(connection, brandQuery),
      query(connection, prices)
    ]);

    const priceStation = price.filter((ele) => {if(ele.cre_id === cre_id) return ele})
    const branCorrect = brands.filter((ele) => {if(ele.cre_id === cre_id) return ele})

    const nameBran = await query(connection, nameBrand, [branCorrect[0].id]);

    const promPrice = calcularPromedio(priceStation)

    const respuesta = {
      Nombre: stations[0].name,
      Marca: nameBran[0].name,
      PrecioProducto: promPrice
    };

    res.json(respuesta);
  } catch (error) {
    console.error('Error al ejecutar la consulta SQL:', error);
    res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
  }
});

function query(connection, sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

function calcularPromedio(prices) {
    if (!prices || prices.length === 0) {
      return 0;
    }
  
    let suma = 0;
    for (const price of prices) {
      suma += price.value;
    }
  
    const promedio = suma / prices.length;
    return promedio;
  }
