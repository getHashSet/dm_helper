// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import * as S from '../../../styles/StyledElements';
import ActionAttack from '../ActionAttack/ActionAttack';
import ActionPassive from '../ActionPassive/ActionPassive';
import ActionMagic from '../ActionMagic/ActionMagic';

// ========== //
//   EXPORT   //
// ========== //
export default function EnemyCard(props) {
    // ==================== //
    //   FAKE CONSTRUCTOR   //
    // ==================== //
    const getHp = (dice) => {
        // Edgecase: hit_dice may not be a thing.
        if (dice === undefined) { dice = "1d5" }

        let totalHp = 0;

        // check if someone put in an bad hit dice value by mistake
        if (dice.indexOf("d") === -1) {
            return isNaN(dice) ? totalHp : dice;
        };

        const diceRolls = dice.split("d"); // "2d10" === ["2", "10"]
        const numberOfDice = +diceRolls[0]; // (int)3
        const diceType = +diceRolls[1]; // (int)10

        // roll without con mod?
        for (let i = 0; i < numberOfDice; i++) {
            if (i === 0) { // first roll
                totalHp += diceType;
            } else { // not first roll
                totalHp += Math.floor(Math.random() * diceType) + 1;
            };
        };

        return totalHp;
    };

    // ======================== //
    //   HOOKS & REDUX: PART 1  //
    // ======================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [enemyHp, updateenemyHp] = useState(getHp(props.enemy.hitDice));
    const [maxHp] = useState(enemyHp);
    const [hasAdvantage, updatehasAdvatage] = useState(false);
    const [hasDisadvantage, updatehasDisadvantage] = useState(false);

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = data => {
        const toastData = <S.Toast>{data}</S.Toast>;
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    };

    const rollSavingThrow = (e) => {
        let statMod = 0;

        if (e.target.parentElement.getAttribute('data-mod') !== null) {
            statMod = e.target.parentElement.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else if (e.target.getAttribute('data-mod') !== null) {
            statMod = e.target.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else {
            statMod = 0;
        }

        // Edgecase check if statmod broke during our terible logic
        if (typeof (statMod) !== 'string' || statMod === undefined || statMod === 'ndefine') { statMod = 0 };

        const d20 = rolld20();

        let savingThrow = d20 + +statMod;

        console.log(`Mod: ${statMod} d20: ${d20}`);

        // Edgecases
        if (savingThrow === 20 && statMod > 0) { savingThrow = "Dirty 20" };
        if (savingThrow < 1 && d20 !== 1) { savingThrow = "Dirty 1"; };
        if (d20 === 20) { savingThrow = "Nat 20" };
        if (d20 === 1) { savingThrow = "Nat 1" };

        savingThrow = <StyledSavingThrow><h4>{savingThrow}</h4></StyledSavingThrow>;
        updateToastHandler(savingThrow);
    };

    const getStatMod = (stat) => {
        if (+stat > 9 && +stat < 12) { return };
        return `(${Math.floor((stat - 10) / 2)})`;
    };

    const getMod = (stat) => {

        if (+stat > 9 && +stat < 12) { return 0 };

        const uncleanedMod = getStatMod(stat);
        const mod = uncleanedMod.slice(1, uncleanedMod.length - 1); // remove string data
        return +mod;
    };

    const rollPlusMod = (stat) => {
        let mod = 0;
        mod = mod + +getMod(stat);
        return (Math.floor(Math.random() * 20) + 1) + mod;
    };

    const adjustHpButton = (e) => {
        e.preventDefault();

        // heal or damage?
        const type = e.target.getAttribute('name');
        let inputData = e.target.parentElement.parentElement.children[0].children[0].value;

        // Edgecase user didnt put in a value
        if (inputData === undefined || +inputData <= 0) { inputData = 1 };

        // current HP total
        let newHpTotal = +enemyHp;

        switch (type) {
            case "heal":
                newHpTotal = enemyHp + +inputData;
                if (newHpTotal > maxHp) { newHpTotal = maxHp };
                break;
            default:
                newHpTotal = enemyHp - +inputData;
                if (newHpTotal < 0) { newHpTotal = 0 };
                break;
        };

        e.target.parentElement.parentElement.children[0].children[0].value = "";
        updateenemyHp(newHpTotal);
    };

    const rolld20 = () => {
        const firstRoll = Math.floor(Math.random() * 20) + 1;

        if (hasAdvantage && hasDisadvantage) {
            updatehasDisadvantage(false);
            updatehasAdvatage(false);

            return firstRoll;
        };

        if (hasDisadvantage) {
            const secondRoll = Math.floor(Math.random() * 20) + 1;
            console.log(`rolling with disadvatage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? secondRoll : firstRoll;
            updatehasDisadvantage(false);
            return d20;
        };

        if (hasAdvantage) {
            const secondRoll = Math.floor(Math.random() * 20) + 1;
            console.log(`rolling with advantage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? firstRoll : secondRoll;
            updatehasAdvatage(false);

            return d20;
        };

        return firstRoll;
    }

    const buildMagic = (spell, index) => {

        // collect spell first

        return <ActionMagic
            key={index}
            spell={spell}
            hasDisadvantage={hasDisadvantage}
            disadvantageToggle={disadvantageToggle}
            hasAdvantage={hasAdvantage}
            advantageToggle={advantageToggle} />;
    }

    const buildAbility = (ability, index) => {
        return <ActionPassive
            key={index}
            special_ability={ability}
            hasDisadvantage={hasDisadvantage}
            disadvantageToggle={disadvantageToggle}
            hasAdvantage={hasAdvantage}
            advantageToggle={advantageToggle} />;
    };

    const buildAction = (action, index) => {
        return <ActionAttack
            key={index}
            action={action}
            hasDisadvantage={hasDisadvantage}
            disadvantageToggle={disadvantageToggle}
            hasAdvantage={hasAdvantage}
            advantageToggle={advantageToggle} />;
    };

    const advantageToggle = () => {

        if (hasDisadvantage) {
            updatehasDisadvantage(false);
        };
        updatehasAdvatage(!hasAdvantage);
    }

    const disadvantageToggle = () => {

        if (hasAdvantage) {
            updatehasAdvatage(false);
        };
        updatehasDisadvantage(!hasDisadvantage);
    }

    // ================ //
    //   HOOKS: PART 2  //
    // ================ //
    // because of a rookie mistake that I cant be bothered to fix Im just going to put this hook here.
    const [initiative] = useState(rollPlusMod(props.enemy.stats.DEX));

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledCard hasAdvantage={hasAdvantage} hasDisadvantage={hasDisadvantage} enemyHp={enemyHp}>

            {/* Enemy Name */}
            <div className="card_name">
                <h3>{props.enemy.enemyName}</h3>
                <div className="toggle" ></div>
            </div>

            {/* AC HP IN */}
            <StyledAcHpIn>
                <div className="top_section">
                    {/* AC */}
                    <div className="info_block" title="Armor Class">
                        <div className="background"></div>
                        <div className="info">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shield-alt" className="svg-inline--fa fa-shield-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"></path></svg>
                            {props.enemy.ac ? props.enemy.ac : 10}
                        </div>
                    </div>
                    {/* HP */}
                    <div className="info_block" title="Hit Points">
                        <div className="background"></div>
                        <div className="info">
                            <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'><title>Heart</title><path d='M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z' /></svg>
                            {enemyHp} / {maxHp}
                        </div>
                    </div>
                    {/* IN */}
                    <div className="info_block" title="Initiative Roll">
                        <div className="background"></div>
                        <div className="info">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" className="svg-inline--fa fa-stopwatch fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg>
                            {initiative}
                        </div>
                    </div>
                </div>
                <div className="bottom_section">
                    <div className="update_hp">
                        <div className="left">
                            <input className="adjustHpBy" type="number" name="adjustHpBy" />
                        </div>
                        <div className="right">
                            <p className="damage_heal_buttons" name="damage" onClick={adjustHpButton}>
                                Damage
                            </p>
                            <p className="damage_heal_buttons" name="heal" onClick={adjustHpButton}>
                                Heal
                            </p>
                        </div>
                    </div>
                </div>
            </StyledAcHpIn>

            {/* STATS */}
            <ul className="stats">

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.STR)}`}
                    onClick={rollSavingThrow}>
                    STR
                    <span>{props.enemy.stats.STR}{getStatMod(props.enemy.stats.STR)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.DEX)}`}
                    onClick={rollSavingThrow}>
                    DEX <span>{props.enemy.stats.DEX}{getStatMod(props.enemy.stats.DEX)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.CON)}`}
                    onClick={rollSavingThrow}>
                    CON <span>{props.enemy.stats.CON}{getStatMod(props.enemy.stats.CON)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.INT)}`}
                    onClick={rollSavingThrow}>
                    INT <span>{props.enemy.stats.INT}{getStatMod(props.enemy.stats.INT)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.WIS)}`}
                    onClick={rollSavingThrow}>
                    WIS <span>{props.enemy.stats.WIS}{getStatMod(props.enemy.stats.WIS)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.enemy.stats.CHA)}`}
                    onClick={rollSavingThrow}>
                    CHA <span>{props.enemy.stats.CHA}{getStatMod(props.enemy.stats.CHA)}</span>
                </li>
            </ul>

            {/* COMBAT ACTIONS */}
            <div className="toggles">
                <div className="advantage" onClick={advantageToggle}>
                    <div className="toggle"></div>
                    <h4>Advantage</h4>
                </div>
                <div className="disadvantage" onClick={disadvantageToggle}>
                    <div className="toggle_disadvantage"></div>
                    <h4>Disadvantage</h4>
                </div>
            </div>

            <div className="actions scrolling">
                {props.enemy.hasOwnProperty('actions') ? props.enemy.actions.map((action, index) => buildAction(action, index)) : console.log("enemy has no actions.")}
                {props.enemy.hasOwnProperty('special_abilities') ? props.enemy.special_abilities.length > 0 ? props.enemy.special_abilities.map((ability, index) => buildAbility(ability, index)) : null : null}
                {props.enemy.spell_caster ? props.enemy.spells.map((spell, index) => buildMagic(spell, index)) : null}

            </div>
        </StyledCard>
    )
}
// ========= //
//   STYLE   //
// ========= //
const StyledCard = styled.article`
    width: 30%;
    min-width: 350px;
    max-height: 90vh;
    max-width: 50%;
    flex-grow: 1;
    margin: .5em;
    overflow: hidden;
    background-color: #fff;
    border: 2px solid #636e72;
    border-radius: .5em;
    color:#2d3436;
    opacity: ${props => props.enemyHp <= 0 ? ".3" : "1"};
    transition: opacity .3s;

    .card_name {
        flex-grow: 1;
        background-color: #636e72;
        font-weight: 900;
        padding: .5em 1em;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h3 {
            font-size: 2em;
            color: #fff;
        }
    }

    .stats {
        margin-top: .5em;
        border-top: 1px solid #bdc3c7;
        border-bottom: 1px solid #bdc3c7;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;

        li {
            text-align: center;
            padding: .5em;
            font-size: .8em;
            font-weight: 900;
            text-transform: uppercase;
            user-select: none;

            span {
                margin-top: 2px;
                display: block;
                font-weight: 400;
            }

            &:hover {
                cursor: pointer;
                color: ${props => props.theme.color.red};
            }

            &:active {
                transform: translateY(3px);
            }
        }
    }

    .spell_slots {
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            padding: 4px;
            margin: 4px;
        }
    }

    .actions {
        margin: 0 .5em .5em .5em;
        height: 35vh;
        border: 1px solid #bdc3c7;
        border-radius: .5em;
        background-color: #ecf0f1;
        overflow: auto;
        overflow-x: hidden;

        &.scrolling {
            border-radius: .5em 0 0 .5em;
        }

        &::-webkit-scrollbar {
            width: 5px;
            height: 80%;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        &::-webkit-scrollbar-track {
            background-color: #bdc3c7;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: #7f8c8d;
        }

        @media (max-width: ${props => props.theme.breakpoint.mobile}) {
            height: auto;
            max-height: 40vh;
        }
    }

    .toggles {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        font-size: .8em;
        user-select: none;
        color: ${props => props.theme.color.red};

        h4 {
            font-weight: 400;
        }

        .advantage,
        .disadvantage {
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;
            justify-content: center;
            align-items: center;

            .toggle,
            .toggle_disadvantage {
                margin: .5em;
                width: 1em;
                height: 1em;
                border: 3px solid ${props => props.theme.color.red};
                border-radius: 4px;
            }

            &:first-child {
                border-right: 1px solid #bdc3c7;
            }

            &:hover {
                cursor: pointer;
            }
        }

        .advantage {
            .toggle {
                background-color: ${props => props.hasAdvantage ? props.theme.color.red : "#fff"};
            }
        }

        .disadvantage {
            .toggle_disadvantage {
                background-color: ${props => props.hasDisadvantage ? props.theme.color.red : "#fff"};
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        max-width: 400px;
        min-width: 0px;
    }
`;

// ============ //
//   AC HP IN   //
// ============ //
const StyledAcHpIn = styled.section`
    
    .top_section {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #b2bec3;
        margin-bottom: .5em;

        .info_block {
            position: relative;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            user-select: none;

            .info {
                padding: .5em 0;
                font-size: 1.5em;
                font-weight: 700;
                margin: 0;

                svg {
                    margin-bottom: -4px;
                    width: 100%;
                    height: 100%;
                    max-width: 1em;
                    max-height: 1em;
                }
            }

            &:nth-child(2) {
                font-size: 1.5em;
            }

            &:first-child {
                font-size: .8em;
                width: 20%;
                flex-grow: 1;
                border-right: 1px solid #bdc3c7;
                
                svg {
                    margin: 0 .2em -2px 0;
                }
            }

            &:last-child {
                font-size: .8em;
                width: 20%;
                flex-grow: 1;
                border-left: 1px solid #bdc3c7;

                svg {
                    margin: 0 .2em -2px 0;
                }
            }
        }
    }

    .bottom_section {
        height: auto;
        transition: max-height .3s;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;

        .update_hp {
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;

            .left,
            .right {
                width: 50%;
                flex-grow: 1;
                display: flex;
                align-items: center;
                color: #2d3436;
            }

            .left {
                border-right: 1px solid #bdc3c7;
            }

            .right {
                justify-content: space-around;
                text-transform: uppercase;
                font-weight: 900;
            }
        }

        input {
            text-align: center;
            width: 100%;
            height: 1.5em;
            font-size: 1.5em;
            margin: 0 .5em;
            color: #2d3436;
            border: 1px solid #bdc3c7;
            background-image:none;
            background-color:transparent;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;

            &:focus {
                outline: none;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }
        }

        .damage_heal_buttons {
            text-align: center;
            user-select: none;
            font-family: ${props => props.theme.font.title};
            font-weight: 900;
            font-size: 1.2em;

            &:hover {
                cursor: pointer;
                color: ${props => props.theme.color.red};
            }

            &:active {
                transform: translateY(2px);
            }
        }
    }
`;

// ========= //
//   TOAST   //
// ========= //
const StyledSavingThrow = styled.section`
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #2d3436;
    background-color: #fff;
    padding: 2em .5em;

    h4 {
        font-weight: 900;
        font-size: 3em;
    }
`;
