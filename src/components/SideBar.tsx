import { Messages } from "./Messages";
import { Message } from "../types/Message";
import BubbleChatIcon from "../icons/ChatIcon";
import StatusIcon from "../icons/StatusIcon";
import SettingsIcon from "../icons/SettingsIcon";
import Avatar from "../assets/Avatar.png";

interface SideBarProps {
  onOpenSettings: () => void;
  onSelectConversation: (conversation: Message) => void;
  onSelectStatus: () => void;
  onSelectChats: () => void;
  onSelectProfile: () => void;
  onChangeView: (view: string) => void;
}

export const SideBar = ({
  onOpenSettings,
  onSelectConversation,
  onSelectStatus,
  onSelectChats,
  onSelectProfile,
  onChangeView,
}: SideBarProps) => {
  return (
    <div className="lg:max-w-none bg-gray-900 text-white flex">
      <div className="flex flex-col flex-nowrap basis-auto h-full px-3">
        <div className="flex flex-grow self-auto flex-col h-full shrink order-none w-10 ">
          <div
            onClick={() => {
              onSelectChats();
              onChangeView("chats");
            }}
            className="cursor-pointer self-center mt-3"
          >
            <BubbleChatIcon />
          </div>
          <div
            onClick={() => {
              onSelectStatus();
              onChangeView("status");
            }}
            className="cursor-pointer self-center mt-3"
          >
            <StatusIcon />
          </div>
        </div>
        <div className="flex flex-grow-0 self-auto flex-col shrink order-none mb-3">
          <div
            onClick={() => {
              onOpenSettings();
              onChangeView("settings");
            }}
            className="cursor-pointer self-center mt-3"
          >
            <SettingsIcon />
          </div>
          <div
            onClick={() => {
              onSelectProfile();
              onChangeView("profile");
            }}
            className="cursor-pointer self-center mt-3"
          >
            <img src={Avatar} alt="Profile" className="h-6 w-6 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
