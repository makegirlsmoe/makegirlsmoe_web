
#include <stdlib.h>
#include <math.h>

float static_buffer[89841324];
float* dynamic_buffer = nullptr;

int meta_buf_0[] = {3857924,0,3858092,1,16384,166};
int meta_buf_1[] = {3858092,3788800,3874476,1,16384,1};
int meta_buf_2[] = {3874476,3805184,3858092,1,16384,1};
int meta_buf_3[] = {3858092,3821568,3874476,1,16384,1};
int meta_buf_4[] = {3858092,2,16384,3874476,1,16384,1,1,16384};
int meta_buf_5[] = {3858092,3874476,16384};
int meta_buf_6[] = {3858092,4,16384,3874476,1,16384,1,1024,64,1,64,16,16};
int meta_buf_7[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_8[] = {3874476,3198976,4021932,256,64,576};
int meta_buf_9[] = {4021932,3857024,3874476,256,64,1};
int meta_buf_10[] = {3874476,3856192,3890860,256,64,1};
int meta_buf_11[] = {3890860,3855744,3874476,256,64,1};
int meta_buf_12[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_13[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_14[] = {3858092,3751936,4021932,256,64,576};
int meta_buf_15[] = {4021932,3855552,3858092,256,64,1};
int meta_buf_16[] = {3858092,3855104,3874476,256,64,1};
int meta_buf_17[] = {3874476,3854272,3890860,256,64,1};
int meta_buf_18[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_19[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_20[] = {3874476,3567616,4021932,256,64,576};
int meta_buf_21[] = {4021932,3857472,3874476,256,64,1};
int meta_buf_22[] = {3874476,3854464,3890860,256,64,1};
int meta_buf_23[] = {3890860,3855232,3874476,256,64,1};
int meta_buf_24[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_25[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_26[] = {3858092,3530752,4021932,256,64,576};
int meta_buf_27[] = {4021932,3855040,3858092,256,64,1};
int meta_buf_28[] = {3858092,3855872,3874476,256,64,1};
int meta_buf_29[] = {3874476,3854784,3890860,256,64,1};
int meta_buf_30[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_31[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_32[] = {3874476,3420160,4021932,256,64,576};
int meta_buf_33[] = {4021932,3856256,3874476,256,64,1};
int meta_buf_34[] = {3874476,3854912,3890860,256,64,1};
int meta_buf_35[] = {3890860,3854528,3874476,256,64,1};
int meta_buf_36[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_37[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_38[] = {3858092,3309568,4021932,256,64,576};
int meta_buf_39[] = {4021932,3855936,3858092,256,64,1};
int meta_buf_40[] = {3858092,3854848,3874476,256,64,1};
int meta_buf_41[] = {3874476,3855680,3890860,256,64,1};
int meta_buf_42[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_43[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_44[] = {3874476,3235840,4021932,256,64,576};
int meta_buf_45[] = {4021932,3855488,3874476,256,64,1};
int meta_buf_46[] = {3874476,3856320,3890860,256,64,1};
int meta_buf_47[] = {3890860,3854976,3874476,256,64,1};
int meta_buf_48[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_49[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_50[] = {3858092,3457024,4021932,256,64,576};
int meta_buf_51[] = {4021932,3856832,3858092,256,64,1};
int meta_buf_52[] = {3858092,3857600,3874476,256,64,1};
int meta_buf_53[] = {3874476,3856512,3890860,256,64,1};
int meta_buf_54[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_55[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_56[] = {3874476,3641344,4021932,256,64,576};
int meta_buf_57[] = {4021932,3857856,3874476,256,64,1};
int meta_buf_58[] = {3874476,3857152,3890860,256,64,1};
int meta_buf_59[] = {3890860,3857728,3874476,256,64,1};
int meta_buf_60[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_61[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_62[] = {3858092,3272704,4021932,256,64,576};
int meta_buf_63[] = {4021932,3855808,3858092,256,64,1};
int meta_buf_64[] = {3858092,3856640,3874476,256,64,1};
int meta_buf_65[] = {3874476,3857280,3890860,256,64,1};
int meta_buf_66[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_67[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_68[] = {3874476,3162112,4021932,256,64,576};
int meta_buf_69[] = {4021932,3855360,3874476,256,64,1};
int meta_buf_70[] = {3874476,3856064,3890860,256,64,1};
int meta_buf_71[] = {3890860,3856896,3874476,256,64,1};
int meta_buf_72[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_73[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_74[] = {3858092,3715072,4021932,256,64,576};
int meta_buf_75[] = {4021932,3856704,3858092,256,64,1};
int meta_buf_76[] = {3858092,3857344,3874476,256,64,1};
int meta_buf_77[] = {3874476,3856448,3890860,256,64,1};
int meta_buf_78[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_79[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_80[] = {3874476,3678208,4021932,256,64,576};
int meta_buf_81[] = {4021932,3857216,3874476,256,64,1};
int meta_buf_82[] = {3874476,3856576,3890860,256,64,1};
int meta_buf_83[] = {3890860,3857792,3874476,256,64,1};
int meta_buf_84[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_85[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_86[] = {3858092,3604480,4021932,256,64,576};
int meta_buf_87[] = {4021932,3857408,3858092,256,64,1};
int meta_buf_88[] = {3858092,3854336,3874476,256,64,1};
int meta_buf_89[] = {3874476,3855168,3890860,256,64,1};
int meta_buf_90[] = {3858092,4,16384,3890860,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_91[] = {3858092,3874476,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_92[] = {3874476,3493888,4021932,256,64,576};
int meta_buf_93[] = {4021932,3857088,3874476,256,64,1};
int meta_buf_94[] = {3874476,3857664,3890860,256,64,1};
int meta_buf_95[] = {3890860,3854720,3874476,256,64,1};
int meta_buf_96[] = {4005548,4,16384,3874476,3858092,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_97[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_98[] = {3858092,3383296,4021932,256,64,576};
int meta_buf_99[] = {4021932,3854592,3858092,256,64,1};
int meta_buf_100[] = {3858092,3855424,3874476,256,64,1};
int meta_buf_101[] = {3874476,3856128,3858092,256,64,1};
int meta_buf_102[] = {4021932,4,16384,3858092,4005548,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_103[] = {4021932,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_104[] = {3858092,3346432,4005548,256,64,576};
int meta_buf_105[] = {4005548,3856000,3858092,256,64,1};
int meta_buf_106[] = {3858092,3856768,3874476,256,64,1};
int meta_buf_107[] = {3874476,3857536,3858092,256,64,1};
int meta_buf_108[] = {4005548,4,16384,3858092,1,16384,1024,64,1,1,16,16,64};
int meta_buf_109[] = {4005548,3858092,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_110[] = {3858092,2867200,4005548,256,256,576};
int meta_buf_111[] = {4005548,3854016,3858092,256,256,1};
int meta_buf_112[] = {3858092,3923628,2,1,256,64,16,32,16,32};
int meta_buf_113[] = {3923628,3854656,3858092,1024,64,1};
int meta_buf_114[] = {3858092,3855616,3923628,1024,64,1};
int meta_buf_115[] = {3858092,4,65536,3923628,1,65536,2048,64,1,1,32,32,64};
int meta_buf_116[] = {3858092,4120236,1,64,32,32,32,32,3,3,1,1,1,1,1,1};
int meta_buf_117[] = {4120236,2719744,3858092,1024,256,576};
int meta_buf_118[] = {3858092,3853760,4120236,1024,256,1};
int meta_buf_119[] = {4120236,3858092,2,1,256,64,32,64,32,64};
int meta_buf_120[] = {3858092,3854400,4120236,4096,64,1};
int meta_buf_121[] = {4120236,3855296,3858092,4096,64,1};
int meta_buf_122[] = {6217388,4,262144,3858092,1,262144,4096,64,1,1,64,64,64};
int meta_buf_123[] = {6217388,3858092,1,64,64,64,64,64,3,3,1,1,1,1,1,1};
int meta_buf_124[] = {3858092,3014656,6217388,4096,256,576};
int meta_buf_125[] = {6217388,3853504,3858092,4096,256,1};
int meta_buf_126[] = {3858092,4906668,2,1,256,64,64,128,64,128};
int meta_buf_127[] = {4906668,3856384,3858092,16384,64,1};
int meta_buf_128[] = {3858092,3856960,4906668,16384,64,1};
int meta_buf_129[] = {3858092,4,1048576,4906668,1,1048576,8192,64,1,1,128,128,64};
int meta_buf_130[] = {3858092,4906668,1,64,128,128,128,128,9,9,1,1,1,1,4,4};
int meta_buf_131[] = {4906668,3837952,3858092,16384,3,5184};
int meta_buf_132[] = {3858092,3857920,3907244,16384,3,1};
int meta_buf_133[] = {3858092,4,49152,3907244,1,49152,384,3,1,1,128,128,3};
int* meta_buffers[] = {meta_buf_0,meta_buf_1,meta_buf_2,meta_buf_3,meta_buf_4,meta_buf_5,meta_buf_6,meta_buf_7,meta_buf_8,meta_buf_9,meta_buf_10,meta_buf_11,meta_buf_12,meta_buf_13,meta_buf_14,meta_buf_15,meta_buf_16,meta_buf_17,meta_buf_18,meta_buf_19,meta_buf_20,meta_buf_21,meta_buf_22,meta_buf_23,meta_buf_24,meta_buf_25,meta_buf_26,meta_buf_27,meta_buf_28,meta_buf_29,meta_buf_30,meta_buf_31,meta_buf_32,meta_buf_33,meta_buf_34,meta_buf_35,meta_buf_36,meta_buf_37,meta_buf_38,meta_buf_39,meta_buf_40,meta_buf_41,meta_buf_42,meta_buf_43,meta_buf_44,meta_buf_45,meta_buf_46,meta_buf_47,meta_buf_48,meta_buf_49,meta_buf_50,meta_buf_51,meta_buf_52,meta_buf_53,meta_buf_54,meta_buf_55,meta_buf_56,meta_buf_57,meta_buf_58,meta_buf_59,meta_buf_60,meta_buf_61,meta_buf_62,meta_buf_63,meta_buf_64,meta_buf_65,meta_buf_66,meta_buf_67,meta_buf_68,meta_buf_69,meta_buf_70,meta_buf_71,meta_buf_72,meta_buf_73,meta_buf_74,meta_buf_75,meta_buf_76,meta_buf_77,meta_buf_78,meta_buf_79,meta_buf_80,meta_buf_81,meta_buf_82,meta_buf_83,meta_buf_84,meta_buf_85,meta_buf_86,meta_buf_87,meta_buf_88,meta_buf_89,meta_buf_90,meta_buf_91,meta_buf_92,meta_buf_93,meta_buf_94,meta_buf_95,meta_buf_96,meta_buf_97,meta_buf_98,meta_buf_99,meta_buf_100,meta_buf_101,meta_buf_102,meta_buf_103,meta_buf_104,meta_buf_105,meta_buf_106,meta_buf_107,meta_buf_108,meta_buf_109,meta_buf_110,meta_buf_111,meta_buf_112,meta_buf_113,meta_buf_114,meta_buf_115,meta_buf_116,meta_buf_117,meta_buf_118,meta_buf_119,meta_buf_120,meta_buf_121,meta_buf_122,meta_buf_123,meta_buf_124,meta_buf_125,meta_buf_126,meta_buf_127,meta_buf_128,meta_buf_129,meta_buf_130,meta_buf_131,meta_buf_132,meta_buf_133};

extern "C" void init() {
    //static_buffer = (float*)malloc(89841324 * sizeof(float));
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


void im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(const int * meta_buffer)
{
    const float *im = (static_buffer + meta_buffer[0]);
    float *col = (static_buffer + meta_buffer[1]);

    const int N = meta_buffer[2];
    const int C1 = meta_buffer[3];
    const int H1 = meta_buffer[4];
    const int W1 = meta_buffer[5];
    const int H2 = meta_buffer[6];
    const int W2 = meta_buffer[7];
    const int KH = meta_buffer[8];
    const int KW = meta_buffer[9];
    const int DH = meta_buffer[10];
    const int DW = meta_buffer[11];
    const int SH = meta_buffer[12];
    const int SW = meta_buffer[13];
    const int PH = meta_buffer[14];
    const int PW = meta_buffer[15];

    for (int gid = 0; gid < N*H2*W2*KH*KW*C1; gid += 1) {
        const int c1 = gid % C1;
        const int kw = gid / C1 % KW;
        const int kh = gid / C1 / KW % KH;
        const int w2 = gid / C1 / KW / KH % W2;
        const int h2 = gid / C1 / KW / KH / W2 % H2;
        const int  n = gid / C1 / KW / KH / W2 / H2;
        
        const int h1 = h2 * SH - PH + kh * DH;
        const int w1 = w2 * SW - PW + kw * DW;

        col[gid] = (h1 < 0 || h1 >= H1 || w1 < 0 || w1 >= W1) ? 0 : im[((n*H1+h1)*W1+w1)*C1+c1];
    }
}


void elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(const int * meta_buffer)
{
    float *Y = (static_buffer + meta_buffer[0]);
    const int N = meta_buffer[2];

float y;
float x0, x1;
const float *X0 = (meta_buffer[3+2+ (0)] ? static_buffer : dynamic_buffer) + meta_buffer[3 + (0)];
const float *X1 = (meta_buffer[3+2+ (1)] ? static_buffer : dynamic_buffer) + meta_buffer[3 + (1)];
    
    for (int i = 0; i < N; i++)
    {



x0 = X0[i];
x1 = X1[i];

        {
y = x0 + x1;
        }

        Y[i] = y;
    }
}


void depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(const int * meta_buffer)
{
    const float *x = (static_buffer + meta_buffer[0]);
    float *y = (static_buffer + meta_buffer[1]);
    const int r = meta_buffer[2];

    const int N = meta_buffer[3];
    const int C1 = meta_buffer[4];
    const int C2 = meta_buffer[5];
    const int H1 = meta_buffer[6];
    const int H2 = meta_buffer[7];
    const int W1 = meta_buffer[8];
    const int W2 = meta_buffer[9];

    for (int gid = 0; gid < N*H2*W2*C2; gid += 1) {
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
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_7);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_8);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_9);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_10);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_11);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_12);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_13);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_14);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_15);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_16);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_17);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_18);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_19);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_20);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_21);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_22);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_23);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_24);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_25);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_26);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_27);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_28);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_29);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_30);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_31);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_32);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_33);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_34);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_35);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_36);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_37);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_38);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_39);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_40);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_41);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_42);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_43);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_44);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_45);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_46);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_47);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_48);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_49);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_50);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_51);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_52);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_53);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_54);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_55);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_56);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_57);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_58);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_59);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_60);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_61);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_62);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_63);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_64);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_65);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_66);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_67);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_68);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_69);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_70);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_71);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_72);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_73);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_74);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_75);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_76);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_77);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_78);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_79);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_80);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_81);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_82);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_83);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_84);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_85);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_86);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_87);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_88);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_89);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_90);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_91);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_92);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_93);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_94);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_95);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_96);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_97);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_98);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_99);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_100);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_101);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_102);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_103);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_104);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_105);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_106);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_107);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_108);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_109);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_110);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_111);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_112);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_113);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_114);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_115);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_116);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_117);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_118);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_119);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_120);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_121);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_122);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_123);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_124);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_125);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_126);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_127);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_128);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_129);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_130);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_131);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_132);
tanh_e53899afffbb30aa1d73708f084f35c47ffdde898e691bdd037dfa49(meta_buf_133);

}

