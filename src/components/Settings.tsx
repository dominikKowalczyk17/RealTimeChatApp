import { useState } from "react";
import Modal from "@mui/material/Modal";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CustomSwitch from "../customs/CustomSwitch";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

export const Settings = ({ open, onClose }: SettingsProps) => {
  const [notificationsSound, setNotificationsSound] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  const handleSave = () => {
    console.log("Settings saved:", {
      notificationsSound,
      doNotDisturb,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="p-8 w-full max-w-md bg-gray-800 text-white rounded-xl shadow-md space-y-6">
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
        </div>
      </div>
    </Modal>
  );
};
