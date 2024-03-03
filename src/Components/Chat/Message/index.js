import React from 'react'
import './Message.css'
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import db from '../../../firebase';
import { selectChannelId } from '../../../features/appSlice';

const Message = ({ id, timestamp, message, user }) => {
  const LoggedinUser = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);


    return (
        <div className="message-wrapper">
            <div className='message'>
                <Avatar src={user.photo} />
                <div className="message-info">
                    <h4>{user.displayName}
                        <span className="timestamp">
                            {/* {new Date(timestamp?.toDate()).toLocaleString()} */}
                            {moment(timestamp?.toDate().getTime()).format("lll")}

                        </span>
                    </h4>
                    <p>{message}</p>
                </div>
            </div>

            {user.email === LoggedinUser.email && (
                <div className="delete-icon-wrapper" onClick={
                    ()=> db.collection('channels').doc(channelId).collection('messages').doc().delete()}
                    >
                    <DeleteIcon className='delete-icon' />
                </div>
            )}
        </div>

    )
}

export default Message
