import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "@/store/store.index"

export default function Account() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-cblue-100 flex items-center justify-center text-cblue-700 text-xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="font-semibold">{user?.name || "User"}</h2>
                <p className="text-sm text-cdark-500">{user?.email}</p>
              </div>
            </div>
            <Link
              to="/account/profile"
              className="block py-2 text-cblue-600 hover:underline"
            >
              Edit Profile
            </Link>
            <Link
              to="/account/orders"
              className="block py-2 text-cblue-600 hover:underline"
            >
              My Orders
            </Link>
            <Link
              to="/account/addresses"
              className="block py-2 text-cblue-600 hover:underline"
            >
              Addresses
            </Link>
            <Link
              to="/account/change-password"
              className="block py-2 text-cblue-600 hover:underline"
            >
              Change Password
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <p className="text-cdark-500">No orders yet.</p>
            <Link to="/shop" className="inline-block mt-4 text-cblue-600 hover:underline">
              Start Shopping →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
