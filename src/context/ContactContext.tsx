import React, { useContext, useState } from "react";

//Exported for reusability - Every value in context MUST be typed HERE
export interface IContactContext {
  contacts: Contact[];

  // Giving type to addContact, but when its a function you call it a signature
  addContact: (contact: Contact) => void;
}

//Creating a context, with a type of Contact Context Interface, and set the default value to undefined temporarily when creating the context;
export const ContactContext = React.createContext<IContactContext>(undefined!);

//Centralized place where all business logic is handled
export const ContactProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getId = (arr: Contact[]) => {
    if (arr.length == 0) {
      return 0;
    }
    return arr.length;
  };

  const addContact = (contact: Contact) =>
    setContacts((prevState) => [
      ...prevState,
      { ...contact, id: getId(prevState) },
    ]);

  return (
    <ContactContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactContext.Provider>
  );
};
//Customs hooks

/**
 * Returns the full value of the context
 */
export const useContactsContex = () => useContext(ContactContext);

//Helpers

export const useContacts = () => useContactsContex().contacts;
export const useAddContact = () => useContactsContex().addContact;
