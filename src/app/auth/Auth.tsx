import React from "react"
import CenterLayout from "../../layout/AuthLayout"
import { Outlet } from "react-router-dom"

const Auth: React.FC = () => {
    return (
        <CenterLayout>
            <Outlet />
        </CenterLayout>
    )
}
export default Auth