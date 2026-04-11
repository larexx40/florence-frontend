export default function AdminSettings() {
  return (
    <div className="max-w-2xl">
      <h4 className="text-xl font-semibold mb-6">Profile Settings</h4>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-cblue-100 flex items-center justify-center text-cblue-700 text-xl font-bold">
            A
          </div>
          <div>
            <h5 className="font-semibold">Admin User</h5>
            <p className="text-sm text-cdark-500">admin@everythingflorence.com</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" defaultValue="Admin User" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" defaultValue="admin@everythingflorence.com" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" placeholder="••••••••" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500" placeholder="••••••••" />
        </div>
        <div className="pt-2">
          <button className="px-6 py-2.5 bg-cblue-600 text-white rounded-lg text-sm font-medium hover:bg-cblue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
