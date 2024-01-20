import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        // 요청에서 walletAccountId 추출
        console.log(req.body)
        const { walletAccountId } = req.body;
        console.log("walletAccountId", walletAccountId);

        // 유효성 검사
        if (!walletAccountId) {
            return res.status(400).json({ error: 'WalletAccountId is required' });
        }

        // 해당 walletAccountId에 대한 모든 비밀번호 조회
        const passwords = await prisma.password.findMany({
            where: {
                walletAccountId: parseInt(walletAccountId, 10),
            },
            select: {
                password: true,
                createdAt: true,
                updatedAt: true,
                // 다른 필요한 필드를 여기에 추가
            }
        });

        // 결과 반환
        res.status(200).json(passwords);
        console.log("passwords", passwords);
    } catch (error) {
        console.error('Error retrieving passwords:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}