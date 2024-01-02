import { styled, Box } from '@mui/material';
import background from '../assets/background.jpeg';

type LayoutProps = {
  children: React.ReactNode;
};

const StyledLayout = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
`;

export const AuthLayout = ({ children }: LayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>;
}