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
import { useAuth } from "../../../utils/Auth";

const AddAdminModal = ({ isOpen, onClose, setCheck }: any) => {
  const { signOut } = useAuth();
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
          .update({ isAdmin: true })
          .eq("uuid", data?.user?.id)
          .select();

        if (userData) {
          toast({
            title: "Success",
            description: "Admin added successfully. Please sign in again.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setCheck(true);
          signOut();
          onClose();
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
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Box>
              <Box w={"full"}>
                <Text>Email</Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box w={"full"}>
                <Text>Password</Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <AuthButton
                name="Add Admin"
                width={["35%"]}
                height="5.5vh"
                border="none"
                bg="black"
                color="rgba(255, 255, 255, 1)"
                hoverBg="black"
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
