import Config from '../Config';

class Stat {
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
        return Stat.post('/generate', {options: options});
    }
}

export default Stat;