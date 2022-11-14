//.d.ts = typescript declaration file, meaning types will be loaded without import
//should only be used for types which are not going to change!

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface Room {
  id: string;
  users: Record<string, string>;
}

interface Message {
  id: string;
  text: string;
  senderName: string;
  senderId: string;
  createdAt: Date;
}
