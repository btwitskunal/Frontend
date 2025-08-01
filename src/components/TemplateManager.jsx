import React, { useState, useEffect } from 'react';

const TemplateManager = () => {
  const [schema, setSchema] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/template')
      .then(res => res.json())
      .then(data => setSchema(data.columns || []))
      .catch(() => setError('Failed to fetch template schema'));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    setUploading(true);
    setMessage('');
    setError('');
    const formData = new FormData();
    formData.append('template', file);
    try {
      const res = await fetch('/api/template', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Template updated successfully');
        // Refresh schema
        fetch('/api/template')
          .then(res => res.json())
          .then(data => setSchema(data.columns || []));
      } else {
        setError(data.error || 'Failed to update template');
      }
    } catch (err) {
      setError('Failed to upload template');
    }
    setUploading(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/template/download', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to download');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('Template downloaded');
    } catch (err) {
      setError('Failed to download template');
    }
    setDownloading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Template Management</h2>
      <button onClick={handleDownload} disabled={downloading} style={{ marginBottom: 16 }}>
        {downloading ? 'Downloading...' : 'Download Current Template'}
      </button>
      <h3>Current Template Structure</h3>
      {schema.length === 0 ? <p>No schema found.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 4 }}>Column Name</th>
              <th style={{ border: '1px solid #ccc', padding: 4 }}>Type</th>
              <th style={{ border: '1px solid #ccc', padding: 4 }}>Position</th>
            </tr>
          </thead>
          <tbody>
            {schema.map(col => (
              <tr key={col.name}>
                <td style={{ border: '1px solid #ccc', padding: 4 }}>{col.name}</td>
                <td style={{ border: '1px solid #ccc', padding: 4 }}>{col.type}</td>
                <td style={{ border: '1px solid #ccc', padding: 4 }}>{col.position + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form onSubmit={handleUpload} style={{ marginBottom: 16 }}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit" disabled={uploading} style={{ marginLeft: 8 }}>
          {uploading ? 'Uploading...' : 'Upload New Template'}
        </button>
      </form>
      {message && <div style={{ color: 'green', marginBottom: 8 }}>{message}</div>}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
    </div>
  );
};

export default TemplateManager; 