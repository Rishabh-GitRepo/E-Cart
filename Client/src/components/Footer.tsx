import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-orange-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-4">
          <BrandLogo className="text-white" textClassName="text-white" />
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            Discover premium essentials, everyday favorites, and trend-setting finds for modern living.
          </p>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-[0.18em] text-orange-200 uppercase">
            Quick Links
          </h3>
          <ul className="space-y-4 text-sm text-slate-300">
            <li>
              <Link to="/products" className="transition hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="transition hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-[0.18em] text-orange-200 uppercase">
            Customer Care
          </h3>
          <ul className="space-y-4 text-sm text-slate-300">
            <li>
              <Link to="/shipping-policy" className="transition hover:text-white">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="transition hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-[0.18em] text-orange-200 uppercase">
            Contact Us
          </h3>
          <ul className="space-y-5 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-300" />
              <a href="mailto:support@etrade.in" className="transition hover:text-white underline">
                support@etrade.in
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-300" />
              <a href="tel:+919877123456" className="transition hover:text-white">
                +91 98771 23456
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-300" />
              <a
                href="https://maps.google.com/?q=New+Delhi,India"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                New Delhi, India
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
        © 2026 E-Trade. All Rights Reserved.
      </div>
    </footer>
  );
}
