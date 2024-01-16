import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.div`
    background-color: #222;
`
const Wrapper = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
`
const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    gap: 1rem;
`
const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1rem;
    &:hover {
        color: blue;
    }
`


export default function Header() {
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <StyledNav>
                        <StyledLink href="/"> Home </StyledLink>
                        <StyledLink href="/about"> About </StyledLink>
                        <StyledLink href="/contact"> Contact </StyledLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}