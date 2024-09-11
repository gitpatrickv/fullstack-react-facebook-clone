import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <IconButton
        aria-label={
          colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
        }
        icon={
          colorMode === "dark" ? (
            <MdLightMode size="35px" />
          ) : (
            <MdDarkMode size="35px" />
          )
        }
        onClick={toggleColorMode}
        border="none"
        background="none"
        _hover={{ background: "none" }}
        _active={{ background: "none" }}
        mr="5px"
      />
    </HStack>
  );
};

export default ColorModeSwitch;
