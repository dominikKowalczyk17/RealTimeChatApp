import { BrowserRouter } from "react-router-dom";
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

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showConversation, setShowConversation] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Message | null>(null);

  return (
    <BrowserRouter>
      <div className="flex h-screen">
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
