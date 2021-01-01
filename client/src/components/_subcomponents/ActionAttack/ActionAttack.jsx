import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";

// ========= //
//   PROPS   //
// ========= //
ActionAttack.defaultProps = {
    action: {
        type: "attack", // attack, item, spell
        actionType: "action", // action, bonus action, passive, reaction.
        actionName: "Battle Axe",
        hitMod : 5,
        damageMod : "None", // number - or - "str", "dex" - or - "finess"
        damageDice: "1d6",
        description: `Attack is +5 to hit to deal 1d6 + 3 damage.`,
        charges : 999,
        emptyChargesMessage: "You no longer have a Battle Axe... you threw it.",
        sideAffect : "",
    },
    mods: {
        STR: 10,
        STR_mod: 0,
        DEX: 10,
        DEX_mod: 0,
    }
};

// ============= //
//   COMPONENT   //
// ============= //
export default function ActionAttack(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [chargesRemaining, updatechargesRemaining] = useState(props.action.charges);
    let damageFormula = "";
    let hitFormula = "";
    let nat20 = false;
    let nat1 = false;
    let damageRolls = [];
    let hitRolls = [];
    let unusedHitRoll = "";
    let totalNumberOfDice = 0;

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <StyledToast>
            {str}
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(html)); // default parent is a div with flex turned on.
    };

    const rolld20 = () => {
        const firstRoll = Math.floor(Math.random() * 20) + 1;
        hitRolls.push(firstRoll);

        if (props.hasAdvantage && props.hasDisadvantage) {
            props.disadvantageToggle(false);
            props.advantageToggle(false);

            return firstRoll;
        };

        if (props.hasDisadvantage) {
            const secondRoll = Math.floor(Math.random() * 20) + 1;
            hitRolls.push(secondRoll);
            console.log(`rolling with disadvatage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? secondRoll : firstRoll;
            unusedHitRoll = firstRoll < secondRoll ? secondRoll : firstRoll;
            props.disadvantageToggle(false);
            return d20;
        };

        if (props.hasAdvantage) {
            const secondRoll = Math.floor(Math.random() * 20) + 1;
            hitRolls.push(secondRoll);
            console.log(`rolling with advantage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? firstRoll : secondRoll;
            unusedHitRoll = firstRoll < secondRoll ? firstRoll : secondRoll;
            props.advantageToggle(false);
            
            return d20;
        };

        return firstRoll;
    }

    const rollToHit = () => {
        let d20 = rolld20();
        let hitRoll = 0;
        hitRoll += 2;

        const STR = props.mods.STR_mod;
        const DEX = props.mods.DEX_mod;

        switch (props.action.damageMod?.toLowerCase()) {
            case "str":
                hitRoll += STR;
                break;
            case "dex":
                hitRoll += DEX;
                break;
            case "finesse":
                STR >= DEX? hitRoll += STR : hitRoll += DEX;
                break;
            default:
                break;
        };

        hitFormula = `1d20 + ${hitRoll} to hit`;
        if (d20 === 20) { nat20 = true };
        if (d20 === 1) { nat1 = true };

        hitRoll += d20;

        return hitRoll;
    }

    const rollDamage = () => {
        let finalDamage = 0;

        let damageMod = 0;
        const STR = +props.mods.STR_mod;
        const DEX = +props.mods.DEX_mod;

        switch (props.action.damageMod.toLowerCase()) {
            case "str":
                damageMod = STR;
                break;
            case "dex":
                damageMod = DEX;
                break;
            case "finesse":
                STR >= DEX? damageMod = STR : damageMod = DEX;
                break;
            default:
                break;
        };

        const breakDiceString = props.action.damageDice.split("d");
        const numberOfDice = +breakDiceString[0];
        const diceType = +breakDiceString[1];
        totalNumberOfDice = numberOfDice;

        for(let i = 0; i < numberOfDice; i++) {
            const roll = Math.floor( Math.random() * diceType ) + 1;
            finalDamage += roll;
            damageRolls.push(roll);
        };
        
        finalDamage += +damageMod;
        
        damageFormula = `${numberOfDice}d${diceType} + ${damageMod}`;
        if (finalDamage < 1) {finalDamage = 1};

        return finalDamage;
    };

    const reset = () => {
        nat1 = false;
        nat20 = false;
        damageRolls = [];
        hitRolls = [];
        totalNumberOfDice = 0;
        unusedHitRoll = "";
    }

    const rollToHitAndDamage = () => {

        // Disabled
        if (chargesRemaining <= 0) {
            props.action.emptyChargesMessage !== undefined 
            ? updateToastMenu(<p>{props.action.emptyChargesMessage}</p>)
            : updateToastMenu(<p>You cant use that Action right now.</p>)
            return;
        };

        if (chargesRemaining !== undefined) {
            updatechargesRemaining(chargesRemaining - 1);
        };

        const hitRoll = rollToHit();
        const damageRoll = rollDamage();
        let hitRollText;

        if (nat20) {
            hitRollText = <p><span>Nat 20!</span></p>
        } else if (nat1) {
            hitRollText = <p><span>Nat 1...</span></p>
        } else if (hitRoll === 20 && !nat20) {
            hitRollText = <p>Dirty<span>20</span></p>
        } else {
            hitRollText = <span>{hitRoll}</span>
        };

        const reactElement =
            <StyledToast>
                <h4>{hitRollText} to hit</h4>
                <div className="totals">
                    <p> Hit Roll: {hitRollText}</p>
                    <p>Damage Roll: <span>{damageRoll}</span></p>
                </div>
                <p className="formula"><span>{props.action.actionName}: </span> {hitFormula}, {damageFormula} damage.</p>
                <p className="heading">Hit Roll</p>
                {hitRolls.map((roll, index) => {
                    if (hitRolls[0] === hitRolls[1]) {return <p className={hitRolls[index] === unusedHitRoll ? "hit_dice formula" : "hit_dice formula"}>Hit roll 1d20: <span>{roll}</span></p>};
                    return <p className={hitRolls[index] === unusedHitRoll ? "hit_dice formula selectedRoll" : "hit_dice formula"}>Hit roll 1d20: <span>{roll}</span></p>
                })}
                <p className="heading">Damage Rolls</p>
                {damageRolls.map((roll, index) => {
                    return <div className="roll" >
                        <p>
                            <span>{index + 1} of {totalNumberOfDice} </span> {props.action.damageDice}
                        </p>
                        <p>
                            {roll}
                        </p>
                        </div>
                })}
            </StyledToast>
        updateToastMenu(reactElement);
        reset();
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledAction onClick={rollToHitAndDamage} chargesRemaining={chargesRemaining}>
            <div className="dice_box">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
                {chargesRemaining < 100 ? <p>{chargesRemaining}</p> : ""}
            </div>
            <div className="info">
                <div className="title">
                    {props.action.actionName}
                </div>
                <div className="body">
                    <p>{props.action.description}</p>
                </div>
            </div>
        </StyledAction>
    )
}

// ========== //
//   STYLES   //
// ========== //
const StyledAction = styled.div`
    display: flex;
    background-color: #fff;
    color: #2d3436;
    margin: .5em;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
    user-select: none;
    opacity: ${props => props.chargesRemaining === null || props.chargesRemaining <= 0 ? ".5" : "1"};

    .dice_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: .5em;
        width: 2em;
        overflow: hidden;
        user-select: none;
        background-color: #e74c3c;
        color: #fff;

        svg {
            width: 1em;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
        }

        p {
            text-align: center;
            width: 100%;
        }
    }

    .info {
        width: 100%;

        .title {
            padding: 4px;
            border-bottom: 1px solid #bdc3c7;
            font-size: 1.2em;
            font-weight: 700;
            color: #fff;
            background-color: #e74c3c;
        }

        .body {
            padding: 4px;
            font-size: .8em;
            font-weight: 400;
        }
    }

    &:hover {
        cursor: pointer;
        border: 1px solid #c0392b;
        box-shadow: 0 0 1px #c0392b;

        .dice_box {
            background-color: #c0392b;
        }

        .info {
            .title {
                background-color: #c0392b;
            }
        }
    }

    &:active {
        transform: translateY(3px);
    }
`; 

// ========= //
//   TOAST   //
// ========= //
const StyledToast = styled.section`
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #2d3436;

    h4 {
        padding: 1em;
        font-weight: 900;
        font-size: 4em;
    }

    .heading {
        width: 100%;
        padding: .5em 0 .3em 0;
        font-weight: 400;
        font-size: .8em;
        color: #7f8c8d;
    }

    .roll { //div
        display: flex;
        margin: 0;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #bdc3c7;

        p {
            width: 50%;
            padding: .3em;
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;

            &:first-child {
                border-right: 1px solid #bdc3c7;
                font-weight: 400;

                span {
                    padding-right: .5em;
                    font-size: .8em;
                    font-style: italic;
                    color: #7f8c8d;
                }
            }
        }
    }

    .formula {
        padding: 1em;
        border: 1px solid #bdc3c7;
        font-weight: 400;
        font-style: italic;

        span {
            font-weight: 600;
            font-style: normal;
        }

        &.selectedRoll {
            opacity: .5;
        }
    }

    .hit_dice {
        &:last-child {
            border-top: none;
        }
    }

    .totals {
        font-weight: 400;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 8px 8px 0 0;
        border: 1px solid #bdc3c7;
        border-bottom: none;

        p {
            display: flex;
            flex-grow: 1;
            justify-content: center;
            padding: .5em;
            margin-bottom: 0;
            width: 50%;

            span {
                font-weight: 600;
                padding: 0 .2em;
            }

            &:first-child {
                border-right: 1px solid #bdc3c7;
            }
        }
    }
`;