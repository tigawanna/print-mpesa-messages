import { Message } from "../types";
import { MessagesListItem } from "./MessageListItems";


interface MessagesListProps {
  printing?: boolean;
  messages: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}


export function MessagesList({
  printing = false,
  messages,
  setMessages,
}: MessagesListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 px-5 py-4">
      {messages.length > 0 && !printing && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your M-Pesa Messages ({messages.length})
          </h2>
          <p className="text-gray-600 mt-2">Review and organize your messages before printing</p>
        </div>
      )}
      {messages.sort((a, b) => a.order - b.order).map((msg, index) => (
        <MessagesListItem
          key={msg.id}
          msg={msg}
          index={index}
          printing={printing}
          setMessages={setMessages}
        />
      ))}
      {messages.length === 0 && !printing && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
          <p className="text-gray-500">Add some M-Pesa messages to get started!</p>
        </div>
      )}
    </div>
  );
}





