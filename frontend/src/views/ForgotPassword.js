import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        setEmail("");
        alert("Please check your inbox for the reset link");
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
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
                    <h2 className="is-size-4">
                      Forgot your password? Reset it now
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        Send Password Reset Email
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

export default ForgotPassword;
