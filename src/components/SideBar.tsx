import { AccountDetails } from "./AccountDetails";
import { Messages } from "./Messages";
import { Message } from "../types/Message";

interface SideBarProps {
  onOpenSettings: () => void;
  onSelectConversation: (conversation: Message) => void;
}

export const SideBar = ({
  onOpenSettings,
  onSelectConversation,
}: SideBarProps) => {
  return (
    <div className="max-w-[400px] lg:max-w-none bg-gray-900 text-white flex flex-col">
      <AccountDetails onOpenSettings={onOpenSettings} />
      <Messages onSelectConversation={onSelectConversation} />
    </div>
  );
};
