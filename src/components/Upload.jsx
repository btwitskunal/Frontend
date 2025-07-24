import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import shreeLogoShort from '../assets/shree-logo-short.png'


const Upload = () => {
  const [fileName, setFileName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const styles = {
    uploadContainer: {
      minHeight: '100vh',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    },
    portalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      boxSizing: 'border-box',
      flexShrink: 0
    },
    portalBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    portalLogo: {
      width: '40px',
      height: '40px',
      // backgroundColor: '#3b82f6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    portalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0
    },
    headerActions: {
      display: 'flex',
      gap: '0.75rem'
    },
    actionBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1.25rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none'
    },
    actionBtnPrimary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    actionBtnSecondary: {
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: '1px solid #cbd5e1'
    },
    mainContainer: {
      flex: 1,
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      overflow: 'auto'
    },
    uploadCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e2e8f0',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '700px',
      height: 'fit-content',
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto'
    },
    cardHeader: {
      textAlign: 'center',
      marginBottom: '2.5rem'
    },
    cardTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.75rem'
    },
    cardSubtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      margin: 0
    },
    dropZone: {
      border: '3px dashed #cbd5e1',
      borderRadius: '16px',
      padding: '4rem 2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc',
      marginBottom: '2rem',
      position: 'relative'
    },
    dropZoneHover: {
      borderColor: '#3b82f6',
      backgroundColor: '#f0f9ff',
      transform: 'scale(1.02)'
    },
    uploadIcon: {
      fontSize: '4rem',
      color: '#94a3b8',
      marginBottom: '1.5rem',
      display: 'block'
    },
    dropZoneTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.75rem'
    },
    dropZoneText: {
      color: '#64748b',
      marginBottom: '0.75rem',
      fontSize: '1.1rem'
    },
    dropZoneInfo: {
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#64748b',
      padding: '1rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '8px',
      display: 'inline-block'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '2rem 0',
      color: '#64748b',
      fontSize: '0.875rem'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#e2e8f0'
    },
    dividerText: {
      padding: '0 1.5rem',
      fontWeight: '500'
    },
    sources: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    },
    source: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1.5rem',
      backgroundColor: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '120px'
    },
    sourceIcon: {
      width: '40px',
      height: '40px',
      // backgroundColor: '#3b82f6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px'
    },
    fileInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem',
      backgroundColor: '#f0f9ff',
      border: '2px solid #bae6fd',
      borderRadius: '12px',
      marginBottom: '1.5rem'
    },
    fileDetails: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    fileIcon: {
      color: '#10b981',
      fontSize: '2rem'
    },
    fileName: {
      fontWeight: '600',
      color: '#1e293b',
      fontSize: '1.1rem'
    },
    btnIcon: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      padding: '0.75rem',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease',
      fontSize: '1.25rem'
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      textDecoration: 'none'
    },
    btnPrimary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    btnSecondary: {
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: '2px solid #cbd5e1'
    },
    btnPreview: {
      backgroundColor: '#f0f9ff',
      color: '#0369a1',
      border: '2px solid #bae6fd',
      width: '100%',
      justifyContent: 'center',
      marginBottom: '1.5rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem'
    },
    spinner: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.25rem',
      backgroundColor: '#f0f9ff',
      border: '2px solid #bae6fd',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      color: '#0369a1'
    },
    spinnerIcon: {
      width: '24px',
      height: '24px',
      border: '3px solid #bae6fd',
      borderTopColor: '#0369a1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    statusMessage: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.25rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      fontSize: '1rem'
    },
    statusSuccess: {
      backgroundColor: '#f0fdf4',
      color: '#15803d',
      border: '2px solid #bbf7d0'
    },
    statusError: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      border: '2px solid #fecaca'
    },
    statusWarning: {
      backgroundColor: '#fffbeb',
      color: '#d97706',
      border: '2px solid #fed7aa'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      maxWidth: '85vw',
      maxHeight: '85vh',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2rem',
      borderBottom: '1px solid #e2e8f0'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      color: '#64748b',
      cursor: 'pointer',
      padding: '0.75rem',
      borderRadius: '8px'
    },
    previewTable: {
      padding: '2rem',
      maxHeight: '65vh',
      overflow: 'auto'
    },
    footer: {
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    },
    footerText: {
      margin: 0,
      fontSize: '0.875rem',
      color: '#64748b'
    },
    hidden: {
      display: 'none'
    }
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = () => {
    const files = fileInputRef.current.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
    }
  };

  const resetFileInput = () => {
    fileInputRef.current.value = '';
    setFileName('');
    setMessage({ text: '', type: '' });
  };

  const previewFile = () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = XLSX.utils.sheet_to_html(firstSheet);
      setPreviewData(html);
      setShowPreview(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!fileInputRef.current.files.length) {
      setMessage({ text: 'Please select a file first', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      setIsLoading(false);
      
      if (response.ok) {
        if (result.errors && result.errors.length > 0) {
          setMessage({ 
            text: `${result.rowsInserted} rows inserted successfully, but ${result.errors.length} rows had errors`, 
            type: 'warning' 
          });
          console.error('Errors:', result.errors);
        } else {
          setMessage({ 
            text: `File processed successfully! ${result.rowsInserted} rows inserted.`, 
            type: 'success' 
          });
        }
      } else {
        setMessage({ text: result.error || 'Upload failed', type: 'error' });
      }
    } catch (error) {
      setIsLoading(false);
      setMessage({ text: 'Network error: ' + error.message, type: 'error' });
    }
  };

  const getStatusMessageStyle = () => {
    const baseStyle = styles.statusMessage;
    switch (message.type) {
      case 'success':
        return { ...baseStyle, ...styles.statusSuccess };
      case 'error':
        return { ...baseStyle, ...styles.statusError };
      case 'warning':
        return { ...baseStyle, ...styles.statusWarning };
      default:
        return baseStyle;
    }
  };

  const getStatusIcon = () => {
    switch (message.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '';
    }
  };

  return (
    <div style={styles.uploadContainer}>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <header style={styles.portalHeader}>
        <div style={styles.portalBrand}>
          <div style={styles.portalLogo}>
          <img src={shreeLogoShort} alt="Shree Logo short" style={{ height: '20px', width: 'auto' }} />
          </div>
          <h1 style={styles.portalTitle}>BTL Marketing Execution Portal</h1>
        </div>
        <div style={styles.headerActions}>
          <a 
            href="http://localhost:4000/template/download" 
            style={{...styles.actionBtn, ...styles.actionBtnPrimary}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3b82f6';
            }}
          >
            ⬇ Download Template
          </a>
          <a 
            href="http://localhost:3000/auth/signout" 
            style={{...styles.actionBtn, ...styles.actionBtnSecondary}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
            }}
          >
            ↗ Sign Out
          </a>
        </div>
      </header>

      <div style={styles.mainContainer}>
        <div style={styles.uploadCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Upload Excel Files</h2>
            <p style={styles.cardSubtitle}>Upload your marketing execution data files for processing</p>
          </div>

          <div id="uploadForm">
            <div 
              id="drop-area" 
              style={styles.dropZone}
              onDragEnter={preventDefaults}
              onDragOver={preventDefaults}
              onDragLeave={preventDefaults}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.dropZoneHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.dropZone);
              }}
            >
              <div style={styles.uploadIcon}>☁️</div>
              <h3 style={styles.dropZoneTitle}>Drag and drop your files here</h3>
              <p style={styles.dropZoneText}>or click to browse from your computer</p>
              <div style={styles.dropZoneInfo}>
                <strong>Supported formats:</strong> .xlsx, .xls • <strong>Max size:</strong> 25MB
              </div>
              <input 
                type="file" 
                id="fileElem" 
                ref={fileInputRef}
                name="file" 
                accept=".xlsx,.xls" 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </div>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or choose from</span>
              <div style={styles.dividerLine}></div>
            </div>

            <div style={styles.sources}>
              <label style={styles.source} htmlFor="fileElem">
                <div style={styles.sourceIcon}>💻</div>
                <span>My Computer</span>
              </label>
            </div>

            {fileName && (
              <div id="file-info" style={styles.fileInfo}>
                <div style={styles.fileDetails}>
                  <div style={styles.fileIcon}>📊</div>
                  <div>
                    <div style={styles.fileName}>{fileName}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Excel file selected</div>
                  </div>
                </div>
                <button type="button" style={styles.btnIcon} onClick={resetFileInput}>
                  🗑️
                </button>
              </div>
            )}

            {fileName && (
              <button 
                type="button" 
                id="previewBtn" 
                style={styles.btnPreview}
                onClick={previewFile}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dbeafe';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f0f9ff';
                }}
              >
                👁️ Preview File Content
              </button>
            )}

            {isLoading && (
              <div style={styles.spinner}>
                <div style={styles.spinnerIcon}></div>
                Processing your file...
              </div>
            )}

            {message.text && (
              <div style={getStatusMessageStyle()}>
                <span>{getStatusIcon()}</span>
                {message.text}
              </div>
            )}

            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                style={{...styles.btn, ...styles.btnSecondary}} 
                onClick={resetFileInput}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                }}
              >
                ✕ Cancel
              </button>
              <button 
                type="button" 
                style={{...styles.btn, ...styles.btnPrimary}}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                ⬆️ Upload File
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div id="previewModal" style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                📊 Excel File Preview
              </h3>
              <button style={styles.closeBtn} onClick={() => setShowPreview(false)}>
                ✕
              </button>
            </div>
            <div 
              id="previewTable" 
              style={styles.previewTable}
              dangerouslySetInnerHTML={{ __html: previewData }}
            />
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2025 Shree Cement Limited. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Upload;