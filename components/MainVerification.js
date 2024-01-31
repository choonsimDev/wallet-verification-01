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
    const [allPasswordCorrect, setAllPasswordCorrect] = useState(false);
    const [newAccount, setNewAccount] = useState(false);

    const getWalletId = (data) => {
        setWalletAccount(data);
        console.log("walletAccount-from-QRscanner", data);
        console.log("walletAccount-from-QRscanner", typeof data)
    }
    const getAllPasswordCorrect = (data) => {
        setAllPasswordCorrect(data);
        console.log("allPasswordCorrect", data);
        console.log("allPasswordCorrect", typeof data)
    }
    const getNewAccount = (data) => {
        setNewAccount(data);
        console.log("newAccount", data);
        console.log("newAccount", typeof data)
    }

    return (
        <Center>
            <TitleDescription />
            <Scanner
                getWalletAccount={getWalletId}
                getNewAccount={getNewAccount} />
            {/* 월렛어카운트 리셋 버튼으로 새비번을 넣었을경우 새비번이 추가 되었는지 확인용도 */}
            <StyledSecretNumberBox >
                <OldSecretNumber
                    address={walletAccount}
                    getAllPasswordCorrect={getAllPasswordCorrect}
                />
            </StyledSecretNumberBox>
            {/* 올드비번을 다 맞게 입력했거나 */}
            {/* 비밀번호가 없는 어카운트 이거나, 새어카운트포함 */}
            {(allPasswordCorrect || newAccount) &&
                <StyledSecretNumberBox>
                    <NewSecretNumber
                        address={walletAccount}
                    />
                </StyledSecretNumberBox>
            }
        </Center >
    )
}