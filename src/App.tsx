import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import { Message } from "./types/Message";
import { getMessages } from "./services/getMessages";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState, useEffect } from "react";
import "./config/axiosConfig"; // jeśli interceptory są w osobnym pliku
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  // const [userRoles, setUserRoles] = useState<string[]>([]);
  const [initialConversation, setInitialConversation] =
    useState<Message | null>(null);

  // const handleLogin = (roles: string[]) => {
  //   // setUserRoles(roles);
  // };

  useEffect(() => {
    const fetchInitialConversation = async () => {
      const messages = await getMessages();
      if (messages.length > 0) {
        setInitialConversation(messages[0]);
      }
    };

    fetchInitialConversation();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage initialConversation={initialConversation} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
