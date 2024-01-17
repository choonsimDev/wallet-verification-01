import { useState } from "react";
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

// fix camera input
export default function WalletAccount() {
    const [account, setAccount] = useState("");
    const onAccountChange = (e) => {
        setAccount(e.target.value);
    }
    console.log(account);
    const onSubmit = (e) => {
        e.preventDefault();
        fetch('/api/wallet/walletAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account)
        })
        setAccount("");

    }
    return (
        <StyledInputBox>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={account}
                    onChange={onAccountChange}
                    placeholder="Enter Account"
                />
                <input type="submit" value="Account Confirm" />
            </form>
        </StyledInputBox >
    )
}