import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useAuth } from "../../../utils/Auth";
import { useState } from "react";
import { supabaseClient } from "../../../utils/Supabase";

const ProfilePassword = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");

  const handlePasswordChange = async () => {
    const userid = user?.id;
    if (password !== checkNewPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!userid) {
      toast({
        title: "Error",
        description: "User not authenticated",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      if (password && password.length < 6) {
        toast({
          title: "Error",
          description: "Please enter a password",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
        return;
      }
      const { error } = await supabaseClient.auth.updateUser({
        password: password,
      });
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "Success",
          description: "Your password updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };
  return (
    <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"16px"} fontWeight={"medium"}>
          Update Password
        </Text>
        <Text fontSize={"14px"} color={"GrayText"}>
          Ensure your account is using a long, random password to stay secure.
        </Text>
      </VStack>
      <VStack alignItems={"flex-start"} mt={10} w={"full"}>
        <Box w={"full"} mb={3}>
          <Text fontSize={"14px"} fontWeight={500}>
            Current Password
          </Text>
          <Input
            placeholder="Enter your current password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Box>
        <Box w={"full"} mb={3}>
          <Text fontSize={"14px"} fontWeight={500}>
            New Password
          </Text>
          <Input
            placeholder="Enter your new password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box w={"full"} mb={3}>
          <Text fontSize={"14px"} fontWeight={500}>
            Confirm Password
          </Text>
          <Input
            placeholder="Confirm your new password"
            type="password"
            value={checkNewPassword}
            onChange={(e) => setCheckNewPassword(e.target.value)}
          />
        </Box>
        <Button
          bg={"#0641FB"}
          colorScheme="blue"
          mt={8}
          onClick={handlePasswordChange}
          disabled={loading}
        >
          Update Password
        </Button>
      </VStack>
    </VStack>
  );
};

export default ProfilePassword;
