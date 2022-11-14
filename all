import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDeleteContact, useUpdateContact } from "../context/ContactContext";
import { useToast } from "../context/ToastContext";
import equal from "fast-deep-equal";
import { AiFillMessage } from "react-icons/ai";

import AlertDialog from "./AlertDialog";
export interface IContactCard {
  contact: Contact;
}

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
}

const ContactCard = ({ contact }: IContactCard) => {
  const [edit, setEdit] = useState(false);
  const { firstName, lastName, email } = contact;

  //Context
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const toast = useToast();

  //HookForm
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log("submitted!");
    const newContact: Contact = {
      ...data,
      id: contact.id,
    };

    //No changes made
    if (equal(contact, newContact)) {
      toast.open({
        message: "No changes made",
        background: "var(--violet9)",
      });
      setEdit(false);
      return;
    }

    updateContact(newContact);
    toast.success("Update Contact");
    setEdit(false);
  };

  const handleDelete = () => {
    deleteContact(contact);
    toast.error(`Deleted ${contact.firstName} from list!`);
  };

  const handleMessage = () => {};

  return (
    <div className="flex w-full justify-between border-b border-radix-mauve4 bg-radix-mauve2 hover:bg-radix-mauve3">
      {edit ? (
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              defaultValue={firstName}
              {...register("firstName")}
              placeholder="Enter first name"
              className="outline-none bg-radix-mauve4 border focus:border-radix-violet7 border-radix-mauve6 px-1"
            />
            <input
              type="text"
              defaultValue={lastName}
              {...register("lastName")}
              placeholder="Enter last name"
              className="outline-none bg-radix-mauve4 border focus:border-radix-violet7 border-radix-mauve6 px-1"
            />
          </div>
          <input
            type="text"
            defaultValue={email}
            {...register("email")}
            placeholder="Enter email"
            className="outline-none bg-radix-mauve4 border focus:border-radix-violet7 border-radix-mauve6 px-1 mt-2"
          />
          <div className="flex items-center gap-1 my-2">
            <button
              type="submit"
              className="text-sm border border-radix-green6 hover:border-radix-green7 px-2 text-radix-green10 hover:text-radix-green12 cursor-pointer hover:scale-110 transition-all"
            >
              UPDATE
            </button>
            <button
              className="text-sm border border-radix-red6 hover:border-radix-red7 px-2 text-radix-red10 hover:text-radix-red12 cursor-pointer hover:scale-105 transition-all"
              type="button"
              onClick={() => setEdit(false)}
            >
              UNDO
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="py-2 px-1 text-radix-mauve11">
            <div>
              <p className="font-semibold text-radix-violet12 ">
                {firstName} {lastName}
              </p>
            </div>
            <p className="italic">{email}</p>
          </div>
          <div className="flex items-center ">
            <Link to={`/messages?contactId=${contact.id}`}>
              <AiFillMessage
                onClick={handleMessage}
                className="text-2xl text-radix-blue9 hover:text-radix-blue12 cursor-pointer hover:scale-110 transition-all"
              />
            </Link>
            <MdModeEditOutline
              onClick={() => setEdit(true)}
              className="text-2xl text-radix-green10 hover:text-radix-green12 cursor-pointer hover:scale-110 transition-all"
            />
            <AlertDialog
              title={`Vil du slette ${firstName}`}
              onConfirm={handleDelete}
              confirmText="Delete"
            >
              <button>
                <IoMdTrash className="text-2xl text-radix-red10 hover:text-radix-red12 cursor-pointer  hover:scale-110 transition-all" />
              </button>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactCard;
