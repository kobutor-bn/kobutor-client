import {CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube} from "react-icons/ci";
import {HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker} from "react-icons/hi";
import {Link} from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="font-Nunito bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 lg:px-8 py-12 2xl:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="font-montserrat text-blue-400 text-3xl 2xl:text-4xl font-extrabold">Kobutor</h2>
                        <p className="text-gray-300 text-sm 2xl:text-lg leading-relaxed">
                            Your trusted destination for premium electronics and women's bags. Quality products, exceptional service, delivered across Europe.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Facebook">
                                <CiFacebook className="h-7 w-7 2xl:h-10 2xl:w-10"/>
                            </a>
                            <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors" aria-label="Instagram">
                                <CiInstagram className="h-7 w-7 2xl:h-10 2xl:w-10"/>
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="LinkedIn">
                                <CiLinkedin className="h-7 w-7 2xl:h-10 2xl:w-10"/>
                            </a>
                            <a href="#" className="text-red-400 hover:text-red-300 transition-colors" aria-label="YouTube">
                                <CiYoutube className="h-7 w-7 2xl:h-10 2xl:w-10"/>
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Twitter">
                                <CiTwitter className="h-7 w-7 2xl:h-10 2xl:w-10"/>
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h3 className="font-montserrat text-xl 2xl:text-2xl font-bold mb-4">Shop</h3>
                        <ul className="space-y-3 text-sm 2xl:text-lg">
                            <li>
                                <Link to="/product/listing?category=Electronics" className="text-gray-300 hover:text-white transition-colors">
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link to="/product/listing?category=Women Bags" className="text-gray-300 hover:text-white transition-colors">
                                    Women's Bags
                                </Link>
                            </li>
                            <li>
                                <Link to="/product/listing" className="text-gray-300 hover:text-white transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h3 className="font-montserrat text-xl 2xl:text-2xl font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-3 text-sm 2xl:text-lg">
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link to="/order/history" className="text-gray-300 hover:text-white transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-montserrat text-xl 2xl:text-2xl font-bold mb-4">Get in Touch</h3>
                        <div className="space-y-3 text-sm 2xl:text-lg text-gray-300">
                            <div className="flex items-start gap-3">
                                <HiOutlineMail className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                                <a href="mailto:support@kobutor.com" className="hover:text-white transition-colors">
                                    support@kobutor.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <HiOutlinePhone className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                                <a href="tel:+351123456789" className="hover:text-white transition-colors">
                                    +351 123 456 789
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <HiOutlineLocationMarker className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                                <p>Lisbon, Portugal, EU</p>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="font-semibold mb-3 text-sm 2xl:text-lg">Subscribe to our newsletter</h4>
                            <form className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm 2xl:text-lg"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm 2xl:text-lg"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-xs 2xl:text-sm text-gray-400 mt-2">
                                Get 10% off your first order!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm 2xl:text-lg text-gray-400">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>SSL Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                            </svg>
                            <span>Free EU Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"/>
                            </svg>
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Links - CRITICAL FOR EU */}
            <div className="border-t border-gray-700 bg-gray-900">
                <div className="container mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs 2xl:text-base text-gray-400">
                        <p>&copy; {currentYear} Kobutor. All Rights Reserved.</p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-conditions" className="hover:text-white transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link to="/cookie-policy" className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                            <Link to="/gdpr" className="hover:text-white transition-colors">
                                GDPR
                            </Link>
                            <Link to="/about" className="hover:text-white transition-colors">
                                About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;