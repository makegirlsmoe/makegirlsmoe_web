
#include <stdlib.h>
#include <math.h>

float static_buffer[90368680];
float* dynamic_buffer = nullptr;

int meta_buf_0[] = {4385284,0,4385448,1,16384,162};
int meta_buf_1[] = {4385448,4313088,4401832,1,16384,1};
int meta_buf_2[] = {4401832,4345856,4385448,1,16384,1};
int meta_buf_3[] = {4385448,4329472,4401832,1,16384,1};
int meta_buf_4[] = {4385448,2,16384,4401832,1,16384,1,1,16384};
int meta_buf_5[] = {4385448,4401832,16384};
int meta_buf_6[] = {4385448,4,16384,4401832,1,16384,1,1024,64,1,64,16,16};
int meta_buf_7[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_8[] = {4401832,4165632,4549288,256,64,576};
int meta_buf_9[] = {4549288,4384768,4401832,256,64,1};
int meta_buf_10[] = {4401832,4385088,4418216,256,64,1};
int meta_buf_11[] = {4418216,4384896,4401832,256,64,1};
int meta_buf_12[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_13[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_14[] = {4401832,4239360,4549288,256,64,576};
int meta_buf_15[] = {4549288,4385152,4401832,256,64,1};
int meta_buf_16[] = {4401832,4381120,4418216,256,64,1};
int meta_buf_17[] = {4418216,4380864,4401832,256,64,1};
int meta_buf_18[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_19[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_20[] = {4385448,3207168,4549288,256,64,576};
int meta_buf_21[] = {4549288,4379264,4385448,256,64,1};
int meta_buf_22[] = {4385448,4378560,4401832,256,64,1};
int meta_buf_23[] = {4401832,4379392,4385448,256,64,1};
int meta_buf_24[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_25[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_26[] = {4385448,3244032,4549288,256,64,576};
int meta_buf_27[] = {4549288,4384128,4385448,256,64,1};
int meta_buf_28[] = {4385448,4384320,4401832,256,64,1};
int meta_buf_29[] = {4401832,4384448,4418216,256,64,1};
int meta_buf_30[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_31[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_32[] = {4401832,3796992,4549288,256,64,576};
int meta_buf_33[] = {4549288,4380608,4401832,256,64,1};
int meta_buf_34[] = {4401832,4381760,4418216,256,64,1};
int meta_buf_35[] = {4418216,4380800,4401832,256,64,1};
int meta_buf_36[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_37[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_38[] = {4401832,3538944,4549288,256,64,576};
int meta_buf_39[] = {4549288,4380928,4401832,256,64,1};
int meta_buf_40[] = {4401832,4381056,4418216,256,64,1};
int meta_buf_41[] = {4418216,4381248,4401832,256,64,1};
int meta_buf_42[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_43[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_44[] = {4385448,3649536,4549288,256,64,576};
int meta_buf_45[] = {4549288,4381568,4385448,256,64,1};
int meta_buf_46[] = {4385448,4381888,4401832,256,64,1};
int meta_buf_47[] = {4401832,4384704,4385448,256,64,1};
int meta_buf_48[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_49[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_50[] = {4385448,3723264,4549288,256,64,576};
int meta_buf_51[] = {4549288,4382080,4385448,256,64,1};
int meta_buf_52[] = {4385448,4382208,4401832,256,64,1};
int meta_buf_53[] = {4401832,4378624,4418216,256,64,1};
int meta_buf_54[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_55[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_56[] = {4401832,4091904,4549288,256,64,576};
int meta_buf_57[] = {4549288,4383872,4401832,256,64,1};
int meta_buf_58[] = {4401832,4383424,4418216,256,64,1};
int meta_buf_59[] = {4418216,4379520,4401832,256,64,1};
int meta_buf_60[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_61[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_62[] = {4401832,3612672,4549288,256,64,576};
int meta_buf_63[] = {4549288,4378752,4401832,256,64,1};
int meta_buf_64[] = {4401832,4381696,4418216,256,64,1};
int meta_buf_65[] = {4418216,4381824,4401832,256,64,1};
int meta_buf_66[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_67[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_68[] = {4385448,3133440,4549288,256,64,576};
int meta_buf_69[] = {4549288,4378944,4385448,256,64,1};
int meta_buf_70[] = {4385448,4381440,4401832,256,64,1};
int meta_buf_71[] = {4401832,4379008,4385448,256,64,1};
int meta_buf_72[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_73[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_74[] = {4385448,3833856,4549288,256,64,576};
int meta_buf_75[] = {4549288,4382016,4385448,256,64,1};
int meta_buf_76[] = {4385448,4379328,4401832,256,64,1};
int meta_buf_77[] = {4401832,4382272,4418216,256,64,1};
int meta_buf_78[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_79[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_80[] = {4401832,3465216,4549288,256,64,576};
int meta_buf_81[] = {4549288,4380416,4401832,256,64,1};
int meta_buf_82[] = {4401832,4381504,4418216,256,64,1};
int meta_buf_83[] = {4418216,4380480,4401832,256,64,1};
int meta_buf_84[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_85[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_86[] = {4401832,3502080,4549288,256,64,576};
int meta_buf_87[] = {4549288,4380544,4401832,256,64,1};
int meta_buf_88[] = {4401832,4380736,4418216,256,64,1};
int meta_buf_89[] = {4418216,4384512,4401832,256,64,1};
int meta_buf_90[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_91[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_92[] = {4385448,3981312,4549288,256,64,576};
int meta_buf_93[] = {4549288,4382848,4385448,256,64,1};
int meta_buf_94[] = {4385448,4383168,4401832,256,64,1};
int meta_buf_95[] = {4401832,4383104,4385448,256,64,1};
int meta_buf_96[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_97[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_98[] = {4385448,4018176,4549288,256,64,576};
int meta_buf_99[] = {4549288,4383488,4385448,256,64,1};
int meta_buf_100[] = {4385448,4383616,4401832,256,64,1};
int meta_buf_101[] = {4401832,4381312,4418216,256,64,1};
int meta_buf_102[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_103[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_104[] = {4401832,3575808,4549288,256,64,576};
int meta_buf_105[] = {4549288,4380672,4401832,256,64,1};
int meta_buf_106[] = {4401832,4380992,4418216,256,64,1};
int meta_buf_107[] = {4418216,4381184,4401832,256,64,1};
int meta_buf_108[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_109[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_110[] = {4401832,4276224,4549288,256,64,576};
int meta_buf_111[] = {4549288,4381376,4401832,256,64,1};
int meta_buf_112[] = {4401832,4384640,4418216,256,64,1};
int meta_buf_113[] = {4418216,4384064,4401832,256,64,1};
int meta_buf_114[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_115[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_116[] = {4385448,3686400,4549288,256,64,576};
int meta_buf_117[] = {4549288,4381632,4385448,256,64,1};
int meta_buf_118[] = {4385448,4385024,4401832,256,64,1};
int meta_buf_119[] = {4401832,4381952,4385448,256,64,1};
int meta_buf_120[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_121[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_122[] = {4385448,3760128,4549288,256,64,576};
int meta_buf_123[] = {4549288,4382144,4385448,256,64,1};
int meta_buf_124[] = {4385448,4382336,4401832,256,64,1};
int meta_buf_125[] = {4401832,4378688,4418216,256,64,1};
int meta_buf_126[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_127[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_128[] = {4401832,3170304,4549288,256,64,576};
int meta_buf_129[] = {4549288,4379456,4401832,256,64,1};
int meta_buf_130[] = {4401832,4379840,4418216,256,64,1};
int meta_buf_131[] = {4418216,4380032,4401832,256,64,1};
int meta_buf_132[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_133[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_134[] = {4401832,3096576,4549288,256,64,576};
int meta_buf_135[] = {4549288,4379072,4401832,256,64,1};
int meta_buf_136[] = {4401832,4379584,4418216,256,64,1};
int meta_buf_137[] = {4418216,4384576,4401832,256,64,1};
int meta_buf_138[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_139[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_140[] = {4385448,3280896,4549288,256,64,576};
int meta_buf_141[] = {4549288,4379648,4385448,256,64,1};
int meta_buf_142[] = {4385448,4379200,4401832,256,64,1};
int meta_buf_143[] = {4401832,4379904,4385448,256,64,1};
int meta_buf_144[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_145[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_146[] = {4385448,3354624,4549288,256,64,576};
int meta_buf_147[] = {4549288,4380096,4385448,256,64,1};
int meta_buf_148[] = {4385448,4383744,4401832,256,64,1};
int meta_buf_149[] = {4401832,4383552,4418216,256,64,1};
int meta_buf_150[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_151[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_152[] = {4401832,4128768,4549288,256,64,576};
int meta_buf_153[] = {4549288,4384192,4401832,256,64,1};
int meta_buf_154[] = {4401832,4383040,4418216,256,64,1};
int meta_buf_155[] = {4418216,4382976,4401832,256,64,1};
int meta_buf_156[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_157[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_158[] = {4401832,3870720,4549288,256,64,576};
int meta_buf_159[] = {4549288,4382464,4401832,256,64,1};
int meta_buf_160[] = {4401832,4380352,4418216,256,64,1};
int meta_buf_161[] = {4418216,4380160,4401832,256,64,1};
int meta_buf_162[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_163[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_164[] = {4385448,3317760,4549288,256,64,576};
int meta_buf_165[] = {4549288,4379712,4385448,256,64,1};
int meta_buf_166[] = {4385448,4384960,4401832,256,64,1};
int meta_buf_167[] = {4401832,4385216,4385448,256,64,1};
int meta_buf_168[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_169[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_170[] = {4385448,4202496,4549288,256,64,576};
int meta_buf_171[] = {4549288,4384000,4385448,256,64,1};
int meta_buf_172[] = {4385448,4382912,4401832,256,64,1};
int meta_buf_173[] = {4401832,4382656,4418216,256,64,1};
int meta_buf_174[] = {4385448,4,16384,4418216,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_175[] = {4385448,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_176[] = {4401832,3907584,4549288,256,64,576};
int meta_buf_177[] = {4549288,4382528,4401832,256,64,1};
int meta_buf_178[] = {4401832,4382400,4418216,256,64,1};
int meta_buf_179[] = {4418216,4380288,4401832,256,64,1};
int meta_buf_180[] = {4549288,4,16384,4401832,1,16384,1024,64,1,1,16,16,64};
int meta_buf_181[] = {4549288,4401832,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_182[] = {4401832,3391488,4549288,256,64,576};
int meta_buf_183[] = {4549288,4379968,4401832,256,64,1};
int meta_buf_184[] = {4401832,4384832,4418216,256,64,1};
int meta_buf_185[] = {4418216,4384384,4401832,256,64,1};
int meta_buf_186[] = {4532904,4,16384,4401832,4385448,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_187[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_188[] = {4385448,4055040,4549288,256,64,576};
int meta_buf_189[] = {4549288,4383360,4385448,256,64,1};
int meta_buf_190[] = {4385448,4383680,4401832,256,64,1};
int meta_buf_191[] = {4401832,4383296,4385448,256,64,1};
int meta_buf_192[] = {4549288,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_193[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_194[] = {4385448,3944448,4549288,256,64,576};
int meta_buf_195[] = {4549288,4382592,4385448,256,64,1};
int meta_buf_196[] = {4385448,4380224,4401832,256,64,1};
int meta_buf_197[] = {4401832,4379776,4385448,256,64,1};
int meta_buf_198[] = {4549288,4,16384,4385448,4532904,1,1,16384,1024,64,1,16384,1024,64,1,1,16,16,64,1,16,16,64};
int meta_buf_199[] = {4549288,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_200[] = {4385448,3428352,4532904,256,64,576};
int meta_buf_201[] = {4532904,4382784,4385448,256,64,1};
int meta_buf_202[] = {4385448,4382720,4401832,256,64,1};
int meta_buf_203[] = {4401832,4383936,4385448,256,64,1};
int meta_buf_204[] = {4532904,4,16384,4385448,1,16384,1024,64,1,1,16,16,64};
int meta_buf_205[] = {4532904,4385448,1,64,16,16,16,16,3,3,1,1,1,1,1,1};
int meta_buf_206[] = {4385448,2654208,4532904,256,256,576};
int meta_buf_207[] = {4532904,4377792,4385448,256,256,1};
int meta_buf_208[] = {4385448,4450984,2,1,256,64,16,32,16,32};
int meta_buf_209[] = {4450984,4378816,4385448,1024,64,1};
int meta_buf_210[] = {4385448,4379136,4450984,1024,64,1};
int meta_buf_211[] = {4385448,4,65536,4450984,1,65536,2048,64,1,1,32,32,64};
int meta_buf_212[] = {4385448,4647592,1,64,32,32,32,32,3,3,1,1,1,1,1,1};
int meta_buf_213[] = {4647592,2801664,4385448,1024,256,576};
int meta_buf_214[] = {4385448,4378048,4647592,1024,256,1};
int meta_buf_215[] = {4647592,4385448,2,1,256,64,32,64,32,64};
int meta_buf_216[] = {4385448,4378880,4647592,4096,64,1};
int meta_buf_217[] = {4647592,4383232,4385448,4096,64,1};
int meta_buf_218[] = {6744744,4,262144,4385448,1,262144,4096,64,1,1,64,64,64};
int meta_buf_219[] = {6744744,4385448,1,64,64,64,64,64,3,3,1,1,1,1,1,1};
int meta_buf_220[] = {4385448,2949120,6744744,4096,256,576};
int meta_buf_221[] = {6744744,4378304,4385448,4096,256,1};
int meta_buf_222[] = {4385448,5434024,2,1,256,64,64,128,64,128};
int meta_buf_223[] = {5434024,4383808,4385448,16384,64,1};
int meta_buf_224[] = {4385448,4384256,5434024,16384,64,1};
int meta_buf_225[] = {4385448,4,1048576,5434024,1,1048576,8192,64,1,1,128,128,64};
int meta_buf_226[] = {4385448,5434024,1,64,128,128,128,128,9,9,1,1,1,1,4,4};
int meta_buf_227[] = {5434024,4362240,4385448,16384,3,5184};
int meta_buf_228[] = {4385448,4385280,4434600,16384,3,1};
int meta_buf_229[] = {4385448,4,49152,4434600,1,49152,384,3,1,1,128,128,3};
int* meta_buffers[] = {meta_buf_0,meta_buf_1,meta_buf_2,meta_buf_3,meta_buf_4,meta_buf_5,meta_buf_6,meta_buf_7,meta_buf_8,meta_buf_9,meta_buf_10,meta_buf_11,meta_buf_12,meta_buf_13,meta_buf_14,meta_buf_15,meta_buf_16,meta_buf_17,meta_buf_18,meta_buf_19,meta_buf_20,meta_buf_21,meta_buf_22,meta_buf_23,meta_buf_24,meta_buf_25,meta_buf_26,meta_buf_27,meta_buf_28,meta_buf_29,meta_buf_30,meta_buf_31,meta_buf_32,meta_buf_33,meta_buf_34,meta_buf_35,meta_buf_36,meta_buf_37,meta_buf_38,meta_buf_39,meta_buf_40,meta_buf_41,meta_buf_42,meta_buf_43,meta_buf_44,meta_buf_45,meta_buf_46,meta_buf_47,meta_buf_48,meta_buf_49,meta_buf_50,meta_buf_51,meta_buf_52,meta_buf_53,meta_buf_54,meta_buf_55,meta_buf_56,meta_buf_57,meta_buf_58,meta_buf_59,meta_buf_60,meta_buf_61,meta_buf_62,meta_buf_63,meta_buf_64,meta_buf_65,meta_buf_66,meta_buf_67,meta_buf_68,meta_buf_69,meta_buf_70,meta_buf_71,meta_buf_72,meta_buf_73,meta_buf_74,meta_buf_75,meta_buf_76,meta_buf_77,meta_buf_78,meta_buf_79,meta_buf_80,meta_buf_81,meta_buf_82,meta_buf_83,meta_buf_84,meta_buf_85,meta_buf_86,meta_buf_87,meta_buf_88,meta_buf_89,meta_buf_90,meta_buf_91,meta_buf_92,meta_buf_93,meta_buf_94,meta_buf_95,meta_buf_96,meta_buf_97,meta_buf_98,meta_buf_99,meta_buf_100,meta_buf_101,meta_buf_102,meta_buf_103,meta_buf_104,meta_buf_105,meta_buf_106,meta_buf_107,meta_buf_108,meta_buf_109,meta_buf_110,meta_buf_111,meta_buf_112,meta_buf_113,meta_buf_114,meta_buf_115,meta_buf_116,meta_buf_117,meta_buf_118,meta_buf_119,meta_buf_120,meta_buf_121,meta_buf_122,meta_buf_123,meta_buf_124,meta_buf_125,meta_buf_126,meta_buf_127,meta_buf_128,meta_buf_129,meta_buf_130,meta_buf_131,meta_buf_132,meta_buf_133,meta_buf_134,meta_buf_135,meta_buf_136,meta_buf_137,meta_buf_138,meta_buf_139,meta_buf_140,meta_buf_141,meta_buf_142,meta_buf_143,meta_buf_144,meta_buf_145,meta_buf_146,meta_buf_147,meta_buf_148,meta_buf_149,meta_buf_150,meta_buf_151,meta_buf_152,meta_buf_153,meta_buf_154,meta_buf_155,meta_buf_156,meta_buf_157,meta_buf_158,meta_buf_159,meta_buf_160,meta_buf_161,meta_buf_162,meta_buf_163,meta_buf_164,meta_buf_165,meta_buf_166,meta_buf_167,meta_buf_168,meta_buf_169,meta_buf_170,meta_buf_171,meta_buf_172,meta_buf_173,meta_buf_174,meta_buf_175,meta_buf_176,meta_buf_177,meta_buf_178,meta_buf_179,meta_buf_180,meta_buf_181,meta_buf_182,meta_buf_183,meta_buf_184,meta_buf_185,meta_buf_186,meta_buf_187,meta_buf_188,meta_buf_189,meta_buf_190,meta_buf_191,meta_buf_192,meta_buf_193,meta_buf_194,meta_buf_195,meta_buf_196,meta_buf_197,meta_buf_198,meta_buf_199,meta_buf_200,meta_buf_201,meta_buf_202,meta_buf_203,meta_buf_204,meta_buf_205,meta_buf_206,meta_buf_207,meta_buf_208,meta_buf_209,meta_buf_210,meta_buf_211,meta_buf_212,meta_buf_213,meta_buf_214,meta_buf_215,meta_buf_216,meta_buf_217,meta_buf_218,meta_buf_219,meta_buf_220,meta_buf_221,meta_buf_222,meta_buf_223,meta_buf_224,meta_buf_225,meta_buf_226,meta_buf_227,meta_buf_228,meta_buf_229};

extern "C" void init() {
    //static_buffer = (float*)malloc(90368680 * sizeof(float));
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_12);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_24);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_36);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_48);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_60);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_72);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_84);
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
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_96);
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
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_112);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_113);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_114);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_115);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_116);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_117);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_118);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_119);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_120);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_121);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_122);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_123);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_124);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_125);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_126);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_127);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_128);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_129);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_130);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_131);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_132);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_133);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_134);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_135);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_136);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_137);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_138);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_139);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_140);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_141);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_142);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_143);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_144);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_145);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_146);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_147);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_148);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_149);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_150);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_151);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_152);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_153);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_154);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_155);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_156);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_157);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_158);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_159);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_160);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_161);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_162);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_163);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_164);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_165);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_166);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_167);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_168);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_169);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_170);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_171);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_172);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_173);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_174);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_175);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_176);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_177);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_178);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_179);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_180);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_181);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_182);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_183);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_184);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_185);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_186);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_187);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_188);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_189);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_190);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_191);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_192);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_193);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_194);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_195);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_196);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_197);
elementwiseadd_0e535909dbb02b8c2f4b5633b10582b42cfa672a6e57120aef70db2f(meta_buf_198);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_199);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_200);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_201);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_202);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_203);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_204);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_205);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_206);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_207);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_208);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_209);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_210);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_211);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_212);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_213);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_214);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_215);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_216);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_217);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_218);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_219);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_220);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_221);
depth2space_fb4d08ab9e4cdbc9170db5af72396a76eb9781af5c65d1dd49b86fdd(meta_buf_222);
axiswisescale_ad4fcc2e2a30c0f4d2bf38b0d82d3c385286b4cf5ac07c689fbaeffd(meta_buf_223);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_224);
relu_1cb2858799075ce6b4b5ca46a6b210409c14a3c0ac5f557b57745721(meta_buf_225);
im2col_1dc147a294d043a7b2199b007777978656dfb88774a7a9bb20a1039c(meta_buf_226);
sgemm_49ee440e78a4467f5e364896610c9bdbdd5dbf08d70b98a210d579d8(meta_buf_227);
axiswisebias_2c5dea3d008381f35c96b0418e0c849bf9f138abcd775df0091f4ba1(meta_buf_228);
tanh_e53899afffbb30aa1d73708f084f35c47ffdde898e691bdd037dfa49(meta_buf_229);

}

