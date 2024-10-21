import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Video } from '../types/videoTypes';
import { DoublyLinkedList } from '../utils/DoublyLinkedList';
import { SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import '../styles/AudioPlayer.css';

interface AudioPlayerProps {
  playList: DoublyLinkedList<Video>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ playList }) => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true);
    }
  }, [playList]);

  useEffect(() => {
    if (player && currentVideo) {


      const fetchDuration = () => {
        const currentDuration = player.getDuration();
        if (currentDuration && !isNaN(currentDuration)) {
          setDuration(currentDuration);
        } 
      };

      fetchDuration();

      const interval = setInterval(() => {
        if (player) {
          const currentTime = player.getCurrentTime();
          if (duration > 0) {
            const progressPercentage = (currentTime / duration) * 100;
            setProgress(progressPercentage);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval); 
      };
    }
  }, [player, currentVideo]);

  const handleNext = () => {
    playList.next();
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true);
      player?.playVideo();
    }
  };

  const handlePrevious = () => {
    playList.previous();
    const current = playList.getCurrent();
    if (current) {
      setCurrentVideo(current.data);
      setIsPlaying(true);
      player?.playVideo();
    }
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
    if (currentVideo) {
      event.target.playVideo();
      const currentDuration = event.target.getDuration();
      if (currentDuration && !isNaN(currentDuration)) {
        setDuration(currentDuration);
      } 
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setProgress(value);
    const newTime = (value / 100) * duration;
    player?.seekTo(newTime);
  };

  const onError = (event: any) => {
    console.error("errror loading YouTube video", event.data);
    setPlayer(null); 
  };

  return (
    <div className="audio-player-container">
      <div className="audio-player">
        {currentVideo ? (
          <>
            <div className="song-info">
              <img
                src={currentVideo.snippet.thumbnails.default.url}
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
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  className="slider"
                  onChange={handleProgressChange}
                />
              </div>
            </div>

            <div style={{ display: 'none' }}>
              <YouTube
                videoId={currentVideo.id.videoId}
                opts={{ playerVars: { autoplay: isPlaying ? 1 : 0, enablejsapi: 1 } }}
                onReady={onReady}
                onEnd={handleNext}
                onError={onError}
              />
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
