import { PrinterIcon } from "lucide-react";
import React from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Message } from "./types";
import { PrintMessagesList } from "./list.tsx/PrintMessgesList";


interface PrintMessagesProps {
  messages: Message[];
}

export function PrintMessages({ messages }: PrintMessagesProps) {
  const componentRef = useRef(null);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50">
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary btn-wide fixed top-[3%] left-[10%] z-50 bg-blue-600 text-white border-none">
            <PrinterIcon />
            Print Now
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

export class PrintThis extends React.Component<MyProps, Record<string, never>> {
  constructor(props: MyProps) {
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
