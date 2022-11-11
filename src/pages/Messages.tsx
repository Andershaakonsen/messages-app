import Conversation from "components/Conversation";
import { useGetContactFromId } from "context/ContactContext";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Messages = () => {
  const [params] = useSearchParams();
  const contactId = params.get("contactId");
  const getContactFromId = useGetContactFromId();

  const [messageReceiver, setMessageReceiver] = useState<Contact | null>(() =>
    contactId ? getContactFromId(contactId) : null
  );

  return (
    <div className="">
      {messageReceiver && <Conversation contact={messageReceiver} />}
    </div>
  );
};

export default Messages;
