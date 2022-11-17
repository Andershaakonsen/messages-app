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
import { Account, useUser } from "./AuthContext";

//Exported for reusability - Every value in context MUST be typed HERE
export interface IContactContext {
  contacts: Contact[];

  // Giving type to addContact, but when its a function you call it a signature
  addContact: (account: Account) => void;
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
  const user = useUser();

  //Set data

  //Helper functions
  const getContactsSize = () => {
    return contacts.length;
  };

  useEffect(() => {
    if (!user?.uid) return;
    const contactsRef = collection(db, "accounts", user.uid, "contacts");

    const unSubscribe = onSnapshot(contactsRef, (contactsCollection) => {
      const contacts = contactsCollection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Contact;
      });
      setContacts(contacts);
    });
    return () => unSubscribe();
  }, [user?.uid]);

  const addContact = async (account: Account) => {
    await addDoc(collection(db, "accounts", user!.uid, "contacts"), {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
    });
  };

  // const updateContact = async (contact: Contact) => {
  //   await updateDoc(doc(db, "contacts", contact.id), {
  //     ...contact,
  //   });
  // };

  const updateContact = async (contact: Contact) => {
    await updateDoc(doc(db, "accounts", user!.uid, "contacts", contact.id), {
      ...contact,
    });
  };

  const deleteContact = async (contact: Contact) => {
    await deleteDoc(doc(db, "accounts", user!.uid, "contacts", contact.id));
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
