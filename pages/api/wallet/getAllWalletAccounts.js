const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function getAllWalletAccounts(req, res) {
    try {
        const walletAccounts = await prisma.walletAccount.findMany();
        res.status(200).json(walletAccounts); // 응답을 JSON 형식으로 전송
    } catch (error) {
        console.error('Error retrieving wallet accounts:', error);
        res.status(500).json({ error: 'Internal server error' }); // 서버 에러 처리
    } finally {
        await prisma.$disconnect(); // 데이터베이스 연결 종료
    }
}


