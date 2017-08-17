import Config from '../Config';
import Utils from './Utils';

class Stat {
    static get(url, query = {}) {
        return window.$.ajax({
            method: 'GET',
            url: Config.stat.urlPrefix + url,
            data: query,
            dataType: 'json'
        })
    }

    static post(url, data = {}) {
        if (Config.stat.enabled !== true) {
            return;
        }

        return window.$.ajax({
            method: 'POST',
            url: Config.stat.urlPrefix + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }).catch(() => {});
    }

    static init(data = {}) {
        return Stat.post('/init', data);
    }

    static modelLoaded(loadTime) {
        return Stat.post('/modelLoaded', {loadTime: loadTime});
    }

    static exit(reason) {
        return Stat.post('/exit', {exitReason: reason});
    }

    static generate(options) {
        var optionsConfig = Utils.arrayToObject(Config.options, item => item.key);
        options = Object.assign({}, options);
        Object.keys(options).forEach(key => {
            if (!optionsConfig.hasOwnProperty(key)) {
                delete options[key];
            }
            else {
                if (optionsConfig[key].type === 'multiple') {
                    options[key] = ['random'].concat(optionsConfig[key].options)[options[key]];
                }
                else {
                    options[key] = {'-1': 'off', '0': 'random', '1': 'on'}[options[key]];
                }
            }
        });
        return Stat.post('/generate', {options: options});
    }

    static share() {
        return Stat.post('/share');
    }

    static rate(input, value) {
        return Stat.post('/rate', {input: input, value: value});
    }

    static getSummary() {
        return Stat.get('/summary');
    }

    static getVisit() {
        return Stat.get('/visit');
    }

    static getAccess() {
        return Stat.get('/access');
    }

    static getAmount() {
        return Stat.get('/amount');
    }

    static getLabels() {
        return Stat.get('/labels');
    }
}

export default Stat;