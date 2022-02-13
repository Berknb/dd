import React , {useState} from 'react';
import { useDispatch } from 'react-redux'
import { postAdded } from '../states/PostSlice';
import Dexie from "dexie";
import Classes from './styles/PostContent.module.scss'
import { useAuth,db } from "../initFirebase"
import { doc, setDoc } from 'firebase/firestore'

const PostContent = () => {
    const currentUser = useAuth();
    const dispatch = useDispatch()
    //set the database 
    const indexedDb = new Dexie("ReactDexie");
    //create the database store
    indexedDb.version(1).stores({
        posts: "id, title, content"
    })
    indexedDb.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [postTitle, setTitle] = useState("");
    const [postContent, setContent] = useState("");

    //submit 
    const getPostInfo = (e) => {
        //---------- indexedDB -------------
        e.preventDefault();
        if(postTitle && postContent){
            let post = {
                id: Math.random(),
                content: postContent,
                title: postTitle,
            }
           
            indexedDb.posts.add(post)
            //---------------- firebase ---------
            fetch("https://dailydiary-70d06-default-rtdb.europe-west1.firebasedatabase.app/AllPosts.json",{
            method: "POST",
            body: JSON.stringify(post)
        })
            dispatch(postAdded())
            // firestore user
            if(currentUser?.email !== undefined){
                const sourceData = {
                    ...post
                }
                setDoc(doc(db, `${currentUser?.email.split(".")[0]}`, `${sourceData.id}`), {
                    id: `${sourceData.id}`,
                    title: `${sourceData.title}`,
                    content: `${sourceData.content}`,
                  });
            } 
        } 
    }
    return (
    <React.Fragment>
        <form onSubmit={getPostInfo} className={Classes.form}>
        <input type="text" name="name" id='nme' required autoComplete='off' className='question' onChange={e => setTitle(e.target.value)}/>
           <label htmlFor='nme'><span>What&apos;s your title:</span></label>
           <textarea name="content" id='msg' required autoComplete='off' className='question'  onChange={e => setContent(e.target.value)}/>
           <label htmlFor='msg'><span>What you wanna share:</span></label>
            <input type="submit" value="Anonim olarak paylaş"/> 
            <p className='userSubmit' style={{fontSize:"15px"}}>Kullanıcı adın ile paylaş</p> 
        </form> 
    </React.Fragment>
  );
}

export default PostContent;
