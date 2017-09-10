
#include <metal_stdlib>
using namespace metal;

#define OPTIMIZE 1

kernel void sgemm_81e90e8b08464e9a44e7910ad875fd886afeba4c8b6adf24eec65a4b(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint index[[thread_index_in_threadgroup]],
                          uint2 group_position[[threadgroup_position_in_grid]])
{
#define TRANSPOSE_A 1
#define TRANSPOSE_B 1
#define M_DIVIDABLE_BY_64 0
#define N_DIVIDABLE_BY_64 1
#define K_DIVIDABLE_BY_8 0

#if TRANSPOSE_A
    #define A_STRIDE_K 1
    #define A_STRIDE_M K
#else
    #define A_STRIDE_K M
    #define A_STRIDE_M 1
#endif

#if TRANSPOSE_B
    #define B_STRIDE_K N
    #define B_STRIDE_N 1
#else
    #define B_STRIDE_K 1
    #define B_STRIDE_N K
#endif

#if K_DIVIDABLE_BY_8 && M_DIVIDABLE_BY_64  && N_DIVIDABLE_BY_64 && !TRANSPOSE_A && TRANSPOSE_B && OPTIMIZE
    const device float4 *load_target4 = (index & 32) 
        ? (const device float4 *)((static_buffer + meta_buffer[1])) 
        : (const device float4 *)((static_buffer + meta_buffer[0]));
#else
    const device float *load_target = (index & 32) 
        ? ((static_buffer + meta_buffer[1])) 
        : ((static_buffer + meta_buffer[0]));
#endif

    const int M = meta_buffer[3];
    const int N = meta_buffer[4];

    const int K = meta_buffer[5];

    threadgroup float4 shared4[32 * 8 * 2];

    const int stride_k = (index & 32) ? B_STRIDE_K : A_STRIDE_K;
    const int stride_mn = (index & 32) ? B_STRIDE_N : A_STRIDE_M;

    const int m_offset = index & 7;
    const int n_offset = index >> 3;

    const int mn_load_offset = ((index & 32) ? group_position.y : group_position.x) * 64 + (index & 15) * 4;
    const int k_load_offset = ((index & 16) ? 1 : 0);

    int track0 = mn_load_offset * stride_mn + (k_load_offset + 0) * stride_k;
    int track2 = track0 + 2 * stride_k;
    int track4 = track0 + 4 * stride_k;
    int track6 = track0 + 6 * stride_k;

#if !OPTIMIZE || !M_DIVIDABLE_BY_64 || !N_DIVIDABLE_BY_64
    const int max_MN = (index & 32) ? N : M;
#endif

    int shared_offset4 = ((index & 32) ? 16 : 0) + k_load_offset * 32 + (index & 15);
    int read_A_offset4 = m_offset * 2;
    int read_B_offset4 = n_offset * 2 + 16;

    float4 result[16] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    int k = 0;

    while (k < K)
    {
        {
#if OPTIMIZE && K_DIVIDABLE_BY_8
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
        #if OPTIMIZE && !TRANSPOSE_A && TRANSPOSE_B
            shared4[shared_offset4 + 32 * 0] = load_target4[track0 >> 2];
            shared4[shared_offset4 + 32 * 2] = load_target4[track2 >> 2];
            shared4[shared_offset4 + 32 * 4] = load_target4[track4 >> 2];
            shared4[shared_offset4 + 32 * 6] = load_target4[track6 >> 2];
        #else
            shared4[shared_offset4 + 32 * 0] = float4(
                load_target[track0 + stride_mn * 0],
                load_target[track0 + stride_mn * 1],
                load_target[track0 + stride_mn * 2],
                load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                load_target[track2 + stride_mn * 0],
                load_target[track2 + stride_mn * 1],
                load_target[track2 + stride_mn * 2],
                load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                load_target[track4 + stride_mn * 0],
                load_target[track4 + stride_mn * 1],
                load_target[track4 + stride_mn * 2],
                load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                load_target[track6 + stride_mn * 0],
                load_target[track6 + stride_mn * 1],
                load_target[track6 + stride_mn * 2],
                load_target[track6 + stride_mn * 3]
            ); 
        #endif
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
    #endif

            k += 8;
#else
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #endif
#endif
        }

        threadgroup_barrier(mem_flags::mem_threadgroup);

        {
            for (int k_sub = 0; k_sub < 8; k_sub++)
            {
                float4 a00 = shared4[32 * k_sub + read_A_offset4 + 0];
                float4 a01 = shared4[32 * k_sub + read_A_offset4 + 1];
                float4 b00 = shared4[32 * k_sub + read_B_offset4 + 0];
                float4 b01 = shared4[32 * k_sub + read_B_offset4 + 1];

                result[4][0]  += b00[0] * a00[2];
                result[4][1]  += b00[1] * a00[2];
                result[0][1]  += b00[1] * a00[0];
                result[0][0]  += b00[0] * a00[0];
                result[6][0]  += b00[0] * a00[3];
                result[6][1]  += b00[1] * a00[3];
                result[2][1]  += b00[1] * a00[1];
                result[2][0]  += b00[0] * a00[1];
                result[12][0] += b00[0] * a01[2];
                result[12][1] += b00[1] * a01[2];
                result[8][1]  += b00[1] * a01[0];
                result[8][0]  += b00[0] * a01[0];
                result[14][0] += b00[0] * a01[3];
                result[14][1] += b00[1] * a01[3];
                result[10][1] += b00[1] * a01[1];
                result[10][0] += b00[0] * a01[1];

                result[14][2] += b00[2] * a01[3];
                result[14][3] += b00[3] * a01[3];
                result[10][3] += b00[3] * a01[1];
                result[10][2] += b00[2] * a01[1];
                result[12][2] += b00[2] * a01[2];
                result[12][3] += b00[3] * a01[2];
                result[8][3]  += b00[3] * a01[0];
                result[8][2]  += b00[2] * a01[0];
                result[6][2]  += b00[2] * a00[3];
                result[6][3]  += b00[3] * a00[3];
                result[2][3]  += b00[3] * a00[1];
                result[2][2]  += b00[2] * a00[1];
                result[4][2]  += b00[2] * a00[2];
                result[4][3]  += b00[3] * a00[2];
                result[0][3]  += b00[3] * a00[0];
                result[0][2]  += b00[2] * a00[0];

                result[5][0]  += b01[0] * a00[2];
                result[5][1]  += b01[1] * a00[2];
                result[1][1]  += b01[1] * a00[0];
                result[1][0]  += b01[0] * a00[0];
                result[7][0]  += b01[0] * a00[3];
                result[7][1]  += b01[1] * a00[3];
                result[3][1]  += b01[1] * a00[1];
                result[3][0]  += b01[0] * a00[1];
                result[13][0] += b01[0] * a01[2];
                result[13][1] += b01[1] * a01[2];
                result[9][1]  += b01[1] * a01[0];
                result[9][0]  += b01[0] * a01[0];
                result[15][0] += b01[0] * a01[3];
                result[15][1] += b01[1] * a01[3];
                result[11][1] += b01[1] * a01[1];
                result[11][0] += b01[0] * a01[1];

                result[15][2] += b01[2] * a01[3];
                result[15][3] += b01[3] * a01[3];
                result[11][3] += b01[3] * a01[1];
                result[11][2] += b01[2] * a01[1];
                result[13][2] += b01[2] * a01[2];
                result[13][3] += b01[3] * a01[2];
                result[9][3]  += b01[3] * a01[0];
                result[9][2]  += b01[2] * a01[0];
                result[7][2]  += b01[2] * a00[3];
                result[7][3]  += b01[3] * a00[3];
                result[3][3]  += b01[3] * a00[1];
                result[3][2]  += b01[2] * a00[1];
                result[5][2]  += b01[2] * a00[2];
                result[5][3]  += b01[3] * a00[2];
                result[1][3]  += b01[3] * a00[0];
                result[1][2]  += b01[2] * a00[0];
            }
        }

        shared_offset4 ^= 32 * 8;
        read_A_offset4 ^= 32 * 8;
        read_B_offset4 ^= 32 * 8;
        track0 += stride_k * 8;
        track2 += stride_k * 8;
        track4 += stride_k * 8;
        track6 += stride_k * 8;
    }

    {
    
#if OPTIMIZE && N_DIVIDABLE_BY_64
        device float4 *C4 = (device float4 *)((static_buffer + meta_buffer[2]));
        const int N4 = N >> 2;
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {

    #if !M_DIVIDABLE_BY_64
            if (m >= M) continue;
    #endif

            const int n = group_position.y * 16 + n_offset * 2;
            float4 result0 = result[m_sub * 2 + 0];
            float4 result1 = result[m_sub * 2 + 1];

            C4[m * N4 + n + 0] = result0;
            C4[m * N4 + n + 1] = result1;
            
            m++;
        }
#else
        device float *C = (static_buffer + meta_buffer[2]);
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {
            int n = group_position.y * 64 + n_offset * 8;

            for (int n_sub1 = 0; n_sub1 < 2; n_sub1++)
            {
                for (int n_sub2 = 0; n_sub2 < 4; n_sub2++)
                {

    #if OPTIMIZE && M_DIVIDABLE_BY_64
                    (         n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #else
                    (m < M && n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #endif
                    n++;
                }
            }
            
            m++;
        }
#endif

    }


#undef M_DIVIDABLE_BY_64
#undef N_DIVIDABLE_BY_64
#undef K_DIVIDABLE_BY_8
#undef TRANSPOSE_A
#undef TRANSPOSE_B
#undef A_STRIDE_K
#undef B_STRIDE_K
#undef A_STRIDE_M
#undef A_STRIDE_M
}


kernel void fusedelementwise_f9897512195ce74db60b769e4e878ba0c65b4fc5f011a7b431c5eb2d(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int D0 = meta_buffer[6];
    int d0;
    for (d0 = gid; d0 < D0; d0 += num_threads) {
        const float v7 = v3[d0];
        const float v8 = v5[d0];
        float v9;
        {
            v9 = v8 * v7;
        }
        const float v10 = v4[d0];
        float v11;
        {
            v11 = v9 + v10;
        }
        const float v12 = v1[d0];
        float v13;
        {
            v13 = v11 + v12;
        }
        const float v14 = v2[d0];
        float v15;
        {
            v15 = v13 + v14;
        }
        float v16;
        {
            v16 = v15 > 0 ? v15 : 0;
        }
        v6[d0] = v16;
    }
}


kernel void reshape_16bccba9a464498806aabf37d42e7f652af6d3922196b61ef1ee5108(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint index[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float *x = (static_buffer + meta_buffer[0]);
    device float *y = (static_buffer + meta_buffer[1]);

    const int N = meta_buffer[2];

    for (int gid = index; gid < N; gid += num_threads) {
        y[gid] = x[gid];
    }
}


kernel void transpose_1a0fbadea0475062956fc679399ce2f40129cb877aec049982efb309(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    device float * v2 = (static_buffer + meta_buffer[1]);
    const int v3 = meta_buffer[2];
    const int v4 = meta_buffer[3];
    const int D0 = meta_buffer[4];
    const int D1 = meta_buffer[5];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v5 = v1[d0*v3 + d1];
            float v6;
            {
                v6 = v5;
            }
            v2[d0 + d1*v4] = v6;
        }
    }
}


kernel void im2col_dd5a967a90f95059d05657fb827f839569ee043c5e56cbfeb987f6f8(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint index_thread[[thread_position_in_threadgroup]],
                          uint index_group[[threadgroup_position_in_grid]])
{
#define SH_EQUAL_1 1
#define SW_EQUAL_1 1
#define DH_EQUAL_1 1
#define DW_EQUAL_1 1
#define C1_DIVIDABLE_BY_4 1


#if OPTIMIZE && C1_DIVIDABLE_BY_4
    const device float4 *im4 = (const device float4 *)((static_buffer + meta_buffer[0]));
    device float4 *col4 = (device float4 *)((static_buffer + meta_buffer[1]));
    const int C1_4 = (meta_buffer[3]) >> 2;
#else
    const device float *im = (static_buffer + meta_buffer[0]);
    device float *col = (static_buffer + meta_buffer[1]);
    const int C1 = meta_buffer[3];
#endif

    const int H1 = meta_buffer[4];
    const int W1 = meta_buffer[5];
    const int H2 = meta_buffer[6];
    const int W2 = meta_buffer[7];
    const int KH = meta_buffer[8];
    const int KW = meta_buffer[9];
#if !DH_EQUAL_1
    const int DH = meta_buffer[10];
#endif
#if !DW_EQUAL_1
    const int DW = meta_buffer[11];
#endif
    const int PH = meta_buffer[14];
    const int PW = meta_buffer[15];

#if !OPTIMIZE || !SH_EQUAL_1
    const int SH = meta_buffer[12];
#endif

#if !OPTIMIZE || !SW_EQUAL_1
    const int SW = meta_buffer[13];
#endif

    const int H1P = H1 + 2 * PH;
    const int W1P = W1 + 2 * PW;

    const int w1 = (index_group % W1P) - PW;
    const int h1 = (index_group / W1P % H1P) - PH;
    const int  n = index_group / W1P / H1P;

#if OPTIMIZE && C1_DIVIDABLE_BY_4
    for (int c1_4 = index_thread; c1_4 < C1_4; c1_4 += 64) {
        const float4 v4 = (h1 < 0 || h1 >= H1 || w1 < 0 || w1 >= W1) ? 0 : im4[((n * H1 + h1) * W1 + w1) * C1_4 + c1_4];
#else
    for (int c1 = index_thread; c1 < C1; c1 += 64) {
        const float v = (h1 < 0 || h1 >= H1 || w1 < 0 || w1 >= W1) ? 0 : im[((n * H1 + h1) * W1 + w1) * C1 + c1];
#endif

#if OPTIMIZE && SH_EQUAL_1
        for (int kh = 0; kh < KH; kh++) {
    #if DH_EQUAL_1
            const int h2 = h1 + PH - kh;
    #else
            const int h2 = h1 + PH - kh * DH;
    #endif
    
#else
        for (int kh = (h1 + PH) % SH; kh < KH; kh += SH) {
    #if DH_EQUAL_1
            const int h2 = (h1 + PH - kh) / SH;
    #else
            const int h2 = (h1 + PH - kh * DH) / SH;
    #endif
#endif
            if (h2 < 0 || h2 >= H2) continue;

#if OPTIMIZE && SH_EQUAL_1
            for (int kw = 0; kw < KW; kw++) {
    #if DW_EQUAL_1
                const int w2 = w1 + PW - kw;
    #else
                const int w2 = w1 + PW - kw * DW;
    #endif
#else
            for (int kw = (w1 + PW) % SW; kw < KW; kw += SW) {
    #if DW_EQUAL_1
                const int w2 = (w1 + PW - kw) / SW;
    #else
                const int w2 = (w1 + PW - kw * DW) / SW;
    #endif
#endif
                if (w2 < 0 || w2 >= W2) continue;

#if OPTIMIZE && C1_DIVIDABLE_BY_4
                col4[((((n * H2 + h2) * W2 + w2) * KH + kh) * KW + kw) * C1_4 + c1_4] = v4;
#else
                col[((((n * H2 + h2) * W2 + w2) * KH + kh) * KW + kw) * C1 + c1] = v;
#endif
            }
        }
    }


#undef SH_EQUAL_1
#undef SW_EQUAL_1
#undef DH_EQUAL_1
#undef DW_EQUAL_1
#undef C1_DIVIDABLE_BY_4
}


kernel void sgemm_94f0c54b77dcb1fbad06f386c4665ef898e786f3080ae97e8195afb1(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint index[[thread_index_in_threadgroup]],
                          uint2 group_position[[threadgroup_position_in_grid]])
{
#define TRANSPOSE_A 1
#define TRANSPOSE_B 1
#define M_DIVIDABLE_BY_64 1
#define N_DIVIDABLE_BY_64 1
#define K_DIVIDABLE_BY_8 1

#if TRANSPOSE_A
    #define A_STRIDE_K 1
    #define A_STRIDE_M K
#else
    #define A_STRIDE_K M
    #define A_STRIDE_M 1
#endif

#if TRANSPOSE_B
    #define B_STRIDE_K N
    #define B_STRIDE_N 1
#else
    #define B_STRIDE_K 1
    #define B_STRIDE_N K
#endif

#if K_DIVIDABLE_BY_8 && M_DIVIDABLE_BY_64  && N_DIVIDABLE_BY_64 && !TRANSPOSE_A && TRANSPOSE_B && OPTIMIZE
    const device float4 *load_target4 = (index & 32) 
        ? (const device float4 *)((static_buffer + meta_buffer[1])) 
        : (const device float4 *)((static_buffer + meta_buffer[0]));
#else
    const device float *load_target = (index & 32) 
        ? ((static_buffer + meta_buffer[1])) 
        : ((static_buffer + meta_buffer[0]));
#endif

    const int M = meta_buffer[3];
    const int N = meta_buffer[4];

    const int K = meta_buffer[5];

    threadgroup float4 shared4[32 * 8 * 2];

    const int stride_k = (index & 32) ? B_STRIDE_K : A_STRIDE_K;
    const int stride_mn = (index & 32) ? B_STRIDE_N : A_STRIDE_M;

    const int m_offset = index & 7;
    const int n_offset = index >> 3;

    const int mn_load_offset = ((index & 32) ? group_position.y : group_position.x) * 64 + (index & 15) * 4;
    const int k_load_offset = ((index & 16) ? 1 : 0);

    int track0 = mn_load_offset * stride_mn + (k_load_offset + 0) * stride_k;
    int track2 = track0 + 2 * stride_k;
    int track4 = track0 + 4 * stride_k;
    int track6 = track0 + 6 * stride_k;

#if !OPTIMIZE || !M_DIVIDABLE_BY_64 || !N_DIVIDABLE_BY_64
    const int max_MN = (index & 32) ? N : M;
#endif

    int shared_offset4 = ((index & 32) ? 16 : 0) + k_load_offset * 32 + (index & 15);
    int read_A_offset4 = m_offset * 2;
    int read_B_offset4 = n_offset * 2 + 16;

    float4 result[16] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    int k = 0;

    while (k < K)
    {
        {
#if OPTIMIZE && K_DIVIDABLE_BY_8
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
        #if OPTIMIZE && !TRANSPOSE_A && TRANSPOSE_B
            shared4[shared_offset4 + 32 * 0] = load_target4[track0 >> 2];
            shared4[shared_offset4 + 32 * 2] = load_target4[track2 >> 2];
            shared4[shared_offset4 + 32 * 4] = load_target4[track4 >> 2];
            shared4[shared_offset4 + 32 * 6] = load_target4[track6 >> 2];
        #else
            shared4[shared_offset4 + 32 * 0] = float4(
                load_target[track0 + stride_mn * 0],
                load_target[track0 + stride_mn * 1],
                load_target[track0 + stride_mn * 2],
                load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                load_target[track2 + stride_mn * 0],
                load_target[track2 + stride_mn * 1],
                load_target[track2 + stride_mn * 2],
                load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                load_target[track4 + stride_mn * 0],
                load_target[track4 + stride_mn * 1],
                load_target[track4 + stride_mn * 2],
                load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                load_target[track6 + stride_mn * 0],
                load_target[track6 + stride_mn * 1],
                load_target[track6 + stride_mn * 2],
                load_target[track6 + stride_mn * 3]
            ); 
        #endif
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
    #endif

            k += 8;
#else
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #endif
#endif
        }

        threadgroup_barrier(mem_flags::mem_threadgroup);

        {
            for (int k_sub = 0; k_sub < 8; k_sub++)
            {
                float4 a00 = shared4[32 * k_sub + read_A_offset4 + 0];
                float4 a01 = shared4[32 * k_sub + read_A_offset4 + 1];
                float4 b00 = shared4[32 * k_sub + read_B_offset4 + 0];
                float4 b01 = shared4[32 * k_sub + read_B_offset4 + 1];

                result[4][0]  += b00[0] * a00[2];
                result[4][1]  += b00[1] * a00[2];
                result[0][1]  += b00[1] * a00[0];
                result[0][0]  += b00[0] * a00[0];
                result[6][0]  += b00[0] * a00[3];
                result[6][1]  += b00[1] * a00[3];
                result[2][1]  += b00[1] * a00[1];
                result[2][0]  += b00[0] * a00[1];
                result[12][0] += b00[0] * a01[2];
                result[12][1] += b00[1] * a01[2];
                result[8][1]  += b00[1] * a01[0];
                result[8][0]  += b00[0] * a01[0];
                result[14][0] += b00[0] * a01[3];
                result[14][1] += b00[1] * a01[3];
                result[10][1] += b00[1] * a01[1];
                result[10][0] += b00[0] * a01[1];

                result[14][2] += b00[2] * a01[3];
                result[14][3] += b00[3] * a01[3];
                result[10][3] += b00[3] * a01[1];
                result[10][2] += b00[2] * a01[1];
                result[12][2] += b00[2] * a01[2];
                result[12][3] += b00[3] * a01[2];
                result[8][3]  += b00[3] * a01[0];
                result[8][2]  += b00[2] * a01[0];
                result[6][2]  += b00[2] * a00[3];
                result[6][3]  += b00[3] * a00[3];
                result[2][3]  += b00[3] * a00[1];
                result[2][2]  += b00[2] * a00[1];
                result[4][2]  += b00[2] * a00[2];
                result[4][3]  += b00[3] * a00[2];
                result[0][3]  += b00[3] * a00[0];
                result[0][2]  += b00[2] * a00[0];

                result[5][0]  += b01[0] * a00[2];
                result[5][1]  += b01[1] * a00[2];
                result[1][1]  += b01[1] * a00[0];
                result[1][0]  += b01[0] * a00[0];
                result[7][0]  += b01[0] * a00[3];
                result[7][1]  += b01[1] * a00[3];
                result[3][1]  += b01[1] * a00[1];
                result[3][0]  += b01[0] * a00[1];
                result[13][0] += b01[0] * a01[2];
                result[13][1] += b01[1] * a01[2];
                result[9][1]  += b01[1] * a01[0];
                result[9][0]  += b01[0] * a01[0];
                result[15][0] += b01[0] * a01[3];
                result[15][1] += b01[1] * a01[3];
                result[11][1] += b01[1] * a01[1];
                result[11][0] += b01[0] * a01[1];

                result[15][2] += b01[2] * a01[3];
                result[15][3] += b01[3] * a01[3];
                result[11][3] += b01[3] * a01[1];
                result[11][2] += b01[2] * a01[1];
                result[13][2] += b01[2] * a01[2];
                result[13][3] += b01[3] * a01[2];
                result[9][3]  += b01[3] * a01[0];
                result[9][2]  += b01[2] * a01[0];
                result[7][2]  += b01[2] * a00[3];
                result[7][3]  += b01[3] * a00[3];
                result[3][3]  += b01[3] * a00[1];
                result[3][2]  += b01[2] * a00[1];
                result[5][2]  += b01[2] * a00[2];
                result[5][3]  += b01[3] * a00[2];
                result[1][3]  += b01[3] * a00[0];
                result[1][2]  += b01[2] * a00[0];
            }
        }

        shared_offset4 ^= 32 * 8;
        read_A_offset4 ^= 32 * 8;
        read_B_offset4 ^= 32 * 8;
        track0 += stride_k * 8;
        track2 += stride_k * 8;
        track4 += stride_k * 8;
        track6 += stride_k * 8;
    }

    {
    
#if OPTIMIZE && N_DIVIDABLE_BY_64
        device float4 *C4 = (device float4 *)((static_buffer + meta_buffer[2]));
        const int N4 = N >> 2;
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {

    #if !M_DIVIDABLE_BY_64
            if (m >= M) continue;
    #endif

            const int n = group_position.y * 16 + n_offset * 2;
            float4 result0 = result[m_sub * 2 + 0];
            float4 result1 = result[m_sub * 2 + 1];

            C4[m * N4 + n + 0] = result0;
            C4[m * N4 + n + 1] = result1;
            
            m++;
        }
#else
        device float *C = (static_buffer + meta_buffer[2]);
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {
            int n = group_position.y * 64 + n_offset * 8;

            for (int n_sub1 = 0; n_sub1 < 2; n_sub1++)
            {
                for (int n_sub2 = 0; n_sub2 < 4; n_sub2++)
                {

    #if OPTIMIZE && M_DIVIDABLE_BY_64
                    (         n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #else
                    (m < M && n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #endif
                    n++;
                }
            }
            
            m++;
        }
#endif

    }


#undef M_DIVIDABLE_BY_64
#undef N_DIVIDABLE_BY_64
#undef K_DIVIDABLE_BY_8
#undef TRANSPOSE_A
#undef TRANSPOSE_B
#undef A_STRIDE_K
#undef B_STRIDE_K
#undef A_STRIDE_M
#undef A_STRIDE_M
}


kernel void fusedelementwise_2d2190d7f50090895b9dbbebb0d69009dd8b35c8b366aa1795830111(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v10;
            }
            float v15;
            {
                v15 = v14 + v11;
            }
            float v16;
            {
                v16 = v15 + v12;
            }
            float v17;
            {
                v17 = v16 + v9;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_9e147c0f3b802e02664b956484ae4b1af14b988e74275fccbcd82d58(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v12;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            const float v20 = v5[d0*v8 + d1];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_a66cb0e7755addfa5a1076a20b29acb5e435642b0189f026614566c9(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v9;
            }
            float v15;
            {
                v15 = v14 + v10;
            }
            float v16;
            {
                v16 = v15 + v11;
            }
            float v17;
            {
                v17 = v16 + v12;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_08ceecd91fe1cd0240bc3c57e60c8a50399dc71e73b4ac1d4486b84f(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v14;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_f466c7d83841a55d236c6e6874fe6057b6d3a31e39028077dfe418ed(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v10;
            }
            float v15;
            {
                v15 = v14 + v9;
            }
            float v16;
            {
                v16 = v15 + v11;
            }
            float v17;
            {
                v17 = v16 + v12;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_0fe8f69086c4f91b38a5dee7f02882ac427d9675bc71731e092a5bca(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v14;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_e8c01b279a775cb0d4df4dad683dd8d085ff8669b2f928bcda63d5ae(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v11;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_00e9cad0d10f7f6d9abf243165ae7248ec4b47077f94fb9ab30b921d(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v12;
            }
            float v15;
            {
                v15 = v14 + v9;
            }
            float v16;
            {
                v16 = v15 + v11;
            }
            float v17;
            {
                v17 = v16 + v10;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_bc677fed2c537a8e5cfa6595ce2ad94ae1892e17983b78d86a381a9c(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v13;
            }
            float v17;
            {
                v17 = v16 + v14;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_31e88a7629254688a1dedabb0d9bef5873c48eebabad9d9d8b2bf583(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v9;
            }
            float v15;
            {
                v15 = v14 + v10;
            }
            float v16;
            {
                v16 = v15 + v12;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_5c9ff9b91632d627c2b5d87b5e76f0e2fc206af4c68dc0ec7e5d1ab8(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v14;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_b0942cfacb185abccf56211e68f98e1e0ee56675067b4ef87f96e978(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v11;
            }
            float v15;
            {
                v15 = v14 + v9;
            }
            float v16;
            {
                v16 = v15 + v12;
            }
            float v17;
            {
                v17 = v16 + v10;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_5cd2fb349d63f803a9e0954c255c1a98ef9bab8db8476face0871b90(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v11;
            }
            float v17;
            {
                v17 = v16 + v14;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_e74ba8af15ffc47a1a302f49a74631f65d4ff8cef1a3d5e424163d3f(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v14;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v13;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_c3e81c1bb0df525eeee9d2324ffc7aabca1955402a79ac78d6dfde00(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v10;
            }
            float v15;
            {
                v15 = v14 + v12;
            }
            float v16;
            {
                v16 = v15 + v9;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_346835ae7e1be494a22e1e2a7236d294f3f80f7748c5c16e8dc227a3(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v14;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_7ef60d3f0b2891f2d3b7137deeda76fbac9fc44029ee86bc0b4c5023(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v11;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_3f89642e4c819e0730c39e037efaa9676a4d74bf25603a36c4607b15(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v11;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_966eeca19384cdb7ff623b184f475d2ad264a52e29418cae812e69eb(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v10;
            }
            float v15;
            {
                v15 = v14 + v9;
            }
            float v16;
            {
                v16 = v15 + v12;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_c9324a0e6085c8ea64cb680b0f06188e0f0ddcbd2767d200be5c10c2(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v13;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_a378d01919da723ccc21bb842a38d042b076a10810005366a7e69d9e(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v12;
            }
            float v15;
            {
                v15 = v14 + v11;
            }
            float v16;
            {
                v16 = v15 + v10;
            }
            float v17;
            {
                v17 = v16 + v9;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_bc0b1d33f0f29957e630394be76b24da8e65f26b775e16adb719d852(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v12;
            }
            float v17;
            {
                v17 = v16 + v13;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_0c9d7400d071e497d58b717b05f61e05acec8975582d7c178944aa11(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v9;
            }
            float v15;
            {
                v15 = v14 + v12;
            }
            float v16;
            {
                v16 = v15 + v11;
            }
            float v17;
            {
                v17 = v16 + v10;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_75d4d1c8b5ea831de83d96b401dcf1620aadd9bed516f4ed99dc9be1(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v12;
            }
            float v17;
            {
                v17 = v16 + v11;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v13;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_e7965f938006332ec353b81c2d80dfaebca790fcc192f58e39be220e(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v11;
            }
            float v17;
            {
                v17 = v16 + v12;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            const float v20 = v5[d0 + d1*v8];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_1ea664329ecf65b2feb3a99fbdc021455fbef2a73a10d865f9027f43(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    device float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13 * v12;
            }
            float v15;
            {
                v15 = v14 + v10;
            }
            float v16;
            {
                v16 = v15 + v11;
            }
            float v17;
            {
                v17 = v16 + v9;
            }
            float v18;
            {
                v18 = v17 > 0 ? v17 : 0;
            }
            v6[d0 + d1*v8] = v18;
        }
    }
}


kernel void fusedelementwise_2a77666c24e30c6041083c58a5a40f0a3276ec5187936eeb49ff6944(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15 * v12;
            }
            float v17;
            {
                v17 = v16 + v14;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            const float v20 = v6[d0 + d1*v9];
            float v21;
            {
                v21 = v19 + v20;
            }
            v7[d0 + d1*v10] = v21;
        }
    }
}


kernel void fusedelementwise_239ba2b1505424f9c86673e536cc6fc8c43ab71be01bd55c148a11e9(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    const device float * v5 = (static_buffer + meta_buffer[4]);
    const device float * v6 = (static_buffer + meta_buffer[5]);
    device float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15 * v12;
            }
            float v17;
            {
                v17 = v16 + v14;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            float v20;
            {
                v20 = v19 > 0 ? v19 : 0;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0 + d1*v10] = v22;
        }
    }
}


kernel void elementwiseadd_de265f5f24d651945d05e27082b8e6d7eb254ba11e717ff5410bd5dc(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    device float * v3 = (static_buffer + meta_buffer[2]);
    const int v4 = meta_buffer[3];
    const int v5 = meta_buffer[4];
    const int D0 = meta_buffer[5];
    const int D1 = meta_buffer[6];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v6 = v1[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v7 = v2[d0 + d1*v4];
            float v8;
            {
                v8 = v7 + v6;
            }
            v3[d0 + d1*v5] = v8;
        }
    }
}


kernel void depth2space_80400f914882037720ae1b1a8c35fd1640e44514f2d25ba012fd9f6f(device float * static_buffer[[buffer(0)]],
                     device float * dynamic_buffer[[buffer(1)]],
                     const device int * meta_buffer[[buffer(2)]],
                     uint index[[thread_position_in_grid]],
                     uint num_threads[[threads_per_grid]])
{
    const device float *x = (static_buffer + meta_buffer[0]);
    device float *y = (static_buffer + meta_buffer[1]);
    const int r = meta_buffer[2];

    const int N = meta_buffer[3];
    const int C1 = meta_buffer[4];
    const int C2 = meta_buffer[5];
    const int H1 = meta_buffer[6];
    const int H2 = meta_buffer[7];
    const int W1 = meta_buffer[8];
    const int W2 = meta_buffer[9];

    for (int gid = index; gid < N*H2*W2*C2; gid += num_threads) {
        const int c2 = gid % C2;
        const int w2 = gid / C2 % W2;
        const int h2 = gid / C2 / W2 % H2;
        const int n = gid / C2 / W2 / H2;
        const int w1 = w2 / r;
        const int h1 = h2 / r;
        const int c1 = c2 + (w2 % r) * C2 + (h2 % r) * C2 * r;
        y[gid] = x[((n*H1+h1)*W1+w1)*C1+c1];
    }
}


kernel void fusedelementwise_8f689ddf98cbf99242aefc7c6414c8e958bd6edfea4d06d0977af917(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    device float * v5 = (static_buffer + meta_buffer[4]);
    const int v6 = meta_buffer[5];
    const int v7 = meta_buffer[6];
    const int D0 = meta_buffer[7];
    const int D1 = meta_buffer[8];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v8 = v1[d0];
        const float v9 = v2[d0];
        const float v10 = v3[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v11 = v4[d0 + d1*v6];
            float v12;
            {
                v12 = v11 * v9;
            }
            float v13;
            {
                v13 = v12 + v10;
            }
            float v14;
            {
                v14 = v13 + v8;
            }
            float v15;
            {
                v15 = v14 > 0 ? v14 : 0;
            }
            v5[d0 + d1*v7] = v15;
        }
    }
}


kernel void fusedelementwise_d4cd5e3e52637e2fc05281ad5cd763df7f89466c05ac6312bef25432(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    device float * v5 = (static_buffer + meta_buffer[4]);
    const int v6 = meta_buffer[5];
    const int v7 = meta_buffer[6];
    const int D0 = meta_buffer[7];
    const int D1 = meta_buffer[8];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v8 = v1[d0];
        const float v9 = v2[d0];
        const float v10 = v3[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v11 = v4[d0 + d1*v6];
            float v12;
            {
                v12 = v11 * v8;
            }
            float v13;
            {
                v13 = v12 + v9;
            }
            float v14;
            {
                v14 = v13 + v10;
            }
            float v15;
            {
                v15 = v14 > 0 ? v14 : 0;
            }
            v5[d0 + d1*v7] = v15;
        }
    }
}


kernel void fusedelementwise_2a574752a95643e84eeb7d2c18975bb17778b1e32376ba69334cecbd(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    const device float * v3 = (static_buffer + meta_buffer[2]);
    const device float * v4 = (static_buffer + meta_buffer[3]);
    device float * v5 = (static_buffer + meta_buffer[4]);
    const int v6 = meta_buffer[5];
    const int v7 = meta_buffer[6];
    const int D0 = meta_buffer[7];
    const int D1 = meta_buffer[8];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v8 = v1[d0];
        const float v9 = v2[d0];
        const float v10 = v3[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v11 = v4[d0 + d1*v6];
            float v12;
            {
                v12 = v11 * v10;
            }
            float v13;
            {
                v13 = v12 + v8;
            }
            float v14;
            {
                v14 = v13 + v9;
            }
            float v15;
            {
                v15 = v14 > 0 ? v14 : 0;
            }
            v5[d0 + d1*v7] = v15;
        }
    }
}


kernel void sgemm_2f5fb17c61936ed97c3b40058a42f14de9b21cb6b4208d457114dbc7(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint index[[thread_index_in_threadgroup]],
                          uint2 group_position[[threadgroup_position_in_grid]])
{
#define TRANSPOSE_A 1
#define TRANSPOSE_B 1
#define M_DIVIDABLE_BY_64 1
#define N_DIVIDABLE_BY_64 0
#define K_DIVIDABLE_BY_8 1

#if TRANSPOSE_A
    #define A_STRIDE_K 1
    #define A_STRIDE_M K
#else
    #define A_STRIDE_K M
    #define A_STRIDE_M 1
#endif

#if TRANSPOSE_B
    #define B_STRIDE_K N
    #define B_STRIDE_N 1
#else
    #define B_STRIDE_K 1
    #define B_STRIDE_N K
#endif

#if K_DIVIDABLE_BY_8 && M_DIVIDABLE_BY_64  && N_DIVIDABLE_BY_64 && !TRANSPOSE_A && TRANSPOSE_B && OPTIMIZE
    const device float4 *load_target4 = (index & 32) 
        ? (const device float4 *)((static_buffer + meta_buffer[1])) 
        : (const device float4 *)((static_buffer + meta_buffer[0]));
#else
    const device float *load_target = (index & 32) 
        ? ((static_buffer + meta_buffer[1])) 
        : ((static_buffer + meta_buffer[0]));
#endif

    const int M = meta_buffer[3];
    const int N = meta_buffer[4];

    const int K = meta_buffer[5];

    threadgroup float4 shared4[32 * 8 * 2];

    const int stride_k = (index & 32) ? B_STRIDE_K : A_STRIDE_K;
    const int stride_mn = (index & 32) ? B_STRIDE_N : A_STRIDE_M;

    const int m_offset = index & 7;
    const int n_offset = index >> 3;

    const int mn_load_offset = ((index & 32) ? group_position.y : group_position.x) * 64 + (index & 15) * 4;
    const int k_load_offset = ((index & 16) ? 1 : 0);

    int track0 = mn_load_offset * stride_mn + (k_load_offset + 0) * stride_k;
    int track2 = track0 + 2 * stride_k;
    int track4 = track0 + 4 * stride_k;
    int track6 = track0 + 6 * stride_k;

#if !OPTIMIZE || !M_DIVIDABLE_BY_64 || !N_DIVIDABLE_BY_64
    const int max_MN = (index & 32) ? N : M;
#endif

    int shared_offset4 = ((index & 32) ? 16 : 0) + k_load_offset * 32 + (index & 15);
    int read_A_offset4 = m_offset * 2;
    int read_B_offset4 = n_offset * 2 + 16;

    float4 result[16] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    int k = 0;

    while (k < K)
    {
        {
#if OPTIMIZE && K_DIVIDABLE_BY_8
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
        #if OPTIMIZE && !TRANSPOSE_A && TRANSPOSE_B
            shared4[shared_offset4 + 32 * 0] = load_target4[track0 >> 2];
            shared4[shared_offset4 + 32 * 2] = load_target4[track2 >> 2];
            shared4[shared_offset4 + 32 * 4] = load_target4[track4 >> 2];
            shared4[shared_offset4 + 32 * 6] = load_target4[track6 >> 2];
        #else
            shared4[shared_offset4 + 32 * 0] = float4(
                load_target[track0 + stride_mn * 0],
                load_target[track0 + stride_mn * 1],
                load_target[track0 + stride_mn * 2],
                load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                load_target[track2 + stride_mn * 0],
                load_target[track2 + stride_mn * 1],
                load_target[track2 + stride_mn * 2],
                load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                load_target[track4 + stride_mn * 0],
                load_target[track4 + stride_mn * 1],
                load_target[track4 + stride_mn * 2],
                load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                load_target[track6 + stride_mn * 0],
                load_target[track6 + stride_mn * 1],
                load_target[track6 + stride_mn * 2],
                load_target[track6 + stride_mn * 3]
            ); 
        #endif
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 2] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 4] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            shared4[shared_offset4 + 32 * 6] = float4(
                (mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
    #endif

            k += 8;
#else
    #if OPTIMIZE && M_DIVIDABLE_BY_64 && N_DIVIDABLE_BY_64
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #else
            shared4[shared_offset4 + 32 * 0] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track0 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track0 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track0 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track0 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 2] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track2 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track2 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track2 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track2 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 4] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track4 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track4 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track4 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track4 + stride_mn * 3]
            ); 
            k += 2;

            shared4[shared_offset4 + 32 * 6] = float4(
                (k + k_load_offset >= K || mn_load_offset + 0 >= max_MN) ? 0 : load_target[track6 + stride_mn * 0],
                (k + k_load_offset >= K || mn_load_offset + 1 >= max_MN) ? 0 : load_target[track6 + stride_mn * 1],
                (k + k_load_offset >= K || mn_load_offset + 2 >= max_MN) ? 0 : load_target[track6 + stride_mn * 2],
                (k + k_load_offset >= K || mn_load_offset + 3 >= max_MN) ? 0 : load_target[track6 + stride_mn * 3]
            ); 
            k += 2;
    #endif
#endif
        }

        threadgroup_barrier(mem_flags::mem_threadgroup);

        {
            for (int k_sub = 0; k_sub < 8; k_sub++)
            {
                float4 a00 = shared4[32 * k_sub + read_A_offset4 + 0];
                float4 a01 = shared4[32 * k_sub + read_A_offset4 + 1];
                float4 b00 = shared4[32 * k_sub + read_B_offset4 + 0];
                float4 b01 = shared4[32 * k_sub + read_B_offset4 + 1];

                result[4][0]  += b00[0] * a00[2];
                result[4][1]  += b00[1] * a00[2];
                result[0][1]  += b00[1] * a00[0];
                result[0][0]  += b00[0] * a00[0];
                result[6][0]  += b00[0] * a00[3];
                result[6][1]  += b00[1] * a00[3];
                result[2][1]  += b00[1] * a00[1];
                result[2][0]  += b00[0] * a00[1];
                result[12][0] += b00[0] * a01[2];
                result[12][1] += b00[1] * a01[2];
                result[8][1]  += b00[1] * a01[0];
                result[8][0]  += b00[0] * a01[0];
                result[14][0] += b00[0] * a01[3];
                result[14][1] += b00[1] * a01[3];
                result[10][1] += b00[1] * a01[1];
                result[10][0] += b00[0] * a01[1];

                result[14][2] += b00[2] * a01[3];
                result[14][3] += b00[3] * a01[3];
                result[10][3] += b00[3] * a01[1];
                result[10][2] += b00[2] * a01[1];
                result[12][2] += b00[2] * a01[2];
                result[12][3] += b00[3] * a01[2];
                result[8][3]  += b00[3] * a01[0];
                result[8][2]  += b00[2] * a01[0];
                result[6][2]  += b00[2] * a00[3];
                result[6][3]  += b00[3] * a00[3];
                result[2][3]  += b00[3] * a00[1];
                result[2][2]  += b00[2] * a00[1];
                result[4][2]  += b00[2] * a00[2];
                result[4][3]  += b00[3] * a00[2];
                result[0][3]  += b00[3] * a00[0];
                result[0][2]  += b00[2] * a00[0];

                result[5][0]  += b01[0] * a00[2];
                result[5][1]  += b01[1] * a00[2];
                result[1][1]  += b01[1] * a00[0];
                result[1][0]  += b01[0] * a00[0];
                result[7][0]  += b01[0] * a00[3];
                result[7][1]  += b01[1] * a00[3];
                result[3][1]  += b01[1] * a00[1];
                result[3][0]  += b01[0] * a00[1];
                result[13][0] += b01[0] * a01[2];
                result[13][1] += b01[1] * a01[2];
                result[9][1]  += b01[1] * a01[0];
                result[9][0]  += b01[0] * a01[0];
                result[15][0] += b01[0] * a01[3];
                result[15][1] += b01[1] * a01[3];
                result[11][1] += b01[1] * a01[1];
                result[11][0] += b01[0] * a01[1];

                result[15][2] += b01[2] * a01[3];
                result[15][3] += b01[3] * a01[3];
                result[11][3] += b01[3] * a01[1];
                result[11][2] += b01[2] * a01[1];
                result[13][2] += b01[2] * a01[2];
                result[13][3] += b01[3] * a01[2];
                result[9][3]  += b01[3] * a01[0];
                result[9][2]  += b01[2] * a01[0];
                result[7][2]  += b01[2] * a00[3];
                result[7][3]  += b01[3] * a00[3];
                result[3][3]  += b01[3] * a00[1];
                result[3][2]  += b01[2] * a00[1];
                result[5][2]  += b01[2] * a00[2];
                result[5][3]  += b01[3] * a00[2];
                result[1][3]  += b01[3] * a00[0];
                result[1][2]  += b01[2] * a00[0];
            }
        }

        shared_offset4 ^= 32 * 8;
        read_A_offset4 ^= 32 * 8;
        read_B_offset4 ^= 32 * 8;
        track0 += stride_k * 8;
        track2 += stride_k * 8;
        track4 += stride_k * 8;
        track6 += stride_k * 8;
    }

    {
    
#if OPTIMIZE && N_DIVIDABLE_BY_64
        device float4 *C4 = (device float4 *)((static_buffer + meta_buffer[2]));
        const int N4 = N >> 2;
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {

    #if !M_DIVIDABLE_BY_64
            if (m >= M) continue;
    #endif

            const int n = group_position.y * 16 + n_offset * 2;
            float4 result0 = result[m_sub * 2 + 0];
            float4 result1 = result[m_sub * 2 + 1];

            C4[m * N4 + n + 0] = result0;
            C4[m * N4 + n + 1] = result1;
            
            m++;
        }
#else
        device float *C = (static_buffer + meta_buffer[2]);
        int m = group_position.x * 64 + m_offset * 8;
        for (int m_sub = 0; m_sub < 8; m_sub++)
        {
            int n = group_position.y * 64 + n_offset * 8;

            for (int n_sub1 = 0; n_sub1 < 2; n_sub1++)
            {
                for (int n_sub2 = 0; n_sub2 < 4; n_sub2++)
                {

    #if OPTIMIZE && M_DIVIDABLE_BY_64
                    (         n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #else
                    (m < M && n < N) ? (C[m * N + n] = result[m_sub * 2 + n_sub1][n_sub2]) : 0;
    #endif
                    n++;
                }
            }
            
            m++;
        }
#endif

    }


#undef M_DIVIDABLE_BY_64
#undef N_DIVIDABLE_BY_64
#undef K_DIVIDABLE_BY_8
#undef TRANSPOSE_A
#undef TRANSPOSE_B
#undef A_STRIDE_K
#undef B_STRIDE_K
#undef A_STRIDE_M
#undef A_STRIDE_M
}


kernel void fusedelementwise_31fb3d644a3935a7507669df865145bfcfe84bf6657c41f8fa2f8cc2(device float * static_buffer[[buffer(0)]],
                          device float * dynamic_buffer[[buffer(1)]],
                          const device int * meta_buffer [[buffer(2)]],
                          uint gid[[thread_position_in_grid]],
                          uint num_threads[[threads_per_grid]])
{
    const device float * v1 = (static_buffer + meta_buffer[0]);
    const device float * v2 = (static_buffer + meta_buffer[1]);
    device float * v3 = (static_buffer + meta_buffer[2]);
    const int v4 = meta_buffer[3];
    const int v5 = meta_buffer[4];
    const int D0 = meta_buffer[5];
    const int D1 = meta_buffer[6];
    int d0;
    for (d0 = ((num_threads > 8) ? (gid % (num_threads / 8)) : 0); d0 < D0; d0 += ((num_threads > 8) ? (num_threads / 8) : 1)) {
        const float v6 = v1[d0];
        int d1;
        for (d1 = ((num_threads > 8) ? (gid / (num_threads / 8)) : 0); d1 < D1; d1 += ((num_threads > 8) ? 8 : 1)) {
            const float v7 = v2[d0 + d1*v4];
            float v8;
            {
                v8 = v7 + v6;
            }
            float v9;
            {
                v9 = tanh(v8);
            }
            v3[d0*v5 + d1] = v9;
        }
    }
}
