import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import moment from 'moment';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAutenticated, getDecodedToken, removeToken } from '../auth/checkauth';
import Wrapper from '../components/Wrapper';
import Loader from '../components/Loader/Loader';
import {
  MessengerBox,
  MessengerHeader,
  MessengerUserList,
  MessageList,
  MessengerContent,
  MessageContainer,
  MessageInputForm,
  MessageTextArea,
  StyledButton,
} from '../components/StyledComponents';

const Messenger = () => {
  const { id, username } = getDecodedToken();
  const [activeUsers, setActiveUsers] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [messageText, setMessageText] = useState('');
  const socket = useRef(null);
  const messageRef = useRef(null);
  const token = localStorage.getItem('auth_token');
  const [showLoading, setShowLoading] = useState(false);
  const scrollToBottom = () => messageRef.current.scrollIntoView({ behavior: "smooth" });
  const socketURL = 'ws://murmuring-brushlands-50099.herokuapp.com:5000';
  useEffect(() => {
    fetchMessages();
    if (isAutenticated()) {
      socket.current = io(socketURL,{
        transports: ['websocket'],
        query: {
          user: username,
        }
      });
      //emit join chat
      socket.current.emit("joinChat", { id, username });
      //listen on new msg
      socket.current.on("message", (newMessage) => {
        setMessagesData(state => [...state, newMessage]);
        scrollToBottom();
      });
      //listen to users
      socket.current.on("activeUsers", (users) => setActiveUsers(users))
    }

    return () => {
      if (socket.current && socket.current.connected) socket.current.disconnect();
    }
  }, []);

  const fetchMessages = () => {
    setShowLoading(true);
    axios.get(`/api/message`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMessagesData(res.data);
        scrollToBottom();
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
        console.log(err);
      });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/message`, { message: messageText }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const newMessage = res.data;
        setMessagesData(state => [...state, newMessage]);
        //emit chat essage
        socket.current.emit('chatMessage', newMessage);
        setMessageText('');
        scrollToBottom();
      })
      .catch((err) => console.log(err));
  }

  const logOut = () => {
    removeToken();
    setShowLoading(true);
  };

  if (!isAutenticated())
    return <Redirect to="/" />

  return (
    <Wrapper>
      {showLoading && (
        <Loader
          msg="Please wait"
        />
      )}
      <MessengerBox>
        <MessengerHeader>
          <h2>WeTALK</h2>
          <span onClick={logOut} title="Exit chat">x</span>
        </MessengerHeader>
        <MessengerContent>
          <MessengerUserList>
            <h3>Users list</h3>
            {activeUsers.map((user) => <p key={user}><span /> {user}</p>)}
          </MessengerUserList>
          <MessageContainer>
            <MessageList>
              {messagesData.map((msg) => (
                <MessengerContent
                  isOwner={username === msg.username}
                  key={msg._id}
                >
                  <div className="msg-container">
                    <span className="msg-sender">{msg.username}</span>
                    <p className="msg-text">{msg.message}</p>
                    <span className="msg-time" ref={messageRef}>
                      {moment(msg.created_at).format('MMM DD, YYYY hh:mm a')}
                    </span>
                  </div>
                </MessengerContent>
              ))}

            </MessageList>
            <MessageInputForm onSubmit={onFormSubmit}>
              <MessageTextArea
                onChange={e => setMessageText(e.target.value)}
                value={messageText}
                onKeyDown={(e) => e.keyCode === 13 ? onFormSubmit(e) : null}
                autoFocus
                rows={3}
              />
              <StyledButton
                type="submit"
                style={{ width: '20%', marginLeft: 2 }}
                disabled={messageText.length < 1}
              >
                SEND
              </StyledButton>
            </MessageInputForm>
          </MessageContainer>
        </MessengerContent>
      </MessengerBox>
    </Wrapper>
  )
}

export default Messenger
