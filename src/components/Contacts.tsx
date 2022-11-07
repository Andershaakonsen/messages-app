import React, { useState } from "react";
import { Contact } from "../types";
import ContactForm from "./ContactForm";

type Props = {};

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <div className="">
      <ContactForm setContacts={setContacts} />
    </div>
  );
};

export default Contacts;
