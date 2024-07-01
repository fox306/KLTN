import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

type Props = {
    width: number | undefined;
    data: any[];
    dataX: string;
    dataY: string;
};
const CustomAreaChart = ({ width, data, dataX, dataY }: Props) => {
    return (
        <AreaChart
            width={width}
            height={200}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            className="w-full"
        >
            <XAxis dataKey={dataX} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={dataY} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    );
};

export default CustomAreaChart;
