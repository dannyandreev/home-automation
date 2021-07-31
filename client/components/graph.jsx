import React from 'react'
//
// import useChartConfig from 'hooks/useChartConfig'
// import Box from 'components/Box'
// import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'




export default function makeGraph(){
  const tempData = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 60
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 23
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 65
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 84
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 87
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 84
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 88
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 63
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 60
          }
        ]
      },
      {
        label: "Series 2",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 41
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 15
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 95
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 33
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 32
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 49
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 18
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 69
          }
        ]
      }
    ],
    []
  );

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

  console.log(data)
  console.log(tempData)
  console.log(series)
  console.log(axes)

  return (
    <div className="App bg-leaf p-3">
      <div className="App bg-leaf" style={{ width: "500px", height: "500px" }}>
        {data ? <Chart data={data} series={series} axes={axes} tooltip /> : <div>Loading...</div> }
      </div>
    </div>
  );
}
