import { useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { MessageInputModals } from "./components/MessageInputs";
import { MessagesList } from "./components/MessagesList";
import { Message } from "./components/types";
import { PrintMessages } from "./components/PrintMessages";
import { Printer, X } from "lucide-react";
import  { PWAStatusPill } from "./components/PWAStatusPill";


function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  // console.log(" ==  messags  ==== ",messages)
  const [isPrinting, setIsPrinting] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;
    if (active.id === over?.id) return;
    setMessages((messages) => {
      // const originalPos = getMessagePos(Number.parseInt(active?.id.toString()));
      // const newPos = getMessagePos(over?.id.toString() as unknown as number);
      const originalPos = Number.parseInt(active?.id.toString());
      const newPos = Number.parseInt(over?.id.toString());
      if (originalPos === newPos) return messages;
      if (originalPos > newPos) return arrayMove(messages, originalPos, newPos);
      return arrayMove(messages, newPos, originalPos);
    });
  };

  return (
    <div className="min-h-screen w-full h-full flex flex-col  justify-center items-center p-2">
      {/* <div className="circle-to-pill ">pill aniamtion</div> */}
      <PWAStatusPill />
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {isPrinting ? (
          <PrintMessages messages={messages} />
        ) : (
          <MessagesList messages={messages} setMessages={setMessages} />
        )}
      </DndContext>
      <button
        className="btn btn-primary fixed bottom-[5%] left-[5%]"
        onClick={() => setIsPrinting(!isPrinting)}>
        {isPrinting ? <X className="" /> : <Printer className="" />}
      </button>
      <MessageInputModals setMessages={setMessages} />
      {/* <PWABadge/> */}
    </div>
  );
}

export default App;

// const defaultMessage = [
//   {
//     id: 1,
//     text: "",
//   },
//   {
//     id: 2,
//     text: " SGN6KR18JQ Confirmed. Ksh7,000.00 sent to HFC Limited for account 2000080714 on 23/7/24 at 1 29 PM New M-PESA balance is Ksh4,405.66. Transaction cost, Ksh42.00.Amount you can transact within the day is 486,480.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
//   },
//   {
//     id: 3,
//     text: " G-20\n",
//   },

//   {
//     id: 9,
//     text: " SGU4EDTDU0 Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on 30/7/24 at 9 37 PM New M-PESA balance is Ksh0.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 483,330.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
//   },

//   {
//     id: 18,
//     text: " janetmkanyika.jm@gmail.com\n",
//   },
//   {
//     id: 19,
//     text: " SI57JJZNKB Confirmed. Ksh58,800.00 sent to HFC Limited for account 2000080714 on 5/9/24 at 6 18 PM New M-PESA balance is Ksh3,833.33. Transaction cost, Ksh108.00.Amount you can transact within the day is 439,180.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.",
//   },
// ];
