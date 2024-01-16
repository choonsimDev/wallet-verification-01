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

export default function SecretNumber() {
    const NumberPassword = [1, 2, 3, 4];
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