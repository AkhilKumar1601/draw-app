import { ReactNode } from "react";

export function IconButton({
  icon, onClick, activated
} : {
  icon : ReactNode,
  onClick : () => void,
  activated : boolean
}) {

   return <div className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-gray ${activated ? "text-red-400" : "ttext-white"}`} onClick={onClick}>
    {icon}
   </div>

}