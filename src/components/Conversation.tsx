import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface IConversation {
  contact: Contact;
}

const Conversation = ({ contact }: IConversation) => {
  const { firstName, lastName, email } = contact;

  return (
    <div className="flex flex-col md:w-2/3 mx-auto ">
      <div className="grid grid-cols-12 items-center border-b border-radix-mauve6 py-1">
        <IoMdArrowBack className="text-4xl violet-bg-int violet-border-int  rounded-full border p-1 cursor-pointer  ml-2 col-span-1" />
        <h3 className="text-center mt-0 md:mt-4 text-xl col-span-10">
          {firstName} {lastName}
        </h3>
      </div>
      <div></div>
    </div>
  );
};

export default Conversation;
