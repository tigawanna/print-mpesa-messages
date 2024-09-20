import { PrinterIcon } from "lucide-react";
import React from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Message } from "./types";
import { PrintMessagesList } from "./MessagesList";

interface PrintMessagesProps {
  messages: Message[];
}

export function PrintMessages({ messages }: PrintMessagesProps) {
  const componentRef = useRef(null);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-accent btn-wide fixed top-[3%] left-[10%] z-50 animate-bounce">
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
      <div className="flex h-full w-full flex-col p-2">
        <PrintMessagesList messages={this.props.messages} printing />
        {/* <ReactPDFContainer /> */}
      </div>
    );
  }
}
