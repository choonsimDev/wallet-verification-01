import { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
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
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    input[type="submit"] {
        width: 300px;
        margin: 10px;
        padding: 10px;
        background-color: #ccc;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    span {
        color: red;
    }
`;
const StyledHahingBox = styled.div`
    font-size: 0.5rem;
`;
const SuccessMessage = styled.div`
    color: green;
    margin-top: 20px;
`;

export default function OldSecretNumber({ address }) {
    const [password, setPassword] = useState("");
    const [hashing, setHashing] = useState("");
    const [walletId, setWalletId] = useState(null);
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);

    const onPasswordChange = (e) => {
        const newPassword = e.target.value;
        console.log("e.target.value", e.target.value);
        console.log("newPassword", newPassword);
        console.log("password", password);
        setPassword(newPassword);
        const hash = sha256(newPassword);
        setHashing(hash);
        console.log("hash", hash);
        console.log("hashing", hashing);
    }

    const getWalletId = async () => {
        try {
            if (!address) return;
            const response = await fetch('/api/wallet/findWalletIdByAddress', {
                method: 'POST', // 또는 GET, API의 요구사항에 따라
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account: address }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // console.log('data', data);
            if (data) {
                setWalletId(data);

            } else {
                setError('Wallet ID not found');
            }
            // console.log('walletId', walletId);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getWalletId();
        console.log('address', address);

    }, [address]);

    const saveSecret = async () => {
        try {
            console.log('input', password);
            console.log('hashing', hashing);
            console.log('walletId', walletId);
            const response = await fetch('/api/secrets/setSecret', {
                method: 'POST', // 또는 GET, API의 요구사항에 따라
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: hashing, walletAccountId: walletId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('data', data);
            if (data) {
                setResponse(data);
            } else {
                setError('Secret not saved');
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        saveSecret();
        setPassword("");
    }

    return (
        <StyledInputBox>
            <StyledForm onSubmit={onSubmit}>
                <input
                    type="text"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Enter New password"
                />
                <input type="submit" value="Create New password" />
                <StyledHahingBox>
                    <div>walletAddress :{address}</div>
                    <div>walletAccountID : {walletId}</div>
                    <div>Hashing : {hashing}</div>
                </StyledHahingBox>
                {response && <SuccessMessage>비밀번호가 성공적으로 저장되었습니다.</SuccessMessage>}
                {error && <span>{error}</span>}
            </StyledForm>
        </StyledInputBox >
    )
}