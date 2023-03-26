import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  space: {
    one: "8px",
    two: "16px",
    three: "24px",
    four: "32px",
    five: "40px",
    six: "48px",
  },
  shadow: "rgba(182, 182, 182, 0.9) 0px 0px 30px -10px",
  colors: {
    teal300: "#38B2AC",
    old: "#727272",
    comming: "#c1c1c1",
    borderGrey: "#a0a0a0",
  },
});

export default theme;
