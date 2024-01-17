import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    const result = await prismaClient.user.create({
        data: {
            name: "a",
            email: "",
            password: "13849237",
        }
    });

    res.status(200).json({ ok: true });
}