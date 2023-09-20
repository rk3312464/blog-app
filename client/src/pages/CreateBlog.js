import React from 'react'
import {useNavigate} from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast';
function CreateBlog() {

  const navigate = useNavigate();
  
  const postData = async(e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    // console.log(title,description);
    const blog = {
      title,
      description,
    };

    // below code is to send the data backend server
    const response = await fetch("http://localhost:5000/post-blog",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(blog),
    });

    if(response.status === 200){
      toast.success("Blog posted successfully");
      e.target.title.value = "";
      e.target.description.value="";

      setTimeout( () => navigate("/"),2000);
    }else{
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster
      position='top-center'
      reverseOrder={false}
      />
    <div className='w-[90vw] lg:w-[60vw] mx-auto mt-10 gap-10'>
        <h1 className=' text-2xl font-bold text-center'>Create Blogs</h1>
        <form className='flex flex-col gap-3' onSubmit={postData}>
            <label htmlFor='title' className='font-semibold text-lg'>Title :{" "}
            </label>
            <input id='' placeholder='Enter the blog title' name='title' 
            className='py-2 px-3 rounded-md outline-none border-2 border-gray-300'/>
            <label htmlFor='description' className='font-semibold text-lg'>Description :{" "}
            </label>
            <textarea id='description' name='description' 
            className='py-2 px-3 rounded-md outline-none border-2 border-gray-300' rows={10}/>
            <button type='submit' 
            className='bg-purple-300 hover:bg-purple-500 py-3 rounded-md text-white text-xl font-bold'>Post</button>
        </form>

    </div>
    </>
  )
}

export default CreateBlog