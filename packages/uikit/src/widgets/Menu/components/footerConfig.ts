import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: "About",
    items: [
      {
        label: "Company",
        href: "",
      },
      {
        label: "Docs",
        href: "",
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        label: "Twiter",
        href: "",
      },
      {
        label: "Discord",
        href: "",
      },
      {
        label: "Telegram",
        href: "",
      },
      {
        label: "Medium",
        href: "",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "",
      },
    ],
  },
];
