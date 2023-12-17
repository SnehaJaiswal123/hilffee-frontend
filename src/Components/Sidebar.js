import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Sidebar() {

  const navigate=useNavigate();

  const signout=()=>{
    localStorage.removeItem('userdata')
    navigate('/')
  }
  return (
    <div className="sidebar-main">
        <div className="sidebar-nav-main">
      <AppBar position="static">
        <Toolbar>
        <Link to="/app">Profile</Link>
        <Link to="/app/portal">Job Portal</Link>
        <Link to="/app/jobs">My Jobs</Link>
        <Link to='/' onClick={signout}>signOut</Link>
        </Toolbar>
      </AppBar>
    </div>
    </div>

  );
}
