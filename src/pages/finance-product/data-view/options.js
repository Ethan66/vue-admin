export const circle = {
  color: [],
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
      name: '项目',
      type: 'pie',
      radius: ['46%', '80%'],
      avoidLabelOverlap: false,
      hoverAnimation: true,
      hoverOffset: 5,
      label: {
        show: false
      },
      labelLine: {
        show: false
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
  color: [],
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
  yAxis: [{
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
    }
    // data: ['周一', '周二', '周三', '周四', '周五']
  },
  {
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
    data: []
  }],
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
  color: [],
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
    boundaryGap: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eee',
        width: 2
      }
    },
    axisLabel: {
      margin: 20,
      interval: 0,
      textStyle: {
        color: '#999',
        fontSize: 13
      }
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#ddd'
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        color: '#999',
        padding: [0, 1, 0, 0],
        formatter: (value) => {
          if (value > 0) {
            return (value / 10000).toFixed(2) + '万'
          }
          return value
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: '#eee',
          width: 2
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ddd'
        }
      }
    }
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
  ]
}
