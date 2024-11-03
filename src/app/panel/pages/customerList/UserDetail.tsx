
interface itemType {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
  }

  const UserDetail: React.FC<{ item: itemType }> = ({item}) => {
  return (
    <div className="bg-white rounded">
        
    </div>
  )
}

export default UserDetail