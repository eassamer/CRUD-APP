import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContacts } from "@/context/ContactsContext";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\+?[0-9]+$/;
  return phoneRegex.test(phone);
};

const AddContactDialog = () => {
  const { addContact } = useContacts();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    if (
      newContact.name.length == 0 ||
      newContact.phone.length == 0 ||
      newContact.email.length == 0
    ) {
      return "Name, Phone, Email, Address are required.";
    }
    if (!validatePhoneNumber(newContact.phone)) {
      return "Phone number can only contain numbers and may start with a '+'.";
    }

    if (!validateEmail(newContact.email)) {
      return "Invalid email address.";
    }

    return null;
  };

  const handleAddContact = async () => {
    const validationError = validateFields();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setIsLoading(true);
    setErrors(null);

    try {
      await addContact(newContact);
      setDialogOpen(false);
      setNewContact({ name: "", phone: "", email: "", address: "", notes: "" });
    } catch (error) {
      setErrors("Failed to add the contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="dark:bg-white bg-black dark:text-black text-white flex items-center justify-center">
          <FiPlus className="text-white dark:text-black" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new contact.
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
          <Button type="button" onClick={handleAddContact} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Contact"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
