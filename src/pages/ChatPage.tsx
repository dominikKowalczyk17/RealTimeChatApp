import { SideBar } from "../components/SideBar";
import { Settings } from "../components/Settings";
import { Conversation } from "../components/Conversation";
import { ConversationDetails } from "../components/ConversationDetails";
import { Messages } from "../components/Messages";
import StatusSettings from "../components/StatusSettings";
import ProfileSettings from "../components/ProfileSettings";
import { useState, useEffect } from "react";
import { Message } from "../types/Message";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

interface ChatPageProps {
  initialConversation: Message | null;
}

const ChatPage = ({ initialConversation }: ChatPageProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showConversation, setShowConversation] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Message | null>(initialConversation);
  const [view, setView] = useState("chats");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedConversation(initialConversation);
  }, [initialConversation]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await authService.logout(token);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const handleSelectChats = () => setView("chats");
  const handleSelectStatus = () => setView("status");
  const handleSelectProfile = () => setView("profile");

  return (
    <div className="flex h-screen">
      <SideBar
        onOpenSettings={() => setSettingsOpen(true)}
        onSelectConversation={setSelectedConversation}
        onSelectChats={handleSelectChats}
        onSelectStatus={handleSelectStatus}
        onSelectProfile={handleSelectProfile}
        onChangeView={setView}
      />
      <div
        className={`flex ${
          showConversation ? "block" : "hidden"
        } md:flex md:flex-col md:flex-1 bg-gray-700`}
      >
        {view === "chats" && selectedConversation && (
          <div className="flex flex-1">
            <Messages
              onSelectConversation={setSelectedConversation}
              onChangeView={setView}
            />
            <div className="flex flex-col flex-1">
              <ConversationDetails
                onBack={() => setShowConversation(false)}
                conversation={selectedConversation}
              />
              <Conversation conversation={selectedConversation} />
            </div>
          </div>
        )}
        {view === "status" && (
          <div className="flex flex-1">
            <StatusSettings />
          </div>
        )}
        {view === "profile" && <ProfileSettings />}
      </div>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default ChatPage;
