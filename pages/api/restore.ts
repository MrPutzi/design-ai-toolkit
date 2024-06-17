import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import Replicate from "replicate";

import dotenv from "dotenv";

dotenv.config();


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

