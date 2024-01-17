import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    console.log(req.body);
    const { username, password, email } = req.body;
    const result = await prismaClient.user.create({
        data: {
            username,
            email,
            password,
        }
    });

    res.status(200).json({ ok: true });

}