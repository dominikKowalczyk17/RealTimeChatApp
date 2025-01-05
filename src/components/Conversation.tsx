import { Chat } from "./Chat";
import { Message } from "../types/Message";

interface ConversationProps {
  conversation: Message;
}

export const Conversation = ({ conversation }: ConversationProps) => {
  return (
    <div className="flex-1 p-4 bg-gray-700 text-white">
      <Chat messages={[conversation]} currentUser="user" />
    </div>
  );
};
