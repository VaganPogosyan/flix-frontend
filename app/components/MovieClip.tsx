interface Props {
  youtubeKey: string;
}

export default function MovieClip({ youtubeKey }: Props) {
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1&fs=0`;

  return (
    <div>
      <iframe
        width="350"
        height="220"
        src={youtubeUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
