import React, { useState, useEffect } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Loading from "../components/Loading";
import CustomShortener from "../components/CustomShortener";
import api from "../api";
import { Link } from "react-router-dom";
import { dateToMonDDYYYYHHMM } from "../utils/date";
import { range } from "../utils/helper";

const MyLinks = () => {
  const auth = useRequireAuth();
  const [shortlinks, setShortlinks] = useState(null);
  const [paginate, setPaginate] = useState({
    limit: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchLinks = () => {
    auth
      .token()
      .then((authToken) =>
        api.getLinks(authToken, paginate.currentPage, paginate.limit)
      )
      .then((resp) => {
        setShortlinks(resp.data);
        setPaginate({
          ...paginate,
          totalPages: resp.totalPages,
          currentPage: resp.currentPage,
        });
      })
      .catch((e) => {
        setShortlinks([]);
      });
  };

  useEffect(() => {
    if (auth.user) {
      fetchLinks();
    }
  }, [auth, paginate.limit, paginate.currentPage]);

  const handleChange = (e) =>
    setPaginate({ ...paginate, [e.target.name]: e.target.value });

  const handlePaginatePageClick = (e) => {
    setPaginate({ ...paginate, currentPage: e.target.innerText });
  };
  const handlePaginateNext = () => {
    const nextPage = paginate.currentPage + 1;
    if (nextPage > paginate.totalPages) {
      return;
    }
    setPaginate({ ...paginate, currentPage: nextPage });
  };
  const handlePaginateBefore = () => {
    const beforePage = paginate.currentPage - 1;
    if (beforePage < 1) {
      return;
    }
    setPaginate({ ...paginate, currentPage: beforePage });
  };

  if (!auth.user) {
    return <Loading />;
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-3">Create a Shortlink</h2>
        <hr />
        <CustomShortener onSuccess={fetchLinks} />
        <h2 className="title is-3">My Links</h2>
        <hr />
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              {/* <div className="buttons">
                <button className="button is-primary">
                  Create a shortlink
                </button>
              </div> */}
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="control">
                <div className="select is-small">
                  <select
                    name="limit"
                    value={paginate.limit}
                    onChange={handleChange}
                  >
                    <option value={10}>10 per Page</option>
                    <option value={20}>20 per Page</option>
                    <option value={30}>30 per Page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container">
          {shortlinks ? (
            shortlinks.length > 0 ? (
              <table className="table is-bordered is-fullwidth">
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Shortlink</th>
                    <th>Created On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {shortlinks.map((shortlink, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{shortlink.longUrl}</td>
                      <td>
                        <a
                          href={shortlink.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {shortlink.shortUrl}
                        </a>
                      </td>
                      <td>{dateToMonDDYYYYHHMM(shortlink.createdAt)}</td>
                      <td>
                        <div className="buttons">
                          <Link
                            to={`/links/${shortlink.shortCode}`}
                            className="button is-small is-info"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            ) : (
              <p>No data found</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {paginate.totalPages > 1 && (
          <nav className="pagination" role="navigation" aria-label="pagination">
            <a
              className="pagination-previous"
              disabled={paginate.currentPage <= 1}
              onClick={handlePaginateBefore}
            >
              Previous
            </a>
            <a
              className="pagination-next"
              disabled={paginate.currentPage >= paginate.totalPages}
              onClick={handlePaginateNext}
            >
              Next page
            </a>
            <ul className="pagination-list">
              {range(1, paginate.totalPages).map((pageNo, i) => (
                <li key={i}>
                  <a
                    className={
                      paginate.currentPage === pageNo
                        ? "pagination-link is-current"
                        : "pagination-link"
                    }
                    aria-label={`Goto page ${pageNo}`}
                    aria-current={paginate.currentPage === pageNo && "page"}
                    onClick={handlePaginatePageClick}
                  >
                    {pageNo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
};

export default MyLinks;
