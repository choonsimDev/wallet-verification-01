import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    try {
        console.log("newSecret.req.body", req.body);
        const { password, walletAccountId } = req.body;
        if (!password || !walletAccountId) {
            return res.status(400).json({ error: "Invalid request body" });
        }
        const result = await prismaClient.password.create({
            data: {
                password,
                walletAccountId
            }
        });
        res.status(200).json({ ok: true });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}