import React from "react";
import { Text, Input, HStack, Image } from "@chakra-ui/react";
import inputarrow from "../assets/input arrow.svg";

export const EditableField: React.FC<any> = ({
  value,
  onChange,
  isEditing,
  toggleEditing,
}) => {
  return (
    <HStack w={"full"} h={"auto"} justify={"space-between"}>
      {isEditing ? (
        <Input
          fontWeight={500}
          fontSize={"24px"}
          color={"rgba(13, 6, 45, 1)"}
          w={"full"}
          h={"5vh"}
          border={"1px solid rgba(231, 234, 238, 1)"}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Text fontWeight={500} fontSize={"24px"} color={"rgba(13, 6, 45, 1)"}>
          {value}
        </Text>
      )}
      <Image
        src={inputarrow}
        w={"7"}
        h={"7"}
        alt="arrow"
        cursor={"pointer"}
        onClick={toggleEditing}
      />
    </HStack>
  );
};
