import EditContact from "./EditContactDialog";

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
import { Label } from "@/components/ui/label";
import { Contact } from "@/app/page";
import DeleteButton from "./DeleteDialogButton";

type ContactCardProps = {
  contact: Contact;
  onDelete: () => void;
};

const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
  const { name, phone, email, address, notes } = contact;
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="cursor-pointer flex items-center justify-between w-full lg:w-[400px] p-4 dark:bg-white border-black rounded-lg bg-transparent border-[2px]">
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex flex-col items-start justify-center flex-grow text-center">
            <span className="font-bold dark:text-black">{name}</span>
            <span className="dark:text-black">{phone}</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-md">
          <DialogHeader>
            <DialogTitle>View Contact</DialogTitle>
            <DialogDescription>
              you can see now all details of the contact
            </DialogDescription>
          </DialogHeader>
          <div className="grid  gap-4 py-4">
            <div className="flex w-[80%] items-center gap-4">
              <Label className="text-right">Name</Label>
              <div className="w-full h-fit">
                <Label className="text-bold text-[18px]">{name}</Label>
              </div>
            </div>
            <div className="flex w-[80%] items-center gap-4">
              <Label className="text-right">Phone</Label>
              <Label className="text-bold text-[18px]">{phone}</Label>
            </div>
            <div className="flex w-[80%] items-center gap-4">
              <Label className="text-right">Email</Label>
              <Label className="text-bold text-[18px]">{email}</Label>
            </div>
            <div className="flex w-[80%] items-center gap-4">
              <Label className="text-right">Address</Label>
              <Label className="text-bold text-[18px]">{address}</Label>
            </div>
            <div className="flex w-[80%] items-center gap-4">
              <Label className="text-right">Notes</Label>
              <Label
                className={`text-bold text-[18px] ${
                  notes
                    ? "text-[18px] text-black dark:text-white"
                    : "text-[15px] text-gray-500"
                }`}
              >
                {notes || "empty"}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex space-x-2">
        <EditContact contact={contact} />
        <DeleteButton onDelete={() => onDelete()} />
      </div>
    </div>
  );
};

export default ContactCard;
