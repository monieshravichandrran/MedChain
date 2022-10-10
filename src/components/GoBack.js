import React from "react";
import { history } from "../history";

const GoBack = () => {
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="float-left mt-2 mr-2">
      <button
        className="ml-4 mt-2 bg-transparent text-gray-200 p-2 rounded border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBack;