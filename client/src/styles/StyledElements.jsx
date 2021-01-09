import styled from 'styled-components';

//   CHAPTER   //
// props: backgroundColor, fontColor
export const Chapter = styled.section`
  position: relative;
  padding: 1em .5em;
  display: flex;
	justify-content: center;
  color: ${props => props.fontColor || props.theme.color.dark};
  background-color: ${props => props.backgroundColor || props.theme.color.white};
`;

//   FRAME   //
// props, maxWidth
export const Frame = styled.div`
    position: relative;
	  max-width: ${props => props.maxWidth || props.theme.max.width};
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

//   BOX   //
export const Box = styled.div`
  font-size: 16px;
  padding: 0.5em;

  h3 {
    padding-bottom: 0.5em;
    font-size: 1.5em;
    font-weight: 700;
    display: block;
    width: 100%;
    user-select: none;
  }

  .instructions {
    font-style: italic;
    padding: .5em;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    padding: .5em;
    user-select: none;

    label {
      user-select: none;
    }

    input {
      text-decoration: none;
      box-shadow: none;
      border: none;
      outline: none;
      padding: 0 .5em;
      margin: 0 .5em;
      min-width: 50vw;

      &:focus {
        outline: none;
      }
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    .numbers {
      width: 2em;
      height: 2em;
      border-radius: 0.5em;
      margin: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      font-weight: 900;
      opacity: .6;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }

      &:active {
        transform: translateY(4px);
      }

      &:nth-child(${(props) => props.partyLevel}) {
        background-color: #fff;
        color: #c0392b;
        opacity: 1;
      }
    }
  }
`;

//   WIRE FRAME   //
// props: frameColor, backgroundColor
export const WireFrame = styled.div`
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
            height: 2em;
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
export const Toast = styled.article`
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
export const DiceRoll = styled.div`
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
export const Refresh = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${props => props.fontColor ? props.fontColor : props.theme.color.dark};

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(4px);
  }

  @media (max-width: ${props => props.theme.breakpoint.mobile}) {
    svg {
      transition: transform 0;

      &:hover {
        transform: none;
      }
    }
  }
`;

//   BUTTON   //
// props: fontColor, backgroundColor, hoverColor, wire
export const Button = styled.div`
    color: ${props => props.wire ? props.backgroundColor || props.theme.color.dark : props.fontColor || props.theme.color.white};
    background-color: ${props => props.wire ? "none" : props.backgroundColor || props.theme.color.dark};
    border-radius: 1em;
    border: ${props => props.wire ? `1px solid ${props.backgroundColor || props.theme.color.dark}` : "none"};
    padding: .5em 1em;
    margin: .5em 0;
    font-family: ${props => props.theme.font.title};
    width: fit-content;
    font-weight: 900;

    span {
      padding: 0 .5em;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.wire ? "none" : props.hoverColor || props.theme.color.grey};
        transform: ${props => props.wire ? "translateY(2px)" : "none"};
    }

    &:active {
        transform: translateY(4px);
    }
`;

//   MAIN   //
export const Main = styled.main`
    margin-bottom: 4em;
`;

//   UPLOAD FORM   //
export const UploadForm = styled.section`
  color: #4b6584;
  max-width: 800px;
  margin: 1em auto 2em;
  background-color: #fff;
  border-radius: .5em;
  box-shadow: 0 1px 4px #333;

  h2 {
    font-size: 2em;
    font-weight: 900;
    margin: .5em;
    padding: .5em 0;
  }

  label {
    margin-top: .5em;
  }

  input {
    width: calc(100% - .5em);
  }

  textarea {
    width: calc(100% - .5em);
    max-width: calc(100% - .5em);
  }

  select {
    min-width: 200px;
    margin: 0 8px;
  }

  svg {
    width: 1em;
    height: 1em;
    max-width: 1em;
    max-height: 1em;
  }

  .block {
    display: block;
    padding: 1em;
    margin: .5em 0;
    overflow: hidden;

    .enemy_party {
      display: flex;
      flex-wrap: wrap;

      li {
          display: flex;
          padding: 4px;
          margin: 4px 4px 4px 0;
          border: 1px solid #d1d8e0;
        
        h4 {
          font-weight: 900;
          padding-right: .5em;
          border-right: 1px solid #d1d8e0;
        }

        p {
          padding: 0 .5em;

          span {
            font-weight: 900;
          }
        }
      }
    }

    .categories {
      padding: .5em;
      margin: .5em;
      border: 1px solid black;
      border-radius: .5em;

      .category {
        display: flex;
        margin: 2px;

        .checkbox {
          width: 1em;
          height: 1em;
          border: 2px solid black;

          &:hover {
            cursor: pointer;
          }
        }

        p {
          margin: 0 .5em;
        }
      }
    }

    &:nth-child(even) {
      border-bottom: 1px solid #d1d8e0;
      border-top: 1px solid #d1d8e0;
      background-color: #f1f2f6;
    }
  }

  .add_button {
    padding: .5em;
    margin: .5em 0;
    width: fit-content;
    user-select: none;
    background-color: #3498db;
    color: #fff;
    font-weight: 900;

    &:hover {
      cursor: pointer;
      background-color: #2980b9;
    }

    &:active {
        transform: translateY(4px);
    }
  }

  .button {
    background-color: #e74c3c;
    color: #fff;
    font-weight: 900;
    padding: .5em;
    margin: .5em 0;
    width: fit-content;
    user-select: none;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
      background-color: #c0392b;
    }

    &:active {
        transform: translateY(4px);
    }
  }
`;

//   LOGIN   //
export const Login = styled.section`
    background-color: #aaa;
    color: #fff;

    .login {
        user-select: none;
        border: 1px solid #fff;
        padding: 4px;
        margin: 4px;
        width: fit-content;

        &:hover {
            cursor: pointer;
        }

        &:active {
            transform: translateY(4px);
        }
    }
`;

//   HERO   //
export const Hero = styled.main`
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 9000;
    background-color: #1e272e;
    color: #ffffff;
`;

//   NAV   //
export const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    z-index: 9000;
    border-top: 2px solid rgba(255,255,255,.4);
    background: linear-gradient(#34495e, #2c3e50);

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
      border-radius: 200% 200% 0 0;
      padding: 1em;
      width: 110vw;
      transform: translate(-10vw, 2vw);

      ul {
        li {
          &:nth-child(2) {
            transform: translateY(-10px);
          }
        }
      }
    }

    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px;
        padding-bottom: 12px;
        font-size: 2em;
        width: 100%;

        li {
            color: #fff;
            user-select: none;

            svg {
                width: 1em;
                color: #fff;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
`;

//   CARDACTION   //
export const CardAction = styled.div`
  background-color: #fff;
  display: flex;
  margin: .5em;
  border-radius: 4px;
  border: 1px solid #bdc3c7;
  user-select: none;

  .dice_box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: .5em;
      width: 2em;
      overflow: hidden;
      user-select: none;
      background-color: #ccae62;
      color: #fff;

      svg {
          width: 1em;
          height: 1em;
          max-width: 100%;
          max-height: 100%;
      }
  }

  .info {
      background-color: #ccae62;
      width: 100%;

      .title {
          padding: 4px;
          font-size: 1.2em;
          font-weight: 700;
          color: #fff;
          background-color: #ccae62;
      }

      .body {
          padding: 2px 4px;
          font-size: .8em;
          font-weight: 400;
          border-radius: .5em 0 0 0;
          font-family: 'Roboto Slab', serif;
          background-color: #fff;

          p {
              line-height: 1.2em;
              margin: 0;
          }
      }
  }

  &:hover {
      cursor: pointer;
      border: 1px solid #a68736;
      box-shadow: 0 0 1px #a68736;

      .dice_box {
          background-color: #a68736;
      }

      .info {
          background-color: #a68736;

          .title {
              background-color: #a68736;
          }
      }
  }

  &:active {
      transform: translateY(3px);
  }
`;