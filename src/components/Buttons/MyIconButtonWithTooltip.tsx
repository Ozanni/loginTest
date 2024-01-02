import { MyTooltip } from "../Tooltip/MyTooltip";
import { MyIconButton } from "./MyIconButton";
import { IconButtonProps } from "@mui/material";

type MyIconButtonWithTooltipProps = {
    title?: string;
} & IconButtonProps;

export function MyIconButtonWithTooltip(props: MyIconButtonWithTooltipProps) {
    const { title, ...rest } = props;
  return (
    <MyTooltip title={title}>
      <span>
        <MyIconButton {...rest}>{props.children}</MyIconButton>
      </span>
    </MyTooltip>
  )
}
