import React, { useState } from "react";

import ImageUpload from "./components/ImageUpload";
import documentValidation from "../src/services/documentValidation";
import { countries, documentTypes } from "../src/data/documentValidation";

import "./App.css";

function App() {
  const [validationId, setValidationId] = useState<string | null>(null);
  const [frontUrl, setFrontUrl] = useState<string | null>(null);
  const [reverseUrl, setReverseUrl] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);

  const [country, setCountry] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [frontUrlLoaded, setFrontUrlLoaded] = useState<boolean>(false);
  const [reverseUrlLoaded, setReverseUrlLoaded] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleValidation = async () => {
    try {
      if (!country) {
        alert("You must select a country to continue");
        return;
      }
      
      if (!documentType) {
        alert("You must select a document to continue");
        return;
      }

      const data = await documentValidation().createValidation({
        country: country,
        document_type: documentType,
        type: "document-validation",
        user_authorized: termsAccepted,
      });

      setValidationId(data.validation_id);
      setFrontUrl(data.instructions.front_url);
      setReverseUrl(data.instructions.reverse_url);
      setCurrentStep(2);
    } catch (error) {
      alert("Error creating the identity validation instance");
    }
  };

  const handleValidationResult = async () => {
    try {
      if (!validationId) {
        alert("Error obtaining identity validation id");
        return;
      }

      const data = await documentValidation().getValidationResult({
        validationId: validationId,
      });

      setValidationResult(data);
    } catch (error) {
      alert("Error obtaining identity validation");
    }
  };

  const handleFrontUpload = async (image: File) => {
    if (frontUrl) {
      await documentValidation().uploadImage({ url: frontUrl, image: image });
      setFrontUrlLoaded(true);
    }
  };

  const handleReverseUpload = async (image: File) => {
    if (reverseUrl) {
      await documentValidation().uploadImage({ url: reverseUrl, image: image });
      setReverseUrlLoaded(true);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const selectedCountry = countries.find((c) => c.value === selected);

    if (!selectedCountry) {
      alert("The selected country type is invalid");
      return;
    }

    if (selectedCountry.value === "ALL") {
      setDocumentType("passport");
    }

    if (selectedCountry.requiresSales) {
      alert(
        "For this country selection, please contact our ventas@example.com team"
      );
    } else {
      setCountry(selectedCountry.value);
    }
  };

  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = e.target.value;
    const selectedDocumentType = documentTypes.find(
      (d) => d.value === selected
    );

    if (!selectedDocumentType) {
      alert("The selected document type is invalid");
      return;
    }

    if (country === "ALL" && selected !== "passport") {
      alert("Only 'passport' is allowed when 'Any country' is selected.");
      setDocumentType("passport");
      return;
    }

    if (selectedDocumentType.requiresSales) {
      alert(
        "For this document selection, please contact our ventas@example.com team"
      );
    } else {
      setDocumentType(selectedDocumentType.value);
    }
  };

  const handleStepBack = () => {
    setCurrentStep(1);
    setValidationResult(null);
    setFrontUrlLoaded(false);
    setReverseUrlLoaded(false);
    setCountry(null);
    setDocumentType(null);
    setTermsAccepted(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Onboarding/KYC Truora API</h1>

      {currentStep === 1 && (
        <div className="step-container">
          <h2 className="step-title">Step 1: Select Information</h2>
          <div className="input-group">
            <label className="input-label">Country:</label>
            <select
              onChange={handleCountryChange}
              className="select-input"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Document Type:</label>
            <select
              onChange={handleDocumentTypeChange}
              className="select-input"
              value={documentType || ""}
              disabled={country === "ALL"}
            >
              <option value="" disabled hidden>
                Select a document
              </option>
              {documentTypes.map((doc) => (
                <option key={doc.value} value={doc.value}>
                  {doc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              I accept the terms and conditions
            </label>
          </div>

          <button
            onClick={handleValidation}
            className="primary-button"
            disabled={!termsAccepted}
          >
            Start Validation
          </button>
        </div>
      )}

      {currentStep === 2 && validationId && (
        <div className="step-container">
          <h2 className="step-title">Step 2: Upload Documents</h2>
          <div className="image-upload-container">
            <ImageUpload label="Document front" onUpload={handleFrontUpload} />
            <ImageUpload
              label="Document reverse"
              onUpload={handleReverseUpload}
            />
          </div>

          <button onClick={handleStepBack} className="secondary-button">
            Back to Step 1
          </button>

          <button
            onClick={handleValidationResult}
            className="primary-button mt-4"
            disabled={!frontUrlLoaded || !reverseUrlLoaded}
          >
            Get Validation Result
          </button>
        </div>
      )}

      {validationResult && (
        <div className="result-container">
          <h2 className="result-title">Validation Result ({validationId})</h2>
          <pre className="result-pre">
            {JSON.stringify(validationResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
