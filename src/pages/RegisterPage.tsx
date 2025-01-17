import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !username || !password) {
      setError("Wszystkie pola są wymagane.");
      return;
    }
    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Proszę podać poprawny adres e-mail.");
      return;
    }

    setError("");

    try {
      const response = await authService.register({
        email,
        username,
        password,
      });

      if (response.token) {
        setSuccess("Rejestracja zakończona sukcesem!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Rejestracja nie powiodła się. Brak tokenu autoryzacji.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Rejestracja nie powiodła się. Spróbuj ponownie.",
        );
      } else {
        setError("Rejestracja nie powiodła się. Spróbuj ponownie.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white text-black">
      <div className="flex flex-col items-center justify-center bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6">Rejestracja</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="mb-6 w-96">
          <div className="relative mb-4">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer p-4 w-full rounded border border-black focus:outline-none focus:ring-0"
            />
            <label
              className={`absolute left-4 top-[-10px] text-black bg-white px-2 transition-all duration-200 transform 
              ${
                email ? "text-sm" : "top-[50%]"
              } peer-placeholder-shown:top-[25%] peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent 
              peer-focus:top-[-10px] peer-focus:left-4 peer-focus:text-sm peer-focus:bg-white`}
            >
              Email
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer p-4 w-full rounded border border-black focus:outline-none focus:ring-0"
            />
            <label
              className={`absolute left-4 top-[-10px] text-black bg-white px-2 transition-all duration-200 transform 
              ${
                username ? "text-sm" : "top-[50%]"
              } peer-placeholder-shown:top-[25%] peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent 
              peer-focus:top-[-10px] peer-focus:left-4 peer-focus:text-sm peer-focus:bg-white`}
            >
              Nazwa użytkownika
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer p-4 w-full rounded border border-black focus:outline-none focus:ring-0"
            />
            <label
              className={`absolute left-4 top-[-10px] text-black bg-white px-2 transition-all duration-200 transform 
              ${
                password ? "text-sm" : "top-[50%]"
              } peer-placeholder-shown:top-[25%] peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent 
              peer-focus:top-[-10px] peer-focus:left-4 peer-focus:text-sm peer-focus:bg-white`}
            >
              Hasło
            </label>
          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={handleRegister}
            className="bg-indigo-600 text-white py-3 w-full text-xl shadow-lg rounded hover:bg-indigo-700 transition duration-200 mb-2"
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
