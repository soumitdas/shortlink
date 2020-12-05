// This Page is not deployed, only for future upgrade

import React from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Loading from "../components/Loading";

const Dashboard = () => {
  const auth = useRequireAuth();

  if (!auth.user) {
    return <Loading />;
  }
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Dashboard</h1>
        <hr />
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="title">3,456</p>
              <p className="heading">Tweets</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Following</p>
              <p className="title">123</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Followers</p>
              <p className="title">456K</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Likes</p>
              <p className="title">789</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="table-container">
          <table className="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>URL</th>
                <th>Shortlink</th>
                <th>Clicks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>https://bulma.io/documentation/layout/level/</td>
                <td>http://localhost:3000/dashboard</td>
                <td>10</td>
                <td>
                  <div className="buttons">
                    <a className="button is-small is-info">Track</a>
                    {/* <Link className="button is-small is-danger">
                          Cancel
                        </Link> */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
