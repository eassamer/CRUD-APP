"use client";
import React from "react";

import { useContacts } from "@/context/ContactsContext";
import { SwitchTheme } from "@/components/SwitchTheme";
import AddContactDialog from "@/components/AddContactDialog";
import ContactCard from "@/components/ContactCard";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
}

export default function Home() {
  const { contacts, deleteContact } = useContacts();

  return (
    <div className="w-[100vw] h-[100vh] dark:bg-black bg-white px-6 py-4 md:px-10 md:py-8">
      <div className="w-full h-fit py-2 flex items-center justify-between mb-4 md:mb-8">
        <h1 className="font-bold text-[30px]">Contacts</h1>
        <SwitchTheme />
      </div>
      <div className="w-full h-fit mb-4">
        <div className="w-full h-fit flex items-center justify-end">
          <AddContactDialog />
        </div>
      </div>
      {contacts.length > 0 ? (
        <div className="w-full h-fit flex flex-wrap gap-4">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              contact={contact}
              onDelete={() => {
                deleteContact(contact.id);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[500px]">
          <h1 className="font-bold tracking-wider text-[30px]">No Contact</h1>
        </div>
      )}
    </div>
  );
}
