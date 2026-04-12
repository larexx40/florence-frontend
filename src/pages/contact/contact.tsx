import SocialLinks from "@/components/shared/social-links"
import { BUSINESS_DETAILS } from "@/constants/business"

export default function Contact() {
  const contactItems = [
    {
      title: "Address",
      content: BUSINESS_DETAILS.address,
    },
    {
      title: "Call",
      content: BUSINESS_DETAILS.phone,
    },
    {
      title: "WhatsApp Only",
      content: BUSINESS_DETAILS.whatsapp,
    },
    {
      title: "Website",
      content: BUSINESS_DETAILS.websiteUrl.replace("https://", "").replace(/\/$/, ""),
      href: BUSINESS_DETAILS.websiteUrl,
    },
  ]

  return (
    <div className="container mx-auto py-10 mt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="rounded-2xl overflow-hidden mb-6">
              <img src="/images/section/contact.jpg" alt="Contact" className="w-full h-[250px] object-cover" />
            </div>
            <div className="space-y-4">
              <p className="text-sm text-cdark-600">
                Everything Florence is a wholesale store for bags, slippers, heels, souvenirs, kitchen gadgets,
                accessories, and more. We do not sell to end users.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={BUSINESS_DETAILS.whatsappOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-cblue-600 px-4 py-2 text-sm font-medium text-white hover:bg-cblue-700 transition-colors"
                >
                  Order on WhatsApp
                </a>
                <a
                  href={BUSINESS_DETAILS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-cdark-200 px-4 py-2 text-sm font-medium text-cdark-700 hover:border-cblue-600 hover:text-cblue-600 transition-colors"
                >
                  Get Directions
                </a>
              </div>
              {contactItems.map((item) => (
                <div key={item.title}>
                  <h6 className="font-semibold mb-1">{item.title}</h6>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-cblue-600 hover:text-cblue-700"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-cdark-600">{item.content}</p>
                  )}
                </div>
              ))}
              <div>
                <h6 className="font-semibold mb-2">Follow or Join Us</h6>
                <SocialLinks />
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-cdark-200 p-6 space-y-4">
              <div>
                <h5 className="text-lg font-semibold mb-2">How to Reach Us Quickly</h5>
                <p className="text-sm text-cdark-600">
                  For fast responses, use WhatsApp for orders, join the Telegram wholesale group for updates, or
                  browse the online store to place orders directly.
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Wholesale Enquiries</h6>
                <p className="text-sm text-cdark-600">
                  Call <span className="font-medium">{BUSINESS_DETAILS.phone}</span> for enquiries and use WhatsApp on{" "}
                  <span className="font-medium">{BUSINESS_DETAILS.whatsapp}</span> for order-related chats.
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Store Location</h6>
                <p className="text-sm text-cdark-600">
                  Visit us at {BUSINESS_DETAILS.address}.
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Online Shopping</h6>
                <a
                  href={BUSINESS_DETAILS.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cblue-600 hover:text-cblue-700"
                >
                  Shop on {BUSINESS_DETAILS.websiteUrl.replace("https://", "").replace(/\/$/, "")}
                </a>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Important Note</h6>
                <p className="text-sm text-cdark-600">
                  Everything Florence is focused on wholesale buyers. Orders and enquiries are handled through the
                  channels above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
