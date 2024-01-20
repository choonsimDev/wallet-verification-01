import { useState } from "react";
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

export default function OldSecretNumber() {
    const [password, setPassword] = useState("");
    const [walletAccountId, setWalletAccountId] = useState(1);
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    console.log(password);
    // hashing fuction
    const hash = sha256.create();
    hash.update(password);
    const data = { password, walletAccountId };
    // todo : 입력받은 비밀번호를 해싱해서 데이타베이스에 저장한다.
    const onSubmit = (e) => {
        e.preventDefault();
        fetch('/api/secrets/setSecret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
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
                <div>
                    <span>Hashing : {hash.hex()}</span>
                </div>
            </StyledForm>
        </StyledInputBox >
    )
}