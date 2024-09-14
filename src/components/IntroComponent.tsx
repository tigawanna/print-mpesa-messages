interface IntroComponentProps {}

export function IntroComponent({}: IntroComponentProps) {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center gap-2 p-5">
      <h1 className="text-5xl font-bold">M-print</h1>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5">
        <p className="w-full rounded-lg bg-base-200 p-5 text-center md:max-w-[70%] lg:max-w-[60%]">
          print mpesa messages helps you copy multiple mpesa messages from your
          whatsapp and paste them to get a niceley formatted pdf that you can
          print
        </p>
        Let's get printing ✨
        <div className="flex w-full items-center justify-between">
          <p>👇 print them here </p>
          <p>add messages here 👇</p>
        </div>
      </div>
    </div>
  );
}
