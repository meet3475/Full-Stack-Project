import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {

    const socket = useMemo(() => io('http://localhost:8080'));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Cilent To Connenct',socket.id);
        });

        socket.on('welcome', (msg) => {console.log(msg)});

        socket.on('greeting', (msg) => {console.log(msg)});
    }, [])


    const handleForm = (event) => {
        event.preventDefault();
        const id = event.target.id.value;
        const message = event.target.message.value;
        console.log("Form submitted with id:", id, "and message:", message);

       
        socket.emit('privateMessage', { id, message });
    };
   

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            <br></br><br></br><br></br>

            <form onSubmit={handleForm}>
                <input type="text" name="id" placeholder="please entre id"/>        
                <input type="text" name="message" placeholder="please entre message"/>
                 <button type="submit">Submit</button>
            </form>
         
        </div>
    );
}

export default Chat;