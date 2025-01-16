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
    }

    return response.data;
  },

  logout: async (token: string) => {
    if (token) {
      try {
        await axios.post(`${API_URL}/logout`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Logout error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        throw error;
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
    const response = await axios.post(`${API_URL}/register`, {
      email,
      username,
      password,
    });
    return response.data;
  },
};
