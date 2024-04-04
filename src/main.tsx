import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./utils/Auth.tsx";
const theme = extendTheme({
  colors: {
    brand: {
      main: "rgba(6, 65, 251, 1)",
      mainLight: "rgba(230, 236, 255, 1)",
      text: "rgba(26, 26, 26, 1)",
      textLight: "rgba(111, 111, 111, 1)",
      grey: "rgba(102, 112, 133, 1)",
      greyLight: "rgba(242, 242, 242, 1)",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </AuthProvider>
);
