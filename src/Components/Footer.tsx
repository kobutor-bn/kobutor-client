import {CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube} from "react-icons/ci";

function Footer() {
    return (
        <div className="bg-zinc-900 w-screen">
            <div
                className="max-w-screen-md mx-auto flex flex-col md:items-center md:flex-row md:justify-between text-white gap-5 bg-zinc-900 p-6 md:pr-24">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-bold">Kobutor</h1>
                    <p className="max-w-72">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                    <div className="flex gap-4">
                        <CiFacebook className="text-blue-500 h-8 w-8"/>
                        <CiInstagram className="text-red-500 h-8 w-8"/>
                        <CiLinkedin className="text-blue-500 h-8 w-8"/>
                        <CiYoutube className="text-red-400 h-8 w-8"/>
                        <CiTwitter className="text-blue-500 h-8 w-8"/>
                    </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-col">
                    <div className="flex justify-between pt-20 md:pt-0">
                        <p className="">Contact Us</p>
                        <p className="md:hidden">+</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">Information</p>
                        <p className="md:hidden">+</p>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Footer