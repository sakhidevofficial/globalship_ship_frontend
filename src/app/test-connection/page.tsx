'use client';

import React, { useState, useEffect } from 'react';

export default function TestConnection() {
  const [apiStatus, setApiStatus] = useState<string>('Testing...');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testAPIConnection();
  }, []);

  const testAPIConnection = async () => {
    try {
      // Test product categories endpoint (which we know works)
      const categoriesResponse = await fetch('http://localhost/slp/public/api/v1/ecommerce/product-categories', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setApiStatus('✅ Backend API is working!');
        
        if (categoriesData.data) {
          setCategories(categoriesData.data.slice(0, 5)); // Show first 5 categories
        }
      } else {
        setApiStatus(`❌ Backend API error: ${categoriesResponse.status}`);
      }
    } catch (error) {
      setApiStatus(`❌ Error connecting to API: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>API Connection Test</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>API Status:</strong> {apiStatus}
              </div>
              
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Testing API connection...</p>
                </div>
              )}
              
              {!loading && categories.length > 0 && (
                <div>
                  <h5>Sample Categories (First 5):</h5>
                  <ul className="list-group">
                    {categories.map((category) => (
                      <li key={category.id} className="list-group-item">
                        <strong>{category.name}</strong> (ID: {category.id})
                        <br />
                        <small className="text-muted">Slug: {category.slug}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-3">
                <button 
                  className="btn btn-primary" 
                  onClick={testAPIConnection}
                  disabled={loading}
                >
                  Test Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 