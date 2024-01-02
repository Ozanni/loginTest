import { TreeItemProps, TreeItem } from '@mui/x-tree-view';
import { styled } from '@mui/material';
import { useLocation } from 'react-router-dom';

const StyledTreeItem = styled(TreeItem)`
    & > .MuiTreeItem-content {
        height: 25px;
    }
    & > .MuiTreeItem-content.Mui-selected, 
    .MuiTreeItem-content.Mui-selected.Mui-focused, 
    .MuiTreeItem-content.Mui-focused {
        background-color: #c8e3de;
        cursor: pointer;
    }
    &:hover {
        background-color: #c8e3de;
    }
`;

export function MyTreeItem(props: TreeItemProps) {
    const location = useLocation();

    return (
        <StyledTreeItem {...props} sx={{backgroundColor: props.nodeId === location.pathname.split('/').pop() ? '#c8e3de' : ''}} >
            {props.children}
        </StyledTreeItem>
    )
}