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

      // Agregar videos a la nueva lista
      while (currentNode) {
        newList.append(currentNode.data);
        currentNode = currentNode.next;
      }

      newList.append(video); // Agregar el nuevo video
      return newList; // Actualiza el estado con la nueva lista
    });
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-area">
          <div className="youtube-search">
            <YoutubeSearch onAddToPlaylist={addToPlaylist} />
          </div>
        </div>
        <div className="playlist">
          <VideoPlayList playList={playList} />
        </div>
      </div>
      <div className="audio-player">
        <AudioPlayer playList={playList} />
      </div>
    </div>
  );
};

export default App;
