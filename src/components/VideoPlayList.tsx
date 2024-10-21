import React from 'react';
import { Video } from '../types/videoTypes';
import { DoublyLinkedList } from '../utils/DoublyLinkedList'; 
import { Play } from "lucide-react"; 
import '../styles/VideoPlayList.css';

interface VideoPlayListProps {
  playList: DoublyLinkedList<Video>; 
}

const VideoPlayList: React.FC<VideoPlayListProps> = ({ playList }) => {
  const renderPlaylist = () => {
    const videos: Video[] = [];
    let currentNode = playList.head;

    
    while (currentNode) {
      videos.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return videos.map((video) => (
      <div className="playlist-item" key={video.id.videoId}>
        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="thumbnail" />
        <div className="song-info">
          <div className="song-title">{video.snippet.title}</div>
          <div className="song-artist">{video.snippet.channelTitle}</div>
        </div>
        <div className="play-button">
          <Play />
        </div>
      </div>
    ));
  };

  return (
    <div className="playlist">
      <h2>PlayList</h2>
      <div className="playlist-container">
        {renderPlaylist()}
      </div>
    </div>
  );
};

export default VideoPlayList;
