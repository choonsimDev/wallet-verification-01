import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    const result = await prismaClient.user.findMany({
        where: {
            name: {
                contains: "a"
            }
        }
    });
    res.status(200).json(result);
}