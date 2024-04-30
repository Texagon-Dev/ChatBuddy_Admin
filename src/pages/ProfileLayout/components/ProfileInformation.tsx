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
import avatar from "../../../assets/user.svg";
import { useAuth } from "../../../utils/Auth";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../../../utils/Supabase";

const ProfileInformation = () => {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
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
            const { data: customer } = await supabaseClient
              .from("customer")
              .select("metadata")
              .eq("uuid", user?.id)
              .single();
            if (customer) {
              const updatedMetadata = {
                ...customer.metadata,
                avatar_url: data?.publicUrl,
              };
              const { error: updateError } = await supabaseClient
                .from("customer")
                .update({ metadata: updatedMetadata })
                .eq("uuid", user?.id);
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
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleNameChange = async () => {
    if (name) {
      setLoading(true);
      const { data: customer } = await supabaseClient
        .from("customer")
        .select("metadata")
        .eq("uuid", user?.id)
        .single();
      if (customer) {
        const updatedMetadata = {
          ...customer.metadata,
          full_name: name,
        };
        const { error: updateError } = await supabaseClient
          .from("customer")
          .update({ metadata: updatedMetadata })
          .eq("uuid", user?.id);
        if (updateError) {
          console.error("Error updating name:", updateError.message);
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
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userid = user?.id;
        const userData = await supabaseClient
          .from("customer")
          .select("metadata")
          .eq("uuid", userid)
          .single();
        if (userData) {
          setImageUrl(userData?.data?.metadata?.avatar_url);
          setName(userData?.data?.metadata?.full_name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
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
        {/* Profile Information Form */}
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
            <Input
              type="file"
              w={"full"}
              placeholder="Select a Photo"
              py={1}
              ref={fileInputRef}
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
              placeholder="Anima Agarwal"
              borderRadius={"6px"}
              h={"6vh"}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={user?.email}
              readOnly={true}
            />
          </Box>

          <Button
            colorScheme="blue"
            bg={"#0641FB"}
            mt={8}
            onClick={handleNameChange}
            disabled={loading}
          >
            Update Profile
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
