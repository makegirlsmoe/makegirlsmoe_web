import zh_CN from '../locale/zh_CN';
import en_US from '../locale/en_US';
import ja_JP from '../locale/ja_JP';
import ru_RU from '../locale/ru_RU';
import { localeConstants } from '../_constants';

const getLocaleMessage = (locale) => {
    switch(locale){
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        case 'ja':
            return ja_JP;
        case 'ru':
            return ru_RU;
        default:
            return en_US;
    }
};

const getDefaultLocale = () => {
    var preferredLanguage = navigator.language;

    if (preferredLanguage) {
        switch(preferredLanguage.slice(0,2)){
            case 'en':
                return 'en';
            case 'zh':
                return 'zh';
            case 'ja':
                return 'ja';
            case 'ru':
                return 'ru';
            default:
                return 'en';
        }
    }
    else {
        return 'en';
    }
};

let locale = getDefaultLocale();
let localeMessage = getLocaleMessage(locale);

const initialState = {locale: locale, localeMessage: localeMessage};

export function selectLocale(state = initialState, action) {
    switch (action.type) {
        case localeConstants.CHANGE:
            return {
                ...state,
                locale: action.locale,
                localeMessage: getLocaleMessage(action.locale)
            };
        default:
            return state
    }
}

export function getlanguageLength(locale) {
    switch(locale){
        case 'ru':
            return 'long';
        default:
            return 'normal';
    }
}