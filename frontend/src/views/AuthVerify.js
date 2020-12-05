import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";

const AuthVerify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const { from } = router.location.state || {
    from: { pathname: "/links" },
  };
  useEffect(() => {
    if (auth.user) {
      router.replace(from);
    }
  }, [auth, router, from]);

  const { mode, oobCode } = router.query;

  if (!mode || !oobCode || (mode && mode !== "resetPassword")) {
    router.replace("/signin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        setIsLoading(false);
        setPassword("");
        alert("Your password has been reset");
        router.replace("/signin");
      })
      .catch((e) => {
        setIsLoading(false);
        alert(
          "The link is invalid. This can happen if the link is malformed, expired, or has already been used.\nPlease initiate the process again"
        );
        router.replace("/forgot-password");
      });
  };

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="has-text-centered p-4">
                    <h2 className="is-size-4">Reset your password</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="field">
                      <label className="label">New Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="buttons mt-5">
                      <Button
                        type="primary"
                        fullWidth={true}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="card-footer-item has-text-centered is-size-8 is-inline-block">
                    <span>
                      <Link to="/signin">Back</Link> to Sign in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthVerify;
