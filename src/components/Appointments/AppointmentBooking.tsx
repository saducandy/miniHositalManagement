import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar, Clock, User, Phone, Mail, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { doctors } from '../../data/mockData';
import { formatDate, formatTime, getNextWeekDays, generateTimeSlots } from '../../utils/dateUtils';
import { useAccessibility } from '../../hooks/useAccessibility';

const schema = yup.object({
  patientName: yup.string().required('Full name is required'),
  patientEmail: yup.string().email('Invalid email').required('Email is required'),
  patientPhone: yup.string().required('Phone number is required'),
  reason: yup.string().required('Reason for visit is required'),
  notes: yup.string(),
});

interface AppointmentFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  notes?: string;
}

export const AppointmentBooking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(schema),
  });

  const availableDates = getNextWeekDays();
  const timeSlots = generateTimeSlots();

  const steps = [
    { number: 1, title: 'Select Doctor', icon: User },
    { number: 2, title: 'Choose Date & Time', icon: Calendar },
    { number: 3, title: 'Personal Details', icon: FileText },
    { number: 4, title: 'Confirmation', icon: ChevronRight },
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      announceToScreenReader(`Step ${currentStep + 1} of 4`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      announceToScreenReader(`Step ${currentStep - 1} of 4`);
    }
  };

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Appointment Data:', {
      ...data,
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
    });
    setIsSubmitted(true);
    announceToScreenReader('Appointment booked successfully');
    // Here you would typically send the data to your backend
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setIsSubmitted(false);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChevronRight className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
            <p className="text-gray-600 mb-8">
              Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-2 text-left">
                <p><span className="font-medium">Doctor:</span> {doctors.find(d => d.id === selectedDoctor)?.name}</p>
                <p><span className="font-medium">Date:</span> {formatDate(selectedDate)}</p>
                <p><span className="font-medium">Time:</span> {formatTime(selectedTime)}</p>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
          <p className="text-xl text-gray-600">Schedule your visit with our healthcare professionals</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  currentStep >= step.number ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 hidden md:block ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Step 1: Select Doctor */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Doctor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedDoctor(doctor.id);
                        }
                      }}
                      aria-pressed={selectedDoctor === doctor.id}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                      />
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                        <p className="text-emerald-600 text-sm font-medium mb-2">{doctor.specialty}</p>
                        <p className="text-gray-600 text-xs">{doctor.experience} years experience</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Choose Date & Time</h2>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {availableDates.slice(0, 14).map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                        className={`p-3 text-center rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          selectedDate === date.toISOString().split('T')[0]
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'
                        }`}
                        aria-pressed={selectedDate === date.toISOString().split('T')[0]}
                      >
                        <div className="text-xs font-medium">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {date.getDate()}
                        </div>
                        <div className="text-xs">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-center rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            selectedTime === time
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'
                          }`}
                          aria-pressed={selectedTime === time}
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('patientName')}
                      type="text"
                      id="patientName"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.patientName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.patientName && (
                      <p className="text-red-600 text-sm mt-1">{errors.patientName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('patientEmail')}
                      type="email"
                      id="patientEmail"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.patientEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.patientEmail && (
                      <p className="text-red-600 text-sm mt-1">{errors.patientEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('patientPhone')}
                      type="tel"
                      id="patientPhone"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.patientPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.patientPhone && (
                      <p className="text-red-600 text-sm mt-1">{errors.patientPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit *
                    </label>
                    <select
                      {...register('reason')}
                      id="reason"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.reason ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select reason</option>
                      <option value="routine-checkup">Routine Checkup</option>
                      <option value="consultation">Vision Consultation</option>
                      <option value="lasik">LASIK Consultation</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="symptoms">Vision Problems</option>
                      <option value="emergency">Urgent Eye Care</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.reason && (
                      <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    id="notes"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Any vision concerns or additional information you'd like to share..."
                  />
                </div>
              </form>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Appointment</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctors.find(d => d.id === selectedDoctor)?.image}
                      alt="Doctor"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {doctors.find(d => d.id === selectedDoctor)?.name}
                      </h3>
                      <p className="text-emerald-600 font-medium">
                        {doctors.find(d => d.id === selectedDoctor)?.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">{formatDate(selectedDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-semibold">{formatTime(selectedTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
                aria-disabled={currentStep === 1}
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !selectedDoctor) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime))
                  }
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    (currentStep === 1 && !selectedDoctor) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : currentStep === 3 ? (
                <button
                  onClick={nextStep}
                  type="button"
                  className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <span>Review</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                  className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <span>Confirm Appointment</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};