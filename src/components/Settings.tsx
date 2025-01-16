import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CustomSwitch from "../customs/CustomSwitch";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

export const Settings = ({ open, onClose }: SettingsProps) => {
  const [notificationsSound, setNotificationsSound] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    onClose();
  };

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="p-8 w-full max-w-md bg-gray-800 text-white rounded-xl shadow-md space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-600">
          Powiadomienia
        </h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <NotificationsIcon className="mr-2" />
              <div>
                <p className="text-lg font-medium">Dźwięki powiadomień</p>
                <p className="text-sm text-gray-400">
                  Używaj dźwięków do powiadamiania o przychodzących
                  wiadomościach, czatach wideo i dźwiękach w aplikacji.
                </p>
              </div>
            </div>
            <CustomSwitch
              checked={notificationsSound}
              onChange={setNotificationsSound}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DoNotDisturbIcon className="mr-2" />
              <div>
                <p className="text-lg font-medium">Nie przeszkadzać</p>
                <p className="text-sm text-gray-400">
                  Wstrzymaj powiadomienia na określony czas.
                </p>
              </div>
            </div>
            <CustomSwitch checked={doNotDisturb} onChange={setDoNotDisturb} />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Zapisz ustawienia
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};
