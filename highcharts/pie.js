var colours = {
      "environmental-protection-and-management": "#90A522",
      "climate-change": "#F58345",
      "carbon-capture-and-storage": "#75489D",
      "green-industry-innovation": "#C4016A",
      "human-and-social-development": "#00AFF0",
      "civil-society": "#0BA245",
      "decent-work-and-tripartite-dialogue": "#6D7D94",
      "protecting-cultural-heritage": "#692800",
      "research-and-scholarship": "#F2C009",
      "justice-and-home-affairs": "#096C93",
      "technical-assistance": "#cccccc",
      "other": "#cccccc",
};

pa_colours = function(sector_id, count) {
    colors = [];
    base = colours[sector_id];
    for (i = 0; i < count; i++) {
      colors.push(Highcharts.Color(base).brighten((i - (count-1)/2) / count).get());
    }
    return colors;
}

document.addEventListener("DOMContentLoaded", function(event) {
  var options = {
    chart: {
      renderTo: 'container',
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    title: {
        text: 'Allocation by priority sector'
    },
    subtitle: {
        text: 'Click the slices to view priority areas.'
    },
    plotOptions: {
        pie: {
          showInLegend: true
        },
        series: {
            dataLabels: {
                enabled: false,
            }
        }
    },
    tooltip: {
        pointFormat: '<b>EEA</b>: {point.EEA:,.0f}<br/><b>Norway</b>:{point.Norway:,.0f}'
    },
    legend: {
      align: "right",
      layout: "vertical",
      floating: true,
      itemStyle: {
          width: 200
      }
    },

    series: [{name: 'Priority sectors'}]
  };

  var getAmountsPA = function(item) {
      return {
        "Norway": item.allocation["Norway"] || 0,
        "EEA": item.allocation["EEA"] || 0
      };
  };
  var getAmountsPS = function(item) {
      var amount = {
        "Norway": 0,
        "EEA": 0
      };
      item.children.forEach(function(pa) {
          pa_val = getAmountsPA(pa);
          amount["Norway"] += pa_val["Norway"];
          amount["EEA"] += pa_val["EEA"];
      })
      return amount;
  };

    
  var url =  "https://raw.githubusercontent.com/EEA-Norway-Grants/prototyping/master/data/sectors.json";
  $.getJSON(url, function(data) {
    options.series[0].data = data.map(function(item) {
      amounts = getAmountsPS(item);
      return {
        id: item.id,
        name: item.name,
        drilldown: item.id,
        color: colours[item.id],
        y: amounts.EEA + amounts.Norway,
        EEA: amounts.EEA,
        Norway: amounts.Norway,
      }
    });
    options.drilldown = {
      series: data.map(function(item) {
        var pa_cols = pa_colours(item.id, item.children.length);
        return {
          id: item.id,
          name: item.name,
          data: item.children.map(function(pa, idx) {
            amounts = getAmountsPA(pa);
            return {
              id: pa.id,
              name: pa.name,
              y: amounts.EEA + amounts.Norway,
              EEA: amounts.EEA,
              Norway: amounts.Norway,
              color: pa_cols[idx]
            }
          })
        }
      })
    }
    var chart = new Highcharts.Chart(options);
  });

});
