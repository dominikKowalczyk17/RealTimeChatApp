import { SideBar } from "../components/SideBar";
import { Settings } from "../components/Settings";
import { Conversation } from "../components/Conversation";
import { ConversationDetails } from "../components/ConversationDetails";
import { Messages } from "../components/Messages";
import StatusSettings from "../components/StatusSettings";
import ProfileSettings from "../components/ProfileSettings";
import { useState, useEffect } from "react";
import { Message } from "../types/Message";
import { useWindowSize } from "../hooks/useWindowSize";

interface ChatPageProps {
  initialConversation: Message | null;
}

const ChatPage = ({ initialConversation }: ChatPageProps) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Message | null>(initialConversation);
  const [view, setView] = useState("chats");
  const [isMobileConversationView, setIsMobileConversationView] =
    useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileConversationView(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setSelectedConversation(initialConversation);
  }, [initialConversation]);

  const handleSelectConversation = (conversation: Message) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setIsMobileConversationView(true);
    }
  };

  const handleBackToMessages = () => {
    setIsMobileConversationView(false);
  };

  const handleSelectChats = () => setView("chats");
  const handleSelectStatus = () => setView("status");
  const handleSelectProfile = () => setView("profile");

  return (
    <div className="flex h-screen">
      <SideBar
        onOpenSettings={() => setSettingsOpen(true)}
        onSelectConversation={handleSelectConversation}
        onSelectChats={handleSelectChats}
        onSelectStatus={handleSelectStatus}
        onSelectProfile={handleSelectProfile}
        onChangeView={setView}
      />
      <div className={`flex flex-1 md:flex-col bg-gray-700`}>
        {view === "chats" && (
          <div className="flex flex-1">
            {(!isMobileConversationView || !isMobile) && (
              <Messages
                onSelectConversation={handleSelectConversation}
                onChangeView={setView}
              />
            )}
            {selectedConversation &&
              (isMobileConversationView || !isMobile) && (
                <div className="flex flex-col flex-1">
                  <ConversationDetails
                    conversation={selectedConversation}
                    showBackButton={isMobile}
                    onBack={handleBackToMessages}
                  />
                  <Conversation conversation={selectedConversation} />
                </div>
              )}
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
