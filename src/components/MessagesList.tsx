import { GripVertical, X } from "lucide-react";

interface MessagesListProps {
  printing?: boolean;
  messages: (string | File)[];
  setMessages: React.Dispatch<React.SetStateAction<(string | File)[]>>;
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
      newMessages[idx1] = newMessages[idx1] + " \n" + newMessages[idx2];
      newMessages.splice(idx2, 1);
      return newMessages;
    });
  }
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      {messages.map((msg, index) => {
        if (!msg) return null;
        // is a string
        if (typeof msg === "string") {
          if (msg.length === 0) return null;
          return (
            <div
              key={index}
              className="w-full  flex justify-between items-center p-3 bg-base-300 rounded-lg">
              {!printing && (
                <div className="h-full p-2 py-5 bg-base-200 group has-[:hover]:bg-info">
                  <GripVertical className="size-4" />
                </div>
              )}
              <p className="w-full">{msg}</p>
              {!printing && (
                <div className="h-full p-2 py-5 bg-base-200 group has-[:hover]:bg-error">
                  <X className="size-4   cursor-pointer" onClick={() => removeMessage(index)} />
                </div>
              )}
            </div>
          );
        }
        //   is a file
      })}
    </div>
  );
}
