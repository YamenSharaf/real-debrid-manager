export type DownloadFileData = {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  link: string;
  host: string;
  chunks: number;
  download: string;
  generated: string;
  type?: string; // Optional field
};

export type DownloadsData = DownloadFileData[];

export type MediaData = {
  filename: string;
  hoster: string;
  link: string;
  type: "movie" | "show" | "audio";
  season: string | null;
  episode: string | null;
  year: string | null;
  duration: number;
  bitrate: number;
  size: number;
  details: {
    video: {
      [key: string]: VideoDetails;
    };
    audio: {
      [key: string]: AudioDetails;
    };
    subtitles: {
      [key: string]: SubtitleDetails;
    };
  };
  poster_path: string;
  audio_image: string;
  backdrop_path: string;
};

export type VideoDetails = {
  stream: string;
  lang: string;
  lang_iso: string;
  codec: string;
  colorspace: string;
  width: number;
  height: number;
};

export type AudioDetails = {
  stream: string;
  lang: string;
  lang_iso: string;
  codec: string;
  sampling: number;
  channels: number;
};

export type SubtitleDetails = {
  stream: string;
  lang: string;
  lang_iso: string;
  type: string;
};
