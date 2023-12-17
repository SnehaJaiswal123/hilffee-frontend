import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
function Main(){
    return(
        <div className="Main-main">
           <Sidebar></Sidebar>
            <Outlet/>      
        </div>
    )
}
export default Main;