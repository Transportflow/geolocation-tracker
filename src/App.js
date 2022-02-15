import { useEffect, useState, useCallback } from 'react'

function App() {
  var [running, setRunning] = useState(false)
  var [pos, setPos] = useState(null)
  var [data, setData] = useState([])

  useEffect(() => {
    let id = navigator.geolocation.watchPosition((ev) => {
      setPos(ev)

      if (running) {
        let d = {
          accuracy: ev.coords.accuracy,
          altitude: ev.coords.altitude,
          altitudeAccuracy: ev.coords.altitudeAccuracy,
          heading: ev.coords.heading,
          latitude: ev.coords.latitude,
          longitude: ev.coords.longitude,
          speed: ev.coords.speed
        }
        localStorage.setItem(ev.timestamp, JSON.stringify(d))

        setData((tmp) => {
          tmp.push({ key: ev.timestamp, value: JSON.stringify(d) })
          return tmp
        })
      }
    }, null, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })

    return () => {
     navigator.geolocation.clearWatch(id)
    }
  }, [running])

  useEffect(() => {
    // init data

    let d = []
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (isNaN(parseInt(key))) continue
      let value = localStorage.getItem(key)
      d.push({ key: key, value: value })
    }
    d.sort((a, b) => {
      return parseInt(a.key) - parseInt(b.key)
    })
    setData(d)
  }, [])

  const getJson = useCallback(() => {
    return JSON.stringify(data.map(d => ({timestamp: parseInt(d.key), value: JSON.parse(d.value)})), null,2 )
  }, [data])

  const exportJson = () => {
    navigator.clipboard.writeText(getJson())
  }

  if (!navigator.geolocation) {
    return 'sorry, you need a browser that supports geolocation'
  }

  return (
    <div className="w-full min-h-screen font-mono text-white bg-black">
      <h1 className="text-2xl font-black">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-blue-600">
          Geolocation tracker
        </span>
      </h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Field</th>
            <th className="text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>accuracy</td>
            <td className="text-right">{pos?.coords.accuracy}</td>
          </tr>
          <tr>
            <td>altitude</td>
            <td className="text-right">{pos?.coords.altitude}</td>
          </tr>
          <tr>
            <td>altitudeAccuracy</td>
            <td className="text-right">{pos?.coords.altitudeAccuracy}</td>
          </tr>
          <tr>
            <td>heading</td>
            <td className="text-right">{pos?.coords.heading}</td>
          </tr>
          <tr>
            <td>latitude</td>
            <td className="text-right">{pos?.coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td className="text-right">{pos?.coords.longitude}</td>
          </tr>
          <tr>
            <td>speed</td>
            <td className="text-right">{pos?.coords.speed}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center w-screen my-10">
        <div className="mx-auto space-x-3">
          <button
            onClick={() => {
              setRunning(!running)
            }}
            className={
              'px-4 py-2 font-bold text-white rounded-md ' +
              (running ? 'bg-red-600' : 'bg-emerald-600')
            }
          >
            {running ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={() => {
              localStorage.clear()
              setData([])
            }}
            className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md"
          >
            clear
          </button>
          <button onClick={exportJson} className="px-4 py-2 font-bold text-white rounded-md bg-amber-500">
            copy JSON
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr className="text-left">
            <th>Timestamp</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}>
              <td>{d.key}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
