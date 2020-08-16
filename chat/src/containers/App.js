import React, { useEffect, useState } from 'react';
import './App.css';
import Messages from '../components/Messages/Messages';
import Message from '../components/Message/Message';

const App = () => {
  const url = 'http://146.185.154.90:8000/messages';
  const [messages, setMessages] = useState([]);
  let lastDate = null;
  let newMessagesList = [];
  let inputValue = null;
  let [newMessages, setNewMessages] = useState();


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
        lastDate = messages[messages.length - 1].datetime;
      }
    }
    fetchData().catch(console.error);
  }, []);

  const send = async () => {
    if (inputValue !== '' && inputValue !== null) {
      const data = new URLSearchParams();
      data.set('message', inputValue);
      data.set('author', 'Student');

      const response = await fetch(url, {
        method: 'post',
        body: data,
      });
      console.log(response);
    }
  }

  setInterval(async () => {
    let messageNewUrl = 'http://146.185.154.90:8000/messages?datetime=' + lastDate;
    let response = await fetch(messageNewUrl);
    const newMessagesListResponse = await response.json();
    if (newMessagesListResponse.length > 0) {
      for (let i = 0; i < newMessagesListResponse.length; i++) {
        newMessagesList.push({ _id: newMessagesListResponse[i]._id, message: newMessagesListResponse[i].message, author: newMessagesListResponse[i].author, datetime: newMessagesListResponse[i].datetime });
      }
      console.log(newMessagesList)

      const newMessagesCopy = newMessagesList.map(message => {
        return <Message key={message._id} datetime={message.datetime} message={message.message} author={message.author} />
      })

      setNewMessages(newMessagesCopy);
      lastDate = newMessagesList[newMessagesList.length - 1].datetime;
    }
  }, 4000);

  return (
    <div className="App">
      <Messages messages={messages} newMessages={newMessages} />
      <div className="inp-box">
        <input placeholder="Message..." type="text" onChange={event => inputValue = event.target.value} />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default App;
