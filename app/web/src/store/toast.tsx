// src/lib/toast.tsx
import React from "react";
import { atom, useRecoilCallback } from "recoil";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

// Define the structure of a toast
interface ToastMessage {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Recoil atom to store the current toast
const toastAtom = atom<ToastMessage | null>({
  key: "toastAtom",
  default: null,
});

// Custom hook to show toasts
export const useToast = () => {
  const showToast = useRecoilCallback(
    ({ set }) =>
      (message: ToastMessage) => {
        set(toastAtom, message);
        toast({
          title: message.title,
          description: message.description,
          variant: message.variant,
        });
      },
    []
  );

  return showToast;
};

// ToastProvider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

// Example usage in a component
export const ToastExample: React.FC = () => {
  const showToast = useToast();

  const handleShowToast = () => {
    showToast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default",
    });
  };

  return <Button onClick={handleShowToast}>Show Toast</Button>;
};

// Function to show toast from outside React components (e.g., in Recoil selectors)
export const showToastFromRecoil = (message: ToastMessage) => {
  toast({
    title: message.title,
    description: message.description,
    variant: message.variant,
  });
};
