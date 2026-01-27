
import React from "react";
import { getRentalPlans } from "@/lib/rentals";
import RentalClient from "./RentalClient";

export const revalidate = 0;

export default async function RentalPage() {
    const rentalPlans = await getRentalPlans();

    return <RentalClient rentalPlans={rentalPlans} />;
}
