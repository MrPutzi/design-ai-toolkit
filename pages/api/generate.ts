import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import Replicate from "replicate";

import dotenv from "dotenv";

dotenv.config();

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    };
}

interface ApiResponse {
    success: boolean;
    message?: string;
    photoUrl?: string;
}

// Create a new ratelimiter, that allows 3 requests per day
const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(3, "1440 m"),
        analytics: true,
    })
    : undefined;

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    // Rate Limiter Code
    if (ratelimit) {
        const identifier = requestIp.getClientIp(req);
        const result = await ratelimit.limit(identifier!);
        res.setHeader("X-RateLimit-Limit", result.limit);
        res.setHeader("X-RateLimit-Remaining", result.remaining);

        if (!result.success) {
            res.status(429).json({
                success: false,
                message: "Too many uploads in 1 day. Please try again after 24 hours."
            });
            return;
        }
    }

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    });
    const model = 'stability-ai/stable-diffusion';
    const inputPrompt = req.body.prompt;
    const input = {
        prompt: inputPrompt,
        scheduler: 'K_EULER',
        num_outputs: 1,
        guidance_scale: 7.5,
        image_dimensions: '512x512',
        num_inference_steps: 50,
    };

    try {
        const output = await replicate.run(model, {input});
        if (output.status === "succeeded" && output.urls && output.urls.get) {
            res.status(200).json({
                success: true,
                photoUrl: output.urls.get
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to generate the image."
            });
        }
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request."
        });
    }
}