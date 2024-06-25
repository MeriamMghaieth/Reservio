import React from 'react';
import './MainSection.css';
import clientIcon from '../assets/8664831_user_icon.png';
import providerIcon from '../assets/8666755_users_group_icon.png';
import theguy from '../assets/e8719ecf-32f8-4853-8ae2-27df0a56f8e1-removebg-preview.png';
import navphoto from '../assets/facilitenav-removebg.png';
import flamephoto from '../assets/flame-removebg-preview (1).png';
import largecatphoto from '../assets/largecat-removebg-preview.png';
import reservephoto from '../assets/reserve-removebg-preview.png';

const MainSection = () => {
  return (
    <section className="main-section">
      <div className="animation-container">
        <img src={theguy} alt="Your Image" className="image-with-shadow" />
      </div>
      <div className="main-content">
        <h1>Explorez Notre Univers de Réservations Personnalisées</h1>
        <p>Bienvenue sur notre plateforme de réservation où la diversité des services est à portée de clic.<br></br> Du bien-être aux services spécialisés, chaque catégorie offre une multitude d'options que vous pouvez explorer et réserver selon vos besoins.<br></br> Que vous soyez un client cherchant le service parfait ou un prestataire souhaitant présenter vos offres, notre site vous permet de créer des réservations personnalisées</p>
      </div>
      <section className="our-users" id="our-users">
        <h2>Découvrez notre Communauté</h2>
        <div className="user-boxes">
          <div className="user-box">
            <h3>Client</h3>
            <img src={clientIcon} alt="Client Icon" />
            <p>⭐ Explorez notre large éventail de catégories de services, allant du bien-être aux services spécialisés, pour trouver exactement ce que vous cherchez.</p>
            <p>⭐ Explorez et réservez facilement les services qui répondent parfaitement à vos besoins et préférences.</p>
            <p>⭐ Attendez la confirmation de votre réservation de la part des prestataires de services, assurant une interaction fluide et une réponse rapide à vos demandes.</p>
          </div>
          <div className="user-box">
            <h3>Fournisseur</h3>
            <img src={providerIcon} alt="Provider Icon" />
            <p>⭐ Présentez vos offres au sein de catégories spécifiques, atteignant ainsi une audience ciblée et intéressée.</p>
            <p>⭐ Gérez vos réservations et répondez aux demandes des clients en temps réel, garantissant une interaction fluide et professionnelle.</p>
            <p>⭐ Maximisez votre visibilité grâce à nos options de promotion payante, assurant une meilleure mise en avant de vos services auprès des clients potentiels.</p>
          </div>
        </div>
      </section>
      <section className="why-choose-us" id="why-choose-us">
        <h2>À Propos de Nous</h2>
        <div className="features">
          <div className="feature">
            <img src={flamephoto} alt="Provider Icon" />
            <h3>Confirmation de Rendez-vous par Email</h3>
            <p>Recevez des confirmations de vos réservations directement par email. Cette fonctionnalité assure une communication claire et instantanée, vous tenant informé de l’état de vos demandes de rendez-vous et évitant toute confusion.</p>
          </div>
          <div className="feature">
            <img src={largecatphoto} alt="Provider Icon" />
            <h3> Services Personnalisés et Large Gamme de Catégories</h3>
            <p>Explorez une multitude de catégories de services, du bien-être aux consultations spécialisées. Nos options personnalisées vous garantissent de trouver exactement ce que vous cherchez, adapté à vos besoins spécifiques et préférences individuelles.</p>
          </div>
          <div className="feature">
            <img src={reservephoto} alt="Provider Icon" />
            <h3>Gestion Simplifiée de votre Planning avec les Rendez-vous en Ligne</h3>
            <p>Gérez vos rendez-vous facilement grâce à notre système de réservation en ligne. En quelques étapes simples, planifiez et organisez vos services, optimisant ainsi votre emploi du temps et réduisant les oublis.</p>
          </div>
          <div className="feature">
            <img src={navphoto} alt="Provider Icon" />
            <h3>Navigation Simplifiée et Expérience Utilisateur Optimisée</h3>
            <p>Notre plateforme est conçue pour offrir une navigation fluide et intuitive. Chaque fonctionnalité est pensée pour faciliter votre parcours utilisateur, vous permettant de trouver et réserver les services dont vous avez besoin en quelques clics seulement..</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MainSection;
