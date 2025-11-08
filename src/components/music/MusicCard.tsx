// src/components/music/MusicCard.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Music } from '@/interfaces/program';
import { Music as MusicIcon, Play, Pause, Trash2, Volume2, Volume1, VolumeX, FastForward } from 'lucide-react';

interface MusicCardProps {
    music: Music;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({ music, onToggleStatus, onDelete }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.75);
    const [playbackRate, setPlaybackRate] = useState(1);
    const playbackRates = [1, 1.25, 1.5, 2];

    // Toggles play/pause state
    const togglePlayPause = () => {
        if (music.status === 'Disabled') return;
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };
    
    // Cycles through playback speeds
    const cyclePlaybackSpeed = () => {
        const currentIndex = playbackRates.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % playbackRates.length;
        setPlaybackRate(playbackRates[nextIndex]);
    };

    // Formats time from seconds to MM:SS format
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // --- Effects for managing audio element ---
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };
        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);
    
    // Update audio element's volume and playback rate when state changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.playbackRate = playbackRate;
        }
    }, [volume, playbackRate]);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

    return (
        <div className={`bg-gray-800 rounded-lg shadow-lg flex flex-col aspect-square justify-between p-4 transition-all ${music.status === 'Disabled' ? 'opacity-50 pointer-events-none' : 'hover:shadow-indigo-500/30'}`}>
            <audio ref={audioRef} src={music.url} preload="metadata"></audio>

            <div className="flex justify-between items-start">
                <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-white truncate">{music.name}</h3>
                    <p className="text-sm text-gray-400">{music.category}</p>
                </div>
                <div className="flex-shrink-0">
                    <label htmlFor={`toggle-${music.id}`} className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input id={`toggle-${music.id}`} type="checkbox" className="sr-only" checked={music.status === 'Enabled'} onChange={() => onToggleStatus(music.id)} />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${music.status === 'Enabled' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${music.status === 'Enabled' ? 'translate-x-full' : ''}`}></div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center my-2">
                 <button onClick={togglePlayPause} className="bg-indigo-500/10 text-indigo-400 rounded-full w-24 h-24 flex items-center justify-center hover:bg-indigo-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {isPlaying ? <Pause size={48} /> : <Play size={48} className="ml-1" />}
                </button>
            </div>
            
            <div className="flex-shrink-0">
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2 cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    if (audioRef.current) audioRef.current.currentTime = (clickX / rect.width) * duration;
                }}>
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        <VolumeIcon size={20} className="text-gray-400" />
                        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <button onClick={cyclePlaybackSpeed} className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md hover:bg-indigo-500/20">
                        {playbackRate}x
                    </button>
                    <button onClick={() => onDelete(music.id)} className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
