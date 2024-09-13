import { ChevronDown, ChevronUp, Edit, GripVertical, Minus } from "lucide-react";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SingleRow } from "./SingleRow";
import { useEffect,useRef } from "react";
import { TextArea } from "./MessageInputs";
type Message = { id: number; text?: string; image?: File };
interface MessagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

// const A4height = 1100;
// const A4width = 790;



export function MessagesList({ printing = false, messages, setMessages }: MessagesListProps) {
//  condider a recuursive list

  const listContainerRef = useRef<null | HTMLDivElement>(null);
   const listHeight = listContainerRef.current?.clientHeight
  const windowHeight = window.innerHeight;
  console.log("window height", windowHeight);
  console.log("client  listHeight", listHeight);
  return (
    <div ref={listContainerRef} className="w-full h-full flex flex-col gap-3 py-2 px-5 ">
      <SortableContext items={messages} strategy={verticalListSortingStrategy}>
        {messages.map((msg, index) => {
          if (!msg) return null;
          // is a string
          if (typeof msg.text === "string") {
            if (msg.text.length === 0) return null;

            return (
              <div
                id={msg.id.toString()}
                style={{
                  minHeight: msg.text.length > 100 ? "20vh" : "",
                }}
                key={msg.id}
                className="w-full lg:max-h-[45vh]  flex justify-between gap-1  rounded-lg">
                <div className="w-[90%]">
                <SingleRow key={msg.id} id={index.toString()}>
                  <div className="w-full flex justify-between  rounded-lg">
                    {!printing && (
                      <div className="h-full p-2  group has-[:hover]:bg-info">
                        <GripVertical className="size-4" />
                      </div>
                    )}
                    <p className="w-full">{msg.text}</p>
                  </div>
                </SingleRow>
                  </div>
                <MessagesRowActions
                  msg={msg}
                  index={index}
                  printing={printing}
                  setMessages={setMessages}
                />
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
        })}
      </SortableContext>
    </div>
  );
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
    <div className=" w-full flex justify-between gap-1  rounded-lg">
      <SingleRow key={msg.id} id={index.toString()}>
        <img
          className="w-full h-full min-h-[20vh] max-h-[45vh]  object-cover rounded-lg"
          src={imageUrl}
          alt="image"
        />
      </SingleRow>
      <MessagesRowActions index={index} printing={printing} setMessages={setMessages} />
    </div>
  );
}

interface MessagesRowActionsProps {
  index: number;
  msg?: Message;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesRowActions({ index, printing, setMessages, msg }: MessagesRowActionsProps) {
  function removeMessage(index: number) {
    setMessages?.((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUpwards(index: number) {
    setMessages?.((prev) => arrayMove(prev, index, index - 1));
  }
  function moveDownwards(index: number) {
    setMessages?.((prev) => arrayMove(prev, index, index + 1));
  }
  const textDialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const textInputDialog = document.getElementById(
      `text-input-modal-${index}`
    ) as HTMLDialogElement;
    textDialogRef.current = textInputDialog;
  }, []);
  if (printing) return null;
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      <div className="flex flex-wrap  justify-center items-center gap-2">
        <button className="btn btn-sm" onClick={() => moveUpwards(index)}>
          <ChevronUp className="size-4 hover:bg-success" />
        </button>
        <button className="btn btn-sm" onClick={() => moveDownwards(index)}>
          <ChevronDown className="size-4 hover:bg-success" />
        </button>
      </div>
      <div className="flex flex-wrap  justify-center items-center gap-2">
        {msg?.text && setMessages && (
          <button className="btn btn-sm text-warning">
            <Edit
              className="size-4   cursor-pointer"
              onClick={() => textDialogRef.current?.showModal()}
            />
          </button>
        )}
        <button className="btn btn-sm text-error">
          <Minus className="size-4   cursor-pointer" onClick={() => removeMessage(index)} />
        </button>
      </div>
      {msg?.text && setMessages && (
        <dialog
          ref={textDialogRef}
          id={`text-input-modal-${index}`}
          className="modal w-full min-w-[90%] max-w-[90%]">
          <div className="modal-box gap-2 w-full min-w-[90%] max-w-[90%]">
            <h3 className="font-bold text-lg p-2">Paste in mpesa messages</h3>
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
