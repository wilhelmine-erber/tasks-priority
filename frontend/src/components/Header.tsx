import React, { useEffect, useState } from 'react'

function Header() {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        setCurrentDateTime(new Date());
    }, [])

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('de-DE', options);
    };
    const formattedDate = formatDate(currentDateTime);


    return (
        <header className='flex justify-between items-center p-5 bg-[#f3f4f6] mb-10'>

            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                <li><a>einloggen</a></li>
                <li><a>registrieren</a></li>
            </ul>

            <div>
                <p>{formattedDate}</p>
            </div>

        </header>
    )
}

export default Header