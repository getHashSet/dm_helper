import React, { useState } from 'react';
import styled from 'styled-components';

RollToHit.defaultProps = {}

export default function RollToHit() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [calculatorOutput, updatecalculatorOutput] = useState("0");

    // ================ //
    //     Functions    //
    // ================ //
    const clearCalculatorField = (e) => {
        updatecalculatorOutput("0");
    }

    const addANumberToTheProblem = (e) => {
        // Step 1: Check if button field was clicked or the p tag itself.
        let buttonValue = "0";
        if (e.target.children[0] != null){
            buttonValue = e.target.children[0].textContent;
        } else {
            buttonValue = e.target.textContent;
        }

        // HELPER VARs
        let cleanedOutput = calculatorOutput;
        const lastMod = cleanedOutput[cleanedOutput.length - 2];
        const lastChar = cleanedOutput[cleanedOutput.length - 1];

        // HELPER FUNCTION
        const replaceAt = function(index, replacement, str) {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        }

        // ============================= //
        //   BLOCK: Too many characters  //
        // ============================= //
        if (calculatorOutput.length > 15){ return; };
        
        // ============================== //
        //   BLOCK: Doulbes Plus & Minus  //
        // ============================== //
        if (buttonValue === "+" || buttonValue === "-"){

            // check if the dice type was selected yet.
            if (lastChar === "d") {return};

            // stop plus and min before numbers are added.
            if (cleanedOutput === "0" && buttonValue === "+") {return};
            
            // is first number a negative number?
            if (cleanedOutput === "0" && buttonValue === "-"){
                updatecalculatorOutput("-");
            };
            
            // check if output is long enough to edit
            if(cleanedOutput.length > 2){
                
                if(buttonValue === lastMod){
                    cleanedOutput = cleanedOutput.slice(0, cleanedOutput.length - 3);
                    if (cleanedOutput === "") {cleanedOutput = "0"};
                    updatecalculatorOutput(cleanedOutput);
                    return;
                }

                switch (`${cleanedOutput[cleanedOutput.length - 2]}`) {
                    case "+" :
                        cleanedOutput = replaceAt(cleanedOutput.length - 2, buttonValue, cleanedOutput);
                        updatecalculatorOutput(cleanedOutput);
                        return;
                    case "-" :
                        cleanedOutput = replaceAt(cleanedOutput.length - 2, buttonValue, cleanedOutput);
                        updatecalculatorOutput(cleanedOutput);
                        return;
                    default:
                        break;
                }
            }
        };

        if (buttonValue === "d"){

            // remove the d if pressed twice
            if (lastChar === "d"){
                if (cleanedOutput === "d") {
                    cleanedOutput = "0";
                } else {
                    cleanedOutput = cleanedOutput.slice(0, cleanedOutput.length - 1);
                }
                updatecalculatorOutput(cleanedOutput);
            }

            if (calculatorOutput[calculatorOutput.length - 1] === "d")
            {
                // double d's detected!
                return;
            } else {
                // ==================== //
                //   BLOCK: Doulbes Ds  //
                // ==================== //
                if (calculatorOutput.indexOf("d") !== -1 && buttonValue === "d"){
                    let doubleDs = false;
                    for(let i = 0; i <calculatorOutput.length; i++){
                        // if the character is a - or a + then unflag. Flag if a d
                        if(calculatorOutput[i] === "d"){
                            doubleDs = true;
                        } else if (calculatorOutput[i] === "+" || calculatorOutput[i] === "-"){
                            doubleDs = false;
                        }
                    }
                    if (doubleDs === true) {return};
                };
            }
        }

        // Step 2: Create default output.
        let newOutput = calculatorOutput;

        // Step 3: Check if value is not a number.
        if (buttonValue === "+" || buttonValue === "-"){
            buttonValue = ` ${buttonValue} `;
        };

        // Step 4: If the current output is a 0 then return just the new output otherwise return concated version of both.
        if(calculatorOutput === "0"){
            newOutput = buttonValue;
        } else {
            newOutput = `${calculatorOutput}${buttonValue}`;
        }
        // return the new output.
        updatecalculatorOutput(newOutput);
    }

    const doRollCalculation = (e) => {
        e.preventDefault();

        
    }

    // ========== //
    //   RETURN   //
    // ========== //
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
                        <div id="output" className="output">{calculatorOutput}</div>
                        <div className="buttons">
                            <StyledCalcRow className="first_row">
                                <li onClick={addANumberToTheProblem}><p>7</p></li>
                                <li onClick={addANumberToTheProblem}><p>8</p></li>
                                <li onClick={addANumberToTheProblem}><p>9</p></li>
                                <li onClick={addANumberToTheProblem}><p>-</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="second_row">
                                <li onClick={addANumberToTheProblem}><p>4</p></li>
                                <li onClick={addANumberToTheProblem}><p>5</p></li>
                                <li onClick={addANumberToTheProblem}><p>6</p></li>
                                <li onClick={addANumberToTheProblem}><p>+</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="third_row">
                                <li onClick={addANumberToTheProblem}><p>1</p></li>
                                <li onClick={addANumberToTheProblem}><p>2</p></li>
                                <li onClick={addANumberToTheProblem}><p>3</p></li>
                                <li onClick={clearCalculatorField}><p>c</p></li>
                            </StyledCalcRow>
                            <StyledCalcRow className="fourth_row">
                                <li onClick={addANumberToTheProblem}><p>0</p></li>
                                <li onClick={addANumberToTheProblem}><p>d</p></li>
                                <li onClick={doRollCalculation}><p>=</p></li>
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

        p {
            user-select: none;
        }

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