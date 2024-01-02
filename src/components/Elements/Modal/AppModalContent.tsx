import { BoxProps, styled } from "@mui/material";
import { ModalContent } from "./ModalContent";
import React, { ReactNode, forwardRef, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { ModalFooterLayout } from "../../Layout/ModalFooterLayout";
import { MyButton } from "..";

const StyledAppModalContent = styled(ModalContent)`
  max-height: 100%;
  border-radius: 3px;
  border: 0.5px solid rgba(29, 30, 58, 0.60);
  background: #F0F1F4;
`;

const StyledMyConfirmButton = styled(MyButton)`
  border: 0.5px solid #1D1E3A99;
  color: #1D1E3A99;
  &:hover {
    color: white;
    background-color: #0e8a72;
    border: none;
  }
`;

const StyledMyCloseButton = styled(MyButton)`
  border: 0.5px solid #1D1E3A99;
  color: #1D1E3A99;
  &:hover {
    color: white;
    background-color: #5B5C6D;
    border: none;
  }
`;

type AppModalContentProps = {
  title: string;
  confirmLabel?: string;
  confirmButton?: ReactNode;
  closeLabel?: string;
  deleteLabel?: string;
  handleConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: () => void;
  handleDelete?: () => void;
  bodyComponent: ReactNode;
  renderExtraButtons?: () => ReactNode;
  height?: string;
  width?: string;
  isLoading?: boolean;
  boxBodyProps?: BoxProps;
}

export const AppModalContent = forwardRef<HTMLElement, AppModalContentProps>((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleClose,
    handleConfirm,
    title,
    confirmLabel = 'Xác nhận',
    closeLabel = 'Đóng',
    deleteLabel = 'Xóa',
    bodyComponent,
    handleDelete,
    height,
    width,
    confirmButton,
    boxBodyProps
  } = props;
  const handleSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsSubmitting(true);
    await (handleConfirm)(e);
    setIsSubmitting(false);
  }, []);

  return (
    <StyledAppModalContent
      isLoading={isSubmitting || props.isLoading}
      ref={ref}
      title={title}
      height={height ? height : 'fit-content'}
      width={width ? width : 'fit-content'}
      renderBody={() => (
        <Box
          p={2}
          overflow='auto'
          maxHeight='80vh'
          minHeight='20vh'
          minWidth='20vw'
          sx={{padding: '10px'}}
          {...boxBodyProps}
        >
          {bodyComponent}
        </Box>
      )}
      renderFooter={() => (
        <Box 
          p={2}
          sx={{padding: '0 10px 10px'}}
        >
          <ModalFooterLayout
            actionButton={
              confirmButton || (
                <StyledMyConfirmButton
                  variant="text"
                  onClick={(e) => handleSubmit(e)}
                >
                  {confirmLabel}
                </StyledMyConfirmButton>
              )
            }
            optionalButtons={[
              props.renderExtraButtons?.(),
              deleteLabel && handleDelete && (
                <MyButton
                  key={deleteLabel}
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  {deleteLabel}
                </MyButton>
              ),
              <StyledMyCloseButton
                key={closeLabel}
                variant="text"
                onClick={handleClose}
              >
                {closeLabel}
              </StyledMyCloseButton>
            ]}
          />
        </Box>
      )}
    />
  );
})
