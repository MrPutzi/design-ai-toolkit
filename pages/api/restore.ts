import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import Replicate from "replicate";

import dotenv from "dotenv";

dotenv.config();

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
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

// interface StartResponse {
//     urls: {
//         get: string;
//     };
// }

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

    const imageUrl = req.body.imageUrl;
    const replicate = new Replicate({
        auth: 'r8_9Xjekdd38xbJ5u6MgHZPafvTPp93Rt43YHKQU',
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    })
    const model = 'tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c'
    const input = {
        img: imageUrl,
        version: "v1.4",
        scale: 2,
    }

    const output = await replicate.run(model, {input})
console.log(output)
    let restoredImage = output;



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