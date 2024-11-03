import IconifyComp from "@/components/shared/IconifyComp";
import { Button, Dropdown, MenuProps } from "antd";

interface itemType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: number;
  icon: File;
}

const style={
  textColor: 'w-40 flex justify-start items-center text-text-color-text-dark'
}


const onClick: MenuProps['onClick'] = ({ key }) => {
  alert(`Click on item ${key}`);
};


const UserDetail: React.FC<{ item: itemType }> = ({ item }) => {
  const dropDownOption: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="flex justify-center items-center gap-x-2 p-2 border-none bg-first-blue-light hover:!bg-first-blue-light" htmlType='button'>
          <IconifyComp icon="pencil" size="medium" color="var(--color-first-blue)" />
          <span className="text-first-blue">Edit</span>
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button className="flex justify-center items-center gap-x-2 p-2 border-none bg-error-light hover:!bg-error-light" htmlType='button'>
          <IconifyComp icon="trash" size="medium" color="var(--color-error)" />
          <span className="text-error">Delete</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[10px] flex justify-between items-center p-5 mt-3">
      <div className="w-40 flex justify-between items-center gap-x-3">
        <img src={item.icon} className="w-8 h-8 rounded-full" />
        <span className="text-left truncate w-[20ch]">{item.name}</span>
      </div>
      <div className={style.textColor}>{item.email}</div>
      <div className={style.textColor}>
        {item.phoneNumber}
      </div>
      <div className="w-40 flex justify-start items-center">
        <span
          className={`rounded-full py-[4px] px-4 ${
            item.gender === 1
              ? "text-first-blue bg-first-blue-light"
              : "text-secondary bg-secondary-bg"
          }`}
        >
          {item.gender === 1 ? "Male" : "Female"}
        </span>
      </div>
      <div className="w-40 flex justify-start items-center">
        <Dropdown menu={{ items: dropDownOption, onClick }}>
          <Button className="!border-none p-0" onClick={(e) => e.preventDefault()}>
            <IconifyComp icon="threeDotMenu" size="large" className="rotate-90"/>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserDetail;
