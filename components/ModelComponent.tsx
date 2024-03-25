import React, {useEffect} from 'react';
import styled from 'styled-components';

// Štýlované komponenty
const Card = styled.div`
    margin-right: 25px;
    background-color: #868686;
    width: 33.3%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
        transform: scale(1.10, 1.10);
    }
`;

const CardImg = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const CardInfo = styled.div`
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
`;

type ModelProps = {
    title: string;
    description: string;
    imageUrl: string;
    link: string;

};

const ModelCard: React.FC<ModelProps> = ({ title, description, imageUrl,link }) => {
    return (
        <Card onClick={()=>window.location.href = link}>
            <link href="/restore" />
            <CardImg/>
            <CardInfo>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </CardInfo>
        </Card>
    );
};

type ModelListProps = {
    models: ModelProps[];
};

const ModelList: React.FC<ModelListProps> = ({ models }) => {
    return (
        <div className="flex flex-row justify-content-between">
            {models.map((model) => (
                <ModelCard
                    key={model.title}
                    title={model.title}
                    description={model.description}
                    imageUrl={model.imageUrl}
                    link={model.link}

                />
            ))}
        </div>
    );
};

const ModelComponent: React.FC = () => {
    const [models, setModels] = React.useState<ModelProps[]>([]);

    useEffect(() => {
        // Načítanie modelov (simulácia)
        const mockModels: ModelProps[] = [
            { title: 'Face restoration', description: 'Image-to-image generation/restoration', imageUrl: 'https://upcdn.io/W142hJk/raw/demo/4kjeQfjF3o.png', link:"/restore" },
            { title: 'Image generation', description: 'Text-to-image generation', imageUrl: '/path/to/image2.jpg',link:"/generate" },
        ];
        setModels(mockModels);
    }, []);

    return (
        <div>
            <ModelList models={models} />
        </div>
    );
};

export default ModelComponent;