import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    username: string;
    online: boolean;
    lastSeen: string;
  };
}
interface RefreshTokenResponse {
  token: string;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post<RefreshTokenResponse>(
          `${API_URL}/refresh`,
          {
            refreshToken: refreshToken,
          },
        );

        const newToken = response.data.token;
        localStorage.setItem("token", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Jeśli refresh token też wygasł, wylogowujemy użytkownika
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Zapisz persistent token
      localStorage.setItem("persistentToken", response.data.refreshToken);
    }

    return response.data;
  },

  autoLogin: async () => {
    const persistentToken = localStorage.getItem("persistentToken");
    if (!persistentToken) {
      throw new Error("No persistent token found");
    }

    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auto-login`,
        {
          refreshToken: persistentToken,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user.email));
      }

      return response.data;
    } catch (error) {
      localStorage.clear();
      throw error;
    }
  },

  logout: async (token: string) => {
    if (token) {
      try {
        await axiosInstance.post("/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }
  },

  register: async ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => {
    const response = await axios.post<LoginResponse>(`${API_URL}/register`, {
      email,
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Dodana metoda refreshToken
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${API_URL}/refresh`,
        {
          refreshToken,
        },
      );

      const newToken = response.data.token;
      localStorage.setItem("token", newToken);

      return newToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  },

  // Pomocnicza metoda do sprawdzania czy token wygasł
  isTokenExpired: (token: string): boolean => {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // konwersja na milisekundy
      const currentTime = Date.now();

      // Dodajemy 5-minutowy bufor
      return currentTime >= expirationTime - 5 * 60 * 1000;
    } catch {
      return true;
    }
  },
};
