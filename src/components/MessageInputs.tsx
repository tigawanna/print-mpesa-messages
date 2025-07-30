import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "./types";
import { appendMessage, insertMessages } from "./utils/lists";

interface TextAreaProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageToUpdate?: {
    idx: number;
    text: string;
    order:number
  };
}

export function TextArea({ setMessages, messageToUpdate }: TextAreaProps) {
  const [input, setInput] = useState(messageToUpdate?.text || "");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <TextareaAutosize
        className="textarea h-full min-h-[30vh] w-full bg-white border-2 border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg resize-none"
        value={input}
        onChange={handleChange}
        placeholder={`Paste M-Pesa messages from WhatsApp for auto-parsing
                              
                             OR
                              
Copy individual messages separated with:
                             ---
          
        Get ready for printable statements!`}
      />

      <div className="modal-action w-full gap-4">
        <form method="dialog" className="flex gap-3 w-full justify-center">
          {messageToUpdate?.idx ? (
            <button
              className="btn btn-sm bg-blue-600 text-white border-none"
              onClick={() =>
                insertMessages({ idx: messageToUpdate.idx,order:messageToUpdate.order,text: input,setMessages })
              }
            >
              Insert
            </button>
          ) : (
            <button 
              className="btn btn-sm bg-blue-600 text-white border-none" 
              onClick={()=>appendMessage({
                input,setInput,setMessages
              })}
            >
              Add Messages
            </button>
          )}
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-outline">
            Close
          </button>
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
      setMessages((prev) => {
        return[
        ...prev,
        ...imagesarray.map((image, idx) => {
          return {
            id: prev.length + idx,
            order:idx,
            image:{
              file:image
            },
          };
        }),
      ]});
    }
  }, [imagelist, setMessages]);

  return (
    <div className="flex w-full items-center gap-3 p-4">
      <div className="modal-action w-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Select M-Pesa screenshots or images
            </span>
          </label>
          <input
            type="file"
            multiple={true}
            accept=".jpg, .jpeg, .png , .svg , .webp"
            className="file-input file-input-bordered w-full bg-white border-2 border-gray-300 focus:border-blue-500"
            onChange={(e) => {
              setImageList(e.target.files);
              imageDialogRef.current?.close();
            }}
          />
          <label className="label">
            <span className="label-text-alt text-gray-500">
              Supports: JPG, PNG, SVG, WebP
            </span>
          </label>
        </div>
        <form method="dialog" className="mt-4">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-outline">
            Close
          </button>
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
      <div className="fixed bottom-[5%] right-[10%] flex gap-3">
        <button
          className="btn btn-sm bg-blue-600 text-white border-none"
          onClick={() => textDialogRef.current?.showModal()}
        >
          Text
        </button>
        <button
          className="btn btn-sm bg-gray-600 text-white border-none"
          onClick={() => imageDialogRef.current?.showModal()}
        >
          <ImagePlus />
          Image
        </button>
      </div>
      {/* text dialog */}
      <dialog ref={textDialogRef} id="text-input-modal" className="modal">
        <div className="modal-box gap-2 bg-white border border-gray-300">
          <h3 className="p-2 text-xl font-bold text-gray-800">
            Paste M-Pesa Messages
          </h3>
          <TextArea setMessages={setMessages} />
        </div>
        {/* will close the modal if clicked outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* image dialog */}
      <dialog ref={imageDialogRef} id="image-input-modal" className="modal">
        <div className="modal-box gap-1 bg-white border border-gray-300">
          <h3 className="text-xl font-bold text-gray-800">
            Add M-Pesa Screenshot/Image
          </h3>
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
