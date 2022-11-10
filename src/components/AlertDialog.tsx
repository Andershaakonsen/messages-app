import React, { Children } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

type Props = {
  //ReactNode is a rendered component
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  confirmText: string;
  onConfirm: () => void;
};

const AlertDialog = ({
  children,
  confirmText,
  title,
  subtitle,
  onConfirm,
}: Props) => {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {/* Crashes app if more than one child is present */}
        {Children.only(children)}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="AlertDialogOverlay" />
        <AlertDialogPrimitive.Content className="AlertDialogContent">
          <AlertDialogPrimitive.Title className="AlertDialogTitle">
            {title}
          </AlertDialogPrimitive.Title>
          {subtitle && (
            <AlertDialogPrimitive.Description className="AlertDialogDescription">
              {subtitle}
            </AlertDialogPrimitive.Description>
          )}
          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <AlertDialogPrimitive.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild onClick={onConfirm}>
              <button className="Button red">{confirmText}</button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;
