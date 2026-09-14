import type { ComponentProps } from "react";

import {
  RiArrowRightLine,
  RiCalendarLine,
  RiCircleLine,
  RiDownloadLine,
  RiFileCopyLine,
  RiLinkedinBoxFill,
  RiMailLine,
  RiMapPinLine,
  RiSearchLine,
  RiTwitterXFill,
} from "@remixicon/react";

type IconProps = ComponentProps<typeof RiSearchLine>;

export function SearchIcon(props: IconProps) {
  return <RiSearchLine aria-hidden="true" {...props} />;
}

export function MailIcon(props: IconProps) {
  return <RiMailLine aria-hidden="true" {...props} />;
}

export function CopyIcon(props: IconProps) {
  return <RiFileCopyLine aria-hidden="true" {...props} />;
}

export function LocationIcon(props: IconProps) {
  return <RiMapPinLine aria-hidden="true" {...props} />;
}

export function CalendarIcon(props: IconProps) {
  return <RiCalendarLine aria-hidden="true" {...props} />;
}

export function ArrowRightIcon(props: IconProps) {
  return <RiArrowRightLine aria-hidden="true" {...props} />;
}

export function DownloadIcon(props: IconProps) {
  return <RiDownloadLine aria-hidden="true" {...props} />;
}

export function SocialIcon({ name, ...props }: IconProps & { name: string }) {
  const common = {
    "aria-hidden": true,
    ...props,
  };

  switch (name) {
    case "x":
      return <RiTwitterXFill {...common} />;

    case "linkedin":
      return <RiLinkedinBoxFill {...common} />;

    case "mail":
      return <MailIcon {...common} />;

    default:
      return <RiCircleLine {...common} />;
  }
}
