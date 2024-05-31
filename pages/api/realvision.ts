import {NextApiRequest, NextApiResponse} from "next";
import redis from "../../utils/redis";
import {Ratelimit} from "@upstash/ratelimit";
import Replicate from "replicate";
import requestIp from "request-ip";
import dotenv from "dotenv";
import {saveImage, uploadImage} from "../../utils/storageHandler";
dotenv.config()

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    };
}

const rateLimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(3, "1440 m"),
        analytics: true,
    })
    : undefined;

interface data {
    success: boolean;
    output?: string;
    message?: string;
}

export default async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse<data>
) => {
    if (rateLimit) {
        const identifier = requestIp.getClientIp(req);
        const result = await rateLimit.limit(identifier!);
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
    const model = 'lucataco/realistic-vision-v5:8aeee50b868f06a1893e3b95a8bb639a8342e846836f3e0211d6a13c158505b1'
    const input = {
        seed: 1335,
        steps: 20,
        width: 512,
        height: 728,
        prompt: req.body.prompt,
        guidance: 5,
        scheduler: 'EulerA',
        negative_prompt: '(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck',
    }

    try {
        const response = await replicate.run(model, {input});
        const {output} = response as {output: string};
        saveImage(output, 'realvision')
        res.status(200).json({ success: true, output });
    } catch (error) {
        console.error(error);
    }
}
