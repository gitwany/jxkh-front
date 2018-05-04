<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或编号" v-model="listQuery.username"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
  </div>
<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;" >
    <el-table-column align="center" label="序号" width="65" > <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
    <el-table-column width="100" align="center" label="编号"> <template scope="scope">
      <span>{{scope.row.usercode}}</span>
    </template> </el-table-column>
    <el-table-column width="100" align="center" label="姓名"> <template scope="scope">
        <span>{{scope.row.username}}</span>
      </template> </el-table-column>
    <el-table-column width="200" align="center" label="部门"> <template scope="scope">
      <span>{{scope.row.deptname}}</span>
    </template> </el-table-column>
    <el-table-column width="200" align="center" label="角色"> <template scope="scope">
      <span>{{scope.row.roleNames}}</span>
    </template> </el-table-column>
    <el-table-column width="180" align="center" label="更新时间"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template> </el-table-column>

    <el-table-column align="center" label="操作" > <template scope="scope">
        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :fullscreen="true" >
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="usercode">
        <el-input v-if="dialogStatus == 'create'" v-model="form.usercode" placeholder="请输入编号"></el-input>
        <el-input v-else v-model="form.usercode" placeholder="请输入编号" readonly></el-input>
      </el-form-item>
      <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="机构" prop="deptcode">
        <treeselect
          v-model="form.deptcode"
          :multiple="false"
          :options="deptOptions" placeholder="请选择机构">
        </treeselect>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" multiple placeholder="请选择"  style="width:100%">
          <el-option
            v-for="item in roleOptions"
            :key="item.dm"
            :label="item.mc"
            :value="item.dm">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手机" prop="mobilePhone">
      <el-input v-model="form.mobilePhone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/admin/user/index';
import {
  getDict,
  getDept
} from 'api/dict';
import { mapGetters } from 'vuex';
import {
  isvalidPhone
} from 'utils/validate';

import Treeselect from '@riophae/vue-treeselect';

export default {
  components: { Treeselect },
  name: 'user',
  data() {
    return {
      form: {
        usercode: undefined,
        username: undefined,
        deptcode: undefined,
        roles: [],
        mobilePhone: undefined,
        password: undefined,
        description: undefined
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        usercode: [
          {
            required: true,
            message: '请输入编号',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        deptcode: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'blur'
          }
        ],
        mobilePhone: [
          {
            required: false,
            message: '',
            trigger: 'blur',
            validator: this.validPhone
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined
      },
      deptOptions: [],
      roleOptions: [],
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
    }
  },
  created() {
    this.getList();
    this.getDeptDict();
    this.getRoleDict();
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
    getDeptDict() {
      getDept()
        .then(response => {
          this.deptOptions = response.data;
        });
    },
    getRoleDict() {
      getDict('role','')
        .then(response => {
          this.roleOptions = response.data;
        });
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
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getObj(row.id)
        .then(response => {
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = 'update';
        });

    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(response => {

              if(response.status == 200){
                this.dialogFormVisible = false;
                this.getList();
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
              }
              else
              {
                this.$notify.error({
                  title: '失败',
                  message: '创建失败'+ response.message,
                  duration: 2000
                });
              }

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
        usercode: undefined,
        username: undefined,
        deptcode: undefined,
        roles: [],
        mobilePhone: undefined,
        password: undefined,
        description: undefined
      };
    },
    validPhone(rule, value,callback){
      if (value && !isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
        callback()
      }
    }
  }
}
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
<style>
  .vue-treeselect__menu {
    z-index: 100;
  }
  </style>
