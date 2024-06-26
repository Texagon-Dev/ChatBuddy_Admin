import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import passwordIcon from "../../assets/passwordIcon.svg";
import userIcon from "../../assets/user.svg";
import avatar from "../../assets/avatar.svg";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import ProfileMobileNav from "./components/ProfileMobileNav";

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

const ProfileLayout = () => {
  const profileLinks = [
    { label: "Profile", icon: userIcon, link: "/profile" },
    { label: "Password", icon: passwordIcon, link: "/profile/password" },
  ];
  const { user } = useAuth();
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
            onClick={() => navigate("/dashboard/subscribers")}
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
      <VStack h={"100vh"} flex={1} borderLeft={"1px solid #E2E8F0"} gap={0}>
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
            <Link to="/dashboard/subscribers">
              <Button bg={"white"} _hover={{ bg: "rgba(240, 244, 255, 1)" }}>
                <ArrowBackIcon h={"16px"} w={"16px"} mr={2} />
                Back to Dashboard
              </Button>
            </Link>
          </HStack>
          <Image
            src={imageUrl ? imageUrl : avatar}
            alt="profile"
            w={"10"}
            h={"10"}
            borderRadius={"full"}
          />
        </HStack>

        {/* MAIN CONTENT */}

        <Box flex={1} w={"full"} overflow={"auto"}>
          <Outlet />
        </Box>
      </VStack>
    </HStack>
  );
};

export default ProfileLayout;
