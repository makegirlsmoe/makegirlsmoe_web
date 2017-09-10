
#include <stdlib.h>
#include <math.h>

float static_buffer[90452905];
float* dynamic_buffer = nullptr;

int meta_buf_0[] = {90452739,0,7795459,1,16384,166};
int meta_buf_1[] = {2719744,2768896,2736128,2752512,7795459,7779075,16384};
int meta_buf_2[] = {7779075,7713539,16384};
int meta_buf_3[] = {7713539,7697155,256,64,64,256};
int meta_buf_4[] = {7697155,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_5[] = {7418627,2785280,7664387,256,64,576};
int meta_buf_6[] = {2822336,2822272,2822208,2822144,7664387,7697155,64,64,64,256};
int meta_buf_7[] = {7697155,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_8[] = {7418627,2822400,7697155,256,64,576};
int meta_buf_9[] = {2859264,2859328,2859456,2859392,7697155,7713539,7746307,64,256,256,64,256};
int meta_buf_10[] = {7746307,7713539,256,64,64,256};
int meta_buf_11[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_12[] = {7418627,2859520,7713539,256,64,576};
int meta_buf_13[] = {2896512,2896576,2896384,2896448,7713539,7729923,64,64,64,256};
int meta_buf_14[] = {7729923,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_15[] = {7418627,2896640,7779075,256,64,576};
int meta_buf_16[] = {2933504,2933568,2933696,2933632,7746307,7779075,7762691,256,64,256,64,256};
int meta_buf_17[] = {7762691,7795459,256,64,64,256};
int meta_buf_18[] = {7795459,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_19[] = {7418627,2933760,7664387,256,64,576};
int meta_buf_20[] = {2970624,2970752,2970688,2970816,7664387,7779075,64,64,64,256};
int meta_buf_21[] = {7779075,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_22[] = {7418627,2970880,7779075,256,64,576};
int meta_buf_23[] = {3007744,3007808,3007872,3007936,7779075,7762691,7697155,64,256,256,64,256};
int meta_buf_24[] = {7697155,7828227,256,64,64,256};
int meta_buf_25[] = {7828227,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_26[] = {7418627,3008000,7566083,256,64,576};
int meta_buf_27[] = {3045056,3044992,3044928,3044864,7566083,7631619,64,64,64,256};
int meta_buf_28[] = {7631619,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_29[] = {7418627,3045120,7598851,256,64,576};
int meta_buf_30[] = {3082048,3081984,3082176,3082112,7598851,7697155,7582467,64,256,256,64,256};
int meta_buf_31[] = {7582467,7615235,256,64,64,256};
int meta_buf_32[] = {7615235,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_33[] = {7418627,3082240,7631619,256,64,576};
int meta_buf_34[] = {3119104,3119296,3119168,3119232,7631619,7566083,64,64,64,256};
int meta_buf_35[] = {7566083,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_36[] = {7418627,3119360,7664387,256,64,576};
int meta_buf_37[] = {3156224,3156352,3156416,3156288,7664387,7582467,7631619,64,256,256,64,256};
int meta_buf_38[] = {7631619,7648003,256,64,64,256};
int meta_buf_39[] = {7648003,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_40[] = {7418627,3156480,7615235,256,64,576};
int meta_buf_41[] = {3193472,3193408,3193344,3193536,7615235,7598851,64,64,64,256};
int meta_buf_42[] = {7598851,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_43[] = {7418627,3193600,7648003,256,64,576};
int meta_buf_44[] = {3230656,3230464,3230528,3230592,7648003,7631619,7566083,64,256,256,64,256};
int meta_buf_45[] = {7566083,7631619,256,64,64,256};
int meta_buf_46[] = {7631619,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_47[] = {7418627,3230720,7648003,256,64,576};
int meta_buf_48[] = {3267776,3267712,3267648,3267584,7648003,7631619,64,64,64,256};
int meta_buf_49[] = {7631619,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_50[] = {7418627,3267840,7598851,256,64,576};
int meta_buf_51[] = {3304768,3304832,3304704,3304896,7598851,7566083,7631619,64,256,256,64,256};
int meta_buf_52[] = {7631619,7648003,256,64,64,256};
int meta_buf_53[] = {7648003,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_54[] = {7418627,3304960,7648003,256,64,576};
int meta_buf_55[] = {3341952,3342016,3341824,3341888,7648003,7664387,64,64,64,256};
int meta_buf_56[] = {7664387,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_57[] = {7418627,3342080,7582467,256,64,576};
int meta_buf_58[] = {3379136,3378944,3379072,3379008,7631619,7582467,7615235,256,64,256,64,256};
int meta_buf_59[] = {7615235,7648003,256,64,64,256};
int meta_buf_60[] = {7648003,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_61[] = {7418627,3379200,7598851,256,64,576};
int meta_buf_62[] = {3416064,3416128,3416192,3416256,7598851,7631619,64,64,64,256};
int meta_buf_63[] = {7631619,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_64[] = {7418627,3416320,7631619,256,64,576};
int meta_buf_65[] = {3453312,3453184,3453376,3453248,7631619,7615235,7566083,64,256,256,64,256};
int meta_buf_66[] = {7566083,7598851,256,64,64,256};
int meta_buf_67[] = {7598851,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_68[] = {7418627,3453440,7795459,256,64,576};
int meta_buf_69[] = {3490496,3490368,3490304,3490432,7795459,7713539,64,64,64,256};
int meta_buf_70[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_71[] = {7418627,3490560,7795459,256,64,576};
int meta_buf_72[] = {3527552,3527488,3527616,3527424,7795459,7566083,7697155,64,256,256,64,256};
int meta_buf_73[] = {7697155,7713539,256,64,64,256};
int meta_buf_74[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_75[] = {7418627,3527680,7811843,256,64,576};
int meta_buf_76[] = {3564544,3564672,3564608,3564736,7811843,7795459,64,64,64,256};
int meta_buf_77[] = {7795459,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_78[] = {7418627,3564800,7713539,256,64,576};
int meta_buf_79[] = {3601792,3601664,3601856,3601728,7697155,7713539,7779075,256,64,256,64,256};
int meta_buf_80[] = {7779075,7828227,256,64,64,256};
int meta_buf_81[] = {7828227,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_82[] = {7418627,3601920,7828227,256,64,576};
int meta_buf_83[] = {3638784,3638976,3638912,3638848,7828227,7713539,64,64,64,256};
int meta_buf_84[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_85[] = {7418627,3639040,7697155,256,64,576};
int meta_buf_86[] = {3676096,3676032,3675904,3675968,7779075,7697155,7680771,256,64,256,64,256};
int meta_buf_87[] = {7680771,7779075,256,64,64,256};
int meta_buf_88[] = {7779075,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_89[] = {7418627,3676160,7860995,256,64,576};
int meta_buf_90[] = {3713216,3713088,3713024,3713152,7860995,7713539,64,64,64,256};
int meta_buf_91[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_92[] = {7418627,3713280,7713539,256,64,576};
int meta_buf_93[] = {3750336,3750208,3750272,3750144,7680771,7713539,7664387,256,64,256,64,256};
int meta_buf_94[] = {7664387,7795459,256,64,64,256};
int meta_buf_95[] = {7795459,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_96[] = {7418627,3750400,7811843,256,64,576};
int meta_buf_97[] = {3787328,3787456,3787264,3787392,7811843,7697155,64,64,64,256};
int meta_buf_98[] = {7697155,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_99[] = {7418627,3787520,7697155,256,64,576};
int meta_buf_100[] = {3824576,3824384,3824448,3824512,7697155,7664387,7844611,64,256,256,64,256};
int meta_buf_101[] = {7844611,7697155,256,64,64,256};
int meta_buf_102[] = {7697155,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_103[] = {7418627,3824640,7828227,256,64,576};
int meta_buf_104[] = {3861632,3861568,3861696,3861504,7828227,7860995,64,64,64,256};
int meta_buf_105[] = {7860995,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_106[] = {7418627,3861760,7697155,256,64,576};
int meta_buf_107[] = {3898752,3898816,3898624,3898688,7697155,7844611,7713539,64,256,256,64,256};
int meta_buf_108[] = {7713539,7779075,256,64,64,256};
int meta_buf_109[] = {7779075,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_110[] = {7418627,3898880,7795459,256,64,576};
int meta_buf_111[] = {3935872,3935936,3935744,3935808,7795459,7811843,64,64,64,256};
int meta_buf_112[] = {7811843,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_113[] = {7418627,3936000,7811843,256,64,576};
int meta_buf_114[] = {3973056,3972992,3972928,3972864,7713539,7811843,7828227,256,64,64,64,256};
int meta_buf_115[] = {7828227,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_116[] = {7418627,3973120,7664387,256,64,576};
int meta_buf_117[] = {4009984,4010176,4010048,4010112,7664387,7713539,64,64,64,256};
int meta_buf_118[] = {7713539,7418627,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_119[] = {7418627,4010240,7566083,256,256,576};
int meta_buf_120[] = {4157696,7566083,7484163,256,256,256,256};
int meta_buf_121[] = {7484163,7418627,2,1,256,64,16,32,16,32};
int meta_buf_122[] = {4157952,4158016,4158080,7418627,7484163,64,64,64,1024};
int meta_buf_123[] = {7484163,6828803,1,64,32,32,32,32,3,3,1,1,1,1,1,1};
int meta_buf_124[] = {6828803,4158144,7418627,1024,256,576};
int meta_buf_125[] = {4305600,7418627,7090947,256,256,256,1024};
int meta_buf_126[] = {7090947,6828803,2,1,256,64,32,64,32,64};
int meta_buf_127[] = {4305984,4305856,4305920,6828803,7090947,64,64,64,4096};
int meta_buf_128[] = {7090947,4469507,1,64,64,64,64,64,3,3,1,1,1,1,1,1};
int meta_buf_129[] = {4469507,4306048,6828803,4096,256,576};
int meta_buf_130[] = {4453504,6828803,5518083,256,256,256,4096};
int meta_buf_131[] = {5518083,4469507,2,1,256,64,64,128,64,128};
int meta_buf_132[] = {4453760,4453824,4453888,4469507,89404163,64,64,64,16384};
int meta_buf_133[] = {89404163,4469507,1,64,128,128,128,128,9,9,1,1,1,1,4,4};
int meta_buf_134[] = {4469507,4453952,89404163,16384,3,5184};
int meta_buf_135[] = {4469504,89404163,7566083,3,16384,3,16384};
int* meta_buffers[] = {meta_buf_0,meta_buf_1,meta_buf_2,meta_buf_3,meta_buf_4,meta_buf_5,meta_buf_6,meta_buf_7,meta_buf_8,meta_buf_9,meta_buf_10,meta_buf_11,meta_buf_12,meta_buf_13,meta_buf_14,meta_buf_15,meta_buf_16,meta_buf_17,meta_buf_18,meta_buf_19,meta_buf_20,meta_buf_21,meta_buf_22,meta_buf_23,meta_buf_24,meta_buf_25,meta_buf_26,meta_buf_27,meta_buf_28,meta_buf_29,meta_buf_30,meta_buf_31,meta_buf_32,meta_buf_33,meta_buf_34,meta_buf_35,meta_buf_36,meta_buf_37,meta_buf_38,meta_buf_39,meta_buf_40,meta_buf_41,meta_buf_42,meta_buf_43,meta_buf_44,meta_buf_45,meta_buf_46,meta_buf_47,meta_buf_48,meta_buf_49,meta_buf_50,meta_buf_51,meta_buf_52,meta_buf_53,meta_buf_54,meta_buf_55,meta_buf_56,meta_buf_57,meta_buf_58,meta_buf_59,meta_buf_60,meta_buf_61,meta_buf_62,meta_buf_63,meta_buf_64,meta_buf_65,meta_buf_66,meta_buf_67,meta_buf_68,meta_buf_69,meta_buf_70,meta_buf_71,meta_buf_72,meta_buf_73,meta_buf_74,meta_buf_75,meta_buf_76,meta_buf_77,meta_buf_78,meta_buf_79,meta_buf_80,meta_buf_81,meta_buf_82,meta_buf_83,meta_buf_84,meta_buf_85,meta_buf_86,meta_buf_87,meta_buf_88,meta_buf_89,meta_buf_90,meta_buf_91,meta_buf_92,meta_buf_93,meta_buf_94,meta_buf_95,meta_buf_96,meta_buf_97,meta_buf_98,meta_buf_99,meta_buf_100,meta_buf_101,meta_buf_102,meta_buf_103,meta_buf_104,meta_buf_105,meta_buf_106,meta_buf_107,meta_buf_108,meta_buf_109,meta_buf_110,meta_buf_111,meta_buf_112,meta_buf_113,meta_buf_114,meta_buf_115,meta_buf_116,meta_buf_117,meta_buf_118,meta_buf_119,meta_buf_120,meta_buf_121,meta_buf_122,meta_buf_123,meta_buf_124,meta_buf_125,meta_buf_126,meta_buf_127,meta_buf_128,meta_buf_129,meta_buf_130,meta_buf_131,meta_buf_132,meta_buf_133,meta_buf_134,meta_buf_135};

extern "C" void init() {
    //static_buffer = (float*)malloc(90452905 * sizeof(float));
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


void fusedelementwise_39aed4dfa4a3d5653f205058232863d38ee4786baeaff59ec4047ef6(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int D0 = meta_buffer[6];
    int d0;
    for (d0 = 0; d0 < D0; d0 += 1) {
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


void reshape_f6c88dc1fd9479f62d789912530e6a5c7c51c73de368540e8b8e1ceb(const int * meta_buffer )
{
    const float *x = (static_buffer + meta_buffer[0]);
    float *y = (static_buffer + meta_buffer[1]);

    const int N = meta_buffer[2];

    for (int gid = 0; gid < N; gid += 1) {
        y[gid] = x[gid];
    }
}


void transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    float * v2 = (static_buffer + meta_buffer[1]);
    const int v3 = meta_buffer[2];
    const int v4 = meta_buffer[3];
    const int D0 = meta_buffer[4];
    const int D1 = meta_buffer[5];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v5 = v1[d0*v3 + d1];
            float v6;
            {
                v6 = v5;
            }
            v2[d0 + d1*v4] = v6;
        }
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


void fusedelementwise_d7fa6f8db61cb75038712c228d23506fff45e14e0137bc12681bb0ed(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v11;
            }
            float v16;
            {
                v16 = v15 + v10;
            }
            float v17;
            {
                v17 = v16 + v12;
            }
            float v18;
            {
                v18 = v17 + v9;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_afb3e9565921dcf87244a9004fe03db5e5e8fa40efb8bf946088dd81(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v12;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_271a92694c080c4d0316a5e2450199c686596d4de0596dd3ccf86f47(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v12;
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
                v18 = v17 + v10;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_9d7e37e7fb9e28bc12dff521b48f12cc5696695e7355307223038bff(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v12;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_142103ceb134072dd41da9531ca331dac9098467b514144f72265aaa(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v11;
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
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_08c6de0d9e3898bb5003f2280b8bf88acd4f6986a54a9da5f2712e79(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v12;
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
                v20 = v19 + v14;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_02cde58bf601bbf164d56cbd01d26cc5db9539d6e24d2301261c3d87(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v11;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_1a6c448fe359db17e3b64a3ef36325fcf7902ef13a6e0dff7bee1c1e(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v11;
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
                v18 = v17 + v10;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_f21a927c18fa0bd89f485cdb75e3e5d62259363e06cd6c2e5feab764(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v11;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_3b925ac08a18a911811ac5eb5027a4f916b33e87a1061bf6c4f5d7bd(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v10;
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
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_82ca90363a6b1fb0c2c1daec56eb03bb83ad942fadd23af68dc41316(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v13;
            }
            float v18;
            {
                v18 = v17 + v14;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            float v20;
            {
                v20 = v19 + v11;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_231ba2c778c62fe609c93f0c624dc3ba33713850ef32e041945c711c(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v11;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v13;
            }
            float v20;
            {
                v20 = v19 + v14;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_6a02c6cb2915d14666fd2c0a83876b9a9d5dec92d627af871231a70c(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v13;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            float v20;
            {
                v20 = v19 + v11;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_051e60f843bbbfede689ec262b3075fdca1607476979093ac1f8ec46(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v10;
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
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_8282850f4d22826b588f64e617407070fb9d6c751966cea24702bdc7(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_fcee812311ba892fab97c60d0c20489771644f55bfaa168270a14a97(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v10;
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
                v18 = v17 + v9;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_f1418f66d45060042b2fa97d63ae84cf3d07c4b8c3527516144b5144(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v12;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_3aa83a10b0e5ddbaa60c3d301ae5be84c2dbf6253beb95b60afd706c(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v12;
            }
            float v20;
            {
                v20 = v19 + v13;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_9cbbc9bd350bd5bd8b9be82d74d28bba5584b94328ef070ea7917976(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v12;
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
                v18 = v17 + v10;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_916418b94669e1cda727ef3accd1542ee730c69f2b7967c6ccf1b96e(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v13;
            }
            float v20;
            {
                v20 = v19 + v11;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_3736faf8adaa28d23efaff99fe06cde479b49886c7b6612594fc2c8c(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v13;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            float v20;
            {
                v20 = v19 + v12;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_765756e61a6f81057738fa6aca11dca493316631eadd838da12d736f(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v9;
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
                v18 = v17 + v10;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_1b2a86a5737a2dc404c7b93d12779088ab8a624d35ae75cd3caa2c05(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    float * v6 = (static_buffer + meta_buffer[5]);
    const int v7 = meta_buffer[6];
    const int v8 = meta_buffer[7];
    const int D0 = meta_buffer[8];
    const int D1 = meta_buffer[9];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v9 = v1[d0];
        const float v10 = v2[d0];
        const float v11 = v3[d0];
        const float v12 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v13 = v5[d0 + d1*v7];
            float v14;
            {
                v14 = v13;
            }
            float v15;
            {
                v15 = v14 * v10;
            }
            float v16;
            {
                v16 = v15 + v9;
            }
            float v17;
            {
                v17 = v16 + v12;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 > 0 ? v18 : 0;
            }
            float v20;
            {
                v20 = v19;
            }
            v6[d0 + d1*v8] = v20;
        }
    }
}


void fusedelementwise_91dfe919a8b8a10c9bc04c09f258304484ed83456698fb66fcec38e9(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v5[d0 + d1*v8];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v14;
            }
            float v18;
            {
                v18 = v17 + v11;
            }
            float v19;
            {
                v19 = v18 + v13;
            }
            float v20;
            {
                v20 = v19 + v12;
            }
            const float v21 = v6[d0*v9 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            v7[d0*v10 + d1] = v22;
        }
    }
}


void fusedelementwise_6fa0fed6f9d45e9078c32d9a2a2f9770176588c5d184feece2771fc1(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    const float * v5 = (static_buffer + meta_buffer[4]);
    const float * v6 = (static_buffer + meta_buffer[5]);
    float * v7 = (static_buffer + meta_buffer[6]);
    const int v8 = meta_buffer[7];
    const int v9 = meta_buffer[8];
    const int v10 = meta_buffer[9];
    const int D0 = meta_buffer[10];
    const int D1 = meta_buffer[11];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v11 = v1[d0];
        const float v12 = v2[d0];
        const float v13 = v3[d0];
        const float v14 = v4[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v15 = v6[d0 + d1*v9];
            float v16;
            {
                v16 = v15;
            }
            float v17;
            {
                v17 = v16 * v13;
            }
            float v18;
            {
                v18 = v17 + v12;
            }
            float v19;
            {
                v19 = v18 + v14;
            }
            float v20;
            {
                v20 = v19 + v11;
            }
            const float v21 = v5[d0*v8 + d1];
            float v22;
            {
                v22 = v20 + v21;
            }
            float v23;
            {
                v23 = v22;
            }
            v7[d0 + d1*v10] = v23;
        }
    }
}


void fusedelementwise_24b8a34bb72e8c951eb84d658a3def8f92d5d5626d9be984a0a08bdf(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    float * v3 = (static_buffer + meta_buffer[2]);
    const int v4 = meta_buffer[3];
    const int v5 = meta_buffer[4];
    const int D0 = meta_buffer[5];
    const int D1 = meta_buffer[6];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v6 = v1[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v7 = v2[d0 + d1*v4];
            float v8;
            {
                v8 = v7;
            }
            float v9;
            {
                v9 = v8 + v6;
            }
            float v10;
            {
                v10 = v9;
            }
            v3[d0 + d1*v5] = v10;
        }
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


void fusedelementwise_1c8ec28459c1ac28890f13ccccca41d512b5d28f186a465b7861120e(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    float * v5 = (static_buffer + meta_buffer[4]);
    const int v6 = meta_buffer[5];
    const int v7 = meta_buffer[6];
    const int D0 = meta_buffer[7];
    const int D1 = meta_buffer[8];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v8 = v1[d0];
        const float v9 = v2[d0];
        const float v10 = v3[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v11 = v4[d0 + d1*v6];
            float v12;
            {
                v12 = v11;
            }
            float v13;
            {
                v13 = v12 * v9;
            }
            float v14;
            {
                v14 = v13 + v8;
            }
            float v15;
            {
                v15 = v14 + v10;
            }
            float v16;
            {
                v16 = v15 > 0 ? v15 : 0;
            }
            float v17;
            {
                v17 = v16;
            }
            v5[d0 + d1*v7] = v17;
        }
    }
}


void fusedelementwise_3e2637ba3fe281fc3fed0ab8a18b3b33a5d0207e854c76f231ce18f6(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    const float * v3 = (static_buffer + meta_buffer[2]);
    const float * v4 = (static_buffer + meta_buffer[3]);
    float * v5 = (static_buffer + meta_buffer[4]);
    const int v6 = meta_buffer[5];
    const int v7 = meta_buffer[6];
    const int D0 = meta_buffer[7];
    const int D1 = meta_buffer[8];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v8 = v1[d0];
        const float v9 = v2[d0];
        const float v10 = v3[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v11 = v4[d0 + d1*v6];
            float v12;
            {
                v12 = v11;
            }
            float v13;
            {
                v13 = v12 * v10;
            }
            float v14;
            {
                v14 = v13 + v9;
            }
            float v15;
            {
                v15 = v14 + v8;
            }
            float v16;
            {
                v16 = v15 > 0 ? v15 : 0;
            }
            float v17;
            {
                v17 = v16;
            }
            v5[d0 + d1*v7] = v17;
        }
    }
}


void fusedelementwise_cea8f9810bcf9588942a7d0f6e1c023ad31dc8f4cfbb942fb0fa751a(const int * meta_buffer)
{
    const float * v1 = (static_buffer + meta_buffer[0]);
    const float * v2 = (static_buffer + meta_buffer[1]);
    float * v3 = (static_buffer + meta_buffer[2]);
    const int v4 = meta_buffer[3];
    const int v5 = meta_buffer[4];
    const int D0 = meta_buffer[5];
    const int D1 = meta_buffer[6];
    int d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        const float v6 = v1[d0];
        int d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            const float v7 = v2[d0 + d1*v4];
            float v8;
            {
                v8 = v7;
            }
            float v9;
            {
                v9 = v8 + v6;
            }
            float v10;
            {
                v10 = tanh(v9);
            }
            v3[d0*v5 + d1] = v10;
        }
    }
}

extern "C" void run() {
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_0);
fusedelementwise_39aed4dfa4a3d5653f205058232863d38ee4786baeaff59ec4047ef6(meta_buf_1);
reshape_f6c88dc1fd9479f62d789912530e6a5c7c51c73de368540e8b8e1ceb(meta_buf_2);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_3);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_4);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_5);
fusedelementwise_d7fa6f8db61cb75038712c228d23506fff45e14e0137bc12681bb0ed(meta_buf_6);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_7);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_8);
fusedelementwise_afb3e9565921dcf87244a9004fe03db5e5e8fa40efb8bf946088dd81(meta_buf_9);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_10);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_11);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_12);
fusedelementwise_271a92694c080c4d0316a5e2450199c686596d4de0596dd3ccf86f47(meta_buf_13);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_14);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_15);
fusedelementwise_9d7e37e7fb9e28bc12dff521b48f12cc5696695e7355307223038bff(meta_buf_16);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_17);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_18);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_19);
fusedelementwise_142103ceb134072dd41da9531ca331dac9098467b514144f72265aaa(meta_buf_20);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_21);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_22);
fusedelementwise_08c6de0d9e3898bb5003f2280b8bf88acd4f6986a54a9da5f2712e79(meta_buf_23);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_24);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_25);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_26);
fusedelementwise_d7fa6f8db61cb75038712c228d23506fff45e14e0137bc12681bb0ed(meta_buf_27);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_28);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_29);
fusedelementwise_02cde58bf601bbf164d56cbd01d26cc5db9539d6e24d2301261c3d87(meta_buf_30);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_31);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_32);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_33);
fusedelementwise_1a6c448fe359db17e3b64a3ef36325fcf7902ef13a6e0dff7bee1c1e(meta_buf_34);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_35);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_36);
fusedelementwise_f21a927c18fa0bd89f485cdb75e3e5d62259363e06cd6c2e5feab764(meta_buf_37);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_38);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_39);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_40);
fusedelementwise_3b925ac08a18a911811ac5eb5027a4f916b33e87a1061bf6c4f5d7bd(meta_buf_41);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_42);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_43);
fusedelementwise_82ca90363a6b1fb0c2c1daec56eb03bb83ad942fadd23af68dc41316(meta_buf_44);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_45);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_46);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_47);
fusedelementwise_d7fa6f8db61cb75038712c228d23506fff45e14e0137bc12681bb0ed(meta_buf_48);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_49);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_50);
fusedelementwise_231ba2c778c62fe609c93f0c624dc3ba33713850ef32e041945c711c(meta_buf_51);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_52);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_53);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_54);
fusedelementwise_271a92694c080c4d0316a5e2450199c686596d4de0596dd3ccf86f47(meta_buf_55);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_56);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_57);
fusedelementwise_6a02c6cb2915d14666fd2c0a83876b9a9d5dec92d627af871231a70c(meta_buf_58);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_59);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_60);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_61);
fusedelementwise_051e60f843bbbfede689ec262b3075fdca1607476979093ac1f8ec46(meta_buf_62);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_63);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_64);
fusedelementwise_8282850f4d22826b588f64e617407070fb9d6c751966cea24702bdc7(meta_buf_65);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_66);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_67);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_68);
fusedelementwise_fcee812311ba892fab97c60d0c20489771644f55bfaa168270a14a97(meta_buf_69);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_70);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_71);
fusedelementwise_f1418f66d45060042b2fa97d63ae84cf3d07c4b8c3527516144b5144(meta_buf_72);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_73);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_74);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_75);
fusedelementwise_142103ceb134072dd41da9531ca331dac9098467b514144f72265aaa(meta_buf_76);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_77);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_78);
fusedelementwise_3aa83a10b0e5ddbaa60c3d301ae5be84c2dbf6253beb95b60afd706c(meta_buf_79);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_80);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_81);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_82);
fusedelementwise_9cbbc9bd350bd5bd8b9be82d74d28bba5584b94328ef070ea7917976(meta_buf_83);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_84);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_85);
fusedelementwise_916418b94669e1cda727ef3accd1542ee730c69f2b7967c6ccf1b96e(meta_buf_86);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_87);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_88);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_89);
fusedelementwise_271a92694c080c4d0316a5e2450199c686596d4de0596dd3ccf86f47(meta_buf_90);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_91);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_92);
fusedelementwise_3736faf8adaa28d23efaff99fe06cde479b49886c7b6612594fc2c8c(meta_buf_93);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_94);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_95);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_96);
fusedelementwise_765756e61a6f81057738fa6aca11dca493316631eadd838da12d736f(meta_buf_97);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_98);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_99);
fusedelementwise_82ca90363a6b1fb0c2c1daec56eb03bb83ad942fadd23af68dc41316(meta_buf_100);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_101);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_102);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_103);
fusedelementwise_1b2a86a5737a2dc404c7b93d12779088ab8a624d35ae75cd3caa2c05(meta_buf_104);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_105);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_106);
fusedelementwise_91dfe919a8b8a10c9bc04c09f258304484ed83456698fb66fcec38e9(meta_buf_107);
transpose_3ede431373fd6b14a21ca5a7f2fab289eb4c42220e346f22acc816e8(meta_buf_108);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_109);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_110);
fusedelementwise_271a92694c080c4d0316a5e2450199c686596d4de0596dd3ccf86f47(meta_buf_111);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_112);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_113);
fusedelementwise_6fa0fed6f9d45e9078c32d9a2a2f9770176588c5d184feece2771fc1(meta_buf_114);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_115);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_116);
fusedelementwise_1a6c448fe359db17e3b64a3ef36325fcf7902ef13a6e0dff7bee1c1e(meta_buf_117);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_118);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_119);
fusedelementwise_24b8a34bb72e8c951eb84d658a3def8f92d5d5626d9be984a0a08bdf(meta_buf_120);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_121);
fusedelementwise_1c8ec28459c1ac28890f13ccccca41d512b5d28f186a465b7861120e(meta_buf_122);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_123);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_124);
fusedelementwise_24b8a34bb72e8c951eb84d658a3def8f92d5d5626d9be984a0a08bdf(meta_buf_125);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_126);
fusedelementwise_3e2637ba3fe281fc3fed0ab8a18b3b33a5d0207e854c76f231ce18f6(meta_buf_127);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_128);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_129);
fusedelementwise_24b8a34bb72e8c951eb84d658a3def8f92d5d5626d9be984a0a08bdf(meta_buf_130);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_131);
fusedelementwise_1c8ec28459c1ac28890f13ccccca41d512b5d28f186a465b7861120e(meta_buf_132);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_133);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_134);
fusedelementwise_cea8f9810bcf9588942a7d0f6e1c023ad31dc8f4cfbb942fb0fa751a(meta_buf_135);

}

