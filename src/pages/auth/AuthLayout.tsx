import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <Box
      height={"100svh"}
      display={"flex"}
      alignItems={"center"}
      overflow={"clip"}
    >
      <Box
        flex={1}
        h={"100%"}
        bg={"white"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
