import React, { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scanner() {
    const [data, setData] = useState('No result');
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