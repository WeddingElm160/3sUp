import { createContext, useState } from "react";


export const RightButtonContext = createContext();

export function RightButtonContextProvider(props) {
    const [butttonRight, setButttonRight] = useState(<></>);
    const [isUpdate, setIsUpdate] = useState(true);


    const updateComponent = () =>{
        setIsUpdate(!isUpdate)
    }
    return (
        <RightButtonContext.Provider value={{ updateComponent, isUpdate, butttonRight, setButttonRight }}>
            {props.children}
        </RightButtonContext.Provider>
    )
}
