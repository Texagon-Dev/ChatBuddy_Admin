import { Box, Button, HStack, Image, Input, Text, VStack } from "@chakra-ui/react"
import avatar from "../../../assets/user.svg"

const ProfileInformation = () => {
  return (
    <VStack alignItems={"flex-start"}>
      <Text fontSize={"16px"} fontWeight={"medium"}>
        Profile Information
      </Text>
      <Text fontSize={"14px"} color={"GrayText"}>
        Update subscriber account's profile information and email address.
      </Text>

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
    </VStack>
  )
}

export default ProfileInformation
