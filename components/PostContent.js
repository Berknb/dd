import React , {useState} from 'react';
import { useDispatch } from 'react-redux'
import { postAdded } from '../states/PostSlice';
import Dexie from "dexie";
import Classes from './styles/PostContent.module.scss'
import { useAuth,db } from "../initFirebase"
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from "next/router"

const PostContent = () => {
    const dateInfo = new Date();
    const date = dateInfo.getDate()+'/'+(dateInfo.getMonth()+1)+'/'+dateInfo.getFullYear();

    const router = useRouter();
    const currentUser = useAuth();   //to get current user name
    const dispatch = useDispatch(); // close popup

    //set the database 
    const indexedDb = new Dexie("ReactDexie");
    //create the database store
    indexedDb.version(1).stores({
        posts: "id, title, content, bloggerName"
    })
    indexedDb.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [postTitle, setTitle] = useState("");
    const [postContent, setContent] = useState("");


    // anonymous submit
    const getPostInfo = (e) => {
        //---------- indexedDB -------------
        e.preventDefault();
        if(postTitle && postContent){
            let post = {
                id: Math.random(),
                content: postContent,
                title: postTitle,
                bloggername: "anonim",
                date: date
            }
           
            indexedDb.posts.add(post)
            
            let sourceData = {
                id: Math.random(),
                content: postContent,
                title: postTitle,
                bloggername:"anonim",
                date: date
            }
            setDoc(doc(db, "allPosts", `${sourceData.id}`), {
                id: sourceData.id,
                title: sourceData.title,
                content: sourceData.content,
                bloggername: sourceData.bloggername,
                date: sourceData.date
              });
            dispatch(postAdded())
        } 
    }
    // firestore submit with username
    function userSubmit(){
        if(currentUser?.email !== undefined){
            let sourceData = {
                id: Math.random(),
                content: postContent,
                title: postTitle,
                date: date
                
            }
            setDoc(doc(db, `${currentUser?.email.split(".")[0]}`, `${sourceData.id}`), {
                id: sourceData.id,
                title: sourceData.title,
                content: sourceData.content,
                bloggername: `${currentUser?.email.split("@")[0]}`,
                date: sourceData.date
              });
              setDoc(doc(db, "allPosts", `${sourceData.id}`), {
                id: sourceData.id,
                title: sourceData.title,
                content: sourceData.content,
                bloggername: `${currentUser?.email.split("@")[0]}`,
                date: sourceData.date
              });
              dispatch(postAdded())
        }else{
            alert("Önce giriş yapmanız gerek!")
            router.push("/SignIn")
            dispatch(postAdded())
        }
    }
    return (
    <React.Fragment>
        <form onSubmit={getPostInfo} className={Classes.form}>
        <input type="text" name="name" id='nme' required autoComplete='off' className='question' onChange={e => setTitle(e.target.value)}/>
           <label htmlFor='nme'><span>What&apos;s your title:</span></label>
           <textarea name="content" id='msg' required autoComplete='off' className='question'  onChange={e => setContent(e.target.value)}/>
           <label htmlFor='msg'><span>Share your thinks:</span></label>
            <input type="submit" value="Anonim olarak paylaş"/> 
            <p className='userSubmit' onClick={userSubmit} style={{fontSize:"15px"}}>Kullanıcı adın ile paylaş</p> 
        </form> 
    </React.Fragment>
  );
}

export default PostContent;
