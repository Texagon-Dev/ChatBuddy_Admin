import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { AuthButton } from "./AuthButton";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  allData: any[];
  itemsPerPage: number;
  currentData: any[];
}

export const NewPagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  allData,
  itemsPerPage,
  currentData,
}) => {
  const handleNextPage = () => {
    if (currentPage < Math.ceil(allData?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <HStack w={"full"} h={"8dvh"} justify={"space-between"}>
      {allData?.length > itemsPerPage && (
        <>
          <Text fontSize={"15px"} fontWeight={400} color={"#64748B"}>
            {`Showing ${currentData?.length} of ${allData?.length} results`}
          </Text>
          <HStack mt={1}>
            <AuthButton
              name="Previous"
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
              width="100%"
              height="5vh"
              border="1px solid #CBD5E0"
              color="#2D3748"
              bg="white"
              hoverBg="#CBD5E0"
              hoverColor="black"
              fontSize={["14px"]}
              fontWeight={600}
              borderRadius="8px"
              shadow="none"
              hoverBorder="1px solid rgba(226, 232, 240, 1)"
            />
            <AuthButton
              name="Next"
              onClick={handleNextPage}
              isDisabled={
                currentPage === Math.ceil(allData?.length / itemsPerPage)
              }
              width="100%"
              height="5vh"
              border="1px solid #CBD5E0"
              color="#2D3748"
              bg="white"
              hoverBg="#CBD5E0"
              hoverColor="black"
              fontSize={["14px"]}
              fontWeight={600}
              borderRadius="8px"
              shadow="none"
              hoverBorder="1px solid rgba(226, 232, 240, 1)"
            />
          </HStack>
        </>
      )}
    </HStack>
  );
};
