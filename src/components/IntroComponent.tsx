interface IntroComponentProps {

}

export function IntroComponent({}:IntroComponentProps){
return (
  <div className="w-full h-[90vh]  flex flex-col   items-center justify-center p-5 gap-2">
    <h1 className="text-5xl font-bold">M-print</h1>
    <div className="w-full  h-full flex flex-col  items-center justify-center p-5 gap-2">
      <p className="w-full md:max-w-[70%] lg:max-w-[60%] text-center bg-base-200 p-5 rounded-lg">
        print mpesa messages helps you copy multiple mpesa messages from your whatsapp and paste
        them to get a niceley formatted pdf that you can print
      </p>
      Let's get printing ✨
      <div className="w-full  flex items-center justify-between">
        <p>👇 print them here </p>
        <p>add messages here 👇</p>
      </div>
    </div>
  </div>
);
}
