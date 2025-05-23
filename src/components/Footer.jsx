import { Twitter ,Facebook,Instagram} from 'lucide-react';
function Footer() {
    return (
        <footer className="bg-blue-900 text-white p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">Filters</h3>
                    <p className="text-sm">All rights reserved.</p>
                    <h3 className="text-lg font-bold mb-4">© {new Date().getFullYear()} American</h3>
                </div>

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">About Us</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="/" className="hover:text-blue-400">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-blue-400">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex justify-center sm:justify-start space-x-4">
                        <a href="/" target="_blank" className="text-2xl bg-blue-600 p-2 rounded-full">
                            <Facebook fill="white" stroke={0} />
                        </a>
                        <a href="/" target="_blank" className="text-2xl bg-blue-500 p-2 rounded-full">
                            <Twitter fill="white" stroke={0} />
                        </a>
                        <a href="/" target="_blank" className="text-2xl bg-blue-600 p-2 rounded-full">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
