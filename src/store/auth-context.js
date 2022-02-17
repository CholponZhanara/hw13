import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogin:(email, password) =>{},
    onLogout: () => {},
}) 
 export const AuthContextProvider = (props) =>{

	const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        const storedUserInfo = localStorage.getItem('isLoggedIn')
        if(storedUserInfo === '1'){
          setIsLoggedIn(true)  
        }
        
    },[])

	const loginHandler = (email, password) => {
	localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true)
	}

	const logoutHandler = () => {
		setIsLoggedIn(false)
	}


    return<AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout:logoutHandler}}>
        {props.children}
    </AuthContext.Provider>
       
    
}
export default AuthContext;
