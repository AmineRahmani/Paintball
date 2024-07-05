import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../Style/Gallery.scss';
import Chat from './Chat';

const Gallery = () => {
    const [filter, setFilter] = useState('*');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const galleryItems = [
        { id: 1, category: 'team', img: 'dummy/gallery-1.jpg' },
        { id: 3, category: 'trainings', img: 'dummy/gallery-3.jpg' },
        { id: 4, category: 'event', img: 'dummy/feature-image-2.jpg' },
        { id: 7, category: 'team', img: 'dummy/slide-1.jpg' },
        { id: 8, category: 'team', img: 'dummy/slide-13.jpg' },
    //{ id: 10, category: 'team', img: 'dummy/gallery-10.jpg' }, 
        { id: 13, category: 'equipment', img: 'images/paintball-illustrations/gun.png' },
        { id: 14, category: 'equipment', img: 'images/paintball-illustrations/antiball.svg.png' },
        { id: 22, category: 'equipment', img: 'images/paintball-illustrations/gilet.png' },
        { id: 2, category: 'equipment', img: 'images/paintball-illustrations/gons.png' },
        { id: 5, category: 'equipment', img: 'images/paintball-illustrations/co2.png' },
        { id: 6, category: 'equipment', img: 'images/paintball-illustrations/casque.png' },
        { id: 9, category: 'equipment', img: 'images/paintball-illustrations/m4a1.png' },  
        { id: 11, category: 'event', img: 'dummy/thumbnail-1.jpg' },
        { id: 12, category: 'trainings', img: 'dummy/thumbnail-4.jpg'  },   
        { id: 15, category: 'event', img: 'dummy/thumbnail-2.jpg' },
        { id: 18, category: 'equipment', img: 'images/paintball-illustrations/protege.png' },
        { id: 21, category: 'equipment', img: 'images/paintball-illustrations/bras-protection.png' },
        { id: 26, category: 'equipment', img: 'images/paintball-illustrations/tenus.jpg' },
       
    ];

    const filteredItems = filter === '*' ? galleryItems : galleryItems.filter(item => item.category === filter);

    return (
        <div id="site-content">
            <div className="gallery-container">
                <Header />
              <Chat/>
                <div className="gallery-page-head" data-bg-image="dummy/header-bg-3.jpg"></div>
                <main className="gallery-main-content">
                    <h2>L'entraînement d'équipe au paintball est essentiel pour améliorer la coordination et la communication entre les joueurs. Ces sessions permettent de développer des tactiques communes et de renforcer les liens au sein du groupe.</h2>
                    <div className="gallery-text-center">
                        <div className="gallery-filter-links">
                            <select
                                className="gallery-mobile-filter"
                                onChange={(e) => handleFilterChange(e.target.value)}
                            >
                                <option value="*">Show all</option>
                                <option value="trainings">trainings</option>
                                <option value="team">team</option>
                                <option value="event">event</option>
                                <option value="equipment">equipment</option>
                            </select>
                            <button
                                className={`gallery-filter-button ${filter === '*' ? 'gallery-current-filter' : ''}`}
                                onClick={() => handleFilterChange('*')}
                            >
                                Show all
                            </button>
                            <button
                                className={`gallery-filter-button ${filter === 'trainings' ? 'gallery-current-filter' : ''}`}
                                onClick={() => handleFilterChange('trainings')}
                            >
                                trainings
                            </button>
                            <button
                                className={`gallery-filter-button ${filter === 'team' ? 'gallery-current-filter' : ''}`}
                                onClick={() => handleFilterChange('team')}
                            >
                                team
                            </button>
                            <button
                                className={`gallery-filter-button ${filter === 'event' ? 'gallery-current-filter' : ''}`}
                                onClick={() => handleFilterChange('event')}
                            >
                                event
                            </button>
                            <button
                                className={`gallery-filter-button ${filter === 'equipment' ? 'gallery-current-filter' : ''}`}
                                onClick={() => handleFilterChange('equipment')}
                            >
                                equipment
                            </button>
                        </div>
                    </div>
                    <div className="gallery-filterable-items">
                        {filteredItems.map((item) => (
                            <div key={item.id} className={`gallery-item ${item.category}`}>
                                <a href={item.img} target="_blank" rel="noopener noreferrer">
                                    <figure className="gallery-featured-image">
                                        <img src={item.img} alt={item.category} />
                                    </figure>
                                </a>
                            </div>
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Gallery;