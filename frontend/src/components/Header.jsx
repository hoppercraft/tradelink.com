
import { HiMenu } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); 

  const Logout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  return (
    <div className='flex w-screen h-16 p-3 shadow-xl rounded justify-between items-center '>
     <div>
      <h1 class="text-3xl font-extrabold mr-4 tracking-wider">TRADELiNK</h1>
     </div>

     <div className='flex gap-3'>
       <IoNotificationsSharp className="text-2xl mr-4 cursor-pointer"/>
       <HiMenu className="text-2xl mr-4 cursor-pointer" onClick={Logout} />
     </div>
    </div>
  )
}

export default Header
