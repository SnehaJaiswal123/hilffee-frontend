import { createContext, useState } from "react";

export const PromptContext=createContext()

export const PromptProvider=(props)=>{
    const [promptStatus,setPromptStatus]=useState(false)
        return(
            <PromptContext.Provider value={{promptStatus,setPromptStatus}}>
                {props.children}
            </PromptContext.Provider>
        )
}