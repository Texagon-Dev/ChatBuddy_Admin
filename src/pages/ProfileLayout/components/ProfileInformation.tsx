import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import avatar from "../../../assets/avatar.svg";
import { useAuth } from "../../../utils/Auth";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../../../utils/Supabase";
import { AuthButton } from "../../../components/AuthButton";

const ProfileInformation = () => {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) {
      toast({
        title: "Error",
        description: "No image selected",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const imageSizeInMB = imageFile.size / 1024 / 1024;
    if (imageSizeInMB > 2) {
      toast({
        title: "Error",
        description: "Image size should be less than 2 MB",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const invalidFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (invalidFileTypes.includes(imageFile.type)) {
      toast({
        title: "Error",
        description: "Invalid file type. Please select an image",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      if (user?.id) {
        const bucket = "Image";
        const fileName = imageFile.name;
        const { error } = await supabaseClient.storage
          .from(bucket)
          .upload(fileName, imageFile, {
            upsert: true,
          });
        if (error) {
          console.error("Upload error:", error);
        } else {
          const { data } = supabaseClient.storage
            .from(bucket)
            .getPublicUrl(fileName);
          if (data?.publicUrl) {
            setImageUrl(data?.publicUrl);
            const { error: updateError } = await supabaseClient.auth.updateUser(
              {
                data: { avatar_url: data?.publicUrl },
              }
            );
            if (updateError) {
              console.error(
                "Error updating user profile:",
                updateError.message
              );
              return;
            } else {
              toast({
                title: "Success",
                description: "Your profile updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleNameChange = async () => {
    if (name) {
      setLoading(true);
      const { error } = await supabaseClient.auth.updateUser({
        data: { full_name: name },
      });
      if (error) {
        console.error("Error updating name:", error.message);
        return;
      } else {
        toast({
          title: "Success",
          description: "Your profile updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          setImageUrl(user?.user_metadata?.avatar_url || "");
          setName(user?.user_metadata?.full_name || "");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [user]);
  return (
    <Box maxW={624} p={"24px"}>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"16px"} fontWeight={"medium"}>
          Profile Information
        </Text>
        <Text fontSize={"14px"} color={"GrayText"}>
          Update your account's profile information and email address.
        </Text>
      </VStack>
      <Box>
        <Box my={4}>
          <Text fontSize={"14px"} ml={1} mb={2} fontWeight={500}>
            Photo
          </Text>
          <HStack gap={8}>
            <Image
              src={imageUrl ? imageUrl : avatar}
              alt="file-detect"
              w={"14"}
              h={"14"}
              borderRadius={"full"}
            />
            <Button
              bg={"rgba(241, 245, 249, 1)"}
              onClick={() => fileInputRef.current?.click()}
            >
              Select a New Photo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </HStack>
        </Box>
        <VStack alignItems={"flex-start"} mt={10} w={"full"}>
          <Box w={"full"}>
            <Text fontSize={"14px"} fontWeight={500}>
              Name
            </Text>
            <Input
              borderRadius={"6px"}
              h={"6vh"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box w={"full"} mb={3}>
            <Text fontSize={"14px"} fontWeight={500}>
              Email
            </Text>
            <Input
              borderRadius={"6px"}
              h={"6vh"}
              value={user?.email}
              readOnly={true}
            />
          </Box>
          <AuthButton
            name=" Update Profile"
            width={["60%", "60%", "27%", "27%"]}
            height="5.8vh"
            border="none"
            bg={"brand.main"}
            color="white"
            hoverBg="brand.mainHover"
            hoverBorder="none"
            fontSize={["16px"]}
            fontWeight={500}
            borderRadius="8px"
            isLoading={loading}
            onClick={handleNameChange}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
