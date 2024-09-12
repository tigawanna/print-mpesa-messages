import { useState } from "react";
import { TextArea } from "./components/MessageInputs";
import { MessagesList } from "./components/MessagesList";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove,sortableKeyboardCoordinates } from "@dnd-kit/sortable";

type Message = { id: number; text?: string; image?: File };

function App() {
  const [messages, setMessages] = useState<Message[]>(defaultMessage);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );



  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if(!over || !active) return
    if (active.id === over?.id) return;
    setMessages((messages) => {
      // const originalPos = getMessagePos(Number.parseInt(active?.id.toString()));
      // const newPos = getMessagePos(over?.id.toString() as unknown as number);
      const originalPos = Number.parseInt(active?.id.toString());
      const newPos = Number.parseInt(over?.id.toString());
      if(originalPos === newPos) return messages
      if(originalPos > newPos) return arrayMove(messages, originalPos, newPos);
      return arrayMove(messages,newPos, originalPos);
    });
  };

  return (
    <div className="min-h-screen w-full h-full flex flex-col bg-base-100 text-base-content justify-center items-center p-2">
      <div className="text-2xl">uwu</div>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <MessagesList  messages={messages} setMessages={setMessages} />
      </DndContext>
      <TextArea setMessages={setMessages} />
    </div>
  );
}

export default App;

const defaultMessage = [
  {
    id: 1,
    text: "",
  },
  {
    id: 2,
    text: " SGN6KR18JQ Confirmed. Ksh7,000.00 sent to HFC Limited for account 2000080714 on 23/7/24 at 1 29 PM New M-PESA balance is Ksh4,405.66. Transaction cost, Ksh42.00.Amount you can transact within the day is 486,480.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 3,
    text: " G-20\n",
  },
  {
    id: 4,
    text: " SGV8FIL2TI Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 10 41 AM New M-PESA balance is Ksh739.36. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,480.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 5,
    text: " willy\n",
  },
  {
    id: 6,
    text: " SGU9CLWS83 Confirmed. Ksh38,280.00 sent to HFC Limited for account 2000080714 on 30/7/24 at 3 17 PM New M-PESA balance is Ksh 990.15. Transaction cost, Ksh99.00.Amount you can transact within the day is 461,720.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 7,
    text: " 34800.00 KES has been successfully sent to Housing Finance 2*****0714 HOUSING FINANCE. Ref. 722360550161 on 30 Jul 2024 at 20 29 EAT. Charges 59.76 KES\n",
  },
  {
    id: 8,
    text: " SGV8I9HOQE Confirmed. Ksh21,500.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 9 09 PM New M-PESA balance is Ksh0.00. Transaction cost, Ksh67.00.Amount you can transact within the day is 462,623.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 9,
    text: " SGU4EDTDU0 Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on 30/7/24 at 9 37 PM New M-PESA balance is Ksh0.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 483,330.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 10,
    text: " SGV5HYDOH5 Confirmed. Ksh50,000.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 8 07 PM New M-PESA balance is Ksh10,932.87. Transaction cost, Ksh108.00.Amount you can transact within the day is 444,821.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 11,
    text: " SHN932IQ69 Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 23/8/24 at 8 53 PM New M-PESA balance is Ksh3.36. Transaction cost, Ksh34.00.Amount you can transact within the day is 487,900.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 12,
    text: " SHH8BX6Y90 Confirmed. Ksh31,900.00 sent to HFC Limited for account 2000080714 on 17/8/24 at 1 28 AM New M-PESA balance is Ksh105,721.14. Transaction cost, Ksh83.00.Amount you can transact within the day is 468,100.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
  },
  {
    id: 13,
    text: " Don't forget to lock amina\n",
  },
  {
    id: 14,
    text: " noted\n",
  },
  {
    id: 15,
    text: " Sasa kindly send me approximate space on 5th floor & 4th\n",
  },
  {
    id: 16,
    text: " 4th floor 1400\n5th floor 4500\n",
  },
  {
    id: 17,
    text: " Sasa pliz nitumie the etr on Gmail yahoo has refused work today\n",
  },
  {
    id: 18,
    text: " janetmkanyika.jm@gmail.com\n",
  },
  {
    id: 19,
    text: " SI57JJZNKB Confirmed. Ksh58,800.00 sent to HFC Limited for account 2000080714 on 5/9/24 at 6 18 PM New M-PESA balance is Ksh3,833.33. Transaction cost, Ksh108.00.Amount you can transact within the day is 439,180.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.",
  },
];
