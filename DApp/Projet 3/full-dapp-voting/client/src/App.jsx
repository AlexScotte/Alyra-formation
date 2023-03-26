import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

import { EthProvider } from "./contexts/EthContext";
import Voting from "./pages/Voting";
import Header from "./components/Header";

import theme from "./theme.js";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: auto;
  margin: auto;
  padding: ${({ theme }) => theme.space.four};
`;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <EthProvider>
          <Layout>
            <Header />
            <Voting />
          </Layout>
        </EthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
