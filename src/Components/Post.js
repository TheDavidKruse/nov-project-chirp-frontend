
// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from 'react';
import "./Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faStar, faClock, fabEmpire } from '@fortawesome/free-solid-svg-icons';

export default function Post(props) {
  const chirp = props.chirp
  return (
    <div className="post">
      <span className="content">{chirp.message}</span>
      <span className="likes">{chirp.likes} <FontAwesomeIcon icon={faThumbsUp}/></span>
      <span className="dislikes">{chirp.dislikes} <FontAwesomeIcon icon={faThumbsDown}/></span>
      <span className="favorites">{chirp.favorites} <FontAwesomeIcon icon={faStar}/></span>
      <span className="createdAt">{chirp.created_at} <FontAwesomeIcon icon={faClock}/></span>
      
    </div>
  )
}

