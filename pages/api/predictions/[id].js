    import dotenv from "dotenv";
    import Replicate from "replicate";

export default async function handler(req, res) {
    const response = await fetch(
        "https://api.replicate.com/v1/predictions/" + req.query.id,
        {
            headers: {
                Authorization: "process.env.REPLICATE_API_TOKEN",
                "Content-Type": "application/json",
            },
        }
    );

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
        userAgent: 'https://www.npmjs.com/package/create-replicate'
    });
    c
    if (response.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
}