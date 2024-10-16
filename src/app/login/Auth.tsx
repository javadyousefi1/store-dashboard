import React from "react"
import CenterLayout from "global/layout/CenterLayout"
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