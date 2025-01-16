import { SideBar } from "../components/SideBar";
import { Settings } from "../components/Settings";
import { Conversation } from "../components/Conversation";
import { ConversationDetails } from "../components/ConversationDetails";
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

  return (
    <div className="flex h-screen">
      <SideBar
        onOpenSettings={() => setSettingsOpen(true)}
        onSelectConversation={setSelectedConversation}
      />
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
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {/* <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-3 w-full text-xl shadow-lg rounded hover:bg-red-700 transition duration-200 mt-4"
      >
        Wyloguj się
      </button> */}
    </div>
  );
};

export default ChatPage;
