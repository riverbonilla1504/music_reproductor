import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Video } from '../types/videoTypes';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import '../styles/AudioPlayer.css'; // Asegúrate de importar tus estilos

interface AudioPlayerProps {
  playList: DoublyLinkedList<Video>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ playList }) => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null); // Guarda la instancia del reproductor
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true); // Cambia el estado a verdadero para reproducir
    }
  }, [playList]);

  const handleNext = () => {
    playList.next(); // Mover al siguiente video
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true);
      player.playVideo();
    }
  };

  const handlePrevious = () => {
    playList.previous(); // Mover al video anterior
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true);
      player.playVideo();
    }
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo(); // Pausa el video
      } else {
        player.playVideo(); // Reproduce el video
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  return (
    <div className="audio-player-container">
      <div className="audio-player">
        {currentVideo && (
          <>
            <div className="song-info">
              <img
                src={currentVideo.snippet.thumbnails.default.url} // Usa la miniatura del video
                alt="Album cover"
                className="album-cover"
              />
              <div className="song-details">
                <h3 className="song-title">{currentVideo.snippet.title}</h3>
                <p className="artist-name">{currentVideo.snippet.channelTitle}</p>
              </div>
            </div>

            <div className="playback-controls">
              <div className="control-buttons">
                <button className="skip-button" onClick={handlePrevious}>
                  <SkipBack size={20} />
                </button>
                <button className="play-pause-button" onClick={togglePlay}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="skip-button" onClick={handleNext}>
                  <SkipForward size={20} />
                </button>
              </div>
              <div className="progress-bar">
                <span className="time">0:00</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  className="slider"
                  onChange={(e) => setProgress(Number(e.target.value))}
                />
                <span className="time">3:30</span>
              </div>
            </div>

            <div className="volume-control">
              <button className="volume-button">
                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                className="volume-slider"
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>

            {/* Ocultar el iframe de YouTube */}
            <div style={{ display: 'none' }}>
              <YouTube
                videoId={currentVideo.id.videoId}
                opts={{ playerVars: { autoplay: isPlaying ? 1 : 0 } }}
                onReady={onReady}
                onEnd={handleNext}
              />
            </div>
          </>
        )}
      </div>
      <div className="control-bar">
      </div>
    </div>
  );
};

export default AudioPlayer;
