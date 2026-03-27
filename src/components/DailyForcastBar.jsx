import React from 'react'

const DailyForcastBar = () => {
  return (
        <div className="daily flex justify-between bg-[rgba(255,255,255,0.08)] rounded-[16px] p-5">
              <div>
                <span>Today☀️ </span>
                <span className="text-xs text-gray-600 capitalize font-bold">partly Cloudy</span>
              </div>
              <div className="minmax-temp">
                <span className="font-syne font-bold">30&deg;</span>
                <span className="font-bold text-gray-500"> 24&deg;</span>
              </div>
              </div>
  )
}

export default DailyForcastBar