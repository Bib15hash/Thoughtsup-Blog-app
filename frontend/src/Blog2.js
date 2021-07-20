import React,{useState,useEffect,useContext} from 'react';
import { useParams,Redirect } from 'react-router-dom';
import axios from 'axios';
import NavLogout from './NavLogout';
import {LoginContext} from './Contexts/LoginContext';
import {makeStyles} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({

    root: {
        textAlign:'justify',
        margin: '2.5rem', 
        position: 'relative',
        left: '20%',
        width: '50%'
    },

    title: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '2.5rem',
    },

    content: {
        fontFamily: 'Times New Roman',
        fontSize: '24px',
        lineHeight: '1.95rem'
    },

    pa: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
    
    },

    uploaded: {
        textAlign: 'center',
        fontWeight: '600'
    },

    media: {
        display: 'block',
        margin: '0 auto',
        width: '60%',
        paddingTop: '3rem',
        paddingBottom: '3rem'
    }

    
})

const Blog2 = () => {

    const classes = useStyles()
    
    const {postid} = useParams();

    const [post,setPost] = useState({});
    const [Logo, setImage] = useState('')

    const {loggedIn,currentUser} = useContext(LoginContext);

    useEffect(() => {

        axios.get(`http://localhost:8000/post/${postid}`)
        .then((res) => {
          setPost(res.data)
          setImage(res.data.image)
        })
        .catch(err => console.log('Could not receive data',err));
    }, [])

    console.log('look this', Image)

    return (
        <div>
            {loggedIn ? 
            (<div> 
                <NavLogout />
                    <div className={classes.root}>
                       <h1 className={classes.title}>{post.title}</h1>
                       <p className={classes.pa}>- by {post.user} </p>
                       <p className={classes.uploaded}>Uploaded on {moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                       
                       <img className={classes.media} src={`http://localhost:8000/public/uploads/${post.image}`} alt={post.image} />
                       <p className={classes.content}>{post.content}</p>
                    </div>
                </div>) 
                : 
                    (<div>
                        <Redirect to="/" /></div>
                    )}
        
            </div>)
};

export default Blog2;