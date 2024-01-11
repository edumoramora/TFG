const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:4200' //mismo que el del server en el que se ejecuta la app
  }));
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teatro_sin_filtros'
});

db.connect(err => {
  if (err) { console.error('Error al conectar: ' + err.stack); return; }
  console.log('Conectado a la base de datos con ID ' + db.threadId);
});


app.get('/api/obras', (req, res) => {
    const query = 'SELECT titulo, imagen_url, descripcion FROM obras';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
      } else {
        res.json(results);
      }
    });
});

app.post('/api/obras', (req, res) => {
  const { titulo, imagen_url, descripcion } = req.body;

  if (!titulo || !imagen_url || !descripcion) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'INSERT INTO obras (titulo, imagen_url, descripcion) VALUES (?, ?, ?)';
  db.query(query, [titulo, imagen_url, descripcion], (err, result) => {
    if (err) {
      console.error('Error al insertar la obra:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Ya existe una obra con ese título');
      }
      return res.status(500).send('Error interno del servidor');
    }
    res.status(201).json({ mensaje: 'Obra creada con éxito', id: result.insertId });
  });
});



app.post('/api/login', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';

  db.query(query, [nombre_usuario], (err, result) => {
      if (err) {
          res.status(500).send('Error en el servidor');
          return;
      }

      if (result.length > 0) {
        console.log('Contraseña ingresada:', contrasena);
        console.log('Hash en la base de datos:', result[0].contrasena_hash);
        console.log("JWT Secret:", process.env.JWT_SECRET);

          bcrypt.compare(contrasena, result[0].contrasena_hash, (err, isMatch) => {
              if (err) {
                  res.status(500).send('Error al comparar contraseñas');
                  return;
              }

              if (isMatch) {
                  const token = jwt.sign(
                      { id: result[0].id, rol: result[0].rol },
                      process.env.JWT_SECRET, 
                      { expiresIn: '1h' }
                  );
                  console.log(result[0].rol);
                  res.json({ mensaje: "Autenticación exitosa", token , rol: result[0].rol});
              } else {
                  res.status(401).send(result[0].contrasena_hash);
              }
          });
      } else {
          res.status(404).send('Usuario no encontrado');
      }
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
