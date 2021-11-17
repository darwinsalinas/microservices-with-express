const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let events = [];

app.get('/events', (req, res) => {
    res.send(events)
})

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event)
    axios.post('localhost://localhost:4000/events', event)
    axios.post('localhost://localhost:4001/events', event)
    axios.post('localhost://localhost:4002/events', event)
    axios.post('localhost://localhost:4003/events', event)


    res.json({ message: 'This is a message from the server' });
})

app.listen(5000, () => console.log('Listening 5000'))