import { Message } from "../types/Message";

export const getMessages = async (): Promise<Message[]> => {
  // TODO: Replace with actual API call
  const mockMessages: Message[] = [
    {
      id: 1,
      sender: "Nathan",
      content: "Hey, how are you doing today?",
      timestamp: "2h ago",
    },
    {
      id: 2,
      sender: "Matthew",
      content: "Did you finish the project?",
      timestamp: "3h ago",
    },
    {
      id: 3,
      sender: "Sofie",
      content: "Let's catch up later!",
      timestamp: "1h ago",
    },
    {
      id: 4,
      sender: "George",
      content: "Can you send me the report?",
      timestamp: "4h ago",
    },
    {
      id: 5,
      sender: "Alice",
      content: "Meeting is scheduled at 5 PM.",
      timestamp: "30m ago",
    },
    {
      id: 6,
      sender: "Bob",
      content: "Happy Birthday!",
      timestamp: "10m ago",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMessages);
    }, 500); // Simulate network delay
  });
};
