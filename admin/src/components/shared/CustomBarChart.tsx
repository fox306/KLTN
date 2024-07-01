import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

type Props = {
    width: number | undefined;
    data: any[];
    dataX: string;
    dataY: string;
};
const CustomBarChart = ({ width, data, dataX, dataY }: Props) => {
    return (
        <BarChart
            width={width}
            height={200}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            barSize={20}
            className="w-full"
        >
            <XAxis dataKey={dataX} scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />

            <Bar dataKey={dataY} fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
    );
};

export default CustomBarChart;
