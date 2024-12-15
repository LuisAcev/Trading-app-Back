const timeSet = (time) => {
  const date = new Date(time).getDay();
  return date;
};

export const candelCharts = (chartData, time) => {
  switch (time) {
    case "1d":
      const data1D = chartData.map((item) => {
        return {
          time: item.k,
          open: parseFloat(item.v["1. open"]),
          high: parseFloat(item.v["2. high"]),
          low: parseFloat(item.v["3. low"]),
          close: parseFloat(item.v["4. close"]),
        };
      });
      return data1D;

    case "1w":
      var data1W = [];
      var dataT = null;

      chartData.forEach((item) => {
        if (timeSet(item.k) === 0)
          // monday
          dataT = {
            open: parseFloat(item.v["1. open"]),
            high: parseFloat(item.v["2. high"]),
          };
        else if (timeSet(item.k) === 4 && dataT) {
          // friday
          dataT.time = item.k;
          dataT.low = parseFloat(item.v["3. low"]);
          dataT.close = parseFloat(item.v["4. close"]);
          data1W.push(dataT);
          dataT = null;
        }
      });
      return data1W;

    case "1m":
      var data1M = [];
      var dataT = null;

      chartData.forEach((item) => {
        if (item.k.split("-")[2] === "01")
          // monday
          dataT = {
            open: parseFloat(item.v["1. open"]),
            high: parseFloat(item.v["2. high"]),
          };
        else if (item.k.split("-")[2] === "28" && dataT) {
          // friday
          dataT.time = item.k;
          dataT.low = parseFloat(item.v["3. low"]);
          dataT.close = parseFloat(item.v["4. close"]);
          data1M.push(dataT);
          dataT = null;
        }
      });
      return data1M;

    default:
      return [];
  }
};

export const lineCharts = (chartData, time) => {
  switch (time) {
    case "1d":
      const data1D = chartData.map((item) => {
        return {
          time: item.k,
          value: parseFloat(item.v["4. close"]),
        };
      });
      return data1D;

    case "1w":
      const data1W = chartData
        .filter((item) => timeSet(item.k) === 4)
        .map((item) => {
          return {
            time: item.k,
            value: parseFloat(item.v["4. close"]),
          };
        });
      return data1W;

    case "1m":
      const data1m = chartData
        .filter((item) => item.k.split("-")[2] === "01")
        .map((item) => {
          return {
            time: item.k,
            value: parseFloat(item.v["4. close"]),
          };
        });
      return data1m;
    default:
      return [];
  }
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
