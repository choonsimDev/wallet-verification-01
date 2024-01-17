import prismaClient from "@/libs/prismaClient";

export default async function handler(req, res) {
    // 데이타 베이스에서 해당 월렛의 비밀번호를 읽은뒤에 처리..array push는...어떻게 할까?
    try {
        console.log(req.body);
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