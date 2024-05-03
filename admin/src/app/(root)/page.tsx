import Revenue from '@/components/chart/Revenue';
import RevenueChart from '@/components/chart/RevenueChart';
import RevenueChartTime from '@/components/chart/RevenueChartTime';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col gap-[10px]">
            <div>
                <Revenue path="Revenue" />
            </div>

            <div>
                <RevenueChart path="Revenue" />
            </div>
            <div>
                <RevenueChartTime path="Revenue" />
            </div>
        </div>
    );
}
