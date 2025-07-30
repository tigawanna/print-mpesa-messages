import { TextArea } from "./MessageInputs";
import { Message } from "./types";

interface IntroComponentProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function IntroComponent({setMessages}: IntroComponentProps) {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center gap-8 p-5">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">
          M-Print
        </h1>
        <div className="flex items-center justify-center gap-2 text-2xl">
          <span>📱</span>
          <span>→</span>
          <span>🖨️</span>
        </div>
      </div>
      
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-5">
        <div className="card bg-white shadow-md border border-gray-200 w-full md:max-w-[70%] lg:max-w-[60%]">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-xl mb-4 text-gray-800">
              Transform Your M-Pesa Messages ✨
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Copy multiple M-Pesa messages from your WhatsApp and paste them here to get a 
              beautifully formatted PDF that's ready to print. Simple, fast, and professional.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Copy from WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span>Auto-format</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                <span>Print ready</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-lg font-medium text-gray-700">Ready to get started?</p>
          <div className="w-full md:max-w-[70%] lg:max-w-[60%]">
            <TextArea setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}
