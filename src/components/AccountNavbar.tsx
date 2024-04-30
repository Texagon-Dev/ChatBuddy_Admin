import {
  Button,
  Divider,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import sampleImage from "../assets/user.svg";
import rightIcon from "../assets/trailing-icon.svg";
import arrowup from "../assets/arrow-down.svg";
import accountImage from "../assets/account.svg";
import logoutImage from "../assets/logout.svg";
import { useAuth } from "../utils/Auth";
import { supabaseClient } from "../utils/Supabase";
import { NavProps } from "../utils/Types";

export const AccountNavbar: React.FC<NavProps> = ({ dashboard }) => {
  const route = useNavigate();
  const { signOut, user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState<string>("");
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
          setName(userData?.data?.metadata?.full_name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  const handleSignout = async () => {
    signOut();
    route("/");
  };
  return (
    <Stack w={"full"} as="nav" pos="fixed" bg={"white"} zIndex={10}>
      <HStack
        w={"full"}
        h={"10vh"}
        px={5}
        justify={"space-between"}
        align={"flex-end"}
      >
        <HStack
          onClick={() => {
            route("/dashboard/subscribers");
          }}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Image src={logo} w={["36", "36", "36", "40"]} h={"20"} />
        </HStack>
        <HStack h={"full"} gap={4}>
          <Stack spacing={0}>
            <Text fontWeight={500} fontSize={"17px"} color={"black"}>
              {name ? name : ""}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"16px"}
              color={"rgba(120, 116, 134, 1)"}
            >
              @prathee
            </Text>
          </Stack>

          <Image
            src={dashboard ? (imageUrl ? imageUrl : sampleImage) : sampleImage}
            w={"12"}
            h={"12"}
          />
          {dashboard ? (
            <Menu>
              <MenuButton as={Button} bg={"none"}>
                <Image src={arrowup} w={"6"} h={"6"} />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Image src={accountImage} alt="account" w={"6"} h={"6"} />
                  <Button
                    onClick={() => route("/profile")}
                    bg={"none"}
                    _hover={{ bg: "none" }}
                  >
                    <Text
                      color={"rgba(120, 116, 134, 1)"}
                      fontWeight={400}
                      fontSize={"18px"}
                    >
                      Profile Settings
                    </Text>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Image src={logoutImage} alt="logout" w={"6"} h={"6"} />
                  <Button
                    onClick={handleSignout}
                    bg={"none"}
                    _hover={{ bg: "none" }}
                  >
                    <Text
                      color={"rgba(233, 31, 31, 1)"}
                      fontWeight={400}
                      fontSize={"18px"}
                    >
                      LogOut
                    </Text>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Text
                fontWeight={500}
                fontSize={"17px"}
                onClick={() => route("/settings")}
              >
                Account
              </Text>
              <Image src={rightIcon} w={"6"} h={"6"} />
            </>
          )}
        </HStack>
      </HStack>
      <Divider />
    </Stack>
  );
};
