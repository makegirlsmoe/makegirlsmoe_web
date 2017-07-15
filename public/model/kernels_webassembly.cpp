
#include <stdlib.h>
#include <math.h>

float static_buffer[14443308];
float* dynamic_buffer = nullptr;

int meta_buf_0[] = {13787780,8388608,13787948,1,16384,166};
int meta_buf_1[] = {13787948,13762560,13804332,1,16384,1};
int meta_buf_2[] = {13804332,13746176,13787948,1,16384,1};
int meta_buf_3[] = {13787948,13729792,13804332,1,16384,1};
int meta_buf_4[] = {13787948,2,16384,13804332,1,16384,1,1,16384};
int meta_buf_5[] = {13787948,13804332,16384};
int meta_buf_6[] = {13787948,4,16384,13804332,1,16384,1,4096,1024,1,1024,4,4};
int meta_buf_7[] = {13787948,0,13820716,16,8192,1024};
int meta_buf_8[] = {13787948,13820716,1,4,4,512,8,8,4,4,2,2,1,1};
int meta_buf_9[] = {13787948,13786112,13820716,64,512,1};
int meta_buf_10[] = {13820716,13785600,13787948,64,512,1};
int meta_buf_11[] = {13787948,13785088,13820716,64,512,1};
int meta_buf_12[] = {13787948,4,32768,13820716,1,32768,4096,512,1,1,8,8,512};
int meta_buf_13[] = {13787948,11108352,13853484,64,4096,512};
int meta_buf_14[] = {13787948,13853484,1,8,8,256,16,16,4,4,2,2,1,1};
int meta_buf_15[] = {13787948,13787136,13853484,256,256,1};
int meta_buf_16[] = {13853484,13786880,13787948,256,256,1};
int meta_buf_17[] = {13787948,13786624,13853484,256,256,1};
int meta_buf_18[] = {13787948,4,65536,13853484,1,65536,4096,256,1,1,16,16,256};
int meta_buf_19[] = {13787948,13205504,13919020,256,2048,256};
int meta_buf_20[] = {13787948,13919020,1,16,16,128,32,32,4,4,2,2,1,1};
int meta_buf_21[] = {13787948,13787648,13919020,1024,128,1};
int meta_buf_22[] = {13919020,13787520,13787948,1024,128,1};
int meta_buf_23[] = {13787948,13787392,13919020,1024,128,1};
int meta_buf_24[] = {13787948,4,131072,13919020,1,131072,4096,128,1,1,32,32,128};
int meta_buf_25[] = {13787948,13778944,13919020,1024,48,128};
int meta_buf_26[] = {13787948,13919020,1,32,32,3,64,64,4,4,2,2,1,1};
int meta_buf_27[] = {13787948,13787776,13800236,4096,3,1};
int meta_buf_28[] = {13787948,4,12288,13800236,1,12288,192,3,1,1,64,64,3};
int* meta_buffers[] = {meta_buf_0,meta_buf_1,meta_buf_2,meta_buf_3,meta_buf_4,meta_buf_5,meta_buf_6,meta_buf_7,meta_buf_8,meta_buf_9,meta_buf_10,meta_buf_11,meta_buf_12,meta_buf_13,meta_buf_14,meta_buf_15,meta_buf_16,meta_buf_17,meta_buf_18,meta_buf_19,meta_buf_20,meta_buf_21,meta_buf_22,meta_buf_23,meta_buf_24,meta_buf_25,meta_buf_26,meta_buf_27,meta_buf_28};

extern "C" void init() {
    //static_buffer = (float*)malloc(14443308 * sizeof(float));
}

extern "C" float* get_static_buffer(void) {
    return static_buffer;
}

extern "C" float* allocate_dynamic_buffer(int count) {
    if (dynamic_buffer) {
        free(dynamic_buffer);
        dynamic_buffer = nullptr;
    }
    dynamic_buffer = (float*)malloc(count * sizeof(float));
    return dynamic_buffer;
}

extern "C" float* get_dynamic_buffer(void) {
    return dynamic_buffer;
}
extern "C" void set_placeholder_value(int kernel_order, int offset, int value) {
    meta_buffers[kernel_order][offset] = value;
}

#ifndef INCLUDE_EIGEN
#define INCLUDE_EIGEN
#include <Eigen/Dense>
#endif

void sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(const int * meta_buffer)
{
    float *A = (static_buffer + meta_buffer[0]);
    float *B = (static_buffer + meta_buffer[1]);
    float *C = (static_buffer + meta_buffer[2]);

    Eigen::Map<Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor> > a_mat(A, meta_buffer[3], meta_buffer[5]);
    Eigen::Map<Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor> > b_mat(B, meta_buffer[5], meta_buffer[4]);
    Eigen::Map<Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor> > c_mat(C, meta_buffer[3], meta_buffer[4]);

    c_mat.noalias() = a_mat * b_mat;
}


void axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(const int * meta_buffer)
{
    const float *X = (static_buffer + meta_buffer[0]);
          float *Y = (static_buffer + meta_buffer[2]);
    const float *B = (static_buffer + meta_buffer[1]);
    const int D1 = meta_buffer[3];
    const int D2 = meta_buffer[4];
    const int D3 = meta_buffer[5];

    for (int index = 0; index < D1 * D2 * D3; index++) {
        Y[index] = X[index] + B[index / D3 % D2];
    }
}


void axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(const int * meta_buffer)
{
    const float *X = (static_buffer + meta_buffer[0]);
          float *Y = (static_buffer + meta_buffer[2]);
    const float *S = (static_buffer + meta_buffer[1]);
    const int D1 = meta_buffer[3];
    const int D2 = meta_buffer[4];
    const int D3 = meta_buffer[5];

    for (int index = 0; index < D1 * D2 * D3; index++) {
        Y[index] = X[index] * S[index / D3 % D2];
    }
}


void relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(const int * meta_buffer)
{
    float *Y = (static_buffer + meta_buffer[0]);
    const int N = meta_buffer[2];

float y;
float x0;
const float *X0 = (meta_buffer[3+1+ (0)] ? static_buffer : dynamic_buffer) + meta_buffer[3 + (0)];
    
    for (int i = 0; i < N; i++)
    {



x0 = X0[i];

        {
y = x0 > 0 ? x0 : 0;
        }

        Y[i] = y;
    }
}


void reshape_f6c88dc1fd9479f62d789912530e6a5c7c51c73de368540e8b8e1ceb(const int * meta_buffer )
{
    const float *x = (static_buffer + meta_buffer[0]);
    float *y = (static_buffer + meta_buffer[1]);

    const int N = meta_buffer[2];

    for (int gid = 0; gid < N; gid += 1) {
        y[gid] = x[gid];
    }
}


void transpose_95640f3e816766f61ce02200bf190c2b2ed3c67f1bf1f64206fc5f4d(const int * meta_buffer)
{
    float *Y = (static_buffer + meta_buffer[0]);
    const int N = meta_buffer[2];

float y;
float x0;
const float *X0 = (meta_buffer[3+1+ (0)] ? static_buffer : dynamic_buffer) + meta_buffer[3 + (0)];
const char D = meta_buffer[1];
const int *X_shapes = (&(meta_buffer[9]));
const int *X_strides_in_Y = (&(meta_buffer[5]));
    
    for (int i = 0; i < N; i++)
    {

int i_x0 = 0;
for (int d = 0; d < D; d++) {
i_x0 = i_x0 * X_shapes[D*0 + d] + ((i / X_strides_in_Y[D*0 + d]) % X_shapes[D*0 + d]);
}


x0 = X0[i_x0];

        {
y = x0;
        }

        Y[i] = y;
    }
}


void col2im_c27ba017d8daabdc8a3c3b2e9bf5f029051ad380aed0be391c790d0e(const int * meta_buffer)
{
    const float *col = (static_buffer + meta_buffer[1]);
    float *im = (static_buffer + meta_buffer[0]);

    const int N = meta_buffer[2];
    const int C1 = meta_buffer[5];
    const int H1 = meta_buffer[6];
    const int W1 = meta_buffer[7];
    const int H2 = meta_buffer[3];
    const int W2 = meta_buffer[4];
    const int KH = meta_buffer[8];
    const int KW = meta_buffer[9];
    const int SH = meta_buffer[10];
    const int SW = meta_buffer[11];
    const int PH = meta_buffer[12];
    const int PW = meta_buffer[13];

    for (int gid = 0; gid < N*H1*W1*C1; gid += 1) {
        const int c1 = gid % C1;
        const int w1 = gid / C1 % W1;
        const int h1 = gid / C1 / W1 % H1;
        const int n = gid / C1 / W1 / H1;

        float sum = 0;
        for (int kh = 0; kh < KH; kh++) {
            const int h2 = (h1 + PH - kh) / SH;
            if ((h1 + PH - kh) % SH != 0 || h2 < 0 || h2 >= H2) continue;

            for (int kw = 0; kw < KW; kw++) {
                const int w2 = (w1 + PW - kw) / SW;
                if ((w1 + PW - kw) % SW != 0 || w2 < 0 || w2 >= W2) continue;
                
                sum += col[((((n * H2 + h2) * W2 + w2) * KH + kh) * KW + kw) * C1 + c1];
            }
        }
        
        im[gid] = sum; 
    }
}


void tanh_e53899afffbb30aa1d73708f084f35c47ffdde898e691bdd037dfa49(const int * meta_buffer)
{
    float *Y = (static_buffer + meta_buffer[0]);
    const int N = meta_buffer[2];

float y;
float x0;
const float *X0 = (meta_buffer[3+1+ (0)] ? static_buffer : dynamic_buffer) + meta_buffer[3 + (0)];
    
    for (int i = 0; i < N; i++)
    {



x0 = X0[i];

        {
y = tanh(x0);
        }

        Y[i] = y;
    }
}

extern "C" void run() {
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_0);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_1);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_2);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_3);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_4);
reshape_f6c88dc1fd9479f62d789912530e6a5c7c51c73de368540e8b8e1ceb(meta_buf_5);
transpose_95640f3e816766f61ce02200bf190c2b2ed3c67f1bf1f64206fc5f4d(meta_buf_6);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_7);
col2im_c27ba017d8daabdc8a3c3b2e9bf5f029051ad380aed0be391c790d0e(meta_buf_8);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_9);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_10);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_11);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_12);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_13);
col2im_c27ba017d8daabdc8a3c3b2e9bf5f029051ad380aed0be391c790d0e(meta_buf_14);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_15);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_16);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_17);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_18);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_19);
col2im_c27ba017d8daabdc8a3c3b2e9bf5f029051ad380aed0be391c790d0e(meta_buf_20);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_21);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_22);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_23);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_24);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_25);
col2im_c27ba017d8daabdc8a3c3b2e9bf5f029051ad380aed0be391c790d0e(meta_buf_26);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_27);
tanh_e53899afffbb30aa1d73708f084f35c47ffdde898e691bdd037dfa49(meta_buf_28);

}

