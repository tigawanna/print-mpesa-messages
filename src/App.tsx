import { useState } from "react";
import { MessageInputModals } from "./components/MessageInputs";
import { MessagesList } from "./components/list.tsx/MessagesList";
import { Message } from "./components/types";
import { PrintMessages } from "./components/PrintMessages";
import { Printer, X } from "lucide-react";
import { PWAStatusPill } from "./components/PWAStatusPill";
import { IntroComponent } from "./components/IntroComponent";


function App() {
  const [messages, setMessages] = useState<Message[]>(defaultList());
  // console.log(" ==  messags  ==== ",messages)
  const [isPrinting, setIsPrinting] = useState(false);
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center p-2">
      {/* <div className="circle-to-pill ">pill aniamtion</div> */}
      <PWAStatusPill />
      {messages.length === 0 && <IntroComponent setMessages={setMessages}/>}

      {isPrinting ? (
        <PrintMessages messages={messages} />
      ) : (
        <div className="flex h-full w-full flex-col gap-2">
          {messages.length > 0 && (
            <div className="flex w-full justify-end gap-5">
              <button
                className="btn btn-error btn-sm fixed top-[10%] right-[5%]"
                onClick={() => setMessages([])}
              >
                <X />
              </button>
            </div>
          )}
          <MessagesList messages={messages} setMessages={setMessages} />
        </div>
      )}

      {/* <ReactPDFContainer/> */}
      <button
        className="btn fixed bottom-[5%] left-[5%] text-primary"
        onClick={() => setIsPrinting(!isPrinting)}
      >
        {isPrinting ? <X className="" /> : <Printer className="" />}
      </button>
      {messages.length > 0 &&
      <MessageInputModals setMessages={setMessages} />}
      {/* <PWABadge/> */}
    </div>
  );
}

export default App;

function defaultList() {
  if (!import.meta.env.DEV) return [];
  return [
    {
      id: 318,
      order: 1,
      text: {
        content: "SHE81UFRTR Confirmed. Ksh5,000.00 sent to uwuwuwuwu ",
      },
    },
    {
      id: 71,
      order: 2,
      text: {
        content:
          " SHE81UF6EW Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 14/8/24 at 2 54 PM New M-PESA balance is Ks292.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 494,573.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as ",
      },
    },
    {
      id: 694,
      order: 3,
      text: {
        content:
          " SHN932IQ69 Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 23/8/24 at 8 53 PM New M-PESA balance is Ksh3.36. Transaction cost, Ksh34.00.Amount you can transact within the ",
      },
    },
    {
      id: 6594,
      order: 4,
      text: { content: "M1-2020" },
    },
    {
      id: 46,
      order: 5,
      text: {
        content:
          " SHD6XCUCH2 Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 13/8/24 at 4 34 PM New M-PESA balance is Ksh7.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,593.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as",
      },
    },
    {
      id: 6094,
      order: 6,
      text: { content: "M5-2020" },
    },
    {
      id: 776,
      order: 7,
      text: {
        content:
          " SHU7TC6GFT Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 30/8/24 at 3 40 PM New M-PESA balance is Ksh9.48. Transaction cost, Ksh34.00.Amount you can transact within the day is 476,870.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
      },
    },
    {
      id: 6984,
      order: 8,
      text: { content: "M1-2720" },
    },
    {
      id: 280,
      order: 9,
      text: {
        content:
          " SH572PQLQ7 Confirmed. Ksh10,000.00 sent to uwuwuwuwu ited for account 2056080714 on 5/8/24 at 6 57 PM New M-PESA balance is Ksh2,389.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 489,680.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.SHE03ONRQM Confirmed. Ksh10,000.00 sent to uwuwuwuwu ited for account 2056080714 on ",
      },
    },
    {
      id: 161,
      order: 10,
      text: {
        content:
          " SH531OD7GR Confirmed. Ksh90,000.00 sent to uwuwuwuwu ited for account 2056080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
      },
    },
    {
      id: 453,
      order: 11,
      text: {
        content:
          " SHD6XCUCH2 Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 13/8/24 at 4 34 PM New M-PESA balance is Ksh7.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,593.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as",
      },
    },
    {
      id: 717,
      order: 12,
      text: {
        content:
          " SHU7TC6GFT Confirmed. Ksh5,000.00 sent to uwuwuwuwu ited for account 2056080714 on 30/8/24 at 3 40 PM New M-PESA balance is Ksh9.48. Transaction cost, Ksh34.00.Amount you can transact within the day is 476,870.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
      },
    },
    {
      id: 211,
      order: 13,
      text: {
        content:
          " SH572PQLQ7 Confirmed. Ksh10,000.00 sent to uwuwuwuwu ited for account 2056080714 on 5/8/24 at 6 57 PM New M-PESA balance is Ksh2,389.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 489,680.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.SHE03ONRQM Confirmed. Ksh10,000.00 sent to uwuwuwuwu ited for account 2056080714 on ",
      },
    },
    {
      id: 561,
      order: 14,
      text: {
        content:
          " SH531OD7GR Confirmed. Ksh90,000.00 sent to uwuwuwuwu ited for account 2056080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
      },
    },
  ];
}

