import Center from "./Center";
import styled from "styled-components";

const StyledInputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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
                <StyledInputBox>
                    {NumberPassword.map((item, idx) => {
                        return (<><span>{idx + 1}번째
                        </span> <div key={idx}><input type="text" placeholder="Enter password" /></div></>)


                    })}
                </StyledInputBox>
            </div>
        </Center >
    )
}