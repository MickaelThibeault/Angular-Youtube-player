import {YoutubeVideo} from "./youtube-video";

export interface User {
  id: string;
  username: string;
  email: string;
  library: YoutubeVideo[];
}
