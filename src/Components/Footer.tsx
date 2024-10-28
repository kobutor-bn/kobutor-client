import {CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube} from "react-icons/ci";

function Footer() {
    return (
        <footer className="font-Nunito bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-wrap gap-5 justify-between lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="w-full lg:w-full mb-6 lg:mb-0">
                        <h2 className="font-montserrat text-red-300 text-2xl font-extrabold mb-4">Kobutor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                            ullamcorper mattis, pulvinar dapibus leo.</p>
                        <div className="flex gap-4 mt-4">
                            <CiFacebook className="text-blue-500 h-8 w-8"/>
                            <CiInstagram className="text-red-500 h-8 w-8"/>
                            <CiLinkedin className="text-blue-500 h-8 w-8"/>
                            <CiYoutube className="text-red-400 h-8 w-8"/>
                            <CiTwitter className="text-blue-500 h-8 w-8"/>
                        </div>
                    </div>

                    <div className="w-full lg:w-full mb-6 lg:mb-0">
                        <h2 className="font-montserrat text-xl font-bold mb-4">Contact Us</h2>
                        <p>Email: info@kobutor.com</p>
                        <p>Phone: +123-456-7890</p>
                        <p>Address: 123 Street Name, City, Country</p>
                    </div>

                    <div className="w-full lg:w-full mb-6 lg:mb-0">
                        <h2 className="font-montserrat text-xl font-bold mb-4">Information</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="w-full lg:w-full mb-6 lg:mb-0">
                        <h2 className="font-montserrat text-xl font-bold mb-4">Newsletter Signup</h2>
                        <form>
                            <input type="email" placeholder="Your email" className="w-full p-2 mb-2 text-black"/>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm">&copy; 2024 Kobutor. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer