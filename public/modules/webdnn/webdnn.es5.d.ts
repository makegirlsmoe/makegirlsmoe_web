declare namespace WebDNN {
    /**
     * Graph Descriptor
     */
    interface GraphDescriptor {
        /**
         * input variables' name
         */
        inputs: string[];
        /**
         * output variables' name
         */
        outputs: string[];
        /**
         * memory position table
         */
        memory_layout: MemoryLayout;
        /**
         * Encoding algorithm of weight binary data.
         */
        weight_encoding: string;
        /**
         * Placeholder dict
         */
        placeholders: {
            [key: string]: number;
        };
    }
}
declare namespace WebDNN {
    type Placeholder = {
        eval: string;
    };
    /**
     * PlaceholderContext manages the placeholders
     */
    class PlaceholderContext {
        private values;
        constructor(values?: {
            [key: string]: number | null;
        });
        readonly isResolved: boolean;
        update(values: {
            [key: string]: number | null;
        }): void;
        resolve(placeholder: any): any;
        toString(): string;
    }
}
declare namespace WebDNN {
    interface Allocation {
        name: string;
        offset: number | Placeholder;
        size: number | Placeholder;
    }
    interface ResolvedAllocation extends Allocation {
        offset: number;
        size: number;
    }
    interface MemoryLayout {
        'static': {
            size: number;
            allocations: {
                [index: string]: ResolvedAllocation;
            };
        };
        dynamic: {
            size: number | Placeholder;
            allocations: {
                [index: string]: Allocation;
            };
        };
    }
}
declare namespace WebDNN {
    abstract class SymbolicArrayBufferView<T extends Float32Array | Int32Array> {
        protected ignoreOffsetOnActual: boolean;
        protected arrayBuffer?: ArrayBuffer;
        protected allocation: Allocation;
        protected placeholderContext?: PlaceholderContext;
        /**
         * Convert symbolic buffer view into actual buffer view.
         * If this buffer view is initialized based on placeholder offset or size and the placeholder is not resolved,
         * the error is thrown.
         */
        abstract toActual(): T;
        constructor(allocation: Allocation, placeholderContext?: PlaceholderContext, ignoreOffsetOnActual?: boolean);
        setArrayBuffer(arrayBuffer: any): void;
        readonly isDynamic: boolean;
        readonly offset: any;
        readonly length: any;
        /**
         * Sets a value or an array of values.
         * @param array A typed or untyped array of values to set.
         * @param offset The index in the current array at which the values are to be written.
         */
        set(array: ArrayLike<number>, offset?: number): void;
    }
    class SymbolicFloat32Array extends SymbolicArrayBufferView<Float32Array> {
        toActual(): Float32Array;
    }
    class SymbolicInt32Array extends SymbolicArrayBufferView<Int32Array> {
        toActual(): Int32Array;
    }
}
declare namespace WebDNN {
    /**
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
    abstract class DescriptorRunner<D extends GraphDescriptor> {
        readonly backendName: string;
        protected _running: boolean;
        descriptor: D | null;
        placeholderContext: PlaceholderContext | null;
        ignoreCache: boolean;
        /**
         * Initialize this runner
         */
        abstract init(): Promise<void>;
        /**
         * Fetch descriptor from specified directory.
         * @param directory directory where descriptor is contained.
         * You can also provide URL of other domain like this.
         *
         * ```javascript
         * await runner.load('://my.other.domain.com/my_model');
         * ```
         *
         * However sometimes it can't because of Cross-Origin-Resource-Security policy.
         *
         * @param progressCallback callback which is called to notice the loading is progressing.
         */
        abstract load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;
        /**
         * Set actual value into placeholders. If no placeholder is exist in graph descriptor, it's no need to call this function.
         */
        abstract setPlaceholderValue(values: {
            [key: string]: number;
        }): Promise<void>;
        /**
         * Get input ArrayBufferView object
         */
        abstract getInputViews(): SymbolicFloat32Array[];
        /**
         * Get output ArrayBufferView object
         */
        abstract getOutputViews(): SymbolicFloat32Array[];
        /**
         * Run descriptor. You must call [[getInputViews]] and [[getOutputViews]] before calling this function.
         */
        abstract run(): Promise<void>;
        /**
         * Get if model is running.
         * While running, calling run() again or modifying input is invalid.
         */
        readonly running: boolean;
    }
}
declare namespace WebDNN {
    /**
     * Abstract buffer interface. Read/write transactions are regarded as asynchronous operation.
     */
    abstract class Buffer {
        byteLength: number;
        backed: string;
        constructor(byteLength: number, backed: string);
        /**
         * Write contents into specified position.
         * @param src contents souce buffer.
         * @param dst_offset position where contents are written on
         */
        abstract write(src: ArrayBufferView, dst_offset?: number): Promise<void>;
        /**
         * Read contents from specified position.
         * @param dst buffer where contents are written on
         * @param src_offset position where contents are read from
         * @param length contents length
         */
        abstract read(dst: ArrayBufferView, src_offset?: number, length?: number): Promise<void>;
        /**
         * for a range which will be written from CPU iteratively, make view to avoid copy (if backend allows)
         * if backend does not allow such operation, return newly allocated memory and send their contents to GPU when syncWriteViews is called
         * @param offset position where buffer-view begin from
         * @param length buffer-view length
         * @param number_type data format such as Float32, UInt8, and so on.
         */
        abstract getWriteView(offset: number, length: number, number_type: any): ArrayBufferView;
        /**
         * for a range which will be read from CPU iteratively, make view to avoid copy (if backend allows)
         * if backend does not allow such operation, return newly allocated memory and fill their contents from GPU when syncReadViews is called
         * @param offset position where buffer-view begin from
         * @param length buffer-view length
         * @param number_type data format such as Float32, UInt8, and so on.
         */
        abstract getReadView(offset: number, length: number, number_type: any): ArrayBufferView;
        /**
         * Sync buffered data into memory.
         */
        abstract syncWriteViews(): Promise<void>;
        /**
         * Sync memory data into buffer view.
         */
        abstract syncReadViews(): Promise<void>;
    }
}
declare namespace WebDNN {
    class BufferWebGPU extends Buffer {
        private static webgpuHandler;
        buffer: WebGPUBuffer;
        bufferView: Uint8Array;
        constructor(byteLength: number);
        write(src: ArrayBufferView, dst_offset?: number): Promise<void>;
        read<T extends ArrayBufferView>(dst: T, src_offset?: number, length?: number): Promise<void>;
        static init(webgpuHandler: WebGPUHandler): void;
        getWriteView(offset: number, length: number, number_type: any): ArrayBufferView;
        getReadView(offset: number, length: number, number_type: any): ArrayBufferView;
        syncWriteViews(): Promise<void>;
        syncReadViews(): Promise<void>;
    }
}
declare namespace WebDNN {
    class WebGPUHandler {
        static isBrowserSupported: boolean;
        private context;
        private commandQueue;
        private pipelineStates;
        init(): Promise<void>;
        createBuffer(arrayBuffer: ArrayBufferView): WebGPUBuffer;
        loadKernel(librarySource: string, namespace?: string): void;
        createCommandBuffer(): WebGPUCommandBuffer;
        getPipelineStateByName(name: string): WebGPUComputePipelineState;
        executeSinglePipelineState(name: string, threadgroupsPerGrid: WebGPUSize, threadsPerThreadgroup: WebGPUSize, buffers: (WebGPUBuffer | BufferWebGPU)[], getCompletedPromise?: boolean): Promise<void> | null;
        sync(): Promise<void>;
    }
}
interface WebGPURenderingContext {
    createCommandQueue(): WebGPUCommandQueue;
    createBuffer(data: ArrayBufferView): WebGPUBuffer;
    createLibrary(sourceCode: string): WebGPULibrary;
    createComputePipelineState(function_: WebGPUFunction): WebGPUComputePipelineState;
}
interface WebGPUFunction {
}
interface WebGPULibrary {
    functionNames: string[];
    functionWithName(name: string): WebGPUFunction;
}
interface WebGPUBuffer {
    contents: any;
}
interface WebGPUSize {
    width: number;
    height: number;
    depth: number;
}
interface WebGPUCommandQueue {
    createCommandBuffer(): WebGPUCommandBuffer;
}
interface WebGPUCommandBuffer {
    createComputeCommandEncoder(): WebGPUComputeCommandEncoder;
    commit(): void;
    completed: Promise<void>;
}
interface WebGPUCommandEncoder {
    endEncoding(): void;
}
interface WebGPUComputeCommandEncoder extends WebGPUCommandEncoder {
    setComputePipelineState(state: WebGPUComputePipelineState): void;
    setBuffer(buffer: WebGPUBuffer, offset: number, index: number): void;
    dispatch(threadgroupsPerGrid: WebGPUSize, threadsPerThreadgroup: WebGPUSize): void;
}
interface WebGPUComputePipelineState {
}
interface HTMLCanvasElement {
    getContext(contextId: "webgpu"): WebGPURenderingContext | null;
}
declare namespace WebDNN {
    interface WeightDecoder {
        decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
    }
}
declare namespace WebDNN {
    class WeightDecoderRaw implements WeightDecoder {
        decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
    }
}
declare var Zlib: any;
declare namespace WebDNN {
    class WeightDecoderEightbit implements WeightDecoder {
        static decode_table: number[];
        decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
    }
}
declare namespace WebDNN {
    function get_weight_decoder(name: string): WeightDecoder;
}
declare namespace WebDNN {
    namespace util {
        /**
         *  Schedule function which is called too much frequently.
         */
        class DispatchScheduler {
            private scheduledCallbackId;
            private fn;
            /**
             * Register scheduled function. If already other function is scheduled, it is canceled and dispatcher will dispatch only
             * function which is registered at last.
             * @param fn scheduled function
             */
            request(fn: () => any): void;
            /**
             * Dispatch scheduled function just now. If no function is scheduled, dispatcher do nothing.
             */
            forceDispatch(): void;
            /**
             * Cancel scheduled function. If no function is scheduled, dispatcher do nothing.
             */
            cancel(): void;
        }
    }
}
declare let transformDelegate: (base: string) => string;
/**
 * Fetch delegate function.
 * Every fetch call in WebDNN is delegated to this function.
 * As default, `window.fetch` is set.
 * @type {(input:RequestInfo, init?:RequestInit)=>Promise<Response>}
 */
declare let fetchDelegate: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
declare namespace WebDNN {
    interface WebDNNRequestInit extends RequestInit {
        ignoreCache: boolean;
    }
    /**
     * Register delegate function for transform url
     * @param url url which will be transformed
     */
    function transformUrl(url: string): string;
    /**
     * Register delegate function for transform url
     * @param delegate delegate function
     */
    function registerTransformDelegate(delegate: (base: string) => string): void;
    /**
     * Register delegate function for fetch
     * @param delegate delegate function
     */
    function registerFetchDelegate(delegate: (input: RequestInfo, init?: RequestInit) => Promise<Response>): void;
    /**
     * Fetch function. WebDNN API use this fetch function instead of original fetch function.
     * @param input Requested url
     * @param init Additional information about fetch
     * @param init.ignoreCache If true, cache is ignored by appending '?t=(timestamp)' to the end of request url.
     * @returns Response
     */
    function fetch(input: RequestInfo, init?: WebDNNRequestInit): Promise<Response>;
    /**
     * Read `Response.body` stream as ArrayBuffer. This function provide progress information by callback.
     * @param res Response object
     * @param callback Callback function.
     * @returns ArrayBuffer
     */
    function readArrayBufferProgressively(res: Response, callback?: (loaded: number, total: number) => any): Promise<ArrayBuffer>;
}
declare namespace WebDNN {
    interface GraphDescriptorWebGPU extends GraphDescriptor {
        memory_layout: MemoryLayout;
        kernel_source: string;
        exec_infos: GraphDescriptorWebGPUExecInfos[];
    }
    interface GraphDescriptorWebGPUExecInfos {
        entry_func_name: string;
        threadgroups_per_grid: WebGPUSize;
        threads_per_thread_group: WebGPUSize;
        meta_buffer: number[];
        unresolved_value_list: {
            offset: number;
            placeholder: Placeholder;
        }[];
    }
}
declare const IS_IOS: boolean;
declare namespace WebDNN {
    class DescriptorRunnerWebGPU extends DescriptorRunner<GraphDescriptorWebGPU> {
        readonly backendName: string;
        private webgpuHandler;
        private shaderLanguage;
        private staticBuffer;
        private dynamicBuffer;
        private metaBuffers;
        private inputViews;
        private outputViews;
        private executionInfos;
        constructor(option?: any);
        init(): Promise<void>;
        private initializeBasicKernels();
        load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;
        private initializeStaticBuffer(weightRawArray);
        private initializeMetaBuffers();
        private initializeDynamicBuffer();
        private setDescriptor(descriptor);
        private compile();
        setPlaceholderValue(values: {
            [key: string]: number;
        }): Promise<void>;
        getInputViews(): SymbolicFloat32Array[];
        getOutputViews(): SymbolicFloat32Array[];
        run(): Promise<void>;
    }
}
declare namespace WebDNN {
    interface GraphDescriptorWebassembly extends GraphDescriptor {
        unresolved_value_lists: {
            offset: number;
            placeholder: Placeholder;
        }[][];
    }
}
declare let WebAssembly: any;
declare namespace WebDNN {
    class DescriptorRunnerWebassembly extends DescriptorRunner<GraphDescriptorWebassembly> {
        readonly backendName: string;
        private inputViews;
        private outputViews;
        private worker;
        private worker_entry_js_path;
        private worker_promise_reject_func;
        private worker_initial_error;
        constructor(option?: any);
        init(): Promise<void>;
        load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;
        setPlaceholderValue(values: {
            [key: string]: number;
        }): Promise<void>;
        private setPlaceholderValueWorker(dynamicBufferSize, metaBufferFillArray);
        private compile();
        private loadWeights(weightsData);
        getInputViews(): SymbolicFloat32Array[];
        getOutputViews(): SymbolicFloat32Array[];
        run(): Promise<void>;
    }
}
declare namespace WebDNN {
    interface GraphDescriptorFallback extends GraphDescriptor {
        memory_layout: MemoryLayout;
        kernel_source: string;
        exec_infos: GraphDescriptorFallbackExecInfo[];
    }
    interface GraphDescriptorFallbackExecInfo {
        entry_func_name: string;
        inputs: string[];
        outputs: string[];
        weights: string[];
        call_option: any;
    }
}
declare function wait(duration?: number): Promise<{}>;
declare namespace WebDNN {
    class DescriptorRunnerFallback extends DescriptorRunner<GraphDescriptorFallback> {
        readonly backendName: string;
        private kernelObj;
        private variableMap;
        private inputViews;
        private outputViews;
        private staticBuffer;
        private dynamicBuffer;
        constructor(option?: any);
        init(): Promise<void>;
        load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;
        private setDescriptor(descriptor);
        private compile();
        private initializeStaticBuffer(weightRawArray);
        private initializeDynamicBuffer();
        setPlaceholderValue(values: {
            [key: string]: number;
        }): Promise<void>;
        run(): Promise<void>;
        getInputViews(): SymbolicFloat32Array[];
        getOutputViews(): SymbolicFloat32Array[];
    }
}
declare namespace WebDNN {
    const backends: {
        'webgpu': typeof DescriptorRunnerWebGPU;
        'webassembly': typeof DescriptorRunnerWebassembly;
        'fallback': typeof DescriptorRunnerFallback;
    };
    let DEBUG: boolean;
    /**
     * Prepare backend interface and load model data at once. Internally calls init().
     * @param backendOrder The trying order of backend names to be initialized.
     * @param backendOptions Backend options.
     * @param progressCallback callback which is called to notice the loading is progressing.
     */
    interface InitOption {
        backendOrder?: string | string[];
        backendOptions?: {
            [key: string]: any;
        };
        ignoreCache?: boolean;
        progressCallback?: (loaded: number, total: number) => any;
    }
    /**
     * Prepare backend interface and load model data at once. Internally calls init().
     * @param directory URL of directory that contains graph descriptor files (e.g. graph_fallback.json)
     * @param initOption Initialize option
     * @return Interface to input/output data and run the model.
     */
    function load(directory: string, initOption?: InitOption): Promise<DescriptorRunner<GraphDescriptor>>;
}
declare namespace WebDNN {
    namespace Math {
        /**
         * Return indices of the top-K largest samples.
         * @param arr array
         * @param k number of indices
         * @returns {number[]} indices of top-K largest samples
         */
        function argmax(arr: number[], k?: number): number[];
        /**
         * Return indices of the top-K smallest samples.
         * @param arr array
         * @param k number of indices
         * @returns {number[]} indices of top-K smallest samples
         */
        function argmin(arr: number[], k?: number): number[];
    }
}
declare namespace WebDNN {
    /**
     * Check backend availability
     * @returns List of backend availability and default selected backend order
     */
    function getBackendAvailability(): {
        status: {
            [name: string]: boolean;
        };
        defaultOrder: string[];
    };
}
