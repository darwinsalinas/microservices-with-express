const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()

app.use(bodyParser.json())


app.post('/events', async (req, res) => {

    const { type, data } = req.body

    if (type === 'CommentCreated') {
        //console.log('CommentCreated comentario para moderacion recibido', req.body)
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        //console.log('moderado:', status)

        await axios.post('http://localhost:5000/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({})
})


app.listen(4003, () => console.log('listenening 4003'))