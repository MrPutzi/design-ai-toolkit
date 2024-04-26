import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import Replicate from "replicate";

import dotenv from "dotenv";

dotenv.config();

// interface ExtendedNextApiRequest extends NextApiRequest {
//     body: {
//         imageUrl: string;
//     };
// }
//
// // Create a new ratelimiter, that allows 3 requests per day
// const ratelimit = redis
//     ? new Ratelimit({
//         redis: redis,
//         limiter: Ratelimit.fixedWindow(3, "1440 m"),
//         analytics: true,
//     })
//     : undefined;
//
// interface Data {
//     success: boolean;
//     photoUrl?: string; // Optional in case of errors
//     message?: string;
// }
//
// export default async function handler(
//     req: ExtendedNextApiRequest,
//     res: NextApiResponse<Data>
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
//             res.status(429).json({success: false, message: "Rate limit exceeded. Please try again later."});
//             return;
//         }
//     }
//
//     const imageUrl = req.body.imageUrl;
//     const replicate = new Replicate({
//         auth: process.env.REPLICATE_API_KEY,
//         userAgent: 'https://www.npmjs.com/package/create-replicate'
//     })
//     const model = 'tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c'
//     const input = {
//         img: imageUrl,
//         version: "v1.4",
//         scale: 2,
//     }
//     console.log({model, input})
//     const output = await replicate.run(model, {input}) as string[];
//     const handleOutput = (output: string[]) => {
//         if (!output || output.length === 0) {
//             return {success: false, message: "Failed to generate photo. Please try again later."};
//         }
//         const photoUrl = output[0];
//         return {success: true, photoUrl};
//     }
//     const result = handleOutput(output);
//     res.status(200).json(result);
// }
//
//
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    })
    const model = 'tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c'
    const { img, version, scale } = req.body;
    try {
        const output = await replicate.run(
            model,
            {
                input: {
                    img,
                    version,
                    scale
                },
            }
        );

        res.status(200).json(output);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to generate photo. Please try again later."});
    }

}

    // The rest of the code that interacts with the Replicate API is commented out.
    // If needed, it should be updated to use the new API key from the environment variable as well.

    // const startResponse: StartResponse = await replicate.run(model, {input}) as StartResponse;
    // const endpointUrl = startResponse.urls.get;
    // let restoredImage: string | null = null;
    // while (!restoredImage) {
    //     console.log("polling for result...");
    //     let finalResponse = await fetch(endpointUrl, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Token " + process.env.REPLICATE_API_KEY,
    //         },
    //     });
    //     let jsonFinalResponse = await finalResponse.json();
    //     if (jsonFinalResponse.status === "succeeded") {
    //         restoredImage = jsonFinalResponse.output;
    //     } else if (jsonFinalResponse.status === "failed") {
    //         break;
    //     } else {
    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //     }
    // }
