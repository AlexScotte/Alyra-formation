import {
  Flex,
  Heading,
  VStack,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <VStack alignItems="baseline">
        <Heading as="h1" size="4xl">
          🗳️ Voting dApp
        </Heading>
        <Text fontSize="xl" as="i">
          Project 3 for Alyra.
        </Text>
      </VStack>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        colorScheme="teal"
        variant="outline"
        size="lg"
      />
    </Flex>
  );
};

export default Header;
