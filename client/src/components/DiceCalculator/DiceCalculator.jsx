import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_caret_left, svg_d20 } from '../../styles';
import { StyledDiceRoll, StyledToast } from '../../styles/StyledElements';


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
        if (e.target.children[0] != null) {
            buttonValue = e.target.children[0].textContent;
        } else {
            buttonValue = e.target.textContent;
        }

        // HELPER VARs
        let cleanedOutput = calculatorOutput;
        const lastMod = cleanedOutput[cleanedOutput.length - 2];
        const lastChar = cleanedOutput[cleanedOutput.length - 1];

        // HELPER FUNCTION
        const replaceAt = function (index, replacement, str) {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        }

        // ============================= //
        //   BLOCK: Too many characters  //
        // ============================= //
        if (calculatorOutput.length > 20) { return; };

        // ============================== //
        //   BLOCK: Doulbes Plus & Minus  //
        // ============================== //
        if (buttonValue === "+" || buttonValue === "-") {

            // check if the dice type was selected yet.
            if (lastChar === "d") { return };

            // stop plus and min before numbers are added.
            if (cleanedOutput === "0" && buttonValue === "+") { return };

            // is first number a negative number?
            if (cleanedOutput === "0" && buttonValue === "-") {
                updatecalculatorOutput("-");
            };

            // check if output is long enough to edit
            if (cleanedOutput.length > 2) {

                if (buttonValue === lastMod) {
                    cleanedOutput = cleanedOutput.slice(0, cleanedOutput.length - 3);
                    if (cleanedOutput === "") { cleanedOutput = "0" };
                    updatecalculatorOutput(cleanedOutput);
                    return;
                }

                switch (`${cleanedOutput[cleanedOutput.length - 2]}`) {
                    case "+":
                        cleanedOutput = replaceAt(cleanedOutput.length - 2, buttonValue, cleanedOutput);
                        updatecalculatorOutput(cleanedOutput);
                        return;
                    case "-":
                        cleanedOutput = replaceAt(cleanedOutput.length - 2, buttonValue, cleanedOutput);
                        updatecalculatorOutput(cleanedOutput);
                        return;
                    default:
                        break;
                }
            }
        };

        if (buttonValue === "d") {

            // remove the d if pressed twice
            if (lastChar === "d") {
                if (cleanedOutput === "d") {
                    cleanedOutput = "0";
                } else {
                    cleanedOutput = cleanedOutput.slice(0, cleanedOutput.length - 1);
                }
                updatecalculatorOutput(cleanedOutput);
            }

            if (calculatorOutput[calculatorOutput.length - 1] === "d") {
                // double d's detected!
                return;
            } else {
                // ==================== //
                //   BLOCK: Doulbes Ds  //
                // ==================== //
                if (calculatorOutput.indexOf("d") !== -1 && buttonValue === "d") {
                    let doubleDs = false;
                    for (let i = 0; i < calculatorOutput.length; i++) {
                        // if the character is a - or a + then unflag. Flag if a d
                        if (calculatorOutput[i] === "d") {
                            doubleDs = true;
                        } else if (calculatorOutput[i] === "+" || calculatorOutput[i] === "-") {
                            doubleDs = false;
                        }
                    }
                    if (doubleDs === true) { return };
                };
            }
        }

        // Step 2: Create default output.
        let newOutput = calculatorOutput;

        // Step 3: Check if value is not a number.
        if (buttonValue === "+" || buttonValue === "-") {
            buttonValue = ` ${buttonValue} `;
        };

        // Step 4: If the current output is a 0 then return just the new output otherwise return concated version of both.
        if (calculatorOutput === "0") {
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

    const doRollCalculation = (e) => {
        e.preventDefault();

        let cleanedOutput = calculatorOutput;
        let arrayOfChaos = [];
        let allTheRolls = [];
        let cleanedDiceRolls = [];
        let finalValue = "";

        // Step 0: check for d at the end of the line
        if (cleanedOutput[cleanedOutput.length - 1] === "d") {
            const removingD = cleanedOutput.length - 1;
            cleanedOutput = cleanedOutput.slice(0, +removingD)
        };

        // Step 1: check if value is just 0;
        if (cleanedOutput === "0") { return };

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

            // check if its a dice or a whole number.
            if (currentValue.indexOf("d") !== -1) {
                // Edgecase: if the last character is a d without a dice number after it.
                if (currentValue === "d" || currentValue === "d0" || currentValue[0] === "0") { currentValue = `` };

                // Edgecase: If number of dice are not defined then make it just 1.
                if (currentValue[0] === "d") { currentValue = `1${currentValue}` };

                // Edgecase: if somehow the first value is still a "d" then split it anyway.
                let newArrayOfNumbers = currentValue[0] === "d" ? [currentValue] : currentValue.split("d");

                // Edgecase: There should be 2 numbers in the array. Lets filter to make sure.
                // example: 3d8 = [3, 8];
                // example: 1d12 = [1, 12];
                // If we dont match that pattern then just store the value we have instead. Dont math it.
                if (newArrayOfNumbers.length > 1) {
                    let rollResultTotal = 0; // default value being returned will be 0.

                    // we only care about the first 2 values in the array. Anything else is bad data.
                    const numberOfDice = newArrayOfNumbers[0];
                    const diceType = newArrayOfNumbers[1];

                    for (let j = 0; j < numberOfDice; j++) {
                        // roll the dice!
                        const randomlyRolledNumber = rollRandomNumber(diceType);

                        // To Dislay: clean the dice type and value from the roll.
                        // Should look something like this {type: "d10", roll: "8", 1 of 10}.
                        const cleanedDiceValue = {
                            type: `d${diceType}`,
                            roll: `${randomlyRolledNumber}`,
                            index: `${j + 1}`,
                            totalRolls: `${numberOfDice}`,
                        };

                        // add the cleaned object to our array so that we can display it all nice.
                        cleanedDiceRolls.push(cleanedDiceValue);

                        // add the roll to the running total.
                        rollResultTotal = +rollResultTotal + +randomlyRolledNumber;

                        // replace the value in arrayOfChaos with the now rolled dice value.
                        arrayOfChaos[i] = rollResultTotal;

                        // add it to the nonclean running total array.
                        allTheRolls.push(randomlyRolledNumber);
                    }
                } else {
                    // this will catch + - x / and errors.
                    arrayOfChaos[i] = newArrayOfNumbers[0];
                }
            }
        }

        // Next Step: Now that we have our totals we can do stuff with them.
        // Flag: are we adding or subtracting the prev value to the next value.
        let addOrSubtractBool = "add";

        // 
        arrayOfChaos.forEach(value => {

            if (value === "+" || value === "-") {
                switch (value) {
                    case "+":
                        addOrSubtractBool = "add";
                        break;
                    case "-":
                        addOrSubtractBool = "subtract";
                        break;
                    default:
                        addOrSubtractBool = "add";
                }
            } else {
                if (addOrSubtractBool === "add") {
                    finalValue = `${+finalValue + +value}`;
                } else if (addOrSubtractBool === "subtract") {
                    finalValue = `${+finalValue - +value}`;
                }
            }
        });

        // Step 8: check final value;
        if (finalValue < 0) { finalValue = 0 };

        // Step 9: Stage DOM elements inside a fragment

        // ===== //
        // TOAST //
        // ===== //
        const toast =
            <StyledToast>
                <StyledDiceRoll>
                    <h4>{finalValue}</h4>

                    <h3>{calculatorOutput}</h3>

                    <div className={`overflow expand`}>
                        {cleanedDiceRolls.map((diceRollObject, index) => <div key={index}><p><span>{diceRollObject.index} of {diceRollObject.totalRolls}</span> {diceRollObject.type}</p> <p className="the_roll">({diceRollObject.roll})</p></div>)}
                    </div>
                </StyledDiceRoll>
            </StyledToast>;

        // Edge Case: Negative Numbers
        updateToastHandler(toast)
    }

    const updateToastHandler = data => {
        const toastData = <StyledToast>{data}</StyledToast>;
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    };

    const backspace = () => {
        if (calculatorOutput.length === 1) { updatecalculatorOutput("0"); return; }

        if (calculatorOutput[calculatorOutput.length - 1] === " ") {
            updatecalculatorOutput(calculatorOutput.slice(0, calculatorOutput.length - 3));
        } else {
            updatecalculatorOutput(calculatorOutput.slice(0, calculatorOutput.length - 1));
        };

        if (calculatorOutput.length <= 0
            || calculatorOutput === " -"
            || calculatorOutput === " +"
            || calculatorOutput === " + "
            || calculatorOutput === " - ") {
            updatecalculatorOutput("0");
        };
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledSection>
            <StyledFrame>
                <STyledDiceCalculator>
                    <div className="frame">
                        <div id="output" className="output">
                            <div className="mathFormula">{calculatorOutput}</div>
                            <div onClick={backspace} className="backspace">
                                {svg_caret_left}    
                            </div>
                        </div>
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
                                        {svg_d20}
                                    </p>
                                </li>
                            </StyledCalcRow>
                        </div>
                        <div className="other_options"></div>
                    </div>
                </STyledDiceCalculator>

            </StyledFrame>
        </StyledSection>
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
        min-height: 10vh;
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
    margin: 0;
    padding: 0;
    max-width: 500px;

    h2 {
        font-size: 2em;
        font-weight: 800;
        margin-bottom: 1em;
        user-select: none;

        svg {
            height: 1em;
            max-height: 1em;
            max-height: 1em;
            padding: 0 .5em 0 0;
            margin-bottom: -4px;
        }
    }
`

const STyledDiceCalculator = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;

    .frame {
        background-color: #dfe6e9;
        font-size: 1.5em;
        width: 100vw;
        display: flex;
        flex-wrap:  wrap;

        .output {
            font-size: 1.5em;
            width: 100%;
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;

            .mathFormula {
                padding: .5em;
            }

            .backspace {
                width: 10%;
                background-color: #ff9f43;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                user-select: none;

                svg {
                    width: 1em;
                    height: 1em;
                    max-width: 100%;
                    max-height: 100%;
                }

                &:hover {
                    cursor: pointer;
                    background-color: #e67e22;
                }

                &:active svg {
                    transform: translateY(2px);
                }
            }
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
    color: #2d3436;
    min-height: 30vh;
    height: 100%;
    max-width: 100%;
    background-color: #dfe4ea;
    display: flex;
    justify-content: center;
`;