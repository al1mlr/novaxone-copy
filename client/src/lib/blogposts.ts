export const blogPosts = {
  fr: [
    {
      id: 'ia-prothese-orthese',
      title: 'IA : prothèse ou orthèse ?',
      date: '2019-03-09',
      dateLabel: 'MAR 09',
      category: 'Intelligence Artificielle',
      excerpt: 'Beaucoup d\'efforts sont consacrés à la définition de ce qu\'est l\'intelligence artificielle. Pas de cours sur l\'IA qui ne commence par s\'y essayer. Mais la vraie question est peut-être ailleurs : l\'IA est-elle une prothèse qui remplace l\'humain, ou une orthèse qui l\'amplifie ?',
      content: `[paru en Mars 2019 dans la Jaune et la Rouge n°743]

Beaucoup d'efforts sont consacrés à la définition de ce qu'est l'intelligence artificielle. Pas de cours sur l'IA qui ne commence par s'y essayer, avec en gros deux voies : une voie empirique, qui consiste à définir l'IA en tant que comportement similaire à l'humain d'une machine informatique, et une voie théorique, qui nous plonge dans l'exploration de ce qu'est la pensée ou l'action rationnelle et y relie l'IA et son analyse. Alors, prothèse ou orthèse ?

Pour ceux qui, comme moi, ont utilisé les technologies dites de l'IA pour construire des applications, ce débat « ontologique » est certes intéressant, mais il ne nous permet pas de répondre aux questions concrètes : qu'est-ce que je peux espérer réaliser avec ces technologies que je ne pouvais faire auparavant ? Dans quels cas puis-je les utiliser à bon escient ?

Notons que, dans le terme même d'intelligence artificielle, il y a comme une contradiction intrinsèque : « intelligence » renvoie à l'humain, « artificielle » l'en éloigne. Si bien qu'on se demande si l'IA qualifie une intelligence de type humain produite par un non-humain, donc par un artefact (artificiel), ou s'il s'agit d'une intelligence qui n'est justement pas humaine, qui lui est étrangère (artificielle).

Nous constatons que les deux acceptions existent et produisent des systèmes différents : il y a des cas où l'on souhaite reproduire un comportement quasi humain et d'autres où, au contraire, on souhaite un comportement « intelligent », mais différent de l'humain.

**Quelques exemples**

Lorsque, dans les années 90, je développais ce que l'on appelle des systèmes experts, l'idée était clairement de produire un programme qui se comporte comme un expert humain face à une situation requérant son expertise. Je dirai que l'IA a, ici, la vocation d'être une « prothèse » remplaçant l'humain au sein d'un système où cet humain joue un rôle important.

On trouve dans les applications de cette catégorie toutes les applications de conduite de véhicules autonomes, celles visant à produire des robots humanoïdes pour s'occuper de personnes âgées, les applications de reconnaissance de formes appliquées au tri automatique, etc. Remplacer l'humain au cœur d'un système par l'IA n'est finalement qu'une étape de plus dans la prise en charge par les machines des tâches humaines routinières.

Le deuxième cas de figure est celui où, au contraire, on veut produire avec l'IA de l'intelligence fondamentalement non humaine et qui va permettre d'aider un humain à réaliser une tâche qu'il ne pourrait pas faire, ou pas aussi bien, sans elle. Produire une intelligence non humaine pour résoudre des problèmes humains, c'est fournir ce que j'appelle une « orthèse intellectuelle ». Cette orthèse ne singe pas et a fortiori ne remplace pas l'humain, mais lui confère une capacité augmentée à résoudre des problèmes.

**Vers l'humain 2.0 ?**

Songeons aux limites de l'être humain, là où il n'est pas très bon, à travers quelques exemples. Nous sommes, entre autres, mauvais à résoudre les problèmes fortement combinatoires ; nous perdons rapidement le fil si nous devons explorer de multiples possibilités. De la même façon, il nous est difficile de traiter des volumes de données importants. Dans ce domaine, les technologies de machine learning ont montré leur grand intérêt pour détecter des régularités dans les données massivement abondantes.

De manière plus étonnante, j'ai pu constater, dans le domaine du diagnostic de systèmes, que l'humain est très peu capable de traiter les problèmes de pannes multiples (deux éléments tombent en panne simultanément). De manière constante, même les experts faisaient l'hypothèse d'une cause unique à un dysfonctionnement, passant à côté de ces cas de pannes multiples. La réalisation d'un système d'IA qui, « consciemment », était capable, en cas de contradiction, de remettre en cause cette hypothèse de panne unique, a permis de fournir à ces mêmes experts un outil précieux.`,
      image: '/uploads/ia-prothese.jpg',
      links: [
        { text: 'n°743 de la Jaune et la Rouge', href: 'https://www.lajauneetlarouge.com/les-deux-intelligences-artificielles/' },
      ],
    },
    {
      id: 'reaction-rapport-villani',
      title: 'Réaction au rapport Villani',
      date: '2018-04-13',
      dateLabel: 'AVR 13',
      category: 'Intelligence Artificielle',
      excerpt: 'A la lecture du rapport Villani, je ne peux que partager l\'analyse parfois sévère d\'Olivier Ezratty. Je me contenterai d\'en effleurer certains points, ceux où je me sens un peu compétent.',
      content: `A la lecture du rapport Villani, je ne peux que partager l'analyse parfois sévère d'Olivier Ezratty : « Ce que révèle le Rapport Villani ».

Je me contenterai d'ailleurs de n'en effleurer que certains points, ceux où je me sens un peu compétent.

**Un exemple intéressant d'innovation en IA appliqué à l'industrie**

Au risque de paraître « ancien combattant », je me souviens de ce que nous faisions entre 1985 et 1990 au sein du département d'Intelligence Artificielle des Laboratoires de Marcoussis, centre de recherche du groupe CGE (Compagnie Générale d'Electricité) démantelé ensuite en de multiples sociétés : Alcatel, Alstom, CGA etc. (dont bien peu sont restées françaises).

A l'époque, connectés avec le MIT, nous avions le top de la technologie à disposition : machines Lisp en provenance de Xerox parc, stations de travail dernier cri, etc. Surtout, nous étions en contact avec de vrais problèmes industriels sur lesquels nous appliquions les technologies de l'IA. C'était le temps aussi où la DRET avait de quoi financer des projets de recherche ambitieux pour la Défense Nationale.

Chacun de nous avait une double compétence scientifique et applicative (ainsi pour moi : logique non monotone et diagnostic des systèmes basés sur des modèles structurels et fonctionnels).

De très nombreux projets sont nés en collaboration avec les filiales du groupe ou avec les grands comptes, notamment des projets dits de systèmes experts. La plupart du temps ils étaient destinés à seconder et aider les experts humains.

Beaucoup de sujets concernaient les **domaines du diagnostic curatif et préventif** : prévention des mauvais fonctionnement des machines de tris postales, des turbo-alternateurs de centrales hydrauliques, réparation de systèmes électroniques, détection des maintenances préventives par le suivi des vibrations moteur, aide à la prédiction de la qualité des wafers de silicium etc.

**Une recherche publique qui tourne en rond ?**

Dans le même temps la recherche publique tournait en rond sur des sujets sans grand intérêt industriel, avec des applications jouets et des croyances aussi dérisoires que de penser qu'un système expert était un système à base de faits et de règles d'inférence, confondant ainsi outils et applications.

Pour revenir au rapport Villani, la leçon tirée de ces années, n'est sans doute pas que l'état décrète de grands plans pour que la cohorte des experts autoproclamés fassent monter la sauce pour se partager le gâteau que l'état veut réserver au sujet.

**Moins de chercheurs, plus de Product Manager !**

L'état doit libérer les énergies des entreprises privées qui seules façonnent les solutions utiles et qui génèrent une valeur économique. Il doit inciter structurellement la collaboration de la recherche publique avec les entreprises (par une évaluation des chercheurs et un mécanisme de choix des sujets adaptés, par un cadre plus sain et incitatif pour passer d'un monde à l'autre…).

La difficulté que nous avons en France, dans ce domaine comme dans beaucoup d'autres, c'est que nous avons du mal à sortir du modèle de l'état stratège et prescripteur pour aller vers un modèle où l'état est facilitateur et régulateur.`,
      links: [
        { text: '« Ce que révèle le Rapport Villani » par Olivier Ezratty', href: 'http://www.oezratty.net/wordpress/2018/rapport-villani/' },
        { text: 'DRET (Direction des Recherches et Études Techniques)', href: 'http://data.bnf.fr/11863924/france_direction_des_recherches_et_etudes_techniques/' },
      ],
    },
    {
      id: 'logique-produit',
      title: 'La logique « produit » dans le logiciel est loin d\'être une évidence',
      date: '2017-06-24',
      dateLabel: 'JUIN 24',
      category: 'Marketing',
      excerpt: 'Je constate régulièrement la difficulté de certaines sociétés informatiques à se mettre dans une logique de construction de produits. Cette difficulté vient souvent du fait que les potentiels produits naissent au sein d\'entreprises ayant une culture de sociétés de services.',
      content: `Je constate régulièrement la difficulté de certaines sociétés informatiques à se mettre dans une logique de construction de produits.

Cette difficulté vient souvent du fait que les potentiels produits naissent au sein d'entreprises ayant une **culture de sociétés de services**. Cela vaut que l'on parle de logiciels vendus sur un mode de licences classiques ou par la mise en œuvre de solution SaaS.

Dans cet article, je ne parle évidemment pas des startups, qui maintenant bénéficient de bons accompagnements en France et qui ont la culture « produit » à leur naissance (tout n'y est pas toujours parfait pour autant !).

**Changer de logique**

Revenons à ces « produits » qui naissent au sein de SSII, sociétés de conseil, ou grands groupes (les équipes informatiques y sont imprégnées de la culture SSII…).

Combien de fois ai-je entendu, un « responsable R&D » me dire qu'il ne va pas implanter telle ou telle fonctionnalité dans le logiciel parce qu'aucun utilisateur ne l'a demandé ?

Le fait d'attendre ou de demander une expression de besoins à son client relève d'une culture diamétralement opposée à la *culture produit* qui vise à **répondre aux besoins de segments de clients**. Rappelons la célèbre phrase de Henry Ford : « si j'avais demandé à mes clients ce qu'il voulait, ils m'auraient demandé des chevaux plus rapides ».

Il faut, en effet, répondre aux besoins d'un segment en **factorisant ces besoins** et c'est déjà compliqué…. mais pas suffisant car il faut également **anticiper et être en avance aussi, sur la masse des besoins exprimés**, sous peine de ne pas avoir la bonne offre au bon moment et voir les prospects partir chez un concurrent plus agile !

**Un changement de modèle d'organisation**

La première difficulté est donc culturelle : c'est celle de la **compréhension de ce qu'est le Product Management**, son absolue nécessité en tant que fonction et la reconnaissance des compétences particulières qu'elle requiert.

La deuxième constante de ces sociétés orientées vers le service c'est que d'un point de vue organisationnel, **elles sont relativement simples**. En réalité la plupart des activités de gestion visent à optimiser l'utilisation des ressources humaines avant tout. Du coup, il existe peu de spécialisation fonctionnelle des collaborateurs, qui doivent pouvoir changer d'activité rapidement, en fonction des besoins et missions.

Or ceci constitue une autre difficulté majeure car, il ne s'agit plus seulement d'utiliser au mieux des ressources de développement d'application, **il s'agit de créer et gérer une usine de production** qui répond à une définition marketing de produit et d'y associer toutes sortes d'activités annexes qui sont celles de la mise en marché d'un produit (vente, marketing), du support client (conseil, formation) voire de la gestion opérationnelle 24/24 de serveurs applicatifs dans le cas des offres SaaS.

Résultat, ces sociétés et les hommes qui constituent les équipes doivent pouvoir **faire leur révolution culturelle en un temps très court**, si elles en sont capables ; et cela commence bien sûr par les équipes de management.

**Quelques vieux souvenirs**

Pour ma part j'ai eu la chance de participer très tôt (dans les années 90…) à l'essor d'une société (ILOG) qui **dès le début s'était structurée comme un véritable éditeur de logiciel**. Je peux dire que nous étions peu nombreux à l'époque sur ce modèle et je pense que beaucoup de mes ex-collègues n'ont réalisé que plus tard, combien nous étions précurseurs dans le panorama français. Nous avions très tôt bâti une organisation **véritablement industrielle** pour développer et servir les clients sur des offres "sur étagères".`,
    },
    {
      id: 'conference-timing-partie-1',
      title: 'Conférence sur l\'importance du timing (partie 1)',
      date: '2016-03-28',
      dateLabel: 'MAR 28',
      category: 'Présentation',
      excerpt: 'Le « timing » facteur le moins maitrisé de la réussite d\'une entreprise technologique ? Cette conférence fait d\'abord un constat sur le peu de matière élaborée autour de la notion de « timing ».',
      content: `Le « timing » facteur le moins maitrisé de la réussite d'une entreprise technologique ?

Cette conférence fait d'abord un constat sur le peu de matière élaborée autour de la notion de « timing ».

On entend parfois des constats du genre : « nous avons réussi parce que le timing était bon », ou plus souvent l'inverse, le timing est invoqué pour justifier de l'échec d'une start-up.

Cependant, il est rare que l'on trouve dans la littérature ou sur le net, des analyses un peu fouillées sur ce concept de « timing ». Il était amusant, quelques jours avant la conférence, de faire une recherche google sur « The importance of timing » et trouver ma propre conférence dans les premiers résultats, preuve, s'il en fallait du peu de matière sur le sujet.

Pour avoir vu des centaines de startups dans les 15 dernières années en tant que conseil ou investisseur, et parfois en tant qu'acteur de leur développement, j'ai constaté de nombreuses fois la force de cet implacable paramètre de la réussite d'une entreprise technologique.

Du coup, j'ai bien sûr essayé de faire en sorte, sinon de l'apprivoiser, tout du moins de mieux le comprendre et mieux anticiper ces effets.

Se positionner par rapport à un timing de marché est une nécessité qui peut s'appuyer sur des critères identifiables et mesurables et va permettre à une entreprise de mieux « négocier sa trajectoire de développement ».

**Le sujet du "quand" ?**

On est bien entendu dans le questionnement du bon moment pour agir, l'une des questions à ce propos étant : « Suis-je en avance sur mon marché ? ». Mais aussi : « Ai-je raté le coche ? »

Ces questions sont fondamentales car elles conditionnent la stratégie de développement de l'entreprise, son rythme d'investissement et ses priorités. Une entreprise qui se positionne trop tôt brûle ses ressources sur un marché pas encore prêt. Une entreprise qui arrive trop tard se retrouve dans une compétition acharnée sur un marché déjà occupé.`,
      image: '/uploads/timing-emoji.png',
      links: [
        { text: 'Site du CNRS - Cahier de laboratoire', href: 'http://www.cnrs.fr/infoslabos/cahier-laboratoire/' },
      ],
    },
    {
      id: 'conference-timing-partie-2',
      title: 'Conférence sur l\'importance du timing (partie 2)',
      date: '2016-03-28',
      dateLabel: 'MAR 28',
      category: 'Présentation',
      excerpt: 'Le cahier de laboratoire électronique : une innovation qui procure des gains évidents et qui ne prend pas, pourquoi ? Une étude de cas sur le timing de l\'innovation.',
      content: `Le cahier de laboratoire électronique : une innovation qui procure des gains évidents et qui ne prend pas, pourquoi ?

L'innovation que constitue le cahier de laboratoire électronique amène pourtant des solutions aux problèmes que posent les cahiers de laboratoires papier (les "pain problems") et pourtant leur adoption n'a pas décollé pendant de nombreuses années.

On peut se douter que l'idée de remplacer un cahier papier à la tenue fastidieuse par une application informatique n'est pas une idée récente ! Et pourtant en 2004, les milliers de chercheurs en sciences expérimentales dans le monde entier, l'utilisent à … 98% sous format papier.

**Le cahier de laboratoire papier : pain problems**

Les avantages du cahier de laboratoire électronique (a priori) :
- Tenue fastidieuse et consommatrice de temps
- Risque de perte : accident de paillasse, vol
- Gestion d'archives papier sur des périodes très longues très coûteuses
- Inadaptation à la recherche d'informations
- Inadaptation à l'évolution des méthodes et moyens utilisés en R&D (volume de données, formats multimédias, etc.)

**Pourquoi l'adoption n'a pas eu lieu ?**

La réponse est dans le timing : les conditions technologiques, organisationnelles et culturelles n'étaient pas réunies au bon moment.

Ce cas d'école illustre parfaitement comment une innovation techniquement supérieure peut échouer simplement parce qu'elle arrive trop tôt sur le marché. Les interfaces utilisateurs des années 90 et 2000 n'étaient pas adaptées à un usage en laboratoire. Les tablettes tactiles n'existaient pas encore. Le cloud non plus.

Les leçons de ce cas s'appliquent à de nombreuses innovations dans le secteur du logiciel et des services numériques. Avant de se demander "comment vendre mon innovation", il faut se demander "est-ce que le marché est prêt à l'adopter ?"`,
      image: '/uploads/timing-v2.png',
    },
    {
      id: 'conference-timing-partie-3',
      title: 'Conférence sur l\'importance du timing (partie 3)',
      date: '2016-03-28',
      dateLabel: 'MAR 28',
      category: 'Présentation',
      excerpt: 'Être sensible aux signaux de timing. Une fois que l\'on a compris comment évolue les marchés technologiques, on peut développer une sensibilité aux signaux qui permettent de savoir où on se trouve.',
      content: `**Être sensible aux signaux de timing**

Une fois que l'on a compris comment évolue les marchés technologiques et comment se caractérise chacune des étapes de leur développement, alors on peut développer une sensibilité aux signaux qui permettent de savoir où on se trouve.

**Innovation et segmentation du marché**

Un marché est rarement homogène et il peut exister différents segments avec des besoins différents. Il est fondamental alors de repérer les segments qui vont adopter l'innovation plus vite que les autres.

Les « early adopters » sont des clients particuliers qui acceptent de prendre des risques pour bénéficier en avant-première des avantages d'une innovation. Les identifier et les cibler en priorité est une stratégie fondamentale pour valider le timing de son innovation.

**Au final : quelques conseils**

1. **Observer les signaux faibles** : les premiers utilisateurs, les articles de presse spécialisée, les conférences académiques sont autant de signaux qui indiquent la maturité d'un marché.

2. **Analyser la concurrence** : si plusieurs acteurs commencent à se positionner sur le même marché, c'est souvent le signe que le timing est bon.

3. **Évaluer la maturité technologique** : une innovation ne peut pas être adoptée massivement si la technologie sous-jacente n'est pas suffisamment mature et accessible.

4. **Mesurer la résistance au changement** : plus la résistance est forte, plus le timing est probablement prématuré.

**Épilogue sur le cahier de laboratoire électronique**

Aujourd'hui, le cahier de laboratoire électronique est largement adopté. Le timing était finalement bon… mais il a fallu attendre que les conditions soient réunies : tablettes tactiles, cloud, réglementations adaptées, et surtout une génération de chercheurs nés avec le numérique.

Tags : crossing the chasm / Timing de l'innovation`,
    },
  ],
  en: [
    {
      id: 'ai-story-2',
      title: 'A personal Story of Artificial Intelligence (2)',
      date: '2018-08-19',
      dateLabel: 'AUG 19',
      category: 'Articles',
      excerpt: 'The Lisp language is really linked to the first attempt to implement Artificial Intelligence programs. It\'d be worth explaining why Lisp is a fascinating language that really fits the task.',
      content: `The Lisp language is really linked to the first attempt to implement Artificial Intelligence programs. It'd be worth explaining why Lisp is a fascinating language that really fits the task and I'm quite surprised that it barely survived and did not become one of the mainstream programming languages today.

The reason is probably due to an attempt from the American school to create a gigantic environment, mainly for Academic usage called CommonLisp that revealed too complex, slow and too resource intensive to be adopted by the industry.

The European school tried to create a lighter version called EuroLisp but it was too late, the Lisp machine manufacturers were already dying and the Unix workstations were taking over.

**The Lisp machines era**

In the late 80s, I was working on a Xerox 1186 Lisp machine. It was a beautiful piece of hardware with a very sophisticated operating system called Interlisp-D. The machine was running Lisp natively and the development environment was amazing for the time.

The Lisp machine was the first computer to have a graphical user interface, a mouse, and a window system. It was the inspiration for the Macintosh and later Windows.

But the Lisp machines were too expensive and too slow compared to the Unix workstations that were coming out at the same time. The industry moved to C and Unix and Lisp was left behind.

**The lessons for today**

The story of Lisp machines is a perfect example of a technology that was ahead of its time. The concepts were right, the implementation was elegant, but the timing was wrong.

Today, many of the ideas from Lisp have been rediscovered and implemented in modern languages like Python, Ruby, and JavaScript. The functional programming paradigm that was central to Lisp is now mainstream.`,
      image: '/uploads/ibmpc.png',
      links: [
        { text: 'Lisp (programming language)', href: 'https://en.wikipedia.org/wiki/Lisp_(programming_language)' },
        { text: 'CommonLisp', href: 'https://common-lisp.net/' },
        { text: 'Le_Lisp', href: 'https://en.wikipedia.org/wiki/Le_Lisp' },
        { text: 'Interlisp', href: 'https://en.wikipedia.org/wiki/Interlisp' },
      ],
    },
    {
      id: 'ai-story-timing',
      title: 'A personal Story of Artificial Intelligence and Timing',
      date: '2018-07-15',
      dateLabel: 'JUL 15',
      category: 'Articles',
      excerpt: 'Timing is everything in technology. I\'ve seen hundreds of startups succeed or fail based on their timing. This is my personal story of how timing shaped my career in AI.',
      content: `Timing is everything in technology. I've seen hundreds of startups succeed or fail based on their timing. This is my personal story of how timing shaped my career in AI.

**The first wave: Expert Systems (1985-1995)**

When I started working in AI in the mid-80s, expert systems were the hot topic. The idea was simple: capture the knowledge of human experts in a computer program and use it to solve problems.

We built some remarkable systems at the time. I worked on a system that helped the French Air Force reconfigure its air defense system in real-time. Another system helped diagnose faults in industrial equipment.

These systems worked well, but they were expensive to build and maintain. The knowledge had to be manually encoded by knowledge engineers working with domain experts. This was slow and costly.

**The winter of AI (1995-2005)**

Then came the AI winter. Funding dried up, companies went bankrupt, and the hype disappeared. Many of my colleagues left the field.

But I stayed, because I believed that the fundamental ideas were right. The timing was just wrong. The computers were too slow, the data was too scarce, and the algorithms were too limited.

**The renaissance (2005-present)**

The renaissance of AI came with three things: more data, more computing power, and better algorithms. The combination of these three factors created the conditions for a new wave of AI applications.

Machine learning, and especially deep learning, has transformed the field. The systems we can build today would have seemed like science fiction in the 1990s.

The lesson I draw from this is that timing is not just about being first. It's about being ready when the conditions are right.`,
    },
    {
      id: 'ai-story-1',
      title: 'A personal Story of Artificial Intelligence (1)',
      date: '2018-06-10',
      dateLabel: 'JUN 10',
      category: 'Articles',
      excerpt: 'My personal journey through the history of Artificial Intelligence, from the early days of expert systems to the current renaissance of machine learning.',
      content: `My personal journey through the history of Artificial Intelligence starts in 1985, when I joined the AI department of the Marcoussis Research Laboratories of the CGE group (Compagnie Générale d'Electricité).

**The beginning**

At the time, AI was a hot topic in academia and industry. The Japanese had launched their Fifth Generation Computer project, which promised to create computers that could reason and learn. The Americans were not far behind, with DARPA funding a massive research program.

In Europe, we were trying to catch up. The CGE group had decided to invest in AI research, and I was lucky enough to be part of the team.

We were working on expert systems, which were the dominant AI technology at the time. The idea was to capture the knowledge of human experts in a computer program and use it to solve problems.

**The Marcoussis years**

At Marcoussis, we had access to the best hardware available at the time: Lisp machines from Xerox, powerful Unix workstations, and fast networks. We were connected to the best research groups in the world, including MIT and Stanford.

We worked on a wide range of applications: fault diagnosis for industrial equipment, configuration of complex systems, planning and scheduling, natural language processing.

The work was exciting and challenging. We were pushing the boundaries of what was possible with the technology of the time.

**The lessons learned**

Looking back, I think the most important lesson I learned at Marcoussis was the importance of working on real problems with real data. Academic AI research often works on toy problems that are easy to solve but have little practical relevance.

At Marcoussis, we were forced to deal with the messiness of real-world data and the complexity of real-world problems. This taught me to be pragmatic and to focus on what works rather than what is theoretically elegant.`,
      links: [
        { text: 'batch execution', href: 'https://en.wikipedia.org/wiki/Batch_processing' },
        { text: 'LIMSI CNRS', href: 'https://www.limsi.fr/en/' },
        { text: 'IBM 370', href: 'https://en.wikipedia.org/wiki/IBM_System/370' },
        { text: 'IBM PC', href: 'https://en.wikipedia.org/wiki/IBM_Personal_Computer' },
      ],
    },
  ],
};
