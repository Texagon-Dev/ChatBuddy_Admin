import {
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AuthButton } from "../../../components/AuthButton";
import { CustomCheckbox } from "../../../components/CustomCheckbox";

export const FilterDropdown: React.FC<{
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  availableTypes: any;
  handleApply: () => void;
}> = ({ selectedTypes, setSelectedTypes, availableTypes, handleApply }) => {
  const handleToggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item: string) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg={"none"}
        h={"4vh"}
        _hover={{ bg: "none" }}
      >
        Type
      </MenuButton>
      <MenuList>
        <Stack p={2}>
          {availableTypes.map((plan_id: any) => (
            <MenuItem
              key={plan_id}
              bg={"none"}
              _hover={{
                bg: "rgba(240, 244, 255, 1)",
              }}
              borderRadius={"6px"}
            >
              <HStack
                w={"full"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleType(plan_id);
                }}
              >
                <CustomCheckbox isChecked={selectedTypes.includes(plan_id)} />
                <Text fontSize={"16px"}>
                  {plan_id === 1
                    ? "Free"
                    : plan_id === 2
                    ? "Startup"
                    : plan_id === 3
                    ? "Pro"
                    : plan_id === 4
                    ? "Business"
                    : "N/A"}
                </Text>
              </HStack>
            </MenuItem>
          ))}

          <AuthButton
            name="Apply"
            width={["full"]}
            height="5vh"
            border="none"
            bg="black"
            color="rgba(255, 255, 255, 1)"
            hoverBg="black"
            hoverColor="white"
            fontSize={["14px", "14px", "17px", "17px"]}
            fontWeight={500}
            borderRadius="6px"
            onClick={handleApply}
          />
        </Stack>
      </MenuList>
    </>
  );
};
