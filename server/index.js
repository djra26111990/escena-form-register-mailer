const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const SendRoute = require('./routes/sendRoute.route')

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));
app.use(express.urlencoded({
    extended: false
}))

const PORT = process.env.SERVER_PORT || 3030

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log(" La conexión con la base de datos MongoDB se estableció satisfactoriamente");
})

app.post('/send', SendRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server está activo en el puerto: ${PORT}`);
});
