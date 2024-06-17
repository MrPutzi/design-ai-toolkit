import React, { useState } from "react";
import axios from 'axios';
import LoadingDots from "./LoadingDots";
import generatedPhoto from "./GeneratedPhoto";
import ResizablePanel from "./ResizablePanel";
import {AnimatePresence, motion} from "framer-motion";

interface FormData {
    prompt: string;
    aspectRatio: string;
    outputQuality: number;
    negativePrompt: string;
}

const InputFormStableDiffusion = () => {
    const [formData, setFormData] = useState<FormData>({
        prompt: '',
        aspectRatio: "1:1",
        outputQuality: 100,
        negativePrompt: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPhoto, setGeneratedPhoto] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === 'number' ?
                parseInt(event.target.value, 10) : event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setGeneratedPhoto(undefined);
        const response = await axios.post('/api/stablediffusion3', formData);
        setLoading(false);
        if (response.data.success) {
            setGeneratedPhoto(response.data.photoUrl);
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="flex  ">
            <div className="w-1/2 p-4 border-gray-300 border-2 rounded-xl ">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Text Prompt
                        </label>
                        <input
                            className="w-full border border-gray-500 rounded-lg px-4 py-2 mb-2"
                            type="text"
                            name="prompt"
                            value={formData.prompt}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">

                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Aspect Ratio
                        </label>
                        <select
                            className="w-full mb-2"
                            name="aspectRatio"
                            value={formData.aspectRatio}
                            onChange={handleChange}
                        >
                            <option value="1:1">1:1</option>
                            <option value="4:3">4:3</option>
                            <option value="16:9">16:9</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Output Quality
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="number"
                            name="outputQuality"
                            value={formData.outputQuality}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Negative Prompt
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            name="negativePrompt"
                            value={formData.negativePrompt}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <button
                                type="submit"
                                className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 w-40"
                            >
                                {loading ? <LoadingDots color="white"/> : 'Generate'}
                            </button>
                        </div>
                    </div>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                   role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                    }
                </form>
            </div>
            <div className="w-1/2  border-gray-300 border-2 rounded-xl ">
                {generatedPhoto && <img src={generatedPhoto} alt="Generated" className="w-full"/>}
            </div>
        </div>
    );
};

export default InputFormStableDiffusion;