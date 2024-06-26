import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Image,
  } from "@chakra-ui/react";
  import logo from "../../../assets/logo.svg";
  import { useNavigate } from "react-router-dom";
  const ProfileMobileNav = ({ isOpen, onClose, children }: any) => {
    const navigate = useNavigate();
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={1} />
          <DrawerHeader>
            <Image
              src={logo}
              w={"15"}
              h={"7"}
              alt="logo"
              onClick={() => navigate("/dashboard/chat-home")}
              _hover={{
                cursor: "pointer",
              }}
            />
          </DrawerHeader>
          <DrawerBody onClick={onClose}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default ProfileMobileNav;
  