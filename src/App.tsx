import React, { useState } from 'react';
import YoutubeSearch from './components/YoutubeSearch';
import VideoPlayList from './components/VideoPlayList';
import AudioPlayer from './components/AudioPlayer';
import { DoublyLinkedList } from './utils/DoublyLinkedList';
import { Video } from './types/videoTypes';
import './styles/App.css';

const App: React.FC = () => {
  const [playList, setPlayList] = useState<DoublyLinkedList<Video>>(new DoublyLinkedList());

  const addToPlaylist = (video: Video) => {
    setPlayList((prevList) => {
      const newList = new DoublyLinkedList<Video>();
      let currentNode = prevList.head;

      while (currentNode) {
        newList.append(currentNode.data);
        currentNode = currentNode.next;
      }

      newList.append(video); 
      return newList; 
    });
  };

  const removeFromPlaylist = (video: Video) => {
    setPlayList((prevList) => {
      const newList = new DoublyLinkedList<Video>();
      let currentNode = prevList.head;

      while (currentNode) {
        if (currentNode.data.id.videoId !== video.id.videoId) {
          newList.append(currentNode.data);
        }
        currentNode = currentNode.next;
      }
      
      return newList; 
    });
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-area">
            <YoutubeSearch onAddToPlaylist={addToPlaylist} />
        </div>
          <VideoPlayList playList={playList} onRemoveFromPlaylist={removeFromPlaylist} />
      </div>
        <AudioPlayer playList={playList} />
    </div>
  );
};

export default App;
