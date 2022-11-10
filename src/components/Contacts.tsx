import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

const Contacts = () => {
  const [showAddContact, setShowAddContact] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {showAddContact ? (
        <ContactForm setShowAddContact={setShowAddContact} />
      ) : (
        <div className="flex flex-col">
          <ContactList />
          <div className="flex justify-end">
            <IoMdAdd
              onClick={() => setShowAddContact((prevState) => !prevState)}
              className="text-4xl violet-bg-int violet-border-int  rounded-full border p-1 cursor-pointer mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
