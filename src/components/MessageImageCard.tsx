import { useState } from "react";
import { Message } from "./types";
import { RotateCcw, RotateCw } from "lucide-react";
import { MessagesRowShiftActions, MessagesRowActions } from "./list.tsx/MessageListitemActions";

interface MessageImageCardProps {
  msg: Message;
  index: number;
  printing?: boolean;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MessageImageCard({
  index,
  msg,
  printing = false,
  setMessages,
}: MessageImageCardProps) {
  const imageUrl = msg?.image ? URL.createObjectURL(msg?.image.file) : null;

  const [imageAngle, setImageAngle] = useState(0);
  if (!imageUrl) return null;
  function rotateImageLeft() {

    //   imageREf.current.style.transform = `rotate(${imageAngle-90}deg)`
    setImageAngle(imageAngle - 90);
  }
  function rotateImageRight() {

    //   imageREf.current.style.transform = `rotate(${imageAngle+90}deg)`
    setImageAngle(imageAngle + 90);
  }

  return (
    <div className="flex w-full justify-between gap-2 rounded-lg p-2">
      <MessagesRowShiftActions
        msg={msg}
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
      <button className="print:hidden" onClick={rotateImageLeft}>
        <RotateCcw />
      </button>
      <img
        style={{
          transform: `rotate(${imageAngle}deg)`,
        }}
        className="max-h-[300px] w-full rounded-lg"
        src={imageUrl}
        alt="image"
      />
      <button className="print:hidden" onClick={rotateImageRight}>
        <RotateCw />
      </button>
      <MessagesRowActions
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
    </div>
  );
}
