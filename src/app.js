const path = require('path')
const express = require('express')
const hbs = require('hbs')

const cotacao = require('./util/cotacao')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'Vagner Gross Klaus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Vagner Gross Klaus'
    })
})  

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
    })
})  

app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo){
        const error = {
            error : {
                code: 400,
                message: 'O ativo deve ser informado!'
            }
        }
        res.status(400).json(error)
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacao(symbol, (err, data) => {
        if (err){
            const {message} = err
            return res.status(err.code).json({error : err})
        }
        res.json(data)
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Vagner Gross Klaus'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})