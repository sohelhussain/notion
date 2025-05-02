"use client";

import Image from 'next/image';


// const Images = [
//     "https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fproduct%2Fsuper-duper%2Fcarousel%2Fhp%2Fsites%2Fen-US.png&w=3840&q=90",
//     "https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fproduct%2Fsuper-duper%2Fcarousel%2Fhp%2Fsites%2Fen-US.png&w=3840&q=90",
//     "https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fproduct%2Fsuper-duper%2Fcarousel%2Fhp%2Fsites%2Fen-US.png&w=3840&q=90"
// ]


const Heroes = () => {
    return (<div className="container mx-auto">
        <div className="h-[89vh] relative overflow-hidden rounded-4xl w-full flex items-center justify-center">
            <Image
                fill
                src="https://www.notion.com/front-static/pages/product/super-duper/carousel/hp/sites/en-US.png"
                alt="Toyota logo"
                className="object-contain h-full w-full"
            />
        </div>
    </div>);
}

export default Heroes;
