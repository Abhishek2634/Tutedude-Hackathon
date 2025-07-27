import Link from 'next/link';

// Reusable card component for the "How It Works" section
const HowItWorksCard = ({ number, title, description }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-bold text-xl rounded-full">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      
      {/* Hero Section */}
      <main className="max-w-4xl py-20 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
          Empowering India's Street Food Vendors.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Annapurna helps street vendors buy raw materials together, unlocking better prices, consistent quality, and saving precious time.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/co-op-order" 
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-green-700 bg-white border-2 border-green-600 rounded-lg shadow-md hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-500 dark:hover:bg-gray-700 transition-transform transform hover:scale-105"
          >
            Create an Order
          </Link>
        </div>
      </main>

      {/* "How It Works" Section */}
      <section className="w-full bg-gray-100 dark:bg-gray-800/50 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <HowItWorksCard 
              number="1"
              title="Join a Local Co-op"
              description="Sign up and get instantly grouped with nearby vendors to combine your buying power."
            />
            <HowItWorksCard 
              number="2"
              title="Build a Group List"
              description="Easily add the raw materials you need to your co-op's weekly shopping list."
            />
            <HowItWorksCard 
              number="3"
              title="Get Stable Prices"
              description="Verified suppliers bid on your large order, giving you locked-in prices and reliable delivery."
            />
          </div>
        </div>
      </section>

    </div>
  );
}
