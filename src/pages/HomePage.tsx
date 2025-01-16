import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

interface LoginFormInputs {
  email: string;
  password: string;
}

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await authService.login(data.email, data.password);
      if (response.token) {
        navigate("/chat");
      }
    } catch (error) {
      setError("root", {
        message: "Nieprawidłowy email lub hasło",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        autoComplete="on"
        className="flex flex-col items-center justify-center bg-white text-black p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl mb-6">Witaj w ChatApp</h1>

        {errors.root && (
          <div className="text-red-500 mb-4">{errors.root.message}</div>
        )}

        <div className="mb-6 w-96">
          <div className="relative mb-4">
            <input
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Nieprawidłowy format email",
                },
              })}
              type="email"
              autoComplete="username"
              placeholder=" "
              className="peer p-4 w-full rounded border border-black focus:outline-none focus:ring-0"
            />
            <label
              className={`absolute left-4 top-[-10px] text-black bg-white px-2 transition-all duration-200 transform 
              peer-placeholder-shown:top-[25%] peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent 
              peer-focus:top-[-10px] peer-focus:left-4 peer-focus:text-sm peer-focus:bg-white`}
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative mb-4">
            <input
              {...register("password", {
                required: "Hasło jest wymagane",
              })}
              type="password"
              autoComplete="current-password"
              spellCheck="false"
              autoCapitalize="none"
              autoCorrect="off"
              data-form-type="password"
              placeholder=" "
              className="peer p-4 w-full rounded border border-black focus:outline-none focus:ring-0"
            />
            <label
              className={`absolute left-4 top-[-10px] text-black bg-white px-2 transition-all duration-200 transform 
              peer-placeholder-shown:top-[25%] peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent 
              peer-focus:top-[-10px] peer-focus:left-4 peer-focus:text-sm peer-focus:bg-white`}
            >
              Hasło
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 w-full text-xl shadow-lg rounded hover:bg-indigo-700 transition duration-200 mb-2"
          >
            Zaloguj się
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white py-3 w-full text-xl shadow-lg rounded hover:bg-indigo-700 transition duration-200"
          >
            Zarejestruj się
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
