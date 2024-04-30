import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";


const ProfilePassword = () => {
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
        <Box w={"full"}>
          <Text fontSize={"14px"} fontWeight={500}>
            Current Password
          </Text>
          <Input
            placeholder="Enter your current password"
            type="password"
            // value={currentPassword}
            // onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Box>
        <Box w={"full"}>
          <Text fontSize={"14px"} fontWeight={500}>
            New Password
          </Text>
          <Input
            placeholder="Enter your new password"
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box w={"full"}>
          <Text fontSize={"14px"} fontWeight={500}>
            Confirm Password
          </Text>
          <Input
            placeholder="Confirm your new password"
            type="password"
            // value={checkNewPassword}
            // onChange={(e) => setCheckNewPassword(e.target.value)}
          />
        </Box>
        <Button
          bg={"#0641FB"}
          colorScheme="blue"
          mt={8}
        //   onClick={handlePasswordChange}
        //   disabled={loading}
        >
          Update Password
        </Button>
      </VStack>
    </VStack>
  )
}

export default ProfilePassword
