import React from 'react';
import ModelCard from '../components/ModelCard';


type Model = {
  title: string;
  description: string;
  imageUrl: string;
};

type ModelListProps = {
  models: Model[];
};

const ModelList: React.FC<ModelListProps> = ({ models }) => {
  return (
    <div className="model-list">
      {models.map((model) => (
        <ModelCard
          key={model.title}
          title={model.title}
          description={model.description}
          imageUrl={model.imageUrl}
        />
      ))}
    </div>
  );
};

export default ModelList;