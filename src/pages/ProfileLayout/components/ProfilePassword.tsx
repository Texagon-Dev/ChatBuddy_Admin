import { Box, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useAuth } from "../../../utils/Auth";
import { useState } from "react";
import { supabaseClient } from "../../../utils/Supabase";
import { AuthButton } from "../../../components/AuthButton";

const ProfilePassword = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");

  const [currentPasswordError, setCurrentPasswordError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [checkNewPasswordError, setCheckNewPasswordError] =
    useState<string>("");

  const handlePasswordChange = async () => {
    setCurrentPasswordError("");
    setPasswordError("");
    setCheckNewPasswordError("");

    let hasError = false;

    if (!currentPassword) {
      setCurrentPasswordError("Current password is required");
      hasError = true;
    }
    if (!password) {
      setPasswordError("New password is required");
      hasError = true;
    }
    if (!checkNewPassword) {
      setCheckNewPasswordError("Confirm password is required");
      hasError = true;
    }
    if (hasError) {
      return;
    }

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
        position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);
      const containsLetterRegex = /[a-zA-Z]/;
      const containsNumberRegex = /\d/;
      if (
        !password ||
        password.length < 8 ||
        !containsLetterRegex.test(password) ||
        !containsNumberRegex.test(password)
      ) {
        toast({
          title: "Error",
          description:
            "Password must be 8 or more characters with a mix of letters, numbers, and symbols",
          status: "error",
          duration: 3000,
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
        setCurrentPassword("");
        setPassword("");
        setCheckNewPassword("");
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

      <VStack alignItems={"flex-start"} mt={10} w={"full"} gap={5}>
        <Box w={"full"}>
          <Text fontSize={"14px"} fontWeight={500}>
            Current Password
          </Text>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {currentPasswordError && (
            <Text color="red.500" fontSize="sm">
              {currentPasswordError}
            </Text>
          )}
        </Box>
        <Box w={"full"}>
          <Text fontSize={"14px"} fontWeight={500}>
            New Password
          </Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <Text color="red.500" fontSize="sm">
              {passwordError}
            </Text>
          )}
        </Box>

        <Box w={"full"} mb={3}>
          <Text fontSize={"14px"} fontWeight={500}>
            Confirm Password
          </Text>
          <Input
            type="password"
            value={checkNewPassword}
            onChange={(e) => setCheckNewPassword(e.target.value)}
          />
          {checkNewPasswordError && (
            <Text color="red.500" fontSize="sm">
              {checkNewPasswordError}
            </Text>
          )}
        </Box>
        <AuthButton
          name="Update Password"
          width={["50%", "50%", "30%", "30%"]}
          height="5.8vh"
          border="none"
          hoverBorder="none"
          bg={"brand.main"}
          color="white"
          hoverBg="brand.mainHover"
          fontSize={["16px"]}
          fontWeight={500}
          borderRadius="6px"
          isLoading={loading}
          onClick={handlePasswordChange}
        />
      </VStack>
    </VStack>
  );
};

export default ProfilePassword;
