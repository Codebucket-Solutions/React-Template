import { store } from './index';

export const getDataFromStore = (section) => {
    return store.getState()[section];
}
