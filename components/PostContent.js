import React , {useState} from 'react';
import { useDispatch } from 'react-redux'
import { postAdded } from '../states/PostSlice';
import Dexie from "dexie";
import Classes from './styles/PostContent.module.scss'

const PostContent = () => {
    const dispatch = useDispatch()
    //set the database 
    const db = new Dexie("ReactDexie");
    //create the database store
    db.version(1).stores({
        posts: "id, title, content"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [postTitle, setTitle] = useState("");
    const [postContent, setContent] = useState("");

    //submit 
    const getPostInfo = (e) => {
        e.preventDefault();
        if(postTitle && postContent){
            let post = {
                id: Math.random(),
                content: postContent,
                title: postTitle,
            }
           
            db.posts.add(post)
            dispatch(postAdded())
        } 
    }
    return (
    <React.Fragment>
        <form onSubmit={getPostInfo} className={Classes.form}>
        <input type="text" name="name" id='nme' required autoComplete='off' className='question' onChange={e => setTitle(e.target.value)}/>
           <label htmlFor='nme'><span>What&apos;s your title:</span></label>
           <textarea name="content" id='msg' required autoComplete='off' className='question'  onChange={e => setContent(e.target.value)}/>
           <label htmlFor='msg'><span>What you wanna share:</span></label>
            <input type="submit" value="Submit"/>
        </form> 
    </React.Fragment>
  );
}

export default PostContent;
