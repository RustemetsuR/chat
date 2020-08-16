import React from 'react';
import './Message.css';

const Message = props => {
    return (
        <div className="message-box">
            <h2 className="message">{props.message}</h2>
            <p className="author">{props.author}</p>
            <p className="time dates">{props.datetime.slice(11, 16)}</p>
            <p className="date dates">{props.datetime.slice(0,10)}</p>
        </div>
    )
};

export default Message;