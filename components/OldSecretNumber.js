import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    input {
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

export default function OldSecretNumber({ address }) {
    const [walletId, setWalletId] = useState(null);
    const [passwords, setPasswords] = useState([]);
    const [error, setError] = useState('');

    const getWalletId = async () => {
        try {
            const response = await fetch('/api/wallet/findWalletIdByAddress', {
                method: 'POST', // API 요구사항에 따라 변경
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account: address }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data) {
                setWalletId(data);
            } else {
                setError('Wallet ID not found');
            }
        } catch (error) {
            setError('Error fetching wallet ID: ' + error.message);
        }
    };

    const getPasswords = async () => {
        try {
            const response = await fetch('/api/password/getPasswords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAccountId: walletId }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch passwords');
            }
            const data = await response.json();
            setPasswords(data);
            console.log("data", data);
        } catch (error) {
            setError('Error fetching passwords: ' + error.message);
        }
    };


    useEffect(() => {
        getWalletId();
    }, [address]);

    useEffect(() => {
        if (walletId) {
            getPasswords();
        }
    }, [walletId]);
    return (
        <StyledInputBox>
            {passwords.map((item, idx) => {
                return (
                    <div key={idx}>
                        <span>{idx + 1}번째</span>
                        <div ><input type="text" placeholder="Enter password" /></div>
                    </div>
                )
            })}
        </StyledInputBox>
    )
}