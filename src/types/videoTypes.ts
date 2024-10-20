export interface Video {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        

        medium: {
          url: string;
        };
        default: {

          url: string;
        };
      };
    };
  }