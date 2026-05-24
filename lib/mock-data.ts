export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "image";
  fileName?: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export const currentUser: User = {
  id: "me",
  name: "You",
  status: "online",
};

export const mockUsers: User[] = [
  { id: "1", name: "Sarah Chen", status: "online" },
  { id: "2", name: "Alex Rivera", status: "online" },
  { id: "3", name: "Emma Wilson", status: "away" },
  { id: "4", name: "James Park", status: "offline" },
  { id: "5", name: "Luna Martinez", status: "online" },
  { id: "6", name: "David Kim", status: "away" },
  { id: "7", name: "Olivia Brown", status: "offline" },
  { id: "8", name: "Marcus Johnson", status: "online" },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    user: mockUsers[0],
    lastMessage: "Hey! Are you coming to the meeting?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 2),
    unreadCount: 2,
  },
  {
    id: "conv2",
    user: mockUsers[1],
    lastMessage: "I just pushed the latest changes",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 0,
  },
  {
    id: "conv3",
    user: mockUsers[2],
    lastMessage: "That sounds great! Let me know when",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 1,
  },
  {
    id: "conv4",
    user: mockUsers[3],
    lastMessage: "Thanks for the review 👍",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
  },
  {
    id: "conv5",
    user: mockUsers[4],
    lastMessage: "Can you send me the design file?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 3,
  },
  {
    id: "conv6",
    user: mockUsers[5],
    lastMessage: "The deployment is done!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 12),
    unreadCount: 0,
  },
  {
    id: "conv7",
    user: mockUsers[6],
    lastMessage: "Happy birthday! 🎉",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
  },
  {
    id: "conv8",
    user: mockUsers[7],
    lastMessage: "Let's catch up this weekend",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  conv1: [
    { id: "m1", senderId: "1", content: "Hi! How's it going?", timestamp: new Date(Date.now() - 1000 * 60 * 30), type: "text" },
    { id: "m2", senderId: "me", content: "Hey Sarah! All good here, working on the new project", timestamp: new Date(Date.now() - 1000 * 60 * 25), type: "text" },
    { id: "m3", senderId: "1", content: "Oh nice! The one with the chat app?", timestamp: new Date(Date.now() - 1000 * 60 * 20), type: "text" },
    { id: "m4", senderId: "me", content: "Yeah exactly! Building the frontend right now", timestamp: new Date(Date.now() - 1000 * 60 * 15), type: "text" },
    { id: "m5", senderId: "1", content: "That's awesome! I'd love to see it when it's ready", timestamp: new Date(Date.now() - 1000 * 60 * 10), type: "text" },
    { id: "m6", senderId: "me", content: "Sure! I'll send you a screenshot soon", timestamp: new Date(Date.now() - 1000 * 60 * 5), type: "text" },
    { id: "m7", senderId: "1", content: "Hey! Are you coming to the meeting?", timestamp: new Date(Date.now() - 1000 * 60 * 2), type: "text" },
  ],
  conv2: [
    { id: "m8", senderId: "2", content: "Hey, I fixed the bug in the auth module", timestamp: new Date(Date.now() - 1000 * 60 * 60), type: "text" },
    { id: "m9", senderId: "me", content: "Nice! What was the issue?", timestamp: new Date(Date.now() - 1000 * 60 * 45), type: "text" },
    { id: "m10", senderId: "2", content: "The token refresh wasn't handling edge cases", timestamp: new Date(Date.now() - 1000 * 60 * 30), type: "text" },
    { id: "m11", senderId: "me", content: "Good catch. Did you add tests for it?", timestamp: new Date(Date.now() - 1000 * 60 * 20), type: "text" },
    { id: "m12", senderId: "2", content: "I just pushed the latest changes", timestamp: new Date(Date.now() - 1000 * 60 * 15), type: "text" },
  ],
  conv3: [
    { id: "m13", senderId: "3", content: "Want to grab lunch?", timestamp: new Date(Date.now() - 1000 * 60 * 120), type: "text" },
    { id: "m14", senderId: "me", content: "Sure! How about that new ramen place?", timestamp: new Date(Date.now() - 1000 * 60 * 100), type: "text" },
    { id: "m15", senderId: "3", content: "That sounds great! Let me know when", timestamp: new Date(Date.now() - 1000 * 60 * 60), type: "text" },
  ],
  conv4: [
    { id: "m16", senderId: "me", content: "I've reviewed your PR, looks good!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), type: "text" },
    { id: "m17", senderId: "4", content: "Thanks for the review 👍", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), type: "text" },
  ],
  conv5: [
    { id: "m18", senderId: "5", content: "Hey, I need the design file for the dashboard", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), type: "text" },
    { id: "m19", senderId: "me", content: "Which one? The v2 redesign?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5.5), type: "text" },
    { id: "m20", senderId: "5", content: "Yes! Can you send me the design file?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), type: "text" },
  ],
};

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}