"use client";
import { image } from "@/components/modal/covermodal";
import React, { createContext, useContext, useState } from "react";
type DataContextType = {
  image: image | null;
  setimage: React.Dispatch<React.SetStateAction<image | null>>;
};
const DataContext = createContext<DataContextType|null>(null)
export function DataProvider({ children }:{children : React.ReactNode}){
    const [image, setimage] = useState<image | null>(null)
    return(
        <DataContext.Provider value={{image,setimage}}>
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