import { MessagesListItem } from "./MessageListItems";


type Message = { id: number; text?: string; image?: File };
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
    <div className="flex h-full w-full flex-col items-center gap-3 px-5 py-2">
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





