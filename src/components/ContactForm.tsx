import React, { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddContact } from "../context/ContactContext";
import { IoMdArrowBack } from "react-icons/io";
export interface IContactForm {
  setShowAddContact: (bool: boolean) => void;
}

const ContactForm = ({ setShowAddContact }: IContactForm) => {
  //Context
  const addContact = useAddContact();
  const { register, handleSubmit, reset } = useForm<Contact>();

  const onSubmit = (data: Contact) => {
    addContact(data);
    reset({ firstName: "", lastName: "", email: "" });
    setShowAddContact(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex m-4 flex-col w-full md:w-2/3"
    >
      <div className="flex mt-4 w-full justify-center ">
        <h2 className="text font-bold">Add Contact</h2>
      </div>
      <div className="flex  mt-4 w-full justify-center">
        <input
          type="text"
          {...register("firstName")}
          placeholder="First Name"
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3"
          required
        />
      </div>
      <div className="flex  mt-4 w-full justify-center">
        <input
          type="text"
          {...register("lastName")}
          placeholder="Last Name"
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3"
          required
        />
      </div>
      <div className="flex mt-4 w-full justify-center">
        <input
          type="text"
          {...register("email")}
          placeholder="Email"
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3"
          required
        />
      </div>
      <div className="flex mt-2 w-full justify-center items-center">
        <button
          type="submit"
          className="border  mt-1 px-5 rounded py-2  text-radix-mauve12 violet-bg-int violet-border-int cursor-pointer"
        >
          Save
        </button>
        <IoMdArrowBack
          className="text-4xl violet-bg-int violet-border-int  rounded-full border p-1 cursor-pointer mt-2 ml-2"
          onClick={() => setShowAddContact(false)}
        />
      </div>
    </form>
  );
};

export default ContactForm;
