import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {

    const socket = useMemo(() => io('http://localhost:8080'));

    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Cilent To Connenct',socket.id);
        });

        socket.on('welcome', (msg) => {console.log(msg)});

        socket.on('greeting', (msg) => {console.log(msg)});
    }, [])


    

    const hendalsubmit = (event) => {
        event.preventDefault()
        socket.emit('message', { message, room })
        setMessage('')
        setRoom('')
    }
   

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            <br></br><br></br><br></br>

            <form onSubmit={hendalsubmit}>
                <input
                    type="text"
                    name="message"
                    id='message'
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    type="text"
                    name="room"
                    id='room'
                    placeholder="Enter Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
         
        </div>
    );
}

export default Chat;