import {localeConstants} from '../_constants';

export const localeAction = {
    changeLocale,
};
function changeLocale(locale) {
    return { type: localeConstants.CHANGE, locale };
}
