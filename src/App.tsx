import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { authService } from "./services/authService";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";

const ChatPage = lazy(() => import("./pages/ChatPage"));

const LoadingComponent = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Ładowanie strony chatu...</p>
        </div>
    </div>
);

function App() {
    useEffect(() => {
        const shouldAutoLogin = () => {
            const token = localStorage.getItem("token");
            const persistentToken = localStorage.getItem("persistentToken");
            return !token && persistentToken;
        };

        if (shouldAutoLogin()) {
            authService.autoLogin().catch((error) => {
                console.error("Auto login failed:", error);
            });
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <HomePage />
                        </AuthRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <Suspense fallback={<LoadingComponent />}>
                                <ChatPage initialConversation={null} />
                            </Suspense>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;