import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    try {
        console.log(req.body);
        const account = req.body;
        console.log(account);
        if (!account) {
            return res.status(400).json({ error: "Invalid request body" });
        }
        const result = await prismaClient.walletAccount.create({
            data: {
                account,
            }
        });
        res.status(200).json({ ok: true });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}