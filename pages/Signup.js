import {SignGoogle} from '../initFirebase'
import { useRef, useState } from 'react';
import { SignupEmail, useAuth} from '../initFirebase'
import Link from 'next/link';
import Classes from '../styles/Auth.module.scss'
import {FcGoogle} from 'react-icons/fc'

function SignUp() {
const [loading, setLoading] = useState(false);
const currentUser = useAuth();

const emailRef = useRef();
const passwordRef = useRef();

async function handleSignupEmail(){
    setLoading(true);
    try{
await SignupEmail(emailRef.current.value, passwordRef.current.value)
    } catch {
        alert("Email adresinizi doğru girdiğinizden emin olun ve en az 6 karakterlik bir şifre girin ! ");
        setLoading(false);
    }
 }

    return (
            <div className={Classes.container}>
                <form className={Classes.card}>
                    <h2>Hesap oluştur<hr/></h2>
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder='Email'/>
                        <label>Şifre</label>
                        <input type="password" ref={passwordRef} placeholder='şifre'/>
                    <section className={Classes.submit}>
                    <button type="submit" disabled={loading || currentUser} onClick={handleSignupEmail}>
                        Kayıt ol
                    </button>
                        <label onClick={SignGoogle} className={Classes.google}><FcGoogle size={30}/>Google ile devam et</label>
              </section>
              <label><Link href='/SignIn'>Hesabınız var mı ? giriş yapmak için tıklayın</Link></label>
                    </form>
                </div> 
    )
}

export default SignUp
