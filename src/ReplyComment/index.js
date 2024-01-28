import './styles.css';
import { useState} from 'react';
const ReplyComment=({setCommentData,commentData,replyId,setReplyId,setReply})=>{

  const[replyComment,setReplyComment]=useState()
    const handleInputChange=(event)=>{
      const { name, value } = event.target;

      setReplyComment((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
    const handleReplied=()=>{
      const { name='',comment=''}=replyComment || {};
      
      if(name.trim()&& comment.trim()){
        setCommentData((pev)=>[...pev.map((element)=>{  
           
          if(element?.id===replyId){
              return{
                  ...element,
                //   comments:[
                //     element?.comments===undefined ? element?.comments:undefined,
                //     {
                    
                //   }
                
                // ]
                comments:element.comments!==undefined?[...element.comments,{time:new Date(),
                  name:name,
                  comment:comment}]:[{time:new Date(),
                    name:name,
                    comment:comment}]
                }
                  
        }
        
          return{
              ...element
          }})])
          setReplyId('');
          setReply(false)
          localStorage.setItem('comments',JSON.stringify(commentData) );
          
      }
      else{
        alert("Please fill the fields")
      }

    }
    const handleBack=()=>{
      setReply(false)
      setReplyId("");
    }
    return(
<div>
<input className="input_name" name="name" placeholder="Name" 
              onChange={handleInputChange}
              required  />
            <textarea  className="input_comment"name="comment" placeholder="Comment" 
              onChange={handleInputChange} 
              required  />
              <button  onClick={()=>handleReplied()}className="replied">Replied</button>
              <button  onClick={()=>handleBack() }className="replied">Back</button>
</div>
    )
}
export default ReplyComment;