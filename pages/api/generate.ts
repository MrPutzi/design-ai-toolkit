import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import Replicate from "replicate";

import dotenv from "dotenv";
import generatedPhoto from "../../components/GeneratedPhoto";

dotenv.config();

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
        imageUrl: string;
    };
}

// Create a new ratelimiter, that allows 3 requests per day
const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(3, "1440 m"),
        analytics: true,
    })
    : undefined;

interface StartResponse {
    urls: {
        get: string;
    };
}

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse<Data>
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
                .json("Too many uploads in 1 day. Please try again after 24 hours.");
            return;
        }
    }


    const replicate = new Replicate({
        auth: 'r8_HEyIbXxQ2qKWTRivNGqIVzoQcGwu49R0D6DHM',
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    })
    const model = 'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4'
    const inputPrompt = req.body.prompt;
    const input = {
            prompt: inputPrompt,
        scheduler: 'K_EULER',
        num_outputs: 1,
        guidance_scale: 7.5,
        image_dimensions: '512x512',
        num_inference_steps: 50,
    }



    const output = await replicate.run(model, {input})
    console.log(output)
    let generatedPhoto = output;

    // const startResponse: StartResponse = await replicate.run(model, {input}) as StartResponse;
    // const endpointUrl = startResponse.urls.get;
    // let restoredImage: string | null = null;
    // while (!restoredImage) {
    //     console.log("polling for result...");
    //     let finalResponse = await fetch(endpointUrl, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Token " + "r8_HEyIbXxQ2qKWTRivNGqIVzoQcGwu49R0D6DHM",
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
}