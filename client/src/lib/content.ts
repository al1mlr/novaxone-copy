// NovaXone — Contenu bilingue FR/EN extrait du site original

export type Lang = 'fr' | 'en';

export const content = {
  fr: {
    nav: {
      demarche: 'Démarche',
      sujets: 'Sujets Traités',
      expertises: 'Expertises',
      clients: 'Clients',
      apropos: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Conseil des entreprises technologiques',
      subtitle: 'Innovation to Business',
      description: 'Transformer l\'innovation en réussite économique',
      cta: 'Découvrir notre démarche',
    },
    demarche: {
      title: 'Démarche',
      subtitle: 'Partenaire du développement des éditeurs de services numériques',
      intro: 'Sociétés de logiciels et de services SaaS, indépendantes ou au sein de groupes',
      phases: [
        {
          title: 'Démarrer',
          items: ['Concevoir de nouvelles offres', 'Planifier les moyens', 'Gérer les projets'],
        },
        {
          title: 'Faire croître',
          items: ['Améliorer la performance', 'Développer les ventes', 'Aller à l\'international', 'Se structurer'],
        },
        {
          title: 'Redresser',
          items: ['Diagnostiquer', 'Planifier', 'Pivoter'],
        },
      ],
    },
    sujets: {
      title: 'Sujets Traités',
      items: [
        'Positionnement Stratégique',
        'Lancement Opérationnel Go-to-Market',
        'Développer les Ventes',
        'Aligner l\'Organisation',
      ],
      cta: 'En savoir plus',
    },
    expertises: {
      title: 'Domaines d\'excellence',
      items: [
        { title: 'Marketing Stratégique', description: 'Définir le positionnement, la proposition de valeur et la segmentation pour maximiser l\'impact commercial.' },
        { title: 'Analyse des timings de marché', description: 'Identifier le bon moment pour lancer, pivoter ou accélérer selon les cycles et signaux du marché.' },
        { title: 'Conception d\'offres numériques', description: 'Structurer des offres logicielles et SaaS alignées sur les besoins clients et les réalités concurrentielles.' },
        { title: 'Organisation éditeur de logiciel', description: 'Aligner les fonctions R&D, marketing, ventes et services pour une exécution fluide et scalable.' },
        { title: 'Amélioration de l\'efficacité opérationnelle', description: 'Diagnostiquer les blocages, réduire les frictions et améliorer la livraison produit et la rentabilité.' },
        { title: 'Développement International', description: 'Préparer et exécuter l\'expansion vers de nouveaux marchés en Europe, Amériques et en Asie avec notre réseau de partenaires.' },
      ],
      cta: 'En savoir plus',
    },
    clients: {
      title: 'Références / Business Case',
      cases: [
        {
          title: 'Éditeur de logiciel de taille moyenne : difficultés de tenir la roadmap produit',
          excerpt: 'Un éditeur de logiciel avec 250 collaborateurs sur 3 sites dans 2 pays constate une difficulté permanente à réussir la sortie de nouvelles versions de ses logiciels dans des temps et budgets maîtrisés. La situation qui perdure a provoqué une réflexion sur les causes profondes du problème.',
        },
        {
          title: 'Startup : Positionnement de l\'offre',
          excerpt: 'Une nouvelle entreprise lance un logiciel destiné aux acheteurs d\'énergie et souhaite affiner son positionnement sur le marché. Le fondateur, ancien cadre d\'une société de vente d\'énergie, manque d\'une perspective complète côté acheteur.',
        },
        {
          title: 'Filiale Éditeur de logiciel d\'un grand groupe : offre vieillissante',
          excerpt: 'Un groupe du CAC 40 possède une filiale de développement logiciel qui lui vend ses produits et vend également à d\'autres grands groupes. Le logiciel réalisé est clé dans la fonction order-to-delivery. L\'éditeur fait face à un vieillissement de sa gamme.',
        },
      ],
      cta: 'En savoir plus',
    },
    apropos: {
      title: 'Qui sommes-nous ?',
      positioning: 'Innovation to Business',
      paragraphs: [
        'La mission de NovaXone est d\'accompagner les entreprises technologiques dans les phases clés de leur développement.',
        'Novaxone a été fondée par Alain Meller et tire parti de son expérience très variée de trente années dans le développement d\'entreprises technologiques et en particulier au sein d\'éditeurs de logiciel.',
        'Au cours de sa carrière, il a exercé la plupart des fonctions clés de ce type d\'entreprise : R&D, marketing, business développement, direction générale et a également été investisseur dans un fonds de venture capital.',
        'Il en a tiré des convictions et expertises fortes sur les problèmes de développement de ce type d\'entreprises. NovaXone s\'appuie fortement sur les expériences acquises par son fondateur.',
      ],
      positioningText: [
        'Nous accompagnons les entreprises de technologies de toutes tailles et particulièrement les éditeurs de logiciels à transformer leurs innovations en réussites économiques.',
        'Nous mettons à disposition de nos clients nos méthodologies et nos savoir-faire pour assurer le succès économique de leurs innovations.',
        'Nous ne nous concentrons pas sur la génération d\'innovations mais sur les conditions et les actions susceptibles de leur permettre de produire le maximum de valeur pour soutenir le développement de l\'entreprise.',
        'Pour nous l\'innovation est un début et non une fin, c\'est une graine qu\'il faut accompagner dans sa croissance pour qu\'elle prenne l\'ampleur maximale.',
      ],
    },
    blog: {
      title: 'Derniers Articles',
      readMore: 'Lire l\'article',
      backToBlog: 'Retour au blog',
      noPosts: 'Aucun article pour le moment.',
      addArticle: 'Ajouter un article',
      adminMode: 'Mode Admin',
      form: {
        title: 'Titre',
        excerpt: 'Extrait',
        content: 'Contenu',
        category: 'Catégorie',
        date: 'Date',
        submit: 'Publier',
        cancel: 'Annuler',
      },
    },
    contact: {
      title: 'Contact',
      address: '5 Rue Davioud, 75016 Paris',
      country: 'FRANCE',
      email: 'info@novaxone.com',
      form: {
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        submit: 'Envoyer !',
      },
      map: 'Voir la carte',
    },
    footer: {
      copy: `© Novaxone — ${new Date().getFullYear()}`,
    },
  },
  en: {
    nav: {
      demarche: 'What we do',
      sujets: 'Our focus',
      expertises: 'Expertises',
      clients: 'Clients',
      apropos: 'About us',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      tagline: 'The Partner for Growth of Technology Ventures',
      subtitle: 'Innovation to Business',
      description: 'Transforming Innovation into Business Success',
      cta: 'Discover our approach',
    },
    demarche: {
      title: 'What we do',
      subtitle: 'We Partner with Software and SaaS Ventures',
      intro: 'Independent or within groups',
      phases: [
        {
          title: 'Start',
          items: ['Create new offerings', 'Plan for resources', 'Manage projects'],
        },
        {
          title: 'Grow',
          items: ['Improve performance', 'Boost sales', 'Go international', 'Build organization'],
        },
        {
          title: 'Turn around',
          items: ['Assess situation', 'Plan for transformation', 'Make it happen'],
        },
      ],
    },
    sujets: {
      title: 'Our Focus',
      items: [
        'Marketing Strategy Positioning',
        'Go to Market and Operations jumpstart',
        'Sales Strategy and Business Development',
        'Grow and Align Organization',
      ],
      cta: 'Contact us for more',
    },
    expertises: {
      title: 'Domains of Excellence',
      items: [
        { title: 'Market Strategy', description: 'Define positioning, value proposition and segmentation to maximize commercial impact.' },
        { title: 'Market Timing Analysis', description: 'Identify the right moment to launch, pivot or accelerate based on market cycles and signals.' },
        { title: 'Product Management', description: 'Structure software and SaaS offerings aligned with customer needs and competitive realities.' },
        { title: 'Software Vendor Organization', description: 'Align R&D, marketing, sales and services functions for smooth and scalable execution.' },
        { title: 'Operational Efficiency', description: 'Diagnose bottlenecks, reduce friction and improve product delivery and profitability.' },
        { title: 'International Development', description: 'Prepare and execute expansion into new markets in Europe, Americas and Asia with our partner network.' },
      ],
      cta: 'Contact us',
    },
    clients: {
      title: 'Business Case',
      cases: [
        {
          title: 'Midsize software vendor: difficulties to respect the product roadmap',
          excerpt: 'A software company with 250 employees on 3 sites in 2 countries finds a permanent difficulty in succeeding to release new versions of its software in due time and within mastered budgets. The CEO suspects that the causes of this symptom are broader than a problem of Product Management.',
        },
        {
          title: 'Startup: Market Positioning',
          excerpt: 'A new company launches a software dedicated to energy buyers and wishes refining its market positioning. The founder is a former energy selling company executive but lacks a complete buyer perspective.',
        },
        {
          title: 'Software Editor subsidiary of a multi-national company: aging products',
          excerpt: 'A multi-national group has a software editor subsidiary that sells its products to it and also sells to other major groups. The software is key in the order-to-delivery function. The editor faces an aging of its products based on old technology.',
        },
      ],
      cta: 'Contact us',
    },
    apropos: {
      title: 'Who are we?',
      positioning: 'Innovation to Business',
      paragraphs: [
        'NovaXone\'s mission is to support technology ventures in key phases of their development.',
        'Novaxone was founded by Alain Meller and draws from his varied experience of thirty years in the development of technology companies, especially within software vendors.',
        'During his career, he held most of the key positions of this type of business: product management and R&D, marketing, business development, professional services and general management and has been also an investor in these companies, as a founder of a venture capital fund.',
        'NovaXone is largely inspired by the experiences of its founder who drew strong convictions and expertise on the development problems of this type of companies.',
      ],
      positioningText: [
        'We assist technology companies of all sizes, particularly software companies, in the course of their development.',
        'We provide our customers our methodologies and expertise to ensure the economic success of their innovations.',
        'We do not focus on the generation of innovations but on the conditions and actions that may enable them to produce the maximum value.',
        'For us, innovation is a beginning, not an end, it is a seed that must be accompanied to grow and produce the maximum impact on the market. We do more than Management Consulting and often "walk the talk" to support the development of the company.',
      ],
    },
    blog: {
      title: 'Last Publications',
      readMore: 'Read article',
      backToBlog: 'Back to blog',
      noPosts: 'No articles yet.',
      addArticle: 'Add article',
      adminMode: 'Admin Mode',
      form: {
        title: 'Title',
        excerpt: 'Excerpt',
        content: 'Content',
        category: 'Category',
        date: 'Date',
        submit: 'Publish',
        cancel: 'Cancel',
      },
    },
    contact: {
      title: 'Contact',
      address: '5 Rue Davioud, 75016 Paris',
      country: 'FRANCE',
      email: 'info@novaxone.com',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send!',
      },
      map: 'View map',
    },
    footer: {
      copy: `© Novaxone — ${new Date().getFullYear()}`,
    },
  },
};
