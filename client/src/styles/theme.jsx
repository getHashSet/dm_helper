import React from 'react';
import { ThemeProvider } from "styled-components";

const theme = {
    color: {
        black: "#000",
        dark: "#2d3436",
        grey: "#596275",
        white: "#fff",
        light: "#dfe6e9",
        blue: "#3498db",
        darkBlue: "#2980b9",
        green: "#2ecc71",
        darkGreen: "#27ae60",
        red: "#e74c3c",
        darkRed: "#c0392b",
        orange: "#f39c12",
        darkOrange: "#e67e22",
        yellow: "#f6e58d",
        darkYellow: "#f9ca24",
        gold: "#ccae62",
        darkGold: "#a68736",
        text: "#2d3436",
    },

    breakpoint: {
        mobile: "767px",
        tablet: "768px",
        desktop: "1040px"
    },

    font: {
        title: "'Open Sans', sans-serif",
        body: "'Roboto Slab', serif",
        splash: "'Roboto Slab', serif",
    },

    max: {
        width: "1200px",
    }
};

const Theme = ({children}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;