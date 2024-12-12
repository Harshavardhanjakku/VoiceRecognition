import React, { useState } from "react"; 
import { Link } from "react-router-dom"; 
import html2canvas from 'html2canvas'; // Make sure this is imported correctly
import { jsPDF } from 'jspdf'; // Correct way to import jsPDF

function GamifiedCertification() { 
  const [certificateName, setCertificateName] = useState(''); // Renamed from 'name' to avoid conflict
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateContent, setCertificateContent] = useState('');

  const generateCertificate = () => {
    if (certificateName.trim() !== '') {
      const certificateHtml = `
        <div style="padding: 3rem; text-align: center; background: white; color: black; font-family: Arial;">
          <h1 style="font-size: 3rem; font-weight: bold;">Certificate of Achievement</h1>
          <p style="font-size: 2rem;">Awarded to</p>
          <h2 style="font-size: 3rem; margin-top: 1rem;">${certificateName}</h2>
          <p style="font-size: 1.5rem; margin-top: 2rem;">For outstanding performance</p>
          <p style="font-size: 1rem; margin-top: 1rem;">Issued by: Gamified Certification</p>
        </div>
      `;
      setCertificateContent(certificateHtml);
      setShowCertificate(true);
    } else {
      alert('Please enter your name.');
    }
  };

  const downloadCertificate = () => {
    if (!certificateContent) {
      alert('Please generate a certificate first.');
      return;
    }

    const certificateElement = document.createElement('div');
    certificateElement.innerHTML = certificateContent;
    document.body.appendChild(certificateElement); // Temporarily add the element to the body to render

    // Configure html2canvas to handle potential iframe issues
    html2canvas(certificateElement, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions in mm
      pdf.save(`${certificateName}-certificate.pdf`);
      document.body.removeChild(certificateElement); // Clean up by removing the temporary element
    }).catch((error) => {
      console.error("Error generating certificate: ", error);
      alert("Failed to generate certificate. Please try again.");
    });
  };

  return ( 
    <div className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Gamified Certification</h2>
        <p className="text-gray-300 mb-8">
          This page is dedicated to offering certification programs with interactive learning through games. Unlock certifications as you complete various educational challenges.
        </p>

        <div className="space-x-6 mb-8">
          {/* Certification Game Links */}
          <Link 
            to="/game-certification" 
            className="text-white border border-white px-6 py-3 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            Start Certification
          </Link> 

          <Link 
            to="/all-courses" 
            className="text-white border border-white px-6 py-3 rounded-full hover:bg-sky-600 hover:text-black transition"
          >
            View All Courses
          </Link>
        </div> 

        {/* Dynamic Certificate Section */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-6">Generate Your Certificate</h3>
          <input
            type="text"
            className="border border-gray-300 p-10 mb-4 mt-4 rounded w-full text-white bg-black placeholder-gray-500"
            placeholder="Enter your name"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
          />
          <button
            onClick={generateCertificate}
            className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700 transition"
          >
            Generate Certificate
          </button>
        </div>
        
        {showCertificate && (
          <div className="mt-8">
            <div 
              className="certificate-preview bg-white p-8 rounded-lg shadow-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: certificateContent }}
            ></div>
            <button
              onClick={downloadCertificate}
              className="bg-green-600 text-white px-6 py-3 rounded mt-6 hover:bg-green-700 transition"
            >
              Download Certificate
            </button>
          </div>
        )}
      </div> 
    </div> 
  ); 
}

export default GamifiedCertification;
