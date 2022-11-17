import { useUser } from "context/AuthContext";
import { IoIosSend } from "react-icons/io";
import { useToast } from "context/ToastContext";
import { db } from "firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";

interface IConversation {
  room: Room;
  setRoom: (contact: Room | null) => void;
  receiverContact: Contact;
}

const Conversation = ({ room, setRoom, receiverContact }: IConversation) => {
  const [input, setInput] = useState("");
  const Toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);

  //message sender, logged in user
  const user = useUser();

  useEffect(() => {
    //called it messagesRef because it is a reffernce to the messages subcolletionc of the rooms collection
    const messagesRef = collection(db, "rooms", room.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      //once the snapshot updates
      const messages = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Message;
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSend = async (e: any) => {
    e.preventDefault();

    if (user == null || input === "") return;

    const newMessage = {
      text: input,
      senderId: user.uid,
      senderEmail: user.email,
      createdAt: new Date(),
    };

    //Creates a new document in the selected room
    try {
      await addDoc(collection(db, "rooms", room.id, "messages"), newMessage);
      user.email;
    } catch (error: any) {
      Toast.error(error.code);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col md:w-2/3 mx-auto ">
      <div className="grid grid-cols-12 items-center py-1">
        <IoMdArrowBack
          onClick={() => setRoom(null)}
          className="text-4xl violet-bg-int violet-border-int  rounded-full border p-1 cursor-pointer  ml-2 col-span-1"
        />
        <h3 className="text-center mt-0 md:mt-4 text-xl col-span-10 italic"></h3>
      </div>
      <h2 className="flex justify-center text-xl">
        {receiverContact.firstName} {receiverContact.lastName}
      </h2>
      <div className="flex flex-col mx-auto w-5/6 md:w-full border border-radix-mauve4 h-96 rounded-lg mt-2 p-1 overflow-y-auto">
        <>
          {messages.map((mes) => {
            return user?.uid === mes.senderId ? (
              <SenderMessage key={mes.id} msg={mes} />
            ) : (
              <ReceiverMessage key={mes.id} msg={mes} />
            );
          })}
        </>
      </div>
      <div className="flex h-10 mt-2 w-5/6 md:w-full mx-auto">
        <form onSubmit={(e) => handleSend(e)} className="w-full mt-1 flex">
          <input
            type="text"
            className="rounded-md bg-radix-mauve4 w-full text-xs px-2 py-1 outline-none"
            placeholder={`Send message to ${receiverContact.firstName}`}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button>
            <IoIosSend className="-ml-10 text-lg on hover:scale-125 transition-all" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
