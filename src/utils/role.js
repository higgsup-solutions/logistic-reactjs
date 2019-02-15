export const hasPermission = (listPermissions, permissionName) => {
    if (listPermissions.includes(permissionName)) {
        return true;
    } else {
        return false;
    }
};