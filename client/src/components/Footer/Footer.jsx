import React from 'react';
import styled from 'styled-components';

export default function Footer() {

    const theDate = new Date();
    const year = theDate.getFullYear();

    return (
        <StyledFooter>
            <div className="info">

            </div>
            <div className="social">
            </div>
            <div className="copyright">
                <span>Copyright&copy; {year}</span>
            </div>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    background-color: #555;
    color: #fff;

    a {
        color: #fff;
        text-decoration: none;
    }

    .info {
        padding: .5em;
    }

    .social {
        padding: .5em;
    }

    .copyright {
        text-align: center;
        background-color: #333;
        padding: .5em;
        font-weight: 600;
        color: #ddd;
        
        span {
            font-weight: 200;
        }

        span:last-child {
            font-weight200;
        }
    }
`;