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
  const [previewImage, setPreviewImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [initialName, setInitialName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setChangesMade(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value !== initialName) {
      setChangesMade(true);
    } else {
      setChangesMade(!!imageFile);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      let imageUrlToSave = imageUrl;

      if (imageFile && user?.id) {
        const bucket = "Image";
        const fileName = `${user.id}-${imageFile.name}`;
        const { error } = await supabaseClient.storage
          .from(bucket)
          .upload(fileName, imageFile, { upsert: true });

        if (error) {
          throw new Error("Error uploading image");
        } else {
          const { data } = supabaseClient.storage
            .from(bucket)
            .getPublicUrl(fileName);
          imageUrlToSave = data?.publicUrl || "";
        }
      }

      const { error: updateError } = await supabaseClient.auth.updateUser({
        data: { full_name: name, avatar_url: imageUrlToSave },
      });

      if (updateError) {
        throw new Error(updateError.message);
      } else {
        setImageUrl(imageUrlToSave);
        setInitialName(name);
        setChangesMade(false);
        toast({
          description: "Profile updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        description: `Error updating profile: ${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        setImageUrl(user?.user_metadata?.avatar_url || "");
        setName(user?.user_metadata?.full_name || "");
        setInitialName(user?.user_metadata?.full_name || "");
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
              src={previewImage || imageUrl || avatar}
              alt="Profile Avatar"
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
              onChange={handleNameChange}
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
            width={["60%", "60%", "30%", "30%"]}
            height="5.8vh"
            border="none"
            bg={"rgba(0, 0, 0, 1)"}
            color="white"
            hoverBg="rgba(0, 0, 0, 0.7)"
            fontSize={["16px"]}
            fontWeight={500}
            borderRadius="8px"
            isDisabled={!changesMade}
            isLoading={loading}
            onClick={handleProfileUpdate}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
