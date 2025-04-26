"use client"

import Link from "next/link";

const ErrorPage = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Error 404</h1>
            <p className="text-lg">Page not found</p>
            <Link href="/documents" className="text-blue-500 underline">Go to Home</Link> 
        </div>
     );
}
 
export default ErrorPage;