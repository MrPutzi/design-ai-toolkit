import React from 'react';


type ModelProps = {
    title: string;
    description: string;
    imageUrl: string;
};

const ModelCard: React.FC<ModelProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
};

export default ModelCard;