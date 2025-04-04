// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const salesAnalyticsOptions = {
//   chart: {
//     id: 'sales-analytics-chart',
//     type: 'line',
//     height: 320,
//     zoom: {
//       enabled: false
//     }
//   },
//   colors: ['#13C296', '#3056D3'],
//   xaxis: {
//     categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
//   stroke: {
//     curve: 'smooth'
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'left',
//     fontFamily: 'Satoshi',
//     fontWeight: 500,
//     fontSize: '14px',
//     markers: {
//       radius: 99,
//     },
//   }
// };

// const salesAnalyticsSeries = [
//   {
//     name: 'Product One',
//     data: [20, 90, 40, 35, 50, 55, 60, 70, 80, 60, 70, 90]
//   },
//   {
//     name: 'Product Two',
//     data: [25, 45, 45, 40, 55, 60, 65, 75, 15, 65, 75, 95]
//   }
// ];

// const SalesAnalytics = () => {
//   const salesAnalyticsSelectOptions = ['Yearly', 'Monthly', 'Weekly'];

//   return (
//     <div className="w-full  bg-card p-4 rounded-lg shadow-md flex-1">
//       <div className="w-full flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-card-foreground">Sales Analytics</h2>
//         <select className="border-1 text-black p-2 rounded-lg">
//           {salesAnalyticsSelectOptions.map((option, index) => (
//             <option key={index}>{option}</option>
//           ))}
//         </select>
//       </div>
//       {/* <div className="flex items-center space-x-4 mb-4">
//         <div className="flex items-center">
//           <span className="w-3 h-3 rounded-full inline-block bg-blue-500"></span>
//           <span className="text-card-foreground ml-2">Product One</span>
//         </div>
//         <div className="flex items-center">
//           <span className="w-3 h-3 rounded-full inline-block bg-green-500"></span>
//           <span className="text-card-foreground ml-2">Product Two</span>
//         </div>
//       </div> */}
//             <div id="chartTwo" className="-ml-5 p-4 -mb-9">

//       <ReactApexChart
//         options={salesAnalyticsOptions}
//         series={salesAnalyticsSeries}
//         type="line"
//         height={440}
//         width="100%"
//       />
//           </div>

//     </div>
//   );
// };

// export default SalesAnalytics;
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesAnalytics = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const options = {
    chart: {
      id: 'sales-analytics-chart',
      type: 'line',
      height: 320,
      zoom: { enabled: false },
    },
    colors: ['#13C296', '#3056D3'],
    xaxis: {
      categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      labels: { style: { colors: 'darkgray' } },
    },
    yaxis: {
      labels: { style: { colors: 'darkgray' } },
    },
    stroke: { curve: 'smooth' },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: { radius: 99 },
    },
  };

  const series = [
    { name: 'Product One', data: [20, 90, 40, 35, 50, 55, 60, 70, 80, 60, 70, 90] },
    { name: 'Product Two', data: [25, 45, 45, 40, 55, 60, 65, 75, 15, 65, 75, 95] },
  ];

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-md flex-1">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-card-foreground">Sales Analytics</h2>
        <select className="border-1 text-black p-2 rounded-lg">
          {['Yearly', 'Monthly', 'Weekly'].map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>

      <div id="chartTwo" className="-ml-5 p-4 -mb-9">
        {isMounted && (
          <ReactApexChart options={options} series={series} type="line" height={440} width="100%" />
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;
