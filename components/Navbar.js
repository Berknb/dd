import Image from "next/image"
import logo from '../images/ddLogo.png'
import Classes from './styles/Navbar.module.scss'
import { useRouter } from "next/router"
import { useAuth,logout } from "../initFirebase"
import { useState } from "react"
import {IoExitOutline} from 'react-icons/io5'
import {BiUserCircle} from 'react-icons/bi'
import {BsPencilSquare} from 'react-icons/bs'
import Popup from './Popup'


export default function Navbar() {
  const [popup,setPopup] = useState(false);
    const currentUser = useAuth();
    const router = useRouter();
  return (
    <div className={Classes.container}>
        <span className={Classes.logo} onClick={()=>router.push("/")}>
           <Image src={logo} alt="dd logo" width={378} height={150}/> 
        </span>
        <div className={Classes.navItems}>
        <section className={Classes.shareBtn} onClick={() => {setPopup(true)}}>
          <BsPencilSquare  size={25}/>
          <label>Hikayeni paylaş</label>
        </section>
        <Popup trigger={popup} setTrigger={setPopup}/>
        {currentUser?.email == undefined ? 
            <label onClick={()=>router.push("/SignIn")}>Giriş yap</label>
            :
            <div className={Classes.userPanel}>
              <div className={Classes.userItems}>
              <section>
                <BiUserCircle size={25} onClick={()=>{
                  router.push("/User")
                }}/>
              </section>
              <section>
                <IoExitOutline size={25} onClick={()=>{
              logout()
              router.push("/")
            }}/>
              </section>
              </div>
              <p>Hoşgeldin {currentUser?.email.split('@')[0]} !</p>
            </div>
          }
           </div>
    </div>
  )
}
