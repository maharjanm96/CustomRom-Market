import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertBoxProps {
  name: string;
  description: string;
  handleClick: (id: string) => void;
  deviceId: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({
  name,
  description,
  handleClick,
  deviceId,
}) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-black/90 hover:bg-red-600 text-white py-2.5 px-4 rounded-md">
          {name}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClick(deviceId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertBox;
