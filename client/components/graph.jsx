import React from 'react'
//
// import useChartConfig from 'hooks/useChartConfig'
// import Box from 'components/Box'
// import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'

export default function makeGraph(){

  const series = React.useMemo(
    () => ({
      type: "line",
      showPoints: false
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear"}
    ],
    []
  );

  const UUIDtoName = {};
  const dataSet = [];

  const [data, setData] = React.useState(null);

  const dataPromise = React.useMemo(
    () => {
      return fetch('/api/devices')
        .then(response => response.json())
        .then(data => {
          for (const device of data) {
            UUIDtoName[`${device.UUID}`] = device.deviceName
            dataSet.push({ UUID: device.UUID, deviceName: device.deviceName, dataType: 'Temperature', label: `${device.deviceName} Temperature`, datums: [] })
            dataSet.push({ UUID: device.UUID, deviceName: device.deviceName, dataType: 'Light', label: `${device.deviceName} Light`, datums: [] })
          }
        })
        .then(() => {
          return fetch('/api/data')
            .then(response => response.json())
            .then(data => {
              for (const datum of data) {
                for (const series of dataSet) {
                  if (series.UUID === datum.UUID && series.dataType === datum.sensorType) {
                    series.datums.push({
                      x: new Date(datum.deviceTimeStamp),
                      y: parseInt(datum.sensorValue, 10)
                    })
                  }
                }
              }
              for (const series of dataSet) {
                delete series.dataType
                delete series.UUID
                delete series.deviceName
                delete series.Temperature
              }
            })
            .then(() => {
              setData(dataSet)
            });
        })
    }
  )

  return (
    <div className="App bg-leaf p-3">
      <div className="App bg-leaf" style={{ width: "500px", height: "500px" }}>
        {data ? <Chart data={data} series={series} axes={axes} tooltip /> : <div>Loading...</div> }
      </div>
    </div>
  );
}
