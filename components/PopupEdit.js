import Classes from './styles/Popup.module.scss'
import {BiArrowBack} from 'react-icons/bi'
import { useRef } from 'react'
import { useAuth,db } from '../initFirebase'
import { doc, updateDoc } from 'firebase/firestore'

function PopupEdit(props) {
    const dateInfo = new Date();
    const date = "Güncellenme Tarihi: " + dateInfo.getDate()+'/'+(dateInfo.getMonth()+1)+'/'+dateInfo.getFullYear();

    const titleRef = useRef("");
    const contentRef = useRef("");
    const currentUser = useAuth();

    // firestore submit with username
    function userSubmit(){
        updateDoc(doc(db, `${currentUser?.email.split(".")[0]}`, `${props.id}`), {
                id: props.id,
                title: titleRef.current.value,
                content: contentRef.current.value,
                date: date
              });

              updateDoc(doc(db, "allPosts", `${props.id}`), {
                id: props.id,
                title: titleRef.current.value,
                content: contentRef.current.value,
                date: date
              });
              props.setTrigger(false)
    }
if(props.trigger === true){
    return (
        <div className={Classes.popup}>
            <div className={Classes.popupInner}>
                <label className={Classes.popupCloseBtn} onClick={() => props.setTrigger(false)}><BiArrowBack size={30} color="black"/></label>
                <section className={Classes.edit}>
                <h2>Başlık: <input type="text" defaultValue={props.title} ref={titleRef}></input></h2>
                <h2>İçerik: <textarea ref={contentRef} defaultValue={props.content}></textarea></h2>
                <button className='userSubmit' onClick={userSubmit}>değişiklikleri kaydet</button>
                </section>
                {props.children}
            </div>
        </div>
    )
}else{return null}
}

export default PopupEdit
