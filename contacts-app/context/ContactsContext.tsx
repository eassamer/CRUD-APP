"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { Contact } from "@/app/page";



type ContactsContextType = {
  contacts: Contact[];
  fetchContacts: () => Promise<void>;
  addContact: (contact: Omit<Contact, "id">) => Promise<void>;
  editContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
};

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("/api/contacts");
      setContacts(data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const addContact = async (contact: Omit<Contact, "id">) => {
    try {
      const { data } = await axios.post("/api/contacts", contact);
      setContacts([...contacts, data.contact]);
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  const editContact = async (contact: Contact) => {
    try {
      await axios.put("/api/contacts", contact);
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...contact } : c))
      );
    } catch (error) {
      console.error("Failed to edit contact:", error);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      await axios.delete("/api/contacts", { data: { id } });
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        fetchContacts,
        addContact,
        editContact,
        deleteContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
