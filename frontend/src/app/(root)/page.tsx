import HomeShoe from '@/components/form/HomeShoe';
import SellShoe from '@/components/shared/SellShoe';
import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <HomeShoe />
            <div className=" relative h-[400px]">
                <Image src="/layout.png" alt="Layout" fill className="px-5 py-5" />
            </div>
            <SellShoe />
        </main>
    );
}
