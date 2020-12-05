import React, { useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Loading from "../components/Loading";
import Button from "../components/Button";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useAuth } from "../hooks/useAuth";

const NameUpdateForm = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // If name not changed
    if (name === auth.user.name) {
      setIsEditing(false);
      return;
    }
    setIsLoading(true);
    auth
      .updateName(name)
      .then(() => {
        setIsLoading(false);
        setIsEditing(false);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="buttons">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="button is-primary"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <Button type="primary" loading={isLoading} disabled={isLoading}>
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

const Profile = () => {
  const auth = useRequireAuth();

  if (!auth.user) {
    return <Loading />;
  }
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">My Profile</h1>
        <hr />
        <div className="block">
          <NameUpdateForm />
        </div>
        <div className="block">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input is-static"
                type="email"
                value={auth.user?.email}
                disabled
              />
            </div>
          </div>
        </div>
        <h2 className="title is-4">Change your password</h2>
        <hr />
        <ChangePasswordForm />
      </div>
    </section>
  );
};

export default Profile;
