import React from "react";
import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  VStack,
  Image,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { AccountNavbar } from "../components/AccountNavbar";
import filter from "../assets/filter.svg";
import download from "../assets/download.svg";
import tableuser from "../assets/tableuser.svg";
import search from "../assets/search.svg";
import { EditProfileModal } from "../components/EditProfileModal";

export const Subscriptions: React.FC = () => {
  const plans = [
    { name: "Guy Hawkins", email: "janecooper@gmail.com", type: "free" },
    { name: "Guy Hawkins", email: "janecooper@gmail.com", type: "basic" },
    { name: "Guy Hawkins", email: "janecooper@gmail.com", type: "premium" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getBgColor = (planType: any) => {
    switch (planType) {
      case "free":
        return "rgba(236, 253, 245, 1)";
      case "basic":
        return "rgba(220, 220, 220, 1)";
      case "premium":
        return "rgba(199, 229, 252, 1)";
      default:
        return "none";
    }
  };
  const getTextColor = (planType: any) => {
    switch (planType) {
      case "free":
        return "rgba(76, 175, 80, 1)";
      case "basic":
        return "rgba(117, 117, 117, 1)";
      case "premium":
        return "rgba(33, 150, 243, 1)";
      default:
        return "none";
    }
  };
  return (
    <Stack h={"auto"} w={"100%"}>
      <AccountNavbar routeName={""} dashboard={true} />
      <VStack
        mx={"auto"}
        h={"auto"}
        w={["100%", "100%", "90%", "90%"]}
        gap={2}
        mt={["8rem", "8rem", "6rem", "6rem"]}
        mb={2}
        align={["start", "start", "end", "end"]}
      >
        <EditProfileModal isOpen={isOpen} onClose={onClose} />
        <Stack
          direction={"row"}
          w={"85%"}
          h={"9vh"}
          mt={5}
          px={4}
          justify={"space-between"}
          align={"center"}
          border={"1px solid rgba(120, 116, 134, 0.1)"}
        >
          <InputGroup w={["50%", "50%", "30%", "30%"]}>
            <InputLeftAddon bg="none" borderRight="none" h={"7vh"}>
              <Image src={search} w={"4"} h={"4"} alt="search" />
            </InputLeftAddon>
            <Input
              h={"7vh"}
              type="text"
              placeholder="Search by name, E-Mail..."
              borderLeft="none"
            />
          </InputGroup>
          <HStack
            justify={"space-between"}
            w={["50%", "50%", "15%", "15%"]}
            h={"full"}
            px={2}
          >
            <HStack
              w={"70%"}
              h={"80%"}
              bg={"rgba(120, 116, 134, 0.1)"}
              justify={"space-between"}
              px={5}
              borderRadius={"5px"}
            >
              <Image src={filter} w={"6"} h={"6"} />
              <Text
                fontSize={"18px"}
                fontWeight={600}
                color={"rgba(120, 116, 134, 1)"}
              >
                Filter
              </Text>
            </HStack>
            <Image src={download} w={"7"} h={"7"} />
          </HStack>
        </Stack>
        <Stack w={"85%"} h={"auto"} mt={5}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>E-mail</Th>
                  <Th>Plan</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {plans?.map((plan, index) => (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        <Image
                          src={tableuser}
                          w={"10"}
                          h={"10"}
                          alt="tableuser"
                        />
                        <Text>{plan.name}</Text>
                      </HStack>
                    </Td>
                    <Td>{plan.email}</Td>
                    <Td>
                      <Stack
                        w={"max-content"}
                        bg={getBgColor(plan.type)}
                        py={2}
                        px={5}
                        borderRadius={"8px"}
                      >
                        <Text
                          color={getTextColor(plan.type)}
                          fontSize={"16px"}
                          fontWeight={600}
                        >
                          {plan.type === "free"
                            ? "Free"
                            : plan.type === "basic"
                            ? "Basic"
                            : "Premium"}
                        </Text>
                      </Stack>
                    </Td>
                    <Td>
                      <Stack
                        bg={"rgba(6, 65, 251, 1)"}
                        h={"5.5vh"}
                        justify={"center"}
                        align={"center"}
                        borderRadius={"8px"}
                        w={["100%", "100%", "80%", "80%"]}
                        cursor={"pointer"}
                        onClick={() => onOpen()}
                      >
                        <Text
                          color={"rgba(255, 255, 255, 1)"}
                          fontSize={"18px"}
                          fontWeight={400}
                        >
                          Edit Profile
                        </Text>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </VStack>
    </Stack>
  );
};
