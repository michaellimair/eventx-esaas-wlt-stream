import {
  FC, useEffect, useState,
  useRef,
} from 'react';
import {
  ClientConfig, ICameraVideoTrack, IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import useAgoraTokenConfig from 'hooks/useAgoraTokenConfig';
import AgoraRTC, { createClient } from 'agora-rtc-react';

const config: ClientConfig = {
  mode: 'live', codec: 'h264',
};

const useClient = createClient(config);

interface IAgoraPreviewProps {
  eventId?: string;
  webinarId?: string;
}

const AgoraPreview: FC<IAgoraPreviewProps> = ({
  eventId,
  webinarId,
}) => {
  const tokenConfig = useAgoraTokenConfig(eventId, webinarId);
  const videoRef = useRef<HTMLVideoElement | null>();
  const client = useClient();
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState<string>();
  const [selectedCameraId, setSelectedCameraId] = useState<string>();
  const [cameraTrack, setCameraTrack] = useState<ICameraVideoTrack>();
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack>();
  const [started, setStarted] = useState<boolean>(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    if (!selectedCameraId || !videoRef.current) {
      return;
    }
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: selectedCameraId,
      },
      audio: false,
    }).then((stream) => {
      videoRef.current!.srcObject = stream;
      videoRef.current!.play();
    });
  }, [selectedCameraId, videoRef.current]);

  useEffect(() => {
    if (selectedCameraId) {
      return;
    }
    const init = async () => {
      const obtainedCameras = await AgoraRTC.getCameras();
      setCameras(obtainedCameras);
      setSelectedCameraId(obtainedCameras[0].deviceId);
    };
    init();
  }, [selectedCameraId]);

  useEffect(() => {
    if (selectedMicrophoneId) {
      return;
    }
    const init = async () => {
      const obtainedMicrophones = await AgoraRTC.getMicrophones();
      setMicrophones(obtainedMicrophones);
      setSelectedMicrophoneId(obtainedMicrophones[0].deviceId);
    };
    init();
  }, [selectedMicrophoneId]);

  useEffect(() => {
    if (!client || !tokenConfig) {
      return;
    }

    // function to initialise the SDK
    const init = async () => {
      client.setClientRole(tokenConfig.role);
      const webcamToken = tokenConfig.tokens.find((token) => token.tokenType === 'webcam')!;
      const {
        agoraAppId,
        agoraChannelName,
        agoraToken,
        agoraUserId,
      } = webcamToken;
      await client.join(agoraAppId, agoraChannelName, agoraToken, agoraUserId);
      setStarted(true);
    };

    init();
  }, [client, tokenConfig]);

  useEffect(() => {
    if (!started || !selectedCameraId || !selectedMicrophoneId || cameraTrack || audioTrack) {
      return;
    }
    const initTracks = async () => {
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks(
        {
          AEC: false,
          AGC: false,
          ANS: false,
          encoderConfig: {
            bitrate: 64,
            stereo: false,
            sampleRate: 44100,
          },
          microphoneId: selectedMicrophoneId,
        },
        {
          cameraId: selectedCameraId,
          encoderConfig: '1080p_3',
          optimizationMode: 'motion',
        },
      );
      await client.publish(tracks);
      setAudioTrack(tracks[0]);
      setCameraTrack(tracks[1]);
    };
    initTracks();
  }, [started, selectedMicrophoneId, selectedCameraId, cameraTrack, audioTrack]);

  useEffect(() => {
    if (!audioTrack || !selectedMicrophoneId) {
      return;
    }
    audioTrack.stop();
    audioTrack.setDevice(selectedMicrophoneId!);
  }, [audioTrack, selectedMicrophoneId]);

  useEffect(() => {
    if (!cameraTrack || !selectedCameraId) {
      return;
    }
    cameraTrack.stop();
    cameraTrack.setDevice(selectedCameraId!);
  }, [cameraTrack, selectedCameraId]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginBottom: 8, marginTop: 16 }}>
          {cameras && (
          <label htmlFor="cameraId">
            Camera:
            <select name="cameraId" id="cameraId" value={selectedCameraId} onChange={(e) => setSelectedCameraId(e.target.value)}>
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
          </label>
          )}
        </div>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          {microphones && (
          <label htmlFor="microphoneId">
            Microphone:
            <select name="microphoneId" id="microphoneId" value={selectedMicrophoneId} onChange={(e) => setSelectedMicrophoneId(e.target.value)}>
              {microphones?.map((microphone) => (
                <option key={microphone.deviceId} value={microphone.deviceId}>
                  {microphone.label}
                </option>
              ))}
            </select>
          </label>
          )}
        </div>
      </div>
      <div style={{
        resize: 'both', overflow: 'auto', display: 'flex', border: '2px solid black', height: 360,
      }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video style={{ height: '100%', width: '100%' }} ref={videoRef as any} />
      </div>
    </div>
  );
};

export default AgoraPreview;
