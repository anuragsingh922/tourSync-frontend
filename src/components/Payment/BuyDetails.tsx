import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearCart } from "@/store/slices/cartSlice";
import { createPayment } from "@/store/slices/paymentSlice";
import { postbookedTrip } from "@/store/slices/bookedtripsSlice";
import { toast } from "@/hooks/use-toast";
import { Dot, IndianRupee, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UPIImage from "@/components/images/upi.png";
import CreditCardImage from "@/components/images/creditCard.png";
import DebitCardImage from "@/components/images/debitCard.png";
import GooglePayImage from "@/components/images/googlePay.png";
import { useNavigate } from "react-router-dom";

const paymentOptions = [
  { name: "Google Pay", src: GooglePayImage },
  { name: "UPI", src: UPIImage },
  { name: "Debit Card", src: DebitCardImage },
  { name: "Credit Card", src: CreditCardImage },
];

const BuyDetails = ({
  price: totalCost,
  onClose,
  setTotalCost,
  cart,
  paymentloading,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedPaymentIndex, setselectedPaymentIndex] = useState(null);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
          <CardContent className="flex gap-1">
            Total Amount : <IndianRupee width={"15px"} />
            {totalCost}
          </CardContent>
          <CardTitle>Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentOptions &&
            paymentOptions.length > 0 &&
            paymentOptions.map((paymentOption, index) => {
              return (
                <Card
                  key={paymentOption?.name}
                  className={`w-full h-16 ${
                    index === selectedPaymentIndex-1 && "border-green-500"
                  } my-2 flex items-center justify-between px-1 gap-5`}
                  onClick={() => setselectedPaymentIndex(index+1)}
                >
                  <div className="flex items-center px-1 gap-5">
                    <img
                      src={paymentOption?.src}
                      alt="image"
                      style={{ width: "80px", height: "3rem" }}
                    />
                    <div>{paymentOption?.name}</div>
                  </div>
                  <div>
                    <Dot
                      className={`${
                        index === selectedPaymentIndex-1 && "text-green-500"
                      }`}
                      size={"40px"}
                    ></Dot>
                  </div>
                </Card>
              );
            })}
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        <Button
          onClick={() => {
            console.log("Option : " , selectedPaymentIndex);
            if (!selectedPaymentIndex) {
              toast({
                title: "",
                description: "Please choose an payment option.",
                variant: "destructive",
              });
              return;
            }
            const paymentPayload = {
              amount: totalCost.toString(),
              description: "Book trips",
              currency: "INR",
              trips: cart,
            };
            dispatch(createPayment(paymentPayload))
              .unwrap()
              .then((payload: any) => {
                if (payload?.paymentId) {
                  dispatch(postbookedTrip(cart))
                    .unwrap()
                    .then((payload) => {
                      dispatch(clearCart());
                      setTotalCost(0);
                      toast(({
                        title : "Trip Booked",
                        description : "Trip Booked successfully.",
                        variant : "default"
                      }))
                      navigate("/booked-trips")
                    });
                } else {
                  toast({
                    title: "Payment",
                    description: "Payment Failed",
                    variant: "destructive",
                  });
                }
              });
          }}
        >
          {paymentloading ? "Processing" : "Proceed"}
          {paymentloading && (
            <LoaderCircleIcon className="animate-spin h-12 w-12 " />
          )}
        </Button>
      </div>
    </>
  );
};

export default BuyDetails;
