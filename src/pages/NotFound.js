import React from "react";
import '../NotFound.css';
const NotFound = () => {
  return (
    <>
      <div className="message">
        <h3 className="text-3xl">Why am I seeing this?</h3>
        <h2>Something Went Wrong</h2>
        <h1>Page Not Found or You have been timed out</h1>
        <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
      </div>
    </>
  )
}

export default NotFound;