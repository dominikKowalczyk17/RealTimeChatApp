import { AccountDetails } from "./AccountDetails";
import { Messages } from "./Messages";

interface SideBarProps {
  onOpenSettings: () => void;
}

export const SideBar = ({ onOpenSettings }: SideBarProps) => {
  return (
    <div>
      <AccountDetails onOpenSettings={onOpenSettings} />
      <Messages />
    </div>
  );
};
