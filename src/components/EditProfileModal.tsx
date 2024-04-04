import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import tableuser from "../assets/tableuser.svg";
import inputarrow from "../assets/input arrow.svg";
import { AuthButton } from "./AuthButton";
import { EditableField } from "./EditableField";

export const EditProfileModal: React.FC<any> = ({ isOpen, onClose }) => {
  const [surName, setSurName] = React.useState<string>("Anima");
  const [surNameToggle, setSurNameToggle] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("Agrawal");
  const [nameToggle, setNameToggle] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>("Anima");
  const [userNameToggle, setUserNameToggle] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("animaagra@gmail.com");
  const [emailToggle, setEmailToggle] = React.useState<boolean>(false);
  const [address, setAddress] = React.useState<string>(
    "Mainstreet 67, 78623 Germany"
  );
  const [addressToggle, setAddressToggle] = React.useState<boolean>(false);
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent
        borderRadius={"12px"}
        h={"auto"}
        border={"1px solid rgba(226, 232, 240, 1)"}
        p={3}
      >
        <ModalBody>
          <Stack
            position="relative"
            h={"60px"}
            w={"60px"}
            bg={"rgba(226, 232, 240, 1)"}
            borderRadius={"full"}
            justify={"center"}
            align={"center"}
          >
            <Image src={tableuser} alt="tableuser" w={"full"} h={"full"} />
            <Image
              src={inputarrow}
              alt="inputarrow"
              w={"7"}
              h={"7"}
              position="absolute"
              bottom={-2}
              right={-2}
            />
          </Stack>
          <HStack justify={"space-between"} w={"80%"} mt={10} h={"auto"}>
            <Stack w={"40%"} spacing={1} h={"auto"}>
              <Text>Surname</Text>
              <EditableField
                value={surName}
                onChange={(e: any) => setSurName(e.target.value)}
                isEditing={surNameToggle}
                toggleEditing={() => setSurNameToggle(!surNameToggle)}
              />
            </Stack>
            <Stack w={"40%"} spacing={1} h={"auto"}>
              <Text>Name</Text>
              <EditableField
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                isEditing={nameToggle}
                toggleEditing={() => setNameToggle(!nameToggle)}
              />
            </Stack>
          </HStack>
          <HStack justify={"space-between"} w={"80%"} mt={5} h={"auto"}>
            <Stack w={"40%"} spacing={1} h={"auto"}>
              <Text>Username</Text>
              <EditableField
                value={userName}
                onChange={(e: any) => setUserName(e.target.value)}
                isEditing={userNameToggle}
                toggleEditing={() => setUserNameToggle(!userNameToggle)}
              />
            </Stack>
          </HStack>
          <Stack w={"60%"} spacing={1} h={"auto"} mt={5}>
            <Text>E-Mail</Text>
            <EditableField
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              isEditing={emailToggle}
              toggleEditing={() => setEmailToggle(!emailToggle)}
            />
          </Stack>
          <Stack w={"75%"} spacing={1} h={"auto"} mt={5}>
            <Text>Address</Text>
            <EditableField
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              isEditing={addressToggle}
              toggleEditing={() => setAddressToggle(!addressToggle)}
            />
          </Stack>
          <HStack w={"full"} h={"auto"} mt={10} mb={2}>
            <AuthButton
              name="Send Reset Password"
              width={["44%", "44%", "35%", "35%"]}
              height="5vh"
              border="none"
              bg={"brand.main"}
              color="rgba(255, 255, 255, 1)"
              mb={2}
              hoverBg="white"
              hoverColor="black"
              fontSize={["14px"]}
              fontWeight={600}
              borderRadius="6px"
            />
            <AuthButton
              name="Change Plan"
              width={["28%", "28%", "25%", "25%"]}
              height="5vh"
              border="none"
              bg={"brand.main"}
              color="rgba(255, 255, 255, 1)"
              mb={2}
              hoverBg="white"
              hoverColor="black"
              fontSize={["14px"]}
              fontWeight={600}
              borderRadius="6px"
            />
            <AuthButton
              name="Delete Account"
              width={["28%", "28%", "25%", "25%"]}
              height="5vh"
              border="1px solid rgba(233, 31, 31, 1)"
              bg={"white"}
              color="rgba(233, 31, 31, 1)"
              mb={2}
              hoverBg="rgba(233, 31, 31, 1)"
              hoverColor="white"
              fontSize={["14px"]}
              fontWeight={600}
              borderRadius="6px"
              hoverBorder="none"
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
