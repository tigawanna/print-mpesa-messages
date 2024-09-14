import { ChevronDown, ChevronUp, Edit, Minus } from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import { TextArea } from "./MessageInputs";
import { breakMesagesArrayInotPages } from "./utils/paging-helpers";

type Message = { id: number; text?: string; image?: File };
interface MessagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}



export function PrintMessagesList({
  printing = false,
  messages,
  setMessages,
}: MessagesListProps) {

  const messagePages = useMemo(() => {
  return breakMesagesArrayInotPages(messages);
  }, [messages]);

  const [messagePagesArr,] = useState(
    Object.entries(messagePages),
  );

return (
    <div className="flex h-full w-full flex-col gap-3 px-5 py-2">
      {messagePagesArr.map(([k, v]) => {
        const messages = v.messages;
        return (
          <div key={k} className="flex h-[1100px] w-full flex-col items-center gap-10 border-b-8 border-b-accent px-5 py-2">
            {messages.map((msg, index) => (
              <MessagesListItem
                key={msg.id}
                msg={msg}
                index={index}
                printing={printing}
                setMessages={setMessages}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
export function MessagesList({
  printing = false,
  messages,
  setMessages,
}: MessagesListProps) {
  


return (
    <div className="flex h-full w-full flex-col gap-3 px-5 py-2">
                  {messages.map((msg, index) => (
              <MessagesListItem
                key={msg.id}
                msg={msg}
                index={index}
                printing={printing}
                setMessages={setMessages}
              />
            ))}

    </div>
  );
}

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
  if (typeof msg.text === "string") {
    if (msg.text.length === 0) return null;
    return (
      <div
        id={msg.id.toString()}
        key={msg.id}
        className="flex w-full flex-col gap-1 rounded-lg bg-base-200 p-2 transition-all duration-700 animate-in zoom-in-95"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <MessagesRowShiftActions
            index={index}
            printing={printing}
            setMessages={setMessages}
          />
          <p className="w-full text-lg"> {msg.text}</p>

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
      <MessagesListImageRow
        index={index}
        msg={msg}
        printing={printing}
        setMessages={setMessages}
      />
    );
  }
}

interface MessagesListImageRowProps {
  msg: Message;
  index: number;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesListImageRow({
  index,
  msg,
  printing = false,
  setMessages,
}: MessagesListImageRowProps) {
  if (!msg.image) return null;
  const imageUrl = URL.createObjectURL(msg.image);
  return (
    <div className="flex w-full justify-between gap-1 rounded-lg">
      <MessagesRowShiftActions
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
      <img
        className="h-full max-h-[45vh] min-h-[20vh] w-full rounded-lg object-cover"
        src={imageUrl}
        alt="image"
      />

      <MessagesRowActions
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
    </div>
  );
}

interface MessagesRowActionsProps {
  index: number;
  msg?: Message;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesRowActions({
  index,
  printing,
  setMessages,
  msg,
}: MessagesRowActionsProps) {
  function removeMessage(index: number) {
    setMessages?.((prev) => prev.filter((_, i) => i !== index));
  }
  const textDialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const textInputDialog = document.getElementById(
      `text-input-modal-${index}`,
    ) as HTMLDialogElement;
    textDialogRef.current = textInputDialog;
  }, []);
  if (printing) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {msg?.text && setMessages && (
          <button
            onClick={() => textDialogRef.current?.showModal()}
            className="btn btn-sm text-warning hover:border hover:border-warning"
          >
            <Edit className="size-4 cursor-pointer" />
          </button>
        )}
        <button
          onClick={() => removeMessage(index)}
          className="btn btn-sm text-error hover:border hover:border-error"
        >
          <Minus className="size-4 cursor-pointer" />
        </button>
      </div>
      {msg?.text && setMessages && (
        <dialog
          ref={textDialogRef}
          id={`text-input-modal-${index}`}
          className="modal w-full min-w-[90%] max-w-[90%]"
        >
          <div className="modal-box w-full min-w-[90%] max-w-[90%] gap-2">
            <h3 className="p-2 text-lg font-bold">Paste in mpesa messages</h3>
            <TextArea
              messageToUpdate={{ idx: index, text: msg?.text ?? "" }}
              setMessages={setMessages}
            />
          </div>
          {/* will close the modal if clicked outside */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
interface MessagesRowShiftActionsProps {
  index: number;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesRowShiftActions({
  index,
  printing,
  setMessages,
}: MessagesRowShiftActionsProps) {
  function moveUpwards(index: number) {
    setMessages?.((prev) => arrayMove(prev, index, index - 1));
  }
  function moveDownwards(index: number) {
    setMessages?.((prev) => arrayMove(prev, index, index + 1));
  }

  if (printing) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button className="btn btn-sm" onClick={() => moveUpwards(index)}>
          <ChevronUp className="size-4 hover:bg-success" />
        </button>
        <button className="btn btn-sm" onClick={() => moveDownwards(index)}>
          <ChevronDown className="size-4 hover:bg-success" />
        </button>
      </div>
    </div>
  );
}
