import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Providers from '@/utils/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const adminNavRef = useRef<HTMLDivElement | null>(null);
    // const headerRef = useRef<HTMLDivElement | null>(null);
    // useEffect(() => {
    //     const headerHeight = headerRef.current?.clientHeight;
    //     if (adminNavRef.current && headerHeight) {
    //         adminNavRef.current.style.height = `${headerHeight}px`;
    //     }
    // }, []);
    return (
        <html lang="en">
            <body className={` ${inter.className} bg-[#F6F7F8] font-poppin text-black`}>
                <Providers>
                    {children}
                    <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
                </Providers>
            </body>
        </html>
    );
}
