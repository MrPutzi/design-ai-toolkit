import React, {useCallback, useState} from 'react';
import LoadingDots from "./LoadingDots";
import  generatePhoto  from "../pages/api/generate";
import dotenv from "dotenv";

interface FormData {
    width: number;
    height: number;
    prompt: string;
    scheduler: string;
    numInterferenceSteps: number;
    refine: string;
    lora_scale: number;
    guidance_scale: number;
    apply_watermark: boolean;
    high_noise_frac: number;
    negative_prompt: string;
    prompt_strength: number;
    num_inference_steps: number;
    num_outputs: number;
}

const InputForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        numInterferenceSteps: 0,
        width: 768,
        height: 768,
        prompt:'',
        refine: 'expert_ensemble_refiner',
        scheduler: 'K_EULER',
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: '',
        prompt_strength: 0.8,
        num_inference_steps: 25
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPhoto, setGeneratedPhoto] = useState<string | undefined>(undefined);
    const [inputPrompt, setInputPrompt] = useState<string>('');
    const [width, setWidth] = useState<number>(512);
    const [height, setHeight] = useState<number>(512);
    const [numOutputs, setNumOutputs] = useState<number>(1);
    const [scheduler, setScheduler] = useState<string>('K_EULER');
    const [numInterferenceSteps, setNumInterferenceSteps] = useState<number>(25);
    const onButtonSubmit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    }, [
        formData,
    ]);

    const onResponse = useCallback((data: any) => {
        setLoading(false);
        if (data.ok) {
            setGeneratedPhoto(data.photoUrl);
        } else {
            setError(data.message);
        }
}, [
        setLoading,
        setGeneratedPhoto,
        setError,
    ]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === 'number' ?
                parseInt(event.target.value, 10) : event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };
    const handleGeneratePhoto = async () => {
        setLoading(true);
        setError(null);
        setGeneratedPhoto(undefined);
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
            setGeneratedPhoto(data.photoUrl);
        } else {
            setError(data.message);
        }
    };

    // async function generatePhoto() {
    //     await new Promise((resolve) => setTimeout(resolve, 10));
    //     if (!inputPrompt) {
    //         setError('Please enter a description for your image.');
    //         return;
    //     }
    //     setLoading(true);
    //     setError(null);
    //     setGeneratedPhoto(undefined);
    //     const response = await fetch('/api/generate', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ prompt: inputPrompt }),
    //     });
    //     let data = await response.json();
    //     setLoading(false);
    //     if (response.ok) {
    //         setGeneratedPhoto(data.photoUrl);
    //     } else {
    //         setError(data.message);
    //     }
    // }

    return (
        // <div className="flex flex-col items-center justify-center">
        //     <h1 className="text-3xl font-bold mb-4">Generate an Image</h1>
        //     <p className="text-gray-600 mb-4">Enter a description for your image and click the button to generate
        //         it.</p>
        //     <div className="w-full max-w-md mb-4">
        //         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        //                        role="alert">
        //             <strong className="font-bold">Error:</strong>
        //             <span className="block sm:inline">{error}</span>
        //         </div>}
        //         {generatedPhoto && <img src={generatedPhoto} alt="Generated" className="w-full mb-4"/>}
        //     </div>


    <div className="flex  ">
        <div className="w-1/2 p-4 border-gray-300 border-2 rounded-xl ">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="inputPrompt">Image Prompt:</label>
                    <input
                        type="text"
                        id="inputPrompt"
                        name="prompt" // Zmenené z "inputPrompt" na "prompt"
                        value={formData.prompt}
                        onChange={handleChange}
                        className="w-full border border-gray-500 rounded-lg px-4 py-2 mb-2"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="width">Width:</label>
                    <input
                        type="range"
                        id="width"
                        name="width"
                        min="128"
                        max="1024"
                        value={formData.width}
                        onChange={handleChange}
                        className="w-full mb-2"
                    />
                    <span className="inline-block ml-2">{formData.width}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input
                        type="range"
                        id="height"
                        name="height"
                        min="128"
                        max="1024"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full mb-2"
                    />
                    <span className="inline-block ml-2">{formData.height}</span>
                </div>

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="numOutputs">Number of Outputs:</label>*/}
                {/*    <input*/}
                {/*        type="range"*/}
                {/*        id="numOutputs"*/}
                {/*        name="num_outputs" // Zmenené z "numOutputs" na "num_outputs"*/}
                {/*        min="1"*/}
                {/*        max="4"*/}
                {/*        value={formData.num_outputs}*/}
                {/*        onChange={handleChange}*/}
                {/*        className="w-full mb-2"*/}
                {/*    />*/}
                {/*    <span className="inline-block ml-2">{formData.num_outputs}</span>*/}
                {/*</div>*/}

                <div className="form-group">
                    <label htmlFor="scheduler">Scheduler:</label>
                    <select
                        id="scheduler"
                        name="scheduler"
                        value={formData.scheduler}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                    >
                        <option value="K_EULER">K_EULER</option>
                        <option value="DDIM">DDIM</option>
                        <option value="DPMSolverMultiStep">DPMSolverMultiStep</option>
                        <option value="HeunDiscrete">HeunDiscrete</option>
                        <option value="KarrasDPM">KarrasDPM</option>
                        <option value="K_EULER_ANCESTRAL">K_EULER_ANCESTRAL</option>
                        <option value="K_EULER">K_EULER</option>
                        <option value="PNDM">PNDM</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="numInterferenceSteps">Number of Interference Steps:</label>
                    <input
                        type="range"
                        id="numInterferenceSteps"
                        name="numInterferenceSteps"
                        min="1"
                        max="50"
                        value={formData.numInterferenceSteps} defaultValue="20"//add a check for this value to be greater than 0
                        onChange={handleChange}
                        className="w-full mb-2"


                    />
                    <span className="inline-block ml-2">{formData.numInterferenceSteps}</span>
                </div>

                <button
                    onClick={handleGeneratePhoto}
                    disabled={loading}
                    className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 w-40"
                    onSubmit={onButtonSubmit}>
                    {loading ? (
                        <span className="pt-4">
            <LoadingDots color="white" style="large"/>
        </span>
                    ) : 'Generate Image'}
                </button>
            </form>

        </div>
        <div className="w-1/2  border-gray-300 border-2 rounded-xl ">
        </div>
        {generatedPhoto && <img src={generatedPhoto} alt="Generated" className="w-full"/>}
    </div>
)
    ;
};

export default InputForm;
