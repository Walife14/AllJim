
// components
import CheckInCard from "./CheckInCard"

type Props = {}

const dummyUsers = [
    {
        name: 'Lucas Smith',
        status: 'active',
        id: '123'
    },
    {
        name: 'Eve Doe',
        status: 'inactive',
        id: '124'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Kian Daniels',
        status: 'active',
        id: '126'
    },
]

export default function CheckInManager({ }: Props) {
    return (
        <div>
            <h2 className="text-center">Check In Feed</h2>

            <div className="flex flex-col gap-y-2">
            {dummyUsers.map((user: any, index: number) => (
                <CheckInCard name={user.name} status={user.status} id={user.id} key={index} />
            ))}
            </div>
        </div>
    )
}