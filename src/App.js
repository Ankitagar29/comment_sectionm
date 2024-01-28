// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import CommentSection from './CommentSection';
import CommentViewSection from './CommentViewSection';
function App() {
  const [comment,setComment]=useState({
    name:'',comment:''

  });
  const[commentData,setCommentData]=useState([]);
  
  useEffect(()=>{
    const commentData=localStorage.getItem('comments')
    
      
      if(commentData){
        setCommentData(()=>[
        ...JSON.parse(localStorage.getItem('comments'))])
      }    
  },[])
  return (
    <div className="App">

        <h1 className="header">Comment Section</h1>
        

      
        <CommentSection commentData={commentData} setCommentData={setCommentData} comment={comment} setComment={setComment}/>
        <CommentViewSection commentData={commentData} setCommentData={setCommentData} />
       
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

    </div>
  );
}

export default App;
