import { useEffect, useState } from "react";
import styled from "styled-components";
import { sha256 } from "js-sha256";

const StyledInputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    input, button {
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    button {
        background-color: #4CAF50; /* Green */
        color: white;
        cursor: pointer;
    }
`;

export default function OldSecretNumber({ address, AllPasswordCorrect }) {
    const [walletId, setWalletId] = useState(null);
    const [passwords, setPasswords] = useState([]);
    const [inputPasswords, setInputPasswords] = useState(Array(3).fill(""));
    const [validInputs, setValidInputs] = useState(Array(3).fill(false));
    const [error, setError] = useState('');

    const checkPassword = (password, idx) => {
        const hashedPassword = sha256(password);
        if (hashedPassword === passwords[idx].password) {
            const updatedValidInputs = [...validInputs];
            updatedValidInputs[idx] = true;
            setValidInputs(updatedValidInputs);
            setInputPasswords((prev) => {
                const newPwds = [...prev];
                newPwds[idx] = hashedPassword;
                return newPwds;
            });
            // 모든 입력이 유효하면 상위 컴포넌트에 알립니다.
            if (updatedValidInputs.every(Boolean)) {
                AllPasswordCorrect(true);
            }
        } else {
            setError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
        }
    };

    const getWalletId = async () => {
        try {
            if (!address) {
                return;
            }
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
            {passwords.map((item, idx) => (
                <div key={idx}>
                    {idx === 0 || validInputs[idx - 1] ? (
                        <>
                            <input
                                type="password"
                                value={inputPasswords[idx]}
                                placeholder={`Enter password #${idx + 1}`}
                                onChange={(e) => {
                                    const updatedInputPasswords = [...inputPasswords];
                                    updatedInputPasswords[idx] = e.target.value;
                                    setInputPasswords(updatedInputPasswords);
                                }}
                                disabled={validInputs[idx]}
                            />
                            {!validInputs[idx] && (
                                <button onClick={() => checkPassword(inputPasswords[idx], idx)}>
                                    확인
                                </button>
                            )}
                        </>
                    ) : null}
                </div>
            ))}
            {error && <p>{error}</p>}
        </StyledInputBox>
    );
}
