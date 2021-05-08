const request = require('request')

const cotacao = (symbol, callback) => {

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=1Y948MV8K9C46FNL`;

    setTimeout(() => {
        request( {url: url, json: true}, (err, response) => {

            if (err) { 
                return callback({
                    code: 500,
                    message : `Falha ao buscar cotação para ativo ${symbol}: ${err}`
                }, undefined)                
            }
                
            if (response.body["Error Message"]) {
                return callback({
                    code: 500,
                    message : `Falha ao buscar cotação para ativo ${symbol}: ${response.body["Error Message"]}`
                }, undefined)
            }

            const parseJSON = response.body

            if (!parseJSON["Global Quote"]["01. symbol"]) {
                return callback({
                    code: 404,
                    message : `Ativo ${symbol} não encontrado!`
                })
            }
            
            const data = {
                symbol: parseJSON["Global Quote"]["01. symbol"],
                price: parseJSON["Global Quote"]["05. price"],
                price_open: parseJSON["Global Quote"]["02. open"],
                price_low: parseJSON["Global Quote"]["04. low"],
                price_high: parseJSON["Global Quote"]["03. high"],
            }

            callback(undefined, data)

        } )
        
    })

}

module.exports = cotacao