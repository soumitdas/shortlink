import React from "react";
import HomeShortener from "../components/HomeShortener";

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
    </>
  );
};

export default Home;
