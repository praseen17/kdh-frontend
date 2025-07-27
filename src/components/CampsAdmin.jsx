import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useCallback, useRef } from 'react';

const cld = new Cloudinary({ cloud: { cloudName: 'dugxve4me' } });

// Cloudinary Upload Widget script loader
const loadCloudinaryWidget = (callback) => {
  const existingScript = document.getElementById('cloudinaryWidgetScript');
  
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.id = 'cloudinaryWidgetScript';
    script.async = true;
    script.onload = () => {
      if (callback) callback();
    };
    document.body.appendChild(script);
  } else if (callback) {
    callback();
  }
};

const CampsAdmin = () => {
  const [camps, setCamps] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    activities: '',
    photos: [],
    regLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const widgetRef = useRef(null);

  // Initialize Cloudinary widget
  const openWidget = useCallback(() => {
    console.log('Opening Cloudinary widget...');
    setUploading(true);
    loadCloudinaryWidget(() => {
      if (window.cloudinary) {
        console.log('Cloudinary loaded, creating upload widget...');
        
        // Cloudinary upload configuration for multiple files
        const options = {
          cloudName: 'dugxve4me',
          uploadPreset: 'dental_camps_upload',
          sources: ['local', 'camera'],
          multiple: true,
          maxFiles: 10,
          maxFileSize: 5000000, // 5MB per file
          clientAllowedFormats: ['jpg', 'jpeg', 'png'],
          showPoweredBy: false,
          showCompletedButton: true,
          folder: 'dental_camps',
          maxImageFileSize: 5000000, // 5MB
          maxImageWidth: 3000,
          maxImageHeight: 3000,
          cropping: true,
          croppingAspectRatio: 1.5,
          showSkipCropButton: false,
          singleUploadAutoClose: false,
          // Add these for better error handling
          theme: 'minimal',
          styles: {
            palette: {
              window: '#FFFFFF',
              sourceBg: '#F4F4F4',
              windowBorder: '#90a0b3',
              tabIcon: '#0078D4',
              inactiveTabIcon: '#69778A',
              menuIcons: '#5A616A',
              link: '#0078D4',
              action: '#FF620C',
              inProgress: '#0078D4',
              complete: '#20B832',
              error: '#E74C3C',
              textDark: '#000000',
              textLight: '#FFFFFF'
            },
            fonts: {
              default: null,
              "sans-serif": {
                url: null,
                active: true
              }
            }
          }
        };
        
        console.log('Widget options:', options);
        
        try {
          widgetRef.current = window.cloudinary.createUploadWidget(
            options,
            (error, result) => {
              console.log('Upload widget callback:', { error, result });
              
              if (error) {
                console.error('Upload Widget error:', error);
                setError(`Error: ${error.statusText || error.message || 'Failed to upload image'}`);
                setUploading(false);
                return;
              }
              
              if (result && result.event) {
                switch (result.event) {
                  case 'success':
                    const { secure_url, public_id, original_filename } = result.info;
                    console.log('Upload successful:', { secure_url, public_id });
                    
                    if (secure_url) {
                      setForm(prev => ({
                        ...prev,
                        photos: [...prev.photos, { url: secure_url, publicId: public_id }]
                      }));
                      setSuccess(`Successfully uploaded ${original_filename}`);
                      setError('');
                    }
                    break;
                    
                  case 'close':
                    console.log('Upload widget closed');
                    setUploading(false);
                    break;
                    
                  case 'abort':
                    console.log('Upload aborted');
                    setError('Upload was cancelled');
                    setUploading(false);
                    break;
                    
                  case 'display-changed':
                    console.log('Widget display changed');
                    break;
                    
                  case 'queues-start':
                    console.log('Upload queue started');
                    break;
                    
                  case 'queues-end':
                    console.log('All uploads completed');
                    setUploading(false);
                    break;
                    
                  case 'retry':
                    console.log('Retrying upload');
                    break;
                    
                  case 'show-completed':
                    console.log('Showing completed uploads');
                    break;
                    
                  default:
                    console.log('Unhandled event:', result.event);
                }
              }
              
              if (result && result.event === 'close') {
                console.log('Upload widget closed');
                setUploading(false);
              }
              
              if (result && result.event === 'queues-end') {
                console.log('All uploads completed');
                setUploading(false);
              }
            }
          );
          
          if (widgetRef.current) {
            widgetRef.current.open();
          } else {
            throw new Error('Failed to create upload widget');
          }
          
        } catch (err) {
          console.error('Error initializing upload widget:', err);
          setError(`Failed to initialize image upload: ${err.message}`);
          setUploading(false);
        }
      } else {
        console.error('Cloudinary not available');
        setError('Image upload service not available. Please try again later.');
        setUploading(false);
      }
    });
  }, []);

  const loadCamps = async () => {
    const snap = await getDocs(collection(db, 'camps'));
    setCamps(snap.docs.map(doc => {
      const data = doc.data();
      // Ensure photos is always an array
      const photos = Array.isArray(data.photos) 
        ? data.photos 
        : data.photo 
          ? [{ url: data.photo, publicId: data.photoPublicId || '' }] 
          : [];
      
      return { 
        id: doc.id, 
        ...data,
        photos: photos.filter(photo => photo && (photo.url || typeof photo === 'string'))
      };
    }));
  };

  useEffect(() => { loadCamps(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.activities) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (form.photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const campData = {
        name: form.name,
        description: form.description,
        activities: form.activities,
        photos: form.photos, // Array of photo objects with url and publicId
        regLink: form.regLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Saving camp data to Firestore:', campData);
      await addDoc(collection(db, 'camps'), campData);
      
      setSuccess(`Camp "${form.name}" added successfully with ${form.photos.length} photos!`);
      setForm({ 
        name: '', 
        description: '', 
        activities: '', 
        photos: [], 
        regLink: '' 
      });
      loadCamps();
    } catch (err) {
      console.error('Error adding camp:', err);
      setError(`Failed to add camp: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this camp?')) return;
    await deleteDoc(doc(db, 'camps', id));
    loadCamps();
  };

  return (
    <div className="kdh-campsadmin-container">
      <h2 className="kdh-campsadmin-title">Manage Dental Camps</h2>
      <form onSubmit={handleSubmit} className="kdh-campsadmin-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Camp Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <textarea name="activities" value={form.activities} onChange={handleChange} placeholder="Activities (comma separated)" required />
        <div>
          <label>Upload Camp Photo:</label>
          <div>
            <button 
              type="button" 
              onClick={openWidget}
              disabled={uploading}
              className="upload-button"
              style={{
                padding: '8px 16px',
                backgroundColor: uploading ? '#ccc' : '#B22222',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                marginTop: '8px',
                opacity: uploading ? 0.7 : 1
              }}
            >
              {uploading ? 'Uploading...' : 'Upload Images (Max 10)'}
            </button>
            
            {form.photos.length > 0 && (
              <div style={{ marginTop: '15px' }}>
                <h4>Uploaded Images ({form.photos.length})</h4>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {form.photos.map((photo, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img 
                        src={photo.url} 
                        alt={`Camp Preview ${index + 1}`}
                        style={{ 
                          width: '120px',
                          height: '90px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #ddd',
                          padding: '2px'
                        }}
                      />
                      <button
                        onClick={() => {
                          setForm(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#ff4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '12px',
                          padding: 0
                        }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {success && (
              <p style={{ color: 'green', fontSize: '14px', marginTop: '8px' }}>
                {success}
              </p>
            )}
          </div>
        </div>
        <input name="regLink" value={form.regLink} onChange={handleChange} placeholder="Registration Link"/>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Camp'}</button>
        {success && <div style={{ color: 'green' }}>{success}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <div className="kdh-campsadmin-list-wrapper">
        <h3 className="kdh-campsadmin-list-title">Existing Camps</h3>
        <ul className="kdh-campsadmin-list">
          {camps.map(camp => (
            <li key={camp.id} className="kdh-campsadmin-card">
              <div className="kdh-campsadmin-card-row">
                {Array.isArray(camp.photos) && camp.photos.length > 0 ? (
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {camp.photos.slice(0, 3).map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo.url || photo} // Support both old and new format
                        alt={`${camp.name} ${idx + 1}`}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                        title={camp.name}
                      />
                    ))}
                    {camp.photos.length > 3 && (
                      <div style={{
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f0f0',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        +{camp.photos.length - 3}
                      </div>
                    )}
                  </div>
                ) : camp.photo ? (
                  // Handle legacy single photo format
                  <img 
                    src={camp.photo} 
                    alt={camp.name} 
                    className="kdh-campsadmin-img" 
                    style={{
                      width: '150px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      marginRight: '1rem'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '10px',
                    textAlign: 'center',
                    padding: '5px',
                    marginRight: '1rem'
                  }}>
                    No Images
                  </div>
                )}
                <div className="kdh-campsadmin-card-content">
                  <div className="kdh-campsadmin-card-title">{camp.name}</div>
                  <div className="kdh-campsadmin-card-desc">{camp.description}</div>
                  <div className="kdh-campsadmin-card-acts"><b>Activities:</b> {camp.activities}</div>
                  <a href={camp.regLink} target="_blank" rel="noopener noreferrer" className="kdh-campsadmin-card-link">Registration Link</a>
                </div>
                <button onClick={() => handleDelete(camp.id)} className="kdh-campsadmin-delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampsAdmin; 
