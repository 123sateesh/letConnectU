import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostData from './PostData';

const Posts = ({getPosts,post:{posts,loading}}) => {
  useEffect(()=>{
    getPosts()
  },[getPosts])
  
  return <Fragment>
  {loading ? <Spinner/> :(<Fragment>
    <h1 className="large head-primary m-1 "> Posts</h1>
        <p className='paraStyle m-1 '><i className="fas fa-user-plus "></i> Welcome to Connection Platform.</p>
        <PostData/>
         <div className=''>
          {posts.map(post =>(
         <PostItem key={post._id} post ={post} />
          ))}
         </div>
    </Fragment>)}
  </Fragment>
};

Posts.propTypes = {
  getPosts : PropTypes.func.isRequired,
  post : PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  post : state.post
})

export default  connect( mapStateToProps,{getPosts}) (Posts);
