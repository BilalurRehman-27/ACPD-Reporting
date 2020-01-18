import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <Fragment>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <title>404 HTML Template by Colorlib</title>

        <link
          href='https://fonts.googleapis.com/css?family=Montserrat:500'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css?family=Titillium+Web:700,900'
          rel='stylesheet'
        />

        <link type='text/css' rel='stylesheet' href='css/style.css' />

        <script src='https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js'></script>
        <script src='https://oss.maxcdn.com/respond/1.4.2/respond.min.js'></script>
      </head>

      <body>
        <div id='notfound'>
          <div className='notfound'>
            <div className='notfound-404'>
              <h1>404</h1>
            </div>
            <h2>Oops! This Page Could Not Be Found</h2>
            <p>
              Sorry but the page you are looking for does not exist, have been
              removed. name changed or is temporarily unavailable
            </p>
            <NavLink exact to='/dashboard'>
              Go To Homepage
            </NavLink>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

export default PageNotFound;
