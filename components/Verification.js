import Center from "./Center";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import OldSecretNumber from "./OldSecretNumber";
import NewSecretNumber from "./NewSecretNumber";
import TitleDescription from "./TitleDescription";
import WalletAccount from "./WalletAccount";
import Scanner from "./QRcodeReader";
import Hashing from "./Hashing";

const StyleFormBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;
const StyledSecretNumberBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export default function Verification() {
    return (
        <Center>
            <TitleDescription />
            <StyleFormBox>
                <LoginForm />
            </StyleFormBox>
            <Scanner />
            <WalletAccount />
            <StyledSecretNumberBox>
                <OldSecretNumber />
            </StyledSecretNumberBox>
            <StyledSecretNumberBox>
                <NewSecretNumber />
            </StyledSecretNumberBox>

        </Center >
    )
}