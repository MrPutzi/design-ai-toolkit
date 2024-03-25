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
    transition: all 0.3s ease;
    stroke-opacity: 0.5;

    &:hover {
        box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
        transform: scale(1.10, 1.10);
    }
`;

const CardImg = styled.div<{ imageUrl: string }>`
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 5px 13px 10px -7px black;
    
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


const ModelCard: React.FC<ModelProps> = ({ title, description, imageUrl, link }) => {
    return (
        <Card onClick={()=>window.location.href = link}>
            <CardImg imageUrl={imageUrl} />
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
            { title: 'Face restoration', description: 'Image-to-image generation/restoration', imageUrl: 'https://i.imgur.com/lEVlLiw.png', link:"/restore" },
            { title: 'Image generation', description: 'Text-to-image generation', imageUrl: "https://i.imgur.com/GEQ0PGSl.png",link:"/generate" },
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