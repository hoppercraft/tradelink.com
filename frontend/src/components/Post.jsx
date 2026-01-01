import React, { useState } from "react";
import { useRef } from "react";

const Post = () => {
 const textareaRef = useRef(null);
 const fileInputRef =useRef(null);

 const [image,setImage]=useState(null);
 const [description,setDescription]=useState("");
 const [price,setPrice]=useState("");
 const [preview,setPreview]=useState(null);

  const autoResize = () => {
    const size = textareaRef.current;
    size.style.height = "auto";
    size.style.height = size.scrollHeight + "px";
  };

  const Form=new FormData();


  const chooseImage=()=>{
      fileInputRef.current.click();
  }

  const changeImage=(e)=>{
      const file=e.target.files[0];
      if(!file)return;
      setImage(file);
       setPreview(URL.createObjectURL(file));
  }

  //code for api connection

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Post
        </h2>

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            <img src={preview} alt="photo" className="w-full h-full rounded-xl"/>
          </div>
          <button className="px-6 py-3 text-base bg-gray-800 text-white rounded-xl hover:bg-gray-700 cursor-pointer" onClick={chooseImage}>
            Choose Image
          </button>
                       <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={changeImage}/>
        </div>

        

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">
            Product Description
          </label>
          <textarea
            ref={textareaRef}
            rows={2}
            onChange={autoResize}
            placeholder="Enter description"
            className="border  border-gray-300  resize-none rounded-xl px-4 py-3 overflow-hidden text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">Price</label>
          <input
            type="text"
            placeholder="e.g. 1200"
            className="border  border-gray-300  rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Post button */}
        <button className="w-full py-3 text-lg bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 cursor-pointer">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
