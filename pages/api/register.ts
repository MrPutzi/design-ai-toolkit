import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { hash } from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        // Here you would typically validate the user's input
        // and check if a user with the provided email already exists

        const hashedPassword = await hash(password, 12)

        const newUser = {
            id: Date.now().toString(),
            email: email,
            password: hashedPassword,
        }

        // Read the users.json file
        const usersFilePath = path.join(process.cwd(), 'users.json')
        const usersFile = fs.readFileSync(usersFilePath, 'utf8')
        const users = usersFile ? JSON.parse(usersFile) : []

        // Add the new user to the users array
        users.push(newUser)

        // Write the updated users array back to the users.json file
        fs.writeFileSync(usersFilePath, JSON.stringify(users))

        res.status(201).json({ message: 'User registered successfully!' })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}