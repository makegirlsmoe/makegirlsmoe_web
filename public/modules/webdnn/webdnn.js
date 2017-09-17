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













function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * `DescriptorRunner` provides interface to execute DNN model and access input and output buffers.
 */
class DescriptorRunner {
    constructor() {
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
    /**
     * Return `true` if model is running.
     * While running, calling run() again or modifying input is invalid.
     */
    get running() {
        return this._running;
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class WeightDecoderEightbit {
    decode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // FIXME: store decoded total size in 'data'
            // currently, decoding each block and concatenating them at the end are needed.
            let decoded_arrays = [];
            let total_dst_length = 0;
            let data_view = new DataView(data.buffer, data.byteOffset);
            let src_offset = 0;
            while (src_offset < data.length) {
                let dst_offset = data_view.getInt32(src_offset, true);
                src_offset += 4;
                let body_size = data_view.getInt32(src_offset, true);
                src_offset += 4;
                let scale = data_view.getFloat32(src_offset, true);
                src_offset += 8;
                let scaled_table = new Float32Array(256);
                for (let i = 0; i < 256; i++) {
                    scaled_table[i] = WeightDecoderEightbit.decode_table[i & 0x7F] * scale * (i < 128 ? 1.0 : -1.0);
                }
                // do decode
                let src_data_view = new Uint8Array(data.buffer, data.byteOffset + src_offset, body_size);
                let inflate = new Zlib.Inflate(src_data_view);
                let decompressed = inflate.decompress();
                let dec_size = decompressed.length;
                let decoded_array = new Float32Array(dec_size);
                for (let s = 0; s < dec_size; s++) {
                    decoded_array[s] = scaled_table[decompressed[s]];
                }
                decoded_arrays.push(decoded_array);
                total_dst_length += dec_size;
                src_offset += body_size;
            }
            let dst = new Float32Array(total_dst_length);
            let dst_offset = 0;
            for (let i = 0; i < decoded_arrays.length; i++) {
                dst.set(decoded_arrays[i], dst_offset);
                dst_offset += decoded_arrays[i].length;
            }
            return dst;
        });
    }
}
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

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class WeightDecoderRaw {
    decode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Float32Array(data.buffer, data.byteOffset, data.byteLength / 4);
        });
    }
}

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
const NOT_SCHEDULED = -1;
/**
 * Schedule function which is called too much frequently.
 *
 * @private
 */
class DispatchScheduler {
    constructor() {
        this.scheduledCallbackId = NOT_SCHEDULED;
    }
    /**
     * Register scheduled function. If already other function is scheduled, it is canceled and dispatcher will dispatch only
     * function which is registered at last.
     * @param fn scheduled function
     */
    request(fn) {
        this.fn = fn;
        if (this.scheduledCallbackId == NOT_SCHEDULED) {
            this.scheduledCallbackId = requestAnimationFrame(() => this.forceDispatch());
        }
    }
    /**
     * Dispatch scheduled function just now. If no function is scheduled, dispatcher do nothing.
     */
    forceDispatch() {
        if (this.scheduledCallbackId == NOT_SCHEDULED)
            return;
        this.cancel();
        this.fn();
    }
    /**
     * Cancel scheduled function. If no function is scheduled, dispatcher do nothing.
     */
    cancel() {
        if (this.scheduledCallbackId == NOT_SCHEDULED)
            return;
        cancelAnimationFrame(this.scheduledCallbackId);
        this.scheduledCallbackId = NOT_SCHEDULED;
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
let transformDelegate = url => url;
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
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof input == 'string') {
            input = transformUrl(input) + ((init && init.ignoreCache) ? '?t=' + Date.now() : '');
        }
        else {
            input = Object.assign({}, input, {
                url: transformUrl(input.url) + ((init && init.ignoreCache) ? '?t=' + Date.now() : '')
            });
        }
        let res;
        if (typeof input == 'string' && isXHR2WithBlobSupported()) {
            res = yield fetchUsingXHR(input, init && init.progressCallback);
        }
        else {
            res = yield fetch(input, init);
        }
        if (!res.ok)
            throw new Error(`Fetch returns status code ${res.status}: ${res.statusText}`);
        return res;
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
    let contentLength = res.headers.get('Content-Length');
    if (!contentLength)
        return res.arrayBuffer();
    const total = parseInt(contentLength);
    let buffer = new Uint8Array(total);
    let loaded = 0;
    let reader = res.body.getReader();
    let callbackScheduler = new DispatchScheduler();
    function accumulateLoadedSize(chunk) {
        buffer.set(chunk.value, loaded);
        loaded += chunk.value.length;
        if (callback) {
            callbackScheduler.request(() => callback(loaded, total));
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
    let xhr = new XMLHttpRequest();
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
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "blob";
        let callbackScheduler = new DispatchScheduler();
        req.onload = function (event) {
            callbackScheduler.forceDispatch();
            let res = new Response(req.response);
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
class PlaceholderContext {
    constructor(values) {
        this.values = {};
        if (values) {
            this.update(values);
        }
    }
    get isResolved() {
        return Object.values(this.values).every(value => typeof value == 'number');
    }
    update(values) {
        this.values = Object.assign(this.values, values);
    }
    resolve(placeholder) {
        // Literal value => return itself.
        if (typeof placeholder !== 'object')
            return placeholder;
        // Placeholder object ( { eval: string } ) => resolve
        if (Object.keys(placeholder).length == 1 && 'eval' in placeholder) {
            if (!this.isResolved)
                throw Error(`Not all placeholders are resolved: ${this}`);
            return ((placeholders) => eval(placeholder.eval))(this.values);
        }
        // Array => deep copy
        if (placeholder instanceof Array) {
            return placeholder.map((value) => this.resolve(value));
        }
        // Object => deep copy
        return Object.entries(placeholder)
            .reduce((result, [key, value]) => {
            result[key] = this.resolve(value);
            return result;
        }, {});
    }
    toString() {
        return JSON.stringify(this.values);
    }
}

/**
 * @protected
 */
function flatten(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
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
class SymbolicTypedArray {
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
    constructor(allocation, placeholderContext, ignoreOffsetOnActual = false) {
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
    setArrayBuffer(arrayBuffer) {
        this.arrayBuffer = arrayBuffer;
    }
    /**
     * @protected
     */
    get name() {
        return this.allocation.name;
    }
    /**
     * @protected
     */
    get isDynamic() {
        return (typeof this.allocation.offset !== 'number' || typeof this.allocation.size !== 'number');
    }
    /**
     * @protected
     */
    get offset() {
        //TODO
        if (this.isDynamic) {
            return this.placeholderContext.resolve(this.allocation.offset);
        }
        else {
            return this.allocation.offset;
        }
    }
    /**
     * The number of elements in this buffer. Actual byte size is `(length * SIZE_OF_FLOAT)`.
     */
    get length() {
        if (this.isDynamic) {
            return this.placeholderContext.resolve(this.allocation.size);
        }
        else {
            return this.allocation.size;
        }
    }
    /**
     * Sets a value or an array of values.
     *
     * @param array A typed or untyped array of values to set.
     * @param offset The index at which the values will be written.
     */
    set(array, offset) {
        return this.toActual().set(flatten(array), offset);
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class SymbolicFloat32Array extends SymbolicTypedArray {
    toActual() {
        if (!this.arrayBuffer) {
            throw new Error('Internal buffer for this variable is not set. DescriptorRunner.setPlaceholderValue() have to be called before calling this function.');
        }
        return new Float32Array(this.arrayBuffer, this.ignoreOffsetOnActual ? 0 : this.offset * Float32Array.BYTES_PER_ELEMENT, this.length);
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @private
 */
function wait(duration = 10) {
    // let console.log to be displayed, and prevent freeze
    return new Promise(resolve => setTimeout(resolve, duration));
}
/**
 * @protected
 */
class DescriptorRunnerFallback extends DescriptorRunner {
    constructor() {
        super(...arguments);
        this.backendName = 'fallback';
    }
    static checkAvailability() {
        return true;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //nothing to do
        });
    }
    load(directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let [descriptor, weightRawArray] = yield Promise.all([
                webdnnFetch(`${directory}/graph_${this.backendName}.json`, { ignoreCache: this.ignoreCache, progressCallback: progressCallback })
                    .then(res => res.json()),
                webdnnFetch(`${directory}/weight_${this.backendName}.bin`, { ignoreCache: this.ignoreCache })
                    .then(res => readArrayBufferProgressively(res, progressCallback))
            ]);
            this.setDescriptor(descriptor);
            yield this.compile();
            yield this.initializeStaticBuffer(weightRawArray);
            if (this.placeholderContext && this.placeholderContext.isResolved)
                yield this.initializeDynamicBuffer();
        });
    }
    setDescriptor(descriptor) {
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
    }
    compile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            let dnn_fallback_kernel = null;
            eval(this.descriptor.kernel_source);
            this.kernelObj = dnn_fallback_kernel;
        });
    }
    initializeStaticBuffer(weightRawArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            let descriptor = this.descriptor;
            let staticBuffer = new Float32Array(descriptor.memory_layout.static.size);
            this.staticBuffer = staticBuffer;
            let variableMap = this.variableMap || new Map();
            this.variableMap = variableMap;
            Object.entries(descriptor.memory_layout.static.allocations)
                .forEach(([name, allocation]) => {
                variableMap.set(name, new Float32Array(staticBuffer.buffer, allocation.offset * Float32Array.BYTES_PER_ELEMENT, allocation.size));
            });
            let decoder = get_weight_decoder(this.descriptor.weight_encoding);
            staticBuffer.set(yield decoder.decode(new Uint8Array(weightRawArray)));
            (yield this.getInputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(staticBuffer.buffer));
            (yield this.getOutputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(staticBuffer.buffer));
        });
    }
    initializeDynamicBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            if (!this.placeholderContext)
                throw new Error('PlaceholderContext is not initialized');
            let descriptor = this.descriptor;
            let placeholderContext = this.placeholderContext;
            let dynamicBuffer = new Float32Array(placeholderContext.resolve(descriptor.memory_layout.dynamic.size));
            this.dynamicBuffer = dynamicBuffer;
            let variableMap = this.variableMap || new Map();
            this.variableMap = variableMap;
            Object.entries(descriptor.memory_layout.dynamic.allocations)
                .forEach(([name, allocation]) => {
                variableMap.set(name, new Float32Array(dynamicBuffer.buffer, placeholderContext.resolve(allocation.offset) * Float32Array.BYTES_PER_ELEMENT, placeholderContext.resolve(allocation.size)));
            });
            (yield this.getInputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(dynamicBuffer.buffer));
            (yield this.getOutputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(dynamicBuffer.buffer));
        });
    }
    setPlaceholderValue(values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.placeholderContext)
                throw new Error('placeholderContext is not initialized');
            let placeholderContext = this.placeholderContext;
            placeholderContext.update(values);
            if (!placeholderContext.isResolved)
                return;
            yield this.initializeDynamicBuffer();
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
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
            let variableMap = this.variableMap;
            let placeholderContext = this.placeholderContext;
            let executionInfos = this.descriptor.exec_infos
                .map(executionInfo => placeholderContext.resolve(executionInfo));
            let startDate = Date.now();
            let lastDate = Date.now();
            this._running = true;
            for (let i = 0; i < executionInfos.length; i++) {
                let currentDate = Date.now();
                if (currentDate - lastDate >= 1000) {
                    console.log(`Processed ${i}/${executionInfos.length} kernels in ${currentDate - startDate} ms`);
                    lastDate = currentDate;
                    yield wait();
                }
                let executionInfo = executionInfos[i];
                let inputs = executionInfo.inputs.map((name) => variableMap.get(name));
                let outputs = executionInfo.outputs.map((name) => variableMap.get(name));
                this.kernelObj[executionInfo.entry_func_name](inputs, outputs, executionInfo.call_option);
            }
            console.log(`Processed ${executionInfos.length}/${executionInfos.length} kernels in ${Date.now() - startDate} ms`);
            this._running = false;
        });
    }
    getInputViews() {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            let view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.inputViews;
    }
    getOutputViews() {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            let view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.outputViews;
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class DescriptorRunnerWebassembly extends DescriptorRunner {
    constructor() {
        super();
        this.backendName = 'webassembly';
        this.worker_promise_reject_func = null;
        this.worker_initial_error = null;
        if (typeof Worker === 'undefined')
            throw new Error('WebWorker is needed for WebAssembly backend');
        if (typeof WebAssembly !== 'object') {
            console.warn('WebAssembly is not supported on this browser, trying to use asm.js code');
        }
    }
    static checkAvailability() {
        return 'Worker' in window;
    }
    init() {
        if (!DescriptorRunnerWebassembly.checkAvailability())
            throw Error('WebAssembly backend is not supported in this browser.');
        //nothing to do
        return Promise.resolve();
    }
    load(directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let graph_url = `${directory}/graph_${this.backendName}.json`;
            let graph_fetch = yield webdnnFetch(graph_url, { ignoreCache: this.ignoreCache });
            this.descriptor = yield graph_fetch.json();
            this.placeholderContext = new PlaceholderContext(this.descriptor.placeholders);
            // for browsers which does not support wasm, try asm.js code
            let kernel_backend = typeof WebAssembly === 'object' ? 'webassembly' : 'asmjs';
            let worker_entry_js_path = `${directory}/kernels_${kernel_backend}.js`;
            if (this.ignoreCache) {
                worker_entry_js_path += '?t=' + Date.now();
            }
            worker_entry_js_path = transformUrl(worker_entry_js_path);
            this.worker_entry_js_path = worker_entry_js_path;
            yield this.compile();
            let weight_url = `${directory}/weight_${this.backendName}.bin`;
            let weight_fetch = yield webdnnFetch(weight_url, { ignoreCache: this.ignoreCache, progressCallback: progressCallback });
            let weights_data_ab = yield readArrayBufferProgressively(weight_fetch, progressCallback);
            yield this.loadWeights(new Uint8Array(weights_data_ab));
            //assign buffer to input/output buffer view
            (yield this.getInputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer((new Float32Array(view.length)).buffer));
            (yield this.getOutputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer((new Float32Array(view.length)).buffer));
        });
    }
    setPlaceholderValue(values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.placeholderContext)
                throw new Error('PlaceholderContext is not initialized.');
            let placeholderContext = this.placeholderContext;
            placeholderContext.update(values);
            if (!placeholderContext.isResolved)
                return;
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            let descriptor = this.descriptor;
            let unresolvedValueLists = descriptor.unresolved_value_lists;
            let metaBufferFillList = [];
            for (let kernel_order = 0; kernel_order < unresolvedValueLists.length; kernel_order++) {
                let unresolvedValueList = unresolvedValueLists[kernel_order];
                unresolvedValueList.forEach((offset_placeholder) => {
                    let resolved_value = placeholderContext.resolve(offset_placeholder.placeholder);
                    metaBufferFillList.push(kernel_order, offset_placeholder.offset, resolved_value);
                });
            }
            (yield this.getInputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer((new Float32Array(view.length)).buffer));
            (yield this.getOutputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer((new Float32Array(view.length)).buffer));
            let dynamicBufferSize = this.placeholderContext.resolve(this.descriptor.memory_layout.dynamic.size);
            yield this.setPlaceholderValueWorker(dynamicBufferSize, new Int32Array(metaBufferFillList));
        });
    }
    setPlaceholderValueWorker(dynamicBufferSize, metaBufferFillArray) {
        if (!this.worker)
            throw Error("Worker is not initialized");
        let worker = this.worker;
        return new Promise((resolve, reject) => {
            worker.onmessage = (event) => {
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
    }
    compile() {
        let worker = new Worker(this.worker_entry_js_path);
        worker.onerror = (event) => {
            console.error(event);
            this._running = false;
            // console.error('Worker Exception: ' + event.message);
            if (this.worker_promise_reject_func) {
                this.worker_promise_reject_func(event);
            }
            else {
                this.worker_initial_error = event;
            }
        };
        let promise = new Promise((resolve, reject) => {
            // occurs when this.worker_entry_js_path is 404
            if (this.worker_initial_error)
                return reject(this.worker_initial_error);
            this.worker_promise_reject_func = reject;
            worker.onmessage = (event) => {
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
    }
    loadWeights(weightsData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            if (!this.worker)
                throw new Error('Worker is not initialized');
            let decoder = get_weight_decoder(this.descriptor.weight_encoding);
            let weight_data = yield decoder.decode(weightsData);
            let worker = this.worker;
            let promise = new Promise((resolve, reject) => {
                this.worker_promise_reject_func = reject;
                worker.onmessage = (event) => {
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
            return promise;
        });
    }
    getInputViews() {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            let view = new SymbolicFloat32Array(allocation, placeholderContext, true);
            return view;
        });
        return this.inputViews;
    }
    getOutputViews() {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            // buffer for SymbolicFloat32Array is dedicated for IO, since computation is performed on separate memory space.
            let view = new SymbolicFloat32Array(allocation, placeholderContext, true);
            return view;
        });
        return this.outputViews;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._running)
                throw new Error('Calling another run() while running.');
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            if (!this.inputViews || !this.outputViews)
                throw new Error('getInputViews and getOutputViews must be called prior to run');
            if (!this.worker)
                throw new Error('Worker is not initialized');
            let descriptor = this.descriptor;
            let worker = this.worker;
            let inputViews = this.inputViews;
            let outputViews = this.outputViews;
            let promise = new Promise((resolve, reject) => {
                // TODO: better way not to generate function on every run
                this.worker_promise_reject_func = reject;
                worker.onmessage = (event) => {
                    if (Array.isArray(event.data)) {
                        for (let i = 0; i < event.data.length; i++) {
                            outputViews[i].set(event.data[i]);
                        }
                        this._running = false;
                        resolve();
                    }
                    else {
                        console.log(event.data);
                        worker.terminate();
                        this._running = false;
                        reject(new Error(event.data));
                    }
                };
                let allocations = [descriptor.memory_layout.static.allocations, descriptor.memory_layout.dynamic.allocations];
                let inputs = [];
                for (let i = 0; i < descriptor.inputs.length; i++) {
                    for (let allocation_space = 0; allocation_space < 2; allocation_space++) {
                        let var_alloc = allocations[allocation_space][descriptor.inputs[i]];
                        if (var_alloc) {
                            let symAb = inputViews[i];
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
                let outputs = [];
                for (let i = 0; i < descriptor.outputs.length; i++) {
                    for (let allocation_space = 0; allocation_space < 2; allocation_space++) {
                        let var_alloc = allocations[allocation_space][descriptor.outputs[i]];
                        if (var_alloc) {
                            let symAb = outputViews[i];
                            outputs.push({ space: allocation_space, offset: symAb.offset, size: symAb.length });
                            break;
                        }
                    }
                }
                this._running = true;
                worker.postMessage({ type: 'run', inputs: inputs, outputs: outputs });
            });
            return promise;
        });
    }
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
class Buffer {
    constructor(byteLength, backend) {
        this.byteLength = byteLength;
        this.backend = backend;
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class BufferWebGL extends Buffer {
    constructor(byteLength, textureWidth, textureHeight, name, array, channelMode) {
        super(byteLength, 'webgl');
        this._texture = null;
        this.readTextureUnitIndices = [];
        this.isBoundToDrawFrameBuffer = false;
        this.name = name;
        this.channelMode = channelMode;
        switch (channelMode) {
            case 'RGBA':
                this.elementsPerPixel = 4;
                break;
            case 'R':
                this.elementsPerPixel = 1;
                break;
            default:
                throw Error('Unknown channel mode');
        }
        if (BufferWebGL.handler.isWebGL2) {
            // FIXME: support both R32F and RGBA32F
            switch (channelMode) {
                case 'RGBA':
                    this.textureFormat = BufferWebGL.handler.gl.RGBA;
                    this.textureInternalFormat = BufferWebGL.handler.gl.RGBA32F;
                    this.pixelStride = 4;
                    break;
                case 'R':
                    this.textureFormat = BufferWebGL.handler.gl.RED;
                    this.textureInternalFormat = BufferWebGL.handler.gl.R32F;
                    this.pixelStride = 1;
                    break;
                default:
                    throw Error('Unknown channel mode');
            }
        }
        else {
            this.textureFormat = BufferWebGL.handler.gl.RGBA;
            this.textureInternalFormat = BufferWebGL.handler.gl.RGBA;
            this.pixelStride = 4;
        }
        if (this.pixelStride < this.elementsPerPixel)
            throw Error('elementsPerPixel must be smaller than pixelStride');
        this.array = array || new Float32Array(this.length);
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
    }
    static init(handler) {
        this.handler = handler;
    }
    get texture() {
        return this._texture;
    }
    get length() {
        return this.byteLength / Float32Array.BYTES_PER_ELEMENT;
    }
    /**
     * Write contents onto specified position synchronously.
     *
     * @param {ArrayBufferView} src contents source buffer
     * @param {number} offset position where contents are written on
     */
    write(src, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            this.array.set(src, offset);
            yield this.syncWriteViews();
        });
    }
    /**
     * Read contents from specified position synchronously.
     *
     * @param {Float32ArrayConstructor | Int32ArrayConstructor} dst buffer where contents are written on
     * @param {number} offset position where contents are read from
     * @param {length} length contents length
     */
    read(dst, offset = 0, length) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dst !== Float32Array)
                throw new Error('Currently, only Float32Array is supported for parameter \'dst\'.');
            yield this.syncReadViews();
            new Float32Array(this.array.buffer, offset * Float32Array.BYTES_PER_ELEMENT, length);
        });
    }
    getWriteView(offset, length, type) {
        return new type(this.array.buffer, offset * type.BYTES_PER_ELEMENT, length);
    }
    ;
    getReadView(offset, length, type) {
        return new type(this.array.buffer, offset * type.BYTES_PER_ELEMENT, length);
    }
    /**
     * Sync buffered data into memory.
     *
     * @see Buffer#getWriteView
     */
    syncWriteViews() {
        return __awaiter(this, void 0, void 0, function* () {
            let gl = BufferWebGL.handler.gl;
            if (!this.texture)
                this.allocateTexture();
            let tmp = this.pack(this.array);
            if (tmp.length != this.textureWidth * this.textureHeight * this.pixelStride) {
                let tmp2 = new Float32Array(this.textureWidth * this.textureHeight * this.elementsPerPixel);
                tmp2.set(tmp, 0);
                tmp = tmp2;
            }
            yield this.bindToReadTexture(9); //TODO: texture unit 9 is always available?
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.textureWidth, this.textureHeight, this.textureFormat, gl.FLOAT, tmp);
            this.unbindFromReadTexture();
        });
    }
    /**
     * Sync memory data into buffer view.
     *
     * @see Buffer#getReadView
     */
    syncReadViews() {
        return __awaiter(this, void 0, void 0, function* () {
            let gl = BufferWebGL.handler.gl;
            // FIXME(Kiikurage): more readable code
            const ELEMENT_PER_PIXEL = 4;
            const FORMAT = gl.RGBA;
            let tmp = new Float32Array(this.textureWidth * this.textureHeight * ELEMENT_PER_PIXEL);
            this.bindToDrawTexture();
            gl.readPixels(0, 0, this.textureWidth, this.textureHeight, FORMAT, gl.FLOAT, tmp);
            this.unbindFromDrawTexture();
            tmp = this.unpack(tmp);
            this.array.set(tmp.slice(0, this.length), 0);
        });
    }
    bindToReadTexture(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isBoundToDrawFrameBuffer)
                throw Error('This buffer is already registered as draw buffer. ' +
                    'You may forgot to unbind the binding while previous operations.');
            let gl = BufferWebGL.handler.gl;
            if (!this.texture) {
                this.allocateTexture();
                yield this.syncWriteViews();
            }
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            this.readTextureUnitIndices.push(unit);
        });
    }
    unbindFromReadTexture() {
        let gl = BufferWebGL.handler.gl;
        for (let unit of this.readTextureUnitIndices) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        this.readTextureUnitIndices = [];
    }
    bindToDrawTexture() {
        if (this.readTextureUnitIndices.length > 0)
            throw Error('This buffer is already registered as read buffer. ' +
                'You cannot bind a texture as both read and draw texture buffer at same time.');
        if (this.isBoundToDrawFrameBuffer)
            throw Error('This buffer is already registered as draw buffer. ' +
                'You may forgot to unbind the binding while previous operations.');
        let gl = BufferWebGL.handler.gl;
        if (!this.texture)
            this.allocateTexture();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        this.isBoundToDrawFrameBuffer = true;
    }
    unbindFromDrawTexture() {
        if (!this.isBoundToDrawFrameBuffer)
            return;
        let gl = BufferWebGL.handler.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);
        this.isBoundToDrawFrameBuffer = false;
    }
    pack(array) {
        let elementStride = this.pixelStride / this.elementsPerPixel;
        if (elementStride === 1) {
            return new Float32Array(array);
        }
        else {
            let result = new Float32Array(array.length * elementStride);
            for (let i = 0; i < array.length; i++)
                result[i * elementStride] = array[i];
            return result;
        }
    }
    unpack(array) {
        // FIXME(Kiikurage): more readable code
        const PIXEL_STRIDE = 4;
        let elementStride = PIXEL_STRIDE / this.elementsPerPixel;
        if (elementStride === 1) {
            return new Float32Array(array);
        }
        else {
            let result = new Float32Array(array.length / elementStride);
            for (let i = 0; i < array.length / elementStride; i++)
                result[i] = array[i * elementStride];
            return result;
        }
    }
    allocateTexture() {
        if (this.texture)
            throw Error('Texture is already allocated.');
        this._texture = BufferWebGL.handler.createTexture(this.textureWidth, this.textureHeight, this.textureInternalFormat, this.textureFormat);
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class WebGLHandler {
    constructor() {
        let { gl, vao, isWebGL2 } = checkNull(WebGLHandler.initializeContext());
        this.gl = gl;
        this.vao = vao;
        this.isWebGL2 = isWebGL2;
    }
    createTexture(textureWidth, textureHeight, internalFormat, format) {
        let gl = this.gl;
        let texture = checkNull(gl.createTexture());
        let type = gl.FLOAT;
        gl.activeTexture(gl.TEXTURE0 + 9); // TODO: texture unit 9 is always available?
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, textureWidth, textureHeight, 0, format, type, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }
    createVertexShader(source) {
        return this.createShader(this.gl.VERTEX_SHADER, source);
    }
    createFragmentShader(source) {
        return this.createShader(this.gl.FRAGMENT_SHADER, source);
    }
    createShader(type, source) {
        let shader = checkNull(this.gl.createShader(type));
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
            throw Error("Shader Compile failed: " + this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }
    createProgram(vertexShader, fragmentShader) {
        let program = checkNull(this.gl.createProgram());
        this.gl.attachShader(program, fragmentShader);
        this.gl.attachShader(program, vertexShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error(this.gl.getProgramInfoLog(program));
            throw Error('ShaderProgram Initialization failed.');
        }
        return program;
    }
    createArrayBuffer(vertexArray) {
        let buffer = checkNull(this.gl.createBuffer());
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.STATIC_DRAW);
        return buffer;
    }
    createVertexArray() {
        if (this.isWebGL2) {
            return checkNull(this.gl.createVertexArray());
        }
        else {
            return checkNull(this.vao.createVertexArrayOES());
        }
    }
    createFrameBuffer() {
        return checkNull(this.gl.createFramebuffer());
    }
    bindArrayBuffer(buffer) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    }
    bindFrameBuffer(frameBuffer, width, height) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);
        this.gl.viewport(0, 0, width, height);
        this.gl.scissor(0, 0, width, height);
    }
    useProgram(program) {
        this.gl.useProgram(program);
    }
    bindVertexArray(vao) {
        if (this.isWebGL2) {
            this.gl.bindVertexArray(vao);
        }
        else {
            this.vao.bindVertexArrayOES(vao);
        }
    }
    deleteTexture(texture) {
        this.gl.deleteTexture(texture);
    }
    static initializeWebGL2Context(canvas) {
        let gl;
        gl = (canvas.getContext('webgl2'));
        if (!gl)
            return null;
        if (!gl.getExtension('EXT_color_buffer_float'))
            return null;
        if (isDebugMode() && !gl.getExtension('WEBGL_debug_renderer_info'))
            return null;
        return gl;
    }
    static initializeWebGL1Context(canvas) {
        let gl;
        let vao;
        gl = (canvas.getContext('webgl') || canvas.getContext('webgl-experimental'));
        if (!gl)
            return null;
        if (!gl.getExtension('OES_texture_float'))
            return null;
        if (!(vao = gl.getExtension('OES_vertex_array_object')))
            return null;
        if (isDebugMode() && !gl.getExtension('WEBGL_debug_renderer_info'))
            return null;
        return { gl, vao };
    }
    static initializeContext() {
        let canvas = document.createElement('canvas');
        let gl;
        let isWebGL2 = false;
        let vao;
        gl = WebGLHandler.initializeWebGL2Context(canvas);
        if (gl) {
            isWebGL2 = true;
            if (isDebugMode())
                console.info('WebGL2 is enabled');
        }
        else {
            let res = WebGLHandler.initializeWebGL1Context(canvas);
            if (res) {
                gl = res.gl;
                vao = res.vao;
                isWebGL2 = false;
                if (isDebugMode())
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
        return { gl, vao, isWebGL2 };
    }
    /**
     * Check whether WebGL is supported or not
     * @protected
     */
    static checkAvailability() {
        if (availability === null) {
            if (!WebGLHandler.initializeContext()) {
                availability = false;
            }
            else {
                availability = true;
            }
        }
        return availability;
    }
}
let availability = null;
function checkNull(obj) {
    if (obj === null)
        throw Error('Null is deteced');
    return obj;
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
// [x y u v] * [upper-left, lower-left, upper-right, lower-right]
/**
 * @protected
 */
const vertexArray = new Float32Array([
    -1, +1,
    -1, -1,
    +1, +1,
    +1, -1,
]);
/**
 * @protected
 */
class DescriptorRunnerWebGL extends DescriptorRunner {
    constructor() {
        super(...arguments);
        this.backendName = 'webgl';
    }
    static checkAvailability() {
        //TODO(Kiikurage)
        // Safari supports WebGL with OES_TEXTURE_FLOAT extension. However,
        // currently when WebGLRenderingContext#readPixels is called, an error is thrown.
        const IS_SAFARI = navigator.userAgent.toLowerCase().indexOf('safari') !== -1 &&
            navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
        return WebGLHandler.checkAvailability() && !IS_SAFARI;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DescriptorRunnerWebGL.checkAvailability())
                throw Error('WebGL backend is not supported in this browser.');
            this.handler = new WebGLHandler();
            BufferWebGL.init(this.handler);
            let vertexBuffer = this.handler.createArrayBuffer(vertexArray);
            this.handler.bindArrayBuffer(vertexBuffer);
            this.buffers = new Map();
        });
    }
    load(directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let [descriptor, weightRawArray] = yield Promise.all([
                webdnnFetch(`${directory}/graph_${this.backendName}.json`, { ignoreCache: this.ignoreCache })
                    .then(res => res.json()),
                webdnnFetch(`${directory}/weight_${this.backendName}.bin`, { ignoreCache: this.ignoreCache, progressCallback: progressCallback })
                    .then(res => readArrayBufferProgressively(res, progressCallback))
            ]);
            yield this.setDescriptor(descriptor);
            yield this.compile();
            yield this.initializeStaticBuffer(weightRawArray);
            if (this.placeholderContext && this.placeholderContext.isResolved)
                yield this.initializeDynamicBuffer();
        });
    }
    initializeStaticBuffer(weightRawArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            let descriptor = this.descriptor;
            let decoder = get_weight_decoder(this.descriptor.weight_encoding);
            let weight = yield decoder.decode(new Uint8Array(weightRawArray));
            let buffers = this.buffers;
            let mapping = descriptor.memory_layout.mapping;
            Object.entries(descriptor.memory_layout.static.allocations)
                .forEach(([name, { width, height, size, channel_mode }]) => {
                buffers.set(name, new BufferWebGL(size * Float32Array.BYTES_PER_ELEMENT, width, height, name, null, channel_mode));
            });
            Object.entries(descriptor.constants_map)
                .forEach(([name, { size, byte_offset }]) => {
                buffers.get(name).array.set(new Float32Array(weight.buffer, byte_offset, size));
            });
            (yield this.getInputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(buffers.get(mapping[view.name]).getWriteView(0, view.length, Float32Array).buffer));
            (yield this.getOutputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(buffers.get(mapping[view.name]).getReadView(0, view.length, Float32Array).buffer));
        });
    }
    initializeDynamicBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw Error("GraphDescriptor is not loaded.");
            if (!this.placeholderContext)
                throw Error("PlaceholderContext is not initialized.");
            let descriptor = this.descriptor;
            let placeholderContext = this.placeholderContext;
            let buffers = this.buffers;
            let mapping = descriptor.memory_layout.mapping;
            Object.entries(descriptor.memory_layout.dynamic.allocations)
                .forEach(([name, { width, height, size, channel_mode }]) => {
                buffers.set(name, new BufferWebGL(placeholderContext.resolve(size) * Float32Array.BYTES_PER_ELEMENT, placeholderContext.resolve(width), placeholderContext.resolve(height), name, null, channel_mode));
            });
            (yield this.getInputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(buffers.get(mapping[view.name]).getWriteView(0, placeholderContext.resolve(view.length), Float32Array).buffer));
            (yield this.getOutputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(buffers.get(mapping[view.name]).getReadView(0, placeholderContext.resolve(view.length), Float32Array).buffer));
            this.buildPipeline();
        });
    }
    setDescriptor(descriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            this.descriptor = descriptor;
            //reset all datum depend on old descriptor
            this.placeholderContext = new PlaceholderContext(descriptor.placeholders);
        });
    }
    compile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            let descriptor = this.descriptor;
            this.programs = new Map();
            this.vertexShader = this.handler.createVertexShader(`
            precision highp float;
            attribute vec2 _xy;
            void main() { 
              gl_Position = vec4(_xy, 0, 1); 
            }
        `);
            Object.keys(descriptor.shader_sources)
                .forEach(name => {
                let fragmentShader = this.handler.createFragmentShader(descriptor.shader_sources[name]);
                let program = this.handler.createProgram(this.vertexShader, fragmentShader);
                this.programs.set(name, program);
            });
        });
    }
    setPlaceholderValue(values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.placeholderContext)
                throw new Error('PlaceholderContext is not initialized.');
            let placeholderContext = this.placeholderContext;
            placeholderContext.update(values);
            if (!placeholderContext.isResolved)
                return;
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            yield this.initializeDynamicBuffer();
            // resolve placeholders in execution info
            // TODO:
            if (Object.keys(this.descriptor.placeholders).length > 0)
                throw Error('Currently, WebGL backend doesn\'t support Placeholder feature.');
        });
    }
    getInputViews() {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        let mapping = this.descriptor.memory_layout.mapping;
        this.inputViews = descriptor.inputs.map(name => {
            let view = new SymbolicFloat32Array({
                name: name,
                size: this.buffers.get(mapping[name]).length,
                offset: 0
            }, placeholderContext, true);
            return view;
        });
        return this.inputViews;
    }
    getOutputViews() {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        let mapping = this.descriptor.memory_layout.mapping;
        this.outputViews = descriptor.outputs.map(name => {
            let view = new SymbolicFloat32Array({
                name: name,
                size: this.buffers.get(mapping[name]).length,
                offset: 0
            }, placeholderContext, true);
            return view;
        });
        return this.outputViews;
    }
    buildPipeline() {
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        if (!this.placeholderContext.isResolved)
            throw new Error(`Not all placeholders are resolved: ${this.placeholderContext}`);
        let gl = this.handler.gl;
        let buffers = this.buffers;
        let mapping = this.descriptor.memory_layout.mapping;
        let referenceCount = new Map();
        this.runtimeInfo = {
            inputs: this.getInputViews().map(view => buffers.get(mapping[view.name])),
            outputs: this.getOutputViews().map(view => buffers.get(mapping[view.name])),
            programs: this.descriptor.exec_infos.map(execInfo => {
                // inputs
                let inputs = execInfo.inputs.map(input => {
                    let buffer = buffers.get(mapping[input.variable_name]);
                    if (!referenceCount.has(buffer))
                        referenceCount.set(buffer, 0);
                    referenceCount.set(buffer, referenceCount.get(buffer) + 1);
                    return {
                        buffer: buffer,
                        uniformIndex: input.value
                    };
                });
                //output
                let output = buffers.get(mapping[execInfo.output]);
                // shader
                let program = this.programs.get(execInfo.shader_name);
                this.handler.useProgram(program);
                // uniforms
                let uniforms = Object.keys(execInfo.uniforms).map(name => {
                    let { type, value } = execInfo.uniforms[name];
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
                        case 'vec4':
                            return {
                                func: gl.uniform4fv,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        case 'sampler2D':
                            return {
                                func: gl.uniform1i,
                                args: [gl.getUniformLocation(program, name), value]
                            };
                        default:
                            throw TypeError(`Incompatible type for uniform parameter: ${type}`);
                    }
                });
                // vao
                let vao = this.handler.createVertexArray();
                this.handler.bindVertexArray(vao);
                // attributes
                let loc = gl.getAttribLocation(program, '_xy');
                gl.vertexAttribPointer(loc, 2, gl.FLOAT, true, 8, 0);
                gl.enableVertexAttribArray(loc);
                // run
                return {
                    program: program,
                    frameBuffer: this.handler.createFrameBuffer(),
                    name: execInfo.shader_name,
                    width: output.textureWidth,
                    height: output.textureHeight,
                    inputs: inputs,
                    output: output,
                    vao: vao,
                    uniforms: uniforms,
                    disposable: []
                };
            })
        };
        for (let runtimeProgramInfo of this.runtimeInfo.programs) {
            runtimeProgramInfo.inputs.forEach(({ buffer }) => {
                let count = referenceCount.get(buffer) - 1;
                if (count == 0) {
                    runtimeProgramInfo.disposable.push(buffer);
                }
                referenceCount.set(buffer, count);
            });
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._running)
                throw new Error('Calling another run() while running.');
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            if (!this.inputViews || !this.outputViews)
                throw new Error('getInputViews and getOutputViews must be called prior to run');
            if (!this.placeholderContext)
                throw new Error('PlaceholderContext is not initialized');
            if (!this.placeholderContext.isResolved)
                throw new Error(`Not all placeholders are resolved: ${this.placeholderContext}`);
            this._running = true;
            let gl = this.handler.gl;
            let runtimeInfo = this.runtimeInfo;
            if (this.runtimeInfo.programs.length > 0) {
                for (let buffer of runtimeInfo.inputs)
                    yield buffer.syncWriteViews();
                if (isDebugMode()) {
                    let records = [];
                    let totalElapsedTime = 0;
                    for (let runtimeProgramInfo of runtimeInfo.programs) {
                        let start = performance.now();
                        this.handler.bindVertexArray(runtimeProgramInfo.vao);
                        this.handler.bindFrameBuffer(runtimeProgramInfo.frameBuffer, runtimeProgramInfo.width, runtimeProgramInfo.height);
                        // inputs
                        for (let { buffer, uniformIndex } of runtimeProgramInfo.inputs)
                            yield buffer.bindToReadTexture(uniformIndex);
                        // output
                        runtimeProgramInfo.output.bindToDrawTexture();
                        // shader
                        this.handler.useProgram(runtimeProgramInfo.program);
                        // uniforms
                        for (let uniform of runtimeProgramInfo.uniforms)
                            uniform.func.apply(gl, uniform.args);
                        // run
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexArray.length / 2);
                        gl.finish();
                        let elapsedTime = performance.now() - start;
                        records.push({
                            'Kernel': runtimeProgramInfo.name,
                            'Elapsed time [ms]': elapsedTime
                        });
                        totalElapsedTime += elapsedTime;
                        for (let { buffer, uniformIndex } of runtimeProgramInfo.inputs) {
                            buffer.unbindFromReadTexture();
                            yield buffer.syncReadViews();
                            console.log(uniformIndex, buffer.array);
                        }
                        runtimeProgramInfo.output.unbindFromDrawTexture();
                        yield runtimeProgramInfo.output.syncReadViews();
                        console.log(runtimeProgramInfo.name, runtimeProgramInfo.output.array);
                    }
                    let summary = Array.from(Object.values(records.reduce((summary, record) => {
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
                    summary.forEach(record => record['Ratio [%]'] = (record['Elapsed time [ms]'] / totalElapsedTime).toFixed(2));
                    console.table(records);
                    console.table(summary);
                }
                else {
                    for (let runtimeProgramInfo of runtimeInfo.programs) {
                        this.handler.bindVertexArray(runtimeProgramInfo.vao);
                        this.handler.bindFrameBuffer(runtimeProgramInfo.frameBuffer, runtimeProgramInfo.width, runtimeProgramInfo.height);
                        // inputs
                        for (let { buffer, uniformIndex } of runtimeProgramInfo.inputs)
                            yield buffer.bindToReadTexture(uniformIndex);
                        // output
                        runtimeProgramInfo.output.bindToDrawTexture();
                        // shader
                        this.handler.useProgram(runtimeProgramInfo.program);
                        // uniforms
                        for (let uniform of runtimeProgramInfo.uniforms)
                            uniform.func.apply(gl, uniform.args);
                        // run
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexArray.length / 2);
                        // release buffers and binding
                        // for (let buffer of runtimeProgramInfo.disposable) buffer.releaseGPUMemory();
                        for (let { buffer } of runtimeProgramInfo.inputs)
                            buffer.unbindFromReadTexture();
                        runtimeProgramInfo.output.unbindFromDrawTexture();
                    }
                }
                for (let buffer of runtimeInfo.outputs)
                    yield buffer.syncReadViews();
            }
            this._running = false;
        });
    }
}

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class BufferWebGPU extends Buffer {
    constructor(byteLength) {
        super(byteLength, 'webgpu');
        if (byteLength == 0) {
            byteLength = 4; //0 length buffer causes error
        }
        this.buffer = BufferWebGPU.handler.createBuffer(new Uint8Array(byteLength));
        this.bufferView = new Uint8Array(this.buffer.contents);
    }
    // async: there may be platforms synchronization is needed before writing
    write(src, dst_offset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BufferWebGPU.handler.sync();
            let viewSameType = new src.constructor(this.bufferView.buffer);
            viewSameType.set(src, dst_offset);
        });
    }
    read(dst, src_offset = 0, length) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dst)
                throw new Error('dst cannot be null');
            yield BufferWebGPU.handler.sync();
            if (this.byteLength === 0)
                return;
            let dstConstructor = dst.constructor;
            let viewSameType = new dstConstructor(this.bufferView.buffer, this.bufferView.byteOffset + src_offset * dstConstructor.BYTES_PER_ELEMENT, length);
            dst.set(viewSameType);
            return;
        });
    }
    static init(webgpuHandler) {
        this.handler = webgpuHandler;
    }
    getWriteView(offset, length, type) {
        return new type(this.bufferView.buffer, this.bufferView.byteOffset + offset * type.BYTES_PER_ELEMENT, length);
    }
    getReadView(offset, length, type) {
        return new type(this.bufferView.buffer, this.bufferView.byteOffset + offset * type.BYTES_PER_ELEMENT, length);
    }
    syncWriteViews() {
        return __awaiter(this, void 0, void 0, function* () {
            // no sync needed
        });
    }
    syncReadViews() {
        return __awaiter(this, void 0, void 0, function* () {
            // if the user awaits promise from final kernel execution, this function call is not needed.
            yield BufferWebGPU.handler.sync();
        });
    }
}

///<reference path="./webgpu.d.ts" />
/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @protected
 */
class WebGPUHandler {
    constructor() {
        this.pipelineStates = new Map();
        if (!IS_WEBGPU_SUPPORTED)
            throw new Error('This browser does not support WebGPU');
        let context;
        try {
            context = document.createElement('canvas').getContext('webgpu');
        }
        catch (err) {
            throw new Error(`During initializing WebGPURenderingContext, unexpected error is occurred: ${err.message}`);
        }
        if (!context)
            throw new Error('WebGPURenderingContext initialization failed');
        this.context = context;
        this.commandQueue = context.createCommandQueue();
    }
    createBuffer(arrayBuffer) {
        return this.context.createBuffer(arrayBuffer);
    }
    loadKernel(librarySource, namespace = '') {
        let library = this.context.createLibrary(librarySource);
        for (let name of library.functionNames) {
            let kernelFunction = library.functionWithName(name);
            let pipelineStates = this.context.createComputePipelineState(kernelFunction);
            this.pipelineStates.set(namespace + '.' + name, pipelineStates);
        }
    }
    createCommandBuffer() {
        return this.commandQueue.createCommandBuffer();
    }
    getPipelineStateByName(name) {
        let state = this.pipelineStates.get(name);
        if (!state) {
            throw TypeError(`Kernel function "${name}" is not loaded.`);
        }
        return state;
    }
    executeSinglePipelineState(name, threadgroupsPerGrid, threadsPerThreadgroup, buffers, getCompletedPromise) {
        let commandBuffer = this.createCommandBuffer();
        let commandEncoder = commandBuffer.createComputeCommandEncoder();
        commandEncoder.setComputePipelineState(this.getPipelineStateByName(name));
        for (let i = 0; i < buffers.length; i++) {
            let buffer = buffers[i];
            let wgbuf;
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
        let promise = null;
        if (getCompletedPromise) {
            promise = commandBuffer.completed;
        }
        commandBuffer.commit();
        return promise;
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            let commandBuffer = this.createCommandBuffer();
            let commandEncoder = commandBuffer.createComputeCommandEncoder();
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
            let promise = commandBuffer.completed;
            commandBuffer.commit();
            return promise;
        });
    }
}
/**
 * Flag whether WebGPU is supported or not
 * @protected
 */
const IS_WEBGPU_SUPPORTED = 'WebGPURenderingContext' in window && 'WebGPUComputeCommandEncoder' in window;

/**
 * @module webdnn
 */
/** Don't Remove This comment block */
/**
 * @private
 */
const IS_IOS = navigator.userAgent.includes('iPhone');
/**
 * @protected
 */
class DescriptorRunnerWebGPU extends DescriptorRunner {
    //noinspection JSUnusedLocalSymbols
    constructor(option) {
        super();
        this.backendName = 'webgpu';
    }
    static checkAvailability() {
        return IS_WEBGPU_SUPPORTED;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DescriptorRunnerWebGPU.checkAvailability())
                throw Error('WebGPU backend is not supported in this browser.');
            // initialize webgpu, build kernels
            this.shaderLanguage = 'metal';
            this.webgpuHandler = new WebGPUHandler();
            BufferWebGPU.init(this.webgpuHandler);
            this.initializeBasicKernels();
            yield this.checkIncompatibleGPU();
        });
    }
    initializeBasicKernels() {
        this.webgpuHandler.loadKernel('kernel void sync(){}', 'basic');
    }
    checkIncompatibleGPU() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            It is reported that AMD GPU crashes when performing sgemm (matrix multiplication).
            Until this problem is solved, blocking WebGPU backend in the environment is needed.
            API in WebGPU does not directly gives hardware information, so trying to determine hardware heuristically.
    
            Criteria: thread_execution_width == 32 is required
            (on AMD FirePro D500, thread_execution_width == 64)
            */
            this.webgpuHandler.loadKernel(`
#include <metal_stdlib>
using namespace metal;
        kernel void check_compatibility(
            device float *A[[buffer(0)]],
            uint global_index[[thread_position_in_grid]],
            uint thread_execution_width[[thread_execution_width]]
        ){
            if (global_index == 0) {
                A[0] = thread_execution_width;
            }
        }`, 'basic');
            let trans_buf = this.webgpuHandler.createBuffer(new Float32Array(1));
            yield this.webgpuHandler.executeSinglePipelineState('basic.check_compatibility', {
                width: 1,
                height: 1,
                depth: 1
            }, {
                width: 1,
                height: 1,
                depth: 1
            }, [trans_buf], true);
            let trans_array_view = new Float32Array(trans_buf.contents);
            let thread_execution_width = trans_array_view[0];
            if (thread_execution_width != 32) {
                throw new Error(`Sorry, this GPU does not compatible with WebGPU (thread_execution_width == ${thread_execution_width}. See checkIncompatibleGPU method of https://github.com/mil-tokyo/webdnn/blob/master/src/descriptor_runner/descriptor_runner/descriptor_runner_webgpu.ts`);
            }
        });
    }
    load(directory, progressCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let [descriptor, weightRawArray] = yield Promise.all([
                webdnnFetch(`${directory}/graph_${this.backendName}.json`, { ignoreCache: this.ignoreCache })
                    .then(res => res.json()),
                webdnnFetch(`${directory}/weight_${this.backendName}.bin`, { ignoreCache: this.ignoreCache, progressCallback: progressCallback })
                    .then(res => readArrayBufferProgressively(res, progressCallback))
            ]);
            yield this.setDescriptor(descriptor);
            yield this.compile();
            yield this.initializeStaticBuffer(weightRawArray);
            yield this.initializeMetaBuffers();
            yield this.setPlaceholderValue({
                '__MAX_THREADS_PER_THREADGROUP__': IS_IOS ? 512 : 512
            });
            if (this.placeholderContext && this.placeholderContext.isResolved)
                yield this.initializeDynamicBuffer();
        });
    }
    initializeStaticBuffer(weightRawArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw Error("GraphDescriptor is not loaded.");
            let descriptor = this.descriptor;
            let staticBuffer = new BufferWebGPU(descriptor.memory_layout.static.size * Float32Array.BYTES_PER_ELEMENT);
            this.staticBuffer = staticBuffer;
            let decoder = get_weight_decoder(descriptor.weight_encoding);
            yield staticBuffer.write(yield decoder.decode(new Uint8Array(weightRawArray)));
            (yield this.getInputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(staticBuffer.bufferView.buffer));
            (yield this.getOutputViews())
                .filter(view => !view.isDynamic)
                .forEach(view => view.setArrayBuffer(staticBuffer.bufferView.buffer));
        });
    }
    initializeMetaBuffers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw Error("GraphDescriptor is not loaded.");
            this.metaBuffers = yield Promise.all(this.descriptor.exec_infos.map((executionInfo) => __awaiter(this, void 0, void 0, function* () {
                let buffer = new BufferWebGPU(executionInfo.meta_buffer.length * Int32Array.BYTES_PER_ELEMENT);
                yield buffer.write(new Uint8Array(executionInfo.meta_buffer));
                return buffer;
            })));
        });
    }
    initializeDynamicBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw Error("GraphDescriptor is not loaded.");
            if (!this.placeholderContext)
                throw Error("PlaceholderContext is not initialized.");
            let descriptor = this.descriptor;
            let placeholderContext = this.placeholderContext;
            let dynamicBufferSize = placeholderContext.resolve(descriptor.memory_layout.dynamic.size);
            let dynamicBuffer = new BufferWebGPU(dynamicBufferSize * Float32Array.BYTES_PER_ELEMENT);
            this.dynamicBuffer = dynamicBuffer;
            (yield this.getInputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(dynamicBuffer.bufferView.buffer));
            (yield this.getOutputViews())
                .filter(view => view.isDynamic)
                .forEach(view => view.setArrayBuffer(dynamicBuffer.bufferView.buffer));
        });
    }
    setDescriptor(descriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            this.descriptor = descriptor;
            //reset all datum depend on old descriptor
            this.staticBuffer = null;
            this.dynamicBuffer = null;
            this.metaBuffers = null;
            this.placeholderContext = new PlaceholderContext(descriptor.placeholders);
            this.executionInfos = descriptor.exec_infos;
        });
    }
    compile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            this.webgpuHandler.loadKernel(this.descriptor.kernel_source, 'descriptor');
        });
    }
    setPlaceholderValue(values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.placeholderContext)
                throw new Error('PlaceholderContext is not initialized.');
            let placeholderContext = this.placeholderContext;
            placeholderContext.update(values);
            if (!placeholderContext.isResolved)
                return;
            if (!this.descriptor)
                throw new Error('Descriptor is not loaded');
            if (!this.metaBuffers)
                throw new Error('MetaBuffers are not initialized');
            let descriptor = this.descriptor;
            let metaBuffers = this.metaBuffers;
            yield this.initializeDynamicBuffer();
            // resolve placeholders in execution info
            this.executionInfos = yield Promise.all(descriptor.exec_infos.map((executionInfo, i) => __awaiter(this, void 0, void 0, function* () {
                // resolve placeholders in meta buffer
                let bufferView = new Int32Array(metaBuffers[i].bufferView.buffer);
                for (let unresolved_value of executionInfo.unresolved_value_list) {
                    bufferView[unresolved_value.offset] = placeholderContext.resolve(unresolved_value.placeholder);
                }
                return placeholderContext.resolve(executionInfo);
            })));
        });
    }
    getInputViews() {
        if (this.inputViews)
            return this.inputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.inputViews = descriptor.inputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            let view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.inputViews;
    }
    getOutputViews() {
        if (this.outputViews)
            return this.outputViews;
        if (!this.descriptor)
            throw new Error('Descriptor is not loaded');
        if (!this.placeholderContext)
            throw new Error('PlaceholderContext is not initialized');
        let descriptor = this.descriptor;
        let placeholderContext = this.placeholderContext;
        this.outputViews = descriptor.outputs.map(name => {
            let allocation = descriptor.memory_layout.static.allocations[name] || descriptor.memory_layout.dynamic.allocations[name];
            let view = new SymbolicFloat32Array(allocation, placeholderContext);
            return view;
        });
        return this.outputViews;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._running)
                throw new Error('Calling another run() while running.');
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
                throw new Error(`Not all placeholders are resolved: ${this.placeholderContext}`);
            let staticBuffer = this.staticBuffer;
            let dynamicBuffer = this.dynamicBuffer;
            let metaBuffers = this.metaBuffers;
            this._running = true;
            if (isDebugMode()) {
                let records = [];
                let totalElapsedTime = 0;
                for (let i = 0; i < this.executionInfos.length; i++) {
                    let exec_info = this.executionInfos[i];
                    let start = performance.now();
                    yield this.webgpuHandler.executeSinglePipelineState('descriptor.' + exec_info.entry_func_name, exec_info.threadgroups_per_grid, exec_info.threads_per_thread_group, [staticBuffer, dynamicBuffer, metaBuffers[i]], true);
                    let elapsedTime = performance.now() - start;
                    records.push({
                        'Kernel': exec_info.entry_func_name,
                        'Elapsed time [ms]': elapsedTime
                    });
                    totalElapsedTime += elapsedTime;
                }
                let summary = Array.from(Object.values(records.reduce((summary, record) => {
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
                summary.forEach(record => record['Ratio [%]'] = (record['Elapsed time [ms]'] / totalElapsedTime).toFixed(2));
                console.table(records);
                console.table(summary);
            }
            else {
                let complete_promise = null;
                for (let i = 0; i < this.executionInfos.length; i++) {
                    let exec_info = this.executionInfos[i];
                    let is_last = i == this.executionInfos.length - 1;
                    complete_promise = this.webgpuHandler.executeSinglePipelineState('descriptor.' + exec_info.entry_func_name, exec_info.threadgroups_per_grid, exec_info.threads_per_thread_group, [staticBuffer, dynamicBuffer, metaBuffers[i]], is_last);
                }
                yield complete_promise; //wait to finish final kernel
            }
            this._running = false;
        });
    }
}

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
    let context = canvas.getContext('2d');
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
function getImageDataFromCanvas(canvas, options = {}) {
    let { srcX = 0, srcY = 0, srcW = canvas.width, srcH = canvas.height, dstX = 0, dstY = 0 } = options;
    let { dstW = srcW, dstH = srcH } = options;
    let imageData = getContext2D(canvas).getImageData(srcX, srcY, srcW, srcH);
    if (dstX !== 0 || dstY !== 0 || srcW !== dstW || srcH !== dstH) {
        imageData = cropAndResizeImageData(imageData, { dstX, dstY, dstW, dstH });
    }
    return imageData;
}
/**
 * @protected
 */
function getImageDataFromDrawable(drawable, options = {}) {
    let srcW, srcH;
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
    let { srcX = 0, srcY = 0, dstX = 0, dstY = 0, dstW = srcW, dstH = srcH } = options;
    let canvas = document.createElement('canvas');
    canvas.width = dstX + dstW;
    canvas.height = dstY + dstH;
    let context = getContext2D(canvas);
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
function cropAndResizeImageData(src, options = {}) {
    let { srcX = 0, srcY = 0, srcW = src.width, srcH = src.height, dstX = 0, dstY = 0 } = options;
    let { dstW = srcW, dstH = srcH } = options;
    let canvas1 = document.createElement('canvas');
    canvas1.width = srcW;
    canvas1.height = srcH;
    let context1 = getContext2D(canvas1);
    context1.putImageData(src, -srcX, -srcY);
    let canvas2 = document.createElement('canvas');
    canvas2.width = dstX + dstW;
    canvas2.height = dstY + dstH;
    let context2 = getContext2D(canvas2);
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
function getImageData(image, options = {}) {
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
function setImageDataToCanvas(imageData, canvas, options = {}) {
    let { srcX = 0, srcY = 0, srcW = imageData.width, srcH = imageData.height, dstX = 0, dstY = 0 } = options;
    let { dstW = srcW, dstH = srcH } = options;
    if (srcX !== 0 || srcY !== 0 || srcW !== dstW || srcH !== dstH) {
        imageData = cropAndResizeImageData(imageData, { srcX, srcY, srcW, srcH, dstW, dstH });
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
    return __awaiter(this, void 0, void 0, function* () {
        let image = document.createElement('img');
        return new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = url;
        })
            .then(() => image);
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
    return __awaiter(this, void 0, void 0, function* () {
        let files = input.files;
        if (!files || files.length == 0)
            throw new Error('No file is selected');
        let url = URL.createObjectURL(files[0]);
        return loadImageByUrl(url);
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
    return __awaiter(this, void 0, void 0, function* () {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        return new Promise((resolve) => {
            input.onchange = () => resolve(loadImageFromFileInput(input));
            input.click();
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
    return (arr instanceof Array) ? Array.prototype.concat.apply([], arr.map(arr => flatten$1(arr))) : arr;
}
/**
 * Get image array as `{Float32 or Int32}ArrayBufferView` from ImageData object.
 *
 * @see getImageArrayFromCanvas
 *
 * @param {ImageData} imageData Canvas ImageData object
 * @param [options] Options
 * @param [options.type=Float32Array] Data type of image array. Valid value is `Float32Array` or `Int32Array`.
 * @param {Color} [options.color=Color.RGB] Color order of image array
 * @param {Order} [options.order=Order.HWC] Data order of image array
 * @param {number[]} [options.bias=[0, 0, 0]] Bias value of image data (`ImageData = ImageArray + bias`). This value is
 * parsed based on `options.order`.
 * @returns {ArrayBufferView} buffer with specified type
 * @protected
 */
function getImageArrayFromImageData(imageData, options = {}) {
    let { type = Float32Array, color = Color.RGB, order = Order.HWC, bias = [0, 0, 0], scale = [1, 1, 1] } = options;
    const width = imageData.width;
    const height = imageData.height;
    let data = imageData.data;
    let array;
    let biasR, biasG, biasB;
    let scaleR, scaleG, scaleB;
    switch (color) {
        case Color.RGB:
            array = new type(width * height * 3);
            [scaleR, scaleG, scaleB] = scale;
            [biasR, biasG, biasB] = bias;
            switch (order) {
                case Order.HWC:
                    for (let h = 0; h < height; h++) {
                        for (let w = 0; w < width; w++) {
                            array[(h * width + w) * 3 + 0] = (data[(h * width + w) * 4 + 0] - biasR) / scaleR;
                            array[(h * width + w) * 3 + 1] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(h * width + w) * 3 + 2] = (data[(h * width + w) * 4 + 2] - biasB) / scaleB;
                        }
                    }
                    break;
                case Order.CHW:
                    for (let h = 0; h < height; h++) {
                        for (let w = 0; w < width; w++) {
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
            [biasB, biasG, biasR] = bias;
            [scaleB, scaleG, scaleR] = scale;
            switch (order) {
                case Order.HWC:
                    for (let h = 0; h < height; h++) {
                        for (let w = 0; w < width; w++) {
                            array[(h * width + w) * 3 + 0] = (data[(h * width + w) * 4 + 2] - biasR) / scaleR;
                            array[(h * width + w) * 3 + 1] = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                            array[(h * width + w) * 3 + 2] = (data[(h * width + w) * 4 + 0] - biasB) / scaleB;
                        }
                    }
                    break;
                case Order.CHW:
                    for (let h = 0; h < height; h++) {
                        for (let w = 0; w < width; w++) {
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
            [biasB, biasG, biasR] = bias;
            [scaleB, scaleG, scaleR] = scale;
            for (let h = 0; h < height; h++) {
                for (let w = 0; w < width; w++) {
                    let r = (data[(h * width + w) * 4 + 2] - biasR) / scaleR;
                    let g = (data[(h * width + w) * 4 + 1] - biasG) / scaleG;
                    let b = (data[(h * width + w) * 4 + 0] - biasB) / scaleB;
                    array[h * width + w] = 0.2126 * r + 0.7162 * g + 0.0722 * b;
                }
            }
            break;
        default:
            throw Error(`Unknown color format: ${color}`);
    }
    return array;
}
/**
 * Get image array from canvas element as `{Float32 or Int32}ArrayBufferView`.
 *
 * @example <caption>Get image data into Float32Array</caption>
 *
 * let array = getImageArrayFromCanvas(canvas);
 *
 * @example <caption>Get image data with rescaling to 224x224</caption>
 *
 * let array = getImageArrayFromCanvas(canvas, { dstW: 224, dstH: 224 });
 *
 * @example <caption>Get image data with considering mean image value normalization</caption>
 *
 * let array = getImageArrayFromCanvas(canvas, { bias: [MEAN_B, MEAN_G, MEAN_R], color: BGR });
 *
 * @param {HTMLCanvasElement} canvas Canvas
 * @param [options] Options
 * @param [options.type=Float32Array] Data type of image array. Valid value is `Float32Array` or `Int32Array`.
 * @param {Color} [options.color=Color.RGB] Color order of image array
 * @param {Order} [options.order=Order.HWC] Data order of image array
 * @param {number} [options.srcX=0] left position of input clipping rect
 * @param {number} [options.srcY=0] top position of input clipping rect
 * @param {number} [options.srcW=canvas.width] width of input clipping rect
 * @param {number} [options.srcH=canvas.height] height of input clipping rect
 * @param {number} [options.dstW=canvas.width] width of output
 * @param {number} [options.dstH=canvas.height] height of output
 * @param {number[]} [options.bias=[0, 0, 0]] Bias value of image data (`ImageData = ImageArray + bias`). This value is
 * parsed based on `options.order`.
 * @returns {ImageData} buffer with specified type
 * @protected
 */
function getImageArrayFromCanvas(canvas, options = {}) {
    let { type = Float32Array, color = Color.RGB, order = Order.HWC, srcX = 0, srcY = 0, srcW = canvas.width, srcH = canvas.height, dstX = 0, dstY = 0, bias = [0, 0, 0], scale = [1, 1, 1] } = options;
    let { dstW = srcW, dstH = srcH } = options;
    let imageData = getImageData(canvas, { srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH });
    return getImageArrayFromImageData(imageData, { type, color, order, bias, scale });
}
/**
 * Get image array from image element as `{Float32 or Int32}ArrayBufferView`.
 *
 * @example <caption>Get image data into Float32Array</caption>
 *
 * let array = getImageArrayFromCanvas(canvas);
 *
 * @example <caption>Get image data with rescaling to 224x224</caption>
 *
 * let array = getImageArrayFromCanvas(canvas, { dstW: 224, dstH: 224 });
 *
 * @example <caption>Get image data with considering mean image value normalization</caption>
 *
 * let array = getImageArrayFromCanvas(canvas, { bias: [MEAN_B, MEAN_G, MEAN_R], color: BGR });
 *
 * @param {HTMLImageElement|HTMLVideoElement} drawable Image
 * @param [options] Options
 * @param [options.type=Float32Array] Data type of image array. Valid value is `Float32Array` or `Int32Array`.
 * @param {Color} [options.color=Color.RGB] Color order of image array
 * @param {Order} [options.order=Order.HWC] Data order of image array
 * @param {number} [options.srcX=0] left position of input clipping rect
 * @param {number} [options.srcY=0] top position of input clipping rect
 * @param {number} [options.srcW=canvas.width] width of input clipping rect
 * @param {number} [options.srcH=canvas.height] height of input clipping rect
 * @param {number} [options.dstW=canvas.width] width of output
 * @param {number} [options.dstH=canvas.height] height of output
 * @param {number[]} [options.bias=[0, 0, 0]] Bias value of image data (`ImageData = ImageArray + bias`). This value is
 * parsed based on `options.order`.
 * @returns {ImageData} buffer with specified type
 * @protected
 */
function getImageArrayFromDrawable(drawable, options = {}) {
    let srcW, srcH;
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
    let { type = Float32Array, color = Color.RGB, order = Order.HWC, srcX = 0, srcY = 0, dstX = 0, dstY = 0, dstW = srcW, dstH = srcH, bias = [0, 0, 0], scale = [1, 1, 1] } = options;
    let canvas = document.createElement('canvas');
    canvas.width = dstX + dstW;
    canvas.height = dstY + dstH;
    let context = getContext2D(canvas);
    context.drawImage(drawable, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
    return getImageArrayFromCanvas(canvas, { type, color, order, bias, scale });
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
 *   - `x= y * scale + bias`
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
function getImageArray(image, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof image === 'string') {
            return getImageArrayFromDrawable(yield loadImageByUrl(image), options);
        }
        else if (image instanceof HTMLInputElement) {
            return getImageArrayFromDrawable(yield loadImageFromFileInput(image), options);
        }
        else if (image instanceof HTMLCanvasElement) {
            return getImageArrayFromCanvas(image, options);
        }
        else if (image instanceof HTMLImageElement || image instanceof HTMLVideoElement) {
            return getImageArrayFromDrawable(image, options);
            // FIXME: This feature is not supported for all web browsers.
            // } else if (image === null) {
            //     return getImageArrayFromDrawable(await loadImageByDialog(), options);
        }
        else
            throw TypeError('Failed to execute "getImageData(image, options)": "image" must be an instance of string,' +
                ' HTMLInputElement, HTMLCanvasElement, HTMLImageElement, or HTMLVideoElement object');
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
 */
function setImageArrayToCanvas(array, imageW, imageH, canvas, options = {}) {
    let { color = Color.RGB, order = Order.HWC, srcX = 0, srcY = 0, srcW = imageW, srcH = imageH, dstX = 0, dstY = 0, dstW = canvas.width, dstH = canvas.height, bias = [0, 0, 0], scale = [1, 1, 1] } = options;
    array = flatten$1(array);
    let data = new Uint8ClampedArray(srcW * srcH * 4);
    let biasR, biasG, biasB;
    let scaleR, scaleG, scaleB;
    switch (color) {
        case Color.RGB:
            [biasR, biasG, biasB] = bias;
            [scaleR, scaleG, scaleB] = scale;
            switch (order) {
                case Order.HWC:
                    for (let h = srcY; h < srcY + srcH; h++) {
                        for (let w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(h * imageW + w) * 3 + 0] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(h * imageW + w) * 3 + 1] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(h * imageW + w) * 3 + 2] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
                case Order.CHW:
                    for (let h = srcY; h < srcY + srcH; h++) {
                        for (let w = srcX; w < srcX + srcW; w++) {
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
            [biasB, biasG, biasR] = bias;
            [scaleB, scaleG, scaleR] = scale;
            switch (order) {
                case Order.HWC:
                    for (let h = srcY; h < srcY + srcH; h++) {
                        for (let w = srcX; w < srcX + srcW; w++) {
                            data[(h * imageW + w) * 4 + 0] = array[(h * imageW + w) * 3 + 2] * scaleR + biasR;
                            data[(h * imageW + w) * 4 + 1] = array[(h * imageW + w) * 3 + 1] * scaleG + biasG;
                            data[(h * imageW + w) * 4 + 2] = array[(h * imageW + w) * 3 + 0] * scaleB + biasB;
                            data[(h * imageW + w) * 4 + 3] = 255;
                        }
                    }
                    break;
                case Order.CHW:
                    for (let h = srcY; h < srcY + srcH; h++) {
                        for (let w = srcX; w < srcX + srcW; w++) {
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
            [biasR, biasG, biasB] = bias;
            [scaleR, scaleG, scaleB] = scale;
            for (let h = srcY; h < srcY + srcH; h++) {
                for (let w = srcX; w < srcX + srcW; w++) {
                    data[(h * imageW + w) * 4 + 0] =
                        data[(h * imageW + w) * 4 + 1] =
                            data[(h * imageW + w) * 4 + 2] = array[h * imageW + w] * scaleR + biasR;
                    data[(h * imageW + w) * 4 + 3] = 255;
                }
            }
            break;
    }
    setImageDataToCanvas(new ImageData(data, srcW, srcH), canvas, { srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH });
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
function argmax(arr, k = 1) {
    // Top-k Quicksort
    arr = arr.slice();
    let stack = [[0, arr.length]];
    let workspace = [];
    for (let i = 0; i < arr.length; i++)
        workspace[i] = i;
    while (stack.length > 0) {
        let [from, to] = stack.pop(), pivot = arr[to - 1], left = from, right = to - 2, tmp;
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
    let result = [];
    for (let i = 0; i < k; i++)
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
function argmin(arr, k = 1) {
    // Top-k Quicksort
    arr = arr.slice();
    let stack = [[0, arr.length]];
    let workspace = [];
    for (let i = 0; i < arr.length; i++)
        workspace[i] = i;
    while (stack.length > 0) {
        let [from, to] = stack.pop(), pivot = arr[to - 1], left = from, right = to - 2, tmp;
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
    let result = [];
    for (let i = 0; i < k; i++)
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
 * @module webdnn
 * @preferred
 *
 * Module `WebDNN` provides main features of WebDNN.
 */
/** Don't Remove This comment block */
/// <reference path="./webgpu.d.ts" />
/**
 * DEBUG flag for developing WebDNN
 * @private
 */
let DEBUG = false;
/**
 * get DEBUG flag for developing WebDNN
 * @private
 */
function isDebugMode() {
    return DEBUG;
}
/**
 * set DEBUG flag for developing WebDNN
 * @private
 */
function setDebugMode(flag) {
    DEBUG = flag;
}
/**
 * Backend constructor map
 * @private
 */
const descriptorRunners = {
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
    let status = {
        'webgpu': descriptorRunners['webgpu'].checkAvailability(),
        'webgl': descriptorRunners['webgl'].checkAvailability(),
        'webassembly': descriptorRunners['webassembly'].checkAvailability(),
        'fallback': descriptorRunners['fallback'].checkAvailability(),
    };
    let order = ['webgpu', 'webassembly', 'webgl', 'fallback'].filter(backend => status[backend]);
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!(backendName in descriptorRunners))
            throw new Error(`Unknown backend: "${backendName}"`);
        let runner;
        try {
            runner = new descriptorRunners[backendName](option);
            yield runner.init();
        }
        catch (ex) {
            console.warn(`Failed to initialize ${backendName} backend: ${ex}`);
            return null;
        }
        return runner;
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
function load(directory, initOption = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let backendOrder = initOption.backendOrder;
        if (!backendOrder) {
            backendOrder = getBackendAvailability().defaultOrder;
        }
        else if (typeof backendOrder === 'string') {
            backendOrder = [backendOrder];
        }
        backendOrder = backendOrder.slice();
        if (backendOrder.indexOf('fallback') === -1)
            backendOrder.concat(['fallback']);
        registerTransformUrlDelegate((url) => {
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
        let backendOptions = initOption.backendOptions || {};
        while (backendOrder.length > 0) {
            let backendName = backendOrder.shift();
            let runner = yield initBackend(backendName, backendOptions[backendName]);
            if (!runner)
                continue;
            runner.ignoreCache = Boolean(initOption.ignoreCache);
            try {
                yield runner.load(directory, initOption.progressCallback);
            }
            catch (ex) {
                console.warn(`Model loading failed for ${backendName} backend. Trying next backend: ${ex.message}`);
                continue;
            }
            return runner;
        }
        throw new Error('No backend is available');
    });
}

exports.isDebugMode = isDebugMode;
exports.setDebugMode = setDebugMode;
exports.getBackendAvailability = getBackendAvailability;
exports.load = load;
exports.DescriptorRunner = DescriptorRunner;
exports.Math = math;
exports.Image = image;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webdnn.js.map
