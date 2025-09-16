import Navbar from '@/layout/Navbar'
import Footer from '@/layout/Footer'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />
            <div className="flex-1 bg-brand-primary-1/20 rounded-t-3xl">
                <main className="max-h-screen p-4 md:p-6 lg:p-8 pt-8 overflow-y-auto">
                    {children}
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Layout