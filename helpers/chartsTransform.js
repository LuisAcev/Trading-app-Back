export const candelCharts = (chartData) => {
  const data = chartData.map((item) => {
    return {
      time: item.k,
      open: parseFloat(item.v["1. open"]),
      high: parseFloat(item.v["2. high"]),
      low: parseFloat(item.v["3. low"]),
      close: parseFloat(item.v["4. close"]),
    };
  });
  return data;
};

export const lineCharts = (chartData) => {
  const data = chartData.map((item) => {
    return {
      time: item.k,
      value: parseFloat(item.v["4. close"]),
    };
  });
  return data;
};

export const volumenChart = (chartData) => {
  const data = chartData.map((item) => {
    return {
      time: item.k,
      value: parseFloat(item.v["5. volume"]),
    };
  });
  return data;
};
