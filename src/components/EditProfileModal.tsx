import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  HStack,
  Image,
  Button,
  Box,
  VStack,
  Input,
  Divider,
  Select,
} from "@chakra-ui/react";
// import tableuser from "../assets/tableuser.svg";
// import inputarrow from "../assets/input arrow.svg";
// import { AuthButton } from "./AuthButton";
// import { EditableField } from "./EditableField";

import avatar from "../assets/user.svg";

export const EditProfileModal: React.FC<any> = ({ isOpen, onClose }) => {
  // const [surName, setSurName] = React.useState<string>("Anima");
  // const [surNameToggle, setSurNameToggle] = React.useState<boolean>(false);
  // const [name, setName] = React.useState<string>("Agrawal");
  // const [nameToggle, setNameToggle] = React.useState<boolean>(false);
  // const [userName, setUserName] = React.useState<string>("Anima");
  // const [userNameToggle, setUserNameToggle] = React.useState<boolean>(false);
  // const [email, setEmail] = React.useState<string>("animaagra@gmail.com");
  // const [emailToggle, setEmailToggle] = React.useState<boolean>(false);
  // const [address, setAddress] = React.useState<string>(
  //   "Mainstreet 67, 78623 Germany"
  // );
  // const [addressToggle, setAddressToggle] = React.useState<boolean>(false);
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"4xl"}
    >
      <ModalOverlay />
      <ModalContent
        borderRadius={"12px"}
        h={"auto"}
        border={"1px solid rgba(226, 232, 240, 1)"}
        p={3}
      >
        <ModalBody>
          <Box maxW={624} p={"24px"}>
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Profile Information
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Update subscriber account's profile information and email address.
              </Text>
            </VStack>
            <Box>
              {/* Profile Information Form */}
              <Box my={4}>
                <Text fontSize={"14px"} ml={1} mb={2} fontWeight={500}>
                  Photo
                </Text>
                <HStack gap={8}>
                  <Image
                    // src={imageUrl ? imageUrl : avatar}
                    src={avatar}
                    alt="file-detect"
                    w={"14"}
                    h={"14"}
                    borderRadius={"full"}
                  />
                  <Input
                    type="file"
                    w={"full"}
                    placeholder="Select a Photo"
                    py={1}
                  // ref={fileInputRef}
                  // onChange={handleImageChange}
                  />
                </HStack>
              </Box>

              <VStack alignItems={"flex-start"} mt={10} w={"full"}>
                <Box w={"full"}>
                  <Text fontSize={"14px"} fontWeight={500}>
                    Name
                  </Text>
                  <Input
                    placeholder="Anima Agarwal"
                    borderRadius={"6px"}
                    h={"6vh"}
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box w={"full"}>
                  <Text fontSize={"14px"} fontWeight={500}>
                    Email
                  </Text>
                  <Input
                    placeholder="example-email.com"
                    borderRadius={"6px"}
                    h={"6vh"}
                    // value={user?.email}
                    readOnly={true}
                  />
                </Box>

                <Button
                  colorScheme="blue"
                  bg={"#0641FB"}
                  mt={8}
                // onClick={handleNameChange}
                // disabled={loading}
                >
                  Update Profile
                </Button>
              </VStack>
            </Box>
          </Box>
          {/* PASSWORD SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Reset Password
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Send the subscriber an email to reset the password.
                </Text>
              </VStack>

              <Button
                variant={"outline"}
                mt={3}
                borderColor={"black"}
              >
                Send Reset Password
              </Button>
            </VStack>
          </section>

          {/* CHANGE PLAN SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Change Plan
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Change the subscriber’s plan or send more message credits.
                </Text>
              </VStack>
              <Select>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </Select>
              <Button
                variant={"outline"}
                mt={3}
                borderColor={"black"}
              >
                Change Plan
              </Button>
            </VStack>
          </section>
          {/* UPDATE CREDITS SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Update Credits
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Increase the subscriber’s message credits.
                </Text>
              </VStack>
              <Input placeholder="Enter Credits" />
              <Button
                variant={"fill"}
                bg={"#FFCB2F"}
                mt={3}
                borderColor={"black"}
              >
                Update Credits
              </Button>
            </VStack>
          </section>

          {/* UPDATE SOURCE LINKS SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Update Source Links
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Change the source links limitation from the subscribers.
                </Text>
              </VStack>
              <Input placeholder="Enter Credits" />
              <Button
                variant={"fill"}
                bg={"#FFCB2F"}
                mt={3}
                borderColor={"black"}
              >
                Update
              </Button>
            </VStack>
          </section>

          <Divider my={12} />

          <VStack alignItems={"flex-start"}>
            <Text fontSize={"16px"} fontWeight={"medium"}>
              Delete Account
            </Text>
            <Text fontSize={"14px"} color={"GrayText"}>
              Permanently delete your account.
            </Text>

            <Text fontSize={"14px"} color={"GrayText"} mt={8} mb={4}>
              Once your account is deleted, all of its resources and data will be
              permanently deleted. Before deleting your account, please download any
              data or information that you wish to retain.
            </Text>

            <Button
              variant={"outline"}
              colorScheme="red"
              bg={"transparent"}
              border={"1px solid #FF0000"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
            >
              Delete Account
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
