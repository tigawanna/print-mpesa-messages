import { Edit, Minus, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from "lucide-react";
import { useRef, useEffect } from "react";
import { TextArea } from "../MessageInputs";
import { Message } from "../types";
import { mergeInto } from "../utils/lists";

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
  }, [index]);
  if (printing) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {msg?.text && setMessages && (
          <button
            onClick={() => textDialogRef.current?.showModal()}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            <Edit className="size-4" />
          </button>
        )}
        <button
          onClick={() => removeMessage(index)}
          className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
        >
          <Minus className="size-4" />
        </button>
      </div>
      {msg?.text && setMessages && (
        <dialog
          ref={textDialogRef}
          id={`text-input-modal-${index}`}
          className="modal w-full min-w-[90%] max-w-[90%]"
        >
          <div className="modal-box w-full min-w-[90%] max-w-[90%] gap-2 bg-white border border-gray-300">
            <h3 className="p-2 text-xl font-bold text-gray-800">
              Edit M-Pesa Message
            </h3>
            <TextArea
              messageToUpdate={{ idx: index, text: msg?.text.content ?? "",order:msg?.order }}
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
  msg?: Message;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesRowShiftActions({
  index,
  printing,
  msg,
  setMessages,
}: MessagesRowShiftActionsProps) {
  function moveUpwards(index: number) {
    setMessages?.((prev) =>{
      const mainItem = prev[index];
      const otherItem = prev[index-1];
      const newArray = prev.map((item, i) => {
        if (i === index) return {
          ...item,order:otherItem?.order
        }
        if (i === index - 1) return {
          ...item,order:mainItem?.order
        }
        return item
      })
      return newArray
    } );
  }
  function moveDownwards(index: number) {
    // setMessages?.((prev) => arrayMove(prev, index, index + 1));
    setMessages?.((prev) =>{
      const mainItem = prev[index];
      const otherItem = prev[index+1];
      const newArray = prev.map((item, i) => {
        if (i === index) return {
          ...item,order:otherItem?.order
        }
        if (i === index + 1) return {
          ...item,order:mainItem?.order
        }
        return item
      })
      return newArray
    } );
  }

  if (printing) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
      <div className="flex flex-col gap-1">
        <button
          className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white border-none"
          onClick={() =>
            mergeInto({ index, setMessages, target: "above", msg })
          }
          title="Merge with above"
        >
          <ChevronsUp className="size-3" />
        </button>
        <button
          className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white border-none"
          onClick={() => moveUpwards(index)}
          title="Move up"
        >
          <ChevronUp className="size-3" />
        </button>
        <button
          className="btn btn-xs bg-gray-500 hover:bg-gray-600 text-white border-none"
          onClick={() => moveDownwards(index)}
          title="Move down"
        >
          <ChevronDown className="size-3" />
        </button>
        <button
          className="btn btn-xs bg-gray-600 hover:bg-gray-700 text-white border-none"
          onClick={() =>
            mergeInto({ index, setMessages, target: "below", msg })
          }
          title="Merge with below"
        >
          <ChevronsDown className="size-3" />
        </button>
      </div>
    </div>
  );
}
