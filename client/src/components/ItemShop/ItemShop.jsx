import React from 'react';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_coins, svg_refresh } from '../../styles';
import { StyledChapter, StyledFrame, StyledRefresh, StyledToast } from '../../styles/StyledElements';

// ============== //
//     EXPORT     //
// ============== //
export default function ItemShop() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = data => {
        const toastData = <StyledToast>{data}</StyledToast>;
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
        // shop data should be stored in redux and not in hooks
    };

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledChapter>
            <StyledFrame>
                <h2>
                    {svg_coins} Item Shop
                </h2>

                <p className="description">Select the type of shop your adventures have wandered into. This will list the shop owner, whats for sale in the shop and how much gold they have on their person and behind the counter.</p>

                <label htmlFor="shop">Type of shop: </label> 
                {/* TODO create a toast menu to pick the shop type */}
                <select name="shop">
                    <option value="item_shop">Item Shop</option>
                    <option value="black_smith">Black Smith</option>
                    <option value="stable">Stable</option>
                    <option value="magic_shop">Magic Shop</option>
                    <option value="pay_master">Pay Master</option>
                </select>

                <section>
                    <h3>Owner</h3>
                    <p>Owners mood</p>
                    <p>Owners passive perception</p>
                    <p>Gold on Owner</p>
                    <p>Gold in shop</p>
                </section>

                <section className="wire_block">
                    <h3>Menu</h3>
                    <div className="menu">
                        <p>Healing Potion <span>Heals 2d4 + 2 hp</span> <span>10gp</span></p>
                        <p>Dagger <span>Deals 1d4 damage.</span><span>2gp</span></p>
                        <p>Travel Mead <span>A drink for the road</span><span>4sp</span></p>
                    </div>
                </section>

                <StyledRefresh className="clickable" onClick={() => { updateToastHandler("Refreshed This Shop") }} title="Refresh Shop">
                    {svg_refresh}
                </StyledRefresh>

            </StyledFrame>
        </StyledChapter>
    )
}