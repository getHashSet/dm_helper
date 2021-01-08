import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import StyledToast from '../../styles/StyledToast';
import { svg_coins, svg_refresh } from '../../styles';

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
        <StyledRoot className="chapter">
            <div className="frame">
                <h2>
                    {svg_coins} Item Shop
                </h2>

                <p className="description">Select the type of shop your adventures have wandered into. This will list the shop owner, whats for sale in the shop and how much gold they have on their person and behind the counter.</p>

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

                <section>
                    <h3>Menu</h3>
                    <p>Items</p>
                </section>

                <StyledRefresh onClick={() => { updateToastHandler("Refreshed This Shop") }} title="Refresh Shop">
                    {svg_refresh}
                </StyledRefresh>

            </div>
        </StyledRoot>
    )
}

// ========== //
//   STYLES   //
// ========== //
const StyledRoot = styled.section`

`;

const StyledRefresh = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${props => props.theme.color.dark};

  @media (max-width: ${props => props.theme.breakpoint.mobile}) {
    svg {
      transition: transform 0;

      &:hover {
        transform: none;
      }
    }
  }
`;