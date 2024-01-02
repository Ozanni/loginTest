import { TreeView, TreeViewProps, TreeItemProps } from '@mui/x-tree-view';
import { styled } from '@mui/material';
import { MyTreeItem } from './MyTreeItem';

const StyledTreeView = styled(TreeView)`
    min-width: 250px;
    overflow-y: auto;
`;

export interface IRenderTree {
    MyTreeItemProps: TreeItemProps;
    children?: readonly IRenderTree[];
}

type MyTreeViewProps = TreeViewProps<any> & {
    trees: IRenderTree[];
};

const render = (trees: IRenderTree[]) => trees.length ? trees.map((tree) => (
    <MyTreeItem key={tree.MyTreeItemProps.nodeId} {...tree.MyTreeItemProps}>
        {Array.isArray(tree.children) ? render(tree.children) : null}
    </MyTreeItem>
)) : '';

export function MyTreeView(props: MyTreeViewProps) {
    return (
        <StyledTreeView 
            {...props}
        >
            {render(props.trees)}
        </StyledTreeView>
    );
};