import React, { useState } from "react";
import { ref, set, get } from "firebase/database";
import { database as db } from "../firebase"; // Firebase config
import { useParams, Link } from "react-router-dom";

export default function HomePage() {
  const { emailPrefix } = useParams();
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const emailPrefixWithoutNumbers = emailPrefix.replace(/\d+/g, "");

  // Replace # with - when interacting with Firebase
  const formatRoomPath = (roomName, roomId) => {
    return `${roomName}-${roomId}`; // Safe delimiter
  };

  // Handle room creation
  const handleRoomCreation = async (e) => {
    e.preventDefault();

    if (roomName && roomId) {
      const formattedRoomPath = formatRoomPath(roomName, roomId);
      const roomRef = ref(db, `rooms/${formattedRoomPath}`);

      await set(roomRef, {
        roomName: roomName,
        roomId: roomId,
        createdBy: emailPrefixWithoutNumbers,
      });

      alert("Room created successfully!");
      setRoomName(""); // Clear the input field
      setRoomId(""); // Clear the input field
    } else {
      alert("Please provide both room name and room ID.");
    }
  };

  // Handle joining a room
  const handleRoomJoin = async (e) => {
    e.preventDefault();

    if (joinRoomName && joinRoomId) {
      const formattedRoomPath = formatRoomPath(joinRoomName, joinRoomId);
      const roomRef = ref(db, `rooms/${formattedRoomPath}`);

      const snapshot = await get(roomRef);

      if (snapshot.exists()) {
        alert("Joining room...");
      } else {
        alert("Room not found! Please check the room name and ID.");
      }
    } else {
      alert("Please enter both room name and room ID.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center space-y-8">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {emailPrefixWithoutNumbers}!
      </h1>

      {/* Create Room Section */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold">Create a Room</h2>
        <form onSubmit={handleRoomCreation} className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Create Room
          </button>
        </form>

        {/* After room is created, display a link to the new chat room */}
        {roomName && roomId && (
          <div className="mt-4">
            <Link
              to={`/chat/${roomName}#${roomId}`} // Use # for display
              className="text-blue-500 underline"
            >
              Go to room: {roomName}#{roomId}
            </Link>
          </div>
        )}
      </div>

      {/* Join Room Section */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold">Join a Room</h2>
        <form onSubmit={handleRoomJoin} className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Room Name"
            value={joinRoomName}
            onChange={(e) => setJoinRoomName(e.target.value)}
            required
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Room ID"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Join Room
          </button>
        </form>

        {/* After room is verified, display a link to the chat room */}
        {joinRoomName && joinRoomId && (
          <div className="mt-4">
            <Link
              to={`/chat/${joinRoomName}#${joinRoomId}`} // Use # for display
              className="text-blue-500 underline"
            >
              Join room: {joinRoomName}#{joinRoomId}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
