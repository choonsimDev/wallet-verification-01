import { useEffect, useState } from "react";
import styled from "styled-components";

import Center from "./Center";
import OldSecretNumber from "./OldSecretNumber_old";
import NewSecretNumber from "./NewSecretNumber";
import TitleDescription from "./TitleDescription";
import Scanner from "./QRcodeReader";
import { ImQrcode } from "react-icons/im";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const StyledSecretNumberBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
const StyledButton = styled.div`
    width: 300px;
    height: 300px;
    margin: auto; // Automatically centers in the flex container
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    const closeScanner = () => {
        setScannerVisible(false);
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
        console.log("handleAllPassword changed:", handleAllPassword);
    }, [handleAllPassword]);
    useEffect(() => {
        console.log("oldSecretNumberExists changed:", oldSecretNumberExists);
    }, [oldSecretNumberExists]);

    return (
        <Center>
            <TitleDescription />
            {!scannerVisible && ( // Only show the button when the scanner is not visible
                <StyledButton onClick={toggleScanner}>
                    <MdOutlineQrCodeScanner style={{ width: 200, height: 200, color: "gray" }} />
                    <p>start to click</p>
                </StyledButton>
            )}
            {scannerVisible && ( // Conditionally render the Scanner component
                <Scanner
                    getWalletAccount={getWalletAccount}
                    getNewAccount={() => { }} // Assume you handle new account similarly
                    closeScanner={closeScanner}
                />
            )}
            {/* 스캔한 데이터 출력 */}
            {walletAccount && (
                <p>Scanned Address: {walletAccount}</p>
            )}

            <StyledSecretNumberBox >
                <OldSecretNumber
                    address={walletAccount}
                    checkOldSecretNumberExists={checkOldSecretNumberExists} // 이 함수를 OldSecretNumber 컴포넌트에 전달합니다.
                    AllPasswordCorrect={setHandleAllPassword}
                />
            </StyledSecretNumberBox>

            {walletAccount && !oldSecretNumberExists && (
                <StyledSecretNumberBox>
                    <NewSecretNumber
                        address={walletAccount}
                    />
                </StyledSecretNumberBox>
            )}

            {oldSecretNumberExists && handleAllPassword && (
                <StyledSecretNumberBox>
                    <div>모든 암호문을 바르게 입력하셨습니다.</div>
                    <div>이제 새로운 암호문을 추가입력하세요.</div>
                    <NewSecretNumber
                        address={walletAccount}
                    />
                </StyledSecretNumberBox>
            )}

        </Center >
    )
}