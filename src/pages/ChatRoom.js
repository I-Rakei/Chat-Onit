import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, push } from "firebase/database";
import { auth } from "../firebase"; // Firebase config with Auth
import { database as db } from "../firebase"; // Firebase config

const ChatRoom = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the logged-in user from Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email); // or use user.displayName if set
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch messages from Firebase for the specific room
  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomName.replace("#", "-")}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [roomName]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      const roomRef = ref(db, `rooms/${roomName.replace("#", "-")}/messages`);
      await push(roomRef, {
        text: newMessage,
        sender: currentUser, // Use sender's email or name from auth
        timestamp: Date.now(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <h1 className="text-2xl font-bold p-4">Chat Room: {roomName}</h1>

      {/* Display chat messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 max-w-xs rounded-lg ${
              message.sender === currentUser
                ? "bg-violet-400 text-white self-end" // Right-aligned for current user
                : "bg-gray-200 text-black self-start" // Left-aligned for other users
            }`}
            style={{
              alignSelf:
                message.sender === currentUser ? "flex-end" : "flex-start",
            }}
          >
            <div className="text-sm font-bold">{message.sender}</div>
            <div>{message.text}</div>
            <div className="text-xs text-right">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* Message input form */}
      <form onSubmit={handleSendMessage} className="flex p-4 border-t">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
