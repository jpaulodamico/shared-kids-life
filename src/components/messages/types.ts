
export interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  initials: string;
}

export interface Message {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'image' | 'document' | 'audio' | 'video';
    url: string;
    name: string;
  };
}
