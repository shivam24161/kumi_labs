import React, { createContext, useState } from 'react';
import data from './Data';
export const cartcontext=createContext();
const Mycontext = (props) => {
    const [mycart,setmycart]=useState([]);
    const [storeproducts,setstoreproducts]=useState(data);
    const [categoryProducts,setcategoryProducts]=useState([]);
    const [loggedin,setloggedin]=useState(false);
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  return (
    <>
    <cartcontext.Provider value={{mycart,setmycart,storeproducts,setstoreproducts,categoryProducts,setcategoryProducts,loggedin,setloggedin,state, setState}}>
        {props.children}
    </cartcontext.Provider>
    </>
  )
}
export default Mycontext;
