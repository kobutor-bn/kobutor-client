import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 z-50 shadow-2xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="text-sm md:text-base">
                        We use cookies to enhance your browsing experience and analyze our traffic.
                        By clicking "Accept", you consent to our use of cookies.{' '}
                        <Link to="/cookie-policy" className="underline hover:text-blue-400">
                            Learn more
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={acceptCookies}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Accept All
                    </button>
                    <Link to="/cookie-policy">
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                            Customize
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;