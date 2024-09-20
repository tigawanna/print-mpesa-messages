import { Message } from "../types";

interface AppendMessagesProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
export function appendMessage({
  input,
  setInput,
  setMessages,
}: AppendMessagesProps) {
  if (typeof input !== "string") return;
  if (input.length === 0) return;

  if (input.startsWith("[")) {
    const message_chunks = input.split("[");
    message_chunks.forEach((message, idx) => {
      const message_body = message.split(":").slice(2).join(" ");
      const randomNumber = Math.floor(Math.random() * 1000) + idx;
      setMessages((prev) => {
        const lastOrder = getLastOrder(prev);
        return [
          ...prev,
          {
            id: randomNumber,
            order: lastOrder + idx + 1,
            text: {
              content: message_body.trim(),
            },
          },
        ];
      });
    });
    setInput("");
    return;
  }
  if (input.includes("---")) {
    const message_chunks = input.split("---");
    message_chunks.forEach((message, idx) => {
      const randomNumber = Math.floor(Math.random() * 1000) + idx;
      setMessages((prev) => {
        const lastOrder = getLastOrder(prev);
        return [
          ...prev,
          {
            id: randomNumber,
            order: lastOrder + idx + 1,
            text: {
              content: message.trim(),
            },
          },
        ];
      });
    });
    setInput("");
    return;
  }
  const randomNumber = Math.floor(Math.random() * 1000);
  setMessages((prev) => {
    const lastOrder = getLastOrder(prev);
    return [
      ...prev,
      {
        id: randomNumber,
        order: lastOrder + 1,
        text: {
          content: input.trim(),
        },
      },
    ];
  });
  // setMessages(prev => [...prev, input])
  setInput("");
}

interface InsertMessagesProps {
  idx: number;
  text: string;
  order: number;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function insertMessages({
  idx,
  order,
  text,
  setMessages,
}: InsertMessagesProps) {
  const newTextChunks = text.split("---");
  const spliceFrom = idx - 1;
  const spliceTo = idx + newTextChunks.length;

  const newChunks = newTextChunks.map((message, idx) => ({
    id: Math.floor(Math.random() * 1000),
    order: order + 1 + idx,
    text: {
      content: message.trim(),
    },
  }));

  setMessages((prev) => {
    console.log("splicing==", spliceFrom, spliceTo, newChunks);
    console.log("==prevSection == ", prev.slice(0, spliceFrom));
    console.log("==nextSection == ", prev.slice(spliceTo));
    return [
    ...prev.slice(0, spliceFrom),
    ...newChunks,
    ...prev.slice(spliceTo),
  ]});
}



interface MergeIntoProps {
  target:"above"|"below"
  index: number;
  msg?: Message;
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}
export function mergeInto({index,target,msg,setMessages}:MergeIntoProps){
if(target === "above"){
  setMessages?.((prev) => {
    const newArray = prev.map((item, i) => {
      if(i === index-1){
        return {
          ...item,
          text:{
            content:item?.text?.content + " \n ---" + msg?.text?.content
          }
        }
      }
      return item
    })
    newArray.splice(index,1)
    return newArray
  })
}

if(target === "below"){
  setMessages?.((prev) => {
    const newArray = prev.map((item, i) => {
      if(i === index+1){
        return {
          ...item,
          text:{
            content:msg?.text?.content+"--- \n"+item?.text?.content
          }
        }
      }
      return item
    })
    newArray.splice(index,1)
    return newArray
  })
}
}

export function simpleSequentilaID() {
  return (
    new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
  );
}

export function getLastOrder(messages: Message[]) {
  return messages.length > 0
    ? Math.max(...messages.map((msg) => msg.order)) + 1
    : 1;
}
