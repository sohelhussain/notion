import Navbar from "./_components/navbar";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (<div className="h-full">
        <Navbar />
        <main className="h-full pt-40">

            {children}
        </main>
    </div>);
}

export default RootLayout;