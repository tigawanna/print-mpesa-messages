import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
type Message = { id: number; text?: string; image?: File };
interface TextAreaProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function TextArea({ setMessages }: TextAreaProps) {
  const [input, setInput] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }
  function appendMessage() {
    if(typeof input !== "string") return
    if (input.length === 0) return;
    const message_chunks = input.split("[");
    console.log(" chks langth ", message_chunks);
    if (message_chunks.length === 1) {
        console.log("adding messages not from whatsapp",input)
      setMessages((prev) => [...prev,{id:prev.length+1,text:input}]);
          setInput("");
      return;
    }
    message_chunks.forEach((message) => {
    const message_body = message.split(":").slice(2).join(" ");
    setMessages((prev) => [...prev, { id: prev.length + 1, text: message_body }]);
    });
    // setMessages(prev => [...prev, input])
    setInput("");
  }

  return (
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center relative px-4">
      <TextareaAutosize
        className="min-h-[20vh] textarea w-full"
        value={input}
        onChange={handleChange}
        placeholder="Paste your mpesa messages here"
      />
      <button className="btn btn-primary" onClick={appendMessage}>
        add to list
      </button>
    </div>
  );
}

export function ImageArea({ setMessages }: TextAreaProps) {
  const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    if (image) {
      setMessages((prev) => [...prev,{id:prev.length+1,image}]);
    }
  }, [image]);
  return(
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center relative px-4">
      <input type="file"
       className="file-input file-input-bordered w-full max-w-xs"
       onChange={(e) => setImage(e.target.files![0])}
       />
    </div>
  )
}
