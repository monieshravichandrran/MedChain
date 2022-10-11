import React from "react";

const FullPageLoader = ({ show }) => {
    return (
        <div
            className={`${
                show ? "block" : "hidden"
            } loader-par flex justify-center items-center w-screen h-screen absolute bg-gray-300/75 text-5xl`}
        >
            <div className="loader">Loading...</div>
        </div>
    );
};

export default FullPageLoader;