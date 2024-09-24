"use client";
import { useEffect, useState } from "react";
import {
  reservationList,
  columnReservations,
  columnCustomerDetails,
  customerDetails,
  columnIncome,
  income,
} from "./columns";
import { DataTable } from "./data-table";

async function getReservationData(): Promise<reservationList[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress2/reservation-list`
  );
  const res = await response.json();
  return res.data;
}

async function getCustomerDetails(): Promise<customerDetails[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress2/customer-details`
  );
  const res = await response.json();
  return res.data;
}

async function getIncome(): Promise<income[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress2/income`
  );
  const res = await response.json();
  return res.data;
}

export default function Page() {
  const [reservations, setReservations] = useState<reservationList[]>([]);
  const [customerDetails, setCustomerDetails] = useState<customerDetails[]>([]);
  const [income, setIncome] = useState<income[]>([]);

  useEffect(() => {
    getReservationData().then((data) => {
      data.forEach((data) => {
        data.check_in = new Date(data.check_in).toLocaleDateString();
        data.check_out = new Date(data.check_out).toLocaleDateString();
      });
      setReservations(data);
    });

    getCustomerDetails().then((data) => {
      setCustomerDetails(data);
    });

    getIncome().then((data) => {
      setIncome(data);
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto py-10 px-9">
        <DataTable columns={columnReservations} data={reservations} />
      </div>
      <div className="container mx-auto py-10 px-9">
        <DataTable columns={columnCustomerDetails} data={customerDetails} />
      </div>

      <div className="container mx-auto py-10 px-9">
        <DataTable columns={columnIncome} data={income} />
      </div>
    </div>
  );
}
