import {localeConstants, twitterConstants} from '../_constants';

export const localeAction = {
    changeLocale,
};

export const twitterAction ={
    enableTwitterTimeline,
    disableTwitterTimeline,
};

function changeLocale(locale) {
    return { type: localeConstants.CHANGE, locale };
}

function enableTwitterTimeline(){
    return { type: twitterConstants.CHANGE_VISIBILITY, value: true}
}

function disableTwitterTimeline(){
    return { type: twitterConstants.CHANGE_VISIBILITY, value: false}
}