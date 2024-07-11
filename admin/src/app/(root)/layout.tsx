import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import AdminNav from '@/components/shared/AdminNav';
import Header from '@/components/shared/Header';
import Providers from '@/utils/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'P & P - Admin',
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
            <body className="bg-[#F6F7F8] font-poppin min-h-screen text-black">
                <Providers>
                    <div className="flex min-h-screen">
                        <div className="bg-white sticky top-0 h-screen">
                            <AdminNav />
                        </div>
                        <div className="w-full">
                            <Header />
                            <div className="p-[10px]">{children}</div>
                        </div>
                    </div>
                    <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
                </Providers>
            </body>
        </html>
    );
}
