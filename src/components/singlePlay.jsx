import "../styles/singleplay.css";
import play from "../assets/play (2).png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import React, { useState, useRef } from 'react';
import { Button } from "@mui/material";
import { useEffect } from "react";


const Singleplay=()=>{
    // ----------------------------------------------
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [likeStatus,setLikeStatus]=useState(false);
    const audioRef = useRef(null);
  
    const togglePlay = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
    
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  
    const handleSliderChange = (e) => {
      const newTime = parseFloat(e.target.value);
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    };
    const handleLike=()=>{
      const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
      if (!arr3 || arr3.status!= 'success') {
        alert("you are not logged in");
        // handleClickOpen()
      }
       else {
       
        // setalertSt(true);
        // setTimeout(() => {
        //   setalertSt(false);
        // }, 1500)
        const jwtToken = arr3 && arr3.token; // Replace with your actual JWT token
        const projectId = 'yda0liol0ofu'; // Replace with your actual project ID
        const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
        const songId = songchoosen._id; // 
  
        const requestBody = {
          songId: songId,
        };
  
  
        fetch(apiUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'projectID': projectId,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
             
              throw new Error('Request failed');
            }
          })
          .then(data => {
            console.log(data.message)
           data.message === 'song added to favorites successfully.' ? (setLikeStatus(true)) : setLikeStatus(false);
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
      }










    }
  
    // ----------------------------------------------
    const songchoosen= JSON.parse(localStorage.getItem('selected'));

    const arr2=JSON.parse(localStorage.getItem("likedSongArrayUp"));
    const obj=songchoosen;
  
  
  
  const handleLikePlaylist3=() => {
    const arr3=JSON.parse(localStorage.getItem("loginStatus"));
    const jwtToken = arr3.token; // Replace with your actual JWT token
    if(arr3.status!='success'){
      alert("you are not logged in");
    }else{

    

    
const projectId = 'yda0liol0ofu'; // Replace with your actual project ID
const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
const songId = songchoosen._id; // 
   
    const requestBody = {
      songId: songId,
  };
      

  fetch(apiUrl, {
    method: 'PATCH', 
    headers: {
        'Authorization': `Bearer ${jwtToken}`, 
        'projectID': projectId, 
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify(requestBody), 
})
.then(response => {
    if (response.ok) {
        return response.json(); // Parse the response JSON if needed
    } else {
        // Request failed, handle the error
        throw new Error('Request failed');
    }
})
.then(data => {
    // Handle the response data if needed
    // setSecondaryData(data);
    console.log('Response Data:', data);
})
.catch(error => {
    // Handle any errors that occurred during the fetch request
    console.error('Error:', error);
});

 }
  }

  // useEffect(() => {
  //   setLikeStatus(false);
  //   const arr4 = JSON.parse(localStorage.getItem("loginStatus"));
  //   if (arr4){

    
  //   const jwtToken3 = arr4.token;;
  //   const projectId3 = 'f104bi07c490';
  //   const apiUrl3 = 'https://academics.newtonschool.co/api/v1/music/favorites/like';

  //   fetch(apiUrl3, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${jwtToken3}`,
  //       'projectID': projectId3,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Request failed');
  //       }
  //     })
  //     .then(data => {
  //       const isObjectPresent = data.data.songs.some(obj => obj._id === songchoosen._id);
  //       if (isObjectPresent) {
  //         setLikeStatus(true);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   }
  // }, [songchoosen]);

   
    return <>
    <div className="singleplay">
        
        
        <img className="img1" src={songchoosen.thumbnail} alt="img1" />
        
        
    </div>
    <div className="musicbar">
        {/* ----------------------------------------------------------- */}
        <style>
        {`
          .custom-seek-bar {
            position: absolute;
            top: 0;
            width: 100%;
            height: 4px;
            background-color: #ccc; 
            color:'blue';
          }

          .custom-seek-bar::before {
            content: '';
            position: absolute;
            height: 100%;
            width: ${(currentTime / audioRef.current?.duration) * 100}%; /* Adjust width based on current time */
            background-color: blue; /* Color to the left of the thumb */
            z-index: 1; /* Place it above the thumb */
          }
        `}
      </style>
      
        <input
          type="range"
          value={currentTime}
          min={0}
          max={audioRef.current ? audioRef.current.duration : 0}
          step={0.01}
          onChange={handleSliderChange}
          className="custom-seek-bar"
        />
        <div className="controls">
            
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={songchoosen.audio_url} type="audio/mpeg" />
        </audio>
    <SkipPreviousIcon  className="icon" sx={{height:'2.5rem', width:"2.5rem"}}></SkipPreviousIcon>
    {!isPlaying ? <PlayArrowIcon sx={{height:'2.5rem', width:"2.5rem"}}onClick={togglePlay}></PlayArrowIcon> : <PauseIcon sx={{height:'2.5rem', width:"2.5rem"}}onClick={togglePlay}></PauseIcon>}
    
            <SkipNextIcon className="icon" sx={{height:'2.5rem', width:"2.5rem"}} ></SkipNextIcon>
        </div>
        <div className="details2">
            <img className="img2" src={play} alt="" />
            <div>
                <h2>{songchoosen.title}</h2>
                <p>Music . 20M</p>
            </div>
        </div>
        <div className="likes2">
            <ThumbUpOffAltIcon color={likeStatus ? "primary" : "ksm"} onClick={handleLike} className="like" sx={{height:'2rem', width:"2rem"}}></ThumbUpOffAltIcon>
            <ThumbDownOffAltIcon className="dislike" sx={{height:'2rem', width:"2rem"}}></ThumbDownOffAltIcon>
            {/* <Button size="small" variant="outlined" onClick={handleLikePlaylist3}>add to playlist</Button> */}
        </div>
    </div>
    </>
}

export default Singleplay;