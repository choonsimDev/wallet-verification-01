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

export default function OldSecretNumber() {
    const [passwords, setPasswords] = useState([]);
    // todo : 데이타베이스에서 비밀번호들을 가져와야 한다.
    // todo : 새로 입력된 비밀번호와 올드비밀번호(해싱된)를 비교한다.
    const NumberPassword = [1, 2, 1, 1, 1, 1];
    return (
        <StyledInputBox>
            {NumberPassword.map((item, idx) => {
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