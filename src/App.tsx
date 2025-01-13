import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Settings } from "./components/Settings";
import { Conversation } from "./components/Conversation";
import { ConversationDetails } from "./components/ConversationDetails";
import { useState } from "react";
import { Message } from "./types/Message";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showConversation, setShowConversation] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Message | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const handleLogin = (roles: string[]) => {
    setUserRoles(roles);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={
              userRoles.includes("ROLE_ADMIN") ? <AdminPage /> : <UserPage />
            }
          />
        </Routes>
        <div className={`hidden md:flex`}>
          <SideBar
            onOpenSettings={() => setSettingsOpen(true)}
            onSelectConversation={setSelectedConversation}
          />
        </div>
        <div
          className={`flex flex-col flex-1 ${
            showConversation ? "block" : "hidden"
          } md:flex md:flex-col md:flex-1`}
        >
          {selectedConversation && (
            <>
              <ConversationDetails
                onBack={() => setShowConversation(false)}
                conversation={selectedConversation}
              />
              <Conversation conversation={selectedConversation} />
            </>
          )}
        </div>
      </div>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
