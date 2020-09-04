import React, { useState } from 'react';
import { Button, PageLoader, Input } from 'components/shared';
import { useToast } from 'store';
import { AuthService } from 'services';

export const ProfileChangePassword: React.FC = () => {
  const { setToast } = useToast();

  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const [password, setPassword] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.newPassword || !password.oldPassword) {
      setToast('error', 'Please the provide password field.');
      return;
    }

    if (password.newPassword !== password.confirmNewPassword) {
      setToast('error', 'New Password and Confirm Password does not match');
      return;
    }

    handleChangePassword();
  };

  const handleChangePassword = async () => {
    try {
      setSubmitting(true);
      await AuthService.changePassword(password);
      setPassword(initialState);
      setToast('success', 'Successfully password changed');
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <>
      {submitting && <PageLoader />}
      <div className="container">
        <h2> Change Password </h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="user-details">
            <Input
              name="oldPassword"
              onChange={handleChange}
              id="oldPassword"
              label="Old Password"
              value={password.oldPassword}
              type="password"
            />
            <Input
              name="newPassword"
              onChange={handleChange}
              id="newPassword"
              label="New Password"
              value={password.newPassword}
              type="password"
            />
            <Input
              name="confirmNewPassword"
              onChange={handleChange}
              id="confirmNewPassword"
              label="Confirm New Password"
              value={password.confirmNewPassword}
              type="password"
            />
            <div className="bottom">
              <Button type="submit" title="Save Password" disabled={submitting} />
            </div>
          </div>
        </form>
      </div>
      <style jsx>{`
        .container {
          padding: 1rem 0;
        }

        .bottom {
          margin-top: 3rem;
        }
      `}</style>
    </>
  );
};
