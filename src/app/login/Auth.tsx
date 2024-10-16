import React from "react"
import CenterLayout from "../../layout/CenterLayout"
import { Outlet } from "react-router-dom"

const Auth: React.FC = () => {
    return (
        <CenterLayout>
        <div>
        <Outlet/>
        </div>
    </CenterLayout>
    )
}
export default Auth