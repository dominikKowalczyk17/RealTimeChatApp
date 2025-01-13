import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const UserPage = () => {
  const { roles, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <div>
      {isAuthenticated ? (
        <div>Witaj, Użytkowniku! Twoje role: {roles.join(", ")}</div>
      ) : (
        <div>Proszę się zalogować.</div>
      )}
    </div>
  );
};

export default UserPage;
