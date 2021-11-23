const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const commentsFromPost = comments[req.params.id] || [];

    commentsFromPost.push({ id: commentId, content, status: 'pending' });

    comments[req.params.id] = commentsFromPost;

    axios.post('http://localhost:5000/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(commentsFromPost);
})


app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const commentsByPostId = comments[postId]
        const comment = commentsByPostId.find(comment => {
            return comment.id === id
        })

        comment.status = status

        console.log('camos a emitir updaTED')

        await axios.post('http://localhost:5000/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({})
})

app.listen(4001, () => console.log('Listening on 4001'));