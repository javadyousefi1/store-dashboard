
interface itemType {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: number;
    icon: File
  }

  const UserDetail: React.FC<{ item: itemType }> = ({item}) => {
  return (
    <div className="bg-white rounded flex justify-between items-center p-5 mt-3">
        <div className="w-40 flex justify-between items-center gap-x-3">
          <img src={item.icon} className="w-8 h-8 rounded-full"/>
          <span className="text-left truncate w-[20ch]">{item.name}</span>
        </div>
        <div>
          {item.email}
        </div>
        <div>
          {item.phoneNumber}
        </div>
        <div className={`rounded-full py-[4px] px-4 ${item.gender === 1 ? 'text-first-blue bg-first-blue-light' : 'text-secondary bg-secondary-bg'}`}>
          {item.gender === 1 ? 'Male' : 'Female'}
        </div>
    </div>
  )
}

export default UserDetail