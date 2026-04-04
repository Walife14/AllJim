
// components
import ManagementNavbar from "@/app/components/management/ManagementNavbar";

type Props = {
    children: React.ReactNode;
    params: Promise<{ gymSlug: string }>
}

export default async function layout({ children }: Props) {

    return (
        <div className="flex gap-x-1 h-screen">
            <ManagementNavbar />
            {children}
        </div>
    )
}