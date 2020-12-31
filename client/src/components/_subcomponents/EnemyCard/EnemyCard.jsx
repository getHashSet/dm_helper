import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";

EnemyCard.defaultProps = {
    enemyName : "Enemy",
    ac : 14,
    cr : 1,
    hitDice : "2d10",
    movement : ["walk", "swim", "fly", "dig"],
    stats : {
        STR : 14,
        DEX : 20,
        CON : 1,
        INT : 28,
        WIS : 5,
        CHA : 16
    },
    pageNumber : "Monster Manual",
    actionsNumber : 1,
    actions : [
        {
            type: "attack", // attack, item, spell
            actionType: "action", // action, bonus action, passive, reaction.
            actionName: "Bite",
            hitMod : 5,
            damageMod : 3, // number - or - "str", "dex" - or - "finess"
            damage: "1d6",
            description: "Attack is +5 to hit to deal 1d6 + 3 damage.",
            flavorText : "Enemy bites you.",
            charges : 1,
        },
        {
            type: "item",
            actionType: "bonus_action",
            actionName: "Potion",
            roll: "2d4", // edge case. what if its like 2d4 + 2?
            diceMod: 2,
            description: "Drink potion to heal 2d4 + 2 hp.",
            flavorText : "A potion of red goo that smells tart."
        },
        {
            type: "attack", // attack, item, spell
            actionType: "action", // action, bonus action, passive, reaction.
            actionName: "Trip",
            hitMod : 5,
            damageMod : 3, // number - or - "str", "dex" - or - "finess"
            damage: "1d6",
            description: "STR check vs targets atheletics or acrobatics.",
            flavorText : "Make an athletics or acrobatics save vs 18.",
        },
        {
            type: "attack", // attack, item, spell
            actionType: "action", // action, bonus action, passive, reaction.
            actionName: "Dodge",
            hitMod : 5,
            damageMod : 3, // number - or - "str", "dex" - or - "finess"
            damage: "1d6",
            description: "Impose Disadvantage on attackers.",
            flavorText : "You see the Enemy start to dip dive bob weave and dodge activly.",
        },
        {
            type: "attack", // attack, item, spell
            actionType: "action", // action, bonus action, passive, reaction.
            actionName: "Dagger",
            hitMod : 5,
            damageMod : 3, // number - or - "str", "dex" - or - "finess"
            damage: "1d4",
            description: "Stab with a dagger for 1d4 + 3",
            flavorText : "Stab",
        },
    ]
}

// ============= //
//   COMPONENT   //
// ============= //
export default function EnemyCard(props) {
    // ==================== //
    //   FAKE CONSTRUCTOR   //
    // ==================== //
    const getHp = (dice) => {
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

    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [enemyHp, updateenemyHp] = useState(getHp(props.hitDice));
    const [maxHp] = useState(enemyHp);
    const [hasAdvantage, updatehasAdvatage] = useState(false);
    const [hasDisadvantage, updatehasDisadvantage] = useState(false);

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
    
    const rollSavingThrow = (e) => {
        let statMod = 0;

        if (e.target.parentElement.getAttribute('data-mod') !== null){
            statMod = e.target.parentElement.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else if (e.target.getAttribute('data-mod') !== null){
            statMod = e.target.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else {
            statMod = 0;
        }

        // Edgecase check if statmod broke during our terible logic
        if (typeof(statMod) !== 'string' || statMod === undefined || statMod === 'ndefine') {statMod = 0};

        const d20 = rolld20();

        let savingThrow = d20 + +statMod;

        console.log(`Mod: ${statMod} d20: ${d20}`);

        // Edgecases
        if (savingThrow === 20 && statMod > 0) {savingThrow = "Dirty 20"};
        if (savingThrow < 1 && d20 !== 1) { savingThrow = "Dirty 1"; };
        if (d20 === 20) {savingThrow = "Nat 20"};
        if (d20 === 1) {savingThrow = "Nat 1"};

        savingThrow = <h4>{savingThrow}</h4>;
        updateToastMenu(savingThrow);
    };

    const getStatMod = (stat) => {
        if (stat > 9 && stat < 12) {return};
        
        if (stat < 10) {
            return `(${Math.floor((stat - 10) / 2)})`;
        }

        if (stat > 11) {
            return `(${(stat - 10) / 2})`;
        }
    };

    const getMod = (stat) => {
        const uncleanedMod = getStatMod(stat);
        const mod = uncleanedMod.slice(1, uncleanedMod.length - 1); // remove string data
        return +mod;
    };

    const d20PlusMod = (mod) => {
        const d20 = rolld20();

        return d20 + +mod;
    };

    const rollPlusMod = (stat) => {
        const mod = getMod(stat);
        return d20PlusMod(mod);
    };

    const adjustHpButton = (e) => {
        e.preventDefault();

        // heal or damage?
        const type = e.target.getAttribute('name');
        let inputData = e.target.parentElement.children[0].value;

        // Edgecase user didnt put in a value
        if ( +inputData <= 0 ) { inputData = 1 };

        // current HP total
        let newHpTotal = +enemyHp;

        switch (type) {
            case "heal":
                newHpTotal = enemyHp + +inputData;
                if (newHpTotal > maxHp) {newHpTotal = maxHp};
                break;
            default:
                newHpTotal = enemyHp - +inputData;
                if (newHpTotal < 0) { newHpTotal = 0 };
                break;
        };

        e.target.parentElement.children[0].value = "";
        updateenemyHp(newHpTotal);
    };

    const rolld20 = () => {
        const firstRoll = Math.floor(Math.random() * 20) + 1;
        const secondRoll = Math.floor(Math.random() * 20) + 1;

        // if (hasAdvantage && hasDisadvantage) {updatehasDisadvantage(false); updatehasAdvatage(false)};

        if (hasDisadvantage) {
            updatehasDisadvantage(false);
            console.log(`rolling with disadvatage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? secondRoll : firstRoll;
            return d20;
        };

        if (hasAdvantage) {
            updatehasAdvatage(false);
            console.log(`rolling with disadvatage: ${firstRoll}, ${secondRoll}`)
            const d20 = firstRoll > secondRoll ? firstRoll : secondRoll;
            return d20;
        };

        return firstRoll;
    }

    const buildAction = (action, index) => {
        if (action.type === null || action.type === undefined) {return};

        // type: "attack", // attack, item, spell
        const actionType = action.actionType // action, bonus action, passive, reaction.
        const actionName = action.actionName;
        const hitMod = action.hitMod;
        const actiondamageMod = action.actiondamageMod; // number - or - "str", "dex" - or - "finess"
        const damage = action.damage; // 1d6 
        const description = action.description;
        const flavorText = action.flavorText;
        const charges = action.charges;

        return  <StyledAction onClick={() => updateToastMenu(flavorText)} key={index}>
                    <div className="dice_box">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
                    </div>
                    <div className="info">
                        <div className="title">
                            {actionName}
                        </div>
                        <div className="body">
                            <p>{description}</p>
                        </div>
                    </div>
                </StyledAction>
    };

    // ============== //
    //   HOOKS AGAIN  //
    // ============== //
    // because of a rookie mistake that I cant be bothered to fix Im just going to put this hook here.
    const [initiative, updateinitiative] = useState(rollPlusMod(props.stats.DEX));

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledCard hasAdvantage={hasAdvantage} hasDisadvantage={hasDisadvantage}>
            
            {/* Enemy Name */}
            <div className="card_name">
                <h2>{props.enemyName}</h2>
                <div className="toggle" ></div>
            </div>

            {/* AC HP IN */}
            <StyledAcHpIn>
                <div className="top_section">
                    {/* AC */}
                    <div className="block" title="Armor Class">
                        <div className="background"></div>
                        <div className="info">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shield-alt" className="svg-inline--fa fa-shield-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"></path></svg>
                            {props.ac}
                        </div>
                    </div>
                    {/* HP */}
                    <div className="block" title="Hit Points">
                        <div className="background"></div>
                        <div className="info">
                            <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'><title>Heart</title><path d='M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z'/></svg>
                            {enemyHp} / {maxHp}
                        </div>
                    </div>
                    {/* IN */}
                    <div className="block" title="Initiative Roll">
                        <div className="background"></div>
                        <div className="info">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" className="svg-inline--fa fa-stopwatch fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg>
                            {initiative}
                        </div>
                    </div>
                </div>
                <div className="bottom_section">
                    <div className="update_hp">
                        <input className="adjustHpBy" type="number" name="adjustHpBy"/>
                        {/* Damage */}
                        <div className="damage_heal_buttons" name="damage" onClick={adjustHpButton}>
                            Damage
                        </div>
                        {/* Heal */}
                        <div className="damage_heal_buttons" name="heal" onClick={adjustHpButton}>
                            Heal
                        </div>
                    </div>
                </div>
            </StyledAcHpIn>

            {/* STATS */}
            <ul className="stats">

                <li className="class" 
                    data-mod={`${getStatMod(props.stats.STR)}`} 
                    onClick={rollSavingThrow}>
                    STR 
                    <span>{props.stats.STR}{getStatMod(props.stats.STR)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.DEX)}`}
                    onClick={rollSavingThrow}>
                    DEX <span>{props.stats.DEX}{getStatMod(props.stats.DEX)}</span>
                </li>

                <li className="class"
                data-mod={`${getStatMod(props.stats.CON)}`}
                onClick={rollSavingThrow}>
                    CON <span>{props.stats.CON}{getStatMod(props.stats.CON)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.INT)}`}
                    onClick={rollSavingThrow}>
                    INT <span>{props.stats.INT}{getStatMod(props.stats.INT)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.WIS)}`}
                    onClick={rollSavingThrow}>
                    WIS <span>{props.stats.WIS}{getStatMod(props.stats.WIS)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.CHA)}`}
                    onClick={rollSavingThrow}>
                    CHA <span>{props.stats.CHA}{getStatMod(props.stats.CHA)}</span>
                </li>
            </ul>

            {/* COMBAT ACTIONS */}
            {/* <div className="title">Actions</div> */}
            <div className="toggles">
                        <div className="advantage" onClick={() => updatehasAdvatage(!hasAdvantage)}>
                    <div className="toggle"></div>
                    <p>Advantage</p>
                </div>
                <div className="disadvantage" onClick={() => updatehasDisadvantage(!hasDisadvantage)}>
                    <div className="toggle_disadvantage"></div>
                    <p>Disadvantage</p>
                </div>
            </div>

            <div className="actions">
                {props.actions.map((action, index) => buildAction(action, index))}
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
    max-width: 1000vw;
    margin: .5em;
    overflow: hidden;
    background-color: #fff;
    border: 2px solid #e84c3b;
    border-radius: .5em;
    color:#2d3436;

    .card_name {
        width: 100%;
        background-color: #e84c3b;
        font-weight: 900;
        padding: .5em 1em;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h2 {
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
        justify-content: space-between;
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
                color: #e74c3c;
            }

            &:active {
                transform: translateY(3px);
            }
        }
    }

    .actions {
        position: relative;
        margin: 0 .5em .5em .5em;
        max-height: 20vh;
        border: 1px solid #bdc3c7;
        border-radius: .5em;
        background: #fff;
        overflow: scroll;
    }

    .toggles {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        font-size: .8em;

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
                border: 3px solid #e74c3c;
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
                background-color: ${props => props.hasAdvantage ? "#e74c3c" : "#fff"};
            }
        }

        .disadvantage {
            .toggle_disadvantage {
                background-color: ${props => props.hasDisadvantage ? "#e74c3c" : "#fff"};
            }
        }
    }


    @media (max-width: 768px) {
        width: 100%;
        max-width: 400px;
        min-width: 0px;
    }
`;

// ========== //
//   ACTION   //
// ========== //
const StyledAction = styled.div`
    display: flex;
    margin: .5em;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
    user-select: none;

    .dice_box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5em;
        width: 1.2em;
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

        .block {
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
        justify-content: space-evenly;
        align-items: center;

        .update_hp {
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #bdc3c7;
        }

        input {
            text-align: center;
            width: 3em;
            height: 1.5em;
            font-size: 1em;
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
            width: 25%;
            text-align: center;
            user-select: none;

            &:hover {
                cursor: pointer;
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
const StyledToast = styled.section`
    font-weight: 400;
    font-size: 16px;
    text-align: center;

    h4 {
        font-weight: 900;
        font-size: 3em;
    }
`;