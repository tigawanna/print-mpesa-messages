import { ChevronDown, ChevronUp, GripVertical, Minus} from "lucide-react";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SingleRow } from "./SingleRow";
type Message = { id: number; text?: string; image?: File };
interface MessagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesList({ printing = false, messages, setMessages }: MessagesListProps) {

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-5 ">

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
                    minHeight: msg.text.length > 100 ? "18vh" : "",
                  }}
                  key={msg.id}
                  className="w-full max-h-[45vh]  flex justify-between gap-1  rounded-lg">
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
                  <MessagesRowActions index={index} printing={printing} setMessages={setMessages} />
                </div>
              );
            }
            //   is a file
            if (msg.image) {

              return (
            <MessagesListImageRow index={index} msg={msg} printing={printing} setMessages={setMessages}/>
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
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesRowActions({index,printing,setMessages}:MessagesRowActionsProps){  
  function removeMessage(index: number) {
  setMessages?.((prev) => prev.filter((_, i) => i !== index));
}

function moveUpwards(index: number) {
  setMessages?.((prev) => arrayMove(prev, index, index - 1));
}
function moveDownwards(index: number) {
  setMessages?.((prev) => arrayMove(prev, index, index + 1));
}
if(printing) return null
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
    <button className="btn btn-sm btn-error">
      <Minus className="size-4   cursor-pointer" onClick={() => removeMessage(index)} />
    </button>
  </div>
);
}
