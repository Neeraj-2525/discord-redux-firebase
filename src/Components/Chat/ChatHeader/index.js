import React from 'react'
import './chatHeader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';

const ChatHeader = ({channelName}) => {


    return (
        <div className='chatHeader'>
            <div className="chatHeader-left">
                <h3>
                    <span>
                        <svg className="hash cntr" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="var(--sidebar-inactive)" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd" className=""></path></svg>
                    </span>
                    {channelName}
                </h3>
            </div>
            <div className="chatHeader-right">
                <NotificationsIcon />
                <PushPinIcon className='pin-icon' />
                <PeopleAltIcon />

                <div className="chat-header-search">
                    <input placeholder='Search' />
                    <SearchIcon className="search-icon" />
                </div>

                <InboxIcon />
                <HelpIcon />
            </div>
        </div>
    )
}

export default ChatHeader
