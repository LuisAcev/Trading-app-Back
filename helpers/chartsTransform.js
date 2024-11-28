export const candelCharts = (chartData) => {
  const data = chartData.map((item) => {
    return {
      open: item.o,
      hight: item.h,
      low: item.l,
      close: item.c,
      time: item.t,
    };
  });
  return data;
};

export const lineCharts = (chartData) => {
  const data = chartData.map((item) => {
    return {
      time: item.t,
      value: item.c,
    };
  });
  return data;
};

export const volumenChart = (chartData) => {
  const data = chartData.map((item) => {
    return {
      time: item.t,
      value: item.v,
    };
  });
  return data;
};


