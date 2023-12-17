import { Route, Router, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Profile from "./Components/Profile";
import Myjobs from "./Components/Myjobs";
import  Portal  from "./Components/Portal";
import RecordView from "./Components/RecordView";
import Logout from "./Components/Logout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="app" element={<Main />}>
        <Route path="" element={<Profile />} />
        <Route path="recording" element={<RecordView/>} />
        <Route path="portal" element={<Portal/>} />
        <Route path="jobs" element={<Myjobs/>} />
        <Route path="Logout" element={<Logout/>} />
      </Route>
    </Routes>
  );
}

export default App;
