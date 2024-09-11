import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface SingleRowProps {
  children: React.ReactNode;
  id: string;
}  
export function SingleRow({id,children}: SingleRowProps) {
      const { attributes, listeners, setNodeRef, transform, transition,isDragging,isOver } = useSortable({ id });

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ?"1px solid red":"",
        backgroundColor: isOver ? "red" : "",
        
        
      };
  return (
    <div ref={setNodeRef} style={{...style,zIndex:isDragging?50:10}} {...attributes} {...listeners} className="">
      {children}
    </div>
  );
}
