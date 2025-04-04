// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const options = {
//   colors: ['#13C296', '#3056D3'],
//   chart: {
//     fontFamily: 'Satoshi, sans-serif',
//     type: 'bar',
//     height: 335,
//     stacked: true,
//     toolbar: {
//       show: true,
//     },
//     zoom: {
//       enabled: false,
//     },
//   },
//   responsive: [
//     {
//       breakpoint: 1536,
//       options: {
//         plotOptions: {
//           bar: {
//             borderRadius: 0,
//             columnWidth: '25%',
//           },
//         },
//       },
//     },
//   ],
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       borderRadius: 10,
//       columnWidth: '25%',
//       borderRadiusApplication: 'end',
//       borderRadiusWhenStacked: 'last',
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   xaxis: {
//     categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//     labels: {
//       style: {
//         colors: "darkgray"
//       }
//     }
//   },
//   yaxis: {
//     labels: {
//       style: {
//         colors: "darkgray"
//       }
//     }
//   },
 
//   legend: {
//     position: 'top',
//     horizontalAlign: 'left',
//     fontFamily: 'Satoshi',
//     fontWeight: 500,
//     fontSize: '14px',
//     labels: {
//       colors: 'darkgray', // Set legend labels to dark gray
//     },
//     markers: {
//       radius: 99,
//     },
//   },
//   fill: {
//     opacity: 1,
//   },
// };

// const SalesGraph = () => {
//   const [state, setState] = useState({
//     series: [
//       {
//         name: 'Sales',
//         data: [44, 55, 41, 67, 22, 43, 65],
//       },
//       {
//         name: 'Revenue',
//         data: [13, 23, 20, 8, 13, 27, 15],
//       },
//     ],
//   });

//   const salesGraphSelectOptions = ['Last Week', 'This Month', 'This Year'];

//   return (
//     <div className=" w-full bg-card p-4 rounded-lg shadow-md flex-1">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-card-foreground">Sales Graph</h2>
//         <select className="border-1 text-black p-2 rounded-lg">
//           {salesGraphSelectOptions.map((option, index) => (
//             <option key={index}>{option}</option>
//           ))}
//         </select>
//       </div>
//       {/* <div className="flex items-center space-x-4 mb-4">
//         <div className="flex items-center">
//           <span className="w-3 h-3 rounded-full inline-block bg-blue-500"></span>
//           <span className="text-card-foreground ml-2">Sales</span>
//         </div>
//         <div className="flex items-center">
//           <span className="w-3 h-3 rounded-full inline-block bg-green-500"></span>
//           <span className="text-card-foreground ml-2">Revenue</span>
//         </div>
//       </div> */}
//       <div id="chartTwo" className="-ml-5 p-4 -mb-9">
//         <ReactApexChart
//           options={options}
//           series={state.series}
//           type="bar"
//           height={440}
//           width={"100%"}
//         />
//       </div>
//     </div>
//   );
// };

// export default SalesGraph;
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesGraph = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const options = {
    colors: ['#13C296', '#3056D3'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      labels: {
        style: { colors: 'darkgray' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: 'darkgray' },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      labels: { colors: 'darkgray' },
      markers: { radius: 99 },
    },
    fill: { opacity: 1 },
  };

  const series = [
    { name: 'Sales', data: [44, 55, 41, 67, 22, 43, 65] },
    { name: 'Revenue', data: [13, 23, 20, 8, 13, 27, 15] },
  ];

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-md flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-card-foreground">Sales Graph</h2>
        <select className="border-1 text-black p-2 rounded-lg">
          {['Last Week', 'This Month', 'This Year'].map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>

      <div id="chartTwo" className="-ml-5 p-4 -mb-9">
        {isMounted && (
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={440}
            width="100%"
          />
        )}
      </div>
    </div>
  );
};

export default SalesGraph;
