import { styled } from '@mui/material';
import { MyButton } from '../../../components';
import { MyFormGroupUnstyled } from '../../../components';

export const StyledLoginContainer = styled('div')`
  min-width: 450px;
  min-height: 350px;
  width: 450px;
  height: 350px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
`;

export const StyledLoginLogo = styled('div')`
  height: 100px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLoginButton = styled(MyButton)`
  width: 100px;
  height: 25px;
  font-size: 14px;
  font-weight: 400;
  color: #1D1E3A99;
  border: 0.5px solid #1D1E3A99;
  &:hover {
    color: white;
    background-color: #0e8a72;
    border: none;
  }
`;

export const StyledLoginForm = styled(MyFormGroupUnstyled)`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > div {
    margin: 8px;
  }
  & > button {
    margin: 8px;
  }
` as typeof MyFormGroupUnstyled;

export const StyledMessage = styled("div")`
  color: red;
  text-align: center;
  width: 100%;
  height: 5%;
`;