import { useEffect,useState} from 'react'
import { useAuth,db } from '../initFirebase';
import Classes from '../styles/User.module.scss'
import Dexie from 'dexie';
import { doc,deleteDoc, getDocs,collection } from "firebase/firestore";
import {RiChatDeleteFill} from 'react-icons/ri'
import {FiEdit} from 'react-icons/fi'
import PopupEdit from '../components/PopupEdit';

export default function User() {
    const [popup,setPopup] = useState(false);
    const [page,setPage] = useState(0);
    const itemPage = -1;
  
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
if(data.length > 0){
  return (
    <div className={Classes.PostsContainer}>
      {data.map(item=>(
        <div key={item.id} className={Classes.post}>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
        <p id={item.id} style={{display:"none"}}>{itemPage+=1}</p>
        <section className={Classes.editItems}>
          <FiEdit size={30} onClick={()=>{
            setPage(document.getElementById(`${item.id}`).innerHTML)
            setPopup(true)
          }}/>
          <RiChatDeleteFill size={30} onClick={() => {deleteDoc(doc(db, `${currentUser?.email.split(".")[0]}`, `${item.id}`)),deletePost(item.id),setRemove(remove+1),setPage(0)}}/>
        </section>
        <PopupEdit trigger={popup} setTrigger={setPopup} id={data[page].id} title={data[page].title} content={data[page].content}/>
    </div> 
      ))}
    </div>
  )
}else{
  return(
    <div className={Classes.noPostContainer}>
      <p>Henüz bir paylaşımın yok</p>
      <iframe src="https://giphy.com/embed/pOZhmE42D1WrCWATLK" width="480" height="480" frameBorder="0" style={{pointerEvents:"none"}}></iframe>
    </div>
  )
}
  
}
