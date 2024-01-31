import React, { useEffect, useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scanner({ getWalletAccount, getNewAccount }) {
    const [data, setData] = useState('');
    const checkAddressInDB = async () => {
        try {
            const response = await fetch('/api/wallet/getAllWalletAccounts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const accounts = await response.json();
            console.log("accounts", accounts);
            if (data === '') return;
            let foundData = accounts.find(account => account.account === data);
            if (foundData === undefined) {
                const response = await fetch('/api/wallet/setWalletAccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                });
                console.log("response", response);
                getNewAccount(true);
            } else {
                console.log('The address already exists in the database.');
            }
        } catch (error) {
            console.error('Error fetching wallet accounts:', error);
        }
    }
    useEffect(() => {
        checkAddressInDB();
        getWalletAccount(data);
    }, [data]);

    return (
        <>
            <h1>QR Code Scanner</h1>
            <QrScanner
                onDecode={(result) => { result && setData(result) }}
                onError={(error) => console.log(error?.message)}
            />
            <p>{data}</p>
        </>
    );
}