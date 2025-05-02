"use client";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useConvexAuth } from 'convex/react';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();

    if (isAuthenticated) {
        router.push('/documents');
    }

    return (
        <div className="container mx-auto px-4 py-16 md:py-2">
            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Left side content */}
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-5xl text-start md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4">
                        The happier workspace
                    </h1>
                    <p className="text-xl text-start font-medium md:text-2xl text-gray-800 mb-8">
                        Write. Plan. Collaborate. With a little help from AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {isLoading && <Spinner size={"md"} />}
                        {!isAuthenticated && !isLoading && (
                            <SignInButton mode='modal'>
                                <Button asChild
                                    size="lg"
                                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold text-lg h-12 rounded-md"
                                >
                                    <Link href="/documents">
                                        Get Notion free
                                    </Link>
                                </Button>
                            </SignInButton>
                        )}

                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-sky-100 hover:bg-gray-200 text-sky-700 font-bold text-lg h-12 rounded-md"
                        >
                            Request a demo
                        </Button>
                    </div>

                    <div className="mt-12">
                        <p className="text-gray-600 mb-4 text-start">Trusted by teams at</p>
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="h-8 w-24 relative">
                                <Image
                                    src="https://www.notion.com/front-static/logos/generic/en/toyota-color.svg"
                                    alt="Toyota logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="h-8 w-24 relative">
                                <Image
                                    src="https://www.notion.com/front-static/logos/generic/en/openai-v2.svg"
                                    alt="OpenAI logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="h-8 w-24 relative">
                                <Image
                                    src="https://www.notion.com/front-static/logos/generic/en/figma-color.svg"
                                    alt="Figma logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="h-8 w-24 relative">
                                <Image
                                    src="https://www.notion.com/front-static/logos/generic/en/ramp.svg"
                                    alt="Ramp logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side illustration */}
                <div className="md:w-1/2">
                    <div className="relative h-72 md:h-96 lg:h-[450px] w-full">
                        <video className='w-full h-full' loop autoPlay muted src="https://www.notion.com/front-static/pages/product/super-duper/hero/homepage-hero.mp4"></video>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Heading;