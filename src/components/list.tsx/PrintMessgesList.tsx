import { useMemo, useState } from "react";
import { Message } from "../types";
import { breakMesagesArrayInotPages } from "../utils/paging-helpers";
import { MessagesListItem } from "./MessageListItems";

interface PrintMeesagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function PrintMessagesList({
  printing = false,
  messages,
  setMessages,
}: PrintMeesagesListProps) {
  const messagePages = useMemo(() => {
    return breakMesagesArrayInotPages(messages);
  }, [messages]);

  const [messagePagesArr] = useState(Object.entries(messagePages));

  return (
    <div className="flex h-full w-full flex-col gap-3 px-5 py-2">
      {messagePagesArr.map(([k, v]) => {
        const messages = v.messages;
        return (
          <div
            key={k}
            // style={{
            //   height: A4_HEIGHT-61,
            // }}
            className="page flex w-full flex-col items-center gap-10 border border-secondary"
          >
            {messages.map((msg, index) => {
              if (!msg || (!msg.text && !msg.image)) return null;
              if (msg?.text?.length === 0) return null;
              return (
                <MessagesListItem
                  key={msg.id}
                  msg={msg}
                  index={index}
                  printing={printing}
                  setMessages={setMessages}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
