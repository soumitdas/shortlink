import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../hooks/useAuth";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

const LinkAnalytics = ({ shortCode }) => {
  const [linkData, setLinkData] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      auth
        .token()
        .then((authToken) => api.getLinkAnalytics(shortCode, authToken))
        .then((resp) => {
          setLinkData(resp.data);
        })
        .catch((e) => {
          setLinkData(false);
          //console.log(e);
        });
    }
  }, [auth]);

  const getChartData = (obj) => {
    // getting only top 5 values
    const labels = Object.keys(obj).slice(0, 5);
    const data = Object.values(obj).slice(0, 5);
    return { labels, data };
  };

  return linkData === false ? (
    <section className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p>It seems that this shortlink was not created from your account.</p>
        </div>
      </div>
    </section>
  ) : linkData ? (
    <>
      <hr />
      <p className="is-size-4">{linkData.clickCount}</p>
      <p>Total Clicks</p>
      <BarChart data={getChartData(linkData.analytics.timestamps)} />
      <hr />
      <div className="columns is-multiline">
        <div className="column is-half">
          <h3 className="is-size-4 mb-4">Referrers</h3>
          <DoughnutChart data={getChartData(linkData.analytics.referrers)} />
        </div>
        <div className="column is-half">
          <h3 className="is-size-4 mb-4">Locations</h3>
          <DoughnutChart data={getChartData(linkData.analytics.locations)} />
        </div>
        <div className="column is-half">
          <h3 className="is-size-4 mb-4">Devices</h3>
          <DoughnutChart data={getChartData(linkData.analytics.devices)} />
        </div>
        <div className="column is-half">
          <h3 className="is-size-4 mb-4">Browsers</h3>
          <DoughnutChart data={getChartData(linkData.analytics.browsers)} />
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default LinkAnalytics;
