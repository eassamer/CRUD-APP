import { useState } from "react";
import { MdDelete } from "react-icons/md";
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

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="px-1 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
          <MdDelete size={22} color="white" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95%] md:w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this contact? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              setDialogOpen(false);
            }}
          >
            Yes
          </Button>
          <Button className="mb-4 md:mb-0" onClick={() => setDialogOpen(false)}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
