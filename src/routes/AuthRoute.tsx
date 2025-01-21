import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

interface AuthRouteProps {
    children: React.ReactElement;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
    const [isVerifying, setIsVerifying] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const verifyAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');

                if (!token && !refreshToken) {
                    setIsAuthenticated(false);
                    setIsVerifying(false);
                    return;
                }

                if (token && !authService.isTokenExpired(token)) {
                    setIsAuthenticated(true);
                    setIsVerifying(false);
                    return;
                }

                if (refreshToken) {
                    try {
                        await authService.refreshToken(refreshToken);
                        setIsAuthenticated(true);
                    } catch (refreshError) {
                        try {
                            await authService.autoLogin();
                            setIsAuthenticated(true);
                        } catch (autoLoginError) {
                            setIsAuthenticated(false);
                            authService.clearAuthData();
                        }
                    }
                }
            } catch (error) {
                console.error('Authentication verification failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsVerifying(false);
            }
        };

        verifyAuthentication();
    }, [location.pathname]);

    if (isVerifying) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Weryfikacja autoryzacji...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/chat" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthRoute;