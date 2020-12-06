import React, { useState } from "react";
import api from "../api";
import Button from "./Button";
import useLocalStorage from "../hooks/useLocalStorage";
import CopyLink from "./CopyLink";
import HomeCopyLink from "./HomeCopyLink";

const HomeShortener = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [displayCopyLink, setDisplayCopyLink] = useState(false);
  const [shortlinks, setShortlinks] = useLocalStorage("__shortlinks", []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Trim the url for any extra whitespace
    api
      .shorten({ longUrl: longUrl.trim() })
      .then((resp) => {
        setIsLoading(false);
        setLongUrl("");
        setShortUrl(resp.data.shortUrl);
        setDisplayCopyLink(true);
        setShortlinks((links) => [resp.data, ...links.slice(0, 2)]);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  return (
    <div className="container">
      {displayCopyLink ? (
        <CopyLink
          size="medium"
          value={shortUrl}
          onChange={() => setDisplayCopyLink(false)}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="field is-grouped is-grouped-multiline">
            <p className="control is-expanded">
              <input
                className="input is-medium"
                type="text"
                placeholder="Enter the URL to short"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required={true}
              />
            </p>
            <p className="control">
              <Button
                type="primary"
                size="medium"
                loading={isLoading}
                disabled={isLoading}
              >
                Shorten
              </Button>
            </p>
          </div>
        </form>
      )}
      {shortlinks.length > 0 && (
        <div className="box mt-5">
          {shortlinks.map((shortlink, index) => (
            <HomeCopyLink key={index} data={shortlink} />
          ))}
        </div>
      )}
      {shortlinks.length > 0 && (
        <div className="has-text-right">
          <button
            onClick={() => setShortlinks([])}
            className="button is-danger is-outlined is-small"
          >
            Clear Recent
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeShortener;
