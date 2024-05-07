//importando slack 
const { IncomingWebhook } = require('@slack/webhook');
// importamos nuestra variable de entorno
require('dotenv').config()

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOCK)

const loggerStream ={
    write:message =>{
        webhook.send({
            text:message
        })

        console.log ("capturando el log",message)
    }
}

module.exports = {loggerStream}