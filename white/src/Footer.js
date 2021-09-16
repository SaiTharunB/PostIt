//import React, { useContext } from "react";
//import {credentialsContext} from "./App"
function Footer()
{
    const currentYear=new Date().getFullYear();
    return(
        <footer className="foot">
        <p>
            copyright &copy; {currentYear}
        </p>
        </footer>
    )
}
export default Footer;