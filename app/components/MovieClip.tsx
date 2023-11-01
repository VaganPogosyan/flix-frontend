import YouTube, { YouTubeProps } from "react-youtube";

interface Props {
  youtubeKey: string;
}

export default function MovieClip({ youtubeKey }: Props) {
  // const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  // access to player in all event handlers via event.target
  // event.target.pauseVideo();
  // };

  const opts: YouTubeProps["opts"] = {
    width: "320",
    height: "200",
  };

  const youtubeUrl = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1&fs=0`;

  return (
    <div>
      <iframe
        width="320"
        // height="200"
        src={youtubeUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
