import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.div`
    background-color: white;
`
const StyledLink = styled(Link)`
    color: black;
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
            <nav>
                <StyledLink href="/"> Home </StyledLink>
                <StyledLink href="/about"> About </StyledLink>
                <StyledLink href="/contact"> Contact </StyledLink>
            </nav>
        </StyledHeader>
    )
}