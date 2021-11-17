import React from 'react'


export default function CommentList({comments}) {

    const redenreComments = comments.map(comment => {
        let content;

        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation'
        }

        if (comment.status === 'approved') {
            content = comment.content
        }

        if (comment.status === 'rejected') {
            content = 'This comment was rejected'
        }

        return (
            <li key={comment.id}>
                { content }
            </li>
        )
    })

    return (
        <div>
            <ul>
                {redenreComments}
            </ul>
        </div>
    )
}
