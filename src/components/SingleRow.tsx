import { useSortable } from "@dnd-kit/sortable";


interface SingleRowProps {
  children: React.ReactNode;
  id: string;
}
export function SingleRow({ id, children }: SingleRowProps) {
  const { attributes, listeners, setNodeRef,isDragging, isOver ,} =useSortable({ id });

function rowStyles(isOver:boolean,isDragging:boolean) {
    if(isOver) return "bg-warning/5 text-warning/30 p-2";
    if(isDragging) return "bg-warning/10 text-warning p-2";
    return "text-base-content bg-base-200 animate-in zoom-in-95 duration-700 transition-all p-2";
    
  }
  return (
    <div
      className={rowStyles(isOver,isDragging)}
      ref={setNodeRef}
      // style={{ ...style, zIndex: isDragging ? 50 : 10 }}
      {...attributes}
      {...listeners}
      >

      {children}
    </div>
  );
}
