import { Tooltip, TooltipProps } from "@mui/material";

export function MyTooltip(props: TooltipProps) {
  return (
    <Tooltip {...props}>{props.children}</Tooltip>
  )
}
