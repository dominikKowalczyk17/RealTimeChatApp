import { AccountDetails } from "./AccountDetails";
import { Messages } from "./Messages";

interface SideBarProps {
  onOpenSettings: () => void;
}

export const SideBar = ({ onOpenSettings }: SideBarProps) => {
  return (
    <div className="max-w-[400px] lg:max-w-none bg-gray-900 text-white flex flex-col">
      <AccountDetails onOpenSettings={onOpenSettings} />
      <Messages />
    </div>
  );
};
