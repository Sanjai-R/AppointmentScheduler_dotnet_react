import React from "react";

import NavMenu from "./NavBar";
import { Flex } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <Flex px="10" py="2">
        {props.children}
      </Flex>
    </div>
  );
};

export default Layout;
