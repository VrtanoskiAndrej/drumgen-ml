import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Invalid Web Address</h1>
        <p className="lead">
          The page that you have searched up does not exist, please try another
          link.
        </p>
        <hr className="my-4" />
        <p>
          You may search up another link or use the button bellow to return to
          the main page.
        </p>
        <Link to="/" className="btn btn-danger btn-lg" role="button">
          Return Home
        </Link>
      </div>
    </div>
  );
}
export default Error;
