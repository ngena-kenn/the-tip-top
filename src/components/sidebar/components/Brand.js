import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import Logo from "../../../assets/img/logo.png"

export function SidebarBrand() {


  return (
    <Flex align='center' direction='column'>
      <img src={Logo} alt="Logo" />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
