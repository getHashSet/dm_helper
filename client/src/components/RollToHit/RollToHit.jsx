import React from 'react';
import styled from 'styled-components';

RollToHit.defaultProps = {}

export default function RollToHit() {
    return (
        <StyledSection>
            <StyledFrame>
                <h2>Dice Calculator</h2>
                <StyledButton onClick={(e) => alert("Flipped a coin")}>Coin</StyledButton>
                <StyledButton>d4</StyledButton>
                <StyledButton>d6</StyledButton>
                <StyledButton>d8</StyledButton>
                <StyledButton>d12</StyledButton>
                <StyledButton>d20</StyledButton>
                <StyledButton>d100</StyledButton>
                <STyledDiceCalculator>
                    <div className="frame">
                        <div className="output">0</div>
                        <div className="buttons">
                            <StyledCalcRow className="first_row">
                                <li><p>7</p></li>
                                <li><p>8</p></li>
                                <li><p>9</p></li>
                                <li><p>-</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="second_row">
                                <li><p>4</p></li>
                                <li><p>5</p></li>
                                <li><p>6</p></li>
                                <li><p>+</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="third_row">
                                <li><p>1</p></li>
                                <li><p>2</p></li>
                                <li><p>3</p></li>
                                <li><p>c</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="fourth_row">
                                <li><p>0</p></li>
                                <li><p>d</p></li>
                                <li><p>=</p></li>
                            </StyledCalcRow>
                        </div>
                        <div className="other_options"></div>
                    </div>
                </STyledDiceCalculator>
            </StyledFrame>
        </StyledSection>
    )
}

const StyledCalcRow = styled.ul`
    display: flex;
    flex-wrap: nowrap;

    li {
        width: 25%;
        flex-grow: 1;
        border: 1px solid #3498db;
        background-color: #2980b9;
        min-height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            cursor: pointer;
            background-color: #3498db;
        }

        &:active {
            p {
                transform: translateY(3px);
            }
        }
    }
`;

const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`

const STyledDiceCalculator = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 1em 0;

    .frame {
        background-color: #dfe6e9;
        color: #2d3436;
        font-size: 1.5em;
        width: 500px;
        display: flex;
        flex-wrap:  wrap;

        .output {
            padding: .5em 1em;
            font-size: 1.5em;
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }

        .buttons {
            width: 100%;
            color: #fff;
        }

        .other_options {

        }
    }
`;

const StyledSection = styled.section`
    background: #2d3436;
    color: #fff;
    min-height: 30vh;
    padding: .5em;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    background: none;
    color: #fff;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em;
    border-radius: 2em;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: #2d3436;
        color: #fff;
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;