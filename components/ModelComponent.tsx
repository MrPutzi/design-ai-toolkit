import React, {useEffect} from 'react';
import styled from 'styled-components';

// Štýlované komponenty
const Card = styled.div`
    margin-right: 25px;
    background-color: #fff;
    width: 33.3%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 4px 13px 10px -7px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    stroke-opacity: 0.5;

    &:hover {
        box-shadow: 20px 30px 18px -8px rgba(0, 0, 0, 0.1);
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

const CardTitle = styled.div`
    padding: 16px 24px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    font-weight: bold;
    
`;


const CardInfo = styled.div`
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
    transform: scale(0.8, 0.8);
    margin-top: -20px;
    
`;

type ModelProps = {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    category: string;

};


const ModelCard: React.FC<ModelProps> = ({ title, description, imageUrl, link }) => {
    return (

        <Card onClick={()=>window.location.href = link} className="bg-blue-500 shadow-lg shadow-blue-500/50">
            <CardImg imageUrl={imageUrl} />
            <CardTitle>
                <h5 className="card-title bold-title">{title}</h5>
            </CardTitle>
            <CardInfo>
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
                    category={model.category}

                />
            ))}
        </div>
    );
};

const ModelComponent: React.FC = () => {
    const [models, setModels] = React.useState<ModelProps[]>([]);

    useEffect(() => {
        // Load models (simulation)
        const mockModels: ModelProps[] = [
            { title: 'tencentarc/gfpgan', description: 'úprava fotiek a zväčšanie rozlíšenia', imageUrl: 'https://i.imgur.com/lEVlLiw.png', link:"/restore", category:"Restore"},
            { title: 'stable diffusion', description: 'generácia fotiek z textu', imageUrl: "https://i.imgur.com/GEQ0PGSl.png",link:"/generate", category:"Generate" },
            { title: 'nightmareai/real-esrgan', description: 'zväčšenie rozlíšenia', imageUrl: "https://i.imgur.com/1H73uDC.png",link:"/realesrgan", category:"Restore" },
            { title: 'lucataco/realistic-vision-v5', description: 'generácia realistických fotiek z textu', imageUrl: "https://replicate.delivery/pbxt/eVMzXJerAzpqnErNJ9P4ncWmd2d3OkGA31DKhG3ElQhLMIbRA/output.png",link:"/realvision", category:"Generate" },
            // { title: "lama/chat-gpt", description: "page", imageUrl: "https://i.imgur.com/1H73uDC.png", link: "/page", category: "Generate" },
        ];
        setModels(mockModels);
    }, []);

    // Filter models based on category
    const restoreModels = models.filter(model => model.category === 'Restore');
    const generateModels = models.filter(model => model.category === 'Generate');

    return (
        <div>
            <h2 className="text-3xl antialiased font-bold pb-12">Restore Models</h2>
            <ModelList models={restoreModels} />
            <h2 className="text-3xl antialiased font-bold pb-12">Generate Models</h2>
            <ModelList models={generateModels} />
        </div>
    );
};

export default ModelComponent;