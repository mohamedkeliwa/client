import { useContext, useState } from "react";
import { UserContext } from "../component/UserContext";
import { Navigate, Link, useParams } from "react-router-dom"; // Add Link here
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
  const { ready, user,setUser } = useContext(UserContext);
  const [toHomePage,setToHomePage] = useState(null)
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  async function logout(){
    await axios.post('logout');
    setToHomePage('/')
    setUser(null);
  }

  if(toHomePage){
    return <Navigate to={toHomePage} />
  }

  if (!ready) {
    return 'Loading.....';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  

  function linkClasses (type=null){
    let classes = 'p-2 px-6 inline-flex gap-1';
    if (type === subpage ){
        classes +=' text-white bg-primary rounded-full';
    }else{
      classes +=' bg-gray-300 rounded-full text-white'
    }
    return classes;
  }

  return (
    <div className="">
      <nav className="w-full  flex justify-center mt-8 gap-4 mb-2">
        <Link className={linkClasses('profile')}  to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
           My profile
          </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          My bookings 
        </Link>
        <Link className={linkClasses('places')} to={"/account/places"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          My accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})
            <button onClick={logout} className="primary max-w-sm mt-2 hover:bg-[#af2d47]">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
            <PlacesPage />
      )}
    </div>
  );
}
