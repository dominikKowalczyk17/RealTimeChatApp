import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
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

                // If we have a token, check if it's expired
                if (token && !authService.isTokenExpired(token)) {
                    setIsAuthenticated(true);
                    setIsVerifying(false);
                    return;
                }

                // If token is expired but we have a refresh token, try to refresh
                if (refreshToken) {
                    try {
                        await authService.refreshToken(refreshToken);
                        setIsAuthenticated(true);
                    } catch (refreshError) {
                        // If refresh fails, try auto-login as a last resort
                        try {
                            await authService.autoLogin();
                            setIsAuthenticated(true);
                        } catch (autoLoginError) {
                            setIsAuthenticated(false);
                            // Clear all auth data if everything fails
                            localStorage.removeItem('token');
                            localStorage.removeItem('refreshToken');
                            localStorage.removeItem('user');
                            localStorage.removeItem('persistentToken');
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
    }, [location.pathname]); // Re-verify when route changes

    if (isVerifying) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Save the attempted URL to redirect back after login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;