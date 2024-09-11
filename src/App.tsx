import { useState } from "react";
import { TextArea } from "./components/MessageInputs"
import { MessagesList } from "./components/MessagesList";

function App() {
 const [messages, setMessages] = useState<(string | File)[]>(defaultMessage);
  return (
    <div className="min-h-screen w-full h-full flex flex-col bg-base-100 justify-center items-center p-2">
        <div className="text-2xl">uwu</div>
        <MessagesList messages={messages} setMessages={setMessages}/>
        <TextArea setMessages={setMessages}/>
    </div>
  )
}

export default App


const defaultMessage = [
    "const defaultInput = `\n",
    "8/2, 10:56 AM] janet Agrho Northwest: SGN6KR18JQ Confirmed. Ksh7,000.00 sent to HFC Limited for account 2000080714 on 23/7/24 at 1:29 PM New M-PESA balance is Ksh4,405.66. Transaction cost, Ksh42.00.Amount you can transact within the day is 486,480.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "8/2, 10:56 AM] janet Agrho Northwest: G-20\n",
    "8/2, 10:56 AM] janet Agrho Northwest: SGV8FIL2TI Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 10:41 AM New M-PESA balance is Ksh739.36. Transaction cost, Ksh34.00.Amount you can transact within the day is 493,480.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "8/2, 10:56 AM] janet Agrho Northwest: willy\n",
    "8/2, 10:56 AM] janet Agrho Northwest: SGU9CLWS83 Confirmed. Ksh38,280.00 sent to HFC Limited for account 2000080714 on 30/7/24 at 3:17 PM New M-PESA balance is Ksh 990.15. Transaction cost, Ksh99.00.Amount you can transact within the day is 461,720.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "8/2, 10:57 AM] janet Agrho Northwest: 34800.00 KES has been successfully sent to Housing Finance 2*****0714 HOUSING FINANCE. Ref. 722360550161 on 30 Jul 2024 at 20:29 EAT. Charges 59.76 KES\n",
    "8/2, 10:57 AM] janet Agrho Northwest: SGV8I9HOQE Confirmed. Ksh21,500.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 9:09 PM New M-PESA balance is Ksh0.00. Transaction cost, Ksh67.00.Amount you can transact within the day is 462,623.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "8/2, 10:58 AM] janet Agrho Northwest: SGU4EDTDU0 Confirmed. Ksh10,000.00 sent to HFC Limited for account 2000080714 on 30/7/24 at 9:37 PM New M-PESA balance is Ksh0.00. Transaction cost, Ksh48.00.Amount you can transact within the day is 483,330.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "8/2, 10:58 AM] janet Agrho Northwest: SGV5HYDOH5 Confirmed. Ksh50,000.00 sent to HFC Limited for account 2000080714 on 31/7/24 at 8:07 PM New M-PESA balance is Ksh10,932.87. Transaction cost, Ksh108.00.Amount you can transact within the day is 444,821.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "9/2, 3:15 PM] dennis: SHN932IQ69 Confirmed. Ksh5,000.00 sent to HFC Limited for account 2000080714 on 23/8/24 at 8:53 PM New M-PESA balance is Ksh3.36. Transaction cost, Ksh34.00.Amount you can transact within the day is 487,900.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "9/2, 3:21 PM] dennis: SHH8BX6Y90 Confirmed. Ksh31,900.00 sent to HFC Limited for account 2000080714 on 17/8/24 at 1:28 AM New M-PESA balance is Ksh105,721.14. Transaction cost, Ksh83.00.Amount you can transact within the day is 468,100.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n",
    "9/3, 7:43 PM] janet Agrho Northwest: Don't forget to lock amina\n",
    "9/3, 7:49 PM] dennis: noted\n",
    "9/4, 12:46 PM] janet Agrho Northwest: Sasa kindly send me approximate space on 5th floor & 4th\n",
    "9/4, 12:49 PM] dennis: 4th floor 1400\n5th floor 4500\n",
    "9/5, 11:11 AM] janet Agrho Northwest: Sasa pliz nitumie the etr on Gmail yahoo has refused work today\n",
    "9/5, 11:11 AM] janet Agrho Northwest: janetmkanyika.jm@gmail.com\n",
    "9/5, 6:36 PM] dennis: SI57JJZNKB Confirmed. Ksh58,800.00 sent to HFC Limited for account 2000080714 on 5/9/24 at 6:18 PM New M-PESA balance is Ksh3,833.33. Transaction cost, Ksh108.00.Amount you can transact within the day is 439,180.00. Use a unique M-PESA PIN to keep your money safe - don't use your date of birth as your PIN.\n`;\n"
]
