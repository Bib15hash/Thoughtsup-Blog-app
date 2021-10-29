import React,{useState,useEffect,useContext} from 'react';
import { useParams,Redirect,useHistory } from 'react-router-dom';
import {ThumbUp, ThumbDown} from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import NavLogout from './NavLogout';
import {LoginContext} from './Contexts/LoginContext';
import {makeStyles,TextField,Button} from '@material-ui/core';
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

    },

    view: {
        float: 'right',
        position: 'relative',
        right: '3rem',
        top: '1.5rem'
    },

    view2: {
        position: 'absolute',
        bottom: '3%',
        right: '7.5%',
    },

    class_h3: {
        fontSize: '32px',
        fontFamily: 'Kiwi Maru'
    },

    recent: {
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },

    us: {
        fontStyle: 'italic'
    },

    textAndButton: {
        display: 'inline-block'
    },

    addbutton: {
        marginBottom: '1rem',
        position: 'abosulte',
        left: '10%',
        top: '1rem',
        ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
            left: '20%'
        },

        ['@media (min-width:1001px)']: { // eslint-disable-line no-useless-computed-key
            left: '40%'
        },

        ['@media (min-width:1250px)']: { // eslint-disable-line no-useless-computed-key
            left: '5%'
        }
    },

    commentbar: {
        width: '35rem',
        ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
            width: '18rem'
        },

        ['@media (max-width:750px)']: { // eslint-disable-line no-useless-computed-key
            width: '12rem'
        }

    },

    viewcount: {
        position: 'relative',
        float: 'right',
        bottom: '-3rem',
        right: '0.5rem'

    }

    
})

const Blog2 = () => {

    const classes = useStyles()
    
    const history = useHistory();

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

    const [obj2, setObj2] = useState({
        userName: '',
        postId: '' 
    })

    const {loggedIn,currentUser} = useContext(LoginContext);

    const [comm,setComment] = useState('');

    const [com, setCom] = useState([]);

    const handleClick = (post) => {

        axios({
            method: 'patch',
            url: 'http://localhost:8000/postview',
            data: {
                id: post._id
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        history.push('/post/'+post._id)
    }


    useEffect(() => {

        axios.get(`http://localhost:8000/post/${postid}`)
        .then((res) => {
          setCom(res.data.comments)
          setPost(res.data)
          setImage(res.data.image)
        })
        .catch(err => console.log('Could not receive data',err));


        axios.get('http://localhost:8000/post')
        .then(res => {
            setAllPosts(res.data)
        })
        .catch(err => console.log(err));

        setObj({
            userId: currentUser.googleId,
            postId: post._id
        })

        setObj2({
            postId: post._id,
            userName: currentUser.name
        })


    },[post.likes]);

    

    
    // console.log('look this size', post.likes)
    console.log('Post comments ', com)

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

                         <VisibilityIcon className={classes.view}/>
                         <div className={classes.viewcount}>{post.views} views</div>


                        {post.likes.length ? <div className={classes.txt}>{post.likes.length} likes</div> : null}

                        <h3 className={classes.class_h3}>Comments</h3>

                        <div className={classes.textAndButton}>
                        <TextField
                            className={classes.commentbar}
                            onChange={(e) => {
                                if (e.target.value.length !== 0)
                                    setComment(e.target.value)
                                }}
                            value={comm}
                            placeholder="Add a comment"
                            multiline
                            rows={2}
                            
                        />  

                        <Button onClick={() => {
                            axios({
                                method: 'patch',
                                url: 'http://localhost:8000/comment',
                                data: {
                                  obj2,
                                  text: comm
                                }
                            })
                            .then(res => console.log(res.data))
                            .catch(err => console.log(err))
                            ;

                            setComment('')
                        }} variant="contained" color="primary" className={classes.addbutton}>Add</Button>

                        
                        {com && com.slice(0).reverse().map(val => {
                            return <div>
                                <h4>{val.userName}</h4>
                                <p>{val.comment}</p>
                            </div>

                        })}
                        

                        </div>

                        <h3 className={classes.class_h3}>Recent Articles</h3>
                        
                        <div>
                        
                            {   
                                allPosts.slice(0, 3).map(blog => {
                                    return (
                                        <ul><li>
                                        <p onClick={() => {handleClick(blog)}} className={classes.recent}>{blog.title} - by <span className={classes.us}>{blog.user}</span></p>
                                        </li></ul>
                                    )
                            })}
                        </div>

                        {/* <div className={classes.view} >
                        Views <VisibilityIcon />
                        </div> */}
                    </div>
                </div>) 
                : 
                    (<div>
                        <Redirect to="/" /></div>
                    )}
        
            </div>)
};

export default Blog2;