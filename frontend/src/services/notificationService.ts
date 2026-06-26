// // import SockJS from "sockjs-client";
// // import { Client } from "@stomp/stompjs";

// // let stompClient: Client | null = null;

// // const SOCKET_URL = "http://localhost:8081/ws";

// // export interface NotificationMessage {

// //     senderId: number;

// //     receiverId: number;

// //     message: string;

// // }

// // export function connectNotification(

// //     userId: number,

// //     onMessage: (message: any) => void

// // ) {

// //     if (stompClient?.connected) {

// //         return;

// //     }

// //     const socket = new SockJS(SOCKET_URL);

// //     stompClient = new Client({

// //         webSocketFactory: () => socket,

// //         reconnectDelay: 5000,

// //         debug: (str) => {

// //             console.log(str);

// //         }

// //     });

// //     stompClient.onConnect = () => {

// //         console.log("WebSocket Connected");

// //         stompClient?.subscribe(

// //             `/topic/notifications/${userId}`,

// //             (message) => {

// //                 const body = JSON.parse(message.body);

// //                 onMessage(body);

// //             }

// //         );

// //     };

// //     stompClient.onStompError = (frame) => {

// //         console.error(frame);

// //     };

// //     stompClient.activate();

// // }

// // export function disconnectNotification() {

// //     stompClient?.deactivate();

// // }

// // export function sendNotification(

// //     notification: NotificationMessage

// // ) {

// //     if (!stompClient?.connected) {

// //         alert("WebSocket not connected");

// //         return;

// //     }

// //     stompClient.publish({

// //         destination: "/app/sendMessage",

// //         body: JSON.stringify(notification)

// //     });

// // }
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

// let stompClient: Client | null = null;

// const SOCKET_URL = "http://localhost:8081/ws";
// const API_URL = "http://localhost:8081/notifications";

// export interface NotificationMessage {

//     senderId: number;

//     receiverId: number;

//     message: string;

// }

// export function connectNotification(

//     userId: number,

//     onMessage: (message: NotificationMessage) => void

// ) {

//     if (stompClient?.connected) {

//         return;

//     }

//     const socket = new SockJS(SOCKET_URL);

//     stompClient = new Client({

//         webSocketFactory: () => socket,

//         reconnectDelay: 5000,

//         debug: (str) => {

//             console.log(str);

//         }

//     });

//     stompClient.onConnect = () => {

//         console.log("WebSocket Connected");

//         stompClient?.subscribe(

//             `/topic/notifications/${userId}`,

//             (message) => {

//                 onMessage(

//                     JSON.parse(message.body)

//                 );

//             }

//         );

//     };

//     stompClient.onStompError = (frame) => {

//         console.error(frame);

//     };

//     stompClient.activate();

// }

// export function disconnectNotification() {

//     stompClient?.deactivate();

// }

// export async function sendNotification(

//     notification: NotificationMessage

// ) {

//     const response = await fetch(API_URL, {

//         method: "POST",

//         headers: {

//             "Content-Type": "application/json"

//         },

//         body: JSON.stringify(notification)

//     });

//     if (!response.ok) {

//         throw new Error(

//             "Failed to send notification"

//         );

//     }

//     return await response.json();

// }
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

// let stompClient: Client | null = null;

// const SOCKET_URL = "http://localhost:8081/ws";

// export interface NotificationMessage {
//   senderId: number;
//   receiverId: number;
//   message: string;
// }

// export function connectNotification(
//   userId: number,
//   onMessage: (message: any) => void
// ) {

//   if (stompClient?.connected) {
//     return;
//   }

//   const socket = new SockJS(SOCKET_URL);

//   stompClient = new Client({

//     webSocketFactory: () => socket,

//     reconnectDelay: 5000,

//     debug: (msg) => console.log(msg)

//   });

//   stompClient.onConnect = () => {

//     console.log("WebSocket Connected");

//     stompClient?.subscribe(

//       `/topic/notifications/${userId}`,

//       (message) => {

//         onMessage(JSON.parse(message.body));

//       }

//     );

//   };

//   stompClient.onStompError = (frame) => {

//     console.error(frame);

//   };

//   stompClient.activate();

// }

// export function disconnectNotification() {

//   stompClient?.deactivate();

// }

// export function sendNotification(
//   notification: NotificationMessage
// ) {

//   if (!stompClient?.connected) {

//     console.log("WebSocket not connected");

//     return;

//   }

//   stompClient.publish({

//     destination: "/app/sendMessage",

//     body: JSON.stringify(notification)

//   });

// }
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;

const SOCKET_URL = "http://localhost:8081/ws";

export interface NotificationMessage {
  senderId: number;
  receiverId: number;
  message: string;
}

export function connectNotification(
  userId: number,
  onMessage: (message: any) => void
) {

  if (stompClient?.connected) {
    console.log("Already Connected");
    return;
  }

  console.log("Creating WebSocket...");

  const socket = new SockJS(SOCKET_URL);

  stompClient = new Client({

    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    debug: (msg) => console.log(msg),

  });

  stompClient.onConnect = () => {

    console.log("✅ WebSocket Connected");

    console.log("Subscribing to:", `/topic/notifications/${userId}`);

    stompClient?.subscribe(

      `/topic/notifications/${userId}`,

      (message) => {

        console.log("Notification Received:", message.body);

        onMessage(JSON.parse(message.body));

      }

    );

  };

  stompClient.onStompError = (frame) => {

    console.error("STOMP ERROR:", frame);

  };

  stompClient.activate();

}

export function disconnectNotification() {

  stompClient?.deactivate();

  console.log("Disconnected");

}

export function sendNotification(
  notification: NotificationMessage
) {

  console.log("Trying to send...");

  console.log("Connected:", stompClient?.connected);

  if (!stompClient?.connected) {

    console.log("❌ WebSocket not connected");

    return;

  }

  console.log("Sending:", notification);

  stompClient.publish({

    destination: "/app/sendMessage",

    body: JSON.stringify(notification),

  });

}