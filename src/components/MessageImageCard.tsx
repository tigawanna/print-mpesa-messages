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
    <div className="group flex w-full justify-between gap-4 rounded-lg bg-white border border-gray-300 p-3 shadow-sm md:w-[70%] lg:w-[500px] print:w-[500px]">
      <MessagesRowShiftActions
        msg={msg}
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
      <button 
        className="print:hidden btn btn-sm btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none" 
        onClick={rotateImageLeft}
      >
        <RotateCcw size={16} />
      </button>
      <div className="flex-1 flex justify-center items-center">
        <img
          style={{
            transform: `rotate(${imageAngle}deg)`,
          }}
          className="max-h-[300px] max-w-full rounded-lg object-contain"
          src={imageUrl}
          alt="M-Pesa screenshot"
        />
      </div>
      <button 
        className="print:hidden btn btn-sm btn-circle bg-gray-600 hover:bg-gray-700 text-white border-none" 
        onClick={rotateImageRight}
      >
        <RotateCw size={16} />
      </button>
      <MessagesRowActions
        msg={msg}
        index={index}
        printing={printing}
        setMessages={setMessages}
      />
    </div>
  );
}
