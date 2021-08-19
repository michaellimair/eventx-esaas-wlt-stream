import { ClientRole } from 'agora-rtc-sdk-ng';

export interface AgoraToken {
  agoraAppId: string;
  agoraChannelName: string;
  agoraUserId: string;
  agoraToken: string;
}

export interface AgoraTokenWithType extends AgoraToken {
  tokenType: string;
}

export interface AgoraTokenConfig {
  role: ClientRole;
  tokens: AgoraTokenWithType[];
  rtcTokens: AgoraTokenWithType[];
  rtmToken: AgoraToken;
}
