import { IconButton, IconButtonProps } from "@mui/material";
import { forwardRef } from "react";

export const MyIconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props: IconButtonProps, ref) => {
  return (
    <IconButton
      {...props}
      ref={ref}
    >
      {props.children}
    </IconButton>
  )
})
