import React, { useEffect, useState } from 'react';

const ServicesPage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchedServices = [
            {
                title: 'Laveur',
                availability: '2',
                start: '2023-04-02',
                duration: '1h',
                location: 'l',
                additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                requiredQualification: 'B'
            },
            {
                title: 'Plombier',
                availability: '3',
                start: '2023-05-15',
                duration: '2h',
                location: 'm',
                additionalInfo: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
                requiredQualification: 'C'
            },
            {
                title: 'Électricien',
                availability: '1',
                start: '2023-07-10',
                duration: '1.5h',
                location: 'n',
                additionalInfo: 'Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
                requiredQualification: 'D'
            }
        ];

        setServices(fetchedServices);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className="main-section">

            <main className="main-content">
                <h2>Services Disponibles</h2>
                <div className="services-container">
                    {services.map((service, index) => (
                        <div key={index} className="service-box">
                            <h3>{service.title}</h3>
                            <p><strong>Disponibilité :</strong> {service.availability}</p>
                            <p><strong>Début :</strong> {service.start}</p>
                            <p><strong>Durée :</strong> {service.duration}</p>
                            <p><strong>Lieu :</strong> {service.location}</p>
                            <p><strong>Informations supplémentaires :</strong> {service.additionalInfo}</p>
                            <p><strong>Qualification requise :</strong> {service.requiredQualification}</p>
                        </div>
                    ))}
                </div>
            </main>
           
        </div>
    );
};

export default ServicesPage;
