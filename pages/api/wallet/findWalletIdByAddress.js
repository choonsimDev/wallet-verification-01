const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function findWalletIdByAddress(req, res) {

    try {
        console.log('req.body', req.body);
        const { account } = req.body;
        console.log('account', account);
        if (!account) {
            return res.status(400).json({ error: 'Account is required' });
        }
        const walletAccount = await prisma.walletAccount.findUnique({
            where: {
                account: account
            },
            select: {
                id: true
            }
        });
        if (walletAccount) {
            console.log('walletAccount', walletAccount);
            res.status(200).json(walletAccount.id);
        } else {
            res.status(404).json({ message: "Wallet account not found" });
        }
    } catch (error) {
        console.error('Error finding wallet ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



