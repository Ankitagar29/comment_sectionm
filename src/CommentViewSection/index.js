import { useState } from "react";
import './styles.css';
import ReplyComment from "../ReplyComment";
function addSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
  
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month,day,  year] = formattedDate.split(' ');

    const dayWithSuffix = addSuffix(parseInt(day));
  
    return `${dayWithSuffix} ${month} ${year}`;
  }
const CommentViewSection=({commentData,setCommentData})=>{
    const [editValue,setEditValue]=useState('')
    const [edit,setEdit]=useState(false)
    const [reply,setReply]=useState(false)
    const[replyId,setReplyId]=useState('');
    const[commentId,setCommentId]=useState('');
    const handleEdit=(item)=>{
        setCommentId('');
        setEdit(false);
        setReply(false)
        const {id='',comment=''}=item ||{};
        setEdit(true)
        setCommentId(id)
        setEditValue(comment)
    }
    const handleReply=(item)=>{
        setReplyId('');
        setReply(false);
        setEdit(false);
        const {id=''}=item ||{};
        setReply(true)
        setReplyId(id)
    }
    const handleInputChange=(e)=>{
        setEditValue(e.target.value)
    }
    const handleDone=(item)=>{
        if(editValue.trim()){
            setCommentData((pev)=>[...pev.map((element)=>{
                
                if(element?.id===item?.id){
                    return{
                        ...element,
                        comment:editValue.trim(),
                        
                        time:new Date(),
                    }
                }
                return{
                    ...element
                }
            })])
            setEdit(false)
        }
        else{
            alert("Please fill the comment")
        }
        
    }
   
  
return(
    <div>
        {commentData.map((item)=>{
        const{ name='',comment='',id='',time='',comments=[]}=item || {}
        return(
            <div className="comment">
                <div className="comment_header">
                   <div> {name}</div>
                <div>{formatDate(time)}</div>
                </div>
                {comment}
                <div className="button_container">
                    {(replyId===id && reply)?
                   null
                        :
                    <button onClick={()=>handleReply(item)} className="button_comment">Reply</button>
                    
            }
                
                {(commentId===id &&edit) ?<div>
                    <textarea  className="input_comment" name="comment" placeholder="Comment" defaultValue={comment}
                    onChange={handleInputChange} 
                    required  />
              <button className="button_comment" type="button" onClick={()=>handleDone(item)}>Done</button>
                </div>:<button className="button_comment" type="button" onClick={()=>{handleEdit(item)}}>Edit</button>}
              </div>
             {(replyId===id && reply)? <ReplyComment  setCommentData={setCommentData} commentData={commentData} replyId={replyId} setReply={setReply} setReplyId={setReplyId}/>:null}
             {(comments|| []).map((item)=>{
                if(item){
                    const { time='',name='',comment=''}=item || {}
                    
                    return (
                        <div className="reply_section_comment">
    
                            <div className="comment_header">
                                <div> {name}</div>
                                <div>{formatDate(time)}</div>
                            </div>
                            <div>
                                {comment}
                            </div>
                        </div>
                    )
                }
                else
                {
                    return  null;
                }
                
             })}
            </div>

        )
    })}
    </div>
)
}
export default CommentViewSection;