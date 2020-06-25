import { createAction } from "@reduxjs/toolkit"
import * as signalR from "@microsoft/signalr"

// Hub Settings
const hubURL = process.env.REACT_APP_HUB_URL;
const hubOptions = {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
};
const HUB_RECEIVE = "ReceiveMessage";
const HUB_SEND = "SendMessage";

// Actions
export const SIGNALR_CONNECT = createAction("connect"); // Try to connect
export const SIGNALR_DISCONNECT = createAction("disconnect"); // Try to disconnect
export const SIGNALR_OPEN = createAction("open"); // Connection complete
export const SIGNALR_CLOSE = createAction("close"); // Disconnection complete
export const SIGNALR_SEND = createAction("send"); // Send message
export const SIGNALR_RECEIVE = createAction("receive"); // Receive mesage
export const SIGNALR_ERROR = createAction("error", (failedActionType, errorMessage) => { // Error
    return {
        payload: {
            failedAction: failedActionType,
            message: errorMessage
        }
    }
});

// Middleware
let connection;
export default store => next => action => {
    switch(action.type) {
        case(SIGNALR_CONNECT.type): {

            connection = new signalR.HubConnectionBuilder()
            .withUrl(hubURL, hubOptions)
            .build();

            connection.on(HUB_RECEIVE, message => {
                next(SIGNALR_RECEIVE(message));
            });

            connection.start()
                .then(() => next(SIGNALR_OPEN()))
                .catch((e) => next(SIGNALR_ERROR(action.type, e.message)));

            break;
        }
        case(SIGNALR_SEND.type): {
            connection.invoke(HUB_SEND, action.payload);
            break;
        }
        case(SIGNALR_DISCONNECT.type): {
            connection.stop().then(
                () => next(SIGNALR_CLOSE()), 
                (e) => next(SIGNALR_ERROR(action.type, e.message)));
            break;
        }
        default:
            break;
    }
    return next(action);
}