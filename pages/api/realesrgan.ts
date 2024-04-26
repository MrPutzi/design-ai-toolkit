    import Replicate from 'replicate'
    import dotenv from 'dotenv'
    import type {NextApiRequest, NextApiResponse} from "next";
    import requestIp from "request-ip";
    import redis from "../../utils/redis";
    import {Ratelimit} from "@upstash/ratelimit";
    import {json} from "node:stream/consumers";
    import {model} from "@tensorflow/tfjs";
    import * as replicate from "replicate";
    import fetch from "node-fetch";
    dotenv.config()


    // interface ExtendedNextApiRequest extends NextApiRequest {
    //     body: {
    //         imageUrl: string;
    //         apiKey: string; // Added to receive the new API key from the user
    //     };
    // }

    // interface Data {
    //     success: boolean;
    //     photoUrl?: string; // Optional in case of errors
    //     message?: string;
    //
    // }

    const ratelimit = redis
        ? new Ratelimit({
            redis: redis,
            limiter: Ratelimit.fixedWindow(3, "1440 m"),
            analytics: true,
        })
        : undefined;

    //
    // export default async function handler (
    //     // req: ExtendedNextApiRequest,
    //     req: NextApiRequest,
    //     // res: NextApiResponse<Data>
    //     res: NextApiResponse
    // ) {
    //     // Rate Limiter Code
    //     if (ratelimit) {
    //         const identifier = requestIp.getClientIp(req);
    //         const result = await ratelimit.limit(identifier!);
    //         res.setHeader("X-RateLimit-Limit", result.limit);
    //         res.setHeader("X-RateLimit-Remaining", result.remaining);
    //
    //         if (!result.success) {
    //             res
    //                 .status(429)
    //             return;
    //         }
    //     }
    //
    //     const replicate = new Replicate({
    //         auth: process.env.REPLICATE_API_KEY,
    //         userAgent: 'https://www.npmjs.com/package/create-replicate'
    //     })
    //     const output = await replicate.run(
    //         "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
    //         {
    //             input: {
    //                 image: req.body.imageUrl,
    //                 scale: 2,
    //                 face_enhance: false
    //             }
    //         }
    //     );
    //
    //     const handleOutput = (output: any) => {
    //         if (!output || !output.output) {
    //             return { success: false, message: "Failed to generate photo. Please try again later." };
    //         }
    //         const photoUrl = output.output;
    //         return { photoUrl };
    //     }
    //
    //     const photoUrl = handleOutput(output);
    //     res.status(200).json(photoUrl);
    // }
    //
    // export default async function handler(
    //     req: NextApiRequest,
    //     res: NextApiResponse) {
    // //
    //     const response = await fetch("https://api.replicate.com/v1/predictions" + req.query.id, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "process.env.REPLICATE_API_TOKEN",
    //         },
    //         body: JSON.stringify({
    //             version: "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
    //             input: {
    //                 image: req.body.imageUrl,
    //                 scale: 2,
    //                 face_enhance: false
    //             }
    //         }),
    //     });
    //
    //     if (response.status !== 201) {
    //         let error = await response.json();
    //         res.statusCode = 500;
    //         res.end(JSON.stringify({ detail: error.detail }));
    //         return;
    //     }
    //
    //     const prediction = await response.json();
    //     res.statusCode = 201;
    //     res.end(JSON.stringify(prediction));
    // }



    //     console.log({model, input})
    //     const output = await replicate.run(model, {input}) as string[];
    //     const handleOutput = (output: string[]) => {
    //         if (!output || output.length === 0) {
    //             return { success: false, message: "Failed to generate photo. Please try again later." };
    //         }
    //         const photoUrl = output[0];
    //         return { success: true, photoUrl };
    //     };
    //
    //     const photoUrl = handleOutput(output);
    //     res.status(200).json(photoUrl);

    export default async function handler(
        req:NextApiRequest,
        res:NextApiResponse
    ) {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_KEY,
            userAgent: 'https://www.npmjs.com/package/create-replicate'
        })
        const model = 'nightmareai/real-esrgan:350d32041630ffbe63c8352783a26d94126809164e54085352f8326e53999085'
        const { image, scale, faceEnhance } = req.body;
        try {
            const output = await replicate.run(
                model,
                {
                    input: {
                        image,
                        scale,
                        face_enhance: faceEnhance,
                    },
                }
            );

            res.status(200).json(output);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Failed to generate photo. Please try again later."});
        }

    }


