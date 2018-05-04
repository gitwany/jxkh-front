<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或账户" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">问题录入</el-button>
    </div>
    <!--<el-cascader
      :options="options2"
      @active-item-change="handleItemChange"
      :props="props"
    ></el-cascader>-->
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65"> <template scope="scope">
        <span>{{scope.row.id}}</span>
      </template> </el-table-column>
      <el-table-column width="110" align="center" label="区名"> <template scope="scope">
        <span>{{scope.row.xzqh}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="类别"> <template scope="scope">
        <span>{{scope.row.kplb}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="街道"> <template scope="scope">
        <span>{{scope.row.jddm}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="道路"> <template scope="scope">
        <span>{{scope.row.dldm}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="考评项目"> <template scope="scope">
        <span>{{scope.row.kpdx}}</span>
      </template> </el-table-column>
      <el-table-column width="150" align="center" label="考评子项"> <template scope="scope">
        <span>{{scope.row.kpxx}}</span>
      </template> </el-table-column>
      <el-table-column width="90" align="center" label="计量"> <template scope="scope">
        <span>{{scope.row.jl}}</span>
      </template> </el-table-column>
      <el-table-column width="90" align="center" label="状态"> <template scope="scope">
        <span>{{scope.row.zt}}</span>
      </template> </el-table-column>
      <el-table-column width="90" align="center" label="整改上限时间"> <template scope="scope">
        <span>{{scope.row.ztsxsj}}</span>
      </template> </el-table-column>
      <el-table-column align="center" label="操作" width="150"> <template scope="scope">
        <el-button v-if="scope.row.actName=='区级分派'" size="small" type="success" @click="handleFenpai(scope.row)">分派
        </el-button>
        <el-button v-if="scope.row.actName=='整改审核'" size="small" type="warning" @click="handleShenhe(scope.row)">审核
        </el-button>
        <el-button v-if="scope.row.actName=='任务签收'" size="small" type="primary" @click="handleZhenggai(scope.row)">整改
        </el-button>
      </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" enctype="multipart/form-data">
        <el-form-item label="区名">
          <el-select class="filter-item" v-model="form.xzqh" placeholder="请选择" @change="loadDict('xzqh',form.xzqh)">
            <el-option v-for="item in xzqhDict" :key="item.dm" :label="item.mc" :value="item.dm" > </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别">
          <el-select class="filter-item" v-model="form.kplb" placeholder="请选择" @change="loadDict('kplb',form.kplb)">
            <el-option v-for="item in kplbDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道" v-show="jdVisible">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择" @change="load3Dict(form.jddm)">
            <el-option v-for="item in jdDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="集镇道路" v-show="jzdlVisible">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择" @change="load3Dict(form.jddm)">
            <el-option v-for="item in jzdlDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="背街小巷" v-show="bjxxVisible">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择" @change="load3Dict(form.jddm)">
            <el-option v-for="item in bjxxDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公路" v-show="glVisible">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择" @change="load3Dict(form.jddm)">
            <el-option v-for="item in glDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="湖泊明渠" v-show="hpVisible">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择" @change="load3Dict(form.jddm)">
            <el-option v-for="item in hpDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道路" v-show="zcgdVisible">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in zcgdDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道路" v-show="jddlVisible">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in dlDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社区" v-show="sqVisible">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in sqDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="铁路" v-show="tlVisible">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in tlDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城中村" v-show="czcVisible">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in czcDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考评大项">
          <el-select class="filter-item" v-model="form.kpdx" placeholder="请选择" @change="loadDict('kpdx',form.kpdx)">
            <el-option v-for="item in kpdxDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考评子项">
          <el-select class="filter-item" v-model="form.kpxx" placeholder="请选择">
            <el-option v-for="item in kpxxDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计量">
          <el-input class="filter-item" v-model="form.jl" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
        </el-form-item>
        <el-form-item label="整改前照片" v-if="dialogStatus=='create'" >
          <el-upload
            :action="imgAction"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="afterUpload"
            name="Photos"
            :file-list="form.fileList"
            :auto-upload="true">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="create('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap['fenpai']" :visible.sync="dialogVisible_qjfp" :fullscreen="true">
      <el-form :model="form_fp" :rules="rules" ref="form_fp" label-width="100px" enctype="multipart/form-data">
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="区级分派">
              <el-select  class="filter-item" v-model="form_fp.jddm_fp" placeholder="请选择">
                <el-option v-if="jd_fp" v-for="item in jdDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
                <el-option v-if="zcgd_fp" v-for="item in zcgdDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
                <el-option v-if="gl_fp" v-for="item in glDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
                <el-option v-if="hp_fp" v-for="item in hpDict" :key="item.dm" :label="item.mc" :value="item.dm"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form_fp')">取 消</el-button>
        <el-button type="primary" @click="qfp(form_fp)">确 定</el-button>
      </div>

      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="问题详情" name="first">
            <el-form>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="区名">
                    <el-input :disabled="true" :value="this.wtsb.xzqh_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="类别">
                    <el-input :disabled="true" :value="this.wtsb.kplb_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12" v-if="jd_fp">
                  <el-form-item class="filter-item" label="街道">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="zcgd_fp">
                  <el-form-item class="filter-item" label="主次干道">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="gl_fp">
                  <el-form-item class="filter-item" label="公路">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="hp_fp">
                  <el-form-item class="filter-item" label="湖泊明渠">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="道路">
                    <el-input :disabled="true" :value="this.wtsb.dldm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="考评项目">
                    <el-input :disabled="true" :value="this.wtsb.kpdx_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="考评子项">
                    <el-input :disabled="true" :value="this.wtsb.kpxx_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="计量">
                    <el-input :disabled="true" :value="this.wtsb.jl">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="问题图片" name="second">
            <el-form>
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item class="filter-item" label="整改前照片" v-for="img in imgBzg" :key="img" >
                    <img :src="img" style="width:200px" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item class="filter-item" label="整改后照片" v-for="img in imgAzg" :key="img" >
                    <img :src="img" style="width:200px" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="问题流程" name="third">
            <el-table :data="workflow" style="width: 100%">
              <el-table-column prop="actName" label="阶段名称" ></el-table-column>
              <el-table-column prop="assignee" label="处理人" ></el-table-column>
              <el-table-column prop="startTime" label="开始时间" ></el-table-column>
              <el-table-column prop="endTime" label="结束时间" ></el-table-column>
              <el-table-column prop="duration" label="持续时间(分钟)" ></el-table-column>
              <el-table-column prop="bz" label="备注" ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>

    </el-dialog>
    <el-dialog :title="textMap[zhenggai]" :visible.sync="dialogVisible_zg" :fullscreen="true">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" enctype="multipart/form-data">
        <!-- <el-form-item label="整改前照片">
           <img :src="img" width="100px"  v-for="img in imgBzg" :key="img"/>
         </el-form-item>-->
        <el-form-item label="整改后照片">
          <el-upload
            :action="imgAction_after"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="afterUpload_zg"
            name="Photos"
            :file-list="form.fileList"
            :auto-upload="true">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <hr style="color:#e0e0e0" />
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="问题详情" name="first">
              <el-form>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="区名">
                      <el-input :disabled="true" :value="this.wtsb.xzqh_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="类别">
                      <el-input :disabled="true" :value="this.wtsb.kplb_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12" v-if="jd_fp">
                    <el-form-item class="filter-item" label="街道">
                      <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="zcgd_fp">
                    <el-form-item class="filter-item" label="主次干道">
                      <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="gl_fp">
                    <el-form-item class="filter-item" label="公路">
                      <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="hp_fp">
                    <el-form-item class="filter-item" label="湖泊明渠">
                      <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="道路">
                      <el-input :disabled="true" :value="this.wtsb.dldm_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="考评项目">
                      <el-input :disabled="true" :value="this.wtsb.kpdx_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="考评子项">
                      <el-input :disabled="true" :value="this.wtsb.kpxx_cn">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item class="filter-item" label="计量">
                      <el-input :disabled="true" :value="this.wtsb.jl">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="问题图片" name="second">
              <el-form>
                <el-row :gutter="50">
                  <el-col :span="24">
                    <el-form-item class="filter-item" label="整改前照片" v-for="img in imgBzg" :key="img" >
                      <img :src="img" style="width:200px" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item class="filter-item" label="整改后照片" v-for="img in imgAzg" :key="img" >
                      <img :src="img" style="width:200px" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="问题流程" name="third">
              <el-table :data="workflow" style="width: 100%">
                <el-table-column prop="actName" label="阶段名称" ></el-table-column>
                <el-table-column prop="assignee" label="处理人" ></el-table-column>
                <el-table-column prop="startTime" label="开始时间" ></el-table-column>
                <el-table-column prop="endTime" label="结束时间" ></el-table-column>
                <el-table-column prop="duration" label="持续时间(分钟)" ></el-table-column>
                <el-table-column prop="bz" label="备注" ></el-table-column>
              </el-table>

            </el-tab-pane>
          </el-tabs>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="zhenggai()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[shenhe]" :visible.sync="dialogVisible_sh" :fullscreen="true">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="问题详情" name="first">
            <el-form>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="区名">
                    <el-input :disabled="true" :value="this.wtsb.xzqh_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="类别">
                    <el-input :disabled="true" :value="this.wtsb.kplb_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12" v-if="jd_fp">
                  <el-form-item class="filter-item" label="街道">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="zcgd_fp">
                  <el-form-item class="filter-item" label="主次干道">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="gl_fp">
                  <el-form-item class="filter-item" label="公路">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="hp_fp">
                  <el-form-item class="filter-item" label="湖泊明渠">
                    <el-input :disabled="true" :value="this.wtsb.jddm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="道路">
                    <el-input :disabled="true" :value="this.wtsb.dldm_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="考评项目">
                    <el-input :disabled="true" :value="this.wtsb.kpdx_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="filter-item" label="考评子项">
                    <el-input :disabled="true" :value="this.wtsb.kpxx_cn">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item class="filter-item" label="计量">
                    <el-input :disabled="true" :value="this.wtsb.jl">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="问题图片" name="second">
            <el-form>
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item class="filter-item" label="整改前照片" v-for="img in imgBzg" :key="img" >
                    <img :src="img" style="width:200px" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item class="filter-item" label="整改后照片" v-for="img in imgAzg" :key="img" >
                    <img :src="img" style="width:200px" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="问题流程" name="third">
            <el-table :data="workflow" style="width: 100%">
              <el-table-column prop="actName" label="阶段名称" ></el-table-column>
              <el-table-column prop="assignee" label="处理人" ></el-table-column>
              <el-table-column prop="startTime" label="开始时间" ></el-table-column>
              <el-table-column prop="endTime" label="结束时间" ></el-table-column>
              <el-table-column prop="duration" label="持续时间(分钟)" ></el-table-column>
              <el-table-column prop="bz" label="备注" ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="shenhe('审核不通过')">审核不通过</el-button>
        <el-button type="primary" @click="shenhe('审核通过')">审核 通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import {
    getDict,
    addObj,
    page,
    getObj,
    getOne,
    getImg,
    fp,
    zg,
    sh,
    workflow
  } from 'api/admin/issue/index'
  import '../../components/upload'
  import store from 'store/index'
  export default {
    name: 'user',
    data() {
      return {
        activeName: 'first',
        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        },
        imgAction: '/api/jxkh/wtcl/web/tpsc?token=' + store.getters.token,
        imgAction_after: '/api/jxkh/wtcl/web/tpsc?token=' + store.getters.token,
        xzqhDict: undefined,
        kplbDict: undefined,
        kpdxDict: undefined,
        kpxxDict: undefined,
        jdDict: undefined, // 街道
        dlDict: undefined, // 道路
        jzdlDict: undefined, // 集镇道路=道路
        bjxxDict: undefined, // 背街小巷=道路
        glDict: undefined, // 公路=街道
        hpDict: undefined, // 湖泊=街道
        sqDict: undefined, // 社区=街道
        czcDict: undefined, // 城中村=街道
        tlDict: undefined, // 铁路=街道
        zcgdDict: undefined, // 主次干道=街道
        jddm_fp: undefined,
        taskId: undefined,
        id: undefined,
        kplb: undefined,
        form: {
          xzqh: undefined,
          kplb: undefined,
          dldm: undefined,
          jddm: undefined,
          gldm: undefined,
          hpdm: undefined,
          tldm: undefined,
          sqdm: undefined,
          czcdm: undefined,
          kpdx: undefined,
          kpxx: undefined,
          kpxm: [],
          fileList: [],
          jl: undefined,
          description: undefined,
          zgqzp: '',
          zghzp: ''
        },
        form_fp: {
          id: undefined,
          taskId: undefined,
          jddm_fp: undefined
        },
        rules: {

        },
        myHeaders1: null,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
          // groupIsd: '0001'
        },
        // xzqh: [{ val: '江汉区', key: '420102' }, { val: '江岸区', key: '420101' }],
        // kplb: [{ val: '主次干道', key: 1 }, { val: '背街小巷', key: 2 }],
        // dldm: [{ val: '江汉路', key: '111' }, { val: '游艺路', key: '222' }, { val: '解放公园路', key: '333' }, { val: '四唯小路', key: '444' }],
        // kpdx: [{ val: '环境卫生', key: 1, kpxx: [{ val: '生活垃圾', key: 1 }, { val: '建筑垃圾', key: 2 }] }, { val: '违法占道', key: 2, kpxx: [{ val: '占道经营', key: 3 }, { val: '乱堆乱放', key: 4 }] }],
        jddm: [{ val: '街道1', key: '1' }, { val: '街道2', key: 'jd2' }, { val: '街道3', key: 'jd3' }],
        dialogFormVisible: false,
        fullscreen: true,
        dialogVisible_qjfp: false,
        dialogVisible_jdfp: false,
        dialogVisible_zg: false,
        dialogVisible_sh: false,
        jdVisible: false,
        glVisible: false,
        hpVisible: false,
        zcgdVisible: false,
        bjxxVisible: false,
        jzdlVisible: false,
        jddlVisible: false,
        sqVisible: false,
        tlVisible: false,
        czcVisible: false,
        row: null,
        dialogStatus: '',
        userManager_btn_edit: false,
        userManager_btn_del: false,
        userManager_btn_add: false,
        jd_fp: false,
        gl_fp: false,
        hp_fp: false,
        zcgd_fp: false,
        textMap: {
          update: '编辑',
          create: '创建',
          fenpai: '分派',
          zhanggai: '整改',
          shenhe: '审核'
        },
        tableKey: 0,
        dialogImageUrl: 'D:\\cyber\\test.jpg',
        dialogVisible: false,
        fileList: [],
        imgBeforeZg: [],
        imgAfterZg: [],
        imgAzg: [],
        imgBzg: [],
        // workflow: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        workflow: [{
          actName: '1',
          assignee: undefined,
          duration: undefined,
          endTime: undefined,
          startTime: undefined
        }],
        wtsb: {
          xzqh: undefined,
          kplb: undefined,
          kpdx: undefined,
          kpxx: undefined,
          dldm: undefined,
          jddm: undefined,
          xzqh_cn: undefined,
          kplb_cn: undefined,
          kpdx_cn: undefined,
          kpxx_cn: undefined,
          dldm_cn: undefined,
          jddm_cn: undefined,
          jl: undefined
        },
        kpdx: [{
          value: 1,
          label: '环境卫生',
          children: [{
            value: 11,
            label: '生活垃圾'
          }, {
            value: 12,
            label: '建筑垃圾'
          }]
        }, {
          value: 2,
          label: '违法占道',
          children: [{
            value: 21,
            label: '占道经营'
          }, {
            value: 22,
            label: '乱堆乱放'
          }]
        }]
      }
    },
    created() {
      this.getList();
      this.userManager_btn_edit = this.elements['userManager:btn_edit'];
      this.userManager_btn_del = this.elements['userManager:btn_del'];
      this.userManager_btn_add = this.elements['userManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      afterUpload(response, file, fileList) {
        this.form.zgqzp += response.data + ','
      },
      afterUpload_zg(response, file, fileList) {
        this.form.zghzp += response.data + ','
      },
      handleFenpai(row) {
        this.form_fp.id = row.id
        this.form_fp.taskId = row.taskId
        this.dialogVisible_qjfp = true
        if (row.actName === '区级分派') {
          this.dialogVisible_qjfp = true
        } if (row.actName === '街道分派') {
          this.dialogVisible_jdfp = true
        }
        this.workflow.splice(0, this.workflow.length)
        workflow(row.id).then(response => { // 获取流程信息
          this.workflow = response
        })
        getOne(row.id).then(response => { // 获取详情
          this.imgBzg.splice(0, this.imgBzg.length)
          this.imgAzg.splice(0, this.imgAzg.length)
          this.loadDict('xzqh', response.xzqh) // 加载字典
          this.imgBzg.splice(0, this.imgBzg.length)
          this.wtsb = response
          if (this.wtsb.kplb_cn === '背街小巷' || this.wtsb.kplb_cn === '集镇道路' || this.wtsb.kplb_cn === '居民社区' || this.wtsb.kplb_cn === '铁路沿线' || this.wtsb.kplb == '城中村') {
            this.jd_fp = true
          }
          if (this.wtsb.kplb_cn === '主次干道') {
            this.zcgd_fp = true
          }
          if (this.wtsb.kplb_cn === '公路环境') {
            this.gl_fp = true
          }
          if (this.wtsb.kplb_cn === '湖泊明渠') {
            this.hp_fp = true
          }
          if (response.zgqzp !== undefined && response.zgqzp !== '') {
            this.imgBeforeZg = response.zgqzp.split(',')
            for (const idx in this.imgBeforeZg) {
              getImg(this.imgBeforeZg[idx]).then(response => {
                this.imgBzg.push('data:image/png;base64,' + response.data)
              })
            }
          }
        })
      },
      qfp(form) {
        fp(form.id, form.taskId, form.jddm_fp)
          .then(() => {
            this.dialogVisible_qjfp = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '分派成功',
              type: 'success',
              duration: 2000
            });
          })
      },
      handleShenhe(row) {
        this.form_fp.id = row.id
        this.form_fp.taskId = row.taskId
        this.workflow.splice(0, this.workflow.length)
        workflow(row.id).then(response => { // 获取流程信息
          this.workflow = response
        })
        getOne(row.id).then(response => {
          this.imgBzg.splice(0, this.imgBzg.length)
          this.imgAzg.splice(0, this.imgAzg.length)
          this.wtsb = response
          if (response.zgqzp != undefined && response.zgqzp != '') {
            this.imgBeforeZg = response.zgqzp.split(',')
            for (const idx in this.imgBeforeZg) {
              getImg(this.imgBeforeZg[idx]).then(response => {
                this.imgBzg.push('data:image/png;base64,' + response.data)
              })
            }
          }
          if (response.zgqzp != undefined && response.zgqzp != '') {
            this.imgAfterZg = response.zghzp.split(',')
            for (const idx in this.imgAfterZg) {
              getImg(this.imgAfterZg[idx]).then(response => {
                this.imgAzg.push('data:image/png;base64,' + response.data)
              })
            }
          }
        })
        this.dialogVisible_sh = true
      },
      shenhe(status) {
        sh(this.form_fp.id, this.form_fp.taskId, status)
          .then(() => {
            this.dialogVisible_sh = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '审核完成',
              type: 'success',
              duration: 2000
            });
          })
      },
      handleZhenggai(row) {
        this.imgBzg.splice(0, this.imgBzg.length)
        this.form_fp.id = row.id
        this.form_fp.taskId = row.taskId
        this.workflow.splice(0, this.workflow.length)
        workflow(row.id).then(response => { // 获取流程信息
          this.workflow = response
        })
        getOne(row.id).then(response => {
          this.imgBzg.splice(0, this.imgBzg.length)
          this.imgAzg.splice(0, this.imgAzg.length)
          this.wtsb = response
          this.imgBeforeZg = response.zgqzp.split(',')
          for (const index in this.imgBeforeZg) {
            getImg(this.imgBeforeZg[index]).then(response => {
              this.imgBzg.push('data:image/png;base64,' + response.data)
            })
          }
        })
        this.dialogVisible_zg = true
      },
      zhenggai() {
        zg(this.form_fp.id, this.form_fp.taskId, this.form.zghzp)
          .then(() => {
            this.dialogVisible_zg = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '整改完成',
              type: 'success',
              duration: 2000
            });
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getList() {
        this.listLoading = true;
        page(this.listQuery)
          .then(response => {
            this.list = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        getDict('xzqh', '')
          .then(response => {
            this.xzqhDict = response.data
          })
        getDict('kplb', '')
          .then(response => {
            this.kplbDict = response.data
          })
      },
      load3Dict(pdm) { // 通过街道代码，加载第三级字典
        this.jddlVisible = false
        this.sqVisible = false
        this.tlVisible = false
        this.czcVisible = false
        this.form.dldm = undefined
        this.form.sq = undefined
        this.form.tl = undefined
        this.form.czc = undefined
        if (this.kplb === 'B' || this.kplb === 'C') { // 背街小巷、集镇道路加载道路代码
          this.jddlVisible = true
          getDict('jddl', pdm)
            .then(response => {
              this.dlDict = response.data
            })
        }
        if (this.kplb === 'D') { // 居民社区加载社区代码
          this.sqVisible = true
          getDict('sq', pdm)
            .then(response => {
              this.sqDict = response.data
            })
        }
        if (this.kplb === 'H') { // 铁路沿线加载铁路代码
          this.tlVisible = true
          getDict('tl', pdm)
            .then(response => {
              this.tlDict = response.data
            })
        }
        if (this.kplb === 'J') { // 城中村加载城中村代码
          this.czcVisible = true
          getDict('czc', pdm)
            .then(response => {
              this.czcDict = response.data
            })
        }
      },
      loadDict(dictName, pdm) {
        if (dictName === 'xzqh') { // 行政区划关联道路、街道、公路、湖泊代码
          this.jdVisible = false
          this.glVisible = false
          this.hpVisible = false
          this.zcgdVisible = false
          this.bjxxVisible = false
          this.jzdlVisible = false
          this.jddlVisible = false
          this.tlVisible = false
          this.sqVisible = false
          this.czcVisible = false
          this.form.sqdm = undefined
          this.form.tldm = undefined
          this.form.czcdm = undefined
          this.form.kpdx = undefined
          this.form.kplb = undefined
          this.form.kpxx = undefined
          this.form.dl = undefined
          this.form.jd = undefined
          this.form.gl = undefined
          this.form.hp = undefined
          this.form.zcgd = undefined
          getDict('dl', pdm)
            .then(response => {
              this.dlDict = response.data
            })
          getDict('jd_jzdl', pdm)
            .then(response => {
              this.jzdlDict = response.data
            })
          getDict('jd_bjxx', pdm)
            .then(response => {
              this.bjxxDict = response.data
            })
          getDict('jd', pdm)
            .then(response => {
              this.jdDict = response.data
            })
          getDict('gl', pdm)
            .then(response => {
              this.glDict = response.data
            })
          getDict('hbmq', pdm)
            .then(response => {
              this.hpDict = response.data
            })
          getDict('zcgd', pdm)
            .then(response => {
              this.zcgdDict = response.data
            })
        }
        if (dictName === 'kplb') { // 考评类别关联考评大项、街道代码等等
          this.jdVisible = false
          this.glVisible = false
          this.hpVisible = false
          this.zcgdVisible = false
          this.bjxxVisible = false
          this.jzdlVisible = false
          this.jddlVisible = false
          this.tlVisible = false
          this.sqVisible = false
          this.czcVisible = false
          this.form.kpdx = undefined
          this.form.jddm = undefined
          this.form.sqdm = undefined
          this.form.tldm = undefined
          this.form.czcdm = undefined
          this.kplb = pdm
          getDict('kpdx', pdm)
            .then(response => {
              this.kpdxDict = response.data
            })
          if (pdm === 'A') { // 主次干道
            this.zcgdVisible = true
          }
          if (pdm === 'B') { // 背街小巷
            this.bjxxVisible = true
          }
          if (pdm === 'C') { // 集镇道路
            this.jzdlVisible = true
          }
          // 居民社区、铁路沿线、城中村需要关联街道
          if (pdm === 'D' || pdm === 'H' || pdm === 'J') {
            this.jdVisible = true
          }
          if (pdm === 'F') { // 公路环境
            this.glVisible = true
          }
          if (pdm === 'G') { // 湖泊明渠
            this.hpVisible = true
          }
        }
        if (dictName === 'kpdx') { // 考评大项关联考评子项
          this.form.kpxx = undefined
          getDict('kpxx', this.kplb + pdm)
            .then(response => {
              this.kpxxDict = response.data
            })
        }
      },
      handleZg(row) {
        getObj(row.id)
          .then(response => {
            this.form = response;
            this.dialogFormVisible = true;
            this.dialogStatus = 'zg';
            this.row = row
          });
      },
      handleSubmitXz(row) {
        this.dialogFormVisible_xz = true;
        this.dialogStatus = 'xz';
        this.row = row
      },
      handleUpdate(row) {
        getObj(row.id)
          .then(response => {
            this.form = response;
            this.dialogFormVisible = true;
            this.dialogStatus = 'xz';
            this.row = row
          });
      },
      handleDelete(row) {
        this.$confirm('修正, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            xiuzheng(row.id)
            // console.log(row)
            // debugger;
            // row.status.splice(row.id, 1, '123')
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '已提交修正',
                  type: 'success',
                  duration: 2000
                });
              });
          });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            // this.form.kpxx = this.form.kpxm[1]
            // this.form.kpdx = this.form.kpxm[0]
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false;
                this.getList();
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
              })
          } else {
            return false;
          }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      update(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.form.password = undefined;
            putObj(this.form.id, this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      resetTemp() {
        this.form = {
          username: undefined,
          name: undefined,
          xzqh: undefined,
          kplb: undefined,
          dldm: undefined,
          kpdx: undefined,
          kpxx: undefined,
          jddm: undefined,
          sqdm: undefined,
          tldm: undefined,
          czcdm: undefined,
          password: undefined,
          description: undefined,
          gldm: undefined,
          hpdm: undefined,
          fileList: [],
          imgs: [],
          zgqzp: '',
          zghzp: ''
        };
        this.form_fp = {
          jddm_fp: undefined
        };
        this.wtsb = {
          xzqh: undefined,
          kplb: undefined,
          dldm: undefined,
          kpdx: undefined,
          kpxx: undefined,
          jddm: undefined,
          jl: undefined
        }
      }
    }
  }
</script>
