import React from "react";
import "./Loading.scss";

const Loading = () => {
    const renderLoadingCard = () => {
        return (
            <div className="loading__card">
                {Array(6).fill().map((_, index) => (
                    <div key={index} className="loading__animation"></div>
                ))}
            </div>
        );
    };

    return (
        <div className="loading">
            <div className="loading__wrapper">
                {Array(6).fill().map((_, index) => (
                    <React.Fragment key={index}>
                        {renderLoadingCard()}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Loading;
