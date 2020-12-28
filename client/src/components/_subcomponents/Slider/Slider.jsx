import React from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider() {

  return (
    <React.Fragment>
        <StyledSlider>
            <div>
                <p>Easy</p>
                <Slider
                    defaultValue={3}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                />
                <p>Hard</p>
            </div>
        </StyledSlider>
    </React.Fragment>
  );
}

const StyledSlider = styled.div`
    padding: .5em;

    span:first-of-type {
        color: #fff;

        .PrivateValueLabel-circle-4 {
            color:#c0392b;
            font-weight: 800;
            font-size: 1.3em;
        }
    }

    div {
        padding: 1em 0;
        max-width: 500px;
        display: flex;
        align-items: center;
    }

    p {
        &:first-child {
            padding-right: 1em;
        }

        &:last-child {
            padding-left: 1em;
        }
    }
`;