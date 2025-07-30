import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({ cloud: { cloudName: 'dugxve4me' } });

// Add these constants after imports and before the About component
const AUTO_SCROLL_INTERVAL = 3000; // ms between scrolls

// Replace the CARD_WIDTH constant with a function
const getCardWidth = () => {
  if (window.innerWidth <= 600) {
    return window.innerWidth * 0.85 + 8; // 85vw + margin
  }
  return 316; // 300px + 16px margin
};

const About = () => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [camps, setCamps] = useState([]);
  const scrollAmount = 320;

  // Normalize camp photos data to always be an array of valid photo objects
  const normalizeCampPhotos = (camp) => {
    // If photos is already an array, filter out any invalid entries
    if (Array.isArray(camp.photos)) {
      return camp.photos.filter(photo => 
        photo && (photo.url || typeof photo === 'string') && 
        (typeof photo === 'string' ? true : !photo.url.startsWith('blob:'))
      );
    }
    // Handle legacy format where photos might be stored in 'photo' field
    if (camp.photo && !camp.photo.startsWith('blob:')) {
      return [{ url: camp.photo, publicId: camp.photoPublicId || '' }];
    }
    return [];
  };

  // Smooth scroll on hash
  useEffect(() => {
    if (window.location.hash === '#camps') {
      const el = document.getElementById('camps');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const snap = await getDocs(collection(db, 'camps'));
        const campsData = snap.docs.map(doc => {
          const data = doc.data();
          return { 
            id: doc.id, 
            ...data,
            // Ensure photos is always an array
            photos: normalizeCampPhotos(data)
          };
        });
        console.log('Fetched camps from Firestore:', campsData);
        setCamps(campsData);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };
    fetchCamps();
  }, []);

  // Remove old auto-scroll useEffect and replace with new one
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let autoScrollInterval;
    let isPaused = false;

    const startAutoScroll = () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        if (!isPaused) {
          // If at end, scroll to start
          if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
          }
        }
      }, AUTO_SCROLL_INTERVAL);
    };

    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    // Mouse and touch events
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', resume);
    carousel.addEventListener('touchstart', pause, { passive: true });
    carousel.addEventListener('touchend', resume, { passive: true });
    carousel.addEventListener('focusin', pause);
    carousel.addEventListener('focusout', resume);

    startAutoScroll();

    return () => {
      clearInterval(autoScrollInterval);
      carousel.removeEventListener('mouseenter', pause);
      carousel.removeEventListener('mouseleave', resume);
      carousel.removeEventListener('touchstart', pause);
      carousel.removeEventListener('touchend', resume);
      carousel.removeEventListener('focusin', pause);
      carousel.removeEventListener('focusout', resume);
    };
  }, [camps.length]);

  const scrollLeft = (e) => {
    e?.preventDefault();
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  };

  const scrollRight = (e) => {
    e?.preventDefault();
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  };

  return (
    <div className="kdh-about">
      {/* Hero Section */}
      <section className="kdh-about-hero">
        <h1>About Kokonda Dental Hospital</h1>
        <p>Excellence in dental care with a commitment to your comfort<br />and health</p>
      </section>

      {/* Our Story */}
      <section className="kdh-about-story">
        <h2>Our Story</h2>
        <p>
        Founded in 2001, Kokonda Dental Hospital has been at the forefront of dental excellence for over 25 years. What started as a small practice with a vision to provide compassionate, high-quality dental care has grown into a comprehensive dental facility serving thousands of patients
        <br /><br />
          Our commitment to innovation, patient comfort, and exceptional results has made us a trusted name in dental care. We combine state-of-the-art technology with a warm, welcoming environment to ensure every patient receives the best possible experience.<br /><br />
          At Kokonda Dental Hospital, we believe that everyone deserves a healthy, beautiful smile. Our team of experienced professionals is dedicated to helping you achieve optimal oral health through personalized treatment plans and the latest dental techniques.
        </p>
        <div className="kdh-about-mission-vision">
          <h3>Our Mission</h3>
          <p>To deliver compassionate, high-quality, and personalized dental care using advanced technology and innovative techniques, ensuring every patient enjoys a healthy, confident, and beautiful smile. We are committed to providing a comfortable and welcoming environment where patient well-being is our top priority.</p>
          <h3>Our Vision</h3>
          <p>To be recognized as a leading dental healthcare provider known for excellence, innovation, and patient-centric care, while continuously setting new standards in oral health and creating smiles that inspire confidence for generations to come.</p>
        </div>
      </section>

      {/* Search Placeholder */}
      <div className="kdh-about-search-placeholder" />

      {/* Books Section */}
      <section className="kdh-about-books">
        <h2>Authored</h2>
        <div className="kdh-about-book-card">
          <div className="kdh-about-book-img-placeholder">
            <img src="https://m.media-amazon.com/images/I/917-OmFbQEL._SL1500_.jpg" alt="Clinical Periodontics" />
          </div>
          <div className="kdh-about-book-info">
            <h3>Clinical Periodontics</h3>
            <p><b>Available on <a href="https://www.amazon.in/Clinical-Periodontics-K-Madhavi-Chandra/dp/8174734430" target="_blank" rel="noopener noreferrer">Amazon</a></b></p>
            <p><i>Clinical Periodontics</i> Clinical Periodontics is a trusted companion for dental professionals and students, offering a clear, evidence-based approach to diagnosing and treating periodontal disease. From treatment planning to modern therapies, this guide bridges academic excellence with clinical application.</p>
          </div>
        </div>
      </section>

      {/* Camps Section */}
      <section className="kdh-about-camps" id="camps">
        <h2>Our Dental Camps</h2>
        <p className="kdh-about-camps-intro">
          We regularly organize dental health camps to provide free dental care and education to underserved communities. Our commitment to community health extends beyond our clinic walls.
        </p>

        <div className="kdh-carousel-outer">
          <button 
            className="carousel-btn left" 
            onClick={scrollLeft}
            aria-label="Previous camp"
            type="button"
          >
            &lt;
          </button>
          
          <div className="kdh-carousel-wrapper" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="kdh-carousel-track" ref={carouselRef}>
            {camps.map((camp) => (
              <div key={camp.id} className="kdh-about-camp-card">
                <div className="kdh-about-camp-img">
                  {Array.isArray(camp.photos) && camp.photos.length > 0 ? (
                    <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                      {/* Main image */}
                      {camp.photos && camp.photos.length > 0 ? (
                        <img 
                          src={camp.photos[0]?.url || camp.photos[0]} 
                          alt={camp.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200" fill="%23f0f0f0"><rect width="300" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="%23999" dy=".3em">Image Not Available</text></svg>';
                            e.target.style.objectFit = 'contain';
                            e.target.style.padding = '20px';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTopLeftRadius: '8px',
                          borderTopRightRadius: '8px',
                          color: '#999',
                          fontSize: '14px',
                          padding: '20px',
                          boxSizing: 'border-box'
                        }}>
                          No Image Available
                        </div>
                      )}
                      
                      {/* Thumbnail strip for multiple images */}
                      {camp.photos.length > 1 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '5px',
                          background: 'rgba(0,0,0,0.5)',
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px'
                        }}>
                          {camp.photos.filter(p => p && (p.url || typeof p === 'string')).slice(0, 4).map((photo, idx) => (
                            <div 
                              key={idx} 
                              style={{
                                width: '30px',
                                height: '30px',
                                margin: '0 2px',
                                border: '2px solid white',
                                borderRadius: '3px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                opacity: idx === 0 ? 1 : 0.7,
                                transition: 'opacity 0.2s',
                                position: 'relative'
                              }}
                              onMouseEnter={(e) => {
                                // Change main image on hover
                                const img = e.target.closest('.kdh-about-camp-card').querySelector('.kdh-about-camp-img img');
                                if (img) {
                                  img.src = photo.url || photo;
                                }
                                // Highlight the active thumbnail
                                e.target.style.opacity = '1';
                              }}
                              onMouseLeave={(e) => {
                                // Reset to first image when leaving thumbnails
                                const img = e.target.closest('.kdh-about-camp-card').querySelector('.kdh-about-camp-img img');
                                if (img && camp.photos[0]) {
                                  img.src = camp.photos[0].url || camp.photos[0];
                                }
                                e.target.style.opacity = '0.7';
                              }}
                            >
                              {photo && (photo.url || typeof photo === 'string') ? (
                                <img 
                                  src={photo.url || photo} 
                                  alt={`${camp.name} ${idx + 1}`}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="%23f0f0f0"><rect width="50" height="50" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="8" text-anchor="middle" fill="%23999" dy=".3em">Image</text></svg>';
                                    e.target.style.objectFit = 'contain';
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#f0f0f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '8px',
                                  color: '#999'
                                }}>
                                  Image
                                </div>
                              )}
                              {idx === 3 && camp.photos.length > 4 && (
                                <div style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'rgba(0,0,0,0.6)',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  fontWeight: 'bold'
                                }}>
                                  +{camp.photos.length - 4}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : camp.photo ? (
                    // Fallback for old single photo format
                    <img 
                      src={camp.photo} 
                      alt={camp.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        borderBottom: '1px solid #eee'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}>
                      No Images Available
                    </div>
                  )}
                </div>
                <div className="kdh-about-camp-content">
                  <h3>{camp.name}</h3>
                  <p>{camp.description}</p>
                  <div className="kdh-about-camp-activities">
                    <strong>Activities:</strong>
                    <ul>
                      {camp.activities && camp.activities.split(',').map((activity, i) => (
                        <li key={i}>{activity.trim()}</li>
                      ))}
                    </ul>
                  </div>
                  {camp.regLink && (
                    <a 
                      href={camp.regLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="kdh-about-camp-register-btn"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
          <button className="carousel-btn right" onClick={scrollRight}>&gt;</button>
        </div>

      </section>

      {/* Hospital Info */}
      <section className="kdh-about-hospital-info">
        <h2>Hospital Information</h2>
        <div className="kdh-about-hospital-info-content">
          <div className="kdh-about-hospital-info-left">
            <h3>Facilities &amp; Equipment</h3>
            <ul>
              <li>State-of-the-art digital X-ray systems</li>
              <li>Advanced 3D imaging technology</li>
              <li>Laser dentistry equipment</li>
              <li>Sterilization and infection control systems</li>
              <li>Comfortable patient recovery areas</li>
              <li>Emergency dental care unit</li>
            </ul>
          </div>
          <div className="kdh-about-hospital-info-right">
            <h3>Operating Hours</h3>
            <div className="kdh-about-hospital-hours">
              <div>Monday - Friday</div><div>8:00 AM - 7:00 PM</div>
              <div>Saturday</div><div>9:00 AM - 5:00 PM</div>
              <div>Sunday</div><div>10:00 AM - 3:00 PM</div>
              <div className="kdh-about-hospital-emergency">Emergency Care</div><div className="kdh-about-hospital-emergency-time">24/7 Available</div>
            </div>
            <h3>Contact Information</h3>
            <ul className="kdh-about-hospital-contact">
              <li>123 Dental Street, Medical District, City 12345</li>
              <li>+1 (555) 123-4567</li>
              <li>info@kokondadental.com</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="kdh-about-cta-row">
        <a href="/appointment" className="kdh-about-cta-btn">Schedule Your Consultation Today &rarr;</a>
      </div>
    </div>
  );
};

export default About;
