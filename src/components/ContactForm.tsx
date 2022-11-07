import React, { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contact } from "../types";

interface Props {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactForm = ({ setContacts }: Props) => {
  const { register, handleSubmit, reset } = useForm<Contact>();
  const onSubmit = (data: Contact) => {
    setContacts((prevState) => [...prevState, data]);
    reset({ firstName: "", lastName: "", phoneNumber: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex m-4 flex-col">
      <div className="flex  mt-4 w-full justify-center">
        <input
          type="text"
          {...register("firstName")}
          placeholder="First Name..."
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3"
          required
        />
      </div>
      <div className="flex mt-4 w-full justify-center">
        <input
          type="text"
          {...register("phoneNumber")}
          placeholder="Phone Number..."
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3"
          required
        />
      </div>
      <div className="flex mt-2 w-full justify-center">
        <button
          type="submit"
          className="border  mt-1 px-5 rounded py-2  text-radix-mauve12 violet-bg-int violet-border-int"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
