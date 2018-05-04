<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或账户" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">问题录入</el-button>
    </div>
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
        <span>{{scope.row.status}}</span>
      </template> </el-table-column>
      <el-table-column align="center" label="操作" width="300"> <template scope="scope">
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleSubmitXz(scope.row)">提交修正
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleUpdate(scope.row)">修正
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="beforeFp(scope.row)">分配
        </el-button>
        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleZg(scope.row)">整改
        </el-button>
      </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="修正原因" v-if="dialogStatus=='xz'">
          <el-input class="filter-item" />
        </el-form-item>
        <el-form-item label="修正照片" v-if="dialogStatus=='xz'">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="区名">
          <el-select class="filter-item" v-model="form.xzqh" placeholder="请选择">
            <el-option v-for="item in xzqh" :key="item.key" :label="item.val" :value="item.val"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别">
          <el-select class="filter-item" v-model="form.kplb" placeholder="请选择">
            <el-option v-for="item in kplb" :key="item.key" :label="item.val" :value="item.key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道路">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in dldm" :key="item.key" :label="item.val" :value="item.key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考评项目">
          <el-cascader :options="kpdx" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="计量">
          <el-input class="filter-item" v-model="form.jl" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
        </el-form-item>
        <el-form-item label="整改前照片" v-if="dialogStatus=='create'">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </el-form-item>
        <el-form-item label="整改后照片" v-if="dialogStatus=='zg'">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-if="dialogStatus=='xz'" type="primary" @click="xz()">确 定</el-button>
        <el-button v-if="dialogStatus=='zg'" type="primary" @click="zg()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible_fp">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="区名">
          <el-select class="filter-item" v-model="form.xzqh" placeholder="请选择">
            <el-option v-for="item in xzqh" :key="item.key" :label="item.val" :value="item.val"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道路">
          <el-select class="filter-item" v-model="form.dldm" placeholder="请选择">
            <el-option v-for="item in dldm" :key="item.key" :label="item.val" :value="item.key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道">
          <el-select class="filter-item" v-model="form.jddm" placeholder="请选择">
            <el-option v-for="item in jddm" :key="item.key" :label="item.val" :value="item.key"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_fp('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='fp'" type="primary" @click="fp()">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible_xz">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="修正原因" v-if="dialogStatus=='xz'">
          <el-input class="filter-item" />
        </el-form-item>
        <el-form-item label="修正照片" v-if="dialogStatus=='xz'">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_xz('form')">取 消</el-button>
        <el-button type="primary" @click="submitXz()">确 定</el-button>
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
    getObj
  } from 'api/admin/issue/index'
  import Vue from 'vue'
  import '../../components/upload'
  export default {
    name: 'user',
    data() {
      return {
        dict: {},
        form: {
          // xzqh: undefined,
          // kplb: undefined,
          // dldm: undefined,
          // kpdx: undefined,
          // kpxx: undefined,
          jl: undefined,
          description: undefined
        },
        rules: {

        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined,
          status: 'wfp'
        },
        xzqh: [{ val: '江汉区', key: '420102' }, { val: '江岸区', key: '420101' }],
        kplb: [{ val: '主次干道', key: 1 }, { val: '背街小巷', key: 2 }],
        dldm: [{ val: '江汉路', key: '111' }, { val: '游艺路', key: '222' }, { val: '解放公园路', key: '333' }, { val: '四唯小路', key: '444' }],
        // kpdx: [{ val: '环境卫生', key: 1, kpxx: [{ val: '生活垃圾', key: 1 }, { val: '建筑垃圾', key: 2 }] }, { val: '违法占道', key: 2, kpxx: [{ val: '占道经营', key: 3 }, { val: '乱堆乱放', key: 4 }] }],
        jddm: [{ val: '街道1', key: 'jd1' }, { val: '街道2', key: 'jd2' }, { val: '街道3', key: 'jd3' }],
        dialogFormVisible: false,
        dialogFormVisible_fp: false,
        dialogFormVisible_xz: false,
        row: null,
        dialogStatus: '',
        userManager_btn_edit: false,
        userManager_btn_del: false,
        userManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        dialogImageUrl: 'D:\\cyber\\test.jpg',
        dialogVisible: false,
        fileList: [],
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
      handleRemove() {
        this.$refs.childMethod.handleRemove()
      },
      handlePictureCardPreview() {
        this.$refs.childMethod.handlePictureCardPreview()
        this.fileList.push(file.url)
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
        this.dict = getDict()
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
      zg() {
        this.row.status = '整改完毕'
        Vue.nextTick()
          .then(() => {
            this.$notify({
              title: '成功',
              message: '已提交整改信息',
              type: 'success',
              duration: 2000
            });
            this.dialogFormVisible = false
          });
      },
      submitXz() {
        this.row.status = '提交修正'
        Vue.nextTick()
          .then(() => {
            this.$notify({
              title: '成功',
              message: '已提交修正信息',
              type: 'success',
              duration: 2000
            });
            this.dialogFormVisible_xz = false
          });
      },
      xz() {
        this.row.status = '提交修正'
        Vue.nextTick()
          .then(() => {
            this.$notify({
              title: '成功',
              message: '已提交修正信息',
              type: 'success',
              duration: 2000
            });
            this.dialogFormVisible = false
          });
      },
      beforeFp(row) {
        this.resetTemp()
        this.dialogStatus = 'fp'
        this.dialogFormVisible_fp = true
        this.row = row
      },
      fp() {
        this.row.status = '已分配'
        Vue.nextTick()
          .then(() => {
            this.$notify({
              title: '成功',
              message: '已提交分配',
              type: 'success',
              duration: 2000
            });
            this.dialogFormVisible_fp = false
          });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
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
      cancel_xz(formName) {
        this.dialogFormVisible_xz = false;
        this.$refs[formName].resetFields();
      },
      cancel_fp(formName) {
        this.dialogFormVisible_fp = false;
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
          password: undefined,
          description: undefined
        };
      }
    }
  }
</script>
