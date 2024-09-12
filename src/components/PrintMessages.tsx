import { PrinterIcon } from "lucide-react";
import React from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Message } from "./types";
import { MessagesList } from "./MessagesList";

interface PrintMessagesProps {
  messages: Message[];
}

export function PrintMessages({messages}:PrintMessagesProps){
const componentRef = useRef(null);
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <ReactToPrint
      trigger={() => (
        <button className="btn btn-accent btn-wide animate-bounce fixed top-[3%] z-50">
          <PrinterIcon />
        </button>
      )}
      content={() => componentRef.current}
    />
    <PrintThis ref={componentRef} messages={messages} />
  </div>
);
}


type MyProps = {
  ref: React.MutableRefObject<null>;
  messages: Message[];
};


export class PrintThis extends React.Component<MyProps, {}> {
  constructor(props: any) {
    super(props);
}

  render() {
    return (
      <div className="p-2 flex flex-col w-full h-full">
        <MessagesList messages={this.props.messages} printing/>
      </div>
    );
  }
}
