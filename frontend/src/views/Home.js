import React from "react";
import HomeShortener from "../components/HomeShortener";
import { Link } from "react-router-dom";
//import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as CustomIcon } from "../assets/images/icon-customize.svg";
import { ReactComponent as AnalyticsIcon } from "../assets/images/icon-analytics.svg";
import { ReactComponent as ClickIcon } from "../assets/images/icon-click.svg";

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-body mt-6">
          <div className="container has-text-centered">
            <h1 className="title is-spaced is-1">
              Short those ugly long URL's into smaller one
            </h1>
            <p className="subtitle is-3">A simple URL shortner for everyone</p>
          </div>
        </div>
      </section>
      <section className="hero">
        <div className="hero-body">
          <HomeShortener />
        </div>
      </section>
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered my-6">
            <h2 className="title is-spaced">Need more ?</h2>
            <p className="subtitle">Create an account to get access to</p>
            <div className="columns py-4">
              <div className="column">
                <figure className="image is-64x64 is-mx-auto">
                  <CustomIcon />
                </figure>
                <h3 className="title is-4 my-4 is-spaced">Custom Shortlink</h3>
                <p className="subtitle is-6">
                  Customize the links with your brand name to improve trust and
                  visibility.
                  <br />
                  <small>
                    {process.env.REACT_APP_API_BASE_URL}/custom-brand-name
                  </small>
                </p>
              </div>
              <div className="column">
                <figure className="image is-64x64 is-mx-auto">
                  <AnalyticsIcon />
                </figure>
                <h3 className="title is-4 my-4 is-spaced">Analytics</h3>
                <p className="subtitle is-6">
                  Monitor the click data and insights of your shortlinks through
                  our web dashboard. It helps you to take data driven decisions.
                </p>
              </div>
              <div className="column">
                <figure className="image is-64x64 is-mx-auto">
                  <ClickIcon />
                </figure>
                <h3 className="title is-4 my-4 is-spaced">
                  All links at one place
                </h3>
                <p className="subtitle is-6">
                  Easy access to all of the shortlinks created using your
                  account, all in one place.
                </p>
              </div>
            </div>
            <Link
              to="/signup"
              className="button is-primary is-medium is-outlined"
            >
              Sign up Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
