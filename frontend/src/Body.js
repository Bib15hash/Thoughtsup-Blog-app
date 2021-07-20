import React,{useState,useEffect} from "react";
import {makeStyles,TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Blog from  "./Blog";
import Compose from "./Compose";
import axios from 'axios';

const useStyles = makeStyles({
    search: {
        float: "right",
        marginRight: "10rem",
        position: "relative",
        top: "1.5rem"
    },

});

const Body = () => {
    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState("");
    const [blogPosts, setBlogPosts] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        return axios.get('http://localhost:8000/post')
            .then(res => setBlogPosts(res.data))
            .catch(err => console.log(err));
    }, [blogPosts.length]);
    
    return (
        <div>  
         
                <TextField onChange={handleChange} className={classes.search} id="standard-basic" placeholder="Search for blogs" name="search" value={searchTerm}/>
                <SearchIcon className={classes.icon} />

            {blogPosts.filter((blog) => {
                if (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
                    return blog;                       
            }).map(blog => {
                return <Blog blog={blog} />
            })}
            
        </div>
    )
}

export default Body;
