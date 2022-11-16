import React from "react";

type Props = {
  msg: Message;
};

const ReceiverMessage = ({ msg }: Props) => {
  console.log(msg.createdAt);
  return (
    <div className="flex justify-start w-full mt-2">
      <p className="w-fit bg-radix-mauve4 rounded-lg max-w-[300px] py-1 px-2 text-sm sm:max-w-sm">
        {msg.text}
      </p>
    </div>
  );
};

export default ReceiverMessage;
