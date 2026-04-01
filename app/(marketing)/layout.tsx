import { getUserProfileAction } from "../actions/auth/get-user";
import Navbar from "../components/marketing/Navbar";

type Props = {
    children: React.ReactNode;
}

export default async function MarketingLayout({ children }: Props) {
    const { data: user } = await getUserProfileAction()

    return (
        <>
            <Navbar user={user} />

            {children}
        </>
    )
}