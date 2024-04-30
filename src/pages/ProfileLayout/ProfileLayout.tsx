import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Image, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import avatar from "../../assets/user.svg";
import logo from "../../assets/logo.svg";
import passwordIcon from "../../assets/password.svg";
import userIcon from "../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/Auth";
import { supabaseClient } from "../../utils/Supabase";

const profileLinks = [
  { label: "Profile", icon: userIcon, link: "/profile" },
  { label: "Password", icon: passwordIcon, link: "/profile/password" },
];

const ProfileLayout = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userid = user?.id;
        const userData = await supabaseClient
          .from("customer")
          .select("metadata")
          .eq("uuid", userid)
          .single();
        if (userData) {
          setImageUrl(userData?.data?.metadata?.avatar_url);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <HStack width={"100%"} height={"100vh"}>
      <VStack
        h={"100vh"}
        w={"20%"}
        p={2}
        pl={"24px"}
        alignItems={"flex-start"}
        borderRight={"1px solid #E2E8F0"}
      >
        <HStack h={"64px"}>
          <Image src={logo} alt="logo" w={"full"} />
        </HStack>
        <VStack w={"100%"}>
          {profileLinks.map((link, index) => (
            <Link to={link.link} key={index} style={{ width: "100%" }}>
              <Button
                w={"full"}
                justifyContent={"flex-start"}
                variant="ghost"
                colorScheme="gray"
                leftIcon={<Image src={link.icon} alt={link.label} />}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </VStack>
      </VStack>
      <VStack h={"100vh"} flex={1}>
        <HStack
          h={"64px"}
          w={"full"}
          borderBottom={"1px solid #E2E8F0"}
          justifyContent={"space-between"}
          pr={4}
          py={2}
        >
          <Link to="/dashboard/subscribers">
            <Button bg={"white"}>
              <ArrowBackIcon h={"16px"} w={"16px"} mr={2} />
              Back to Dashboard
            </Button>
          </Link>
          <Image
            src={imageUrl ? imageUrl : avatar}
            alt="file-detect"
            w={"14"}
            h={"14"}
            borderRadius={"full"}
          />
        </HStack>
        <Box flex={1} w={"full"} p={"24px"}>
          <Outlet />
        </Box>
      </VStack>
    </HStack>
  );
};

export default ProfileLayout;
