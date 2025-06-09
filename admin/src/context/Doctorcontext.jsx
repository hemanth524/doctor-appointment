import { createContext } from "react";

export const Doctorcontext=createContext()

const Doctorcontextprovider=(props)=>{

    const value={

    }
    return (
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )

}

export default Doctorcontextprovider

