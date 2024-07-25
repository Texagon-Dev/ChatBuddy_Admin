import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabaseClient } from "../utils/Supabase";
import { useAuth } from "../utils/Auth";
import { AuthButton } from "./AuthButton";

const DeleteAccountModal = ({ isOpen, onClose, userIdToDelete }: any) => {
  const user = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDeleteUserAccount = async () => {
    try {
      setLoading(true);

      if (user && userIdToDelete) {
        const { data } = await supabaseClient.auth.admin.deleteUser(
          userIdToDelete
        );
        if (data) {
          setLoading(false);
          onClose();
          toast({
            description: `User Account deleted successfully.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
            containerStyle: {
              width: "600px",
              maxWidth: "100%",
            },
          });
        }
      }
    } catch (error: any) {
      setLoading(false);
      throw new Error(error.message);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontSize={"20px"}>
            {"Confirm Delete"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={"center"} color={"GrayText"}>
              {"Are you sure you want to delete your account."}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"} gap={2}>
            <AuthButton
              name="Close"
              width={["60%", "60%", "30%", "30%"]}
              height="5vh"
              border="1px solid black"
              hoverBorder="1px solid red"
              bg={"none"}
              color="black"
              hoverColor="red"
              fontSize={["16px"]}
              hoverBg="none"
              fontWeight={500}
              borderRadius="8px"
              isLoading={loading}
              onClick={onClose}
            />
            <AuthButton
              name="Delete"
              width={["60%", "60%", "30%", "30%"]}
              height="5vh"
              border="none"
              bg={"red"}
              color="white"
              hoverBg="red.300"
              fontSize={["16px"]}
              fontWeight={500}
              borderRadius="8px"
              isLoading={loading}
              onClick={handleDeleteUserAccount}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAccountModal;
