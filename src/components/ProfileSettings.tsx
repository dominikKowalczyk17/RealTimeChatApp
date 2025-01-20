import { useState } from "react";
import Avatar from "../assets/Avatar.png";
import EditIcon from "../icons/EditIcon";

const ProfileSettings = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "User");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (): void => {
    setIsEditing(true);
    setError(null);
  };

  const handleClose = (): void => {
    setIsEditing(false);
    setNewUsername(user?.username || "User");
    setError(null);
  };

  const updateUsername = async (username: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }

      const data = await response.json();

      // Aktualizuj tylko username w localStorage, bez przeładowania strony
      const userString = localStorage.getItem("user");
      if (userString) {
        const currentUser = JSON.parse(userString);
        const updatedUser = { ...currentUser, username: username };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      return data;
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!newUsername.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUsername(newUsername);
      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update username",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-1 border-customGray overflow-hidden h-full bg-gray-800 w-full sm:w-[303px]">
      <div className="flex flex-col items-start gap-2 py-4 px-2">
        <div className="flex gap-10 p-4 justify-between">
          <span className="text-xl font-bold text-white">Status</span>
        </div>
        <div className="py-4 px-6 gap-4 flex flex-col">
          <div className="flex gap-4 items-center">
            <div className="h-12 block">
              <img className="h-full" src={Avatar} alt="avatar" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-green-400">Twoje imię: </span>
          </div>
          <div className="flex gap-10 items-center">
            <p className="text-lg text-white font-bold">
              {user?.username || "User"}
            </p>
            <EditIcon cursor={"pointer"} onClick={handleEdit} />
          </div>
        </div>

        {/* Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                Edit Username
              </h2>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter new username"
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 text-white rounded transition-colors ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
