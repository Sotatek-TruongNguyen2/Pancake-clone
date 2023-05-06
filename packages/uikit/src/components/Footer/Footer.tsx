import { vars } from "@pancakeswap/ui/css/vars.css";
import { useIsMounted } from "@pancakeswap/hooks";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import { StyledFooter, StyledList, StyledListItem, StyledText } from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import { SkeletonV2 } from "../Skeleton";
import { Image } from "../Image";
import { useMatchBreakpoints } from "../../contexts";

const title = {
  dark: "/images/nav-title-dark.png",
  light: "/images/nav-title-light.png",
};

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  buyCakeLink,
  ...props
}) => {
  const isMounted = useIsMounted();
  const { isMobile } = useMatchBreakpoints();
  return (
    <StyledFooter
      data-theme="dark"
      p={["40px 16px", null, "56px 40px 32px 40px"]}
      position="relative"
      {...props}
      justifyContent="center"
    >
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <Flex
          order={[2, null, 1]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          <Flex flexDirection="column" alignItems={isMobile ? "left" : "center"} style={{ gap: "15px" }} mb="24px">
            <Image src={isDark ? title.dark : title.light} width={130} height={28} />

            <Flex order={[1, null, 2]} justifyContent="space-between" alignItems="center">
              <Box mr="20px">
                <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" />
              </Box>
              <Button
                data-theme={isDark ? "dark" : "light"}
                as="a"
                href={buyCakeLink}
                target="_blank"
                scale="sm"
                endIcon={<ArrowForwardIcon color="backgroundAlt" />}
              >
                {buyCakeLabel}
              </Button>
            </Flex>
            <Flex order={[2, null, 1]} alignItems="center">
              <SkeletonV2 variant="round" width="56px" height="32px" isDataReady={isMounted}>
                <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
              </SkeletonV2>
              <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                color="textSubtle"
                dropdownPosition="top-right"
              />
            </Flex>
          </Flex>

          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      data-theme="dark"
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? vars.colors.warning : "text"}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
        </Flex>
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
