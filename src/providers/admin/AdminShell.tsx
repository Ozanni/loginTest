import { Box, Divider, Stack, StackProps, styled, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { StyledTableContainerWithCollapsiblePanel } from '../../components/Table/MyTable.styles';

type AdminShellProps = {
  title?: string;
  FilterComponent?: ReactNode;
  TableComponent: ReactNode;
  PanelComponent?: ReactNode;
  ActionButtons?: ReactNode;
  ContainerProps?: StackProps;
};

/**
 * Handles UI Layout of an Admin page
 */
export const AdminShell: FC<AdminShellProps> = (props) => {
  const { title, TableComponent, PanelComponent, ContainerProps } =
    props;
  return (
    <StyledAdminWrapper spacing={1} {...ContainerProps}>
      <Stack>
        <StyledAdminTitleContainer>
          <StyledAdminTitle>{title}</StyledAdminTitle>
        </StyledAdminTitleContainer>
        <StyledAdminDivider />
      </Stack>
      <StyledTableContainerWithCollapsiblePanel>
        <StyledTableContainer>{TableComponent}</StyledTableContainer>
        {PanelComponent && PanelComponent}
      </StyledTableContainerWithCollapsiblePanel>
    </StyledAdminWrapper>
  );
};

/**
 * Styles
 */

const StyledAdminWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(0.5)};
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const StyledAdminTitleContainer = styled('div')`
  /* height: 30px; */
  align-items: center;
  display: flex;
`;

const StyledAdminTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-transform: uppercase;
`;
const StyledTableContainer = styled(Box)`
  display: flex;
  flex: 1;
  //margin-top: ${(props) => props.theme.spacing(1)};
  width: 100%;
  height: 0;
  max-height: 100%;
  overflow: hidden;
`;

const StyledAdminDivider = styled(Divider)`
  border-color: ${(props) => props.theme.palette.primary.main};
  width: 20%;
  min-width: 120px;
`;
