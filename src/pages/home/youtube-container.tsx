import React from "react";

interface YoutubeEmbedProps {
  id: string;
  title: string;
  description: string;
}

const YoutubeEmbed = ({ id, title, description }: YoutubeEmbedProps) => (
  <>
    <div className="video-responsive" style={{ margin: 20 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
    <div style={{ textAlign: "center" }}>{description}</div>
  </>
);

export default YoutubeEmbed;
