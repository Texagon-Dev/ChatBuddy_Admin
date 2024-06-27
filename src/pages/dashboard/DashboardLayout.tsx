import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import passwordIcon from "../../assets/passwordIcon.svg";
import userIcon from "../../assets/user.svg";
import avatar from "../../assets/avatar.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import ProfileMobileNav from "../ProfileLayout/components/ProfileMobileNav";
import logoutImage from "../../assets/logouticon.svg";

function SideBarNavigation(props: any) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <VStack w={"95%"}>
      {props.profileLinks.map((link: any, index: number) => (
        <Link
          to={link.link}
          key={index}
          style={{
            width: "100%",
          }}
        >
          <Button
            bg={activeLink === link.link ? "rgba(240, 244, 255, 1)" : "white"}
            borderRadius={"8px"}
            w={"full"}
            justifyContent={"flex-start"}
            _hover={{ bg: "rgba(240, 244, 255, 1)" }}
            variant="ghost"
            colorScheme="gray"
            leftIcon={<Image src={link.icon} alt={link.label} mr={2} />}
          >
            <Text color={"#0F172A"} fontWeight={500} fontSize={"14px"}>
              {link.label}
            </Text>
          </Button>
        </Link>
      ))}
    </VStack>
  );
}

const DashboardLayout = () => {
  const profileLinks = [
    { label: "Subscribers", icon: userIcon, link: "/dashboard/subscribers" },
    { label: "Add Admin", icon: passwordIcon, link: "/dashboard/add-admin" },
  ];
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          setImageUrl(user?.user_metadata?.avatar_url || "");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [user]);
  const AccountNavbarMenu = [
    { label: "Profile", link: "/profile", iconLink: userIcon },
  ];
  const handleSignout = async () => {
    await signOut();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <HStack width={"100%"} height={"100vh"} gap={0}>
      <VStack
        h={"100vh"}
        w={["0", "0", "20%", "20%"]}
        overflow={"clip"}
        pl={["0", "0", "24px", "24px"]}
        alignItems={"flex-start"}
      >
        <HStack h={"64px"} p={2}>
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
        </HStack>
        <SideBarNavigation profileLinks={profileLinks} />
        <ProfileMobileNav isOpen={isOpen} onClose={onClose}>
          <SideBarNavigation profileLinks={profileLinks} />
        </ProfileMobileNav>
      </VStack>

      {/* LEFT MAIN SECTION */}
      <VStack h={"100vh"} flex={1} borderLeft={"1px solid #E2E8F0"} gap={0}>
        {/* TOP BAR */}
        <HStack
          h={"64px"}
          w={"full"}
          borderBottom={"1px solid #E2E8F0"}
          justifyContent={"space-between"}
          pr={4}
          py={2}
          pl={2}
        >
          <HStack>
            <Box
              ml={2}
              p={2}
              display={["block", "block", "none", "none"]}
              cursor={"pointer"}
              rounded={"md"}
              onClick={onOpen}
            >
              <HamburgerIcon h={"8"} w={"8"} color={"black"} />
            </Box>
          </HStack>

          <Menu>
            <MenuButton
              as={Button}
              bg={"none"}
              aspectRatio={1}
              justifyContent={"center"}
              display={"flex"}
              alignItems={"center"}
              p={0}
              borderRadius={"full"}
            >
              <Image
                src={imageUrl ? imageUrl : avatar}
                alt="profile"
                w={"10"}
                h={"10"}
                borderRadius={"full"}
              />
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                title="My Account"
                type="radio"
                fontSize={"18px"}
                fontWeight={600}
                color={"rgba(15, 23, 42, 1)"}
              >
                <MenuDivider />
                {AccountNavbarMenu.map((item, index) => {
                  return (
                    <Stack key={index} px={2}>
                      {index === 2 && <Divider />}
                      <MenuItem
                        borderRadius={"4px"}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        _hover={{
                          bg: "rgba(240, 244, 255, 1)",
                        }}
                        gap={4}
                        onClick={() => {
                          navigate(item.link);
                        }}
                      >
                        <Image src={item.iconLink} w={"4"} h={"4"} />
                        <Text
                          fontWeight={400}
                          fontSize={"17px"}
                          color={"rgba(15, 23, 42, 1)"}
                        >
                          {item.label}
                        </Text>
                      </MenuItem>
                    </Stack>
                  );
                })}
              </MenuOptionGroup>
              <MenuDivider />
              <HStack borderRadius={"6px"} w={"full"} px={2}>
                <MenuItem
                  _hover={{
                    bg: "rgba(240, 244, 255, 1)",
                  }}
                >
                  <Image
                    src={logoutImage}
                    alt="logout"
                    w={"5"}
                    h={"5"}
                    ml={2}
                  />
                  <Button
                    onClick={handleSignout}
                    bg={"none"}
                    _hover={{ bg: "none" }}
                  >
                    <Text
                      color={"rgba(233, 31, 31, 1)"}
                      fontWeight={400}
                      fontSize={"17px"}
                    >
                      Log out
                    </Text>
                  </Button>
                </MenuItem>
              </HStack>
            </MenuList>
          </Menu>
        </HStack>

        {/* MAIN CONTENT */}

        <Box flex={1} w={"full"} overflow={"auto"}>
          <Outlet />
        </Box>
      </VStack>
    </HStack>
  );
};

export default DashboardLayout;
