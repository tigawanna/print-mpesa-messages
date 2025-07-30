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
        className="group flex w-full flex-col gap-1 rounded-lg bg-white border border-gray-300 p-3 shadow-sm md:w-[70%] lg:w-[500px] print:w-[500px]"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <MessagesRowShiftActions
            msg={msg}
            index={index}
            printing={printing}
            setMessages={setMessages}
          />
          <div className="print:hidden flex items-center justify-center w-8 h-8 bg-gray-500 text-white rounded-full font-medium text-sm">
            {msg.order}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-black leading-normal break-words font-mono text-sm"> 
              {msg.text.content}
            </p>
          </div>

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
