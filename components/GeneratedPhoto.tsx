import React, {useState} from 'react';
import Image from "next/image";
import downloadPhoto from "../utils/downloadPhoto";
import Toggle from "./Toggle";

const GeneratedPhoto = () => {
    const [generatedPhoto, setGeneratedPhoto] = useState<string>('');
    const [sideBySide, setSideBySide] = useState<boolean>(false);

    return (
        <div>



            <Image
                src={generatedPhoto}
                alt="Generated Image"
                width={512}
                height={512}
                className="rounded-lg"
            />
            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={() => downloadPhoto(generatedPhoto, 'generatedPhoto.png')}
                    className="bg-black rounded-full text-white font-medium px-4 py-2"
                >
                    Download Image
                </button>
            </div>
        </div>
    );
};

export default GeneratedPhoto;