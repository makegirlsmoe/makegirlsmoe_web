class Utils {
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static keyToString(key) {
        return key.split('_').map(Utils.capitalize).join(' ');
    }

    static arrayToObject(arr, key, value) {
        var res = {};
        for (var i = 0; i < arr.length; i++) {
            res[key(arr[i])] = value ? value(arr[i]) : arr[i];
        }
        return res;
    }

    static randomNormal(ref) {
        var u = 1 - Math.random();
        var v = 1 - Math.random();
        if (typeof ref === 'function') {
            ref(u, v);
        }
        return Utils.uniformToNormal(u, v);
    }

    static uniformToNormal(u, v) {
        return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static usingCellularData() {
        var con = window.navigator.connection;
        if (con) {
            return con.type === 'cellular';
        }

        var ua = window.navigator.userAgent;
        if(/MicroMessenger/.test(ua)) {
            if (/NetType/.test(ua)) {
                var type = ua.match(/NetType\/(\S*)/);
                return type.indexOf('2G') !== -1 || type.indexOf('3G') !== -1 || type.indexOf('4G') !== -1;
            }
        }

        return false;
    }

    static sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
    }

    static flatMap(arr, lambda) {
        return Array.prototype.concat.apply([], arr.map(lambda));
    };
}

export default Utils