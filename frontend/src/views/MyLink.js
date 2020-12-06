import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { useAuth } from "../hooks/useAuth";
import api from "../api";
import Loading from "../components/Loading";
import LinkAnalytics from "../components/LinkAnalytics";
import { dateToMonDDYYYY } from "../utils/date";

const MyLink = () => {
  const [linkData, setLinkData] = useState(null);
  const router = useRouter();
  const auth = useAuth();

  const { shortCode } = router.query;

  useEffect(() => {
    api
      .getLinkByShortCode(shortCode)
      .then((resp) => {
        setLinkData(resp.data);
      })
      .catch((e) => {
        router.replace("/");
      });
  }, []);

  return linkData ? (
    <section className="section">
      <div className="container">
        <div className="block">
          <h6>Created on {dateToMonDDYYYY(linkData.createdAt)}</h6>
          <h3 className="is-size-4" style={{ wordBreak: "break-word" }}>
            {linkData.longUrl}
          </h3>
          <h5 className="is-size-6 is-text-truncated">
            <a
              className="has-text-grey"
              href={linkData.longUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkData.longUrl}
            </a>
          </h5>
          <h5 className="is-size-6 is-text-truncated">
            <a
              href={linkData.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkData.shortUrl}
            </a>
          </h5>
        </div>
        {auth.user ? (
          <LinkAnalytics shortCode={shortCode} />
        ) : (
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                <p>
                  If this is a shortlink you created from your account, please
                  log in to view the click data.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default MyLink;
