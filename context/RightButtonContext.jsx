import { createContext, useState } from "react";


export const RightButtonContext = createContext();

export function RightButtonContextProvider(props) {
    const [butttonRight, setButttonRight] = useState(<></>);
    const [butttonLeftWarning, setButttonLeftWarning] = useState('');
    
    return (
        <RightButtonContext.Provider value={{ butttonRight, setButttonRight, butttonLeftWarning, setButttonLeftWarning }} key={'Proovedor'}>
            {props.children}
        </RightButtonContext.Provider>
    )
}
