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
  const [receiverContact, setReceiverContact] = useState<Contact | undefined>();

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

  async function handleGetRoom(receiver: Contact) {
    if (!user || !receiver) return;
    setReceiverContact(receiver);

    //The combination of emails needed for firestore to be able to find
    const usersMap = {
      [user.email!]: user.email,
      [receiver.email]: receiver.email,
    };

    // Query to check if the logged in user and the selected contact has an existing room document in the db
    const q = query(collection(db, "rooms"), where("users", "==", usersMap));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      //If room exists (.size), then set state and exit the function
      const roomSnapshot = querySnapshot.docs[0];
      const room: Room = {
        id: roomSnapshot.id,
        ...roomSnapshot.data(),
      } as Room;
      setRoom(room);
      return;
    }

    //Combination of emails participating in the room
    const insert = {
      users: usersMap,
    };

    // if room does not exists, create room and set state
    // addDoc adds new document("row") to specified collectionref("table")
    // second param is the data to insert, which is the insert variable containing users

    //Query to
    const doc = await addDoc(collection(db, "rooms"), insert);

    //Setting room state with, the id from addDoc response, and the data we passed in
    const room = {
      id: doc.id,
      ...insert,
    };
    setRoom(room);
  }

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
        <Conversation
          room={room}
          setRoom={setRoom}
          receiverContact={receiverContact!}
        />
      ) : (
        <div className="flex flex-col items-center mt-4 ">
          <label className="text-radix-violet11 text-lg">Send message to</label>
          <input
            className="bg-radix-mauve3 border border-radix-mauve4 rounded-md p-2 outline-none focus:border-radix-violet5 focus:border w-2/3 mt-2"
            placeholder="Enter contact info"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {input && (
            <ul className="flex flex-col items-start w-2/3">
              {searchedContacts.map((el) => (
                <li
                  onClick={() => handleGetRoom(el)}
                  key={el.id}
                  className="cursor-pointer border-b border-b-radix-mauve5 hover:scale-105 transition-all w-56 mt-1"
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
