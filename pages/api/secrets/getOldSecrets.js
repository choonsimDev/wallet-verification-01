import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    try {
        const result = await prismaClient.walletAccount.findMany({
            select: {
                account: true,
            },
        });
        console.log(result);

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}