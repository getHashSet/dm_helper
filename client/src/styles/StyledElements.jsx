import styled from 'styled-components';

//   CHAPTER   //
export const StyledChapter = styled.section`
    position: relative;
    padding: 1em .5em;
    display: flex;
	justify-content: center;
    color: ${props => props.fontColor ? props.fontColor : props.theme.color.dark};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.color.white};
`;

//   FRAME   //
export const StyledFrame = styled.div`
    position: relative;
	max-width: ${props => props.theme.max.width};
    width: 100%;
    
    h2 {
	    padding-bottom: .5em;
    }

    .block {
        display: block;
        padding: .5em;
        margin: .5em 0;
    }

    .description {
        font-style: italic;
        font-weight: 200;
        max-width: 80%;
        padding-bottom: 1em;
    }
`;

//   WIRE FRAME   //
// props: frameColor, backgroundColor
export const StyledWireFrame = styled.div`
    position: relative;
    border-radius: .5em;
    border: 1px solid ${props => props.frameColor ? props.frameColor : props.theme.color.white};
    margin: 2em 0 1em;
    padding: 1em;

    h3 {
        font-weight: 900;
        position: absolute;
        top: calc(-1em + 2px);
        left: 2em;
        background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.color.white};
        border: 1px solid ${props => props.frameColor ? props.frameColor : props.theme.color.white};
        color: ${props => props.frameColor ? props.frameColor : props.theme.color.dark};
        border-radius: 8px;
        padding: 4px 8px;
    }

    form {
        margin: .5em 0;
        display:flex;
        align-items: center;
        font-family: ${props => props.theme.font.body};

        label {
            padding-right: .5em;
        }

        input {
            height: 2.4em;
            flex-grow: 1;
            border: 1px solid white;
            border-radius: 4px 0 0 4px;

            &:focus {
                outline: none;
            }
        }

        .button {
            color: white;
            border: 1px solid white;
            border-radius: 0 4px 4px 0;
            padding: .5em;

            &:hover {
                cursor: pointer;
            }

            &:active svg {
                transform: translateY(4px);
            }
        }
    }
`;

//   TOAST   //
export const StyledToast = styled.article`
    font-size: 16px;
    font-weight: 400;
    font-family: ${props => props.theme.font.body};
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.text};
    width: 100%;
    max-width: ${props => props.theme.max.width};
    z-index: 10000;

    section {
        padding: 1em;
    }
`;

//   DICE ROLL   //
export const StyledDiceRoll = styled.div`
    text-align: center;
    padding: .5em .5em 2em .5em;

    h3 {
        text-align: center;
        font-size: 2em;
        padding: 0 0 .5em 0;
        margin: .3em 0;
        border-bottom: 1px solid #bdc3c7;
    }

    h4 {
        padding: 1em .5em;
        font-weight: 200;
        font-size: 3em;
        font-family: ${props => props.theme.font.title};

        span {
            font-weight: 900;
        }
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
            align-items: center;
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

    .multiattack {
        font-weight: 400;
        padding: .5em;
    }

    .overflow {
        height: 0px;
        max-height: 50vh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 .5;
        margin: .5;

        div {
            text-align: center;
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
            border-bottom: 1px solid #bdc3c7;

            .the_roll {
                text-align: center;
                border-left: 1px solid #bdc3c7;
            }
        }

        span {
            font-weight: 200;
            font-style: italic;
            font-size: .8em;
            color: #34495e;
        }

        p {
            display: block;
            font-weight: 400;
            font-size: .5em;
            padding: .2em;
            margin: 0;
            text-align: center;
        }

        &.expand {
            height: auto;
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
    }

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
        width: calc(100vw - 1em);
    }
`;

//   REFRESH BUTTON   //
export const StyledRefresh = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${props => props.fontColor ? props.fontColor : props.theme.color.dark};

  @media (max-width: ${props => props.theme.breakpoint.mobile}) {
    svg {
      transition: transform 0;

      &:hover {
        transform: none;
      }
    }
  }
`;

//   SOLID BUTTON   //
// props: fontColor, backgroundColor, hoverColor
export const StyledButton = styled.div`
    color: ${props => props.fontColor ? props.fontColor : props.theme.color.white};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.color.dark};
    border-radius: 1em;
    padding: .5em 1em;
    margin: .5em 0;
    font-family: ${props => props.theme.font.title};
    width: fit-content;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.hoverColor ? props.hoverColor : props.theme.color.grey};
    }

    &:active {
        transform: translateY(4px);
    }
`;

//   MAIN   //
export const StyledMain = styled.main`
    margin-bottom: 4em;
`;