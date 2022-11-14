import { useUser } from "context/AuthContext";
import { useToast } from "context/ToastContext";
import { db } from "firebase-config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

interface IConversation {
  room: Room;
  setRoom: (contact: Room | null) => void;
}

const Conversation = ({ room, setRoom }: IConversation) => {
  // const { firstName, lastName } = room;
  // for message receiver
  const [input, setInput] = useState("");
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);

  //message sender, logged in user
  const user = useUser();

  useEffect(() => {
    //called it messagesRef because it is a reffernce to the messages subcolletionc of the rooms collection
    const messagesRef = collection(db, "rooms", room.id, "messages");
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      //once the snapshot updates
      const messages = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Message;
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSend = (e: any) => {
    e.preventDefault();

    // Create message object to match typescript interface Message (do not pass in id field).
    if (user == null) return;
    const newMessage = {
      text: input,
      senderName: "anders",
      senderId: user.uid,
      createdAt: new Date(),
    };

    // Call addDoc on the above path L-14 and insert object, messagesRef
    try {
      addDoc(collection(db, "rooms", room.id, "messages"), newMessage);

      console.log("Message sent: " + newMessage.text);
    } catch (e) {
      console.log(e);
    }

    toast.success(`message sent! ${input} `);
  };

  return (
    <div className="flex flex-col md:w-2/3 mx-auto ">
      <div className="grid grid-cols-12 items-center bordepy-1">
        <IoMdArrowBack
          onClick={() => setRoom(null)}
          className="text-4xl violet-bg-int violet-border-int  rounded-full border p-1 cursor-pointer  ml-2 col-span-1"
        />
        <h3 className="text-center mt-0 md:mt-4 text-xl col-span-10 italic"></h3>
      </div>
      <div className="flex w-full border border-radix-mauve4 h-96 rounded-lg mt-4">
        <p>
          {messages.map((el) => (
            <p>{el.text}</p>
          ))}
        </p>
      </div>
      <div className="flex h-10 p-1">
        <form onSubmit={(e) => handleSend(e)}>
          <input
            type="text"
            className="rounded-md bg-radix-mauve8 w-full mt-1 text-lg px-2 py-1 outline-none"
            placeholder="message"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
        </form>
      </div>
    </div>
  );
};

export default Conversation;
