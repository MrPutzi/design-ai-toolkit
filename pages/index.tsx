import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";
import ModelComponent from "../components/ModelComponent";
import NadpisAI from "../components/NadpisAI";

const Home: NextPage = () => {
  // const models = [
  //   { title: 'Face restoration', description: 'Image-to-image generation/restoration', imageUrl: '/path/to/image1.jpg' },
  //   { title: 'Image generation', description: 'Text-to-image generation', imageUrl: '/path/to/image2.jpg' }
  //   // Add more models here...
  // ];
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>DESGIN + AI Toolkit</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">

          <NadpisAI />

          {/*<Link*/}
          {/*    className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"*/}
          {/*    href="/register"*/}
          {/*>*/}
          {/*    Zaregistrujte sa*/}
          {/*</Link>*/}


        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
        </p>

        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                {/*<ModelList models={models} />*/}
                <ModelComponent />

              </div>
            </div>
          </div>
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
