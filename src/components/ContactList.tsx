import React, { useState } from "react";
import { splitVendorChunkPlugin } from "vite";
import { useContactsContext } from "../context/ContactContext";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const { contacts, getContactsSize } = useContactsContext();
  const [userSearch, setUserSearch] = useState("");

  return (
    <div className="flex flex-col">
      <div className="font-bold mt-4 flex justify-center">
        <h2>Contacts</h2>
      </div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="rounded-lg px-2 py-1 w-96"
          placeholder="Search Contacts"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <p className="font-light italic text-sm w-96">
          Search for one of your {getContactsSize()} contacts
        </p>
      </div>
      <div className="flex flex-col items-center border h-96 mt-2 border-radix-mauve6">
        {contacts.map((el) => (
          <ContactCard contact={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
