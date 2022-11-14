import Conversation from "components/Conversation";
import { useUser } from "context/AuthContext";
import { useContacts, useGetContactFromId } from "context/ContactContext";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const Messages = () => {
  const contacts = useContacts();
  const [room, setRoom] = useState<Room | null>(null);
  const mountedRef = useRef(false);
  const user = useUser();

  const [input, setInput] = useState("");
  const [params] = useSearchParams();
  const contactId = params.get("contactId");
  const getContactFromId = useGetContactFromId();

  const searchedContacts = contacts.filter((el) => {
    if (el.firstName.toLowerCase().includes(input.toLowerCase())) {
      return el;
    } else if (el.lastName.toLowerCase().includes(input.toLowerCase())) {
      return el;
    }
  });

  const handleGetRoom = async (receiver: Contact) => {
    if (!user || !receiver) return;

    const usersMap = {
      [user.uid]: user.uid,
      [receiver.id]: receiver.id,
    };

    // check if room exists
    const q = query(collection(db, "rooms"), where("users", "==", usersMap));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      //if room exists, set room state
      const roomSnapshot = querySnapshot.docs[0];
      const room: Room = {
        id: roomSnapshot.id,
        ...roomSnapshot.data(),
      } as Room;
      setRoom(room);
      return;
    }

    const insert = {
      users: usersMap,
    };
    //if room does not exists, create room and set state
    const doc = await addDoc(collection(db, "rooms"), insert);

    const room = {
      id: doc.id,
      ...insert,
    };
    setRoom(room);
  };

  useEffect(() => {
    if (!contactId || mountedRef.current) return;
    const contact = getContactFromId(contactId);
    if (!contact) return;
    handleGetRoom(contact);
    mountedRef.current = true;
  }, [contactId]);

  return (
    <div>
      {room ? (
        <Conversation room={room} setRoom={setRoom} />
      ) : (
        <div className="flex flex-col ">
          <label className="text-radix-mauve11 ">Send message to: </label>
          <input
            className="bg-radix-mauve3 border border-radix-mauve4 rounded-md p-2 outline-none focus:border-radix-violet5 focus:border w-2/3 mt-2"
            placeholder="Enter contact info"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {input && (
            <ul>
              {searchedContacts.map((el) => (
                <li
                  onClick={() => handleGetRoom(el)}
                  key={el.id}
                  className="cursor-pointer border-b border-b-radix-mauve5 hover:scale-110 transition-all"
                >{`${el.firstName} ${el.lastName}`}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
