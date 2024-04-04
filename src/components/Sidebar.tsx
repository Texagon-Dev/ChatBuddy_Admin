import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import rightarrow from "../assets/rightarrow.svg";
import blackarrow from "../assets/blackarrow.svg";
import navactive from "../assets/nav active.svg";
import { SidebarProps } from "../utils/Types";

export const Sidebar: React.FC<SidebarProps> = ({ options, setOptions }) => {
  const location = useLocation();
  const [isLargerThan600] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan1500] = useMediaQuery("(min-width: 1500px)");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleOptionClick = (index: any) => {
    const updatedOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, active: true };
      } else {
        return { ...option, active: false };
      }
    });
    setOptions(updatedOptions);
    if (!isLargerThan1500) {
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    const updatedOptions = options.map((option) => {
      return {
        ...option,
        active: option.link === location.pathname ? true : false,
      };
    });
    setOptions(updatedOptions);
  }, [location.pathname]);
  return (
    <>
      {isExpanded ? (
        <>
          <Box
            as="nav"
            pos="fixed"
            top="20"
            left="0"
            h="90vh"
            w={"250px"}
            transition="width 0.3s ease"
            overflowY="auto"
            zIndex="9"
            borderRight={
              isLargerThan600 ? "1px solid rgba(226, 232, 240, 1)" : ""
            }
            bg={isLargerThan600 ? "" : "white"}
            justifyContent={"space-between"}
            css={{
              "&::-webkit-scrollbar": {
                width: "3px",
                height: "1px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(6, 65, 251, 1)",
                borderRadius: "5px",
              },
            }}
          >
            <Stack spacing={1} p={5} mx={1}>
              {options.map((option, index) => (
                <HStack justify={"space-between"} key={index}>
                  <HStack>
                    <Image
                      src={option.active ? option.activeIcon : option.icon}
                      w={"10"}
                      h={"10"}
                      alt="navicon"
                    />
                    <NavLink
                      key={option.id}
                      to={option.link}
                      onClick={() => handleOptionClick(option.id)}
                    >
                      <Box px={2} py={2} borderRadius="md" cursor="pointer">
                        <Text
                          color={
                            option.active
                              ? "blue.500"
                              : "rgba(120, 116, 134, 1)"
                          }
                          fontSize={"18px"}
                          fontWeight={700}
                        >
                          {option.title}
                        </Text>
                      </Box>
                    </NavLink>
                  </HStack>
                  {option.active && (
                    <Image src={navactive} w={"4"} h={"4"} alt="navactive" />
                  )}
                </HStack>
              ))}
            </Stack>
          </Box>
        </>
      ) : (
        <Box
          as="nav"
          pos="fixed"
          top="20"
          left="0"
          h={["8vh", "8vh", "90vh", "90vh"]}
          w={"180px"}
          transition="width 0.3s ease"
          zIndex="9"
        >
          <HStack
            align={isLargerThan600 ? "center" : "top"}
            justify={"center"}
            h={"full"}
            w={"full"}
            mt={isLargerThan600 ? 0 : 5}
            onClick={() => setIsExpanded(true)}
          >
            {isLargerThan600 && (
              <>
                <Image
                  src={rightarrow}
                  w={"7"}
                  h={"10"}
                  alt="rightarrow"
                  ml={3}
                />
                <Image src={blackarrow} w={"5"} h={"5"} alt="blackarrow" />
              </>
            )}
            <Button h={"4vh"} bg={"black"} color={"white"}>
              Click to open
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};
