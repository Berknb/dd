import Classes from '../styles/read.module.scss'
import {BiArrowBack} from 'react-icons/bi'

export default function Read(props) {
    if(props.read === true){
return (
        <div className={Classes.popup}>
            <div className={Classes.popupInner}>
                <label className={Classes.popupCloseBtn} onClick={() => props.setRead(false)}><BiArrowBack size={30} color="black"/></label>
                <h2>{props.title}</h2>
                <p>{props.content}</p>
                {props.children}
            </div>
        </div>
  )
    }else{return null}
  
}
