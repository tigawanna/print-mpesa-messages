import { useEvent } from "@dnd-kit/utilities";
import { Image, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center ">
      <TextareaAutosize
        className="min-h-[30vh] h-full textarea w-full"
        value={input}
        onChange={handleChange}
        placeholder="Paste your mpesa messages here"
      />
   
      <div className="modal-action w-full gap-4">
      <button className="btn btn-sm btn-primary" onClick={appendMessage}>
        add to list
      </button>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-error">Close</button>
        </form>
      </div>
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
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center relative px-4">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={(e) => setImage(e.target.files![0])}
      />
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
}

export function MessageInputModals({setMessages}: TextAreaProps) {
  const textDialogRef = useRef<null | HTMLDialogElement>(null);
  const imageDialogRef = useRef<null | HTMLDialogElement>(null);
  useEffect(() => {
    const textInputDialog = document.getElementById("text-input-modal") as HTMLDialogElement;
    const imageInputDialog = document.getElementById("image-input-modal") as HTMLDialogElement;
    textDialogRef.current = textInputDialog
    imageDialogRef.current = imageInputDialog
  },[])
  return (
    <>
      <div className="fixed bottom-[10%] right-[5%] flex gap-2">
        <button
          className="btn btn-sm btn-primary "
          onClick={() => textDialogRef.current?.showModal()}>
          text
        </button>
        <button
          className="btn btn-sm btn-primary "
          onClick={() => imageDialogRef.current?.showModal()}>
          <ImagePlus />
        </button>
      </div>
      {/* text dialog */}
      <dialog ref={textDialogRef} id="text-input-modal" className="modal">
        <div className="modal-box gap-2">
          <h3 className="font-bold text-lg p-2">Paste in mpesa messages</h3>
          <TextArea setMessages={setMessages} />
        </div>
      </dialog>
      {/* image dialog */}
      <dialog ref={imageDialogRef} id="image-input-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Image go here</h3>
          <ImageArea setMessages={setMessages}/>

        </div>
      </dialog>
    </>
  );
}
