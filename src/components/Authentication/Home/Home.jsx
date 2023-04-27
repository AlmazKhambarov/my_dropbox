import React, {useState, useEffect} from 'react'
import {getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject} from 'firebase/storage'
import { collection, doc, deleteDoc, onSnapshot, query, where, addDoc} from 'firebase/firestore';
import { auth, db} from '../../../firebase/firebase'
import Header from '../../Header/Header'
import {useNavigate} from 'react-router'
import './Home.scss'
import DeleteIcon from '@mui/icons-material/Delete';
      
const Home = ({user}) => {
const [newFiles, setNewFiles] = useState('')
const [userFiles, setUserFiles] = useState([]);
const [fileCount, setFileCount] = useState(0);

const [booleens, setBooleens] = useState(true)
const [uploadProccess, setUploadProccess] = useState(0)

var logoutText  = 'logout'
var navigate=useNavigate()
useEffect(() => {
    const fetchUserFiles = async () => {
      if (user?.uid) {
        const filesRef = collection(db, 'files');
        const userFilesQuery = query(filesRef, where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(userFilesQuery, (snapshot) => {
          const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserFiles(files);
          setFileCount(files.length);
        })
      }
    }
    fetchUserFiles();
  }, [user?.uid]);
console.log(userFiles)
console.log(user)
  const logoutUser = ()=>{
    auth.signOut()
    navigate('/')
  }

  const handleUpload = () => {
    if (newFiles) {
        setBooleens(true)
      const storage = getStorage();
      const namer = `${new Date()}_${newFiles.name}`;
      const storageRef = ref(storage, namer);
      const uploadTask = uploadBytesResumable(storageRef, newFiles);

      uploadTask.on('state_changed', (snapshot) => {
        // Get the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setUploadProccess(progress)
      }, (error) => {
        console.log(error);
      }, () => {
        // Upload completed successfully
        console.log('Upload completed successfully');
        // Save the file URL to Cloud Firestore
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, 'files'), {
            name: namer,
            filename: newFiles.name,
            url: url,
            userId: user.uid,
          }).then((docRef) => {
            console.log(`Document written with ID: ${docRef.id}`);
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      });
      setNewFiles('')
    }
    else{
        alert("file not selected ")
    }
  };

  const handleDelete = (id, name) => {
    var confirmed = window.confirm(`Are you sure to delete this file`)
    if(confirmed){
        const storage = getStorage();
    const storageRef = ref(storage, name);
    deleteObject(storageRef).then(() => {
      console.log('File deleted successfully');
      deleteDoc(doc(db, 'files', id)).then(() => {
        console.log('Document deleted successfully');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
    }
  };
  console.log(auth.currentUser)
useEffect(()=>{
if(uploadProccess==100){
    setUploadProccess(0)
}
}, [uploadProccess])
  return (
    <div>
    <Header logout={logoutText} logoutUser={logoutUser}/>
<div className="fileUploader">
    <span className='userName'>{user&&(user.displayName)}</span>
    <span className='userName'>{user&&(user.email)}</span>

</div>
<br/>
<br/>
<br/>

<div className='cont'>
<label className="drop-container">
  <span className="drop-title">Drop files here</span>
  or
  <input type="file" id="images" accept="image/*" required onChange={(e)=>setNewFiles(e.target.files[0])}/>
</label>
<br/>
<button
 className='upload' onClick={handleUpload}>upload</button>  

</div>
<div>
<p style={{fontSize:"32px"}}>files      {fileCount}</p> 
<hr/> 
    {userFiles.map((file)=>(
         <div className='files_container' key={file.id}>
            <span className='files'>
            <a className='aAddress' href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
         </span>
       <button className='deleteFiles' onClick={()=> handleDelete(file.id, file.name)}>
       <DeleteIcon sx={{ fontSize: 50 }}/>
       </button>
     </div>

    ))}
</div>
    </div>
  )
}

export default Home
