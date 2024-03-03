import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import db from '../../firebase';
import firebase from 'firebase/compat/app';
import EmptyChat from './EmptyChat';
import SelectAChannel from './SelectAChannel'
// import {useCollection} from "react-firebase-hooks/firestore"



const Chat = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const inputRef = useRef("");
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    // const [usingMessage] = useCollection(channelId && db.collection('channels').doc(channelId).collection("messages").orderBy("timestamp", "asc"));




    useEffect(() => {
        if (channelId) {
            db.collection('channels')
                .doc(channelId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                })
        }

    }, [channelId])


    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block:"start",
        })
    }


    const sendMessage = e => {
        e.preventDefault();

        if (inputRef.current.value !== "") {
            db.collection('channels')
                .doc(channelId)
                .collection('messages')
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: inputRef.current.value,
                    user: user,
                });
        }

        inputRef.current.value = "";
        scrollToBottom();
    }

    // usingMessage?.docs.map((val)=>(console.log(val)));


    const chatInputIcons = [
        {
            gift: <svg className='fill-hover' aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4 6a4 4 0 0 1 4-4h.09c1.8 0 3.39 1.18 3.91 2.9A4.09 4.09 0 0 1 15.91 2H16a4 4 0 0 1 3.46 6H20a2 2 0 0 1 2 2v1.5a.5.5 0 0 1-.5.5h-19a.5.5 0 0 1-.5-.5V10c0-1.1.9-2 2-2h.54A3.98 3.98 0 0 1 4 6Zm12 2a2 2 0 1 0 0-4h-.09c-.96 0-1.8.65-2.02 1.58L13.29 8H16Zm-5.89-2.42.6 2.42H8a2 2 0 1 1 0-4h.09c.96 0 1.8.65 2.02 1.58Z" clipRule="evenodd" ></path><path fill="currentColor" d="M3 20c0 1.1.9 2 2 2h5.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V20ZM13.5 22a.5.5 0 0 1-.5-.5v-7c0-.28.22-.5.5-.5h7c.28 0 .5.22.5.5V20a2 2 0 0 1-2 2h-5.5Z" ></path></svg>
        },
        {
            gif: <svg className="fill-hover" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm2.18 13.87a2.9 2.9 0 0 1-1.66-.49 3.18 3.18 0 0 1-1.12-1.35A4.88 4.88 0 0 1 4 12c0-.75.14-1.42.42-2 .29-.59.7-1.04 1.24-1.37a3.7 3.7 0 0 1 1.95-.5c.64 0 1.21.14 1.72.4.5.28.89.67 1.15 1.16l-1.22.88a1.76 1.76 0 0 0-1.64-1.02c-.66 0-1.17.22-1.52.65a2.74 2.74 0 0 0-.53 1.8c0 .78.18 1.39.53 1.81.35.42.86.64 1.52.64.3 0 .57-.06.81-.16.25-.12.45-.27.58-.47v-.93H7.3v-1.4h3.24v4.23H9.27l-.2-.71c-.43.57-1.06.86-1.89.86Zm6.34-.15h-1.57V8.28h1.57v7.44Zm1.51 0h1.57v-2.83h2.76v-1.42H16.6V9.7H20V8.28h-4.97v7.44Z" clipRule="evenodd" className=""></path></svg>
        },
        {
            sticker: <svg className="fill-hover" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6 2h12a4 4 0 0 1 4 4v7.5a.5.5 0 0 1-.5.5H19a5 5 0 0 0-5 5v2.5a.5.5 0 0 1-.5.5H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Zm.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM19 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-9.91 2.94a1 1 0 0 0-1.66 1.12 5.5 5.5 0 0 0 9.14 0 1 1 0 0 0-1.66-1.12 3.5 3.5 0 0 1-5.82 0Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M21.66 16c.03 0 .05.03.04.06a3 3 0 0 1-.58.82l-4.24 4.24a3 3 0 0 1-.82.58.04.04 0 0 1-.06-.04V19a3 3 0 0 1 3-3h2.66Z" className=""></path></svg>
        }

    ]


    return (
        <div className='chat-wrapper'>
            <ChatHeader channelName={channelName} className='chat-header' />
            {channelId ? (
                <>
                    <div className="chat-messages">
                        {messages.length === 0 ? (
                            <EmptyChat key={channelId} channelName={channelName} />
                        ) : (
                            messages.map((message) => (
                                <Message
                                    key={message.timestamp} // Assuming timestamp is unique for each message
                                    id={message.timestamp}
                                    timestamp={message.timestamp}
                                    message={message.message}
                                    user={message.user}
                                />
                            ))
                            )}

                    </div>

                    <div ref={chatRef} className="chatScroller" style={{paddingBottom:"5px}"}}/>

                    <div className="chat-input">
                        <div className="chat-input-left cntr">
                            <AddCircleIcon className='icon-hover' />
                            <form className='cntr'>
                                <div className="input-container">
                                    <input ref={inputRef} placeholder={`Message #${!channelName ? 'Here' : channelName}`} />
                                </div>
                                <button onClick={sendMessage} disabled={!channelId} className='chat-submit-button ctr' type="submit"><SendIcon className='icon-hover' /></button>
                            </form>
                        </div>

                        <div className="chat-input-icons">
                            {chatInputIcons[0].gift}
                            {chatInputIcons[1].gif}
                            {chatInputIcons[2].sticker}
                        </div>
                    </div>
                </>
            ) : (<SelectAChannel />)}
        </div>
    )
}

export default Chat
