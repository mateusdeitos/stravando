import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181B23",
            "800": "#1F2029",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        },
		brand: {
            "900": "#b83d00",
            "800": "#cc4400",
            "700": "#e04b00",
            "600": "#f55200",
			"500": "#fc5200",
            "400": "#ff691f",
            "300": "#ff8547",
            "200": "#ffa070",
            "100": "#ffbb99",
            "50": "#ffd6c2",
		}
    },
    fonts: {
        body: "Poppins",
        heading: "Poppins",
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.50',
            }
        }
    }
})