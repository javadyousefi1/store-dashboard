import IconifyComp from "@/components/shared/IconifyComp"
import UserDetail from "./UserDetail"

const CustomerListContent :React.FC<{ users: itemType }> = ({users, columnTitle}) => {
  return (
    <>
        {/* column */}
        <div className="flex justify-between items-center">
          {columnTitle.map((item) => (
            <div key={item} className="flex justify-center items-center gap-x-4">
            <span>{item}</span>
            <IconifyComp icon="boldArrowDown" size="small"/>
            </div>
          ))}
        </div>
        {/* list */}
        {users.map((item) => (
          <UserDetail key={item.id} item={item} />
        ))}
      </>
  )
}

export default CustomerListContent