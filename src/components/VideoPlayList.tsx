import React from 'react';
import { Video } from '../types/videoTypes';
import { DoublyLinkedList } from '../utils/DoublyLinkedList'; // Importa la clase DoublyLinkedList
import { Play } from "lucide-react"; // Asegúrate de que lucide-react esté instalado
import '../styles/VideoPlayList.css';

interface VideoPlayListProps {
  playList: DoublyLinkedList<Video>; // Asegúrate de que esto sea del tipo correcto
}

const VideoPlayList: React.FC<VideoPlayListProps> = ({ playList }) => {
  const renderPlaylist = () => {
    const videos: Video[] = [];
    let currentNode = playList.head;

    // Recorrer la lista y agregar los videos a un array
    while (currentNode) {
      videos.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return videos.map((video) => (
      <div className="playlist-item" key={video.id.videoId}>
        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="thumbnail" />
        <div className="song-info">
          <div className="song-title">{video.snippet.title}</div>
          <div className="song-artist">{video.snippet.channelTitle}</div> {/* Suponiendo que quieras mostrar el canal */}
        </div>
        <div className="play-button">
          <Play />
        </div>
      </div>
    ));
  };

  return (
    <div className="playlist">
      <h2>Lista de reproducción</h2>
      <div className="playlist-container">
        {renderPlaylist()}
      </div>
    </div>
  );
};

export default VideoPlayList;
