import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { supabaseClient } from "../../../utils/Supabase";
import { AuthButton } from "../../../components/AuthButton";

const AddAdminModal = ({ isOpen, onClose, setCheck }: any) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = async () => {
    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Email and password fields are required",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add admin",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      if (data?.user?.id) {
        const { data: userData } = await supabaseClient
          .from("customer")
          .update({ isAdmin: true, metadata: { full_name: name } })
          .eq("uuid", data?.user?.id)
          .select();

        if (userData) {
          toast({
            title: "Success",
            description: "Admin added successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setCheck(true);
        }
      }

      onClose();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Admin Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems={"flex-start"}>
              <Text color="GrayText">Add an admin account to chatbuddy.io</Text>
              <Box w={"full"}>
                <Text>Name</Text>
                <Input
                  placeholder="Admin Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box w={"full"}>
                <Text>Email</Text>
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box w={"full"}>
                <Text>Password</Text>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <AuthButton
                name="Add Admin"
                width={["35%"]}
                height="5.5vh"
                border="none"
                bg="brand.main"
                color="rgba(255, 255, 255, 1)"
                hoverBg="brand.mainHover"
                hoverColor="white"
                fontSize={["14px", "14px", "17px", "17px"]}
                fontWeight={500}
                borderRadius="6px"
                hoverBorder="none"
                onClick={handleAddAdmin}
                isLoading={loading}
                mb={3}
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
