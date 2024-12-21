import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  IndianRupee,
  LoaderCircleIcon,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import CartCard from "@/components/trips/CartCard";
import { Button } from "@/components/ui/button";
import VisaImage from "@/components/images/visa.png";
import RupayImage from "@/components/images/card.png";
import MasterCardImage from "@/components/images/payment.png";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createPayment } from "@/store/slices/paymentSlice";
import { postbookedTrip } from "@/store/slices/bookedtripsSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BuyDetails from "@/components/Payment/BuyDetails";

const Cart = () => {
  const {
    cart,
    status: {
      cart: { loading: cartloading, error: cartError },
    },
  } = useAppSelector((state) => state.cart);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    payments,
    status: {
      payments: { loading: paymentloading, error: paymentError },
    },
  } = useAppSelector((state) => state.payments);
  const dispatch = useAppDispatch();

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const cost = cart.reduce(
        (sum, trip) => sum + (parseInt(trip?.tripID?.price) || 0),
        0
      );
      setTotalCost(cost);
    }
  }, [cart]);

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      {/* Top Questions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart && cart.length === 0 && <div>No Trip in cart.</div>}
          {cart &&
            cart.length > 0 &&
            cart.map((trip, index) => (
              <CartCard key={trip?._id} _id={trip?._id} trip={trip?.tripID} />
            ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Total Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalCost.toFixed(2)}</div>
          </CardContent>
        </Card>

        {cart && cart.length > 0 && (
          <Card className="flex flex-col items-center justify-center p-3">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex justify-between items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Buy</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Complete Payment</DialogTitle>
                    </DialogHeader>
                    <BuyDetails
                      price={totalCost}
                      onClose={() => setIsDialogOpen(false)}
                      setTotalCost={setTotalCost}
                      cart={cart}
                      paymentloading={paymentloading}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={VisaImage}
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
                <img
                  src={MasterCardImage}
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
                <img
                  src={RupayImage}
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cart;
