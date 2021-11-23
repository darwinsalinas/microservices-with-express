const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')


const app = express();

app.use(cors());
app.use(bodyParser.json());


const posts = {}


const handleEvent = (event, data) => {
    if (event === 'PostCreated') {
        posts[data.id] = {
            ...data,
            comments: []
        }
    }

    if (event === 'CommentCreated') {
        const { id, content, postId, status } = data
        const post = posts[postId];
        post.comments.push({ id, content, status })
    }

    if (event === 'CommentUpdated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data)

    res.send({})
})


app.listen(4002, async () => {

    console.log('Server is running on http://localhost:4002')

    try {
        const resp = await axios.get('http://localhost:5000/events')
        const events = resp.data
        for (let event of events) {
            handleEvent(event.type, event.data)
        }
    } catch {
        console.log('erro en el event bus')
    }


})