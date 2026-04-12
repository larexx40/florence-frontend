import type { Order } from "@/@types/order.type"

export const mockOrders: Order[] = [
  { id: "1", orderNumber: "#ORD-001", customer: "John Doe", email: "john@example.com", date: "2025-03-15", items: 3, total: 259.97, status: "Delivered", paymentMethod: "Credit Card" },
  { id: "2", orderNumber: "#ORD-002", customer: "Jane Smith", email: "jane@example.com", date: "2025-03-14", items: 1, total: 120.00, status: "Processing", paymentMethod: "PayPal" },
  { id: "3", orderNumber: "#ORD-003", customer: "Mike Johnson", email: "mike@example.com", date: "2025-03-13", items: 2, total: 180.00, status: "Pending", paymentMethod: "Credit Card" },
  { id: "4", orderNumber: "#ORD-004", customer: "Sarah Wilson", email: "sarah@example.com", date: "2025-03-12", items: 5, total: 425.00, status: "Shipped", paymentMethod: "Debit Card" },
  { id: "5", orderNumber: "#ORD-005", customer: "Chris Brown", email: "chris@example.com", date: "2025-03-11", items: 1, total: 80.00, status: "Cancelled", paymentMethod: "Credit Card" },
  { id: "6", orderNumber: "#ORD-006", customer: "Emily Davis", email: "emily@example.com", date: "2025-03-10", items: 4, total: 340.00, status: "Approved", paymentMethod: "PayPal" },
  { id: "7", orderNumber: "#ORD-007", customer: "Alex Turner", email: "alex@example.com", date: "2025-03-09", items: 2, total: 200.00, status: "Delivered", paymentMethod: "Credit Card" },
  { id: "8", orderNumber: "#ORD-008", customer: "Lisa Anderson", email: "lisa@example.com", date: "2025-03-08", items: 3, total: 310.00, status: "Processing", paymentMethod: "Apple Pay" },
  { id: "9", orderNumber: "#ORD-009", customer: "Tom Harris", email: "tom@example.com", date: "2025-03-07", items: 1, total: 100.00, status: "Pending", paymentMethod: "Google Pay" },
  { id: "10", orderNumber: "#ORD-010", customer: "Nina Patel", email: "nina@example.com", date: "2025-03-06", items: 6, total: 540.00, status: "Shipped", paymentMethod: "Credit Card" },
]
