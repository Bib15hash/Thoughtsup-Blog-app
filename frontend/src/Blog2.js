import React,{useState,useEffect,useContext} from 'react';
import { useParams,Redirect } from 'react-router-dom';
import {ThumbUp, ThumbDown} from '@material-ui/icons'
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
        left: '22%',
        width: '50%'
    },

    title: {
        fontFamily: 'Kiwi Maru',
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '2.5rem',
    },

    content: {
        fontFamily: 'Raleway',
        fontSize: '20px',
        lineHeight: '1.95rem',
        wordSpacing: '5px'
    },

    pa: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
    
    },

    uploaded: {
        fontFamily: 'Cedarville Cursive',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '800'
    },

    media: {
        display: 'block',
        margin: '0 auto',
        width: '60%',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        position:'relative',
    },

    ic : {
        display: 'inline-block',
        position: 'relative',
        top: '2rem',
        cursor: 'pointer',
        left: '1rem'
    },

    ic2: {
        display: 'inline-block',
        position: 'relative',
        top: '2rem',
        left: '3rem',
        cursor: 'pointer',
        marginBottom: '4rem'
    },


    txt: {
        position: 'relative',
        bottom: '1.75rem',
        left: '1rem'

    }

    
})

const Blog2 = () => {

    const classes = useStyles()
    
    const {postid} = useParams();
    const [allPosts, setAllPosts] = useState([])

    const [post,setPost] = useState({
        likes: []
    });
    const [Logo, setImage] = useState('')
    const [obj, setObj] = useState({
        userId: '',
        postId: ''
    })

    const {loggedIn,currentUser} = useContext(LoginContext);

    // useEffect(() => {

    //     axios.get(`http://localhost:8000/post/${postid}`)
    //     .then((res) => {
    //       setPost(res.data)
    //       setImage(res.data.image)
    //     })
    //     .catch(err => console.log('Could not receive data',err));
    // }, []);

    useEffect(() => {

        axios.get(`http://localhost:8000/post/${postid}`)
        .then((res) => {
          setPost(res.data)
          setImage(res.data.image)
        })
        .catch(err => console.log('Could not receive data',err));


        axios.get('http://localhost:8000/post')
        .then(res => {
            setAllPosts(res)
        })
        .catch(err => console.log(err));

        setObj({
            userId: currentUser.googleId,
            postId: post._id
        })
    },[post.likes]);

   

    console.log('look this size', post.likes)

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
                        <div className={classes.ic}>
         
                        <ThumbUp onClick={() => {    
                            
                            axios.patch('http://localhost:8000/like', obj)
                            .then(obj => console.log('Object', obj))
                            .catch(err => console.log("Error", err))
                        }}/>
                        </div>
                        <div className={classes.ic2}>
                        <ThumbDown onClick={() => {    
                            
                            axios.patch('http://localhost:8000/unlike', obj)
                            .then(obj => {
                                console.log('obj',obj)
                            })
                            .catch(err => console.log("Error", err))
                        }}/>
                        </div>
                        {post.likes.length ? <div className={classes.txt}>{post.likes.length} likes</div> : null}
                    </div>
                </div>) 
                : 
                    (<div>
                        <Redirect to="/" /></div>
                    )}
        
            </div>)
};

export default Blog2;