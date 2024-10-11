import React, { useState, useEffect, useContext } from "react";
import { ref, onValue, push, update } from "firebase/database";
import { database } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const ChatComponent = () => {
  const { currentUser } = useContext(AuthContext); // Get the authenticated user
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [privateChats, setPrivateChats] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const groupChatsRef = ref(database, "groupChats/");
    onValue(groupChatsRef, (snapshot) => {
      const data = snapshot.val();
      setChannels(data ? Object.keys(data) : []);
    });

    const privateChatsRef = ref(database, `privateChats/${currentUser.uid}`);
    onValue(privateChatsRef, (snapshot) => {
      const data = snapshot.val();
      setPrivateChats(data ? Object.keys(data) : []);
    });

    if (currentChat) {
      const messagesRef = ref(
        database,
        `${currentChat.type}/${currentChat.id}/messages`
      );
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const chatArray = data ? Object.values(data) : [];
        setChatMessages(chatArray);
      });
    }
  }, [currentChat, currentUser]);

  const createGroupChat = (e) => {
    e.preventDefault();
    if (newGroup.trim() === "" || groupMembers.trim() === "") return;

    const members = groupMembers.split(",").reduce(
      (acc, member) => {
        acc[member.trim()] = true;
        return acc;
      },
      { [currentUser.uid]: true }
    );

    const groupRef = ref(database, `groupChats/${newGroup}`);
    update(groupRef, {
      name: newGroup,
      members,
    });
    setNewGroup("");
    setGroupMembers("");
    setCurrentChat({ type: "groupChats", id: newGroup });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "" || !currentChat) return;

    const messagesRef = ref(
      database,
      `${currentChat.type}/${currentChat.id}/messages`
    );
    push(messagesRef, {
      user: currentUser.email,
      message,
      timestamp: new Date().toISOString(),
    });
    setMessage("");
  };

  return (
    <div className="bg-gray-900 h-screen p-6 text-white flex flex-col">
      {/* ... rest of the component code as before */}
    </div>
  );
};

export default ChatComponent;
