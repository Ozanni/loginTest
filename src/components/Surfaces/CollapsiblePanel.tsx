import CloseIcon from '@mui/icons-material/Close';
import { Paper, styled, SxProps, Typography } from '@mui/material';
import { FC, useCallback, ReactNode } from 'react';
import { filterTransientProps } from '../../utils/filterTransientProps';
import { selectCollapsiblePanelHeight, setCollapsiblePanelHeight } from '../../stores/layoutSlice';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { IMousePosition } from '../../hooks/useMousePosition';
import { DragHandler } from './DragHandler';

type CloseablePanelProps = {
  title?: string;
  initialExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
  isNotToggle?: boolean;
  sx?: SxProps;
  children?: ReactNode;
};

export const CloseableCollapsiblePanel: FC<CloseablePanelProps> = (props) => {
  const { onClose, initialExpanded = true, ...rest } = props;
  const { isOpen, close } = useDisclosure(true);
  const handleClose = useCallback(() => {
    onClose && onClose();
    close();
  }, [close, onClose]);
  return isOpen ? (
    <CollapsiblePanel {...rest} initialExpanded={initialExpanded} onClose={handleClose} />
  ) : (
    <></>
  );
};
export const CollapsiblePanel: FC<CloseablePanelProps> = (props) => {
  const {
    title,
    initialExpanded = false,
    onClose,
    onExpand,
    onCollapse,
    sx,
    isNotToggle,
  } = props;
  // Move useDisclosure here because the open/close state of this panel is local
  // to this component only
  const { isOpen, toggle } = useDisclosure(initialExpanded);
  const height = useSelector(selectCollapsiblePanelHeight);
  const dispatch = useDispatch();
  const configTitle = `Cấu hình thuộc tính - ${title}`

  const handleExpand = useCallback(() => {
    if (isOpen) onCollapse && onCollapse();
    else onExpand && onExpand();
    toggle();
  }, [isOpen, onCollapse, onExpand, toggle]);

  const handleDragEnd = useCallback(
    (delta: IMousePosition) => {
      const newHeight = height - (delta.y ?? 0);
      dispatch(setCollapsiblePanelHeight(newHeight));
    },
    [dispatch, height],
  );

  return (
    <StyledContainer sx={sx}>
      {isOpen && (
        <DragHandler type="horizontal" onDrag={handleDragEnd} mouseEvent="mouseup" />
      )}
      <StyledHeader>
        <StyledTitleGroup
          $isNotToggle={isNotToggle}
          onClick={!isNotToggle ? handleExpand : undefined}
        >
          {configTitle && (
            <Typography
              px={1}
              textTransform="uppercase"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {configTitle}
            </Typography>
          )}
        </StyledTitleGroup>

        {onClose && (
          <StyledCloseIcon onClick={onClose}>
            <CloseIcon />
          </StyledCloseIcon>
        )}
      </StyledHeader>
      <StyledChildrenContainer $isOpen={isOpen} $height={`${height}px`}>
        {isOpen && props.children}
      </StyledChildrenContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  /* bottom: 0; */
  border-radius: 3px;
  width: 100%;
  max-width: 100%;
`;

const StyledHeader = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${(props) => props.theme.spacing(4)};
  white-space: nowrap;
  border-top: 0;
  border-bottom: 0;
  background: #0E8A72;
`;

const StyledTitleGroup = styled('div', filterTransientProps)<{
  $isNotToggle?: boolean;
}>`
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border-left: 0;
  border-right: 0;
  align-items: center;
`;

const StyledChildrenContainer = styled(Paper, filterTransientProps)<{
  $isOpen: boolean;
  $height: string;
}>`
  height: ${(props) => (props.$isOpen ? props.$height : 0)};
  transition: height ${(props) => props.theme.transitions.duration.standard}ms
    ${(props) => props.theme.transitions.easing.easeOut};
  overflow: auto;
  box-shadow: none;
`;

const StyledActionIcon = styled('div')`
`;

const StyledCloseIcon = styled(StyledActionIcon)`
  color: white;
  position: absolute;
  right: 0;
  &:hover {
    cursor: pointer; 
  }
`;
