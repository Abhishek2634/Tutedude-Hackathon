import Link from 'next/link';

// A more visually appealing social icon component
const SocialIcon = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-white bg-gray-800 hover:bg-green-600 rounded-full p-2 transition-all duration-300"
  >
    {children}
  </a>
);

// A component for contact info with an icon
const ContactItem = ({ icon, text }) => (
  <li className="flex items-center gap-3">
    {icon}
    <span>{text}</span>
  </li>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="container mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Column 1: About Annapurna */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Simple SVG Logo */}
              <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 14.59C17 15.54 16.5 16 15.5 16C14.74 16 14.37 15.75 14.1 15.5C13.8 15.22 13.6 14.78 13.6 14.5C13.6 13.55 14.1 13 15.1 13C15.86 13 16.23 13.25 16.5 13.5C16.8 13.78 17 14.22 17 14.5ZM10.4 14.59C10.4 15.54 9.9 16 8.9 16C8.14 16 7.77 15.75 7.5 15.5C7.2 15.22 7 14.78 7 14.5C7 13.55 7.5 13 8.5 13C9.26 13 9.63 13.25 9.9 13.5C10.2 13.78 10.4 14.22 10.4 14.5ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" fill="currentColor"/>
              </svg>
              <h3 className="text-2xl font-bold">Annapurna</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to empower India's street food vendors by providing a fair, transparent, and efficient platform for sourcing raw materials.
            </p>
            <div className="flex gap-4 mt-6">
              <SocialIcon href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </SocialIcon>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/co-op-order" className="text-gray-400 hover:text-white transition-colors">Vendor Portal</Link></li>
              <li><Link href="/supplier-dashboard" className="text-gray-400 hover:text-white transition-colors">Supplier Portal</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">GET IN TOUCH</h3>
            <ul className="space-y-4 text-gray-400">
              <ContactItem
                icon={<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                text="+91-987-654-3210"
              />
              <ContactItem
                icon={<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                text="contact@annapurna.dev"
              />
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-gray-950/50 py-4">
        <p className="text-center text-gray-500 text-sm">
          Copyright &copy; {new Date().getFullYear()} Annapurna Project - All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
