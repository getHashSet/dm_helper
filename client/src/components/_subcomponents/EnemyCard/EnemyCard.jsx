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
    actions : 1,
    attacks : [
        {
            attack: "bite",
            bonusToHit : 5,
            bonusToDamage : 5,
            info : "",
        }
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

        console.log(totalHp);
        return totalHp;
    };

    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [enemyHp, updateenemyHp] = useState(getHp(props.hitDice));
    const [maxHp] = useState(enemyHp);
    const [hasAdvantage, updatehasAdvatage] = useState(false);

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <StyledToast>
            <h4>{str}</h4>
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(html)); // default parent is a div with flex turned on.
    }
    
    const rollSavingThrow = (e) => {
        let statMod = 0;

        if (e.target.parentElement.getAttribute('data-mod') !== null){
            statMod = e.target.parentElement.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else if (e.target.getAttribute('data-mod') !== null){
            console.log(`found: ${e.target.getAttribute('data-mod')}`);
            statMod = e.target.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else {
            statMod = 0;
        }

        // Edgecase check if statmod broke during our terible logic
        if (typeof(statMod) !== 'string' || statMod === undefined || statMod === 'ndefine') {statMod = 0};

        const d20 = Math.floor(Math.random() * 20) + 1;
        let savingThrow = d20 + +statMod;

        console.log(`Mod: ${statMod} d20: ${d20}`);

        // Edgecases
        if (savingThrow === 20 && statMod > 0) {savingThrow = "Dirty 20"};
        if (savingThrow < 1 && d20 !== 1) { savingThrow = "Dirty 1"; };
        if (d20 === 20) {savingThrow = "Nat 20"};
        if (d20 === 1) {savingThrow = "Nat 1"};

        console.log(`Sending ${savingThrow} to Toast.`)
        updateToastMenu(savingThrow);
    }

    const getStatMod = (stat) => {
        if (stat > 9 && stat < 12) {return};
        
        if (stat < 10) {
            return `(${Math.floor((stat - 10) / 2)})`;
        }

        if (stat > 11) {
            return `(${(stat - 10) / 2})`;
        }
    }

    const getMod = (stat) => {
        const uncleanedMod = getStatMod(stat);
        const mod = uncleanedMod.slice(1, uncleanedMod.length - 1); // remove string data
        return +mod;
    }

    const d20PlusMod = (mod) => {
        const d20 = Math.floor(Math.random() * 20) + 1;
        return d20 + +mod;
    }

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

    //   HOOKS AGAIN  //
    const [initiative, updateinitiative] = useState(rollPlusMod(props.stats.DEX));

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledCard>
            
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
                            <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'><title>Flash</title><path d='M194.82 496a18.36 18.36 0 01-18.1-21.53v-.11L204.83 320H96a16 16 0 01-12.44-26.06L302.73 23a18.45 18.45 0 0132.8 13.71c0 .3-.08.59-.13.89L307.19 192H416a16 16 0 0112.44 26.06L209.24 489a18.45 18.45 0 01-14.42 7z'/></svg>
                            {initiative}
                        </div>
                    </div>
                </div>
                <div className="bottom_section hidden_section">
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
            </StyledAcHpIn>

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

        </StyledCard>
    )
}

// ======== //
//   CARD   //
// ======== //
const StyledCard = styled.article`
    width: 30%;
    min-width: 350px;
    height: 500px;
    max-height: 90vh;
    max-width: 1000vw;
    margin: .5em;
    overflow: hidden;
    background-color: #fff;
    border: 2px solid #e84c3b;
    border-radius: .5em;
    color:#2f3640;

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

        .toggle {
            width: 1em;
            height: 1em;
            background-color: $fff;
        }
    }

    .stats {
        margin: .5em 0;
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

    @media (max-width: 768px) {
        width: 100%;
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

        .block {
            position: relative;
            width: 33%;
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

            .backgroud {

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