import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = props => {
    const messages = props.messages.map(message =>{
        return <Message key={message._id} datetime={message.datetime} message={message.message} author={message.author}/>
    });
    return (
        <div className="messages-box">
           {messages}
           {props.newMessages}
        </div>
    )
};

export default Messages;