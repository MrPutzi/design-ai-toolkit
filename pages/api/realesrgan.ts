    import Replicate from 'replicate'
    import dotenv from 'dotenv'
    import type {NextApiRequest, NextApiResponse} from "next";
    import requestIp from "request-ip";
    import redis from "../../utils/redis";
    import {Ratelimit} from "@upstash/ratelimit";
    import {json} from "node:stream/consumers";
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


    export default async function handler (
        // req: ExtendedNextApiRequest,
        req: NextApiRequest,
        // res: NextApiResponse<Data>
        res: NextApiResponse
    ) {
        // Rate Limiter Code
        if (ratelimit) {
            const identifier = requestIp.getClientIp(req);
            const result = await ratelimit.limit(identifier!);
            res.setHeader("X-RateLimit-Limit", result.limit);
            res.setHeader("X-RateLimit-Remaining", result.remaining);

            if (!result.success) {
                res
                    .status(429)
                return;
            }
        }

        const replicate = new Replicate({
            auth: "r8_QODWLhOyB1bnz2kIpNnK740PcuHM1E94ZKCVw", // Moved API key to environment variable
            userAgent: 'https://www.npmjs.com/package/create-replicate'
        })
        const output = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
                input: {
                    image: req.body.imageUrl,
                    scale: 2,
                    face_enhance: false
                }
            }
        );

        const handleOutput = (output: any) => {
            if (!output || !output.output) {
                return { success: false, message: "Failed to generate photo. Please try again later." };
            }
            const photoUrl = output.output;
            return { photoUrl };
        }

        const photoUrl = handleOutput(output);
        res.status(200).json(photoUrl);
    }



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
