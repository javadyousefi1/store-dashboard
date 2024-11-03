import { useState } from "react";
// componetns
import PageHeader from "../../../../components/shared/PageHeader";

import PageTitle from "../../../../components/shared/PageTitle";
import ButtonComponent from "../../../../components/shared/ButtonComponent";
import image from "@/assets/images/image-profile.jpg";
import CustomerListContent from "./CustomerListContent";
const CustomerList = () => {
  const users = [
    {
      id: 1,
      name: "ali",
      email: "amir@yahoo.com",
      phoneNumber: "0938145678",
      gender: 1,
      icon: image,
    },
    {
      id: 2,
      name: "sara",
      email: "amir@yahoo.com",
      phoneNumber: "0938145678",
      gender: 2,
      icon: image,
    },
    {
      id: 3,
      name: "bahar",
      email: "amir@yahoo.com",
      phoneNumber: "0938145678",
      gender: 2,
      icon: image,
    },
    {
      id: 4,
      name: "javad",
      email: "amir@yahoo.com",
      phoneNumber: "0938145678",
      gender: 1,
      icon: image,
    },
    {
      id: 5,
      name: "amir",
      email: "amir@yahoo.com",
      phoneNumber: "0938145678",
      gender: 1,
      icon: image,
    },
  ];

  return (
    <>
      <PageTitle title="Customer List" />
      <PageHeader
        title="Customer List"
        leftSection={
          <ButtonComponent
            title="Add Customer"
            type="primary"
            className="p-2"
          />
        }
      />

      <CustomerListContent users={users} 
      columnTitle={['Name', 'Email', 'PhoneNumber', 'Gender', '']}
      />
    </>
  );
};

export default CustomerList;
