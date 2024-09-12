import { GripVertical, X } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SingleRow } from "./SingleRow";
type Message = { id: number; text?: string; image?: File };
interface MessagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessagesList({ printing = false, messages, setMessages }: MessagesListProps) {
  function removeMessage(index: number) {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  }
  function shiftMessage(index: number) {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages.splice(index, 1);
      return newMessages;
    });
  }
  function mergeMessage(idx1: number, idx2: number) {
    setMessages((prev) => {
      const newMessages = [...prev];
    //   newMessages[idx1] = newMessages[idx1] + " \n" + newMessages[idx2];
      newMessages.splice(idx1, 1, {id:newMessages[idx1].id,text:newMessages[idx1].text + " \n" + newMessages[idx2].text});
      newMessages.splice(idx2, 1);
      return newMessages;
    });
  }
  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-5 ">

        <SortableContext items={messages} strategy={verticalListSortingStrategy}>
          {messages.map((msg, index) => {
            if (!msg) return null;
            // is a string
            if (typeof msg.text === "string") {
              if (msg.text.length === 0) return null;
              return (
                <SingleRow key={msg.id} id={index.toString()}>
                  <div
                    id={msg.id.toString()}
                    key={msg.id}
                    className="w-full  flex justify-between items-center rounded-lg">
                    {!printing && (
                      <div className="h-full p-2  group has-[:hover]:bg-info">
                        <GripVertical className="size-4" />
                      </div>
                    )}
                    <p className="w-full">{msg.text}</p>
                    {!printing && (
                      <div className="h-full p-2  bg-base-200 group has-[:hover]:bg-error">
                        <X
                          className="size-4   cursor-pointer"
                          onClick={() => removeMessage(index)}
                        />
                      </div>
                    )}
                  </div>
                </SingleRow>
              );
            }
            //   is a file
          })}
        </SortableContext>

    </div>
  );
}

