import { arrayMove } from "@dnd-kit/sortable";
import { Edit, Minus, ChevronUp, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import { TextArea } from "../MessageInputs";
import { Message } from "../types";

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
