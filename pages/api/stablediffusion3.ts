import Replicate from 'replicate'
import dotenv from 'dotenv'
import {NextApiRequest, NextApiResponse} from "next";
import redis from "../../utils/redis";
import {Ratelimit} from "@upstash/ratelimit";
import requestIp from "request-ip";

dotenv.config()

interface Data {
    success: boolean;
    photoUrl?: string; // Optional in case of errors
    message?: string;
}

const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(3, "1440 m"),
        analytics: true,
    })
    : undefined;

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
        aspectRatio: string;
        outputQuality: number;
        negativePrompt: string;
    };
}

export default async function handler (
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
            res.status(429).json({ success: false, message: "Rate limit exceeded. Please try again later." });
            return;
        }
    }

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    })
    const model = 'stability-ai/stable-diffusion-3'
    const input = {
        prompt: req.body.prompt,
        aspect_ratio: req.body.aspectRatio,
        output_quality: req.body.outputQuality,
        negative_prompt: req.body.negativePrompt,
    }

    console.log({model, input})
    const output = await replicate.run(model, { input }) as string[];
    const handleOutput = (output: string[]) => {
        if (!output || output.length === 0) {
            return { success: false, message: "Failed to generate photo. Please try again later." };
        }
        const photoUrl = output[0];
        return { success: true, photoUrl };
    };

    const generatedPhotoData = handleOutput(output);
    res.status(200).json(generatedPhotoData);
}