export const circle = {
  color: ['red', 'green', 'yellow'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 13,
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      },
      lineStyle: {
        color: 'rgba(0,0,0,0.65);'
      }
    }
  },
  legend: {
    data: []
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['46%', '80%'],
      avoidLabelOverlap: false,
      hoverAnimation: true,
      hoverOffset: 5,
      label: {
        show: false
      },
      labelLine: {
        show: true
      },
      /* data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ] */
    }
  ]
}

export const tree = {
  color: ['red', 'green', 'yellow'],
  grid: {
    left: 10,
    top: 6,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none',
      label: {
        backgroundColor: '#6a7985'
      },
      lineStyle: {
        color: 'rgba(0,0,0,0.65);'
      }
    }
  },
  legend: {
    data: []
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        show: false
      }
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#333',
      padding: [0, 0, 0, 0]
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      onZero: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#E9E9E9'
      }
    },
    // data: ['周一', '周二', '周三', '周四', '周五']
  },
  dataset: {
    // source: [
    //   ['dateTime', '借款人数', '借款金额'],
    //   ['2019-05-11', 200, 10],
    //   ['2019-05-13', 100, 20],
    //   ['2019-05-14', 300, 30]
    // ]
  },
  series: [
  ]
}

export const line = {
  color: ['#355CD0', '#FF8085'],
  grid: {
    left: 20,
    top: 30,
    bottom: 0,
    right: 30,
    width: 'clac(100% - 30px)',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 13,
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      },
      lineStyle: {
        color: 'rgba(0,0,0,0.65);'
      }
    }
  },
  dataset: {
    // source: [
    //   ['dateTime', '借款人数', '借款金额'],
    //   ['2019-05-11', 200],
    //   ['2019-05-13', 100],
    //   ['2019-05-14', 300]
    // ]
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ccc'
      }
    },
    axisLabel: {
      margin: 20,
      interval: 4,
      textStyle: {
        color: '#333',
        fontSize: 13
      }
    },
    axisTick: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        color: '#333',
        padding: [0, 15, 0, 0]
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#E9E9E9'
        }
      }
    }
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
  ]
}
