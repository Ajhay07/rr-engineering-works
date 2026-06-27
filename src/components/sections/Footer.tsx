import { Gauge } from "lucide-react";
import { LinkedInIcon, YouTubeIcon, TwitterIcon, FacebookIcon } from "@/components/ui/social-icons";
import { COMPANY } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { INDUSTRIES } from "@/data/content";
import { CERTIFICATIONS } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
                <Gauge className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="font-display font-semibold text-lg">RR Engineering Works</span>
            </a>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
              Precision industrial valve manufacturing from Kanchipuram, Tamil Nadu —
              serving oil &amp; gas, petrochemical, power, marine and process industries
              across domestic and export markets.
            </p>
            <div className="flex gap-3">
              {[
                { icon: LinkedInIcon, href: COMPANY.social.linkedin, label: "LinkedIn" },
                { icon: YouTubeIcon, href: COMPANY.social.youtube, label: "YouTube" },
                { icon: TwitterIcon, href: COMPANY.social.twitter, label: "Twitter" },
                { icon: FacebookIcon, href: COMPANY.social.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/70 hover:bg-accent hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide mb-5 text-white/90">
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <a href="#products" className="text-sm text-white/60 hover:text-accent transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide mb-5 text-white/90">
              Industries
            </h4>
            <ul className="flex flex-col gap-3">
              {INDUSTRIES.slice(0, 6).map((ind) => (
                <li key={ind.id}>
                  <a href="#industries" className="text-sm text-white/60 hover:text-accent transition-colors">
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide mb-5 text-white/90">
              Certifications
            </h4>
            <ul className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id} className="text-sm text-white/60">
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Design prototype — for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
