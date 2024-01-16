import Center from "./Center";
import styled from "styled-components";
import Form from "./Form";
import SecretNumber from "./SecretNumber";

const StyleFormBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;
const StyledSecretNumberBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export default function Verification() {
    const NumberPassword = [1, 2, 3, 4];
    return (
        <Center>
            <div>
                <h1>Verification</h1>
                <p>
                    Deserunt ex mollit minim dolore consectetur elit nisi incididunt officia sit in enim tempor.
                    In officia laboris qui fugiat ea voluptate non veniam. Ullamco sint anim nostrud magna aliqua occaecat labore ex consectetur non nostrud exercitation pariatur aute.
                    Irure dolor eiusmod eu mollit occaecat ullamco amet pariatur Lorem adipisicing officia. Eiusmod deserunt ea amet elit ad in.
                    Consectetur dolore minim aliquip minim laboris Lorem.
                </p>
                <StyleFormBox>
                    <Form />
                </StyleFormBox>
                <StyledSecretNumberBox>
                    <SecretNumber />
                </StyledSecretNumberBox>
            </div>
        </Center >
    )
}