import React , {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import Dexie from "dexie";
import Classes from './styles/DisplayContent.module.scss'
import Popup from './Popup'
import {BsPencilSquare} from 'react-icons/bs'
import {AiOutlineRead} from 'react-icons/ai'
import { doc,deleteDoc, getDocs,collection } from "firebase/firestore";
import { useAuth,db } from '../initFirebase';
import { useRouter } from 'next/router';
import Read from './Read';

const DisplayContent = () => {
    const router = useRouter();
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
    let page = -1;
    const [read,setRead] = useState(false);
    const [pageNum,setPageNum] = useState(0)
    if(data.length > 0) {
        postData = <div className={Classes.PostsContainer}>
                    { 
                        data.map(post => {
                             return (
                               <>
                             <div key={post.id} className={Classes.post}>     
                               <span id={post.id} style={{display:"none"}}>{page+=1}</span>
                               <div className={Classes.author}>
                                  <label><strong>Yazar: </strong>{post.bloggername}</label>
                                  <AiOutlineRead size={25} onClick={()=>{
            setPageNum(document.getElementById(`${post.id}`).innerHTML)
            setRead(true)
          }}/>
                                  <strong>{post.date}</strong>
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </div> 
                            <Read read={read} setRead={setRead} id={data[pageNum].id} title={data[pageNum].title} content={data[pageNum].content}/>
                            </>
                                    )      
                        }
                        )
                    }
                   </div>
    }else{
        postData = <div className={Classes.NoPostsContainer}>
                     <p>Henüz bir paylaşım yok... </p>
                     <iframe src="https://giphy.com/embed/pOZhmE42D1WrCWATLK" width="480" height="480" frameBorder="0" style={{pointerEvents:"none"}}></iframe>
                     <small><a href="https://giphy.com/gifs/animation-work-job-pOZhmE42D1WrCWATLK">via GIPHY</a></small>
                     <section onClick={() => {setPopup(true)}}>
                     <p>Hemen şimdi bir şeyler paylaş!</p>
                        <BsPencilSquare size={30}/> 
                     </section>
                     <Popup trigger={popup} setTrigger={setPopup}/>
                   </div>
    }

    if(loading === true){return <p>Yükleniyor...</p>}
    
    return (
    <div>
        {postData}
    </div>
  );
}

export default DisplayContent;