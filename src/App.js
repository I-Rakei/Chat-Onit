import "./App.css";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom"; // New component for the chat room
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Authentication route */}
          <Route path="/" element={<Auth />} />

          {/* HomePage route: User can create and join rooms */}
          <Route path="/hello/:emailPrefix" element={<HomePage />} />

          {/* ChatRoom route: Display the chat room based on roomName and roomId */}
          <Route path="/chat/:roomName" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
