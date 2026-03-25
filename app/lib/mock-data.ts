type GymData = {
    gyms: {
        id: number;
        name: string;
        emails: {
            general: string;
            support: string;
        }
        location: string;
        description: string;
    }[];
    members: {
        id: number;
        name: string;
        email: string;
    }[];
}

export const MOCK_GYM_DATA: GymData = {
    gyms: [
        {
            id: 1,
            name: "Iron Gym",
            emails: {
                general: "general@irongym.com",
                support: "support@irongym.com"
            },
            location: "123 Main St, Anytown, USA",
            description: "A state-of-the-art gym with all the latest equipment and classes."
        },
    ],
    members: [
        {
            id: 1,
            name: "Lucas",
            email: "lucas@alljim .com"
        }
    ]
}