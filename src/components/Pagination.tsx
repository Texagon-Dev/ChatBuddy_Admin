import React from "react";
import { HStack, Stack, Text, Select, Button, Image } from "@chakra-ui/react";
import leftarrow from "../assets/lefttabel.svg";
import rightarrow from "../assets/righttable.svg";
import doubleright from "../assets/arrowright.svg";
import doubleleft from "../assets/arrowleft.svg";

interface PaginationProps {
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isLargerThan600: any;
  selection: any;
  perPage: any;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  isLargerThan600,
  selection,
  perPage,
}) => {
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <HStack justify={"space-between"} w={"full"} mb={2}>
      {isLargerThan600 && (
        <Stack w={"30%"}>
          <Text color={"#64748B"} fontWeight={400} fontSize={"14px"}>
            {selection}
          </Text>
        </Stack>
      )}
      <HStack w={["100%", "100%", "55%", "55%"]} justify={"space-between"}>
        <Stack direction={"row"} align={"center"} w={"full"}>
          <Text
            color={"rgba(15, 23, 42, 1)"}
            fontWeight={500}
            fontSize={"15px"}
          >
            {perPage}
          </Text>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            w={["full", "full", "25%", "25%"]}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Select>
          <Text
            color={"rgba(15, 23, 42, 1)"}
            fontWeight={500}
            fontSize={"15px"}
            ml={5}
          >
            page {currentPage} of {totalPages}
          </Text>
        </Stack>
        <HStack>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            border={"1px solid rgba(226, 232, 240, 0.5)"}
            bg={"white"}
            _hover={{
              bg: "#F0F4FF",
            }}
          >
            <Image w={"14"} h={"14"} src={doubleleft} alt="right" />
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            border={"1px solid rgba(226, 232, 240, 0.5)"}
            bg={"white"}
            _hover={{
              bg: "#F0F4FF",
            }}
          >
            <Image w={"14"} h={"14"} src={leftarrow} alt="left" />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage !== totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            _hover={{
              bg: "#F0F4FF",
            }}
            border={"1px solid rgba(226, 232, 240, 0.5)"}
            bg={"white"}
          >
            <Image w={"14"} h={"14"} src={rightarrow} alt="right" />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            border={"1px solid rgba(226, 232, 240, 0.5)"}
            bg={"white"}
            _hover={{
              bg: "#F0F4FF",
            }}
          >
            <Image w={"14"} h={"14"} src={doubleright} alt="right" />
          </Button>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Pagination;
