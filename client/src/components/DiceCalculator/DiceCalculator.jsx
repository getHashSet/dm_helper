import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import styled from 'styled-components';

RollToHit.defaultProps = {}

export default function RollToHit() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [calculatorOutput, updatecalculatorOutput] = useState("0");
    const dispatch = useDispatch();

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
        if (calculatorOutput.length > 20){ return; };
        
        // ============================== //
        //   BLOCK: Doulbes Plus & Minus  //
        // ============================== //
        if (buttonValue === "+" || buttonValue === "-"){

            // check if the dice type was selected yet.
            if (lastChar === "d") {return};

            // stop plus and min before numbers are added.
            if (cleanedOutput === "0" && buttonValue === "+") {return};
            
            // is first number a negative number?
            if (cleanedOutput === "0" && buttonValue === "-") {
                updatecalculatorOutput("-");
            };
            
            // check if output is long enough to edit
            if(cleanedOutput.length > 2) {
                
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

    const rollRandomNumber = (max = 1, min = 1) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return randomNumber.toString();
    }

    const quickRoll = (max, min) => {
        let d20 = rollRandomNumber(20);

        if(d20 === "20"){
            d20 = "Nat 20!"
        } else if (d20 === "1") {
            d20 = "Nat 1..."
        };

        updateToastMenu(d20);
    }

    const doRollCalculation = (e) => {
        e.preventDefault();
        console.log("-- Start of Roll --");

        let cleanedOutput = calculatorOutput;
        let arrayOfChaos = [];
        let finalValue = "";

        // Step 0: check for d at the end of the line
        if(cleanedOutput[cleanedOutput.length - 1] === "d") {
            const removingD = cleanedOutput.length - 1;
            cleanedOutput = cleanedOutput.slice(0, +removingD)
        };

        // Step 1: check if value is just 0;
        if (cleanedOutput === "0") {return};

        // Step 2: slice string into parts using the white spaces;
        if (cleanedOutput.indexOf(" ") !== -1) {
            arrayOfChaos = cleanedOutput.split(" ");
        } else {
            arrayOfChaos.push(calculatorOutput);
        }

        // Step 3: roll the dice in array of chaos.
        // arrayOfChaos = ["d20", "+", "d12"];
        for (let i = 0; i < arrayOfChaos.length; i++) {
            let currentValue = arrayOfChaos[i];
            if (currentValue.indexOf("d") !== -1 ){
                // Edgecase: if the last character is a d without a dice number after it.
                if (currentValue === "d" || currentValue === "d0" || currentValue[0] === "0"){currentValue = ``};
                if (currentValue[0] === "d"){currentValue = `1${currentValue}`};
                let newArrayOfNumbers = currentValue[0] === "d" ? [currentValue] : currentValue.split("d");
                let allTheRolls = [];

                if(newArrayOfNumbers.length > 1){
                    let returnvalue = 0;
                    // ["2", "10"];
                    for(let j = 0; j < newArrayOfNumbers[0]; j++) {
                        let randomlyRolledNumber = rollRandomNumber(newArrayOfNumbers[1]);
                        returnvalue = +returnvalue + +randomlyRolledNumber;
                        arrayOfChaos[i] = returnvalue;
                        allTheRolls.push(randomlyRolledNumber);
                    }
                    console.log(`d${newArrayOfNumbers[1]} Rolls in order: ${allTheRolls}`);
                } else {
                    arrayOfChaos[i] = newArrayOfNumbers[0];
                }
            }
        }

        let addOrSubtractBool = "add";
        arrayOfChaos.forEach(value => {

            if (value === "+" || value === "-") {
                switch (value) {
                    case "+":
                        addOrSubtractBool = "add";
                    break;
                    case "-":
                        addOrSubtractBool = "subtract";
                    break;
                }
            } else {
                if (addOrSubtractBool === "add"){
                    finalValue = `${+finalValue + +value}`; 
                } else if (addOrSubtractBool === "subtract"){
                    finalValue = `${+finalValue - +value}`; 
                }
            }
        });

        // Edge Case: Negative Numbers
        if (finalValue < 0) {finalValue = 0};
        updateToastMenu(finalValue)
        console.log("-- End of Roll --");
    }

    const updateToastMenu = (str) => {
        // removed. needs to be a prop now updatetoastMenuText(str);
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(str)); // default parent is a div with flex turned on.
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <React.Fragment>
            <StyledSection>
                <StyledFrame>
                    <h2>Dice Calculator</h2>
                    <StyledButton onClick={() => {quickRoll(20)}}>d20</StyledButton>
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
                                    <li onClick={doRollCalculation}>
                                        <p>
                                            <svg 
                                                aria-hidden="true" 
                                                focusable="false" 
                                                data-prefix="fas" 
                                                data-icon="dice-d20" 
                                                className="svg-inline--fa fa-dice-d20 fa-w-15" 
                                                role="img" xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 480 512">
                                                <path fill="currentColor" 
                                                    d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z">
                                                </path>
                                            </svg>
                                        </p>
                                    </li>
                                </StyledCalcRow>
                            </div>
                            <div className="other_options"></div>
                        </div>
                    </STyledDiceCalculator>
                </StyledFrame>
            </StyledSection>
        </React.Fragment>
    )
}

// ============ //
//   DICE BOX   //
// ============ //
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
            svg {    
                min-width: 1em;
            }
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

        @media (max-width: 768px) {
            &:hover {
                background-color: #2980b9;
            };

            &:active {
                background-color: #3498db;
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