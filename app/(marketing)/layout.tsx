import { getUserProfileAction } from "../actions/auth/get-user";
import { getCurrentUserGymAction } from "../actions/auth/get-user-gym";
import Navbar from "../components/marketing/Navbar";

type Props = {
    children: React.ReactNode;
}

export default async function MarketingLayout({ children }: Props) {
    const { data: user } = await getUserProfileAction()
    const { data: gym } = await getCurrentUserGymAction()

    return (
        <>
            <Navbar user={user} />
            {children}
        </>
    )
}