import React from "react";
import { Button, Text, Spinner, Image, Icon } from "@chakra-ui/react";

export interface WelcomeButtonProps {
  name: string;
  onClick?: () => void;
  isLoading?: boolean;
  bg?: string;
  hoverBg?: string;
  height?: string;
  width?: string | string[];
  imagewidth?: string | string[];
  imageheight?: string;
  color?: string;
  image?: string;
  hoverImage?: any;
  border?: string;
  mb?: string | number;
  fontSize?: string[];
  hoverColor?: string;
  hoverBorder?: string;
  fontWeight?: number;
  type?: "submit";
  borderRadius?: string;
}

export const AuthButton: React.FC<WelcomeButtonProps> = ({
  name,
  onClick,
  isLoading,
  bg,
  hoverBg,
  height,
  width,
  color,
  image,
  hoverImage,
  fontSize,
  border,
  mb,
  hoverColor,
  hoverBorder,
  fontWeight,
  type,
  borderRadius,
  imageheight,
  imagewidth,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Button
      disabled={isLoading}
      type={type}
      height={height}
      borderRadius={borderRadius ? borderRadius : "6px"}
      bg={bg}
      onClick={onClick}
      width={width}
      mb={mb}
      border={border ? border : "1px solid #6C60E0"}
      color={color}
      _hover={{
        bg: hoverBg ? hoverBg : "brand.main",
        color: hoverColor,
        border: hoverBorder ? hoverBorder : "1px solid black",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isHovered && hoverImage ? (
            <Icon as={hoverImage} w={5} h={5} mr={3} />
          ) : (
            <>
              {image ? (
                <Image
                  src={image}
                  w={imagewidth ? imagewidth : ["7", "7", "7", "7"]}
                  h={imageheight ? imageheight : ["7", "7", "7", "7"]}
                  mr={3}
                />
              ) : null}
            </>
          )}
          <Text
            fontSize={fontSize ? fontSize : ["20", "20", "22", "22"]}
            fontWeight={fontWeight ? fontWeight : 500}
            lineHeight="29px"
            textAlign="center"
          >
            {name}
          </Text>
        </>
      )}
    </Button>
  );
};
