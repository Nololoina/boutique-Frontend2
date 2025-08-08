import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  UserIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { Button } from '../common/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  context?: 'public' | 'boutique';
  boutiqueId?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ context = 'public', boutiqueId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: context === 'public' 
        ? 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?'
        : 'Bonjour ! Je suis l\'assistant de votre boutique. Comment puis-je vous aider ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Réponses intelligentes et contextuelles
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Bienvenue sur Boutique 3.0. Je suis là pour vous aider. Que puis-je faire pour vous aujourd\'hui ?';
    }
    
    if (message.includes('merci') || message.includes('remercie')) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider.';
    }
    
    if (message.includes('au revoir') || message.includes('bye') || message.includes('à bientôt')) {
      return 'Au revoir ! Merci d\'avoir utilisé Boutique 3.0. Passez une excellente journée !';
    }
    
    // Réponses contextuelles selon l'espace
    if (context === 'public') {
      // Questions sur les commandes
      if (message.includes('commande') || message.includes('commander')) {
        if (message.includes('comment') || message.includes('faire')) {
          return 'Pour commander c\'est très simple : 1) Parcourez nos produits ou boutiques 2) Ajoutez vos articles au panier 3) Renseignez vos informations de livraison 4) Choisissez votre mode de paiement (Mobile Money ou espèces à la livraison). Pas besoin de créer un compte !';
        }
        if (message.includes('sans compte') || message.includes('inscription')) {
          return 'Exactement ! Vous pouvez commander sans créer de compte. C\'est l\'un de nos avantages : simplicité et rapidité. Renseignez juste vos infos de livraison au moment de la commande.';
        }
        if (message.includes('annuler') || message.includes('modifier')) {
          return 'Vous pouvez modifier ou annuler votre commande dans les 2h suivant la validation, avant que la boutique ne commence la préparation. Contactez directement la boutique via le chat ou par téléphone.';
        }
        return 'Pour passer une commande, parcourez nos boutiques, ajoutez des produits à votre panier et suivez le processus de commande. Vous pouvez payer par Mobile Money ou en espèces à la livraison.';
      }
      
      // Questions sur les paiements
      if (message.includes('paiement') || message.includes('payer')) {
        if (message.includes('mobile money') || message.includes('orange') || message.includes('airtel') || message.includes('mvola')) {
          return 'Oui ! Nous acceptons tous les opérateurs Mobile Money : Orange Money, Airtel Money et MVola. Le paiement est immédiat et sécurisé. Vous recevrez une confirmation par SMS.';
        }
        if (message.includes('espèces') || message.includes('cash') || message.includes('livraison')) {
          return 'Le paiement en espèces à la livraison est disponible ! Vous payez directement au livreur lors de la réception. C\'est pratique et sécurisé.';
        }
        if (message.includes('sécurisé') || message.includes('sécurité')) {
          return 'Nos paiements sont 100% sécurisés. Pour Mobile Money, nous utilisons les API officielles des opérateurs. Pour le paiement à la livraison, vous ne payez qu\'à la réception de votre commande.';
        }
        return 'Nous acceptons deux modes de paiement : Mobile Money (Orange, Airtel, MVola) pour un paiement immédiat et sécurisé, ou paiement en espèces à la livraison.';
      }
      
      // Questions sur la livraison
      if (message.includes('livraison') || message.includes('livrer')) {
        if (message.includes('délai') || message.includes('combien de temps') || message.includes('quand')) {
          return 'Les délais de livraison dépendent de votre localisation : 1-3 jours pour Antananarivo, 3-7 jours pour les autres grandes villes. Chaque boutique indique ses délais spécifiques.';
        }
        if (message.includes('gratuite') || message.includes('frais') || message.includes('coût')) {
          return 'Les frais de livraison varient selon la boutique et votre localisation. Beaucoup de boutiques offrent la livraison gratuite à partir d\'un certain montant (généralement 50 000 MGA).';
        }
        if (message.includes('suivi') || message.includes('suivre') || message.includes('tracking')) {
          return 'Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande. Vous pourrez suivre votre colis en temps réel et contacter le transporteur si besoin.';
        }
        if (message.includes('où') || message.includes('zone') || message.includes('région')) {
          return 'Nous livrons dans toute l\'île de Madagascar ! Antananarivo et les grandes villes sont couvertes par la plupart des boutiques. Pour les zones plus éloignées, vérifiez avec chaque boutique.';
        }
        return 'Nos boutiques partenaires proposent différentes options de livraison dans toute l\'île. Les délais varient selon votre localisation et la boutique choisie.';
      }
      
      // Questions sur les boutiques
      if (message.includes('boutique') || message.includes('magasin')) {
        if (message.includes('comment choisir') || message.includes('quelle boutique')) {
          return 'Pour choisir une boutique, regardez : 1) Les notes et avis clients 2) Le badge de vérification 3) La spécialité de la boutique 4) Les conditions de livraison. Vous pouvez aussi suivre vos boutiques préférées !';
        }
        if (message.includes('vérifiée') || message.includes('fiable') || message.includes('confiance')) {
          return 'Les boutiques avec le badge vert ✓ sont vérifiées par notre équipe. Elles ont fourni tous les documents requis et respectent nos standards de qualité et service.';
        }
        if (message.includes('ouvrir') || message.includes('créer') || message.includes('devenir')) {
          return 'Vous voulez ouvrir votre boutique ? Excellent ! Cliquez sur "Devenir partenaire" dans le menu ou visitez notre page partenariat. Le processus est simple et notre équipe vous accompagne.';
        }
        return 'Vous pouvez explorer toutes nos boutiques partenaires depuis la page d\'accueil ou la section "Boutiques". Chaque boutique a sa spécialité et ses produits uniques.';
      }
      
      // Questions sur les comptes
      if (message.includes('compte') || message.includes('inscription')) {
        if (message.includes('obligatoire') || message.includes('nécessaire')) {
          return 'Non, créer un compte n\'est pas obligatoire ! C\'est notre grande différence : vous pouvez commander directement en renseignant juste vos infos de livraison. Simple et rapide !';
        }
        if (message.includes('avantage') || message.includes('pourquoi')) {
          return 'Sans compte, vous pouvez quand même : commander, suivre vos boutiques préférées, recevoir des notifications sur les nouveautés, et utiliser notre support. C\'est notre philosophie : simplicité avant tout !';
        }
        return 'Vous pouvez commander sans créer de compte ! C\'est notre avantage principal. Mais vous pouvez quand même suivre vos boutiques préférées et recevoir des notifications.';
      }
      
      // Questions sur le suivi
      if (message.includes('suivi') || message.includes('suivre')) {
        if (message.includes('boutique') || message.includes('magasin')) {
          return 'Pour suivre une boutique, cliquez sur le bouton "Suivre" sur sa page. Vous recevrez alors des notifications par email sur ses nouveautés, promotions et actualités. Aucun compte requis !';
        }
        if (message.includes('commande') || message.includes('colis')) {
          return 'Pour suivre votre commande : 1) Vous recevez un email avec le numéro de suivi 2) Cliquez sur le lien de suivi 3) Suivez votre colis en temps réel. Vous pouvez aussi contacter la boutique directement.';
        }
        return 'Vous pouvez suivre vos boutiques préférées pour recevoir des notifications sur leurs nouveautés et promotions, même sans compte ! Ou suivre vos commandes avec le numéro de suivi.';
      }
      
      // Questions sur les produits
      if (message.includes('produit') || message.includes('article')) {
        if (message.includes('qualité') || message.includes('authentique')) {
          return 'Tous nos produits proviennent de boutiques vérifiées. Nous contrôlons la qualité et l\'authenticité. En cas de problème, notre service client et la politique de retour vous protègent.';
        }
        if (message.includes('recherche') || message.includes('trouver')) {
          return 'Pour trouver un produit : utilisez la barre de recherche, filtrez par catégorie, prix ou note, ou parcourez les boutiques spécialisées. Vous pouvez aussi trier par popularité ou nouveautés.';
        }
        return 'Nous avons des milliers de produits de qualité ! Utilisez la recherche ou les filtres pour trouver exactement ce que vous cherchez. Tous les produits sont vérifiés par nos boutiques partenaires.';
      }
      
      // Questions sur les prix
      if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
        if (message.includes('négocier') || message.includes('réduction')) {
          return 'Les prix sont fixés par chaque boutique. Cependant, surveillez les promotions et codes promo ! Beaucoup de boutiques proposent régulièrement des réductions attractives.';
        }
        return 'Les prix sont compétitifs et fixés par chaque boutique. Vous pouvez comparer facilement et profiter des promotions régulières. Les frais de livraison sont indiqués clairement avant validation.';
      }
      
      // Questions sur le support
      if (message.includes('aide') || message.includes('support') || message.includes('problème')) {
        return 'Notre support est là pour vous ! Vous pouvez : 1) Utiliser ce chat 24h/24 2) Appeler le +261 12 345 67 89 3) Envoyer un email à support@boutique3.mg 4) Contacter directement les boutiques. Nous répondons rapidement !';
      }
      
      // Questions sur Madagascar/local
      if (message.includes('madagascar') || message.includes('malgache') || message.includes('local')) {
        return 'Boutique 3.0 est 100% malgache ! Nous soutenons les entreprises locales et l\'économie de Madagascar. Tous nos partenaires sont des boutiques malgaches qui proposent des produits locaux et importés de qualité.';
      }
      
      // Questions générales sur la plateforme
      if (message.includes('boutique 3.0') || message.includes('plateforme') || message.includes('site')) {
        return 'Boutique 3.0 est la plateforme e-commerce malgache nouvelle génération ! Notre mission : connecter les boutiques locales avec les clients, sans contraintes. Commandez sans compte, suivez vos boutiques préférées, payez comme vous voulez !';
      }
      
      // Réponse par défaut plus intelligente
      return 'Je peux vous aider avec : les commandes, les paiements (Mobile Money, espèces), la livraison, le choix de boutiques, le suivi de commandes, ou toute autre question. Que souhaitez-vous savoir exactement ?';
      return 'Je peux vous aider avec vos commandes, les modes de paiement, la livraison, ou toute autre question sur notre plateforme. Que souhaitez-vous savoir ?';
    } else {
      // Réponses pour l'espace boutique
      if (message.includes('bonjour') || message.includes('salut')) {
        return 'Bonjour ! Je suis l\'assistant de votre boutique. Je peux vous aider avec la gestion de vos produits, commandes, promotions, paramètres et bien plus. Comment puis-je vous assister ?';
      }
      
      if (message.includes('produit') || message.includes('stock')) {
        if (message.includes('ajouter') || message.includes('créer')) {
          return 'Pour ajouter un produit : allez dans "Produits" > "Nouveau produit". Renseignez le nom, description, prix, ajoutez des photos et définissez le stock. N\'oubliez pas de choisir la bonne catégorie !';
        }
        if (message.includes('stock') || message.includes('inventaire')) {
          return 'Gérez votre stock dans "Produits". Vous pouvez : voir les niveaux actuels, définir des seuils d\'alerte, recevoir des notifications de stock faible, et suivre l\'historique des mouvements.';
        }
        if (message.includes('modifier') || message.includes('changer')) {
          return 'Pour modifier un produit : allez dans "Produits", cliquez sur l\'icône crayon du produit à modifier. Vous pouvez changer le prix, la description, les photos, le stock, etc.';
        }
        return 'Pour gérer vos produits, rendez-vous dans la section "Produits" de votre tableau de bord. Vous pouvez ajouter, modifier, supprimer vos articles et gérer le stock.';
      }
      
      if (message.includes('commande') || message.includes('vente')) {
        if (message.includes('traiter') || message.includes('préparer')) {
          return 'Pour traiter une commande : allez dans "Commandes", cliquez sur la commande, vérifiez les détails, préparez les articles, puis mettez à jour le statut vers "En préparation" puis "Expédiée" avec le numéro de suivi.';
        }
        if (message.includes('statut') || message.includes('état')) {
          return 'Les statuts de commande sont : En attente paiement → Paiement reçu → En préparation → Expédiée → Livrée. Vous pouvez mettre à jour le statut et ajouter des commentaires pour le client.';
        }
        return 'Consultez la section "Commandes" pour voir toutes vos ventes en cours, les statuts de livraison et l\'historique des transactions. Vous pouvez traiter et suivre chaque commande.';
      }
      
      if (message.includes('promotion') || message.includes('publicité')) {
        if (message.includes('créer') || message.includes('faire')) {
          return 'Pour créer une promotion : allez dans "Promotions" > "Nouvelle promotion". Choisissez le type (pourcentage, montant fixe, livraison gratuite), définissez la période et les produits concernés.';
        }
        if (message.includes('publicité') || message.includes('pub')) {
          return 'Pour faire de la publicité : allez dans "Ma Boutique > Publicité". Vous pouvez créer des bannières, carrousels ou vidéos promotionnelles. Elles seront validées puis diffusées sur la plateforme.';
        }
        return 'Créez des promotions attractives dans "Promotions" et gérez vos campagnes publicitaires dans "Ma Boutique > Publicité". Boostez vos ventes efficacement !';
      }
      
      if (message.includes('paiement') || message.includes('argent')) {
        if (message.includes('recevoir') || message.includes('quand')) {
          return 'Vous recevez vos paiements via Mobile Money dans les 24-48h après confirmation de livraison. Consultez "Ma Boutique > Paiement" pour voir vos revenus et programmer les virements.';
        }
        if (message.includes('commission') || message.includes('frais')) {
          return 'Notre commission est transparente et compétitive. Consultez "Ma Boutique > Paramètres > Commerciaux" pour voir le détail des frais et commissions selon votre plan d\'abonnement.';
        }
        return 'Vos paiements sont gérés dans "Ma Boutique > Paiement". Vous recevez les fonds via Mobile Money après chaque vente confirmée, moins notre commission.';
      }
      
      if (message.includes('client') || message.includes('crm')) {
        if (message.includes('message') || message.includes('contacter')) {
          return 'Pour contacter vos clients : utilisez le CRM dans "Ma Boutique > CRM", ou répondez directement aux messages depuis "Support". Vous pouvez aussi créer des campagnes email ciblées.';
        }
        if (message.includes('fidéliser') || message.includes('garder')) {
          return 'Pour fidéliser vos clients : créez des promotions exclusives, répondez rapidement aux messages, proposez un excellent service, et utilisez le CRM pour des campagnes personnalisées.';
        }
        return 'Utilisez notre système CRM dans "Ma Boutique > CRM" pour gérer vos relations clients, créer des campagnes email et convertir les visiteurs en acheteurs fidèles.';
      }
      
      // Questions sur les statistiques
      if (message.includes('statistique') || message.includes('performance') || message.includes('vente')) {
        return 'Consultez votre tableau de bord pour voir : chiffre d\'affaires, nombre de commandes, produits populaires, évolution des ventes. Des graphiques détaillés vous aident à optimiser votre boutique.';
      }
      
      // Questions sur les paramètres
      if (message.includes('paramètre') || message.includes('configuration') || message.includes('réglage')) {
        return 'Tous vos paramètres sont dans "Ma Boutique > Paramètres" : informations générales, apparence, sécurité, notifications, et paramètres commerciaux. Personnalisez votre boutique selon vos besoins !';
      }
      
      // Réponse par défaut plus intelligente pour les boutiques
      return 'Je peux vous aider avec la gestion de votre boutique : produits et stock, commandes et livraisons, promotions et publicité, paiements et commissions, CRM et clients, paramètres et configuration. Que voulez-vous savoir précisément ?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de frappe du bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Si c'est l'espace public et qu'il y a une boutique concernée, notifier
      if (context === 'public' && boutiqueId) {
        console.log(`Notification envoyée à la boutique ${boutiqueId} pour la conversation`);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = context === 'public' 
    ? [
        'Comment commander ?',
        'Modes de paiement',
        'Suivi de commande',
        'Créer un compte'
      ]
    : [
        'Ajouter un produit',
        'Voir mes commandes',
        'Créer une promotion',
        'Paramètres boutique'
      ];

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          data-chatbot-trigger
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <ComputerDesktopIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Assistant Virtuel</h3>
                <p className="text-xs text-blue-100">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.sender === 'user' ? (
                      <UserIcon className="h-4 w-4" />
                    ) : (
                      <ComputerDesktopIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Actions rapides */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Questions fréquentes :</p>
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action)}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};