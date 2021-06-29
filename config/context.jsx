import React,{ createContext, useContext, useState,useEffect } from 'react';
import {auth} from './firebase' ; 
export const cardContext = createContext(null);
export const useCard = () => useContext(cardContext);
export const CardProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [data,setdata]=useState([]);
  const [total,setTotal]=useState(0);
  const [rate,setRate]=useState(false);
  const [productId,setProductid]=useState("");
  const [userid,setUserid]=useState("");
  const [theme,setTheme]=useState(false)
  
useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(true)
        }
        else{
           setUser(false) 
        }
      });
}, [])
       

  const value = {
    user:user,
    data:data,
    total:total,
    rate:rate,
    productId:productId,
    userid:userid,
    theme:theme,
    setTheme,
    setProductid,
    setUserid,
    setRate,
    setTotal,
    setdata,
    setUser,
   
  };

  return <cardContext.Provider value={value}>{children}</cardContext.Provider>;
};