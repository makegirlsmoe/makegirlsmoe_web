(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.WebDNN = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}











function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var WeightDecoderEightbit = (function () {
    function WeightDecoderEightbit() {
    }
    WeightDecoderEightbit.prototype.decode = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded_arrays, total_dst_length, data_view, src_offset, dst_offset_1, body_size, scale, scaled_table, i, src_data_view, inflate, decompressed, dec_size, decoded_array, s, dst, dst_offset, i;
            return __generator(this, function (_a) {
                decoded_arrays = [];
                total_dst_length = 0;
                data_view = new DataView(data.buffer, data.byteOffset);
                src_offset = 0;
                while (src_offset < data.length) {
                    dst_offset_1 = data_view.getInt32(src_offset, true);
                    src_offset += 4;
                    body_size = data_view.getInt32(src_offset, true);
                    src_offset += 4;
                    scale = data_view.getFloat32(src_offset, true);
                    src_offset += 8;
                    scaled_table = new Float32Array(256);
                    for (i = 0; i < 256; i++) {
                        scaled_table[i] = WeightDecoderEightbit.decode_table[i & 0x7F] * scale * (i < 128 ? 1.0 : -1.0);
                    }
                    src_data_view = new Uint8Array(data.buffer, data.byteOffset + src_offset, body_size);
                    inflate = new Zlib.Inflate(src_data_view);
                    decompressed = inflate.decompress();
                    dec_size = decompressed.length;
                    decoded_array = new Float32Array(dec_size);
                    for (s = 0; s < dec_size; s++) {
                        decoded_array[s] = scaled_table[decompressed[s]];
                    }
                    decoded_arrays.push(decoded_array);
                    total_dst_length += dec_size;
                    src_offset += body_size;
                }
                dst = new Float32Array(total_dst_length);
                dst_offset = 0;
                for (i = 0; i < decoded_arrays.length; i++) {
                    dst.set(decoded_arrays[i], dst_offset);
                    dst_offset += decoded_arrays[i].length;
                }
                return [2 /*return*/, dst];
            });
        });
    };
    WeightDecoderEightbit.decode_table = [0.0, 2.750000021e-06, 7.249999726e-06, 1.875000089e-05, 3.624999954e-05, 5.874999624e-05, 8.624999464e-05,
        1.437500032e-04, 2.312500001e-04, 3.187500115e-04, 4.062500084e-04, 5.187499919e-04, 6.562499912e-04,
        7.937499322e-04, 9.312499315e-04, 1.218750025e-03, 1.656249980e-03, 2.093750052e-03, 2.531250007e-03,
        2.968749963e-03, 3.406249918e-03, 3.843750106e-03, 4.281249829e-03, 4.843750037e-03, 5.531250034e-03,
        6.218749564e-03, 6.906249560e-03, 7.593749557e-03, 8.281249553e-03, 8.968749084e-03, 9.656248614e-03,
        1.109374966e-02, 1.328125037e-02, 1.546875015e-02, 1.765624993e-02, 1.984374970e-02, 2.203124948e-02,
        2.421874925e-02, 2.640625089e-02, 2.859375067e-02, 3.078125045e-02, 3.296874836e-02, 3.515625000e-02,
        3.734375164e-02, 3.953124955e-02, 4.171875119e-02, 4.390624911e-02, 4.671875015e-02, 5.015625060e-02,
        5.359374732e-02, 5.703124776e-02, 6.046874821e-02, 6.390624493e-02, 6.734374911e-02, 7.078124583e-02,
        7.421874255e-02, 7.765624672e-02, 8.109374344e-02, 8.453124017e-02, 8.796874434e-02, 9.140624106e-02,
        9.484373778e-02, 9.828124195e-02, 1.054687500e-01, 1.164062470e-01, 1.273437440e-01, 1.382812560e-01,
        1.492187530e-01, 1.601562500e-01, 1.710937470e-01, 1.820312440e-01, 1.929687560e-01, 2.039062530e-01,
        2.148437500e-01, 2.257812470e-01, 2.367187440e-01, 2.476562560e-01, 2.585937381e-01, 2.695312500e-01,
        2.804687619e-01, 2.914062440e-01, 3.023437560e-01, 3.132812381e-01, 3.242187500e-01, 3.351562619e-01,
        3.460937440e-01, 3.570312560e-01, 3.679687381e-01, 3.789062500e-01, 3.898437619e-01, 4.007812440e-01,
        4.117187560e-01, 4.226562381e-01, 4.335937500e-01, 4.445312619e-01, 4.585937560e-01, 4.757812321e-01,
        4.929687381e-01, 5.101562142e-01, 5.273437500e-01, 5.445312262e-01, 5.617187023e-01, 5.789062381e-01,
        5.960937142e-01, 6.132812500e-01, 6.304687262e-01, 6.476562023e-01, 6.648437381e-01, 6.820312142e-01,
        6.992186904e-01, 7.164062262e-01, 7.335937023e-01, 7.507811785e-01, 7.679687142e-01, 7.851561904e-01,
        8.023436666e-01, 8.195312023e-01, 8.367186785e-01, 8.539061546e-01, 8.710936904e-01, 8.882811666e-01,
        9.054686427e-01, 9.226561785e-01, 9.398436546e-01, 9.570311308e-01, 9.742186666e-01, 9.914061427e-01, 1.0,
    ];
    return WeightDecoderEightbit;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var WeightDecoderRaw = (function () {
    function WeightDecoderRaw() {
    }
    WeightDecoderRaw.prototype.decode = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Float32Array(data.buffer, data.byteOffset, data.byteLength / 4)];
            });
        });
    };
    return WeightDecoderRaw;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
function get_weight_decoder(name) {
    switch (name) {
        case 'raw':
            return new WeightDecoderRaw();
        case 'eightbit':
            return new WeightDecoderEightbit();
        default:
            throw new Error('Unknown weight encoding');
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @private
 */
var NOT_SCHEDULED = -1;
/**
 * Schedule function which is called too much frequently.
 *
 * @private
 */
var DispatchScheduler = (function () {
    function DispatchScheduler() {
        this.scheduledCallbackId = NOT_SCHEDULED;
    }
    /**
     * Register scheduled function. If already other function is scheduled, it is canceled and dispatcher will dispatch only
     * function which is registered at last.
     * @param fn scheduled function
     */
    DispatchScheduler.prototype.request = function (fn) {
        var _this = this;
        this.fn = fn;
        if (this.scheduledCallbackId == NOT_SCHEDULED) {
            this.scheduledCallbackId = requestAnimationFrame(function () { return _this.forceDispatch(); });
        }
    };
    /**
     * Dispatch scheduled function just now. If no function is scheduled, dispatcher do nothing.
     */
    DispatchScheduler.prototype.forceDispatch = function () {
        if (this.scheduledCallbackId == NOT_SCHEDULED)
            return;
        this.cancel();
        this.fn();
    };
    /**
     * Cancel scheduled function. If no function is scheduled, dispatcher do nothing.
     */
    DispatchScheduler.prototype.cancel = function () {
        if (this.scheduledCallbackId == NOT_SCHEDULED)
            return;
        cancelAnimationFrame(this.scheduledCallbackId);
        this.scheduledCallbackId = NOT_SCHEDULED;
    };
    return DispatchScheduler;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var transformDelegate = function (url) { return url; };
/**
 * Transform url generated based on current active backend
 * @param url transformed url
 * @protected
 */
function transformUrl(url) {
    return transformDelegate(url);
}
/**
 * Register delegate function for transform url.
 * @param delegate Delegate function which will be called with original url, and must return converted url strings.
 * @protected
 */
function registerTransformUrlDelegate(delegate) {
    transformDelegate = delegate;
}
/**
 * Fetch function. WebDNN API use this function instead of original `fetch` function.
 * FIXME
 * @param input Requested url
 * @param init Additional information about webdnnFetch
 * @param init.ignoreCache If true, cache is ignored by appending '?t=(timestamp)' to the end of request url.
 * @returns Response
 * @protected
 */
function webdnnFetch(input, init) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof input == 'string') {
                        input = transformUrl(input) + ((init && init.ignoreCache) ? '?t=' + Date.now() : '');
                    }
                    else {
                        input = Object.assign({}, input, {
                            url: transformUrl(input.url) + ((init && init.ignoreCache) ? '?t=' + Date.now() : '')
                        });
                    }
                    if (!(typeof input == 'string' && isXHR2WithBlobSupported())) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchUsingXHR(input, init && init.progressCallback)];
                case 1:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch(input, init)];
                case 3:
                    res = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!res.ok)
                        throw new Error("Fetch returns status code " + res.status + ": " + res.statusText);
                    return [2 /*return*/, res];
            }
        });
    });
}
/**
 * Read `Response.body` stream as ArrayBuffer. This function provide progress information by callback.
 * @param res Response object
 * @param callback Callback function.
 * @returns ArrayBuffer
 * @protected
 */
function readArrayBufferProgressively(res, callback) {
    if (!callback || !res.body)
        return res.arrayBuffer();
    var contentLength = res.headers.get('Content-Length');
    if (!contentLength)
        return res.arrayBuffer();
    var total = parseInt(contentLength);
    var buffer = new Uint8Array(total);
    var loaded = 0;
    var reader = res.body.getReader();
    var callbackScheduler = new DispatchScheduler();
    function accumulateLoadedSize(chunk) {
        buffer.set(chunk.value, loaded);
        loaded += chunk.value.length;
        if (callback) {
            callbackScheduler.request(function () { return callback(loaded, total); });
        }
        if (loaded == total) {
            callbackScheduler.forceDispatch();
            return buffer.buffer;
        }
        else {
            return reader.read().then(accumulateLoadedSize);
        }
    }
    return reader.read().then(accumulateLoadedSize);
}
/**
 * check whether XMLHttpRequest with Blob type is supported or not
 * @protected
 */
function isXHR2WithBlobSupported() {
    if (!window.hasOwnProperty('ProgressEvent') || !window.hasOwnProperty('FormData')) {
        return false;
    }
    var xhr = new XMLHttpRequest();
    if (typeof xhr.responseType === 'string') {
        try {
            xhr.responseType = 'blob';
            return xhr.responseType === 'blob';
        }
        catch (e) {
            return false;
        }
    }
    else {
        return false;
    }
}
/**
 * fetch with XMLHttpRequest
 * @protected
 */
function fetchUsingXHR(url, callback) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "blob";
        var callbackScheduler = new DispatchScheduler();
        req.onload = function (event) {
            callbackScheduler.forceDispatch();
            var res = new Response(req.response);
            resolve(res);
        };
        req.onprogress = function (event) {
            if (callback) {
                callbackScheduler.request(function () { return callback(event.loaded, event.total); });
            }
        };
        req.onerror = function (event) {
            reject(event);
        };
        req.send(null);
    });
}

/**
 * @module webdnn
 */
/**
 * PlaceholderContext manages the placeholders
 * @protected
 */
var PlaceholderContext = (function () {
    function PlaceholderContext(values) {
        this.values = {};
        if (values) {
            this.update(values);
        }
    }
    Object.defineProperty(PlaceholderContext.prototype, "isResolved", {
        get: function () {
            return Object.values(this.values).every(function (value) { return typeof value == 'number'; });
        },
        enumerable: true,
        configurable: true
    });
    PlaceholderContext.prototype.update = function (values) {
        this.values = Object.assign(this.values, values);
    };
    PlaceholderContext.prototype.resolve = function (placeholder) {
        var _this = this;
        // Literal value => return itself.
        if (typeof placeholder !== 'object')
            return placeholder;
        // Placeholder object ( { eval: string } ) => resolve
        if (Object.keys(placeholder).length == 1 && 'eval' in placeholder) {
            if (!this.isResolved)
                throw Error("Not all placeholders are resolved: " + this);
            return (function (placeholders) { return eval(placeholder.eval); })(this.values);
        }
        // Array => deep copy
        if (placeholder instanceof Array) {
            return placeholder.map(function (value) { return _this.resolve(value); });
        }
        // Object => deep copy
        return Object.entries(placeholder)
            .reduce(function (result, _a) {
            var key = _a[0], value = _a[1];
            result[key] = _this.resolve(value);
            return result;
        }, {});
    };
    PlaceholderContext.prototype.toString = function () {
        return JSON.stringify(this.values);
    };
    return PlaceholderContext;
}());

/**
 * @protected
 */
function flatten(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var v = arr[i];
        if (v instanceof Array) {
            result.splice(result.length, 0, flatten(v));
        }
        else {
            result[result.length] = v;
        }
    }
    return result;
}
/**
 * SymbolicTypedArray is wrapper class of buffers used in DNN model.
 */
var SymbolicTypedArray = (function () {
    /**
     * toActual:
     *
     * If this buffer view is initialized based on placeholder offset or size and the placeholder is not resolved,
     * the error is thrown.
     */
    /**
     * @param {Allocation} allocation
     * @param {PlaceholderContext} placeholderContext
     * @param {boolean} ignoreOffsetOnActual
     * @protected
     */
    function SymbolicTypedArray(allocation, placeholderContext, ignoreOffsetOnActual) {
        if (ignoreOffsetOnActual === void 0) { ignoreOffsetOnActual = false; }
        this.ignoreOffsetOnActual = ignoreOffsetOnActual;
        this.allocation = allocation;
        if (this.isDynamic) {
            if (!placeholderContext) {
                throw Error('PlaceholderContext must be required when SymbolicTypedArray is initialized as dynamic buffer view.');
            }
        }
        this.placeholderContext = placeholderContext;
    }
    /**
     * @protected
     */
    SymbolicTypedArray.prototype.setArrayBuffer = function (arrayBuffer) {
        this.arrayBuffer = arrayBuffer;
    };
    Object.defineProperty(SymbolicTypedArray.prototype, "name", {
        /**
         * @protected
         */
        get: function () {
            return this.allocation.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolicTypedArray.prototype, "isDynamic", {
        /**
         * @protected
         */
        get: function () {
            return (typeof this.allocation.offset !== 'number' || typeof this.allocation.size !== 'number');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolicTypedArray.prototype, "offset", {
        /**
         * @protected
         */
        get: function () {
            //TODO
            if (this.isDynamic) {
                return this.placeholderContext.resolve(this.allocation.offset);
            }
            else {
                return this.allocation.offset;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolicTypedArray.prototype, "length", {
        /**
         * The number of elements in this buffer. Actual byte size is `(length * SIZE_OF_FLOAT)`.
         */
        get: function () {
            if (this.isDynamic) {
                return this.placeholderContext.resolve(this.allocation.size);
            }
            else {
                return this.allocation.size;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a value or an array of values.
     *
     * @param array A typed or untyped array of values to set.
     * @param offset The index at which the values will be written.
     */
    SymbolicTypedArray.prototype.set = function (array, offset) {
        return this.toActual().set(flatten(array), offset);
    };
    return SymbolicTypedArray;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var SymbolicFloat32Array = (function (_super) {
    __extends(SymbolicFloat32Array, _super);
    function SymbolicFloat32Array() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymbolicFloat32Array.prototype.toActual = function () {
        if (!this.arrayBuffer) {
            throw new Error('Internal buffer for this variable is not set. DescriptorRunner.setPlaceholderValue() have to be called before calling this function.');
        }
        return new Float32Array(this.arrayBuffer, this.ignoreOffsetOnActual ? 0 : this.offset * Float32Array.BYTES_PER_ELEMENT, this.length);
    };
    return SymbolicFloat32Array;
}(SymbolicTypedArray));

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * `DescriptorRunner` provides interface to execute DNN model and access input and output buffers.
 */
var DescriptorRunner = (function () {
    function DescriptorRunner() {
        /**
         * For Developper:
         *
         * `DescriptorRunner` executes computation based on `GraphDescriptor`.
         *
         * Typically, DescriptorRunner takes 3 steps to execute DNN model.
         *
         * 1. Initialize static configurations
         *
         *    Initialize things independent from runtime configuration.
         *
         *      - `init()`
         *      - `load()`
         *
         * 2. Initialize dynamic configurations
         *
         *    Initialize things depend on runtime configuration such as batch size, input image size, etc.
         *
         *      - `setPlaceholderValue()`
         *      - `getInputViews()`
         *      - `getOutputViews()`
         *
         * 3. Execute the model
         *
         *      - `run()`
         *
         * You need to do step 1 and 2 only once. We recommend to call `WebDNN.prepareAll()` instead
         * to call `GraphDescriptor#load()` directly. In that method, all procedures in step 1 and 2 are performed.
         */
        this._running = false;
        this.descriptor = null;
        /**
         * @protected
         */
        this.ignoreCache = false;
    }
    Object.defineProperty(DescriptorRunner.prototype, "running", {
        /**
         * Return `true` if model is running.
         * While running, calling run() again or modifying input is invalid.
         */
        get: function () {
            return this._running;
        },
        enumerable: true,
        configurable: true
    });
    return DescriptorRunner;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @private
 */
function wait(duration) {
    if (duration === void 0) { duration = 10; }
    // let console.log to be displayed, and prevent freeze
    return new Promise(function (resolve) { return setTimeout(resolve, duration); });
}
/**
 * @protected
 */
var DescriptorRunnerFallback = (function (_super) {
    __extends(DescriptorRunnerFallback, _super);
    function DescriptorRunnerFallback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backendName = 'fallback';
        return _this;
    }
    DescriptorRunnerFallback.checkAvailability = function () {
        return true;
    };
    DescriptorRunnerFallback.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerFallback.prototype.load = function (directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, descriptor, weightRawArray;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            webdnnFetch(directory + "/graph_" + this.backendName + ".json", { ignoreCache: this.ignoreCache, progressCallback: progressCallback })
                                .then(function (res) { return res.json(); }),
                            webdnnFetch(directory + "/weight_" + this.backendName + ".bin", { ignoreCache: this.ignoreCache })
                                .then(function (res) { return readArrayBufferProgressively(res, progressCallback); })
                        ])];
                    case 1:
                        _a = _b.sent(), descriptor = _a[0], weightRawArray = _a[1];
                        this.setDescriptor(descriptor);
                        return [4 /*yield*/, this.compile()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.initializeStaticBuffer(weightRawArray)];
                    case 3:
                        _b.sent();
                        if (!(this.placeholderContext && this.placeholderContext.isResolved)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerFallback.prototype.setDescriptor = function (descriptor) {
        this.descriptor = descriptor;
        // reset
        this.placeholderContext = new PlaceholderContext();
        this.placeholderContext.update(descriptor.placeholders);
        this.kernelObj = null;
        this.variableMap = null;
        this.outputViews = null;
        this.inputViews = null;
        this.staticBuffer = null;
        this.dynamicBuffer = null;
    };
    DescriptorRunnerFallback.prototype.compile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dnn_fallback_kernel;
            return __generator(this, function (_a) {
                if (!this.descriptor)
                    throw new Error('Descriptor is not loaded');
                dnn_fallback_kernel = null;
                eval(this.descriptor.kernel_source);
                this.kernelObj = dnn_fallback_kernel;
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerFallback.prototype.initializeStaticBuffer = function (weightRawArray) {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, staticBuffer, variableMap, decoder, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        descriptor = this.descriptor;
                        staticBuffer = new Float32Array(descriptor.memory_layout.static.size);
                        this.staticBuffer = staticBuffer;
                        variableMap = this.variableMap || new Map();
                        this.variableMap = variableMap;
                        Object.entries(descriptor.memory_layout.static.allocations)
                            .forEach(function (_a) {
                            var name = _a[0], allocation = _a[1];
                            variableMap.set(name, new Float32Array(staticBuffer.buffer, allocation.offset * Float32Array.BYTES_PER_ELEMENT, allocation.size));
                        });
                        decoder = get_weight_decoder(this.descriptor.weight_encoding);
                        _b = (_a = staticBuffer).set;
                        return [4 /*yield*/, decoder.decode(new Uint8Array(weightRawArray))];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, this.getInputViews()];
                    case 2:
                        (_c.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(staticBuffer.buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 3:
                        (_c.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(staticBuffer.buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerFallback.prototype.initializeDynamicBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, placeholderContext, dynamicBuffer, variableMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized');
                        descriptor = this.descriptor;
                        placeholderContext = this.placeholderContext;
                        dynamicBuffer = new Float32Array(placeholderContext.resolve(descriptor.memory_layout.dynamic.size));
                        this.dynamicBuffer = dynamicBuffer;
                        variableMap = this.variableMap || new Map();
                        this.variableMap = variableMap;
                        Object.entries(descriptor.memory_layout.dynamic.allocations)
                            .forEach(function (_a) {
                            var name = _a[0], allocation = _a[1];
                            variableMap.set(name, new Float32Array(dynamicBuffer.buffer, placeholderContext.resolve(allocation.offset) * Float32Array.BYTES_PER_ELEMENT, placeholderContext.resolve(allocation.size)));
                        });
                        return [4 /*yield*/, this.getInputViews()];
                    case 1:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(dynamicBuffer.buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 2:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(dynamicBuffer.buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerFallback.prototype.setPlaceholderValue = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var placeholderContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.placeholderContext)
                            throw new Error('placeholderContext is not initialized');
                        placeholderContext = this.placeholderContext;
                        placeholderContext.update(values);
                        if (!placeholderContext.isResolved)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerFallback.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variableMap, placeholderContext, executionInfos, startDate, lastDate, i, currentDate, executionInfo, inputs, outputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._running)
                            throw new Error('Calling another run() while running.');
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        if (!this.placeholderContext)
                            throw new Error('placeholderContext is not initialized');
                        if (!this.variableMap)
                            throw new Error('Variable map is not initialized');
                        if (!this.staticBuffer)
                            throw new Error('StaticBuffer map is not initialized');
                        if (!this.dynamicBuffer)
                            throw new Error('DynamicBuffer map is not initialized');
                        if (!this.inputViews || !this.outputViews)
                            throw new Error('getInputViews() and getOutputViews() must be called prior to run');
                        variableMap = this.variableMap;
                        placeholderContext = this.placeholderContext;
                        executionInfos = this.descriptor.exec_infos
                            .map(function (executionInfo) { return placeholderContext.resolve(executionInfo); });
                        startDate = Date.now();
                        lastDate = Date.now();
                        this._running = true;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < executionInfos.length)) return [3 /*break*/, 5];
                        currentDate = Date.now();
                        if (!(currentDate - lastDate >= 1000)) return [3 /*break*/, 3];
                        console.log("Processed " + i + "/" + executionInfos.length + " kernels in " + (currentDate - startDate) + " ms");
                        lastDate = currentDate;
                        return [4 /*yield*/, wait()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        executionInfo = executionInfos[i];
                        inputs = executionInfo.inputs.map(function (name) { return variableMap.get(name); });
                        outputs = executionInfo.outputs.map(function (name) { return variableMap.get(name); });
                        this.kernelObj[executionInfo.entry_func_name](inputs, outputs, executionInfo.call_option);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        console.log("Processed " + executionInfos.length + "/" + executionInfos.length + " kernels in " + (Date.now() - startDate) + " ms");
                        this._running = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerFallback.prototype.getInputViews = function () {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            var view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.inputViews;
    };
    DescriptorRunnerFallback.prototype.getOutputViews = function () {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            var view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.outputViews;
    };
    return DescriptorRunnerFallback;
}(DescriptorRunner));

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var DescriptorRunnerWebassembly = (function (_super) {
    __extends(DescriptorRunnerWebassembly, _super);
    function DescriptorRunnerWebassembly() {
        var _this = _super.call(this) || this;
        _this.backendName = 'webassembly';
        _this.worker_promise_reject_func = null;
        _this.worker_initial_error = null;
        if (typeof Worker === 'undefined')
            throw new Error('WebWorker is needed for WebAssembly backend');
        if (typeof WebAssembly !== 'object') {
            console.warn('WebAssembly is not supported on this browser, trying to use asm.js code');
        }
        return _this;
    }
    DescriptorRunnerWebassembly.checkAvailability = function () {
        return 'Worker' in window;
    };
    DescriptorRunnerWebassembly.prototype.init = function () {
        if (!DescriptorRunnerWebassembly.checkAvailability())
            throw Error('WebAssembly backend is not supported in this browser.');
        //nothing to do
        return Promise.resolve();
    };
    DescriptorRunnerWebassembly.prototype.load = function (directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var graph_url, graph_fetch, _a, kernel_backend, worker_entry_js_path, weight_url, weight_fetch, weights_data_ab;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        graph_url = directory + "/graph_" + this.backendName + ".json";
                        return [4 /*yield*/, webdnnFetch(graph_url, { ignoreCache: this.ignoreCache })];
                    case 1:
                        graph_fetch = _b.sent();
                        _a = this;
                        return [4 /*yield*/, graph_fetch.json()];
                    case 2:
                        _a.descriptor = _b.sent();
                        this.placeholderContext = new PlaceholderContext(this.descriptor.placeholders);
                        kernel_backend = typeof WebAssembly === 'object' ? 'webassembly' : 'asmjs';
                        worker_entry_js_path = directory + "/kernels_" + kernel_backend + ".js";
                        if (this.ignoreCache) {
                            worker_entry_js_path += '?t=' + Date.now();
                        }
                        worker_entry_js_path = transformUrl(worker_entry_js_path);
                        this.worker_entry_js_path = worker_entry_js_path;
                        return [4 /*yield*/, this.compile()];
                    case 3:
                        _b.sent();
                        weight_url = directory + "/weight_" + this.backendName + ".bin";
                        return [4 /*yield*/, webdnnFetch(weight_url, { ignoreCache: this.ignoreCache, progressCallback: progressCallback })];
                    case 4:
                        weight_fetch = _b.sent();
                        return [4 /*yield*/, readArrayBufferProgressively(weight_fetch, progressCallback)];
                    case 5:
                        weights_data_ab = _b.sent();
                        return [4 /*yield*/, this.loadWeights(new Uint8Array(weights_data_ab))];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.getInputViews()];
                    case 7:
                        //assign buffer to input/output buffer view
                        (_b.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer((new Float32Array(view.length)).buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 8:
                        (_b.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer((new Float32Array(view.length)).buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebassembly.prototype.setPlaceholderValue = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var placeholderContext, descriptor, unresolvedValueLists, metaBufferFillList, _loop_1, kernel_order, dynamicBufferSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized.');
                        placeholderContext = this.placeholderContext;
                        placeholderContext.update(values);
                        if (!placeholderContext.isResolved)
                            return [2 /*return*/];
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        descriptor = this.descriptor;
                        unresolvedValueLists = descriptor.unresolved_value_lists;
                        metaBufferFillList = [];
                        _loop_1 = function (kernel_order) {
                            var unresolvedValueList = unresolvedValueLists[kernel_order];
                            unresolvedValueList.forEach(function (offset_placeholder) {
                                var resolved_value = placeholderContext.resolve(offset_placeholder.placeholder);
                                metaBufferFillList.push(kernel_order, offset_placeholder.offset, resolved_value);
                            });
                        };
                        for (kernel_order = 0; kernel_order < unresolvedValueLists.length; kernel_order++) {
                            _loop_1(kernel_order);
                        }
                        return [4 /*yield*/, this.getInputViews()];
                    case 1:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer((new Float32Array(view.length)).buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 2:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer((new Float32Array(view.length)).buffer); });
                        dynamicBufferSize = this.placeholderContext.resolve(this.descriptor.memory_layout.dynamic.size);
                        return [4 /*yield*/, this.setPlaceholderValueWorker(dynamicBufferSize, new Int32Array(metaBufferFillList))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebassembly.prototype.setPlaceholderValueWorker = function (dynamicBufferSize, metaBufferFillArray) {
        if (!this.worker)
            throw Error("Worker is not initialized");
        var worker = this.worker;
        return new Promise(function (resolve, reject) {
            worker.onmessage = function (event) {
                if (event.data === 0) {
                    resolve();
                }
                else {
                    console.log(event.data);
                    worker.terminate();
                    reject(new Error(event.data));
                }
            };
            worker.postMessage({ type: 'set_dynamic_buffer', size: dynamicBufferSize, data: metaBufferFillArray });
        });
    };
    DescriptorRunnerWebassembly.prototype.compile = function () {
        var _this = this;
        var worker = new Worker(this.worker_entry_js_path);
        worker.onerror = function (event) {
            console.error(event);
            _this._running = false;
            // console.error('Worker Exception: ' + event.message);
            if (_this.worker_promise_reject_func) {
                _this.worker_promise_reject_func(event);
            }
            else {
                _this.worker_initial_error = event;
            }
        };
        var promise = new Promise(function (resolve, reject) {
            // occurs when this.worker_entry_js_path is 404
            if (_this.worker_initial_error)
                return reject(_this.worker_initial_error);
            _this.worker_promise_reject_func = reject;
            worker.onmessage = function (event) {
                if (event.data === 0) {
                    resolve();
                }
                else {
                    console.error(event.data);
                    worker.terminate();
                    reject(new Error(event.data));
                }
            };
        });
        this.worker = worker;
        return promise;
    };
    DescriptorRunnerWebassembly.prototype.loadWeights = function (weightsData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var decoder, weight_data, worker, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        if (!this.worker)
                            throw new Error('Worker is not initialized');
                        decoder = get_weight_decoder(this.descriptor.weight_encoding);
                        return [4 /*yield*/, decoder.decode(weightsData)];
                    case 1:
                        weight_data = _a.sent();
                        worker = this.worker;
                        promise = new Promise(function (resolve, reject) {
                            _this.worker_promise_reject_func = reject;
                            worker.onmessage = function (event) {
                                if (event.data === 0) {
                                    resolve();
                                }
                                else {
                                    console.log(event.data);
                                    worker.terminate();
                                    reject(new Error(event.data));
                                }
                            };
                            worker.postMessage({ type: 'weight', data: weight_data }, [weight_data.buffer]);
                        });
                        return [2 /*return*/, promise];
                }
            });
        });
    };
    DescriptorRunnerWebassembly.prototype.getInputViews = function () {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            var view = new SymbolicFloat32Array(allocation, placeholderContext, true);
            return view;
        });
        return this.inputViews;
    };
    DescriptorRunnerWebassembly.prototype.getOutputViews = function () {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            // buffer for SymbolicFloat32Array is dedicated for IO, since computation is performed on separate memory space.
            var view = new SymbolicFloat32Array(allocation, placeholderContext, true);
            return view;
        });
        return this.outputViews;
    };
    DescriptorRunnerWebassembly.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var descriptor, worker, inputViews, outputViews, promise;
            return __generator(this, function (_a) {
                // if (this._running) throw new Error('Calling another run() while running.');
                if (!this.descriptor)
                    throw new Error('Descriptor is not loaded');
                if (!this.inputViews || !this.outputViews)
                    throw new Error('getInputViews and getOutputViews must be called prior to run');
                if (!this.worker)
                    throw new Error('Worker is not initialized');
                descriptor = this.descriptor;
                worker = this.worker;
                inputViews = this.inputViews;
                outputViews = this.outputViews;
                promise = new Promise(function (resolve, reject) {
                    // TODO: better way not to generate function on every run
                    _this.worker_promise_reject_func = reject;
                    worker.onmessage = function (event) {
                        if (Array.isArray(event.data)) {
                            for (var i = 0; i < event.data.length; i++) {
                                outputViews[i].set(event.data[i]);
                            }
                            _this._running = false;
                            resolve();
                        }
                        else {
                            console.log(event.data);
                            worker.terminate();
                            _this._running = false;
                            reject(new Error(event.data));
                        }
                    };
                    var allocations = [descriptor.memory_layout.static.allocations, descriptor.memory_layout.dynamic.allocations];
                    var inputs = [];
                    for (var i = 0; i < descriptor.inputs.length; i++) {
                        for (var allocation_space = 0; allocation_space < 2; allocation_space++) {
                            var var_alloc = allocations[allocation_space][descriptor.inputs[i]];
                            if (var_alloc) {
                                var symAb = inputViews[i];
                                inputs.push({
                                    space: allocation_space,
                                    offset: symAb.offset,
                                    size: symAb.length,
                                    data: symAb.toActual()
                                });
                                break;
                            }
                        }
                    }
                    var outputs = [];
                    for (var i = 0; i < descriptor.outputs.length; i++) {
                        for (var allocation_space = 0; allocation_space < 2; allocation_space++) {
                            var var_alloc = allocations[allocation_space][descriptor.outputs[i]];
                            if (var_alloc) {
                                var symAb = outputViews[i];
                                outputs.push({ space: allocation_space, offset: symAb.offset, size: symAb.length });
                                break;
                            }
                        }
                    }
                    _this._running = true;
                    worker.postMessage({ type: 'run', inputs: inputs, outputs: outputs });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    return DescriptorRunnerWebassembly;
}(DescriptorRunner));

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/// <reference path="./webgl2.d.ts" />
/**
 * @protected
 */
function isWebGL2(gl) {
    return gl.constructor.name === 'WebGL2RenderingContext';
}
var instance;
/**
 * @protected
 */
var WebGLHandler = (function () {
    /**
     * WebGLHandler is singleton class and instantiate directly is forbidden (constructor is hidden).
     *
     * Since the number of GPU contexts may be limited, the handler is used as a singleton
     * and only one context is shared among multiple runners.
     */
    function WebGLHandler() {
        this.gl = checkNull(WebGLHandler.initializeContext());
    }
    WebGLHandler.getInstance = function () {
        if (!instance)
            instance = new WebGLHandler();
        return instance;
    };
    WebGLHandler.prototype.createTexture = function (textureWidth, textureHeight, internalFormat, format) {
        var gl = this.gl;
        var texture = checkNull(gl.createTexture());
        gl.activeTexture(gl.TEXTURE0 + 9); // TODO: texture unit 9 is always available?
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, textureWidth, textureHeight, 0, format, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    };
    WebGLHandler.prototype.createVertexShader = function (source) {
        return this.createShader(this.gl.VERTEX_SHADER, source);
    };
    WebGLHandler.prototype.createFragmentShader = function (source) {
        return this.createShader(this.gl.FRAGMENT_SHADER, source);
    };
    WebGLHandler.prototype.createShader = function (type, source) {
        var shader = checkNull(this.gl.createShader(type));
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
            throw Error("Shader Compile failed: " + this.gl.getShaderInfoLog(shader));
        }
        return shader;
    };
    WebGLHandler.prototype.createProgram = function (vertexShader, fragmentShader) {
        var program = checkNull(this.gl.createProgram());
        this.gl.attachShader(program, fragmentShader);
        this.gl.attachShader(program, vertexShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error(this.gl.getProgramInfoLog(program));
            throw Error('ShaderProgram Initialization failed.');
        }
        return program;
    };
    WebGLHandler.prototype.createArrayBuffer = function (vertexArray) {
        var buffer = checkNull(this.gl.createBuffer());
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.STATIC_DRAW);
        return buffer;
    };
    WebGLHandler.prototype.createFrameBuffer = function () {
        return checkNull(this.gl.createFramebuffer());
    };
    WebGLHandler.prototype.bindArrayBuffer = function (buffer) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    };
    WebGLHandler.prototype.bindFrameBuffer = function (frameBuffer, width, height) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);
        this.gl.viewport(0, 0, width, height);
        this.gl.scissor(0, 0, width, height);
    };
    WebGLHandler.prototype.useProgram = function (program) {
        this.gl.useProgram(program);
    };
    WebGLHandler.prototype.deleteTexture = function (texture) {
        this.gl.deleteTexture(texture);
    };
    WebGLHandler.initializeWebGL2Context = function (canvas) {
        if (canvas === void 0) { canvas = document.createElement('canvas'); }
        var gl;
        gl = (canvas.getContext('webgl2'));
        if (!gl)
            return null;
        if (!gl.getExtension('EXT_color_buffer_float'))
            return null;
        if (getConfiguration('DEBUG', false) && !gl.getExtension('WEBGL_debug_renderer_info'))
            return null;
        return gl;
    };
    WebGLHandler.initializeWebGL1Context = function (canvas) {
        if (canvas === void 0) { canvas = document.createElement('canvas'); }
        var gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        if (!gl)
            return null;
        if (!gl.getExtension('OES_texture_float'))
            return null;
        if (WebGLHandler.IS_SAFARI) {
            //TODO(Kiikurage)
            // Safari supports WebGL with OES_TEXTURE_FLOAT extension. However,
            // currently when WebGLRenderingContext#readPixels is called, an error is thrown.
            return null;
        }
        if (getConfiguration('DEBUG', false) && !gl.getExtension('WEBGL_debug_renderer_info'))
            return null;
        return gl;
    };
    WebGLHandler.initializeContext = function () {
        var canvas = document.createElement('canvas');
        var gl;
        gl = WebGLHandler.initializeWebGL2Context(canvas);
        if (gl) {
            if (getConfiguration('DEBUG', false))
                console.info('WebGL2 is enabled');
        }
        else {
            gl = WebGLHandler.initializeWebGL1Context(canvas);
            if (gl) {
                if (getConfiguration('DEBUG', false))
                    console.info('WebGL2 is disabled');
            }
            else {
                return null;
            }
        }
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.STENCIL_TEST);
        gl.disable(gl.BLEND);
        gl.disable(gl.DITHER);
        gl.disable(gl.POLYGON_OFFSET_FILL);
        gl.disable(gl.SAMPLE_COVERAGE);
        gl.enable(gl.SCISSOR_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        return gl;
    };
    /**
     * Check whether WebGL is supported or not
     * @protected
     */
    WebGLHandler.checkAvailability = function () {
        if (availability === null) {
            var gl = WebGLHandler.initializeContext();
            if (!gl) {
                availability = false;
            }
            else if (getConfiguration('MAX_TEXTURE_SIZE', gl.getParameter(gl.MAX_TEXTURE_SIZE)) < 4096) {
                availability = false;
            }
            else {
                availability = true;
            }
        }
        return availability;
    };
    WebGLHandler.prototype.waitForComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gl, sync, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gl = this.gl;
                        if (!isWebGL2(gl)) return [3 /*break*/, 4];
                        sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
                        status_1 = gl.clientWaitSync(sync, 0, 0);
                        _a.label = 1;
                    case 1:
                        if (!(status_1 !== gl.CONDITION_SATISFIED && status_1 !== gl.ALREADY_SIGNALED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1); })];
                    case 2:
                        _a.sent();
                        status_1 = gl.clientWaitSync(sync, 0, 0);
                        return [3 /*break*/, 1];
                    case 3:
                        gl.deleteSync(sync);
                        return [3 /*break*/, 5];
                    case 4:
                        gl.finish();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WebGLHandler.IS_SAFARI = navigator.userAgent.toLowerCase().indexOf('safari') !== -1 && navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
    return WebGLHandler;
}());
var availability = null;
function checkNull(obj) {
    if (obj === null)
        throw Error('Null is detected');
    return obj;
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * Abstract buffer interface. Read/write transactions are regarded as asynchronous operation.
 *
 * @protected
 */
var Buffer = (function () {
    function Buffer(byteLength, backend) {
        this.byteLength = byteLength;
        this.backend = backend;
    }
    return Buffer;
}());

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var BufferWebGL = (function (_super) {
    __extends(BufferWebGL, _super);
    function BufferWebGL(byteLength, textureWidth, textureHeight, name, array, channelMode) {
        var _this = _super.call(this, byteLength, 'webgl') || this;
        _this._texture = null;
        _this.readTextureUnitIndices = [];
        _this.isBoundToDrawFrameBuffer = false;
        _this.handler = WebGLHandler.getInstance();
        _this.name = name;
        _this.channelMode = channelMode;
        switch (channelMode) {
            case 'RGBA':
                _this.elementsPerPixel = 4;
                break;
            case 'R':
                _this.elementsPerPixel = 1;
                break;
            default:
                throw Error('Unknown channel mode');
        }
        if (isWebGL2(_this.handler.gl)) {
            switch (channelMode) {
                case 'RGBA':
                    _this.textureFormat = _this.handler.gl.RGBA;
                    _this.textureInternalFormat = _this.handler.gl.RGBA32F;
                    _this.pixelStride = 4;
                    break;
                case 'R':
                    _this.textureFormat = _this.handler.gl.RED;
                    _this.textureInternalFormat = _this.handler.gl.R32F;
                    _this.pixelStride = 1;
                    break;
                default:
                    throw Error('Unknown channel mode');
            }
        }
        else {
            // In WebGL1, always RGBA channel mode is specified. If R channel mode is specified in graph descriptor,
            // other 3 channels are not used.
            _this.textureFormat = _this.handler.gl.RGBA;
            _this.textureInternalFormat = _this.handler.gl.RGBA;
            _this.pixelStride = 4;
        }
        if (_this.pixelStride < _this.elementsPerPixel)
            throw Error('elementsPerPixel must be smaller than pixelStride');
        _this.array = array || new Float32Array(_this.length);
        _this.textureWidth = textureWidth;
        _this.textureHeight = textureHeight;
        return _this;
    }
    Object.defineProperty(BufferWebGL.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWebGL.prototype, "length", {
        get: function () {
            return this.byteLength / Float32Array.BYTES_PER_ELEMENT;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Write contents onto specified position synchronously.
     *
     * @param {ArrayBufferView} src contents source buffer
     * @param {number} offset position where contents are written on
     */
    BufferWebGL.prototype.write = function (src, offset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.array.set(src, offset);
                        return [4 /*yield*/, this.syncWriteViews()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read contents from specified position synchronously.
     *
     * @param {Float32ArrayConstructor | Int32ArrayConstructor} dst buffer where contents are written on
     * @param {number} offset position where contents are read from
     * @param {length} length contents length
     */
    BufferWebGL.prototype.read = function (dst, offset, length) {
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dst !== Float32Array)
                            throw new Error('Currently, only Float32Array is supported for parameter \'dst\'.');
                        return [4 /*yield*/, this.syncReadViews()];
                    case 1:
                        _a.sent();
                        new Float32Array(this.array.buffer, offset * Float32Array.BYTES_PER_ELEMENT, length);
                        return [2 /*return*/];
                }
            });
        });
    };
    BufferWebGL.prototype.getWriteView = function (offset, length, type) {
        return new type(this.array.buffer, offset * type.BYTES_PER_ELEMENT, length);
    };
    
    BufferWebGL.prototype.getReadView = function (offset, length, type) {
        return new type(this.array.buffer, offset * type.BYTES_PER_ELEMENT, length);
    };
    /**
     * Sync buffered data into memory.
     *
     * @see Buffer#getWriteView
     */
    BufferWebGL.prototype.syncWriteViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gl, tmp, tmp2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gl = this.handler.gl;
                        if (!this.texture)
                            this.allocateTexture();
                        tmp = this.pack(this.array);
                        if (tmp.length != this.textureWidth * this.textureHeight * this.pixelStride) {
                            tmp2 = new Float32Array(this.textureWidth * this.textureHeight * this.elementsPerPixel);
                            tmp2.set(tmp, 0);
                            tmp = tmp2;
                        }
                        return [4 /*yield*/, this.bindToReadTexture(9)];
                    case 1:
                        _a.sent(); //TODO: texture unit 9 is always available?
                        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.textureWidth, this.textureHeight, this.textureFormat, gl.FLOAT, tmp);
                        this.unbindFromReadTexture();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sync memory data into buffer view.
     *
     * @see Buffer#getReadView
     */
    BufferWebGL.prototype.syncReadViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gl, ELEMENT_PER_PIXEL, FORMAT, tmp;
            return __generator(this, function (_a) {
                gl = this.handler.gl;
                ELEMENT_PER_PIXEL = 4;
                FORMAT = gl.RGBA;
                tmp = new Float32Array(this.textureWidth * this.textureHeight * ELEMENT_PER_PIXEL);
                this.bindToDrawTexture();
                gl.readPixels(0, 0, this.textureWidth, this.textureHeight, FORMAT, gl.FLOAT, tmp);
                this.unbindFromDrawTexture();
                tmp = this.unpack(tmp);
                this.array.set(tmp.slice(0, this.length), 0);
                return [2 /*return*/];
            });
        });
    };
    BufferWebGL.prototype.bindToReadTexture = function (unit) {
        return __awaiter(this, void 0, void 0, function () {
            var gl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBoundToDrawFrameBuffer)
                            throw Error('This buffer is already registered as draw buffer. ' +
                                'You may forgot to unbind the binding while previous operations.');
                        gl = this.handler.gl;
                        if (!!this.texture) return [3 /*break*/, 2];
                        this.allocateTexture();
                        return [4 /*yield*/, this.syncWriteViews()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        gl.activeTexture(gl.TEXTURE0 + unit);
                        gl.bindTexture(gl.TEXTURE_2D, this.texture);
                        this.readTextureUnitIndices.push(unit);
                        return [2 /*return*/];
                }
            });
        });
    };
    BufferWebGL.prototype.unbindFromReadTexture = function () {
        var gl = this.handler.gl;
        for (var _i = 0, _a = this.readTextureUnitIndices; _i < _a.length; _i++) {
            var unit = _a[_i];
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        this.readTextureUnitIndices = [];
    };
    BufferWebGL.prototype.bindToDrawTexture = function () {
        if (this.readTextureUnitIndices.length > 0)
            throw Error('This buffer is already registered as read buffer. ' +
                'You cannot bind a texture as both read and draw texture buffer at same time.');
        if (this.isBoundToDrawFrameBuffer)
            throw Error('This buffer is already registered as draw buffer. ' +
                'You may forgot to unbind the binding while previous operations.');
        var gl = this.handler.gl;
        if (!this.texture)
            this.allocateTexture();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        this.isBoundToDrawFrameBuffer = true;
    };
    BufferWebGL.prototype.unbindFromDrawTexture = function () {
        if (!this.isBoundToDrawFrameBuffer)
            return;
        var gl = this.handler.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);
        this.isBoundToDrawFrameBuffer = false;
    };
    BufferWebGL.prototype.pack = function (array) {
        var elementStride = this.pixelStride / this.elementsPerPixel;
        if (elementStride === 1) {
            return new Float32Array(array);
        }
        else {
            var result = new Float32Array(array.length * elementStride);
            for (var i = 0; i < array.length; i++)
                result[i * elementStride] = array[i];
            return result;
        }
    };
    BufferWebGL.prototype.unpack = function (array) {
        // FIXME(Kiikurage): more readable code
        var PIXEL_STRIDE = 4;
        var elementStride = PIXEL_STRIDE / this.elementsPerPixel;
        if (elementStride === 1) {
            return new Float32Array(array);
        }
        else {
            var result = new Float32Array(array.length / elementStride);
            for (var i = 0; i < array.length / elementStride; i++)
                result[i] = array[i * elementStride];
            return result;
        }
    };
    BufferWebGL.prototype.allocateTexture = function () {
        if (this.texture)
            throw Error('Texture is already allocated.');
        this._texture = this.handler.createTexture(this.textureWidth, this.textureHeight, this.textureInternalFormat, this.textureFormat);
    };
    return BufferWebGL;
}(Buffer));

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
// [x y u v] * [upper-left, lower-left, upper-right, lower-right]
/**
 * @protected
 */
var vertexArray = new Float32Array([
    -1, +1,
    -1, -1,
    +1, +1,
    +1, -1,
]);
/**
 * @protected
 */
var DescriptorRunnerWebGL = (function (_super) {
    __extends(DescriptorRunnerWebGL, _super);
    function DescriptorRunnerWebGL() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backendName = 'webgl';
        return _this;
    }
    DescriptorRunnerWebGL.checkAvailability = function () {
        return WebGLHandler.checkAvailability();
    };
    DescriptorRunnerWebGL.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vertexBuffer;
            return __generator(this, function (_a) {
                if (!DescriptorRunnerWebGL.checkAvailability())
                    throw Error('WebGL backend is not supported in this browser.');
                this.handler = WebGLHandler.getInstance();
                vertexBuffer = this.handler.createArrayBuffer(vertexArray);
                this.handler.bindArrayBuffer(vertexBuffer);
                this.buffers = new Map();
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerWebGL.prototype.load = function (directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var MAX_TEXTURE_SIZE, _a, descriptor, weightRawArray;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        MAX_TEXTURE_SIZE = getConfiguration('MAX_TEXTURE_SIZE', this.handler.gl.getParameter(this.handler.gl.MAX_TEXTURE_SIZE));
                        // FIXME: In most case, MAX_TEXTURE_SIZE=4096 is the fastest (Why?).
                        if (MAX_TEXTURE_SIZE >= 16384) {
                            MAX_TEXTURE_SIZE = 4096;
                        }
                        else if (MAX_TEXTURE_SIZE >= 8192) {
                            MAX_TEXTURE_SIZE = 4096;
                        }
                        else if (MAX_TEXTURE_SIZE >= 4096) {
                            MAX_TEXTURE_SIZE = 4096;
                        }
                        else {
                            throw new Error("MAX_TEXTURE_SIZE is too small: " + MAX_TEXTURE_SIZE);
                        }
                        return [4 /*yield*/, Promise.all([
                                webdnnFetch(directory + "/graph_" + this.backendName + "_" + MAX_TEXTURE_SIZE + ".json", {
                                    ignoreCache: this.ignoreCache
                                })
                                    .then(function (res) { return res.json(); }),
                                webdnnFetch(directory + "/weight_" + this.backendName + "_" + MAX_TEXTURE_SIZE + ".bin", {
                                    ignoreCache: this.ignoreCache,
                                    progressCallback: progressCallback
                                })
                                    .then(function (res) { return readArrayBufferProgressively(res, progressCallback); })
                            ])];
                    case 1:
                        _a = _b.sent(), descriptor = _a[0], weightRawArray = _a[1];
                        return [4 /*yield*/, this.setDescriptor(descriptor)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.compile()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.initializeStaticBuffer(weightRawArray)];
                    case 4:
                        _b.sent();
                        if (!(this.placeholderContext && this.placeholderContext.isResolved)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGL.prototype.initializeStaticBuffer = function (weightRawArray) {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, decoder, weight, buffers, mapping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        descriptor = this.descriptor;
                        decoder = get_weight_decoder(this.descriptor.weight_encoding);
                        return [4 /*yield*/, decoder.decode(new Uint8Array(weightRawArray))];
                    case 1:
                        weight = _a.sent();
                        buffers = this.buffers;
                        mapping = descriptor.memory_layout.mapping;
                        Object.entries(descriptor.memory_layout.static.allocations)
                            .forEach(function (_a) {
                            var name = _a[0], _b = _a[1], width = _b.width, height = _b.height, size = _b.size, channel_mode = _b.channel_mode;
                            buffers.set(name, new BufferWebGL(size * Float32Array.BYTES_PER_ELEMENT, width, height, name, null, channel_mode));
                        });
                        Object.entries(descriptor.constants_map)
                            .forEach(function (_a) {
                            var name = _a[0], _b = _a[1], size = _b.size, byte_offset = _b.byte_offset;
                            buffers.get(name).array.set(new Float32Array(weight.buffer, byte_offset, size));
                        });
                        return [4 /*yield*/, this.getInputViews()];
                    case 2:
                        (_a.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(buffers.get(mapping[view.name]).getWriteView(0, view.length, Float32Array).buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 3:
                        (_a.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(buffers.get(mapping[view.name]).getReadView(0, view.length, Float32Array).buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGL.prototype.initializeDynamicBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, placeholderContext, buffers, mapping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.descriptor)
                            throw Error("GraphDescriptor is not loaded.");
                        if (!this.placeholderContext)
                            throw Error("PlaceholderContext is not initialized.");
                        descriptor = this.descriptor;
                        placeholderContext = this.placeholderContext;
                        buffers = this.buffers;
                        mapping = descriptor.memory_layout.mapping;
                        Object.entries(descriptor.memory_layout.dynamic.allocations)
                            .forEach(function (_a) {
                            var name = _a[0], _b = _a[1], width = _b.width, height = _b.height, size = _b.size, channel_mode = _b.channel_mode;
                            buffers.set(name, new BufferWebGL(placeholderContext.resolve(size) * Float32Array.BYTES_PER_ELEMENT, placeholderContext.resolve(width), placeholderContext.resolve(height), name, null, channel_mode));
                        });
                        return [4 /*yield*/, this.getInputViews()];
                    case 1:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(buffers.get(mapping[view.name]).getWriteView(0, placeholderContext.resolve(view.length), Float32Array).buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 2:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(buffers.get(mapping[view.name]).getReadView(0, placeholderContext.resolve(view.length), Float32Array).buffer); });
                        this.buildPipeline();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGL.prototype.setDescriptor = function (descriptor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.descriptor = descriptor;
                //reset all datum depend on old descriptor
                this.placeholderContext = new PlaceholderContext(descriptor.placeholders);
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerWebGL.prototype.compile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var descriptor;
            return __generator(this, function (_a) {
                if (!this.descriptor)
                    throw new Error('Descriptor is not loaded');
                descriptor = this.descriptor;
                this.programs = new Map();
                this.vertexShader = this.handler.createVertexShader("\n            precision highp float;\n            attribute vec2 _xy;\n            void main() { \n              gl_Position = vec4(_xy, 0, 1); \n            }\n        ");
                Object.keys(descriptor.shader_sources)
                    .forEach(function (name) {
                    var fragmentShader = _this.handler.createFragmentShader(descriptor.shader_sources[name]);
                    var program = _this.handler.createProgram(_this.vertexShader, fragmentShader);
                    _this.programs.set(name, program);
                });
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerWebGL.prototype.setPlaceholderValue = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var placeholderContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized.');
                        placeholderContext = this.placeholderContext;
                        placeholderContext.update(values);
                        if (!placeholderContext.isResolved)
                            return [2 /*return*/];
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 1:
                        _a.sent();
                        // resolve placeholders in execution info
                        // TODO:
                        if (Object.keys(this.descriptor.placeholders).length > 0)
                            throw Error('Currently, WebGL backend doesn\'t support Placeholder feature.');
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGL.prototype.getInputViews = function () {
        var _this = this;
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        var mapping = this.descriptor.memory_layout.mapping;
        this.inputViews = descriptor.inputs.map(function (name) {
            var view = new SymbolicFloat32Array({
                name: name,
                size: _this.buffers.get(mapping[name]).length,
                offset: 0
            }, placeholderContext, true);
            return view;
        });
        return this.inputViews;
    };
    DescriptorRunnerWebGL.prototype.getOutputViews = function () {
        var _this = this;
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        var mapping = this.descriptor.memory_layout.mapping;
        this.outputViews = descriptor.outputs.map(function (name) {
            var view = new SymbolicFloat32Array({
                name: name,
                size: _this.buffers.get(mapping[name]).length,
                offset: 0
            }, placeholderContext, true);
            return view;
        });
        return this.outputViews;
    };
    DescriptorRunnerWebGL.prototype.buildPipeline = function () {
        var _this = this;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        if (!this.placeholderContext.isResolved)
            throw new Error("Not all placeholders are resolved: " + this.placeholderContext);
        var gl = this.handler.gl;
        var buffers = this.buffers;
        var mapping = this.descriptor.memory_layout.mapping;
        var referenceCount = new Map();
        this.runtimeInfo = {
            inputs: this.getInputViews().map(function (view) { return buffers.get(mapping[view.name]); }),
            outputs: this.getOutputViews().map(function (view) { return buffers.get(mapping[view.name]); }),
            programs: this.descriptor.exec_infos.map(function (execInfo) {
                // inputs
                var inputs = execInfo.inputs.map(function (input) {
                    var buffer = buffers.get(mapping[input.variable_name]);
                    if (!referenceCount.has(buffer))
                        referenceCount.set(buffer, 0);
                    referenceCount.set(buffer, referenceCount.get(buffer) + 1);
                    return {
                        buffer: buffer,
                        uniformIndex: input.value
                    };
                });
                //output
                var output = buffers.get(mapping[execInfo.output]);
                // shader
                var program = _this.programs.get(execInfo.shader_name);
                _this.handler.useProgram(program);
                // uniforms
                var uniforms = Object.keys(execInfo.uniforms).map(function (name) {
                    var _a = execInfo.uniforms[name], type = _a.type, value = _a.value;
                    switch (type) {
                        case 'int':
                            return {
                                func: gl.uniform1i,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'float':
                            return {
                                func: gl.uniform1f,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'vec2':
                            return {
                                func: gl.uniform2fv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'vec3':
                            return {
                                func: gl.uniform3fv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'vec4':
                            return {
                                func: gl.uniform4fv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'ivec2':
                            return {
                                func: gl.uniform2iv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'ivec3':
                            return {
                                func: gl.uniform3iv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'ivec4':
                            return {
                                func: gl.uniform4iv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'sampler2D':
                            return {
                                func: gl.uniform1i,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        default:
                            throw TypeError("Incompatible type for uniform parameter: " + type);
                    }
                });
                // attributes
                var loc = gl.getAttribLocation(program, '_xy');
                // run
                return {
                    program: program,
                    frameBuffer: _this.handler.createFrameBuffer(),
                    name: execInfo.shader_name,
                    width: output.textureWidth,
                    height: output.textureHeight,
                    inputs: inputs,
                    output: output,
                    loc: loc,
                    uniforms: uniforms,
                    disposable: []
                };
            })
        };
        var _loop_1 = function (runtimeProgramInfo) {
            runtimeProgramInfo.inputs.forEach(function (_a) {
                var buffer = _a.buffer;
                var count = referenceCount.get(buffer) - 1;
                if (count == 0) {
                    runtimeProgramInfo.disposable.push(buffer);
                }
                referenceCount.set(buffer, count);
            });
        };
        for (var _i = 0, _a = this.runtimeInfo.programs; _i < _a.length; _i++) {
            var runtimeProgramInfo = _a[_i];
            _loop_1(runtimeProgramInfo);
        }
    };
    DescriptorRunnerWebGL.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gl, runtimeInfo, _i, _a, buffer, records, totalElapsedTime_1, _b, _c, runtimeProgramInfo, start, _d, _e, _f, buffer, uniformIndex, _g, _h, uniform, elapsedTime, xs, _j, _k, buffer, y, summary, _l, _m, runtimeProgramInfo, _o, _p, _q, buffer, uniformIndex, _r, _s, uniform, _t, _u, buffer, _v, _w, buffer;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        // if (this._running) throw new Error('Calling another run() while running.');
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        if (!this.inputViews || !this.outputViews)
                            throw new Error('getInputViews and getOutputViews must be called prior to run');
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized');
                        if (!this.placeholderContext.isResolved)
                            throw new Error("Not all placeholders are resolved: " + this.placeholderContext);
                        this._running = true;
                        gl = this.handler.gl;
                        runtimeInfo = this.runtimeInfo;
                        if (!(this.runtimeInfo.programs.length > 0)) return [3 /*break*/, 29];
                        _i = 0, _a = runtimeInfo.inputs;
                        _x.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        buffer = _a[_i];
                        return [4 /*yield*/, buffer.syncWriteViews()];
                    case 2:
                        _x.sent();
                        _x.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!getConfiguration('DEBUG', false)) return [3 /*break*/, 18];
                        records = [];
                        totalElapsedTime_1 = 0;
                        _b = 0, _c = runtimeInfo.programs;
                        _x.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3 /*break*/, 17];
                        runtimeProgramInfo = _c[_b];
                        start = performance.now();
                        this.handler.bindFrameBuffer(runtimeProgramInfo.frameBuffer, runtimeProgramInfo.width, runtimeProgramInfo.height);
                        _d = 0, _e = runtimeProgramInfo.inputs;
                        _x.label = 6;
                    case 6:
                        if (!(_d < _e.length)) return [3 /*break*/, 9];
                        _f = _e[_d], buffer = _f.buffer, uniformIndex = _f.uniformIndex;
                        return [4 /*yield*/, buffer.bindToReadTexture(uniformIndex)];
                    case 7:
                        _x.sent();
                        _x.label = 8;
                    case 8:
                        _d++;
                        return [3 /*break*/, 6];
                    case 9:
                        // output
                        runtimeProgramInfo.output.bindToDrawTexture();
                        // shader
                        this.handler.useProgram(runtimeProgramInfo.program);
                        // uniforms
                        for (_g = 0, _h = runtimeProgramInfo.uniforms; _g < _h.length; _g++) {
                            uniform = _h[_g];
                            uniform.func.apply(gl, uniform.args);
                        }
                        // vertex attribute
                        gl.vertexAttribPointer(runtimeProgramInfo.loc, 2, gl.FLOAT, true, 8, 0);
                        gl.enableVertexAttribArray(runtimeProgramInfo.loc);
                        // run
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexArray.length / 2);
                        return [4 /*yield*/, this.handler.waitForComplete()];
                    case 10:
                        _x.sent();
                        elapsedTime = performance.now() - start;
                        totalElapsedTime_1 += elapsedTime;
                        xs = [];
                        _j = 0, _k = runtimeProgramInfo.inputs;
                        _x.label = 11;
                    case 11:
                        if (!(_j < _k.length)) return [3 /*break*/, 14];
                        buffer = _k[_j].buffer;
                        buffer.unbindFromReadTexture();
                        return [4 /*yield*/, buffer.syncReadViews()];
                    case 12:
                        _x.sent();
                        xs.push(buffer.array.slice());
                        _x.label = 13;
                    case 13:
                        _j++;
                        return [3 /*break*/, 11];
                    case 14:
                        runtimeProgramInfo.output.unbindFromDrawTexture();
                        return [4 /*yield*/, runtimeProgramInfo.output.syncReadViews()];
                    case 15:
                        _x.sent();
                        y = runtimeProgramInfo.output.array.slice();
                        records.push({
                            'Kernel': runtimeProgramInfo.name,
                            'Elapsed time [ms]': elapsedTime,
                            'xs': xs,
                            'y': y
                        });
                        _x.label = 16;
                    case 16:
                        _b++;
                        return [3 /*break*/, 5];
                    case 17:
                        summary = Array.from(Object.values(records.reduce(function (summary, record) {
                            if (!(record['Kernel'] in summary)) {
                                summary[record['Kernel']] = {
                                    'Kernel': record['Kernel'],
                                    'Count': 0,
                                    'Elapsed time [ms]': 0,
                                };
                            }
                            summary[record['Kernel']]['Count']++;
                            summary[record['Kernel']]['Elapsed time [ms]'] += record['Elapsed time [ms]'];
                            return summary;
                        }, {})));
                        summary.forEach(function (record) { return record['Ratio [%]'] = (record['Elapsed time [ms]'] / totalElapsedTime_1).toFixed(2); });
                        console.table(records);
                        console.table(summary);
                        return [3 /*break*/, 25];
                    case 18:
                        _l = 0, _m = runtimeInfo.programs;
                        _x.label = 19;
                    case 19:
                        if (!(_l < _m.length)) return [3 /*break*/, 25];
                        runtimeProgramInfo = _m[_l];
                        this.handler.bindFrameBuffer(runtimeProgramInfo.frameBuffer, runtimeProgramInfo.width, runtimeProgramInfo.height);
                        _o = 0, _p = runtimeProgramInfo.inputs;
                        _x.label = 20;
                    case 20:
                        if (!(_o < _p.length)) return [3 /*break*/, 23];
                        _q = _p[_o], buffer = _q.buffer, uniformIndex = _q.uniformIndex;
                        return [4 /*yield*/, buffer.bindToReadTexture(uniformIndex)];
                    case 21:
                        _x.sent();
                        _x.label = 22;
                    case 22:
                        _o++;
                        return [3 /*break*/, 20];
                    case 23:
                        // output
                        runtimeProgramInfo.output.bindToDrawTexture();
                        // shader
                        this.handler.useProgram(runtimeProgramInfo.program);
                        // uniforms
                        for (_r = 0, _s = runtimeProgramInfo.uniforms; _r < _s.length; _r++) {
                            uniform = _s[_r];
                            uniform.func.apply(gl, uniform.args);
                        }
                        // vertex attribute
                        gl.vertexAttribPointer(runtimeProgramInfo.loc, 2, gl.FLOAT, true, 8, 0);
                        gl.enableVertexAttribArray(runtimeProgramInfo.loc);
                        // run
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexArray.length / 2);
                        // release buffers and binding
                        // for (let buffer of runtimeProgramInfo.disposable) buffer.releaseGPUMemory();
                        for (_t = 0, _u = runtimeProgramInfo.inputs; _t < _u.length; _t++) {
                            buffer = _u[_t].buffer;
                            buffer.unbindFromReadTexture();
                        }
                        runtimeProgramInfo.output.unbindFromDrawTexture();
                        _x.label = 24;
                    case 24:
                        _l++;
                        return [3 /*break*/, 19];
                    case 25:
                        _v = 0, _w = runtimeInfo.outputs;
                        _x.label = 26;
                    case 26:
                        if (!(_v < _w.length)) return [3 /*break*/, 29];
                        buffer = _w[_v];
                        return [4 /*yield*/, buffer.syncReadViews()];
                    case 27:
                        _x.sent();
                        _x.label = 28;
                    case 28:
                        _v++;
                        return [3 /*break*/, 26];
                    case 29:
                        this._running = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    return DescriptorRunnerWebGL;
}(DescriptorRunner));

///<reference path="./webgpu.d.ts" />
/**
 * @module webdnn
 */
/** Don't Remove This comment block */
var instance$1;
/**
 * @protected
 */
var WebGPUHandler = (function () {
    /**
     * WebGPUHandler is singleton class and instantiate directly is forbidden (constructor is hidden).
     *
     * Since the number of GPU contexts may be limited, the handler is used as a singleton
     * and only one context is shared among multiple runners.
     */
    function WebGPUHandler() {
        this.pipelineStates = new Map();
        if (!IS_WEBGPU_SUPPORTED)
            throw new Error('This browser does not support WebGPU');
        var context;
        try {
            context = document.createElement('canvas').getContext('webgpu');
        }
        catch (err) {
            throw new Error("During initializing WebGPURenderingContext, unexpected error is occurred: " + err.message);
        }
        if (!context)
            throw new Error('WebGPURenderingContext initialization failed');
        this.context = context;
        this.commandQueue = context.createCommandQueue();
    }
    WebGPUHandler.getInstance = function () {
        if (!instance$1)
            instance$1 = new WebGPUHandler();
        return instance$1;
    };
    WebGPUHandler.prototype.createBuffer = function (arrayBuffer) {
        return this.context.createBuffer(arrayBuffer);
    };
    WebGPUHandler.prototype.loadKernel = function (librarySource, namespace) {
        if (namespace === void 0) { namespace = ''; }
        var library = this.context.createLibrary(librarySource);
        for (var _i = 0, _a = library.functionNames; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var kernelFunction = library.functionWithName(name_1);
            var pipelineStates = this.context.createComputePipelineState(kernelFunction);
            this.pipelineStates.set(namespace + '.' + name_1, pipelineStates);
        }
    };
    WebGPUHandler.prototype.createCommandBuffer = function () {
        return this.commandQueue.createCommandBuffer();
    };
    WebGPUHandler.prototype.getPipelineStateByName = function (name) {
        var state = this.pipelineStates.get(name);
        if (!state) {
            throw TypeError("Kernel function \"" + name + "\" is not loaded.");
        }
        return state;
    };
    WebGPUHandler.prototype.executeSinglePipelineState = function (name, threadgroupsPerGrid, threadsPerThreadgroup, buffers, getCompletedPromise, flagDelay) {
        var commandBuffer = this.commandBuffer || (this.commandBuffer = this.createCommandBuffer());
        var commandEncoder = commandBuffer.createComputeCommandEncoder();
        commandEncoder.setComputePipelineState(this.getPipelineStateByName(name));
        for (var i = 0; i < buffers.length; i++) {
            var buffer = buffers[i];
            var wgbuf = void 0;
            if (buffer instanceof BufferWebGPU) {
                wgbuf = buffer.buffer;
            }
            else {
                // cannot perform (buffer instanceof WebGPUBuffer) currently
                wgbuf = buffer;
            }
            commandEncoder.setBuffer(wgbuf, 0, i);
        }
        commandEncoder.dispatch(threadgroupsPerGrid, threadsPerThreadgroup);
        commandEncoder.endEncoding();
        var promise = null;
        if (getCompletedPromise) {
            promise = commandBuffer.completed;
        }
        if (flagDelay)
            return null;
        this.commandBuffer = null;
        commandBuffer.commit();
        return promise;
    };
    WebGPUHandler.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandBuffer, commandEncoder, promise;
            return __generator(this, function (_a) {
                commandBuffer = this.createCommandBuffer();
                commandEncoder = commandBuffer.createComputeCommandEncoder();
                commandEncoder.setComputePipelineState(this.getPipelineStateByName('basic.sync'));
                commandEncoder.dispatch({
                    width: 1,
                    height: 1,
                    depth: 1
                }, {
                    width: 1,
                    height: 1,
                    depth: 1
                });
                commandEncoder.endEncoding();
                promise = commandBuffer.completed;
                commandBuffer.commit();
                return [2 /*return*/, promise];
            });
        });
    };
    return WebGPUHandler;
}());
/**
 * Flag whether WebGPU is supported or not
 * @protected
 */
var IS_WEBGPU_SUPPORTED = 'WebGPURenderingContext' in window && 'WebGPUComputeCommandEncoder' in window;

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
var BufferWebGPU = (function (_super) {
    __extends(BufferWebGPU, _super);
    function BufferWebGPU(byteLength) {
        var _this = _super.call(this, byteLength, 'webgpu') || this;
        if (byteLength == 0) {
            byteLength = 4; //0 length buffer causes error
        }
        _this.handler = WebGPUHandler.getInstance();
        _this.buffer = _this.handler.createBuffer(new Uint8Array(byteLength));
        _this.bufferView = new Uint8Array(_this.buffer.contents);
        return _this;
    }
    // async: there may be platforms synchronization is needed before writing
    BufferWebGPU.prototype.write = function (src, dst_offset) {
        return __awaiter(this, void 0, void 0, function () {
            var viewSameType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handler.sync()];
                    case 1:
                        _a.sent();
                        viewSameType = new src.constructor(this.bufferView.buffer);
                        viewSameType.set(src, dst_offset);
                        return [2 /*return*/];
                }
            });
        });
    };
    BufferWebGPU.prototype.read = function (dst, src_offset, length) {
        if (src_offset === void 0) { src_offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var dstConstructor, viewSameType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!dst)
                            throw new Error('dst cannot be null');
                        return [4 /*yield*/, this.handler.sync()];
                    case 1:
                        _a.sent();
                        if (this.byteLength === 0)
                            return [2 /*return*/];
                        dstConstructor = dst.constructor;
                        viewSameType = new dstConstructor(this.bufferView.buffer, this.bufferView.byteOffset + src_offset * dstConstructor.BYTES_PER_ELEMENT, length);
                        dst.set(viewSameType);
                        return [2 /*return*/];
                }
            });
        });
    };
    BufferWebGPU.prototype.getWriteView = function (offset, length, type) {
        return new type(this.bufferView.buffer, this.bufferView.byteOffset + offset * type.BYTES_PER_ELEMENT, length);
    };
    BufferWebGPU.prototype.getReadView = function (offset, length, type) {
        return new type(this.bufferView.buffer, this.bufferView.byteOffset + offset * type.BYTES_PER_ELEMENT, length);
    };
    BufferWebGPU.prototype.syncWriteViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BufferWebGPU.prototype.syncReadViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // if the user awaits promise from final kernel execution, this function call is not needed.
                    return [4 /*yield*/, this.handler.sync()];
                    case 1:
                        // if the user awaits promise from final kernel execution, this function call is not needed.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BufferWebGPU;
}(Buffer));

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @private
 */
var IS_IOS = navigator.userAgent.includes('iPhone');
/**
 * @protected
 */
var DescriptorRunnerWebGPU = (function (_super) {
    __extends(DescriptorRunnerWebGPU, _super);
    //noinspection JSUnusedLocalSymbols
    function DescriptorRunnerWebGPU(option) {
        var _this = _super.call(this) || this;
        _this.backendName = 'webgpu';
        return _this;
    }
    DescriptorRunnerWebGPU.checkAvailability = function () {
        return IS_WEBGPU_SUPPORTED;
    };
    DescriptorRunnerWebGPU.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!DescriptorRunnerWebGPU.checkAvailability())
                            throw Error('WebGPU backend is not supported in this browser.');
                        // initialize webgpu, build kernels
                        this.shaderLanguage = 'metal';
                        this.webgpuHandler = WebGPUHandler.getInstance();
                        this.initializeBasicKernels();
                        return [4 /*yield*/, this.checkIncompatibleGPU()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.initializeBasicKernels = function () {
        this.webgpuHandler.loadKernel('kernel void sync(){}', 'basic');
    };
    DescriptorRunnerWebGPU.prototype.checkIncompatibleGPU = function () {
        return __awaiter(this, void 0, void 0, function () {
            var trans_buf, trans_array_view, thread_execution_width;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /*
                        It is reported that AMD GPU crashes when performing sgemm (matrix multiplication).
                        Until this problem is solved, blocking WebGPU backend in the environment is needed.
                        API in WebGPU does not directly gives hardware information, so trying to determine hardware heuristically.
                
                        Criteria: thread_execution_width == 32 is required
                        (on AMD FirePro D500, thread_execution_width == 64)
                        */
                        this.webgpuHandler.loadKernel("\n#include <metal_stdlib>\nusing namespace metal;\n        kernel void check_compatibility(\n            device float *A[[buffer(0)]],\n            uint global_index[[thread_position_in_grid]],\n            uint thread_execution_width[[thread_execution_width]]\n        ){\n            if (global_index == 0) {\n                A[0] = thread_execution_width;\n            }\n        }", 'basic');
                        trans_buf = this.webgpuHandler.createBuffer(new Float32Array(1));
                        return [4 /*yield*/, this.webgpuHandler.executeSinglePipelineState('basic.check_compatibility', {
                                width: 1,
                                height: 1,
                                depth: 1
                            }, {
                                width: 1,
                                height: 1,
                                depth: 1
                            }, [trans_buf], true)];
                    case 1:
                        _a.sent();
                        trans_array_view = new Float32Array(trans_buf.contents);
                        thread_execution_width = trans_array_view[0];
                        if (thread_execution_width != 32) {
                            throw new Error("Sorry, this GPU does not compatible with WebGPU (thread_execution_width == " + thread_execution_width + ". See checkIncompatibleGPU method of https://github.com/mil-tokyo/webdnn/blob/master/src/descriptor_runner/descriptor_runner/descriptor_runner_webgpu.ts");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.load = function (directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, descriptor, weightRawArray;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            webdnnFetch(directory + "/graph_" + this.backendName + ".json", { ignoreCache: this.ignoreCache })
                                .then(function (res) { return res.json(); }),
                            webdnnFetch(directory + "/weight_" + this.backendName + ".bin", { ignoreCache: this.ignoreCache, progressCallback: progressCallback })
                                .then(function (res) { return readArrayBufferProgressively(res, progressCallback); })
                        ])];
                    case 1:
                        _a = _b.sent(), descriptor = _a[0], weightRawArray = _a[1];
                        return [4 /*yield*/, this.setDescriptor(descriptor)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.compile()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.initializeStaticBuffer(weightRawArray)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.initializeMetaBuffers()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.setPlaceholderValue({
                                '__MAX_THREADS_PER_THREADGROUP__': IS_IOS ? 512 : 512
                            })];
                    case 6:
                        _b.sent();
                        if (!(this.placeholderContext && this.placeholderContext.isResolved)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.initializeStaticBuffer = function (weightRawArray) {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, staticBuffer, decoder, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.descriptor)
                            throw Error("GraphDescriptor is not loaded.");
                        descriptor = this.descriptor;
                        staticBuffer = new BufferWebGPU(descriptor.memory_layout.static.size * Float32Array.BYTES_PER_ELEMENT);
                        this.staticBuffer = staticBuffer;
                        decoder = get_weight_decoder(descriptor.weight_encoding);
                        _b = (_a = staticBuffer).write;
                        return [4 /*yield*/, decoder.decode(new Uint8Array(weightRawArray))];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.getInputViews()];
                    case 3:
                        (_c.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(staticBuffer.bufferView.buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 4:
                        (_c.sent())
                            .filter(function (view) { return !view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(staticBuffer.bufferView.buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.initializeMetaBuffers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.descriptor)
                            throw Error("GraphDescriptor is not loaded.");
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.descriptor.exec_infos.map(function (executionInfo) { return __awaiter(_this, void 0, void 0, function () {
                                var buffer;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            buffer = new BufferWebGPU(executionInfo.meta_buffer.length * Int32Array.BYTES_PER_ELEMENT);
                                            return [4 /*yield*/, buffer.write(new Uint8Array(executionInfo.meta_buffer))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, buffer];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.metaBuffers = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.initializeDynamicBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var descriptor, placeholderContext, dynamicBufferSize, dynamicBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.descriptor)
                            throw Error("GraphDescriptor is not loaded.");
                        if (!this.placeholderContext)
                            throw Error("PlaceholderContext is not initialized.");
                        descriptor = this.descriptor;
                        placeholderContext = this.placeholderContext;
                        dynamicBufferSize = placeholderContext.resolve(descriptor.memory_layout.dynamic.size);
                        dynamicBuffer = new BufferWebGPU(dynamicBufferSize * Float32Array.BYTES_PER_ELEMENT);
                        this.dynamicBuffer = dynamicBuffer;
                        return [4 /*yield*/, this.getInputViews()];
                    case 1:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(dynamicBuffer.bufferView.buffer); });
                        return [4 /*yield*/, this.getOutputViews()];
                    case 2:
                        (_a.sent())
                            .filter(function (view) { return view.isDynamic; })
                            .forEach(function (view) { return view.setArrayBuffer(dynamicBuffer.bufferView.buffer); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.setDescriptor = function (descriptor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.descriptor = descriptor;
                //reset all datum depend on old descriptor
                this.staticBuffer = null;
                this.dynamicBuffer = null;
                this.metaBuffers = null;
                this.placeholderContext = new PlaceholderContext(descriptor.placeholders);
                this.executionInfos = descriptor.exec_infos;
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.compile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.descriptor)
                    throw new Error('Descriptor is not loaded');
                this.webgpuHandler.loadKernel(this.descriptor.kernel_source, 'descriptor');
                return [2 /*return*/];
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.setPlaceholderValue = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var placeholderContext, descriptor, metaBuffers, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized.');
                        placeholderContext = this.placeholderContext;
                        placeholderContext.update(values);
                        if (!placeholderContext.isResolved)
                            return [2 /*return*/];
                        if (!this.descriptor)
                            throw new Error('Descriptor is not loaded');
                        if (!this.metaBuffers)
                            throw new Error('MetaBuffers are not initialized');
                        descriptor = this.descriptor;
                        metaBuffers = this.metaBuffers;
                        return [4 /*yield*/, this.initializeDynamicBuffer()];
                    case 1:
                        _b.sent();
                        // resolve placeholders in execution info
                        _a = this;
                        return [4 /*yield*/, Promise.all(descriptor.exec_infos.map(function (executionInfo, i) { return __awaiter(_this, void 0, void 0, function () {
                                var bufferView, _i, _a, unresolved_value;
                                return __generator(this, function (_b) {
                                    bufferView = new Int32Array(metaBuffers[i].bufferView.buffer);
                                    for (_i = 0, _a = executionInfo.unresolved_value_list; _i < _a.length; _i++) {
                                        unresolved_value = _a[_i];
                                        bufferView[unresolved_value.offset] = placeholderContext.resolve(unresolved_value.placeholder);
                                    }
                                    return [2 /*return*/, placeholderContext.resolve(executionInfo)];
                                });
                            }); }))];
                    case 2:
                        // resolve placeholders in execution info
                        _a.executionInfos = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptorRunnerWebGPU.prototype.getInputViews = function () {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            var view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.inputViews;
    };
    DescriptorRunnerWebGPU.prototype.getOutputViews = function () {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        var descriptor = this.descriptor;
        var placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(function (name) {
            var allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            var view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.outputViews;
    };
    DescriptorRunnerWebGPU.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staticBuffer, dynamicBuffer, metaBuffers, records, totalElapsedTime_1, i, exec_info, start, elapsedTime, summary, complete_promise, i, exec_info, is_last;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (this._running) throw new Error('Calling another run() while running.');
                        if (!this.executionInfos)
                            throw new Error('ExecutionInfos is not loaded');
                        if (!this.inputViews || !this.outputViews)
                            throw new Error('getInputViews and getOutputViews must be called prior to run');
                        if (!this.staticBuffer)
                            throw new Error('StaticBuffer is not initialized');
                        if (!this.dynamicBuffer)
                            throw new Error('DynamicBuffer is not initialized');
                        if (!this.metaBuffers)
                            throw new Error('MetaBuffer is not initialized');
                        if (!this.placeholderContext)
                            throw new Error('PlaceholderContext is not initialized');
                        if (!this.placeholderContext.isResolved)
                            throw new Error("Not all placeholders are resolved: " + this.placeholderContext);
                        staticBuffer = this.staticBuffer;
                        dynamicBuffer = this.dynamicBuffer;
                        metaBuffers = this.metaBuffers;
                        this._running = true;
                        if (!getConfiguration('DEBUG', false)) return [3 /*break*/, 5];
                        records = [];
                        totalElapsedTime_1 = 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.executionInfos.length)) return [3 /*break*/, 4];
                        exec_info = this.executionInfos[i];
                        start = performance.now();
                        return [4 /*yield*/, this.webgpuHandler.executeSinglePipelineState('descriptor.' + exec_info.entry_func_name, exec_info.threadgroups_per_grid, exec_info.threads_per_thread_group, [staticBuffer, dynamicBuffer, metaBuffers[i]], true)];
                    case 2:
                        _a.sent();
                        elapsedTime = performance.now() - start;
                        records.push({
                            'Kernel': exec_info.entry_func_name,
                            'Elapsed time [ms]': elapsedTime
                        });
                        totalElapsedTime_1 += elapsedTime;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        summary = Array.from(Object.values(records.reduce(function (summary, record) {
                            if (!(record['Kernel'] in summary)) {
                                summary[record['Kernel']] = {
                                    'Kernel': record['Kernel'],
                                    'Count': 0,
                                    'Elapsed time [ms]': 0,
                                };
                            }
                            summary[record['Kernel']]['Count']++;
                            summary[record['Kernel']]['Elapsed time [ms]'] += record['Elapsed time [ms]'];
                            return summary;
                        }, {})));
                        summary.forEach(function (record) { return record['Ratio [%]'] = (record['Elapsed time [ms]'] / totalElapsedTime_1).toFixed(2); });
                        console.table(records);
                        console.table(summary);
                        return [3 /*break*/, 6];
                    case 5:
                        complete_promise = null;
                        for (i = 0; i < this.executionInfos.length; i++) {
                            exec_info = this.executionInfos[i];
                            is_last = i == this.executionInfos.length - 1;
                            complete_promise = this.webgpuHandler.executeSinglePipelineState('descriptor.' + exec_info.entry_func_name, exec_info.threadgroups_per_grid, exec_info.threads_per_thread_group, [staticBuffer, dynamicBuffer, metaBuffers[i]], is_last, !is_last && !(i & 0x01));
                        }
                        return [2 /*return*/, complete_promise]; //wait to finish final kernel
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DescriptorRunnerWebGPU;
}(DescriptorRunner));

/**
 * @module webdnn/image
 */
/** Don't Remove This comment block */
/**
 * The data order
 */
var Order;
(function (Order) {
    /** `[Channel, Height, Width]` format */
    Order[Order["CHW"] = 0] = "CHW";
    /** `[Height, Width, Channel]` format */
    Order[Order["HWC"] = 1] = "HWC";
})(Order || (Order = {}));
/**
 * The color format
 */
var Color;
(function (Color) {
    /** RGB format */
    Color[Color["RGB"] = 0] = "RGB";
    /** BGR format */
    Color[Color["BGR"] = 1] = "BGR";
    /** grey scale */
    Color[Color["GREY"] = 2] = "GREY";
})(Color || (Color = {}));

/**
 * @module webdnn/image
 */
/** Don't Remove This comment block */
/**
 * Get canvas rendering context and check whether it is nonnull value.
 *
 * @param {CanvasRenderingContext2D} canvas
 * @protected
 */
function getContext2D(canvas) {
    var context = canvas.getContext('2d');
    if (!context)
        throw Error('CanvasRenderingContext2D initialization failed');
    return context;
}

/**
 * @module webdnn/image
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
function getImageDataFromCanvas(canvas, options) {
    if (options === void 0) { options = {}; }
    var _a = options.srcX, srcX = _a === void 0 ? 0 : _a, _b = options.srcY, srcY = _b === void 0 ? 0 : _b, _c = options.srcW, srcW = _c === void 0 ? canvas.width : _c, _d = options.srcH, srcH = _d === void 0 ? canvas.height : _d, _e = options.dstX, dstX = _e === void 0 ? 0 : _e, _f = options.dstY, dstY = _f === void 0 ? 0 : _f;
    var _g = options.dstW, dstW = _g === void 0 ? srcW : _g, _h = options.dstH, dstH = _h === void 0 ? srcH : _h;
    var imageData = getContext2D(canvas).getImageData(srcX, srcY, srcW, srcH);
    if (dstX !== 0 || dstY !== 0 || srcW !== dstW || srcH !== dstH) {
        imageData = cropAndResizeImageData(imageData, { dstX: dstX, dstY: dstY, dstW: dstW, dstH: dstH });
    }
    return imageData;
}
/**
 * @protected
 */
function getImageDataFromDrawable(drawable, options) {
    if (options === void 0) { options = {}; }
    var srcW, srcH;
    if (drawable instanceof HTMLVideoElement) {
        srcW = drawable.videoWidth;
        srcH = drawable.videoHeight;
    }
    else if (drawable instanceof HTMLImageElement) {
        srcW = drawable.naturalWidth;
        srcH = drawable.naturalHeight;
    }
    else
        throw TypeError('Failed to execute "getImageDataFromDrawable(drawable, options)": "drawable" must be an instanceof HTMLVideoElement or HTMLImageElement');
    var _a = options.srcX, srcX = _a === void 0 ? 0 : _a, _b = options.srcY, srcY = _b === void 0 ? 0 : _b, _c = options.dstX, dstX = _c === void 0 ? 0 : _c, _d = options.dstY, dstY = _d === void 0 ? 0 : _d, _e = options.dstW, dstW = _e === void 0 ? srcW : _e, _f = options.dstH, dstH = _f === void 0 ? srcH : _f;
    var canvas = document.createElement('canvas');
    canvas.width = dstX + dstW;
    canvas.height = dstY + dstH;
    var context = getContext2D(canvas);
    context.drawImage(drawable, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
    return context.getImageData(0, 0, dstX + dstW, dstY + dstH);
}
/**
 * Source rectangle of source image is cropped and then copied into destination rectangle of new image data
 *
 * @param {ImageData} src
 * @param {SourceRect & DestinationRect} options
 * @returns {ImageData}
 * @protected
 */
function cropAndResizeImageData(src, options) {
    if (options === void 0) { options = {}; }
    var _a = options.srcX, srcX = _a === void 0 ? 0 : _a, _b = options.srcY, srcY = _b === void 0 ? 0 : _b, _c = options.srcW, srcW = _c === void 0 ? src.width : _c, _d = options.srcH, srcH = _d === void 0 ? src.height : _d, _e = options.dstX, dstX = _e === void 0 ? 0 : _e, _f = options.dstY, dstY = _f === void 0 ? 0 : _f;
    var _g = options.dstW, dstW = _g === void 0 ? srcW : _g, _h = options.dstH, dstH = _h === void 0 ? srcH : _h;
    var canvas1 = document.createElement('canvas');
    canvas1.width = srcW;
    canvas1.height = srcH;
    var context1 = getContext2D(canvas1);
    context1.putImageData(src, -srcX, -srcY);
    var canvas2 = document.createElement('canvas');
    canvas2.width = dstX + dstW;
    canvas2.height = dstY + dstH;
    var context2 = getContext2D(canvas2);
    context2.drawImage(canvas1, 0, 0, srcW, srcH, dstX, dstY, dstW, dstH);
    return context2.getImageData(0, 0, dstX + dstW, dstY + dstH);
}
/**
 * Return canvas `ImageData` object with specified scale.
 *
 * @param {HTMLCanvasElement | HTMLVideoElement | HTMLImageElement} image
 * @param [options] Options
 * @param {number} [options.srcX=0] left position of input clipping rect
 * @param {number} [options.srcY=0] top position of input clipping rect
 * @param {number} [options.srcW=canvas.width] width of input clipping rect
 * @param {number} [options.srcH=canvas.height] height of input clipping rect
 * @param {number} [options.dstW=options.srcW] width of output
 * @param {number} [options.dstH=options.srcH] height of output
 * @returns {ImageData}
 * @protected
 */
function getImageData(image, options) {
    if (options === void 0) { options = {}; }
    if (image instanceof HTMLCanvasElement) {
        return getImageDataFromCanvas(image, options);
    }
    else if (image instanceof HTMLVideoElement || image instanceof HTMLImageElement) {
        return getImageDataFromDrawable(image, options);
    }
    else
        throw TypeError('Failed to execute "getImageData(image, options)": "image" must be an instance of HTMLCanvasElement, HTMLVideoElement, or HTMLImageElement');
}
/**
 * @protected
 */
function setImageDataToCanvas(imageData, canvas, options) {
    if (options === void 0) { options = {}; }
    var _a = options.srcX, srcX = _a === void 0 ? 0 : _a, _b = options.srcY, srcY = _b === void 0 ? 0 : _b, _c = options.srcW, srcW = _c === void 0 ? imageData.width : _c, _d = options.srcH, srcH = _d === void 0 ? imageData.height : _d, _e = options.dstX, dstX = _e === void 0 ? 0 : _e, _f = options.dstY, dstY = _f === void 0 ? 0 : _f;
    var _g = options.dstW, dstW = _g === void 0 ? srcW : _g, _h = options.dstH, dstH = _h === void 0 ? srcH : _h;
    if (srcX !== 0 || srcY !== 0 || srcW !== dstW || srcH !== dstH) {
        imageData = cropAndResizeImageData(imageData, { srcX: srcX, srcY: srcY, srcW: srcW, srcH: srcH, dstW: dstW, dstH: dstH });
    }
    getContext2D(canvas).putImageData(imageData, dstX, dstY);
}

/**
 * @module webdnn/image
 */
/** Don't Remove This comment block */
/**
 * Load image of specified url
 *
 * @param {string} url the image url
 * @returns {Promise<HTMLImageElement>} image element
 */
function loadImageByUrl(url) {
    return __awaiter(this, void 0, void 0, function () {
        var image;
        return __generator(this, function (_a) {
            image = document.createElement('img');
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    image.onload = resolve;
                    image.onerror = reject;
                    image.src = url;
                })
                    .then(function () { return image; })];
        });
    });
}
/* istanbul ignore next */
/**
 * Load image file selected in `<input type="file">` element.
 *
 * @param {HTMLInputElement} input the `<input type="file">` element
 * @returns {Promise<HTMLImageElement>} image element
 */
function loadImageFromFileInput(input) {
    return __awaiter(this, void 0, void 0, function () {
        var files, url;
        return __generator(this, function (_a) {
            files = input.files;
            if (!files || files.length == 0)
                throw new Error('No file is selected');
            url = URL.createObjectURL(files[0]);
            return [2 /*return*/, loadImageByUrl(url)];
        });
    });
}
/* istanbul ignore next */
/**
 * Load image selected in file picker dialog
 *
 * Currently, web specification not supported the case if the dialog is canceled and no file is selected. In this case,
 * the returned promise will never be resolved.
 *
 * @returns {Promise<HTMLImageElement>} image element
 * @protected
 */
function loadImageByDialog() {
    return __awaiter(this, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            return [2 /*return*/, new Promise(function (resolve) {
                    input.onchange = function () { return resolve(loadImageFromFileInput(input)); };
                    input.click();
                })];
        });
    });
}

/**
 * @module webdnn/image
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
function flatten$1(arr) {
    return (arr instanceof Array) ? Array.prototype.concat.apply([], arr.map(function (arr) { return flatten$1(arr); })) : arr;
}
/**
 * @protected
 */
function normalizeBiasTuple(arr) {
    if (typeof (arr) == "number") {
        return [arr, arr, arr];
    }
    else {
        if (arr.length == 3) {
            return [arr[0], arr[1], arr[2]];
        }
        else if (arr.length == 1) {
            return [arr[0], arr[0], arr[0]];
        }
        else {
            throw new Error('bias and scale must be scalar number or array of length 1 or 3.');
        }
    }
}
/**
 * Get image array as `{Float32 or Int32}ArrayBufferView` from ImageData object.
 *
 * @returns {ArrayBufferView} buffer with specified type
 * @protected
 */
function getImageArrayFromImageData(imageData, options) {
    if (options === void 0) { options = {}; }
    var _a = options.type, type = _a === void 0 ? Float32Array : _a, _b = options.color, color = _b === void 0 ? Color.RGB : _b, _c = options.order, order = _c === void 0 ? Order.HWC : _c, _d = options.bias, bias = _d === void 0 ? [0, 0, 0] : _d, _e = options.scale, scale = _e === void 0 ? [1, 1, 1] : _e;
    var bias_n = normalizeBiasTuple(bias);
    var scale_n = normalizeBiasTuple(scale);
    var width = imageData.width;
    var height = imageData.height;
    var data = imageData.data;
    var array;
    var biasR, biasG, biasB;
    var scaleR, scaleG, scaleB;
    switch (color) {
        case Color.RGB:
            array = new type(width * height * 3);
            scaleR = scale_n[0], scaleG = scale_n[1], scaleB = scale_n[2];
            biasR = bias_n[0], biasG = bias_n[1], biasB = bias_n[2];
            switch (order) {
                case Order.HWC:
                    for (var h = 0; h < height; h++) {
                        for (var w = 0; w < width; w++) {
                            array[(h * width + w) * 3 + 0] = (data[(h * width + w) * 4 + 0] - biasR) / scaleR;
                            array[(h * width + w) * 3 + 1] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(h * width + w) * 3 + 2] = (data[(h * width + w) * 4 + 2] - biasB) / scaleB;
                        }
                    }
                    break;
                case Order.CHW:
                    for (var h = 0; h < height; h++) {
                        for (var w = 0; w < width; w++) {
                            array[(0 * height + h) * width + w] = (data[(h * width + w) * 4 + 0] - biasR) / scaleR;
                            array[(1 * height + h) * width + w] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(2 * height + h) * width + w] = (data[(h * width + w) * 4 + 2] - biasB) / scaleB;
                        }
                    }
                    break;
            }
            break;
        case Color.BGR:
            array = new type(width * height * 3);
            biasB = bias_n[0], biasG = bias_n[1], biasR = bias_n[2];
            scaleB = scale_n[0], scaleG = scale_n[1], scaleR = scale_n[2];
            switch (order) {
                case Order.HWC:
                    for (var h = 0; h < height; h++) {
                        for (var w = 0; w < width; w++) {
                            array[(h * width + w) * 3 + 0] = (data[(h * width + w) * 4 + 2] - biasR) / scaleR;
                            array[(h * width + w) * 3 + 1] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(h * width + w) * 3 + 2] = (data[(h * width + w) * 4 + 0] - biasB) / scaleB;
                        }
                    }
                    break;
                case Order.CHW:
                    for (var h = 0; h < height; h++) {
                        for (var w = 0; w < width; w++) {
                            array[(0 * height + h) * width + w] = (data[(h * width + w) * 4 + 2] - biasR) / scaleR;
                            array[(1 * height + h) * width + w] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(2 * height + h) * width + w] = (data[(h * width + w) * 4 + 0] - biasB) / scaleB;
                        }
                    }
                    break;
            }
            break;
        case Color.GREY:
            array = new type(width * height);
            scaleR = scale_n[0], scaleG = scale_n[1], scaleB = scale_n[2];
            biasR = bias_n[0], biasG = bias_n[1], biasB = bias_n[2];
            for (var h = 0; h < height; h++) {
                for (var w = 0; w < width; w++) {
                    var r = data[(h * width + w) * 4 + 0];
                    var g = data[(h * width + w) * 4 + 1];
                    var b = data[(h * width + w) * 4 + 2];
                    array[h * width + w] = 0.2126 * (r - biasR) / scaleR + 0.7162 * (g - biasG) / scaleG + 0.0722 * (b - biasB) / scaleB;
                }
            }
            break;
        default:
            throw Error("Unknown color format: " + color);
    }
    return array;
}
/**
 * Get image array from canvas element as `{Float32 or Int32}ArrayBufferView`.
 *
 * @returns {ImageData} buffer with specified type
 * @protected
 */
function getImageArrayFromCanvas(canvas, options) {
    if (options === void 0) { options = {}; }
    var _a = options.type, type = _a === void 0 ? Float32Array : _a, _b = options.color, color = _b === void 0 ? Color.RGB : _b, _c = options.order, order = _c === void 0 ? Order.HWC : _c, _d = options.srcX, srcX = _d === void 0 ? 0 : _d, _e = options.srcY, srcY = _e === void 0 ? 0 : _e, _f = options.srcW, srcW = _f === void 0 ? canvas.width : _f, _g = options.srcH, srcH = _g === void 0 ? canvas.height : _g, _h = options.dstX, dstX = _h === void 0 ? 0 : _h, _j = options.dstY, dstY = _j === void 0 ? 0 : _j, _k = options.bias, bias = _k === void 0 ? [0, 0, 0] : _k, _l = options.scale, scale = _l === void 0 ? [1, 1, 1] : _l;
    var _m = options.dstW, dstW = _m === void 0 ? srcW : _m, _o = options.dstH, dstH = _o === void 0 ? srcH : _o;
    var imageData = getImageData(canvas, { srcX: srcX, srcY: srcY, srcW: srcW, srcH: srcH, dstX: dstX, dstY: dstY, dstW: dstW, dstH: dstH });
    return getImageArrayFromImageData(imageData, { type: type, color: color, order: order, bias: bias, scale: scale });
}
/**
 * Get image array from image element as `{Float32 or Int32}ArrayBufferView`.
 *
 * @returns {ImageData} buffer with specified type
 * @protected
 */
function getImageArrayFromDrawable(drawable, options) {
    if (options === void 0) { options = {}; }
    var srcW, srcH;
    if (drawable instanceof HTMLVideoElement) {
        srcW = drawable.videoWidth;
        srcH = drawable.videoHeight;
    }
    else if (drawable instanceof HTMLImageElement) {
        srcW = drawable.naturalWidth;
        srcH = drawable.naturalHeight;
    }
    else if (drawable instanceof HTMLCanvasElement) {
        return getImageArrayFromCanvas(drawable, options);
    }
    else if (drawable instanceof ImageData) {
        return getImageArrayFromImageData(drawable, options);
    }
    else
        throw TypeError('Failed to execute "getImageDataFromDrawable(drawable, options)": "drawable" must be an instanceof Drawable');
    var _a = options.type, type = _a === void 0 ? Float32Array : _a, _b = options.color, color = _b === void 0 ? Color.RGB : _b, _c = options.order, order = _c === void 0 ? Order.HWC : _c, _d = options.srcX, srcX = _d === void 0 ? 0 : _d, _e = options.srcY, srcY = _e === void 0 ? 0 : _e, _f = options.dstX, dstX = _f === void 0 ? 0 : _f, _g = options.dstY, dstY = _g === void 0 ? 0 : _g, _h = options.dstW, dstW = _h === void 0 ? srcW : _h, _j = options.dstH, dstH = _j === void 0 ? srcH : _j, _k = options.bias, bias = _k === void 0 ? [0, 0, 0] : _k, _l = options.scale, scale = _l === void 0 ? [1, 1, 1] : _l;
    var canvas = document.createElement('canvas');
    canvas.width = dstX + dstW;
    canvas.height = dstY + dstH;
    var context = getContext2D(canvas);
    context.drawImage(drawable, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
    return getImageArrayFromCanvas(canvas, { type: type, color: color, order: order, bias: bias, scale: scale });
}
/**
 * Create typed array by packing image data from image source with specified options.
 *
 * First, this method loads specified image resource. The behavior of this method depends on the `image` argument.
 *
 * - If `image` is an instance of `string`, it will be regarded as image url, and this method fetches that url.
 *
 * - If `image` is an instance of `HTMLInputElement`, it will be regarded as file inpu,
 *   and this method loads the selected image file.
 *
 * - Otherwise, `image` will be regarded as drawable object.
 *
 * Then, loaded images are packed into typed array based on `options` argument.
 *
 * - The image is cropped based on [[SourceRect|`{srcX, srcY, srcW, srcH}`]].
 *   As default, entire image is used.
 *
 * - The image is resized and translated into [[DestinationRect|`{dstX, dstY, dstW, dstH}`]].
 *   As default, no resize and translation is performed.
 *
 * - [[ImageArrayOption.type|`options.type`]] is the type of packed typed array. As default, Float32Array is used.
 *
 * - [[ImageArrayOption.type|`options.color`]] is the color format of packed typed array. As default, [[Color.RGB|`RGB`]] is used.
 *
 * - [[ImageArrayOption.type|`options.order`]] is the data order of packed typed array. As default, [[Order.HWC|`HWC`]] is used.
 *
 * - [[ImageArrayOption.bias|`options.bias`]] is the bias value.
 *   If specified, this method **subtracts** this value from original pixel value.
 *
 * - [[ImageArrayOption.scale|`options.scale`]] is the scale value. If specified, original pixel values are **divided** by this value.
 *   [[ImageArrayOption.scale|`options.scale`]] and [[ImageArrayOption.bias|`options.bias`]] is used for converting pixel value `x` and
 *   packed value `y` as follows:
 *
 *   - `y = (x - bias) / scale`
 *   - `x = y * scale + bias`
 *
 * ### Examples
 *
 * - Load image of specified url
 *
 *   ```ts
 *   let image = await WebDNN.Image.load('./cat.png');
 *   ```
 *
 * - Load image selected in file input and resize it into 224 x 224
 *
 *   ```ts
 *   let input = document.querySelector('input[type=file]');
 *   let image = await WebDNN.Image.load(input, { dstW: 224, dstH: 224 });
 *   ```
 *
 * - Load image data from canvas, normalize it into range `[-1, 1)`. In this case, normalized value `y` can be
 *   calculated from pixel value `x` as follows: `y = (x - 128) / 128`.
 *
 *   ```ts
 *   let canvas = document.getElementsByTagName('canvas')[0];
 *   let image = await WebDNN.Image.load(canvas, { bias: [128, 128, 128], scale: [128, 128, 128] });
 *   ```
 *
 * @param image please see above descriptions
 * @param options please see above descriptions.
 * @returns Created typed array
 */
function getImageArray(image, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(typeof image === 'string')) return [3 /*break*/, 2];
                    _a = getImageArrayFromDrawable;
                    return [4 /*yield*/, loadImageByUrl(image)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent(), options])];
                case 2:
                    if (!(image instanceof HTMLInputElement)) return [3 /*break*/, 4];
                    _b = getImageArrayFromDrawable;
                    return [4 /*yield*/, loadImageFromFileInput(image)];
                case 3: return [2 /*return*/, _b.apply(void 0, [_c.sent(), options])];
                case 4:
                    if (image instanceof HTMLCanvasElement) {
                        return [2 /*return*/, getImageArrayFromCanvas(image, options)];
                    }
                    else if (image instanceof HTMLImageElement || image instanceof HTMLVideoElement) {
                        return [2 /*return*/, getImageArrayFromDrawable(image, options)];
                        // FIXME: This feature is not supported for all web browsers.
                        // } else if (image === null) {
                        //     return getImageArrayFromDrawable(await loadImageByDialog(), options);
                    }
                    else
                        throw TypeError('Failed to execute "getImageData(image, options)": "image" must be an instance of string,' +
                            ' HTMLInputElement, HTMLCanvasElement, HTMLImageElement, or HTMLVideoElement object');
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Set image array data into canvas.
 *
 * ### Examples
 *
 * - Show DNN model's result
 *
 *   ```ts
 *   let runner = await WebDNN.load('./model');
 *   let output = runner.getOutputViews()[0];
 *
 *   await runner.run();
 *
 *   WebDNN.Image.setImageArrayToCanvas(output.toActual(), 256, 256, document.getElementById('canvas'))
 *   ```
 *
 * - Generally image generation model's result contains noise pixel at their edge because of convolution's padding.
 *   In follow example, these noise are cut off.
 *
 *   ```ts
 *   WebDNN.Image.setImageArrayToCanvas(output, 256, 256, canvas, {
 *      srcX: 16, srcY: 16, srcH: 256-16*2, srcW: 256-16*2, // Discard both ends 16px
 *      dstW: 256, dstH: 256  // Resize cropped image into original output size.
 *   });
 *   ```
 *
 * @param array array which contains image data
 * @param imageW width of image
 * @param imageH height of image. The length of `array` must be `imageW * imageH * (# of channels)`
 * @param canvas destination canvas
 * @param options please see above descriptions and descriptions in [[webdnn/image.getImageArray|getImageArray()]].
 *                `srcW` and `srcH` is ignored (overwritten by `imageW` and `imageH`).
 */
function setImageArrayToCanvas(array, imageW, imageH, canvas, options) {
    if (options === void 0) { options = {}; }
    var _a = options.color, color = _a === void 0 ? Color.RGB : _a, _b = options.order, order = _b === void 0 ? Order.HWC : _b, _c = options.srcX, srcX = _c === void 0 ? 0 : _c, _d = options.srcY, srcY = _d === void 0 ? 0 : _d, _e = options.dstX, dstX = _e === void 0 ? 0 : _e, _f = options.dstY, dstY = _f === void 0 ? 0 : _f, _g = options.dstW, dstW = _g === void 0 ? canvas.width : _g, _h = options.dstH, dstH = _h === void 0 ? canvas.height : _h, _j = options.bias, bias = _j === void 0 ? [0, 0, 0] : _j, _k = options.scale, scale = _k === void 0 ? [1, 1, 1] : _k;
    var bias_n = normalizeBiasTuple(bias);
    var scale_n = normalizeBiasTuple(scale);
    var srcW = imageW, srcH = imageH;
    array = flatten$1(array);
    var data = new Uint8ClampedArray(srcW * srcH * 4);
    var biasR, biasG, biasB;
    var scaleR, scaleG, scaleB;
    switch (color) {
        case Color.RGB:
            biasR = bias_n[0], biasG = bias_n[1], biasB = bias_n[2];
            scaleR = scale_n[0], scaleG = scale_n[1], scaleB = scale_n[2];
            switch (order) {
                case Order.HWC:
                    for (var h = srcY; h < srcY + srcH; h++) {
                        for (var w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(h * imageW + w) * 3 + 0] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(h * imageW + w) * 3 + 1] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(h * imageW + w) * 3 + 2] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
                case Order.CHW:
                    for (var h = srcY; h < srcY + srcH; h++) {
                        for (var w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(0 * imageH + h) * imageW + w] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(1 * imageH + h) * imageW + w] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(2 * imageH + h) * imageW + w] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
            }
            break;
        case Color.BGR:
            biasB = bias_n[0], biasG = bias_n[1], biasR = bias_n[2];
            scaleB = scale_n[0], scaleG = scale_n[1], scaleR = scale_n[2];
            switch (order) {
                case Order.HWC:
                    for (var h = srcY; h < srcY + srcH; h++) {
                        for (var w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(h * imageW + w) * 3 + 2] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(h * imageW + w) * 3 + 1] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(h * imageW + w) * 3 + 0] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
                case Order.CHW:
                    for (var h = srcY; h < srcY + srcH; h++) {
                        for (var w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(2 * imageH + h) * imageW + w] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(1 * imageH + h) * imageW + w] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(0 * imageH + h) * imageW + w] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
            }
            break;
        case Color.GREY:
            for (var h = srcY; h < srcY + srcH; h++) {
                for (var w = srcX; w < srcX + srcW; w++) {
                    data[(h * imageW + w) * 4 + 0] =
                        data[(h * imageW + w) * 4 + 1] =
                            data[(h * imageW + w) * 4 + 2] = array[h * imageW + w] * scale[0] + bias[0];
                    data[(h * imageW + w) * 4 + 3] = 255;
                }
            }
            break;
    }
    setImageDataToCanvas(new ImageData(data, srcW, srcH), canvas, { srcX: srcX, srcY: srcY, srcW: srcW, srcH: srcH, dstX: dstX, dstY: dstY, dstW: dstW, dstH: dstH });
}

/**
 * @module webdnn/image
 * @preferred
 *
 * Module `WebDNN.Image` provides basic image processing operations like follows.
 *
 * - Load image by various way (File picker dialog, url string, canvas, video, etc.)
 * - Pack image data into TypedArray
 * - Crop and resize.
 * - Show result on canvas element
 *
 */
/** Don't Remove This comment block */
// export * from "./image/canvas" // internal API



var image = Object.freeze({
	get Order () { return Order; },
	get Color () { return Color; },
	getImageArrayFromImageData: getImageArrayFromImageData,
	getImageArrayFromCanvas: getImageArrayFromCanvas,
	getImageArrayFromDrawable: getImageArrayFromDrawable,
	getImageArray: getImageArray,
	setImageArrayToCanvas: setImageArrayToCanvas,
	loadImageByUrl: loadImageByUrl,
	loadImageFromFileInput: loadImageFromFileInput,
	loadImageByDialog: loadImageByDialog
});

/**
 * @module webdnn/math
 */
/** Don't Remove This comment block */
/**
* Return indices of the top-K largest elements.
* This implementation is not stable sort.
*
* @param {number[]|Float32Array|Int32Array} arr array
* @param {number} k number of indices
* @returns {number[]} indices of top-K largest samples
*/
function argmax(arr, k) {
    // Top-k Quicksort
    if (k === void 0) { k = 1; }
    arr = arr.slice();
    var stack = [[0, arr.length]];
    var workspace = [];
    for (var i = 0; i < arr.length; i++)
        workspace[i] = i;
    while (stack.length > 0) {
        var _a = stack.pop(), from = _a[0], to = _a[1], pivot = arr[to - 1], left = from, right = to - 2, tmp = void 0;
        if (from >= to - 1)
            continue;
        while (true) {
            while (arr[left] > pivot && left <= right)
                left++;
            while (arr[right] <= pivot && left <= right)
                right--;
            if (left >= right)
                break;
            tmp = arr[left];
            arr[left] = arr[right];
            arr[right] = tmp;
            tmp = workspace[left];
            workspace[left] = workspace[right];
            workspace[right] = tmp;
        }
        arr[to - 1] = arr[left];
        arr[left] = pivot;
        tmp = workspace[to - 1];
        workspace[to - 1] = workspace[left];
        workspace[left] = tmp;
        // If partial segment contains top-K elements, append it into stack
        stack.push([from, left]); // left (=larger) segment always contains top-K elements
        if (left + 1 < k)
            stack.push([left + 1, to]);
    }
    var result = [];
    for (var i = 0; i < k; i++)
        result.push(workspace[i]);
    return result;
}
/**
 * Return indices of the top-K smallest elements.
 * This implementation is not stable sort.
 *
 * @param {number[]|Float32Array|Int32Array} arr array
 * @param {number} k number of indices
 * @returns {number[]} indices of top-K smallest samples
 */
function argmin(arr, k) {
    // Top-k Quicksort
    if (k === void 0) { k = 1; }
    arr = arr.slice();
    var stack = [[0, arr.length]];
    var workspace = [];
    for (var i = 0; i < arr.length; i++)
        workspace[i] = i;
    while (stack.length > 0) {
        var _a = stack.pop(), from = _a[0], to = _a[1], pivot = arr[to - 1], left = from, right = to - 2, tmp = void 0;
        if (from >= to - 1)
            continue;
        while (true) {
            while (arr[left] < pivot && left <= right)
                left++;
            while (arr[right] >= pivot && left <= right)
                right--;
            if (left >= right)
                break;
            tmp = arr[left];
            arr[left] = arr[right];
            arr[right] = tmp;
            tmp = workspace[left];
            workspace[left] = workspace[right];
            workspace[right] = tmp;
        }
        arr[to - 1] = arr[left];
        arr[left] = pivot;
        tmp = workspace[to - 1];
        workspace[to - 1] = workspace[left];
        workspace[left] = tmp;
        // If partial segment contains top-K elements, append it into stack
        stack.push([from, left]); // left (=larger) segment always contains top-K elements
        if (left + 1 < k)
            stack.push([left + 1, to]);
    }
    var result = [];
    for (var i = 0; i < k; i++)
        result.push(workspace[i]);
    return result;
}

/**
 * @module webdnn/math
 * @preferred
 *
 * Module `WebDNN.Math` provides basic mathematics operations for pre/post-processing.
 */
/** Don't Remove This comment block */



var math = Object.freeze({
	argmax: argmax,
	argmin: argmin
});

/**
 * DEBUG flag for developing WebDNN
 * @private
 */
var configurations = {};
/**
 * get configuration
 * @private
 */
function getConfiguration(key, defaultValue) {
    return key in configurations ? configurations[key] : defaultValue;
}
/**
 * set configuration
 * @private
 */
function setConfiguration(key, value) {
    configurations[key] = value;
}
/**
 * Backend constructor map
 * @private
 */
var descriptorRunners = {
    webgpu: DescriptorRunnerWebGPU,
    webgl: DescriptorRunnerWebGL,
    webassembly: DescriptorRunnerWebassembly,
    fallback: DescriptorRunnerFallback
};
/**
 * Check each computing backend is available or not in this browser.
 * The result will be returned as [[BackendAvailability|`BackendAvailability`]] structure.
 *
 * @returns backend availability
 */
function getBackendAvailability() {
    var status = {
        'webgpu': descriptorRunners['webgpu'].checkAvailability(),
        'webgl': descriptorRunners['webgl'].checkAvailability(),
        'webassembly': descriptorRunners['webassembly'].checkAvailability(),
        'fallback': descriptorRunners['fallback'].checkAvailability(),
    };
    var order = ['webgpu', 'webassembly', 'webgl', 'fallback'].filter(function (backend) { return status[backend]; });
    return {
        status: status,
        defaultOrder: order
    };
}
/**
 * Initialize specified backend
 * @private
 */
function initBackend(backendName, option) {
    return __awaiter(this, void 0, void 0, function () {
        var runner, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(backendName in descriptorRunners))
                        throw new Error("Unknown backend: \"" + backendName + "\"");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    runner = new descriptorRunners[backendName](option);
                    return [4 /*yield*/, runner.init()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    console.warn("Failed to initialize " + backendName + " backend: " + ex_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/, runner];
            }
        });
    });
}
/**
 * Initialize descriptor runner. This function performs follow things.
 *
 * 1. Try to initialize computing backend. WebDNN will try to initialize each backend in order of
 *    the result of [[getBackendAvailability|`getBackendAvailability`]].
 *    If you want to modify this order, specify [[InitOption.backendOrder|`initOption.backendOrder`]] option.
 *
 * 2. Load model data based on initialized backend. Generally, DNN binary data is very large and it takes long time to load.
 *    [[InitOption.progressCallback|`initOption.progressCallback`]] option provides the progress status of loading.
 *
 * ### Examples
 *
 * - Basic usage
 *
 *   ```js
 *   let runner = await WebDNN.load('./model');
 *   ```
 *
 * - With `initOption.progressCallback` option
 *
 *   ```js
 *   let runner = await WebDNN.load('./model', {
 *       progressCallback: (loaded, total) => console.log(`${ (loaded/total*100).toFixed(1) }% Loaded`);
 *   });
 *   ```
 *
 * @param directory URL of directory that contains graph descriptor files (e.g. graph_webgpu.json)
 * @param initOption Initialize option
 * @return DescriptorRunner instance, which is the interface to input/output data and run the model.
 */
function load(directory, initOption) {
    if (initOption === void 0) { initOption = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var backendOrder, backendOptions, backendName, runner, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    backendOrder = initOption.backendOrder;
                    if (!backendOrder) {
                        backendOrder = getBackendAvailability().defaultOrder;
                    }
                    else if (typeof backendOrder === 'string') {
                        backendOrder = [backendOrder];
                    }
                    backendOrder = backendOrder.slice();
                    if (backendOrder.indexOf('fallback') === -1)
                        backendOrder.concat(['fallback']);
                    registerTransformUrlDelegate(function (url) {
                        if (initOption.weightDirectory) {
                            if ((/\.bin/).test(url)) {
                                url = url.replace(directory, initOption.weightDirectory);
                            }
                        }
                        if (initOption.transformUrlDelegate) {
                            url = initOption.transformUrlDelegate(url);
                        }
                        return url;
                    });
                    backendOptions = initOption.backendOptions || {};
                    _a.label = 1;
                case 1:
                    if (!(backendOrder.length > 0)) return [3 /*break*/, 7];
                    backendName = backendOrder.shift();
                    return [4 /*yield*/, initBackend(backendName, backendOptions[backendName])];
                case 2:
                    runner = _a.sent();
                    if (!runner)
                        return [3 /*break*/, 1];
                    runner.ignoreCache = Boolean(initOption.ignoreCache);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, runner.load(directory, initOption.progressCallback)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    ex_2 = _a.sent();
                    console.warn("Model loading failed for " + backendName + " backend. Trying next backend: " + ex_2.message);
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, runner];
                case 7: throw new Error('No backend is available');
            }
        });
    });
}

exports.getConfiguration = getConfiguration;
exports.setConfiguration = setConfiguration;
exports.getBackendAvailability = getBackendAvailability;
exports.load = load;
exports.Math = math;
exports.Image = image;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webdnn.es5.js.map
