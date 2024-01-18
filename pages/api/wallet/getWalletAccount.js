const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getWalletAccount() {
    try {
        const walletAccount = await prisma.walletAccount.findMany();
        return walletAccount;
    } catch (error) {
        console.error('Error retrieving wallet account:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

async function findWalletIdByAddress(address) {
    try {
        const walletAccount = await prisma.walletAccount.findUnique({
            where: {
                address: address
            },
            select: {
                walletId: true
            }
        });
        return walletAccount.walletId;
    } catch (error) {
        console.error('Error finding wallet ID:', error);
        throw error;
    }
}

module.exports = {
    getWalletAccount,
    findWalletIdByAddress
};

