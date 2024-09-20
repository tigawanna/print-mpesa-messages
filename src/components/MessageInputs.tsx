import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "./types";

interface TextAreaProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageToUpdate?: {
    idx: number;
    text: string;
  };
}

export function TextArea({ setMessages, messageToUpdate }: TextAreaProps) {
  const [input, setInput] = useState(messageToUpdate?.text || "");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }
  function appendMessage() {
    if (typeof input !== "string") return;
    if (input.length === 0) return;

    if (input.startsWith("[")) {
      const message_chunks = input.split("[");
      message_chunks.forEach((message, idx) => {
        const message_body = message.split(":").slice(2).join(" ");
            const randomNumber = Math.floor(Math.random() * 1000)+idx;
        setMessages((prev) => [
          ...prev,
          { id: randomNumber, text: message_body },
        ]);
      });
      setInput("");
      return;
    }
    if (input.includes("---")) {
      const message_chunks = input.split("---");
      message_chunks.forEach((message, idx) => {
            const randomNumber = Math.floor(Math.random() * 1000)+idx;
        setMessages((prev) => [
          ...prev,
          { id: randomNumber, text: message.trim() },
        ]);
      });
      setInput("");
      return;
    }
    const randomNumber = Math.floor(Math.random() * 1000);
    setMessages((prev) => [...prev, { id: randomNumber, text: input }]);
    // setMessages(prev => [...prev, input])
    setInput("");
  }

  function insertMessages({ idx, text }: { idx: number; text: string }) {
    const newTextChunks = text.split("---");
    console.log(newTextChunks);
    const spliceFrom = idx - 1;
    const spliceTo = idx + newTextChunks.length - 1;
    const newTextChunksArray = newTextChunks.map((message) => ({
      id: Math.floor(Math.random() * 1000),
      text: message.trim(),
    }));
    setMessages((prev) => [
      ...prev.slice(0, spliceFrom),
      ...newTextChunksArray,
      ...prev.slice(spliceTo),
    ]);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      <TextareaAutosize
        className="textarea h-full min-h-[30vh] w-full"
        value={input}
        onChange={handleChange}
        placeholder={`
          Paste mpesa messages from whatsapp for auto parsing 
                              or 
              copy individual messages separated with 
                             ---
          
          `}
      />

      <div className="modal-action w-full gap-4">
        <form method="dialog" className="flex gap-2">
          {messageToUpdate?.idx ? (
            <button
              className="btn btn-sm text-secondary"
              onClick={() =>
                insertMessages({ idx: messageToUpdate.idx, text: input })
              }
            >
              insert
            </button>
          ) : (
            <button className="btn btn-sm text-primary" onClick={appendMessage}>
              appendt
            </button>
          )}
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm text-error">Close</button>
        </form>
      </div>
    </div>
  );
}

interface ImageAreaProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  imageDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}
export function ImageArea({ setMessages, imageDialogRef }: ImageAreaProps) {
  const [imagelist, setImageList] = useState<FileList | null>(null);
  useEffect(() => {
    if (imagelist !== null) {
      const imagesarray = Array.from(imagelist);
      setMessages((prev) => [
        ...prev,
        ...imagesarray.map((image, idx) => {
          return {
            id: prev.length + idx,
            image,
          };
        }),
      ]);
    }
  }, [imagelist]);

  return (
    <div className="flex w-full items-center gap-1">
      <div className="modal-action">
        <input
          type="file"
          multiple={true}
          accept=".jpg, .jpeg, .png , .svg , .webp"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={(e) => {
            setImageList(e.target.files);
            imageDialogRef.current?.close();
          }}
        />
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
}

export function MessageInputModals({ setMessages }: TextAreaProps) {
  const textDialogRef = useRef<null | HTMLDialogElement>(null);
  const imageDialogRef = useRef<null | HTMLDialogElement>(null);
  useEffect(() => {
    const textInputDialog = document.getElementById(
      "text-input-modal",
    ) as HTMLDialogElement;
    const imageInputDialog = document.getElementById(
      "image-input-modal",
    ) as HTMLDialogElement;
    textDialogRef.current = textInputDialog;
    imageDialogRef.current = imageInputDialog;
  }, []);
  return (
    <>
      <div className="fixed bottom-[5%] right-[10%] flex gap-5">
        <button
          className="btn btn-sm space-x-2 text-primary"
          onClick={() => textDialogRef.current?.showModal()}
        >
          text
        </button>
        <button
          className="btn btn-sm space-x-2 text-primary"
          onClick={() => imageDialogRef.current?.showModal()}
        >
          <ImagePlus />
        </button>
      </div>
      {/* text dialog */}
      <dialog ref={textDialogRef} id="text-input-modal" className="modal">
        <div className="modal-box gap-2">
          <h3 className="p-2 text-lg font-bold">Paste in mpesa messages</h3>
          <TextArea setMessages={setMessages} />
        </div>
        {/* will close the modal if clicked outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* image dialog */}
      <dialog ref={imageDialogRef} id="image-input-modal" className="modal">
        <div className="modal-box gap-1">
          <h3 className="text-lg font-bold">Add mpesa screenshot/image</h3>
          <ImageArea
            setMessages={setMessages}
            imageDialogRef={imageDialogRef}
          />
        </div>
        {/* will close the modal if clicked outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
