import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import CountUp from "react-countup";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import NSFWPredictor from "../utils/nsfwCheck";
import va from "@vercel/analytics";
import { uploadImage, getImage } from "../utils/storageHandler";


// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      : "free",
});
const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: { colors: { primary: "#000" } },
};

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const UploadDropZone = () => (
      <UploadDropzone
          uploader={uploader}
          options={options}
          onUpdate={(file) => {
            if (file.length !== 0) {
              setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
              generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
              setIsUploaded(true);
            }
          }}
          width="670px"
          height="250px"
      />
  );

  function deleteImage() {
    setOriginalPhoto(null);
    setRestoredImage(null);
    setIsUploaded(false);
  }
  async function generatePhoto(fileUrl: string) {
    setLoading(true);
    setError(null);
    const response = await fetch('/api/restore', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        img: fileUrl,
        version: "v1.4",
        scale: 2
      }),
    });
    const output = await response.json();
    console.log(output)
    setLoading(false);
    if (response.ok) {
      setRestoredImage(output);
      console.log(output)
      uploadImage(output);
    } else {
      setError(output.message);
    }
  }

  return (
      <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Head>
          <title>Restore Photos</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5">
            Upravte svoje fotografie pomocou umeléj inteligencie.
          </h1>
          <p className="text-slate-500">
            Nahrajte svoje fotografie a nechajte AI obnoviť ich kvalitu. AI je trénované na obnovu starých fotografií, odstránenie šumu a zlepšenie črtov tváre.
          </p>
          <ResizablePanel>
            <AnimatePresence>
              <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                <Toggle
                    className={`${restoredLoaded ? "visible" : "invisible"} mb-6`}
                    sideBySide={sideBySide}
                    setSideBySide={(newVal) => setSideBySide(newVal)}
                />
                {restoredLoaded && sideBySide && (
                    <CompareSlider
                        original={originalPhoto!}
                        restored={restoredImage!}
                    />
                )}
                {!originalPhoto && <UploadDropZone />}
                {originalPhoto && !restoredImage && (
                    <Image
                        alt="original photo"
                        src={originalPhoto}
                        className="rounded-2xl"
                        width={512}
                        height={512}
                    />
                )}
                {restoredImage && originalPhoto && !sideBySide && (
                    <div className="flex sm:space-x-4 sm:flex-row flex-col">
                      <div>
                        <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
                        <Image
                            alt="original photo"
                            src={originalPhoto}
                            className="rounded-2xl relative"
                            width={512}
                            height={512}
                        />
                      </div>
                      <div className="sm:mt-0 mt-8">
                        <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>
                        <img src={restoredImage} alt="restoredImage" width={512} height={512}/>
                      </div>
                    </div>
                )}
                {loading && (
                    <button
                        disabled
                        className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
                    >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                    </button>
                )}
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                        role="alert"
                    >
                      <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="flex space-x-2 justify-center">
                  {originalPhoto && !loading && (
                      <button
                          onClick={() => {
                            setOriginalPhoto(null);
                            setRestoredImage(null);
                            setRestoredLoaded(false);
                            setError(null);
                          }}
                          className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
                      >
                        Upload New Photo
                      </button>
                  )}

                  {isUploaded ? (
                      <div>
                        <button
                            onClick={deleteImage}
                            className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
                        >
                          Delete Uploaded Photo
                        </button>
                        {restoredImage && <a href={restoredImage} download className="button">Download Restored Photo</a>}
                      </div>
                  ) : null}
                  {restoredLoaded && (
                      <button
                          onClick={() => {
                            downloadPhoto(
                                restoredImage!,
                                appendNewToName(photoName!)
                            );
                          }}
                          className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
                      >
                        Download Restored Photo
                      </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
        <Footer />
      </div>
  );
};

export default Home;