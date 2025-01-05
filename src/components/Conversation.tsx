import { Chat } from "./Chat";

export const Conversation = () => {
  return (
    <div className="flex-1 p-4 bg-gray-700 text-white">
      <Chat messages={[]} currentUser="user" />
    </div>
  );
};
