import axios from "axios";
import { Message } from "../types/Message";

const API_URL = "/api/chats";

const chatService = {
  // Funkcja do pobierania najnowszej konwersacji
  getLatestChat: async (): Promise<Message> => {
    const response = await axios.get(`${API_URL}/latest`);
    return response.data;
  },

  // Możesz dodać inne metody, np. do pobierania wszystkich czatów, wysyłania wiadomości itp.
  getAllChats: async (): Promise<Message[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  sendMessage: async (chatId: string, message: string): Promise<void> => {
    await axios.post(`${API_URL}/${chatId}/messages`, { message });
  },
};

export { chatService };
