import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const data = [
    { name: "T1", Total: 1200},
    { name: "T2", Total: 2100},
    { name: "T3", Total: 3200},
    { name: "T4", Total: 1200},
    { name: "T5", Total: 900},
    { name: "T6", Total: 1500},
];


const Chart = ({aspect, title}) => {
    return (
        <div className="chart shadow">
            <div className="chart-title">{title}</div>
                <ResponsiveContainer width='100%' aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    responsive
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>                           {/* chuyển màu cho đồ thị*/}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke='#ccc'/>      {/* lưới */}
                    <XAxis dataKey="name" stroke='#999'/>           {/* stroke -> thay đổi màu trục + label */}
                    {/* <YAxis width="auto" /> */}
                    <Tooltip />            {/*hiển thị thông tin khi hover vào điểm trên đồ thị */}
                    <Area
                    type="monotone"
                    dataKey="Total"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#total)"
                    // isAnimationActive={isAnimationActive}
                    />
                </AreaChart>
                </ResponsiveContainer>
        </div>
    )
}

export default Chart



