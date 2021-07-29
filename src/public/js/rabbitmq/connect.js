var amqp = require('amqplib');
const express = require('express')


async function connectRabbitMQ() {

    connection = await amqp.connect('amqp://localhost') 
    channel =  await connection.createChannel()
    console.log('RabbitMQ Connected')
 
 }


 
 module.exports = connectRabbitMQ 
