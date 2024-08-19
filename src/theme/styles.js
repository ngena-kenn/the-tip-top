import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#f5f6e9",
      200: "#f5f6e9",
      300: "##e3e4d5",
      400: "##e3e4d5",
      500: "#bfbf9e",
      600: "#bfbf9e",
      700: "#8d8e67",
      800: "#8d8e67",
      900: "#5a5b2a",
    },
    brandScheme: {
      100: "#f5f6e9",
      200: "#f5f6e9",
      300: "##e3e4d5",
      400: "##e3e4d5",
      500: "#bfbf9e",
      600: "#bfbf9e",
      700: "#8d8e67",
      800: "#8d8e67",
      900: "#5a5b2a",
    },
    brandTabs: {
      100: "#f5f6e9",
      200: "#f5f6e9",
      300: "##e3e4d5",
      400: "##e3e4d5",
      500: "#bfbf9e",
      600: "#bfbf9e",
      700: "#8d8e67",
      800: "#8d8e67",
      900: "#5a5b2a",
    },
    secondaryGray: {
      100: "#f5f6e9",
      200: "#f5f6e9",
      300: "##e3e4d5",
      400: "##e3e4d5",
      500: "#bfbf9e",
      600: "#bfbf9e",
      700: "#8d8e67",
      800: "#8d8e67",
      900: "#5a5b2a",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#fafcb4",
      100: "#fafcb4",
      200: "#edf077",
      300: "#edf077",
      400: "#787a22",
      500: "#787a22",
      600: "#5a5b2a",
      700: "#5a5b2a",
      800: "#3c3c17",
      900: "#3c3c17",
    },
    gray: {
      100: "#eeeee0",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
