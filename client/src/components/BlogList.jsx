import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blogs, input} = useAppContext(); 

  const filterBlogs = ()=>{
    if(input == "") return blogs;
    return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 myy-10 mb-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative cursor-pointer text-gray-500 text-sm px-4 py-1 rounded-full ${
                menu === item ? "text-white" : ""
              }`}
            >
              {item}
              {menu === item && (
                <motion.div 
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-blue-600 rounded-full"
                ></motion.div>
              )}
            </button>
          </div>  
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">{filterBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog)=> <BlogCard key = {blog._id} blog = {blog}/>)}</div>
    </div>
  );
};

export default BlogList;
