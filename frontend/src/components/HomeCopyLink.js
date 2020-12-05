import React, { useState, useRef } from "react";

const HomeCopyLink = ({ data }) => {
  const [copyButtonData, setCopyButtonData] = useState({
    text: "Copy",
    className: "is-info",
  });
  const shortUrlRef = useRef(null);

  const handleCopy = (e) => {
    setCopyButtonData({ text: "Copied", className: "is-success" });
    // Ref: https://stackoverflow.com/a/48020189
    const range = document.createRange();
    range.selectNode(shortUrlRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    setTimeout(() => {
      setCopyButtonData({ text: "Copy", className: "is-info" });
    }, 1000);
  };

  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <span>{data.longUrl}</span>
        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          <a
            href={data.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            ref={shortUrlRef}
          >
            {data.shortUrl}
          </a>
        </div>
        <div className="level-item">
          <div className="buttons">
            <button
              onClick={handleCopy}
              className={`button ${copyButtonData.className} is-light`}
            >
              {copyButtonData.text}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeCopyLink;
