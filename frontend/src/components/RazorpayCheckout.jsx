// Real Razorpay Integration Component
// Replace with production logic

import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RazorpayCheckout({ plan, amount, onSuccess }) {
  const { API } = useAuth()
  const navigate = useNavigate()

  const handlePayment = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    try {
      // 1. Create order on backend
      const { data: order } = await axios.post(`${API}/api/memberships/create-order`, { plan }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // 2. Razorpay options (production)
      const options = {
        key: order.key, // from backend
        amount: order.amount,
        currency: order.currency,
        name: "CodeMaster Pro",
        description: `${plan.toUpperCase()} Membership`,
        image: "https://your-logo.png",
        order_id: order.order_id,
        handler: async function (response) {
          // 3. Verify payment
          const verify = await axios.post(`${API}/api/memberships/verify`, {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            plan
          }, { headers: { Authorization: `Bearer ${token}` } })
          
          alert('Payment successful! Membership upgraded.')
          if (onSuccess) onSuccess(verify.data)
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: "9999999999"
        },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: function() { console.log('Payment dismissed') }
        }
      }

      // For demo without Razorpay script loaded, we mock success
      if (typeof window.Razorpay === 'undefined') {
        console.log('Razorpay not loaded - using mock flow for demo')
        // Mock verify directly
        const mockPaymentId = `pay_mock_${Date.now()}`
        const verify = await axios.post(`${API}/api/memberships/verify`, {
          order_id: order.order_id,
          payment_id: mockPaymentId,
          plan
        }, { headers: { Authorization: `Bearer ${token}` } })
        alert(`Demo Mode: Payment successful! ${plan} activated. (Add Razorpay script for real payments)`)
        if (onSuccess) onSuccess(verify.data)
        return
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Payment failed')
    }
  }

  return (
    <button onClick={handlePayment} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2">
      Pay ₹{amount} with Razorpay • UPI • Card
    </button>
  )
}

// To enable real Razorpay:
// 1. Add to index.html: <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
// 2. Set RAZORPAY_KEY_ID in backend .env
// 3. In backend/routes/memberships.js, uncomment razorpay.orders.create and signature verification
