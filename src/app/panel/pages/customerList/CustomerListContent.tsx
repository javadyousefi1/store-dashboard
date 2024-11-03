import IconifyComp from "@/components/shared/IconifyComp"
import UserDetail from "./UserDetail"

const CustomerListContent :React.FC<{ users: itemType }> = ({users, columnTitle}) => {
  return (
    <>
        {/* column */}
        <div className="flex justify-between items-center px-5">
          {columnTitle.map((item) => (
            <div key={item} className="w-40 flex justify-start items-center gap-x-2">
            <span className="text-[12px] text-text-color-text-dark">{item}</span>
            {item !== '' && <IconifyComp icon="boldArrowDown" size="small"/>}
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