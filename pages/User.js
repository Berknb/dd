import { useEffect,useState } from 'react'
import { useAuth,db } from '../initFirebase';
import Classes from '../styles/User.module.scss'
import Dexie from 'dexie';
import { doc,deleteDoc, getDocs,collection } from "firebase/firestore";
import {RiChatDeleteFill} from 'react-icons/ri'
import {FiEdit} from 'react-icons/fi'

export default function User() {
  const indexedDB = new Dexie("ReactDexie");
    //create the database store
    indexedDB.version(1).stores({
        posts: "id, title, content"
    })
    indexedDB.open().catch((err) => {
        console.log(err.stack || err)
    })
    //set the posts
    const [posts, setPosts] = useState("");


    const deletePost = async(id) => {
      indexedDB.posts.delete(id);
      let allPosts = await indexedDB.posts.toArray();
      setPosts(allPosts);
  }
  const currentUser = useAuth();
  const [Loading,setLoading] = useState(true);

//-------------------------- Firestore get user posts -------------------------
const [data,setData] = useState([]);
const [remove,setRemove] = useState(0);
useEffect(() => {
  const posts = [];
  const colRef = collection(db, `${currentUser?.email.split(".")[0]}`)
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
},[currentUser?.email,remove])
  
  if (Loading === true) {
    return <p>Loading...</p>
  }

  return (
    <div className={Classes.PostsContainer}>
      {data.map(item=>(
        <div key={item.id} className={Classes.post}>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
        <section>
        <span>
          <FiEdit size={30}/>
        </span>
          <span>
            <RiChatDeleteFill size={30} onClick={() => {deleteDoc(doc(db, `${currentUser?.email.split(".")[0]}`, `${item.id}`)),deletePost(item.id),setRemove(remove+1)}}/>
          </span>
        </section>
    </div> 
      ))}
    </div>
  )
}
