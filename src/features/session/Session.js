import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { SIGNALR_SEND, SIGNALR_CONNECT, SIGNALR_DISCONNECT } from '../../app/signalRMiddleware';

export function Session() {
    var connected = useSelector((state) => state.session.connected);
    var messages = useSelector((state) => state.session.messages);

    var [message, setMessage] = useState("");

    var dispatch = useDispatch();

    function handleSendMessage(e) {
        e.preventDefault();
        dispatch(SIGNALR_SEND(message));
        setMessage("");
    }

    return <div>
        <button className="button is-primary is-large" onClick={() => dispatch(connected ? SIGNALR_DISCONNECT() : SIGNALR_CONNECT())}>{connected ? "Leave" : "Join"} Session</button>
        {
            connected ? 
            <div>
                <div className="section">
                    <form className="columns is-variable is-1" onSubmit={handleSendMessage}>
                        <div className="column">
                            <input className="input" type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                        </div>
                        <div className="column is-narrow">
                            <input className="button is-link" type="submit" value="Send Message" disabled={!connected}/>
                        </div>
                    </form>
                </div>
                <div className="section">{messages.slice().reverse().map((m, i) => <div className="box" key={i} >{m}</div>)}</div>
            </div>
            : <></>
        }
    </div>
}