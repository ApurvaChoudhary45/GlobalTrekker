import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-11 mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Left Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-teal-400 font-mono">🌍 GlobeTrekker</h2>
                    <p className="text-sm text-gray-400 mt-2 font-light">Explore the world, one country at a time.</p>
                </div>

                {/* Links Section */}
                <div className="flex gap-6 flex-wrap justify-center">
                    <a href="#" className="text-gray-300 hover:text-teal-300 transition font-medium text-sm">Home</a>
                    <a href="#" className="text-gray-300 hover:text-teal-300 transition font-medium text-sm">About</a>
                    <a href="#" className="text-gray-300 hover:text-teal-300 transition font-medium text-sm">Countries</a>
                    <a href="#" className="text-gray-300 hover:text-teal-300 transition font-medium text-sm">Contact</a>
                </div>

                {/* Right Section - Developer Credit (optional) */}
                <div className="text-sm text-gray-500 text-center md:text-right">
                    <p className="font-light">Made with 🌎 by Apurva Singh</p>
                    <p className="text-xs mt-1">© {new Date().getFullYear()} GlobeTrekker. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
