import { createContext, useState } from "react";


export const RightButtonContext = createContext();

export function RightButtonContextProvider(props) {
    const [butttonRight, setButttonRight] = useState(<></>);
    
    return (
        <RightButtonContext.Provider value={{ butttonRight, setButttonRight }} key={'Proovedor'}>
            {props.children}
        </RightButtonContext.Provider>
    )
}
