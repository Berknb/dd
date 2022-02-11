import Image from "next/image"
import logo from '../images/ddLogo.png'
import Classes from './styles/Navbar.module.scss'
import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();
  return (
    <div className={Classes.container}>
        <span className={Classes.logo}>
           <Image src={logo} alt="dd logo" width={378} height={150}/> 
        </span>
        <section className={Classes.searchBar}>
            <p>searchbar</p>
            <label>Giriş yap</label>
        </section>
    </div>
  )
}
