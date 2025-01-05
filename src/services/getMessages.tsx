import { Message } from "../types/Message";

export const getMessages = async (): Promise<Message[]> => {
  // TODO: Replace with actual API call
  const mockMessages: Message[] = [
    {
      id: 1,
      sender: "Nathan",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      timestamp: "5h ago",
    },
    {
      id: 2,
      sender: "Nathan",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      timestamp: "5h ago",
    },
    {
      id: 3,
      sender: "Nathan",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      timestamp: "5h ago",
    },
    {
      id: 4,
      sender: "Nathan",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      timestamp: "5h ago",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMessages);
    }, 500); // Simulate network delay
  });
};
