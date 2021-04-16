const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

// arq credenciais
dotenv.config({ path: './.env' });

//inicio do express
const app = express();
//conection DB
const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_LOGIN,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    })
    // usar arq css/js       importando path
const publicDirectory = path.join(__dirname, './public');
//usando
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//arq html
app.set('view engine', 'hbs');


//conectando ao banco 
db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('MYSQL CONECTADO')
    }
})

//definir rotas 
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log('server listen on 3000')
})