import Center from "./Center";
import styled from "styled-components";
import OldSecretNumber from "./OldSecretNumber";
import NewSecretNumber from "./NewSecretNumber";
import TitleDescription from "./TitleDescription";
import Scanner from "./QRcodeReader";
import { useState } from "react";

const StyledSecretNumberBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export default function Verification() {
    const [walletAccount, setWalletAccount] = useState('');

    const getWalletId = (data) => {
        setWalletAccount(data);
        console.log("walletAccount-from-QRscanner", data);
        console.log("walletAccount-from-QRscanner", typeof data)
    }
    return (
        <Center>
            <TitleDescription />
            <Scanner getWalletAccount={getWalletId} />
            <StyledSecretNumberBox >
                <OldSecretNumber address={walletAccount} />
            </StyledSecretNumberBox>
            <StyledSecretNumberBox>
                <NewSecretNumber address={walletAccount} />
            </StyledSecretNumberBox>
        </Center >
    )
}