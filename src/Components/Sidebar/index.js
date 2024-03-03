import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from '../SidebarChannel';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';


const Sidebar = () => {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [showLogoutWindow, setShowLogoutWindow] = useState(false);

    useEffect(() => {
        db.collection('channels').onSnapshot((snapshot) =>
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))
            )
        );
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if (channelName) {
            db.collection("channels").add({
                channelName: channelName
            });
        }
    };

    const handleSettingClick = () => {
        setShowLogoutWindow(!showLogoutWindow);
      };

    const profileIcons = [
        {
            micOn: <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path className='colorFill' fill="#949ba4" d="M12 2a4 4 0 0 0-4 4v4a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z"></path><path fill="currentColor" d="M6 10a1 1 0 0 0-2 0 8 8 0 0 0 7 7.94V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.06A8 8 0 0 0 20 10a1 1 0 1 0-2 0 6 6 0 0 1-12 0Z"></path></svg>
        },
        {
            micOff: <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path className='colorFill' fill="#be383b" d="m2.7 22.7 20-20a1 1 0 0 0-1.4-1.4l-20 20a1 1 0 1 0 1.4 1.4ZM10.8 17.32c-.21.21-.1.58.2.62V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.06A8 8 0 0 0 20 10a1 1 0 0 0-2 0c0 1.45-.52 2.79-1.38 3.83l-.02.02A5.99 5.99 0 0 1 12.32 16a.52.52 0 0 0-.34.15l-1.18 1.18ZM15.36 4.52c.15-.15.19-.38.08-.56A4 4 0 0 0 8 6v4c0 .3.03.58.1.86.07.34.49.43.74.18l6.52-6.52ZM5.06 13.98c.16.28.53.31.75.09l.75-.75c.16-.16.19-.4.08-.61A5.97 5.97 0 0 1 6 10a1 1 0 0 0-2 0c0 1.45.39 2.81 1.06 3.98Z" ></path></svg>
        },
        {
            headPhone: <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path className='colorFill' fill="#949ba4" d="M12 3a9 9 0 0 0-8.95 10h1.87a5 5 0 0 1 4.1 2.13l1.37 1.97a3.1 3.1 0 0 1-.17 3.78 2.85 2.85 0 0 1-3.55.74 11 11 0 1 1 10.66 0c-1.27.71-2.73.23-3.55-.74a3.1 3.1 0 0 1-.17-3.78l1.38-1.97a5 5 0 0 1 4.1-2.13h1.86A9 9 0 0 0 12 3Z"></path></svg>
        },
        {
            setting: <svg className="actionIcon_d679b5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path className='colorFill' fill="#949ba4" fillRule="evenodd" d="M10.56 1.1c-.46.05-.7.53-.64.98.18 1.16-.19 2.2-.98 2.53-.8.33-1.79-.15-2.49-1.1-.27-.36-.78-.52-1.14-.24-.77.59-1.45 1.27-2.04 2.04-.28.36-.12.87.24 1.14.96.7 1.43 1.7 1.1 2.49-.33.8-1.37 1.16-2.53.98-.45-.07-.93.18-.99.64a11.1 11.1 0 0 0 0 2.88c.06.46.54.7.99.64 1.16-.18 2.2.19 2.53.98.33.8-.14 1.79-1.1 2.49-.36.27-.52.78-.24 1.14.59.77 1.27 1.45 2.04 2.04.36.28.87.12 1.14-.24.7-.95 1.7-1.43 2.49-1.1.8.33 1.16 1.37.98 2.53-.07.45.18.93.64.99a11.1 11.1 0 0 0 2.88 0c.46-.06.7-.54.64-.99-.18-1.16.19-2.2.98-2.53.8-.33 1.79.14 2.49 1.1.27.36.78.52 1.14.24.77-.59 1.45-1.27 2.04-2.04.28-.36.12-.87-.24-1.14-.96-.7-1.43-1.7-1.1-2.49.33-.8 1.37-1.16 2.53-.98.45.07.93-.18.99-.64a11.1 11.1 0 0 0 0-2.88c-.06-.46-.54-.7-.99-.64-1.16.18-2.2-.19-2.53-.98-.33-.8.14-1.79 1.1-2.49.36-.27.52-.78.24-1.14a11.07 11.07 0 0 0-2.04-2.04c-.36-.28-.87-.12-1.14.24-.7.96-1.7 1.43-2.49 1.1-.8-.33-1.16-1.37-.98-2.53.07-.45-.18-.93-.64-.99a11.1 11.1 0 0 0-2.88 0ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" ></path></svg>
        }
    ]

    return (
        <div className='sidebar'>
            <div className="sidebar-top-container">
                <div className="sidebar-top">
                    <h3>Electrolyte's server</h3>
                    <ExpandMoreIcon />
                </div>
            </div>

            <div className="sidebar-channels">
                <div className="text-channels-wrapper">
                    <div className="text-channels-header cur-po">
                        <div className="text-channels-left">
                            <ExpandMoreIcon className='channel-down-icon' />
                            <h4>Text Channels</h4>
                        </div>
                        <AddIcon onClick={handleAddChannel} className='sidebar-add-channel' />
                    </div>

                    <div className="sidebar-channels-list">
                        {channels.map(({ id, channel }) => (
                            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                        ))}
                    </div>
                </div>

                <div className="text-channels-wrapper voice-channels-wrapper">
                    <div className="text-channels-header cur-po">
                        <div className="text-channels-left">
                            <ExpandMoreIcon className='channel-down-icon' />
                            <h4>voice Channels</h4>
                        </div>
                        <AddIcon className='sidebar-add-channel' />
                    </div>

                    <div className="sidebar-channels-list">
                        <SidebarChannel channelType="voice" />
                    </div>
                </div>

            </div>

            {showLogoutWindow && (
                <div className="logout-window">
                    <button onClick={() => auth.signOut()}>Logout?</button>
                </div>
            )}
            <div className="sidebar-profile">
                <div className="sidebar-profile-left" onClick={handleSettingClick}>
                    <Avatar src={user.photo} className='avatar-profile' />
                    <div className="sidebar-profile-info">
                        <h3>{user.displayName}</h3>
                        <div className="hoverRoll">
                            <div className="default">Online</div>
                            <div className="hovered">#{user.uid.substring(0, 5)}</div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-profile-icons">
                    <span className='profile-icon'>{profileIcons[1].micOff}</span>
                    <span className='profile-icon'>{profileIcons[2].headPhone}</span>
                    <span onClick={handleSettingClick} className='profile-icon settingProfile'>{profileIcons[3].setting}</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
