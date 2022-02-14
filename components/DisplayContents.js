import React , {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import Dexie from "dexie";
import Classes from './styles/DisplayContent.module.scss'
import Popup from './Popup'
import {BsPencilSquare} from 'react-icons/bs'
import { doc,deleteDoc, getDocs,collection } from "firebase/firestore";
import { useAuth,db } from '../initFirebase';

const DisplayContent = () => {
    const postAdded = useSelector((state) => state.postAdded.value)
    const [allPosts,setAllPosts] = useState([]);
    const [popup,setPopup] = useState(false);
    const [loading,setLoading] = useState(true);
    const currentUser = useAuth();

//     //set the database 
//     const indexedDB = new Dexie("ReactDexie");
//     //create the database store
//     indexedDB.version(1).stores({
//         posts: "id, title, content"
//     })
//     indexedDB.open().catch((err) => {
//         console.log(err.stack || err)
//     })
    
//     //set the state and property
//     const [posts, setPosts] = useState("");

//     //set the posts
//     const deletePost = async(id) => {
//         indexedDB.posts.delete(id);
//         let allPosts = await indexedDB.posts.toArray();
//         setPosts(allPosts);
//     } 
// //get all posts from the indexedDB
//     useEffect(() => {
//         const getPosts = async() => {
//             let allPosts = await indexedDB.posts.toArray();
//             setPosts(allPosts);
//         }
//         getPosts();
//         setLoading(false);
//     }, [postAdded])
//--------------- get posts from firestore ----------------
const [data,setData] = useState([]);
useEffect(() => {
  const posts = [];
  const colRef = collection(db, "allPosts")
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id })
    })
    setData(posts)
    setLoading(false)
  })
  .catch(err => {
    console.log(err)
  })
},[currentUser?.email,postAdded])

// ------------------------------- Display posts ---------------------
    let postData;
    if(data.length > 0) {
        postData = <div className={Classes.PostsContainer}>
                    { 
                        data.map(post => {
                             return (
                             <div key={post.id} className={Classes.post}>
                               <div className={Classes.author}>
                                  <label><strong>Yazar: </strong>{post.bloggername}</label>
                                  <strong>{post.date}</strong>
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
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

    if(loading === true){return <p>Loading...</p>}
    
    return (
    <div>
        {postData}
    </div>
  );
}

export default DisplayContent;