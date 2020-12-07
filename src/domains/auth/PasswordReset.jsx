import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestMagicLink } from '../../api';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [linkToken, setLinkToken] = useState(null);

  const submitMagicLinkRequest = async () => {
    try {
      const token = await requestMagicLink(email);
      setLinkToken(token);
    } catch {
      // Once again, skipping a proper error display for a quick one
      alert('Something went wrong');
    }
  };

  return !linkToken ? (
    <div>
      <h3>Password Reset</h3>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="button" onClick={submitMagicLinkRequest} value="Submit" />
    </div>
  ) : (
    <div>
      {/* Just kidding with trademark, don't send your lawyers after me */}
      <h3>Here is your magic link&trade;</h3>
      <h4>Use it to reset your password</h4>
      <Link to={`/activation/${linkToken}`} />
      <div>It's also been sent to your email, so you can do it later</div>
    </div>
  );
};

export default PasswordReset;
