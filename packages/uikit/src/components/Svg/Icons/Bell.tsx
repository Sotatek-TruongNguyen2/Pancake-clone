import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 256 256" {...props}>
      <line
        x1="96"
        y1="228"
        x2="160"
        y2="228"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <path
        d="M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V108c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </Svg>
  );
};

export default Icon;
