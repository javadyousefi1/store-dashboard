import { useState } from "react";
// componetns
import PageHeader from "../../../../components/shared/PageHeader";

import PageTitle from "../../../../components/shared/PageTitle";
import ButtonComponent from "../../../../components/shared/ButtonComponent";
import UserDetail from "./UserDetail";

const CustomerList = () => {

  const users = [
    {id: 1, name:"ali", email: 'amir@yahoo.com', phoneNumber: '0938145678', gender: '1'},
    {id: 2, name:"sara", email: 'amir@yahoo.com', phoneNumber: '0938145678', gender: '2'},
    {id: 3, name:"bahar", email: 'amir@yahoo.com', phoneNumber: '0938145678', gender: '2'},
    {id: 4, name:"javad", email: 'amir@yahoo.com', phoneNumber: '0938145678', gender: '1'},
    {id: 5, name:"amir", email: 'amir@yahoo.com', phoneNumber: '0938145678', gender: '1'},
  ]
 
  return (
    <>
      <PageTitle title="Customer List" />
      <PageHeader
        title="Customer List"
        leftSection={<ButtonComponent title="Add Customer" type="primary" className="p-2"/>}
      />

      <div>
        {users.map((item) => (

      <UserDetail key={item.id} item={item}/>
        ))}
      
      </div>
          </>
  );
};

export default CustomerList;
