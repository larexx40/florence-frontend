export default function Contact() {
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
              <div>
                <h6 className="font-semibold mb-1">Address</h6>
                <p className="text-sm text-cdark-600">123 Yarran st, Punchbowl, NSW 2196, Australia</p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Phone</h6>
                <p className="text-sm text-cdark-600">(64) 8342 1245</p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Email</h6>
                <p className="text-sm text-cdark-600">support@everythingflorence.com</p>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" placeholder="Subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={5} className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500 resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-cblue-600 text-white rounded-lg text-sm font-medium hover:bg-cblue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
