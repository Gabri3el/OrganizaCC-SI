const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('index')
    } else {

        res.render('home');
    }
})

router.get('/register', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('register')
    } else {

        res.render('home');
    }
})

router.get('/login', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('home');
    }
})

router.get('/home', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('home');
    }
})

router.get('/sd', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('sd');
    }
})

router.get('/tcc', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('tcc');
    }
})

router.get('/adm', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('adm');
    }
})


router.get('/esw', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('esw');
    }
})

router.get('/atc', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('atc');
    }
})


router.get('/nacional', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('nacional');
    }
})


router.get('/gdti', (req, res) => {
    let hasCookie = req.cookies['jwt'];
    if (!hasCookie) {

        res.render('login')
    } else {

        res.render('gdti');
    }
})



module.exports = router;