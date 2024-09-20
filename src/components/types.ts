export type Message = {
  id: number;
  order:number;
  text?: {
    content: string;
  };
  image?: {
    file: File;
    angle?: number;
  };
};
