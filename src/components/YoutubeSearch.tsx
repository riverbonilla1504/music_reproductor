import React, { useState } from 'react';
import axios from 'axios';
import { Video } from '../types/videoTypes';
import { Search, Plus } from 'lucide-react';
import '../styles/YoutubeSearch.css';

interface YoutubeSearchProps {
  onAddToPlaylist: (video: Video) => void;
}

const YoutubeSearch: React.FC<YoutubeSearchProps> = ({ onAddToPlaylist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);

  const searchYouTube = async () => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; 
    console.log(apiKey);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&key=${apiKey}`;
    const response = await axios.get<{ items: Video[] }>(url);
    setVideos(response.data.items);
  };

  return (
    <div className="youtube-search">
      <div className="search-container">
        <div className="search-header">
          <h2>Buscar</h2>
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar videos"
              className="search-input"
            />
            <button onClick={searchYouTube} className="search-button">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="search-results">
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3>{video.snippet.title}</h3>
                <button
                  onClick={() => onAddToPlaylist(video)}
                  className="add-button"
                >
                  <Plus size={16} />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YoutubeSearch;
