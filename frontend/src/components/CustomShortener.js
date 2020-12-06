import React, { useState } from "react";
import CopyLink from "./CopyLink";
import api from "../api";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

const CustomShortener = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayCopyLink, setDisplayCopyLink] = useState(false);
  const [formData, setFormData] = useState({
    longUrl: "",
    customShortCode: "",
  });
  const [shortUrl, setShortUrl] = useState("");
  const auth = useAuth();

  const clearFormData = () =>
    setFormData({
      longUrl: "",
      customShortCode: "",
    });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Trim the url for any extra whitespace
    auth
      .token()
      .then((authToken) =>
        api.shortenWithCustom(
          {
            longUrl: formData.longUrl.trim(),
            customShortCode: formData.customShortCode.trim(),
          },
          authToken
        )
      )
      .then((resp) => {
        setIsLoading(false);
        clearFormData();
        setShortUrl(resp.data.shortUrl);
        onSuccess(resp.data);
        setDisplayCopyLink(true);
      })
      .catch((e) => {
        setIsLoading(false);
        setFormData({ ...formData, customShortCode: "" });
        alert(e.message);
      });
  };

  return displayCopyLink ? (
    <div className="block">
      <CopyLink
        buttonType="primary"
        value={shortUrl}
        onChange={() => setDisplayCopyLink(false)}
      />
    </div>
  ) : (
    <form className="columns" onSubmit={handleSubmit}>
      <div className="column">
        <div className="field">
          <p className="control">
            <input
              className="input"
              type="text"
              name="longUrl"
              placeholder="Enter the long URL to short"
              value={formData.longUrl}
              onChange={handleChange}
              required={true}
            />
          </p>
        </div>
      </div>
      <div className="column is-4">
        <div className="field  has-addons">
          <p className="control">
            <button className="button is-static">
              {process.env.REACT_APP_API_BASE_URL}/
            </button>
          </p>
          <p className="control">
            <input
              className="input"
              type="text"
              name="customShortCode"
              placeholder="Custom short code (if any)"
              value={formData.customShortCode}
              onChange={handleChange}
              minLength="5"
              maxLength="20"
            />
          </p>
        </div>
      </div>
      <div className="column is-2">
        <div className="buttons">
          <Button
            type="primary"
            fullWidth={true}
            loading={isLoading}
            disabled={isLoading}
          >
            Shorten
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CustomShortener;
