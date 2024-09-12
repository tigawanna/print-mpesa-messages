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
            if (msg.image) {
              const imageUrl = URL.createObjectURL(msg.image);
              return (
                <SingleRow key={msg.id} id={index.toString()}>
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={imageUrl}
                    alt="image"
                  />
                </SingleRow>
              );
            }
          })}
        </SortableContext>

    </div>
  );
}

