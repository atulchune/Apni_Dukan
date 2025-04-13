 import { useEffect, useRef } from "react"
 export function useOutsideClick <T extends HTMLElement>(callback:()=>void){
    const ref = useRef<T>(null);
    useEffect(()=>{
        const handleclickoutside=(e:MouseEvent)=>{
            if(ref.current && ! ref.current.contains(e.target as Node)){
                callback()
            }
        };
        document.addEventListener('mousedown',handleclickoutside);
        return()=>{
            document.removeEventListener('mousedown',handleclickoutside);
        }
    },[callback]);
    return ref;

 }