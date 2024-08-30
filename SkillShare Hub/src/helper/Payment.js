import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";
import logo from "../assets/Favicon/favicon-32x32.png";

const handlePayment = async (course, user) => {
  const navigate = useNavigate(); // Get the navigate function

  const data = {
    courseId: course._id, // Include course ID
    name: course.name, // Include course name
    price: course.price,
  };

  const fetchCreateOrder = await fetch(SummaryAPI.createOrder.url, {
    method: SummaryAPI.createOrder.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const orderDetails = await fetchCreateOrder.json();
  if (!orderDetails || !orderDetails.amount || !orderDetails.id) {
    throw new Error("Invalid order details received. Please try again.");
  }

  const options = {
    key: import.meta.env.VITE_APP_RAZORPAY_API_KEY,
    amount: orderDetails.amount,
    currency: orderDetails.currency,
    name: "SkillShare Hub",
    description: "Enroll in course",
    image: logo,
    order_id: orderDetails.id,
    handler: async function (response) {
      // Handle the success response here
      console.log(response);
      const paymentData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      console.log("Payment Data: ", paymentData);
      const verifyPayment = await fetch(SummaryAPI.verifyPayment.url, {
        method: SummaryAPI.verifyPayment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      const paymentResult = await verifyPayment.json();
      console.log(paymentResult);
      if (paymentResult.success) {
        toast.success("Payment Successful! Enrollment complete.");
        navigate('/my-course'); // Redirect to My Course page
      } else {
        toast.error("Payment failed! Please try again.");
      }
    },
    prefill: {
      name: user?.name,
      email: user?.email,
      contact: user?.contact, // Optional: Prefill the user's contact details
    },
    notes: {
      courseId: data?.courseId,
      userId: user?._id,
    },
    theme: {
      color: "#06bbcc", // Customize the color of the Razorpay checkout
    },
  };

  // Open the Razorpay payment window
  const razorpay = new useRazorpay(options);
  razorpay.open();

  // Handle any errors during the checkout
  razorpay.on("payment.failed", function (response) {
    console.error(response.error);
    toast.error("Payment failed! Please try again.");
  });
};

export default handlePayment;
