import Classes from './styles/Popup.module.scss'
import {BiArrowBack} from 'react-icons/bi'
import PostContent from './PostContent'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


function Popup(props) {
    const postAdded = useSelector((state) => state.postAdded.value)
    useEffect(()=>{props.setTrigger(false)},[postAdded])
if(props.trigger === true){
    return (
        <div className={Classes.popup}>
            <div className={Classes.popupInner}>
                <label className={Classes.popupCloseBtn} onClick={() => props.setTrigger(false)}><BiArrowBack size={30} color="black"/></label>
                <PostContent/>
                {props.children}
            </div>
        </div>
    )
}else{return null}
}

export default Popup