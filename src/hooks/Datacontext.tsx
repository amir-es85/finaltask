"use client";
import { image } from "@/components/modal/covermodal";
import React, { createContext, useContext, useState } from "react";
type DataContextType = {
  image: image | null;
  setimage: React.Dispatch<React.SetStateAction<image | null>>;
  branddid:string|null|undefined|string[]
setbrandid: React.Dispatch<React.SetStateAction<string|undefined | null|string[]>>;
};
const DataContext = createContext<DataContextType|null>(null)
export function DataProvider({ children }:{children : React.ReactNode}){
    const [image, setimage] = useState<image | null>(null)
    const [branddid , setbrandid]=useState<string|null|undefined|string[]>(null)
    return(
        <DataContext.Provider value={{image,setimage,branddid,setbrandid}}>
            {children}
        </DataContext.Provider>
    )
}
 export function useData(){
    const context = useContext(DataContext);
    if (!context) {
    throw new Error("useData must be used within a DataProvider");
  } 
  return context
 }