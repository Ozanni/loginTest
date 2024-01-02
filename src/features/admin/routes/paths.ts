export enum AdminPaths {
    Base = '/',
    Hospital = '/hospital',
    Domain = '/domain',
    ConnectionAccount = '/connectionAccount',
    ConfigAttribute = '/configAttribute',
    UserAuthorization = '/role',
    ModalityTypeName = '/modalityTypeName',
    BodyPart = '/bodyPart',
    ConsumableType = '/consumableType',
    StatisticsType = '/analyticsType',
    ExtensionType = '/extensionType'
}

export const ROUTE_ADMIN = '/admin';
export const ROUTE_ADMIN_HOSPITAL = `${ROUTE_ADMIN}${AdminPaths.Hospital}`;
export const ROUTE_ADMIN_DOMAIN = `${ROUTE_ADMIN}${AdminPaths.Domain}`;
export const ROUTE_ADMIN_CONNECTION_ACCOUNT = `${ROUTE_ADMIN}${AdminPaths.ConnectionAccount}`;
export const ROUTE_ADMIN_CONFIG_ATTRIBUTE = `${ROUTE_ADMIN}${AdminPaths.ConfigAttribute}`;
export const ROUTE_ADMIN_USER_AUTHORIZATION = `${ROUTE_ADMIN}${AdminPaths.UserAuthorization}`;
export const ROUTE_ADMIN_MODALITY_TYPE_NAME = `${ROUTE_ADMIN}${AdminPaths.ModalityTypeName}`;
export const ROUTE_ADMIN_BODY_PART = `${ROUTE_ADMIN}${AdminPaths.BodyPart}`;
export const ROUTE_ADMIN_CONSUMABLE_TYPE = `${ROUTE_ADMIN}${AdminPaths.ConsumableType}`;
export const ROUTE_ADMIN_STATISTICS_TYPE = `${ROUTE_ADMIN}${AdminPaths.StatisticsType}`;
export const ROUTE_ADMIN_EXTENSION_TYPE = `${ROUTE_ADMIN}${AdminPaths.ExtensionType}`;