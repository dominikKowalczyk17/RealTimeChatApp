import Avatar from "../assets/Avatar.png";
import { useState } from "react";
import { Settings } from "./Settings";

export const AccountDetails = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div
      onClick={() => setSettingsOpen(true)}
      className="cursor-pointer flex flex-col rounded-2xl border-2 border-customGray m-4 bg-gray-800 text-white"
    >
      <div className="flex gap-6 rounded-2xl items-center p-4 bg-gray-700">
        <div className="h-12 block">
          <img className="h-full" src={Avatar} alt="avatar" />
        </div>
        <p className="text-2xl font-bold">{user?.username || "User"}</p>
      </div>

      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};
