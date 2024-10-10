import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";
import tick from "../assets/tick.svg";
export const CustomCheckbox: React.FC<any> = ({ isChecked, onChange }) => {
  return (
    <label style={{ display: "inline-block", cursor: "pointer" }}>
      <Checkbox
        isChecked={isChecked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Box
        style={{
          width: "15px",
          height: "15px",
          border: isChecked ? "none" : "1px solid black",
          borderRadius: "4px",
          backgroundColor: isChecked ? "black" : "transparent",
          transition: "background-color 0.2s",
          position: "relative",
        }}
      >
        {isChecked && (
          <img
            src={tick}
            alt="tick"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
            }}
          />
        )}
      </Box>
    </label>
  );
};
