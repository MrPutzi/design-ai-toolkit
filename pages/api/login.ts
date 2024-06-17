// File: /pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
    email: string;
    password: string;
    id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { email, password } = req.body;

    // Read the users.json file
    const usersFilePath = path.join(process.cwd(), 'users.json');
    const usersFile = fs.readFileSync(usersFilePath, 'utf8');
    const users: User[] = usersFile ? JSON.parse(usersFile) : [];

    // Find the user with the provided email
    const user = users.find((user) => user.email === email);

    if (!user) {
        res.status(400).json({ message: 'Invalid email or password.' });
        return;
    }

    // Compare the provided password with the stored hashed password
    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
        res.status(400).json({ message: 'Invalid email or password.' });
        return;
    }

    // Create a token for the user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
}
