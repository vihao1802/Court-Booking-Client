"use client";
import React, { Fragment } from "react";
import PaymentDetail from "@/components/book-court/payment/PaymentDetail";
import StepperPayment from "@/components/book-court/payment/StepperPayment";

const BookCourtPaymentPage = () => {
  return (
    <Fragment>
      <StepperPayment activeCurrStep={2} />
      <PaymentDetail />
    </Fragment>
  );
};

export default BookCourtPaymentPage;
