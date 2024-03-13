import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Contact Us</h3>
          <p className="text-gray-700 mb-1">Email: nssteamvnrvjiet@gmail.com</p>
          <p className="text-gray-700 mb-1">Phone: 9963168687</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Quick Links</h3>
          <ul className="text-gray-700">
            <li className="mb-1 hover:text-blue-800"><a href="https://nss.gov.in/">About Us</a></li>
            <li className="mb-1 hover:text-blue-800"><a href="/camps">Donate</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Follow Us</h3>
          <div className="flex items-center justify-center">
            <a href="https://www.facebook.com/nssvnrvjiet"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="Facebook" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
            <a href="https://twitter.com/nss_vnrvjiet"><img src="https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png" alt="Twitter" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
            <a href="https://www.instagram.com/nss_vnrvjiet/"><img src="https://image.similarpng.com/very-thumbnail/2020/05/Vector-Instagram-icon-PNG.png" alt="Instagram" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-4">© 2024 Camp Details. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
