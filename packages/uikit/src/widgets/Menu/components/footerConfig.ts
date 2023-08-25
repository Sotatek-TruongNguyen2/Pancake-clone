import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: "Community",
    items: [
      {
        label: "Twitter",
        href: "https://twitter.com/NikaSwapChannel",
      },
      {
        label: "Telegram",
        href: "https://t.me/NikaSwapAnn",
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
      {
        label: "Docs",
        href: "https://docs.nikaswap.com/",
      },
    ],
  },
];
