import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContacts } from "@/context/ContactsContext";
import { Contact } from "@/app/page";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\+?[0-9]+$/;
  return phoneRegex.test(phone);
};
const EditContact = ({ contact }: { contact: Contact }) => {
  const { editContact } = useContacts();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    address: contact.address,
    notes: contact.notes,
  });

  const [errors, setErrors] = useState("");

  const handleUpdate = async () => {
    if (!newContact.name) {
      setErrors("Name is required.");
      return;
    }
    if (!validatePhoneNumber(newContact.phone)) {
      setErrors(
        "Phone number must contain only numbers and may start with a '+'."
      );
      return;
    }
    if (!validateEmail(newContact.email)) {
      setErrors("Invalid email address.");
      return;
    }
    if (!newContact.address) {
      setErrors("Address is required.");
      return;
    }

    await editContact(newContact);
    setDialogOpen(false);
    setErrors("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="px-1 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
          <MdEdit size={22} color="white" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            change the details and save contact
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone*
            </Label>
            <Input
              id="phone"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email*
            </Label>
            <Input
              id="email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address*
            </Label>
            <Input
              id="address"
              value={newContact.address}
              onChange={(e) =>
                setNewContact({ ...newContact, address: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Input
              id="notes"
              value={newContact.notes}
              onChange={(e) =>
                setNewContact({ ...newContact, notes: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        {errors && <p className="text-red-600 text-sm mt-2">{errors}</p>}
        <DialogFooter>
          <Button type="button" onClick={handleUpdate}>
            Save Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
