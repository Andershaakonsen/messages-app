import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase-config";

//Exported for reusability - Every value in context MUST be typed HERE
export interface IContactContext {
  contacts: Contact[];

  // Giving type to addContact, but when its a function you call it a signature
  addContact: (contact: Contact) => void;
  getContactsSize: () => number;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
  getContactFromId: (id: string) => Contact | null;
}

//Creating a context, with a type of Contact Context Interface, and set the default value to undefined temporarily when creating the context;
export const ContactContext = React.createContext<IContactContext>(undefined!);

interface ContactProviderProps {
  children: React.ReactNode;
}
//Centralized place where all business logic is handled
export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const contactsRef = collection(db, "contacts");

  //Set data

  //Helper functions
  const getContactsSize = () => {
    return contacts.length;
  };

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "contacts"),
      (contactsCollection) => {
        const contacts = contactsCollection.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Contact;
        });
        setContacts(contacts);
      }
    );
    return () => unSubscribe();
  }, []);

  const addContact = async (contact: Contact) => {
    // setContacts((prevState) => [
    //   ...prevState,
    //   { ...contact, id: getId(prevState) },
    // ]);
    //Adds document to contacts collection
    await addDoc(collection(db, "contacts"), {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
    });
  };

  const updateContact = async (contact: Contact) => {
    await updateDoc(doc(db, "contacts", contact.id), {
      ...contact,
    });
  };

  const deleteContact = async (contact: Contact) => {
    await deleteDoc(doc(db, "contacts", contact.id));
  };

  const getContactFromId = (id: string) =>
    //if contact is undefined return null
    contacts.find((c) => c.id === id) ?? null;

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        getContactsSize,
        updateContact,
        deleteContact,
        getContactFromId,
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
export const useGetContactFromId = () => useContactsContext().getContactFromId;
