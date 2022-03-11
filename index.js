
const express = require('express')()
const PORT = 3000;

const bodyParser = require('body-parser');
express.use( bodyParser.json());
express.use(bodyParser.urlencoded({extended: true})); 

const authentication = require('./authentication')
const create_event = require('./create_event')
const join_event = require('./join_event')

express.use(authentication)
express.use(create_event)
express.use(join_event)

express.listen(PORT,()=> console.log(`Listening at PORT ${PORT}`))