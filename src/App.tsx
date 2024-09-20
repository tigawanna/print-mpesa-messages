import { useState } from "react";
import { MessageInputModals } from "./components/MessageInputs";
import { MessagesList } from "./components/MessagesList";
import { Message } from "./components/types";
import { PrintMessages } from "./components/PrintMessages";
import { Printer, X } from "lucide-react";
import { PWAStatusPill } from "./components/PWAStatusPill";
import { IntroComponent } from "./components/IntroComponent";

function App() {
  const [messages, setMessages] = useState<Message[]>(defaultList());
  // console.log(" ==  messags  ==== ",messages)
  const [isPrinting, setIsPrinting] = useState(false);

  // return (
  //   <div className="min-h-screen w-full h-full flex flex-col  items-center gap-3  p-2">
  //     {/* <div className="circle-to-pill ">pill aniamtion</div> */}
  //     <PWAStatusPill />
  //     <IntroComponent />
  //     <button
  //       className="btn btn-primary fixed bottom-[5%] left-[5%]"
  //       onClick={() => setIsPrinting(!isPrinting)}>
  //       {isPrinting ? <X className="" /> : <Printer className="" />}
  //     </button>
  //     <MessageInputModals setMessages={setMessages} />
  //   </div>
  // );
  // return <ReactPDFContainer/>
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center p-2">
      {/* <div className="circle-to-pill ">pill aniamtion</div> */}
      <PWAStatusPill />
      {messages.length === 0 && <IntroComponent />}

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

function defaultList() {
  if (!import.meta.env.DEV) return [];
  return [
    {
      id: 318,
      text: "",
    },
    {
      id: 71,
      text: " SHE81UF6EW Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 14/8/24 at 2 54 PM New M-PESA balance is Ks292.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 494,573.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as ",
    },
    {
      id: 694,
      text: " SHN932IQ69 Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 23/8/24 at 8 53 PM New M-PESA balance is Ksh3.36. Transaction cost, Ksh34.00.Amount you can transact within the ",
    },
    {
      id: 46,
      text: " SHD6XCUCH2 Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 13/8/24 at 4 34 PM New M-PESA balance is Ksh7.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,593.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as",
    },
    {
      id: 776,
      text: " SHU7TC6GFT Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 30/8/24 at 3 40 PM New M-PESA balance is Ksh9.48. Transaction cost, Ksh34.00.Amount you can transact within the day is 476,870.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 280,
      text: " SH572PQLQ7 Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 6 57 PM New M-PESA balance is Ksh2,389.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 489,680.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.SHE03ONRQM Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on ",
    },
    {
      id: 161,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 453,
      text: " SHD6XCUCH2 Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 13/8/24 at 4 34 PM New M-PESA balance is Ksh7.66. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,593.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as",
    },
    {
      id: 717,
      text: " SHU7TC6GFT Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 30/8/24 at 3 40 PM New M-PESA balance is Ksh9.48. Transaction cost, Ksh34.00.Amount you can transact within the day is 476,870.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 211,
      text: " SH572PQLQ7 Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 6 57 PM New M-PESA balance is Ksh2,389.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 489,680.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.SHE03ONRQM Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on ",
    },
    {
      id: 561,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 141,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 363,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 303,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 313,
      text: " SH531OD7GR Confirmed. Ksh90,000.00 sent to HFC Limited for account 2000080714 on 5/8/24 at 3 03 PM New M-PESA balance is Ksh3,617.00. Transaction cost, Ksh108.00.Amount you can transact within the day is 409,735.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    },
    {
      id: 221,
      text: " German\n",
    },
    {
      id: 669,
      text: " SH6456EIXS Confirmed. Ksh35,000.00 sent to HFC Limited for account 2000080714 on 6/8/24 at 12 41  Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN\n",
    },
  ];
}
