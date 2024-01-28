import './styles.css';
import { v4 as uuidv4 } from 'uuid';
const CommentSection=({comment,setComment,commentData,setCommentData})=>{
   
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setComment((prevData) => ({
          ...prevData,
          [name]: value,
        }));

      };
    const handleClick=()=>{
      const { name='',comment:comment_value=''}=comment || {}
      if(comment_value.trim() && name.trim()){
        setCommentData(()=>[
            ...commentData,
            {
              ...comment,
              time:new Date(),
              id:uuidv4()
      
            }
          ])
          localStorage.setItem('comments',JSON.stringify(commentData) );
      }
      else{
        alert("Please fill the fields")
      }
  
    }
    return(
        <div className="comment_section_component"> 
        <form onSubmit={handleClick}>

    
            <div>Comment</div>
            <input className="input_name" name="name" placeholder="Name" value={comment.name}
              onChange={handleInputChange}
              required  />
            <textarea  className="input_comment"name="comment" placeholder="Comment" value={comment.comment}
              onChange={handleInputChange} 
              required  />
            <div className="button_container">
                <button className='post_button' onClick={()=>handleClick()}>POST</button>
            </div>
            
            </form>
        </div>
    )
}
export default CommentSection;