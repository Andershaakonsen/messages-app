import React, { useContext, useState } from "react";

//Exported for reusability - Every value in context MUST be typed HERE
export interface IContactContext {
  contacts: Contact[];

  // Giving type to addContact, but when its a function you call it a signature
  addContact: (contact: Contact) => void;
  getContactsSize: () => number;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
}

//Creating a context, with a type of Contact Context Interface, and set the default value to undefined temporarily when creating the context;
export const ContactContext = React.createContext<IContactContext>(undefined!);

interface ContactProviderProps {
  children: React.ReactNode;
}
//Centralized place where all business logic is handled
export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  //Helper functions

  const getContactsSize = () => {
    return contacts.length;
  };

  const getId = (arr: Contact[]) => {
    if (arr.length == 0) {
      return 0;
    }
    return arr.length;
  };

  //ADD

  const addContact = (contact: Contact) =>
    setContacts((prevState) => [
      ...prevState,
      { ...contact, id: getId(prevState) },
    ]);

  const updateContact = (contact: Contact) => {
    setContacts((prevState) =>
      prevState.map((c) => {
        if (c.id == contact.id) {
          return contact;
        }
        return c;
      })
    );
  };

  const deleteContact = (contact: Contact) => {
    setContacts((prevState) => prevState.filter((c) => c.id !== contact.id));
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        getContactsSize,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
//Customs hooks

/**
 * Returns the full value of the context
 */
export const useContactsContext = () => useContext(ContactContext);

//Helpers
export const useContacts = () => useContactsContext().contacts;
export const useAddContact = () => useContactsContext().addContact;
export const useGetContactsSize = () => useContactsContext().getContactsSize;
export const useUpdateContact = () => useContactsContext().updateContact;
export const useDeleteContact = () => useContactsContext().deleteContact;
