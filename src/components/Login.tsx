import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "../services/AuthService";
import { setUserRoles } from "../store/reducers/userReducer";

interface LoginProps {
  onLogin: (roles: string[]) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        await AuthService.initAuthentication();
        const user = await AuthService.fetchAuthenticatedUser();
        console.log("Dane użytkownika:", user);
        console.log("Dispatch:", dispatch);
        dispatch(setUserRoles(user.roles || []));
        onLogin(user.roles || []);
      } catch (error) {
        console.error("Błąd podczas inicjalizacji Keycloak:", error);
      }
    };

    initializeKeycloak();
  }, [onLogin]);

  return <div>Logowanie...</div>;
};

export default Login;
