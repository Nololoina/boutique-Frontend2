import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';

interface FormData {
  // Étape 1 - Informations personnelles
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  
  // Étape 2 - Informations boutique
  nomBoutique: string;
  description: string;
  categorie: string;
  adresse: string;
  telephoneBoutique: string;
  emailBoutique: string;
  siteWeb: string;
  
  // Étape 3 - Documents
  licenceCommerciale: File | null;
  pieceIdentite: File | null;
  
  // Étape 4 - Expérience
  experience: string;
  objectifs: string;
  motivation: string;
}

const categories = [
  'Électronique',
  'Mode',
  'Alimentaire',
  'Maison & Jardin',
  'Beauté & Santé',
  'Sport & Loisirs',
  'Automobile',
  'Livres & Médias',
  'Artisanat',
  'Autre'
];

export const Partenariat: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nomBoutique: '',
    description: '',
    categorie: '',
    adresse: '',
    telephoneBoutique: '',
    emailBoutique: '',
    siteWeb: '',
    licenceCommerciale: null,
    pieceIdentite: null,
    experience: '',
    objectifs: '',
    motivation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
        if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
        break;
      
      case 2:
        if (!formData.nomBoutique.trim()) newErrors.nomBoutique = 'Le nom de la boutique est requis';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        if (!formData.categorie) newErrors.categorie = 'La catégorie est requise';
        if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
        if (!formData.telephoneBoutique.trim()) newErrors.telephoneBoutique = 'Le téléphone est requis';
        if (!formData.emailBoutique.trim()) newErrors.emailBoutique = 'L\'email est requis';
        break;
      
      case 3:
        if (!formData.licenceCommerciale) newErrors.licenceCommerciale = 'La licence commerciale est requise';
        if (!formData.pieceIdentite) newErrors.pieceIdentite = 'La pièce d\'identité est requise';
        break;
      
      case 4:
        if (!formData.experience.trim()) newErrors.experience = 'L\'expérience est requise';
        if (!formData.objectifs.trim()) newErrors.objectifs = 'Les objectifs sont requis';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsSuccess(true);
      
      // Redirection automatique après 2 secondes
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Demande envoyée !
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Votre demande de partenariat a été envoyée avec succès. Nous vous contacterons bientôt.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderStepper = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Informations personnelles
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.nom && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nom}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.prenom && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.prenom}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          placeholder="+261 XX XX XXX XX"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.telephone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.telephone}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Informations de la boutique
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nom de la boutique *
        </label>
        <input
          type="text"
          name="nomBoutique"
          value={formData.nomBoutique}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.nomBoutique && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nomBoutique}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Catégorie *
        </label>
        <select
          name="categorie"
          value={formData.categorie}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.categorie && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.categorie}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Adresse *
        </label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.adresse && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.adresse}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Téléphone boutique *
          </label>
          <input
            type="tel"
            name="telephoneBoutique"
            value={formData.telephoneBoutique}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.telephoneBoutique && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.telephoneBoutique}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email boutique *
          </label>
          <input
            type="email"
            name="emailBoutique"
            value={formData.emailBoutique}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.emailBoutique && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.emailBoutique}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Site web (optionnel)
        </label>
        <input
          type="url"
          name="siteWeb"
          value={formData.siteWeb}
          onChange={handleInputChange}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Upload des documents
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Licence commerciale * (PDF, JPG, PNG)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'licenceCommerciale')}
            className="hidden"
            id="licence"
          />
          <label
            htmlFor="licence"
            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Cliquez pour sélectionner un fichier
          </label>
          {formData.licenceCommerciale && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {formData.licenceCommerciale.name}
            </p>
          )}
        </div>
        {errors.licenceCommerciale && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.licenceCommerciale}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pièce d'identité * (PDF, JPG, PNG)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'pieceIdentite')}
            className="hidden"
            id="identite"
          />
          <label
            htmlFor="identite"
            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Cliquez pour sélectionner un fichier
          </label>
          {formData.pieceIdentite && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {formData.pieceIdentite.name}
            </p>
          )}
        </div>
        {errors.pieceIdentite && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pieceIdentite}</p>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Expérience & Motivation
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Expérience dans le commerce *
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          rows={4}
          placeholder="Décrivez votre expérience dans le commerce..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.experience && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.experience}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Objectifs de vente *
        </label>
        <textarea
          name="objectifs"
          value={formData.objectifs}
          onChange={handleInputChange}
          rows={4}
          placeholder="Quels sont vos objectifs de vente sur notre plateforme ?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.objectifs && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.objectifs}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Motivation (optionnel)
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          rows={3}
          placeholder="Pourquoi souhaitez-vous rejoindre notre plateforme ?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Demande de partenariat
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Rejoignez notre plateforme en tant que vendeur
            </p>
          </div>

          {/* Stepper */}
          {renderStepper()}

          {/* Form Content */}
          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex items-center"
              >
                Suivant
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                className="flex items-center"
              >
                Envoyer la demande
              </Button>
            )}
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};