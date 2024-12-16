import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/constants';

export function useSocket(onUpdate: (message: string) => void, onError: (error: string) => void) {
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on('processingUpdate', onUpdate);
    socket.on('error', onError);

    return () => {
      socket.off('processingUpdate');
      socket.off('error');
      socket.disconnect();
    };
  }, [onUpdate, onError]);
}