'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Mic, Video, Square, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RECORDING_CONFIG } from '@/lib/constants';

interface RecordButtonProps {
  onRecordingComplete?: (recordingData: {
    blob: Blob;
    type: 'audio' | 'video';
    duration: number;
  }) => void;
  variant?: 'start' | 'stop' | 'idle';
  maxDuration?: number;
}

export function RecordButton({ 
  onRecordingComplete, 
  variant = 'idle',
  maxDuration = 300000 // 5 minutes
}: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video'>('audio');
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setDuration(elapsed);
      
      if (elapsed >= maxDuration) {
        stopRecording();
      }
    }, 100);
  }, [maxDuration]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = async (type: 'audio' | 'video') => {
    try {
      const constraints = type === 'video' 
        ? { video: RECORDING_CONFIG.video, audio: RECORDING_CONFIG.audio }
        : { audio: RECORDING_CONFIG.audio };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: type === 'video' 
          ? 'video/webm;codecs=vp9' 
          : 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm'
        });
        
        onRecordingComplete?.({
          blob,
          type,
          duration
        });

        // Cleanup
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingType(type);
      setDuration(0);
      startTimer();
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
    }
  }, [isRecording, stopTimer]);

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        startTimer();
      } else {
        mediaRecorderRef.current.pause();
        stopTimer();
      }
      setIsPaused(!isPaused);
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className={cn(
              "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3",
              isPaused ? "bg-yellow-500/20" : "bg-red-500/20 animate-pulse"
            )}>
              {recordingType === 'video' ? (
                <Video className={cn(
                  "h-8 w-8",
                  isPaused ? "text-yellow-500" : "text-red-500"
                )} />
              ) : (
                <Mic className={cn(
                  "h-8 w-8",
                  isPaused ? "text-yellow-500" : "text-red-500"
                )} />
              )}
            </div>
            
            <div className="text-2xl font-mono font-bold text-foreground mb-1">
              {formatDuration(duration)}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {isPaused ? 'Recording Paused' : `Recording ${recordingType}...`}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={pauseRecording}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="accent"
              onClick={stopRecording}
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Recording
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Quick Record & Share
          </h3>
          <p className="text-sm text-muted-foreground">
            Discreetly record your encounter for evidence
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => startRecording('audio')}
            className="flex-1"
          >
            <Mic className="h-4 w-4 mr-2" />
            Record Audio
          </Button>
          
          <Button
            variant="outline"
            onClick={() => startRecording('video')}
            className="flex-1"
          >
            <Video className="h-4 w-4 mr-2" />
            Record Video
          </Button>
        </div>

        <div className="mt-4 p-3 bg-surface/40 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Recordings are stored locally and can be shared securely. 
            Maximum duration: {Math.floor(maxDuration / 60000)} minutes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
