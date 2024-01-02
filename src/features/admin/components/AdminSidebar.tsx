import { useMemo } from 'react';
import { MyTreeView } from '../../../components';
import { IRenderTree } from '../../../components';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { 
    ROUTE_ADMIN_HOSPITAL, 
    ROUTE_ADMIN_DOMAIN, 
    ROUTE_ADMIN_CONNECTION_ACCOUNT,
    ROUTE_ADMIN_CONFIG_ATTRIBUTE,
    ROUTE_ADMIN_USER_AUTHORIZATION,
    ROUTE_ADMIN_MODALITY_TYPE_NAME,
    ROUTE_ADMIN_BODY_PART,
    ROUTE_ADMIN_CONSUMABLE_TYPE,
    ROUTE_ADMIN_STATISTICS_TYPE,
    ROUTE_ADMIN_EXTENSION_TYPE
} from '..';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const sidebarNodes = {
    hospital: {
        id: 'hospital',
        label: 'Danh sách Bệnh viện',
        route: ROUTE_ADMIN_HOSPITAL
    },
    domain: {
        id: 'domain',
        label: 'Tên miền PACS',
        route: ROUTE_ADMIN_DOMAIN
    },
    connectionAccount: {
        id: 'connectionAccount',
        label: 'Tài khoản kết nối PACS',
        route: ROUTE_ADMIN_CONNECTION_ACCOUNT
    },
    configAttribute: {
        id: 'configAttribute',
        label: 'Thuộc tính cho cấu hình',
        route: ROUTE_ADMIN_CONFIG_ATTRIBUTE
    },
    userAuthorization: {
        id: 'role',
        label: 'Phân quyền người dùng',
        route: ROUTE_ADMIN_USER_AUTHORIZATION
    },
    modalityTypeName: {
        id: 'modalityTypeName',
        label: 'Tên loại ca chụp',
        route: ROUTE_ADMIN_MODALITY_TYPE_NAME
    },
    bodyPart: {
        id: 'bodyPart',
        label: 'Tên bộ phận chụp',
        route: ROUTE_ADMIN_BODY_PART
    },
    consumableType: {
        id: 'consumableType',
        label: 'Loại vật tư tiêu hao',
        route: ROUTE_ADMIN_CONSUMABLE_TYPE
    },
    statisticsType: {
        id: 'statisticsType',
        label: 'Loại báo cáo thống kê',
        route: ROUTE_ADMIN_STATISTICS_TYPE
    },
    extensionType: {
        id: 'extensionType',
        label: 'Chức năng mở rộng',
        route: ROUTE_ADMIN_EXTENSION_TYPE
    }
}

const StyledChildNodeWrapper = styled(Typography)`
    font-size: 14px;
    color: black;
`;

export function AdminSidebar() {
    const trees = useMemo<IRenderTree[]>(() => [
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.hospital.id,
                label: (
                    <Link to={sidebarNodes.hospital.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.hospital.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.domain.id,
                label: (
                    <Link to={sidebarNodes.domain.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.domain.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.connectionAccount.id,
                label: (
                    <Link to={sidebarNodes.connectionAccount.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.connectionAccount.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.configAttribute.id,
                label: (
                    <Link to={sidebarNodes.configAttribute.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.configAttribute.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.userAuthorization.id,
                label: (
                    <Link to={sidebarNodes.userAuthorization.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.userAuthorization.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.modalityTypeName.id,
                label: (
                    <Link to={sidebarNodes.modalityTypeName.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.modalityTypeName.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.bodyPart.id,
                label: (
                    <Link to={sidebarNodes.bodyPart.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.bodyPart.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.consumableType.id,
                label: (
                    <Link to={sidebarNodes.consumableType.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.consumableType.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.statisticsType.id,
                label: (
                    <Link to={sidebarNodes.statisticsType.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.statisticsType.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
        {
            MyTreeItemProps: {
                nodeId: sidebarNodes.extensionType.id,
                label: (
                    <Link to={sidebarNodes.extensionType.route} style={{textDecoration: 'none'}}>
                        <StyledChildNodeWrapper>{sidebarNodes.extensionType.label}</StyledChildNodeWrapper>
                    </Link>
                ),
                icon: <FolderIcon sx={{color: '#0e8a72'}}/>
            }
        },
    ], [])

    return (
        <MyTreeView 
            trees={trees}
        />
    )
}