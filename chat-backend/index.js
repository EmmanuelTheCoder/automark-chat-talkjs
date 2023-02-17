const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const axios = require("axios");
require('dotenv').config()

app.use(express.json())


const token = process.env.SECRET_TOKEN
const appId = process.env.APP_ID

async function UpdateConversationforSupport(conversationId){

const supportData= {
  custom: {
    answered: "true"
  }
}

const config = {
  headers : {
    Authorization: `Bearer ${token}`
  }
}

  axios.put(
    `https://api.talkjs.com/v1/${appId}/conversation/${conversationId}`,
    supportData,
    config

  )
 
}


async function UpdateConversationforCustomer(conversationId){

  const customerData= {
    custom: {
      answered: "false"
    }
  }
  
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
  
    axios.put(
      `https://api.talkjs.com/v1/${appId}/conversation/${conversationId}`,
      customerData,
      config
  
    )  
}

app.post('/talkjs', (req, res) => {
    console.log(req.body)
    res.status(200).send('OK')

    const {role} = req.body.data.sender
    const {conversationId} = req.body.data.message

    if(role == "support"){
      UpdateConversationforSupport(conversationId)
    }else{
      UpdateConversationforCustomer(conversationId)
    }
 });


server.listen(8080, () => {
  console.log('listening on *:8080');
});