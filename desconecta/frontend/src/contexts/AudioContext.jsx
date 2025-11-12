import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import musicaFundo from '../assets/Audio/audio_fundo.mp3';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio deve ser usado dentro de um AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // Volume padrão 50%
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Criar elemento de áudio
    audioRef.current = new Audio(musicaFundo);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Tentar reproduzir automaticamente
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay bloqueado. Aguardando interação do usuário.');
        // Adicionar listener para primeira interação
        const startAudio = async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            document.removeEventListener('click', startAudio);
          } catch (err) {
            console.error('Erro ao iniciar áudio:', err);
          }
        };
        document.addEventListener('click', startAudio);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const changeVolume = (newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
  };

  return (
    <AudioContext.Provider value={{ volume, changeVolume, isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
};
