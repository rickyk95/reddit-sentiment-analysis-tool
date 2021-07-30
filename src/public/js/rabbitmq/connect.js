var amqp = require('amqplib');
const express = require('express')
const url = process.env.CLOUDAMQP_URL || "amqp://localhost";


async function connectRabbitMQ() {

    connection = await amqp.connect(url) 
    channel =  await connection.createChannel()
    console.log('RabbitMQ Connected')
 
 }

 module.exports = connectRabbitMQ 
