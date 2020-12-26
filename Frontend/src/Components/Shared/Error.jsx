import React from "react";

function Error({ message }) {

    return <div className="full flex flex-column center text-center">
        <div className="error">
            <h1>Something Wrong</h1>
            <p>{message}</p>
        </div>
    </div>;
}

export default Error