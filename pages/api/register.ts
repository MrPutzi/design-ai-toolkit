import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { hash } from 'bcryptjs'

interface User {
    id: string;
    email: string;
    password: string;
    credit: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate the user's input (basic example)
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        // Hash the user's password
        const hashedPassword = await hash(password, 12);

        // Create a new user object
        const newUser: User = {
            id: Date.now().toString(),
            email: email,
            password: hashedPassword,
            credit: 50
        };

        // Define the path to the users.json file
        const usersFilePath = path.join(process.cwd(), 'users.json');

        // Read the users.json file
        let users: User[] = [];
        if (fs.existsSync(usersFilePath)) {
            const usersFile = fs.readFileSync(usersFilePath, 'utf8');
            users = JSON.parse(usersFile);
        }

        // Check if a user with the provided email already exists
        if (users.find(user => user.email === email)) {
            res.status(400).json({ message: 'User already exists.' });
            return;
        }

        // Add the new user to the users array
        users.push(newUser);

        // Write the updated users array back to the users.json file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'User registered successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
