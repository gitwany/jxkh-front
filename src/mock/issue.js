import Mock from 'mockjs';

let List = Mock.mock({
  data: {
    total: 5,
    rows: [
      {
        id: 1,
        xzqh: '江汉区',
        kplb: '主次干道',
        dldm: '江汉路',
        kpdx: '环境卫生',
        kpxx: '生活垃圾',
        jl: 3,
        status: '未审核'
      },
      {
        id: 2,
        xzqh: '江岸区',
        kplb: '主次干道',
        dldm: '永清街',
        kpdx: '环境卫生',
        kpxx: '生活垃圾',
        jl: 5,
        status: '未审核'
      },
      {
        id: 3,
        xzqh: '江汉区',
        kplb: '主次干道',
        dldm: '唐家墩路',
        kpdx: '环境卫生',
        kpxx: '建筑垃圾',
        jl: 2,
        status: '未审核'
      },
      {
        id: 4,
        xzqh: '江汉区',
        kplb: '主次干道',
        dldm: '姑嫂树路',
        kpdx: '违法占道',
        kpxx: '占道经营',
        jl: 5,
        status: '未审核'
      },
      {
        id: 5,
        xzqh: '江岸区',
        kplb: '主次干道',
        dldm: '三阳路',
        kpdx: '环境卫生',
        kpxx: '建筑垃圾',
        jl: 1,
        status: '未审核'
      }
    ]
  }
});


export default {
  issueList: () => List,
  getObj: id => {
    return List.data.rows[id.body - 1]
  }
};
