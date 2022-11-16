import React from "react";

type Props = {
  msg: Message;
};

const SenderMessage = ({ msg }: Props) => {
  return (
    <div className="flex justify-end w-full mt-2">
      <p className="w-fit bg-radix-blue8 rounded-lg max-w-[300px] py-1 px-2 text-sm lg:max-w-sm">
        {msg.text}
      </p>
    </div>
  );
};

export default SenderMessage;
