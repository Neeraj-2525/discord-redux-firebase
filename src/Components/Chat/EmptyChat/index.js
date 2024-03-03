import React from 'react'
import './EmptyChat.css'

const EmptyChat = ({ id, channelName }) => {
    return (
        <div className="empty-wrapper">
                <h2>Welcome to <br /><span>{channelName} channel</span></h2>
                <p>This is your brand new, shiny channel. Send First Message On This Channel!</p>
                <br />
                <p><i>PLEASE BE RESPECTFUL.</i></p>
                <p>Happy Discording!</p>

                <div className="gif">
                <img src="https://media.tenor.com/3SADCPkXrG4AAAAi/wumpus.gif" alt="wumpus" />
                </div>
        </div>
    )
}

export default EmptyChat
