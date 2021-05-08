const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const price = document.querySelector('#price')

cotacoesForm.addEventListener('submit', (event) => {

    mainMessage.innerText = 'Buscando...'
    price.innerText = ''
    price_open.innerText = ''
    price_low.innerText = ''
    price_high.innerText = ''

    event.preventDefault()
    const ativo = document.querySelector('input').value

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerText = `${data.error.code} - ${data.error.message}`
            } else {
                mainMessage.innerText = data.symbol
                price.innerText = `Price: ${data.price}`
                price_open.innerText = `Open: ${data.price_open}`
                price_low.innerText = `Low: ${data.price_low}`
                price_high.innerText = `High: ${data.price_high}`
            }
        })
    })
})