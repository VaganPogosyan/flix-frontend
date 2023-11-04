"use client";

interface Props {
  youtubeKey: string;
  bigMovie: boolean;
  clipWidth: number;
}

export default function MovieClip({ youtubeKey, bigMovie, clipWidth }: Props) {
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1&fs=0`;

  return (
    <div className="">
      <iframe
        width={bigMovie ? clipWidth : "350"}
        height={bigMovie ? "700" : "220"}
        src={youtubeUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
