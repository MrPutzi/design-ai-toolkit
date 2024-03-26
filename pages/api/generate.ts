import Replicate from 'replicate'
import dotenv from 'dotenv'
import requestIp from "request-ip";
import {NextApiRequest, NextApiResponse} from "next";
import {Ratelimit} from "@upstash/ratelimit";
import redis from "../../utils/redis";
dotenv.config()

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    };
}

const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(3, "1440 m"),
        analytics: true,
    })
    : undefined;

interface Data {
    success: boolean;
    photoUrl?: string; // Optional in case of errors
    message?: string;
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
    const model = 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b'
    const input = {
        width: 768,
        height: 768,
        prompt: req.body.prompt,
        refine: 'expert_ensemble_refiner',
        scheduler: 'K_EULER',
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: '',
        prompt_strength: 0.8,
        num_inference_steps: 25,
    }

    console.log({model, input})
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while processing your request." });
    }
}