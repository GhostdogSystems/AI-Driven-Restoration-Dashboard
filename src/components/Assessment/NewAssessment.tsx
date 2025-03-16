import React, { useState, Fragment } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, MapPinIcon, UploadCloudIcon, MicIcon, CameraIcon } from 'lucide-react';
const NewAssessment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    damageType: '',
    photos: [] as string[]
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  // Mock function for photo upload
  const handlePhotoUpload = () => {
    // In a real app, this would handle actual file uploads
    const mockPhotoUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, mockPhotoUrl]
    }));
  };
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            New Damage Assessment
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Complete the assessment in 4 easy steps
          </p>
        </div>
        {/* Progress steps */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map(i => <Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === i ? 'bg-blue-600 text-white' : step > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step > i ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg> : i}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-600">
                    {i === 1 && 'Property Details'}
                    {i === 2 && 'Damage Input'}
                    {i === 3 && 'AI Assessment'}
                    {i === 4 && 'Review & Submit'}
                  </span>
                </div>
                {i < 4 && <div className="w-full h-1 bg-gray-200">
                    <div className={`h-full ${step > i ? 'bg-green-500' : 'bg-gray-200'}`} style={{
                width: step > i ? '100%' : '0%'
              }} />
                  </div>}
              </Fragment>)}
          </div>
        </div>
        {/* Step content */}
        <div className="px-6 py-4">
          {step === 1 && <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                Property Details
              </h3>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="">Select property type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div className="relative">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300" placeholder="123 Main St" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                    ZIP
                  </label>
                  <input type="text" name="zip" id="zip" value={formData.zip} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="damageType" className="block text-sm font-medium text-gray-700">
                  Damage Type
                </label>
                <select id="damageType" name="damageType" value={formData.damageType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="">Select damage type</option>
                  <option value="water">Water Damage</option>
                  <option value="fire">Fire Damage</option>
                  <option value="mold">Mold</option>
                  <option value="storm">Storm Damage</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>}
          {step === 2 && <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                Damage Input & AI Observation
              </h3>
              <p className="text-sm text-gray-500">
                Upload photos of the damaged area or use the camera to take
                pictures
              </p>
              <div className="flex space-x-3">
                <button onClick={handlePhotoUpload} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <UploadCloudIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Upload Photos
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <CameraIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Take Photo
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MicIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Voice Description
                </button>
              </div>
              {formData.photos.length > 0 && <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.photos.map((photo, index) => <div key={index} className="relative">
                        <img src={photo} alt={`Damage photo ${index + 1}`} className="h-40 w-full object-cover rounded-md" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                          <button className="text-white text-sm bg-red-500 px-2 py-1 rounded">
                            Remove
                          </button>
                        </div>
                      </div>)}
                  </div>
                  {formData.photos.length > 0 && <div className="mt-4 p-4 bg-green-50 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Damage analyzed successfully
                          </p>
                        </div>
                      </div>
                    </div>}
                </div>}
            </div>}
          {step === 3 && <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                AI Assessment Results
              </h3>
              <p className="text-sm text-gray-500">
                Review and edit the AI-generated assessment details
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      AI Analysis Summary
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Water damage detected in living room area. Estimated
                        affected area: 120 sq ft. Severity level: Medium.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Damage Type{' '}
                    <span className="text-xs text-blue-600">(AI Detected)</span>
                  </label>
                  <input type="text" value="Water Damage" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-blue-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Affected Areas{' '}
                    <span className="text-xs text-blue-600">(AI Detected)</span>
                  </label>
                  <input type="text" defaultValue="Living Room, Adjacent Hallway" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estimated Affected Area (sq ft){' '}
                    <span className="text-xs text-blue-600">(AI Detected)</span>
                  </label>
                  <input type="number" defaultValue="120" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Severity Level{' '}
                    <span className="text-xs text-blue-600">(AI Detected)</span>
                  </label>
                  <select defaultValue="medium" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Notes
                  </label>
                  <textarea rows={3} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Add any additional information about the damage..." />
                </div>
              </div>
            </div>}
          {step === 4 && <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                Review & Submit
              </h3>
              <p className="text-sm text-gray-500">
                Review your assessment details before submitting
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Property Information
                </h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Property Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.propertyType || 'Residential'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.address || '123 Main St'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      City, State, ZIP
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{`${formData.city || 'Anytown'}, ${formData.state || 'CA'} ${formData.zip || '12345'}`}</dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Damage Assessment
                </h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Damage Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">Water Damage</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Affected Areas
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      Living Room, Adjacent Hallway
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Affected Area (sq ft)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">120</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Severity Level
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">Medium</dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Preliminary Cost Estimate
                </h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      Estimated Cost Range
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      $3,500 - $4,800
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500">
                      AI Confidence
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">85%</dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center">
                <input id="notify-client" name="notify-client" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="notify-client" className="ml-2 block text-sm text-gray-900">
                  Notify client about this assessment
                </label>
              </div>
            </div>}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button type="button" onClick={prevStep} disabled={step === 1} className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}>
            <ChevronLeftIcon className="mr-2 h-5 w-5" />
            Previous
          </button>
          {step < 4 ? <button type="button" onClick={nextStep} className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Next
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </button> : <button type="button" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Submit Assessment
            </button>}
        </div>
      </div>
    </div>;
};
export default NewAssessment;