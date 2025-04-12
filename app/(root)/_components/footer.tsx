
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return ( 
        <footer className="py-12 px-4 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Social Media Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold rounded">N</div> */}
                <Image src="/notion-fev-icon.png" alt="Notion logo" width={40} height={40} />
                <span className="text-xl font-bold">Notion</span>
              </div>
            </Link>
            
            <div className="flex space-x-4">
              <Link href="#" aria-label="Instagram">
                <div className="h-6 w-6 text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="X (Twitter)">
                <div className="h-6 w-6 text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                    <path d="M8 10l4 4 4-4"></path>
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <div className="h-6 w-6 text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Facebook">
                <div className="h-6 w-6 text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="YouTube">
                <div className="h-6 w-6 text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </div>
              </Link>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="relative">
                <Button variant="outline" size="sm" className="w-full justify-between pr-3">
                  <div className="flex items-center">
                    <span className="mr-2">🇬🇧</span>
                    English
                  </div>
                  <ChevronRight size={16} className="ml-2 rotate-90" />
                </Button>
              </div>
              
              <p className="text-gray-600">We do not sell or share your personal information</p>
              <p className="text-gray-600 hover:underline cursor-pointer">Cookie settings</p>
              <p className="text-gray-600">© 2025 Notion Labs, Inc.</p>
            </div>
          </div>
          
          {/* Column 1: Company */}
          <div>
            <h3 className="font-medium text-base mb-4">Company</h3>
            <ul className="space-y-3">
              {['About us', 'Careers', 'Security', 'Status', 'Terms & privacy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 2: Download */}
          <div>
            <h3 className="font-medium text-base mb-4">Download</h3>
            <ul className="space-y-3">
              {['iOS & Android', 'Mac & Windows', 'Calendar', 'Web Clipper'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Help center', 'Pricing', 'Blog', 'Community', 'Integrations', 'Templates', 'Affiliates'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Notion for */}
          <div>
            <h3 className="font-medium text-base mb-4">Notion for</h3>
            <ul className="space-y-3">
              {['Enterprise', 'Small business', 'Personal'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Button variant="ghost" className="text-black font-medium hover:bg-gray-100 px-0 flex items-center text-sm">
                Explore more
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
     );
}
 
export default Footer;