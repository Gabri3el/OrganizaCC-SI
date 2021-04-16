const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { __express } = require('hbs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_LOGIN,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})



exports.register = (req, res) => {

    const { nome, curso, email, senha, senhaConfirm } = req.body;



    db.query('SELECT email FROM users_login WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'Esse e-mail Já está em uso '
            });
        } else if (senha !== senhaConfirm) {
            return res.render('register', {
                message: 'As senhas não são iguais'
            });
        }

        const saltRounds = 8;


        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                db.query('INSERT INTO users_login SET ?', { nome: nome, email: email, curso: curso, senha: hash }); {
                    if (err) {
                        console.log(err)
                    } else {
                        return res.render('register', {
                            message: 'Aluno Registrado'
                        });
                    }
                }
            });
        });

    });

}


exports.login = async(req, res) => {

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).render('login', {
                message: 'Por favor Preencha Todos os campos'
            })
        }

        db.query('SELECT * from users_login WHERE email = ?', [email], async(error, results) => {
            if (!results || results.length == 0 || !await bcrypt.compare(senha, results[0].senha)) {
                res.status(401).render('login', {
                    message: 'E-mail ou senha Incorretos '
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRESIN
                });

                console.log("Seu token é: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIESEXPIRES * 1 * 3600 * 1000 //* 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/home');
            }
        })

    } catch (error) {
        console.log(error)
    }

}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    console.log('Cookie Destruido')
    res.status(200).redirect('/')
}