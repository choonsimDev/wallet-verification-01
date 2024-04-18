import { useEffect, useState } from "react";
import styled from "styled-components";

import Center from "./Center";
import OldSecretNumber from "./OldSecretNumber";
import NewSecretNumber from "./NewSecretNumber";
import TitleDescription from "./TitleDescription";
import Scanner from "./QRcodeReader";

const StyledSecretNumberBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export default function Verification() {
    const [walletAccount, setWalletAccount] = useState('');
    const [oldSecretNumberExists, setOldSecretNumberExists] = useState(false); // null로 초기화하여 아직 확인되지 않음을 나타냅니다.
    const [handleAllPassword, setHandleAllPassword] = useState(false);
    const [newAccount, setNewAccount] = useState(false);
    const [scannerVisible, setScannerVisible] = useState(false); // New state to manage scanner visibility

    const toggleScanner = () => {
        setScannerVisible(!scannerVisible); // Toggle the visibility state
    };


    const getWalletAccount = (data) => {
        setWalletAccount(data);
    }
    const checkOldSecretNumberExists = (exists) => {
        setOldSecretNumberExists(exists);
    }
    const AllPasswordCorrect = (isCorrect) => {
        setHandleAllPassword(isCorrect);
        if (isCorrect) {
            console.log("모든 비밀번호가 정확합니다. 다음 단계로 진행하세요.");
        }
    };
    const getNewAccount = (data) => {
        setNewAccount(data);
    }
    useEffect(() => {
        // This effect could be used for additional logic when handleAllPassword changes.
    }, [handleAllPassword]);

    return (
        <Center>
            <TitleDescription />
            <button onClick={toggleScanner}>Toggle Camera</button> {/* Button to open/close the scanner */}
            {scannerVisible && ( // Conditionally render the Scanner component
                <Scanner
                    getWalletAccount={getWalletAccount}
                    getNewAccount={getNewAccount}>
                </Scanner>
            )}

            <StyledSecretNumberBox >
                <div>OldSecretNumber를 차례대로 입력하셔야 새로운 비밀번호를 만들 수 있습니다.</div>
                <OldSecretNumber
                    address={walletAccount}
                    checkOldSecretNumberExists={checkOldSecretNumberExists} // 이 함수를 OldSecretNumber 컴포넌트에 전달합니다.
                    AllPasswordCorrect={AllPasswordCorrect}
                />
            </StyledSecretNumberBox>

            {/* <StyledSecretNumberBox>
                <div>The address already exists in the database.</div>
                <NewSecretNumber
                    address={walletAccount}
                ></NewSecretNumber>
            </StyledSecretNumberBox> */}
            {/* 처음 등록하는 주소면 새로운 비번 등록창 보이도록 */}
            {/* 기존비번을 다 맞게 입력했으면 새로운 비번 등록창 보이도록 */}
            {handleAllPassword && (
                <StyledSecretNumberBox>
                    <NewSecretNumber
                        address={walletAccount}
                    />
                </StyledSecretNumberBox>
            )}
        </Center >
    )
}