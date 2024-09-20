import { MessageImageCard } from "../MessageImageCard";
import { Message } from "../types";
import { MessagesRowShiftActions, MessagesRowActions } from "./MessageListitemActions";

interface MessagesListItemProps {
  msg: Message;
  index: number;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesListItem({
  index,
  msg,
  printing,
  setMessages,
}: MessagesListItemProps) {
  if (!msg) return null;
  // is a string
  if (typeof msg.text?.content === "string") {
    if (msg.text.content.length === 0) return null;
    return (
      <div
        id={msg.id.toString()}
        // style={{
        //   width: A4_WIDTH,
        // }}
        key={msg.id}
        className="flex w-full flex-col gap-1 rounded-lg bg-base-200 p-2 transition-all duration-700 animate-in zoom-in-95 md:w-[70%] lg:w-[500ppx] print:w-[500px]"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <MessagesRowShiftActions
            msg={msg}
            index={index}
            printing={printing}
            setMessages={setMessages}
          />
          <div className="print:hidden text-3xl border  rounded-full">{msg.order}</div>
          <p className="w-full text-lg"> {msg.text.content}</p>

          <MessagesRowActions
            msg={msg}
            index={index}
            printing={printing}
            setMessages={setMessages}
          />
        </div>
      </div>
    );
  }
  //   is a file
  if (msg.image) {
    return (
      <MessageImageCard
        index={index}
        msg={msg}
        printing={printing}
        setMessages={setMessages}
      />
    );
  }
}
