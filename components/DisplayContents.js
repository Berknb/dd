import React , {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import Dexie from "dexie";
import Classes from './styles/DisplayContent.module.scss'
import Popup from './Popup'
import {BsPencilSquare} from 'react-icons/bs'

const PostContent = () => {
    const postAdded = useSelector((state) => state.postAdded.value)
    const [popup,setPopup] = useState(false);

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
    const [posts, setPosts] = useState("");
  
    //set the posts
    const deletePost = async(id) => {
        db.posts.delete(id);
        let allPosts = await db.posts.toArray();
        setPosts(allPosts);
    }

    
//get all posts from the database
    useEffect(() => {
        const getPosts = async() => {
            let allPosts = await db.posts.toArray();
            setPosts(allPosts);
        }
        getPosts();
    }, [postAdded])

// ------------------------------- Display posts ---------------------
    let postData;
  
    if(posts.length > 0) {
        postData = <div className={Classes.PostsContainer}>
                    {
                        posts.map(post => {
                             return (
                             <div key={post.id} className={Classes.post}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                            </div> 
                                    )      
                        })
                    }
                   </div>
    }else{
        postData = <div className={Classes.NoPostsContainer}>
                     <p>There are no posts yet... </p>
                     <iframe src="https://giphy.com/embed/pOZhmE42D1WrCWATLK" width="480" height="480" frameBorder="0" style={{pointerEvents:"none"}}></iframe>
                     <small><a href="https://giphy.com/gifs/animation-work-job-pOZhmE42D1WrCWATLK">via GIPHY</a></small>
                     <section onClick={() => {setPopup(true)}}>
                     <p>Write something now!</p>
                        <BsPencilSquare size={30}/> 
                     </section>
                     
                     <Popup trigger={popup} setTrigger={setPopup}/>
                   </div>
    }

    return (
    <div className={Classes.MainContainer}>
        {postData}
    </div>
  );
}

export default PostContent;