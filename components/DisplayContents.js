import React , {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import Dexie from "dexie";
import Classes from './styles/DisplayContent.module.scss'
import Popup from './Popup'
import {BsPencilSquare} from 'react-icons/bs'

const DisplayContent = () => {
    const postAdded = useSelector((state) => state.postAdded.value)
    const [allPosts,setAllPosts] = useState([]);
    const [popup,setPopup] = useState(false);
    const [loading,setLoading] = useState(true);

    //set the database 
    const indexedDB = new Dexie("ReactDexie");
    //create the database store
    indexedDB.version(1).stores({
        posts: "id, title, content"
    })
    indexedDB.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [posts, setPosts] = useState("");

    //set the posts
    const deletePost = async(id) => {
        indexedDB.posts.delete(id);
        let allPosts = await indexedDB.posts.toArray();
        setPosts(allPosts);
    } 
//get all posts from the indexedDB
    useEffect(() => {
        const getPosts = async() => {
            let allPosts = await indexedDB.posts.toArray();
            setPosts(allPosts);
        }
        getPosts();
        setLoading(false);
    }, [postAdded])
//--------------- get posts from firestore ----------------
useEffect(() => {
    fetch("https://dailydiary-70d06-default-rtdb.europe-west1.firebasedatabase.app/AllPosts.json").then((response) => {return response.json()}).then(data => {
      const postsData = [];
    
      for (const key in data){
        const postData = {
          id: key,
          ...data[key]
        }
        postsData.push(postData);
      }
      setLoading(false)
      setAllPosts(postsData)
     })
   },[postAdded])
// ------------------------------- Display posts ---------------------
    let postData;
    console.log(allPosts.map(post => {
        console.log(post.title)
    }))
    if(allPosts.length > 0) {
        postData = <div className={Classes.PostsContainer}>
                    {
                        allPosts.map(post => {
                             return (
                             <div key={post.id} className={Classes.post}>
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
                     <section onClick={() => {setPopup(true)}}>
                     <p>Write something now!</p>
                        <BsPencilSquare size={30}/> 
                     </section>
                     <Popup trigger={popup} setTrigger={setPopup}/>
                   </div>
    }

    if(loading === true){return <p>Loading...</p>}
    
    return (
    <div className={Classes.MainContainer}>
        {postData}
    </div>
  );
}

export default DisplayContent;