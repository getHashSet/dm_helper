
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import * as S from '../../../styles/StyledElements';

// ============= //
//   COMPONENT   //
// ============= //
export default function ActionAttack(props) {
    // ======== //
    //   AMMO   //
    // ======== //
    const rolld = (diceValue, numberOfTimes = 1) => {
        let finalTotal = 0;
        for (let i = 0; i < numberOfTimes; i++) {
            finalTotal += Math.floor(Math.random() * diceValue) + 1;
        }
        return finalTotal;
    }

    const rollAmmo = () => {
        const weaponName = props.action.name.toLowerCase();
        switch (weaponName) {
            case "heavy crossbow":
                return rolld(12) - 1;
            case "shortbow":
                return rolld(4, 4);
            case "javelin":
                return rolld(8) - 1;
            case "longbow":
                return rolld(4, 4) + 4;
            case "hand crossbow":
                return rolld(4) + 1;
            case "light crossbow":
                return rolld(10) - 1;
            case "tail spike":
                return rolld(4, 6);
            case "net":
                return rolld(3);
            default:
                return 999;
        }
    }

    const ammoMsg = () => {
        const weaponName = props.action.name.toLowerCase();
        switch (weaponName) {
            case "heavy crossbow":
                return "Out of crossbow bolts";
            case "hand crossbow":
                return "Out of crossbow bolts";
            case "light crossbow":
                return "Out of crossbow bolts";
            case "shortbow":
                return "Out of arrows";
            case "longbow":
                return "Out of arrows";
            case "javelin":
                return "Out of javlins";
            case "tail spike":
                return "The Enemy has no more tail spikes left";
            case "net":
                return "Out of nets";
            default:
                return "Unable to use that right now.";
        }
    }

    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [chargesRemaining, updatechargesRemaining] = useState(rollAmmo());
    let damageFormula = "";
    let hitFormula = "";
    let nat20 = false;
    let nat1 = false;
    let damageRolls = [];
    let hitRolls = [];
    let unusedHitRoll = "";
    let totalNumberOfDice = 0;
    let diceType = "";
    const multipleAttacks = [];

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (jsx) => {
        dispatch(updateToastData(jsx)); // default parent is a div with flex turned on.
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
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
        let hitRoll = props.action.attack_bonus;

        // const STR = props.mods.STR_mod;
        // const DEX = props.mods.DEX_mod;

        // switch (props.action.damageMod?.toLowerCase()) {
        //     case "str":
        //         hitRoll += STR;
        //         break;
        //     case "dex":
        //         hitRoll += DEX;
        //         break;
        //     case "finesse":
        //         STR >= DEX? hitRoll += STR : hitRoll += DEX;
        //         break;
        //     default:
        //         break;
        // };

        hitFormula = `1d20 + ${hitRoll} to hit`;
        if (d20 === 20) { nat20 = true };
        if (d20 === 1) { nat1 = true };

        hitRoll += d20;

        return hitRoll;
    }

    const rollDamage = () => {
        let finalDamage = 0;

        if (!props.action.hasOwnProperty('damage')) {return 0};

        // how to deal with multiple damage types;
        let fightingStyle = undefined;
        if (props.action.damage.length < 1 || props.action.damage[0].hasOwnProperty("choose")) { // TODO this is bad if there is more than 2 attacks. update to a foreach.
            
            //if (props.action.attack_options === undefined) {return};

            if (props.action.hasOwnProperty('attack_options')) {
                multipleAttacks.push(props.action.attack_options.from[0].damage[0].damage_dice);
            } else {
                multipleAttacks.push(props.action.damage[0].from[0].damage_dice);
                multipleAttacks.push(props.action.damage[0].from[1].damage_dice);
            }
            fightingStyle = multipleAttacks[Math.floor(Math.random() * multipleAttacks.length)];
        };

        const uncleanedDamage = fightingStyle === undefined ? props.action.damage[0].damage_dice : fightingStyle; // 1d6 + 5

        const diceDamageArray = uncleanedDamage.replace(/ /g, "").split("+"); //["2d6", "10"];

        // Add this damage.
        const damageMod = diceDamageArray[1] === undefined ? 0 : diceDamageArray[1];
        const breakDiceString = diceDamageArray[0].split("d");
        let numberOfDice = +breakDiceString[0];
        diceType = +breakDiceString[1];
        totalNumberOfDice = numberOfDice;

        // console.log(`DiceType ${diceType}, Numberofdice: ${numberOfDice}`);

        if (nat20) { numberOfDice = numberOfDice * 2 };

        for (let i = 0; i < numberOfDice; i++) {
            const roll = Math.floor(Math.random() * diceType) + 1;
            finalDamage += roll;
            damageRolls.push(roll);
        };

        finalDamage += +damageMod;

        if (damageMod === 0 || damageMod === "0" || damageMod === undefined) {
            damageFormula = `${numberOfDice}d${diceType}`;
        } else {
            damageFormula = `${numberOfDice}d${diceType} + ${damageMod}`;
        };

        if (finalDamage < 1) { finalDamage = 1 };

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

    const rollDcAttack = () => {
        let thisDCRoll = Math.floor(Math.random() * 20) + 1;
        
        if (props.action.save.disadvantage) {
            const secondRoll = Math.floor(Math.random() * 20) + 1;
            thisDCRoll = thisDCRoll > secondRoll ? secondRoll : thisDCRoll;
        };

        let saveDc = thisDCRoll + props.action.save.save_bonus;

        if (saveDc < 5) {saveDc = 5};

        const toast = <S.Toast>
            <S.DiceRoll>
                <p>{props.action.save.instructions}</p>
                <h4>{saveDc}</h4>
                <p>{props.action.save.desc}</p>
            </S.DiceRoll>
        </S.Toast>
        updateToastHandler(toast);
    }

    const rollToHitAndDamage = () => {
       
        if (props.action?.damage?.length < 1 && props.action.dc === undefined) {
            const toastObject = <S.Toast>{props.action.desc}</S.Toast>;
            updateToastHandler(toastObject);
            return;
        };

        if (props.action.name.toLowerCase() === "multiattack") {
            updateToastHandler(<p className="multiattack">{props.action.desc}</p>);
            return;
        }

        if (chargesRemaining <= 0) {
            const msg = ammoMsg();
            props.action.emptyChargesMessage !== undefined
                ? updateToastHandler(<p>{props.action.emptyChargesMessage}</p>)
                : updateToastHandler(<p>{msg}</p>)
            return;
        };

        if (chargesRemaining !== undefined) {
            updatechargesRemaining(chargesRemaining - 1);
        };

        if (props.action.hasOwnProperty("save")) { rollDcAttack(); return; };

        if (props.action?.damage?.length < 1 || props.action?.damage[0]?.hasOwnProperty("choose")) {
            // TODO this is trying to catch multi attack
            
        } else if (props.action.damage[0]?.damage_dice === undefined) {
            updateToastHandler(props.action.desc);
            return;
        };

        let hitRoll = 0;
        if (props.action.dc !== undefined) {
            hitRoll = -1;
        } else if (props.action.damage.length < 1 && !props.action.damage.hasOwnProperty("choose")) {
            hitRoll = -1;
        } else {
            hitRoll = rollToHit();
        }

        const damageRoll = rollDamage();
        let hitRollText;

        if (nat20) {
            hitRollText = <React.Fragment><span>Nat 20!</span></React.Fragment>
        } else if (nat1) {
            hitRollText = <React.Fragment><span>Nat 1...</span></React.Fragment>
        } else if (hitRoll === 20 && !nat20) {
            hitRollText = <React.Fragment>Dirty<span>20</span></React.Fragment>;
        } else if (hitRoll === -1 && props.action.hasOwnProperty("dc")) {
            hitRollText = <span>{`DC: ${props.action.dc.dc_value}`}</span>;
        } else if (Number.isNaN(hitRoll) && multipleAttacks.length > 0) {

        } else if (Number.isNaN(hitRoll)) {
            hitRoll = 0;
        } else {
            hitRollText = <span>{hitRoll}</span>
        };

        const reactElement =
            <S.Toast>
                <S.DiceRoll>
                    <h4>{hitRollText}</h4>
                    <div className="totals">
                        {props.action.dc ? <p>{props.action.dc.dc_type.name} Save</p> : <p> To Hit: {hitRollText}</p>}
                        <p>Damage: <span>{damageRoll}</span></p>
                    </div>
                    {props.action.dc ? <p className="formula">{damageFormula} damage.</p> : <p className="formula"><span>{props.action.actionName} </span> {hitFormula}, {damageFormula} damage.</p>}
                    <p className="heading">Hit Roll</p>
                    {hitRolls.map((roll, index) => {
                        if (hitRolls[0] === hitRolls[1]) { return <p key={index} className={hitRolls[index] === unusedHitRoll ? "hit_dice formula" : "hit_dice formula"}>Hit roll 1d20: <span>{roll}</span></p> };
                        return <p key={index} className={hitRolls[index] === unusedHitRoll ? "hit_dice formula selectedRoll" : "hit_dice formula"}>Hit roll 1d20: <span>{roll}</span></p>
                    })}
                    <p className="heading">Damage Rolls</p>
                    {damageRolls.map((roll, index) => {
                        return <div key={index} className="roll" >
                            <p>
                                <span>{index + 1} of {totalNumberOfDice} </span> d{diceType}
                            </p>
                            <p>
                                {roll}
                            </p>
                        </div>
                    })}
                </S.DiceRoll>
            </S.Toast>
        updateToastHandler(reactElement);
        reset();
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledAction onClick={rollToHitAndDamage} chargesRemaining={chargesRemaining}>
            <div className="dice_box">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
                {chargesRemaining > 100 ? null : <p>{chargesRemaining}</p>}
            </div>
            <div className="info">
                <div className="title">
                    {props.action.name}
                </div>
                <div className="body">
                    <p>{props.action.desc}</p>
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
    opacity: ${props => props.chargesRemaining === null || props.chargesRemaining < 1 ? ".5" : "1"};

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
        background-color: #e74c3c;
        width: 100%;

        .title {
            padding: 4px;
            font-size: 1.2em;
            font-weight: 700;
            color: #fff;
            background-color: #e74c3c;
        }

        .body {
            padding: 2px 4px;
            font-size: .8em;
            font-weight: 400;
            font-family: 'Roboto Slab', serif;
            background-color: #fff;
            border-radius: .5em 0 0 0;

            p {
                line-height: 1.2em;
                margin: 0;
            }
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
            background-color: #c0392b;
            .title {
                background-color: #c0392b;
            }
        }
    }

    &:active {
        transform: translateY(3px);
    }
`;
