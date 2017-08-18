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
declare module 'webdnn/placeholder' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	/**
	 * @protected
	 */
	export interface Placeholder {
	    eval: string;
	}
	/**
	 * PlaceholderContext manages the placeholders
	 * @protected
	 */
	export default class PlaceholderContext {
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
declare module 'webdnn/graph_descriptor/memory_layout' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { Placeholder } from 'webdnn/placeholder';
	/**
	 * @protected
	 */
	export interface Allocation {
	    name: string;
	    offset: number | Placeholder;
	    size: number | Placeholder;
	}
	/**
	 * @protected
	 */
	export interface ResolvedAllocation extends Allocation {
	    offset: number;
	    size: number;
	}
	/**
	 * @protected
	 */
	export interface MemoryLayout {
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
declare module 'webdnn/graph_descriptor/graph_descriptor' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	/**
	 * Graph Descriptor
	 * @protected
	 */
	export interface GraphDescriptor {
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
declare module 'webdnn/symbolic_typed_array/symbolic_typed_array' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { Allocation } from 'webdnn/graph_descriptor/memory_layout';
	import PlaceholderContext from 'webdnn/placeholder';
	/**
	 * SymbolicTypedArray is wrapper class of buffers used in DNN model.
	 */
	export abstract class SymbolicTypedArray<T extends Float32Array | Int32Array> {
	    protected ignoreOffsetOnActual: boolean;
	    protected arrayBuffer?: ArrayBuffer;
	    protected allocation: Allocation;
	    protected placeholderContext?: PlaceholderContext;
	    /**
	     * Convert symbolic buffer view into actual buffer view.
	     *
	     * @returns actual typed array
	     */
	    abstract toActual(): T;
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
	    constructor(allocation: Allocation, placeholderContext?: PlaceholderContext, ignoreOffsetOnActual?: boolean);
	    /**
	     * @protected
	     */
	    setArrayBuffer(arrayBuffer: any): void;
	    /**
	     * @protected
	     */
	    readonly isDynamic: boolean;
	    /**
	     * @protected
	     */
	    readonly offset: any;
	    /**
	     * The number of elements in this buffer. Actual byte size is `(length * SIZE_OF_FLOAT)`.
	     */
	    readonly length: number;
	    /**
	     * Sets a value or an array of values.
	     *
	     * @param array A typed or untyped array of values to set.
	     * @param offset The index at which the values will be written.
	     */
	    set(array: ArrayLike<number>, offset?: number): void;
	}

}
declare module 'webdnn/symbolic_typed_array/symbolic_float32array' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { SymbolicTypedArray } from 'webdnn/symbolic_typed_array/symbolic_typed_array';
	/**
	 * @protected
	 */
	export default class SymbolicFloat32Array extends SymbolicTypedArray<Float32Array> {
	    toActual(): Float32Array;
	}

}
declare module 'webdnn/descriptor_runner/descriptor_runner' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { GraphDescriptor } from 'webdnn/graph_descriptor/graph_descriptor';
	import PlaceholderContext from 'webdnn/placeholder';
	import SymbolicFloat32Array from 'webdnn/symbolic_typed_array/symbolic_float32array';
	import { BackendName } from 'webdnn/webdnn';
	/**
	 * @protected
	 */
	export interface DescriptorRunnerConstructor<D extends GraphDescriptor> {
	    new (option?: any): DescriptorRunner<D>;
	    checkAvailability(): boolean;
	}
	/**
	 * `DescriptorRunner` provides interface to execute DNN model and access input and output buffers.
	 */
	export abstract class DescriptorRunner<D extends GraphDescriptor> {
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
	    /**
	     * The name of active backend
	     */
	    readonly backendName: BackendName;
	    protected _running: boolean;
	    protected descriptor: D | null;
	    protected placeholderContext: PlaceholderContext | null;
	    /**
	     * @protected
	     */
	    ignoreCache: boolean;
	    /**
	     * Initialize this runner
	     *
	     * @protected
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
	     * @protected
	     */
	    abstract load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;
	    /**
	     * Set actual value into placeholders. If no placeholder is exist in graph descriptor, it's no need to call this function.
	     *
	     * @param values dictionary object of placeholder name and value pair
	     * @protected
	     */
	    abstract setPlaceholderValue(values: {
	        [key: string]: number;
	    }): Promise<void>;
	    /**
	     * Get input [[webdnn.SymbolicFloat32Array|`SymbolicFloat32Array`]] object
	     *
	     * @returns array of input [[webdnn.SymbolicFloat32Array|`SymbolicFloat32Array`]]
	     */
	    abstract getInputViews(): SymbolicFloat32Array[];
	    /**
	     * Get output [[webdnn.SymbolicFloat32Array|`SymbolicFloat32Array`]] object
	     *
	     * @returns array of output [[webdnn.SymbolicFloat32Array|`SymbolicFloat32Array`]]
	     */
	    abstract getOutputViews(): SymbolicFloat32Array[];
	    /**
	     * Run descriptor. You must call [[webdnn.DescriptorRunner.getInputViews|`getInputViews`]] and
	     * [[webdnn.DescriptorRunner.getOutputViews|`getOutputViews`]] before calling this function.
	     */
	    abstract run(): Promise<void>;
	    /**
	     * Return `true` if model is running.
	     * While running, calling run() again or modifying input is invalid.
	     */
	    readonly running: boolean;
	}

}
declare module 'webdnn/decoder/weight_decoder' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	/**
	 * @protected
	 */
	interface WeightDecoder {
	    decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
	}
	export default WeightDecoder;

}
declare module 'webdnn/decoder/weight_decoder_eightbit' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	import WeightDecoder from 'webdnn/decoder/weight_decoder';
	/**
	 * @protected
	 */
	export default class WeightDecoderEightbit implements WeightDecoder {
	    static decode_table: number[];
	    decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
	}

}
declare module 'webdnn/decoder/weight_decoder_raw' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	import WeightDecoder from 'webdnn/decoder/weight_decoder';
	/**
	 * @protected
	 */
	export default class WeightDecoderRaw implements WeightDecoder {
	    decode(data: Uint8Array, memory_layout: MemoryLayout): Promise<Float32Array>;
	}

}
declare module 'webdnn/decoder/get_weight_decoder' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import WeightDecoder from 'webdnn/decoder/weight_decoder';
	/**
	 * @protected
	 */
	export default function get_weight_decoder(name: string): WeightDecoder;

}
declare module 'webdnn/util/dispatch_scheduler' {
	/**
	 * Schedule function which is called too much frequently.
	 *
	 * @private
	 */
	export default class DispatchScheduler {
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
declare module 'webdnn/fetch' {
	/**
	 * @protected
	 */
	export interface WebDNNRequestInit extends RequestInit {
	    ignoreCache: boolean;
	}
	/**
	 * Transform url generated based on current active backend
	 * @param url transformed url
	 * @protected
	 */
	export function transformUrl(url: string): string;
	/**
	 * Register delegate function for transform url.
	 *
	 * Registered delegate function is called before WebDNN fetch any data (descriptor json file, and binary data).
	 * You can modified url to fetch data from other domain, for example.
	 *
	 * ### Examples
	 *
	 * Fetch binary data from other domain
	 *
	 * ```js
	 * // Register delegate function before loading
	 * WebDNN.registerTransformUrlDelegate((url) => {
	 *     if ((/\.bin/).test(url)) {
	 *         url = url.replace('original.host.com', 'custom.host.com');
	 *     }
	 *     return url;
	 * })
	 *
	 * // Graph descriptor JSON file will be loaded from 'original.host.com/model', and
	 * // model binary data will be loaded from 'custom.host.com/model'.
	 * WebDNN.load('https://original.host.com/model');
	 * ```
	 *
	 * @param delegate Delegate function which will be called with original url, and must return converted url strings.
	 */
	export function registerTransformUrlDelegate(delegate: (base: string) => string): void;
	/**
	 * Fetch function. WebDNN API use this function instead of original `fetch` function.
	 * FIXME
	 * @param input Requested url
	 * @param init Additional information about webdnnFetch
	 * @param init.ignoreCache If true, cache is ignored by appending '?t=(timestamp)' to the end of request url.
	 * @returns Response
	 * @protected
	 */
	export default function webdnnFetch(input: RequestInfo, init?: WebDNNRequestInit): Promise<Response>;
	/**
	 * Read `Response.body` stream as ArrayBuffer. This function provide progress information by callback.
	 * @param res Response object
	 * @param callback Callback function.
	 * @returns ArrayBuffer
	 * @protected
	 */
	export function readArrayBufferProgressively(res: Response, callback?: (loaded: number, total: number) => any): Promise<ArrayBuffer>;

}
declare module 'webdnn/graph_descriptor/graph_descriptor_fallback' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	import { GraphDescriptor } from 'webdnn/graph_descriptor/graph_descriptor';
	/**
	 * @protected
	 */
	export interface GraphDescriptorFallback extends GraphDescriptor {
	    memory_layout: MemoryLayout;
	    kernel_source: string;
	    exec_infos: GraphDescriptorFallbackExecInfo[];
	}
	/**
	 * @protected
	 */
	export interface GraphDescriptorFallbackExecInfo {
	    entry_func_name: string;
	    inputs: string[];
	    outputs: string[];
	    weights: string[];
	    call_option: any;
	}

}
declare module 'webdnn/descriptor_runner/descriptor_runner_fallback' {
	import { GraphDescriptorFallback } from 'webdnn/graph_descriptor/graph_descriptor_fallback';
	import SymbolicFloat32Array from 'webdnn/symbolic_typed_array/symbolic_float32array';
	import { DescriptorRunner } from 'webdnn/descriptor_runner/descriptor_runner';
	/**
	 * @protected
	 */
	export default class DescriptorRunnerFallback extends DescriptorRunner<GraphDescriptorFallback> {
	    readonly backendName: string;
	    private kernelObj;
	    private variableMap;
	    private inputViews;
	    private outputViews;
	    private staticBuffer;
	    private dynamicBuffer;
	    static checkAvailability(): boolean;
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
declare module 'webdnn/graph_descriptor/graph_descriptor_webassembly' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { Placeholder } from 'webdnn/placeholder';
	import { GraphDescriptor } from 'webdnn/graph_descriptor/graph_descriptor';
	/**
	 * @protected
	 */
	export interface GraphDescriptorWebassembly extends GraphDescriptor {
	    unresolved_value_lists: {
	        offset: number;
	        placeholder: Placeholder;
	    }[][];
	}

}
declare module 'webdnn/descriptor_runner/descriptor_runner_webassembly' {
	import { GraphDescriptorWebassembly } from 'webdnn/graph_descriptor/graph_descriptor_webassembly';
	import SymbolicFloat32Array from 'webdnn/symbolic_typed_array/symbolic_float32array';
	import { DescriptorRunner } from 'webdnn/descriptor_runner/descriptor_runner';
	/**
	 * @protected
	 */
	export default class DescriptorRunnerWebassembly extends DescriptorRunner<GraphDescriptorWebassembly> {
	    readonly backendName: string;
	    private inputViews;
	    private outputViews;
	    private worker;
	    private worker_entry_js_path;
	    private worker_promise_reject_func;
	    private worker_initial_error;
	    static checkAvailability(): boolean;
	    constructor();
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
declare module 'webdnn/webgpu_handler' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import BufferWebGPU from 'webdnn/buffer/buffer_webgpu';
	/**
	 * @protected
	 */
	export default class WebGPUHandler {
	    private context;
	    private commandQueue;
	    private pipelineStates;
	    constructor();
	    createBuffer(arrayBuffer: ArrayBufferView): WebGPUBuffer;
	    loadKernel(librarySource: string, namespace?: string): void;
	    createCommandBuffer(): WebGPUCommandBuffer;
	    getPipelineStateByName(name: string): WebGPUComputePipelineState;
	    executeSinglePipelineState(name: string, threadgroupsPerGrid: WebGPUSize, threadsPerThreadgroup: WebGPUSize, buffers: (WebGPUBuffer | BufferWebGPU)[], getCompletedPromise?: boolean): Promise<void> | null;
	    sync(): Promise<void>;
	}
	/**
	 * Flag whether WebGPU is supported or not
	 * @protected
	 */
	export const IS_WEBGPU_SUPPORTED: boolean;

}
declare module 'webdnn/buffer/buffer' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	/**
	 * Abstract buffer interface. Read/write transactions are regarded as asynchronous operation.
	 *
	 * @protected
	 */
	export abstract class Buffer {
	    /**
	     * @property {number}
	     */
	    byteLength: number;
	    backed: string;
	    constructor(byteLength: number, backed: string);
	    /**
	     * Write contents onto specified position.
	     *
	     * @param {ArrayBufferView} src contents source buffer
	     * @param {number} offset position where contents are written on
	     */
	    abstract write(src: ArrayBufferView, offset?: number): Promise<void>;
	    /**
	     * Read contents from specified position.
	     *
	     * @param {Float32ArrayConstructor | Int32ArrayConstructor} dst buffer where contents are written on
	     * @param {number} offset position where contents are read from
	     * @param {length} length contents length
	     */
	    abstract read(dst: Float32ArrayConstructor | Int32ArrayConstructor, offset?: number, length?: number): Promise<void>;
	    /**
	     * for a range which will be written from CPU iteratively, make view to avoid copy (if backend allows)
	     * if backend does not allow such operation, return newly allocated memory and send their contents to GPU when syncWriteViews is called
	     *
	     * @param {number} offset position where buffer-view begin from
	     * @param {number} length buffer-view length
	     * @param {Int32ArrayConstructor|Float32ArrayConstructor} type data format such as Float32Array, Int32Array, and so on.
	     */
	    abstract getWriteView(offset: number, length: number, type: Int32ArrayConstructor): Int32Array;
	    abstract getWriteView(offset: number, length: number, type: Float32ArrayConstructor): Uint32Array;
	    /**
	     * for a range which will be read from CPU iteratively, make view to avoid copy (if backend allows)
	     * if backend does not allow such operation, return newly allocated memory and fill their contents from GPU when syncReadViews is called
	     *
	     * @param {number} offset position where buffer-view begin from
	     * @param {number} length buffer-view length
	     * @param {Int32ArrayConstructor|Float32ArrayConstructor} type data format such as Float32Array, Int32Array, and so on.
	     */
	    abstract getReadView(offset: number, length: number, type: Int32ArrayConstructor): Int32Array;
	    abstract getReadView(offset: number, length: number, type: Float32ArrayConstructor): Float32Array;
	    /**
	     * Sync buffered data into memory.
	     *
	     * @see Buffer#getWriteView
	     */
	    abstract syncWriteViews(): Promise<void>;
	    /**
	     * Sync memory data into buffer view.
	     *
	     * @see Buffer#getReadView
	     */
	    abstract syncReadViews(): Promise<void>;
	}

}
declare module 'webdnn/buffer/buffer_webgpu' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import WebGPUHandler from 'webdnn/webgpu_handler';
	import { Buffer } from 'webdnn/buffer/buffer';
	/**
	 * @protected
	 */
	export default class BufferWebGPU extends Buffer {
	    private static webgpuHandler;
	    buffer: WebGPUBuffer;
	    bufferView: Uint8Array;
	    constructor(byteLength: number);
	    write(src: ArrayBufferView, dst_offset?: number): Promise<void>;
	    read(dst: any, src_offset?: number, length?: number): Promise<void>;
	    static init(webgpuHandler: WebGPUHandler): void;
	    getWriteView(offset: number, length: number, type: Int32ArrayConstructor): Int32Array;
	    getWriteView(offset: number, length: number, type: Float32ArrayConstructor): Uint32Array;
	    getReadView(offset: number, length: number, type: Int32ArrayConstructor): Int32Array;
	    getReadView(offset: number, length: number, type: Float32ArrayConstructor): Float32Array;
	    syncWriteViews(): Promise<void>;
	    syncReadViews(): Promise<void>;
	}

}
declare module 'webdnn/graph_descriptor/graph_descriptor_webgpu' {
	/**
	 * @module webdnn
	 */
	/** Don't Remove This comment block */
	import { MemoryLayout } from 'webdnn/graph_descriptor/memory_layout';
	import { Placeholder } from 'webdnn/placeholder';
	import { GraphDescriptor } from 'webdnn/graph_descriptor/graph_descriptor';
	/**
	 * @protected
	 */
	export interface GraphDescriptorWebGPU extends GraphDescriptor {
	    memory_layout: MemoryLayout;
	    kernel_source: string;
	    exec_infos: GraphDescriptorWebGPUExecInfos[];
	}
	/**
	 * @protected
	 */
	export interface GraphDescriptorWebGPUExecInfos {
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
declare module 'webdnn/descriptor_runner/descriptor_runner_webgpu' {
	import { GraphDescriptorWebGPU } from 'webdnn/graph_descriptor/graph_descriptor_webgpu';
	import SymbolicFloat32Array from 'webdnn/symbolic_typed_array/symbolic_float32array';
	import { DescriptorRunner } from 'webdnn/descriptor_runner/descriptor_runner';
	/**
	 * @protected
	 */
	export default class DescriptorRunnerWebGPU extends DescriptorRunner<GraphDescriptorWebGPU> {
	    readonly backendName: string;
	    private webgpuHandler;
	    private shaderLanguage;
	    private staticBuffer;
	    private dynamicBuffer;
	    private metaBuffers;
	    private inputViews;
	    private outputViews;
	    private executionInfos;
	    static checkAvailability(): boolean;
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
declare module 'webdnn/image/enums' {
	/**
	 * @module webdnn/image
	 */
	/** Don't Remove This comment block */
	/**
	 * The data order
	 */
	export enum Order {
	    /** `[Channel, Height, Width]` format */
	    CHW = 0,
	    /** `[Height, Width, Channel]` format */
	    HWC = 1,
	}
	/**
	 * The color format
	 */
	export enum Color {
	    /** RGB format */
	    RGB = 0,
	    /** BGR format */
	    BGR = 1,
	}

}
declare module 'webdnn/image/canvas' {
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
	export function getContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D;

}
declare module 'webdnn/image/image_data' {
	/**
	 * The rectangle of source position of image
	 */
	export interface SourceRect {
	    srcX?: number;
	    srcY?: number;
	    srcW?: number;
	    srcH?: number;
	}
	/**
	 * The rectangle of destination position of image
	 */
	export interface DestinationRect {
	    dstX?: number;
	    dstY?: number;
	    dstW?: number;
	    dstH?: number;
	}
	/**
	 * @protected
	 */
	export function getImageDataFromCanvas(canvas: HTMLCanvasElement, options?: SourceRect & DestinationRect): ImageData;
	/**
	 * @protected
	 */
	export function getImageDataFromDrawable(drawable: HTMLVideoElement | HTMLImageElement, options?: SourceRect & DestinationRect): ImageData;
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
	export function getImageData(image: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement, options?: SourceRect & DestinationRect): ImageData;
	/**
	 * @protected
	 */
	export function setImageDataToCanvas(imageData: ImageData, canvas: HTMLCanvasElement, options?: SourceRect & DestinationRect): void;

}
declare module 'webdnn/image/image_source' {
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
	export function loadImageByUrl(url: string): Promise<HTMLImageElement>;
	/**
	 * Load image file selected in `<input type="file">` element.
	 *
	 * @param {HTMLInputElement} input the `<input type="file">` element
	 * @returns {Promise<HTMLImageElement>} image element
	 */
	export function loadImageFromFileInput(input: HTMLInputElement): Promise<HTMLImageElement>;
	/**
	 * Load image selected in file picker dialog
	 *
	 * Currently, web specification not supported the case if the dialog is canceled and no file is selected. In this case,
	 * the returned promise will never be resolved.
	 *
	 * @returns {Promise<HTMLImageElement>} image element
	 * @protected
	 */
	export function loadImageByDialog(): Promise<HTMLImageElement>;

}
declare module 'webdnn/image/image_array' {
	import { Color, Order } from 'webdnn/image/enums';
	import { DestinationRect, SourceRect } from 'webdnn/image/image_data';
	/**
	 * Option structure of [[webdnn/image.getImageArray|`WebDNN.Image.getImageArray`]]
	 */
	export interface ImageArrayOption {
	    /** Type of packed array */
	    type?: {
	        new (length: number): (Float32Array | Int32Array);
	    };
	    /** The color format */
	    color?: Color;
	    /** The data order */
	    order?: Order;
	    /** Bias value, which is parsed based on [[webdnn/image.ImageArrayOption.order|`order`]] value */
	    bias?: number[];
	    /** Scale value, which is parsed based on [[webdnn/image.ImageArrayOption.order|`order`]] value */
	    scale?: number[];
	}
	/**
	 * Types which are drawable at `HTMLCanvasElement`
	 */
	export type Drawable = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageData;
	/**
	 * All type of image source which `WebDNN.Image` can be handled. For `string`, only the url of image resource is valid.
	 */
	export type ImageSource = string | HTMLInputElement | Drawable;
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
	export function getImageArrayFromImageData(imageData: ImageData, options?: SourceRect & DestinationRect & ImageArrayOption): Float32Array | Int32Array;
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
	export function getImageArrayFromCanvas(canvas: HTMLCanvasElement, options?: SourceRect & DestinationRect & ImageArrayOption): Float32Array | Int32Array;
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
	export function getImageArrayFromDrawable(drawable: Drawable, options?: SourceRect & DestinationRect & ImageArrayOption): Float32Array | Int32Array;
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
	export function getImageArray(image: ImageSource, options?: SourceRect & DestinationRect & ImageArrayOption): Promise<Float32Array | Int32Array>;
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
	export function setImageArrayToCanvas(array: Float32Array | Int32Array, imageW: number, imageH: number, canvas: HTMLCanvasElement, options?: SourceRect & DestinationRect & ImageArrayOption): void;

}
declare module 'webdnn/image' {
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
	export * from 'webdnn/image/enums';
	export * from 'webdnn/image/image_array';
	export * from 'webdnn/image/image_source';

}
declare module 'webdnn/math/argsort' {
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
	export function argmax(arr: number[] | Float32Array | Int32Array, k?: number): number[];
	/**
	 * Return indices of the top-K smallest elements.
	 * This implementation is not stable sort.
	 *
	 * @param {number[]|Float32Array|Int32Array} arr array
	 * @param {number} k number of indices
	 * @returns {number[]} indices of top-K smallest samples
	 */
	export function argmin(arr: number[] | Float32Array | Int32Array, k?: number): number[];

}
declare module 'webdnn/math' {
	/**
	 * @module webdnn/math
	 * @preferred
	 *
	 * Module `WebDNN.Math` provides basic mathematics operations for pre/post-processing.
	 */
	/** Don't Remove This comment block */
	export * from 'webdnn/math/argsort';

}
declare module 'webdnn/webdnn' {
	/// <reference path="webgpu.d.ts" />
	/**
	 * @module webdnn
	 * @preferred
	 *
	 * Module `WebDNN` provides main features of WebDNN.
	 */
	/** Don't Remove This comment block */
	import { DescriptorRunner } from 'webdnn/descriptor_runner/descriptor_runner';
	import { GraphDescriptor } from 'webdnn/graph_descriptor/graph_descriptor';
	import * as Image from 'webdnn/image';
	import * as Math from 'webdnn/math';
	/**
	 * DEBUG flag for developing WebDNN
	 * @private
	 */
	export let DEBUG: boolean;
	/**
	 * Backend names supported in WebDNN
	 */
	export type BackendName = 'webgpu' | 'webassembly' | 'fallback';
	/**
	 * Result structure of [[getBackendAvailability|`WebDNN.getBackendAvailability`]]
	 */
	export interface BackendAvailability {
	    /**
	     * Whether each backend is available or not.
	     *
	     * ### Example
	     *
	     * ```ts
	     * WebDNN.getBackendAvailability().status
	     * >>> {
	     *   'webgpu': false,
	     *   'webassembly': true,
	     *   'fallback': true
	     * }
	     * ```
	     */
	    status: {
	        [name in BackendName]: boolean;
	    };
	    /**
	     * Default backend order WebDNN try to use
	     *
	     * ### Examples
	     *
	     * ```ts
	     * WebDNN.getBackendAvailability().defaultOrder
	     * >>> ['webassembly', 'fallback']
	     * ```
	     */
	    defaultOrder: BackendName[];
	}
	/**
	 * Check each computing backend is available or not in this browser.
	 * The result will be returned as [[BackendAvailability|`BackendAvailability`]] structure.
	 *
	 * @returns backend availability
	 */
	export function getBackendAvailability(): BackendAvailability;
	/**
	 * Option structure of [[load|`WebDNN.load`]]
	 */
	export interface InitOption {
	    /**
	     * The order of backend names to be initialized.
	     */
	    backendOrder?: BackendName | (BackendName[]);
	    /**
	     * Backend-specific options. Currently (v1.3), this option has no effect.
	     */
	    backendOptions?: {
	        [key: string]: any;
	    };
	    /**
	     * If true, WebDNN fetches binary data even if the data is already cached (append tiestamp to request url).
	     * Otherwise, WebDNN fetches same URL and generally browser cache is used.
	     */
	    ignoreCache?: boolean;
	    /**
	     * Callback function which is called to notice the progress status of loading binary data.
	     *
	     * Currently Streaming fetch feature is not perfectly supported in browsers. Therefore, this option will be
	     * ignored in some web browsers.
	     *
	     * ### Examples
	     *
	     * ```js
	     * let runner = await WebDNN.load('./model', {
	     *     progressCallback: (loaded, total) => console.log(`${ (loaded/total*100).toFixed(1) }% Loaded`);
	     * });
	     * ```
	     */
	    progressCallback?: (loaded: number, total: number) => any;
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
	export function load(directory: string, initOption?: InitOption): Promise<DescriptorRunner<GraphDescriptor>>;
	export { Math, Image };

}
declare module 'webdnn' {
	export * from 'webdnn/webdnn';
}
