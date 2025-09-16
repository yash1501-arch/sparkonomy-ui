import Layout from '@/layout'
import KeyOverview from '@/components/KeyOverview'
import ChartDemo from '@/components/charts/ChartDemo'
import InvoiceCard from '@/components/InvoiceCard'
import { Button } from '@/components/ui/button'
import { demoInvoices } from '@/constants/invoiceConstants'

function App() {
    return (
        <Layout>
            <h1 className="sr-only">Sparkonomy UI</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 md:py-12">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center bg-gray-100 rounded-4xl md:rounded-2xl lg:rounded-xl p-8">
                        <img
                            src="/gradient-plus.svg"
                            alt="Plus icon"
                            width={40}
                            height={40}
                            className="mb-4"
                        />
                        <h3 className="text-2xl font-medium bg-gradient-to-b from-(--brand-p2) via-(--brand-p1) to-(--brand-p3) bg-clip-text text-transparent">
                            Create New Invoice
                        </h3>
                        <p className="text-sm">
                            Start by creating and sending new invoice
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        className="mx-auto text-(--brand-p1) text-sm font-medium">
                        Or Upload an existing invoice and set payment reminder
                    </Button>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <KeyOverview />
                </div>
                <div className="col-span-full">
                    <ChartDemo />
                </div>
                <div className="col-span-full">
                    <h3 className="my-3">Your Invoices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {demoInvoices.map(inv => (
                            <InvoiceCard
                                key={inv.title}
                                data={inv}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default App
