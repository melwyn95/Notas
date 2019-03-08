import { isTrashFolder } from './utils';

const OPTION_DELETE = {
    operation: 'delete',
    label: 'Delete',
};
const OPTION_MOVE = {
    operation: 'move',
    label: 'Move',
};
const OPTION_RESTORE = {
    operation: 'restore',
    label: 'Restore'
};

const options = (folder) => (
    folder && [(isTrashFolder(folder) ? OPTION_RESTORE : OPTION_MOVE), OPTION_DELETE]) || [];


export {
    options,
    OPTION_DELETE,
    OPTION_MOVE,
    OPTION_RESTORE
}