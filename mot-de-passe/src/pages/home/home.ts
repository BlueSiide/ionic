import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	words = 'angle,armoire,banc,bureau,cabinet,carreau,chaise,classe,clé,coin,couloir,dossier,eau,école,écriture,entrée,escalier,étagère,étude,extérieur,fenêtre,intérieur,lavabo,lecture,lit,marche,matelas,maternelle,meuble,mousse,mur,peluche,placard,plafond,porte,portemanteau,poubelle,radiateur,rampe,récréation,rentrée,rideau,robinet,salle,savon,serrure,serviette,siège,sieste,silence,sol,sommeil,sonnette,sortie,table,tableau,tabouret,tapis,tiroir,toilette,vitre,aller,amener,apporter,appuyer,s’asseoir,attendre,bâiller,bosser,secoucher,dormir,éclairer,écrire,emmener,emporter,s’endormir,s’ennuyer,entrer,étudier,fermer,frapper,s’installer,selever,lire,ouvrir,sepresser,seréchauffer,rentrer,sereposer,rester,seréveiller,sonner,sortir,tricher,venir,absent,assis,bas,couché,haut,présent,debout,dedans,dehors,loin,près,tard,tôt,après,avant,contre,derrière,devant,sous,sur,crayon,stylo,feutre,taille-crayon,pointe,mine,gomme,dessin,coloriage,rayure,peinture,pinceau,couleur,craie,papier,feuille,cahier,carnet,carton,ciseaux,découpage,pliage,pli,colle,affaire,boîte,casier,caisse,trousse,cartable,jouet,jeu,pion,dé,domino,puzzle,cube,perle,chose,forme:carré,rond,pâteàmodeler,tampon,livre,histoire,bibliothèque,image,album,titre,bandedessinée,conte,dictionnaire,magazine,catalogue,page,ligne,mot,enveloppe,étiquette,carted’appel:affiche,alphabet,appareil,caméscope,cassette,cédé,cédérom,chaîne,chanson,chiffre,contraire,différence,doigt,écran,écriture,film,fois,idée,instrument,intrus,lettre,liste,magnétoscope,main,micro,modèle,musique,nom,nombre,orchestre,ordinateur,photo,point,poster,pouce,prénom,question,radio,sens,tambour,télécommande,téléphone,télévision,trait,trompette,voix,xylophone,zéro,chanter,chercher,choisir,chuchoter,coller,colorier,commencer,comparer,compter,construire,continuer,copier,couper,déchirer,décoller,décorer,découper,demander,démolir,sedépêcher,dessiner,dire,discuter,écouter,écrire,effacer,entendre,entourer,envoyer,faire,finir,fouiller,goûter,imiter,laisser,lire,mettre,montrer,parler,peindre,plier,poser,prendre,préparer,ranger,réciter,recommencer,regarder,remettre,répéter,répondre,sentir,souligner,tailler,setaire,tenir,terminer,toucher,travailler,trier,ami,attention,camarade,colère,copain,coquin,dame,directeur,directrice,droit,effort,élève,enfant,fatigue,faute,fille,garçon,gardien,madame,maître,maîtresse,mensonge,ordre,personne,retard,sourire,travail,aider,défendre,désobéir,distribuer,échanger,s’excuser,expliquer,sefâcher,gronder,obéir,obliger,partager,prêter,priver,promettre,punir,sequitter,raconter,refuser,séparer,blond,brun,calme,curieux,différent,doux,énervé,gentil,grand,handicapé,inséparable,jaloux,moyen,muet,noir,nouveau,petit,poli,propre,roux,sage,sale,sérieux,sourd,tranquille,arrosoir,assiette,balle,bateau,boîte,bouchon,bouteille,bulles,canard,casserole,cuillère,cuvette,douche,entonnoir,gouttes,litre,moulin,pluie,poisson,pont,pot,roue,sacenplastique,saladier,seau,tablier,tasse,trous,verre,agiter,s’amuser,arroser,attraper,avancer,baigner,barboter,boucher,bouger,déborder,doucher,éclabousser,essuyer,envoyer,flotter,gonfler,inonder,jouer,laver,mélanger,mouiller,nager,patauger,pleuvoir,plonger,pousser,pouvoir,presser,recevoir,remplir,renverser,sécher,serrer,souffler,tirer,tourner,tremper,verser,vider,vouloir,amusant,chaud,froid,humide,intéressant,mouillé,sec,transparent,autant,beaucoup,encore,moins,peu,plus,trop,anorak,arc,bagage,baguette,barbe,bonnet,botte,bouton,bretelle,cagoule,casque,casquette,ceinture,chapeau,chaussette,chausson,chaussure,chemise,cigarette,col,collant,couronne,cravate,culotte,écharpe,épée,fée,flèche,fusil,gant,habit,jean,jupe,lacet,laine,linge,lunettes,magicien,magie,maillot,manche,manteau,mouchoir,moufle,nœud,paire,pantalon,pied,poche,prince,pull-over,pyjama,reine,robe,roi,ruban,semelle,soldat,sorcière,tache,taille,talon,tissu,tricot,uniforme,valise,veste,vêtement,lacer,porter,ressembler,clair,court,étroit,foncé,joli,large,long,multicolore,nu,usé,bien,mal,mieux,presque,aiguille,ampoule,avion,bois,bout,bricolage,bruit,cabane,carton,clou,colle,crochet,élastique,ficelle,fil,marionnette,marteau,métal,mètre,morceau,moteur,objet,outil,peinture,pinceau,planche,plâtre,scie,tournevis,vis,voiture,véhicule,arracher,attacher,casser,coudre,détruire,s’écorcher,enfiler,enfoncer,fabriquer,mesurer,percer,sepincer,réparer,réussir,servir,taper,trouer,adroit,difficile,dur,facile,lisse,maladroit,pointu,rugueux,tordu,accident,aéroport,auto,camion,engin,feu,frein,fusée,garage,gare,grue,hélicoptère,moto,panne,parking,pilote,pneu,quai,train,virage,vitesse,voyage,wagon,zigzag,s’arrêter,atterrir,bouder,charger,conduire,démarrer,disparaître,donner,écraser,s’envoler,garder,segarer,manquer,partir,seposer,reculer,rouler,tendre,transporter,voler,abîmé,ancien,blanc,bleu,cassé,cinq,dernier,deux,deuxième,dix,gris,gros,huit,jaune,même,neuf,pareil,premier,quatre,rouge,sept,seul,six,solide,trois,troisième,un,vert,au-dessus,autour,vite,acrobate,arrêt,arrière,barre,barreau,bord,bras,cerceau,chaises,cheville,chute,cœur,corde,corps,côté,cou,coude,cuisse,danger,doigts,dos,échasses,échelle,épaule,équipe,escabeau,fesse,filet,fond,genou,gymnastique,hanche,jambes,jeu,mains,milieu,montagne,murd’escalade,muscle,numéro,ongle,parcours,pas,passerelle,pente,peur,pieds,plongeoir,poignet,poing,pontdesinge,poutred’équilibre,prises,rivièredescrocodiles,roulade,saut,serpent,sport,suivant,tête,toboggan,tour,trampoline,tunnel,ventre,s’accrocher,s’appuyer,arriver,sebaisser,sebalancer,bondir,bousculer,secogner,courir,danser,dépasser,descendre,écarter,escalader,gagner,gêner,glisser,grimper,marcheràquatrepattes,marchersur,semettredebout,monter,sepencher,sepercher,perdre,ramper,rater,remplacer,respirer,seretourner,revenir,sauter,soulever,suivre,tomber,transpirer,traverser,dangereux,épais,fort,gauche,groupé,immobile,rond,serré,souple,bagarre,balançoire,ballon,bande,bicyclette,bille,cadenas,cageàécureuil,cerf-volant,château,coup,cour,course,échasse,flaque,paix,pardon,partie,pédale,pelle,pompe,préau,raquette,rayon,récréation,sable,sifflet,signe,tas,tricycle,tuyau,vélo,filet,hurler,jongler,lancer,pédaler,seplaindre,pleurer,poursuivre,protéger,saigner,sesalir,siffler,surveiller,traîner,trouver,caché,fou,méchant,allumette,anniversaire,appétit,beurre,coquille,crêpes,croûte,dessert,envie,faim,fève,four,galette,gâteau,goût,invitation,langue,lèvres,liquide,louche,mie,moitié,moule,odeur,œuf,part,pâte,pâtisserie,recette,rouleau,sel,soif,tarte,tranche,yaourt,aimer,allumer,avaler,battre,sebrûler,chauffer,cuire,étaler,éteindre,falloir,inviter,jeter,lécher,oublier,serégaler,remercier,remuer,souhaiter,sucer,barbouillé,demi,égal,entier,gourmand,mauvais,meilleur,mince,glaçon,jus,kiwi,lame,mûre,noyau,paille,pamplemousse,râpe,croquer,éplucher,râper,bassine,cocotte,épluchure,légume,pommedeterre,rondelle,soupe,consommé,potage,bouillir,mixer,cru,cuit,vide,arête,frite,gobelet,jambon,os,poulet,purée,radis,restaurant,sole,déjeuner,animal,bébés,bouche,cage,câlin,caresse,cochond’Inde,foin,graines,hamster,lapin,maison,nez,œil,oreille,patte,toit,yeux,accoucher,agacer,appeler,câliner,caresser,changer,déranger,s’échapper,élever,enfermer,enterrer,gratter,grignoter,installer,lâcher,mordre,mourir,naître,nourrir,s’occuperde,sepromener,ronger,sesauver,soigner,téter,vivre,voir,abandonné,enceinte,maigre,mort,né,vivant,légume,abeille,agneau,aile,âne,arbre,bain,barque,bassin,bébé,bec,bête,bœuf,bottedefoin,boue,bouquet,bourgeon,branche,caillou,campagne,car,champ,chariot,chat,cheminée,cheval,chèvre,chien,cochon,colline,coq,coquelicot,crapaud,cygne,départ,dindon,escargot,étang,ferme,fermier,feuille,flamme,fleur,fontaine,fumée,grain,graine,grenouille,griffe,guêpe,herbe,hérisson,insecte,jardin,mare,marguerite,miel,morceaudepain,mouche,mouton,oie,oiseau,pierre,pigeon,plante,plume,poney,poule,poussin,prairie,rat,rivière,route,tortue,tracteur,tulipe,vache,vétérinaire,accompagner,sebaigner,couriraprès,couver,donneràmanger,faireboire,fumer,griffer,habiter,piquer,ramasser,traire,bizarre,énorme,immense,malade,nain,utile,aigle,animaux,aquarium,bêtes,cerf,chouette,cigogne,crocodile,dauphin,éléphant,girafe,hibou,hippopotame,kangourou,lion,loup,ours,panda,panthère,perroquet,phoque,renard,requin,rhinocéros,singe,tigre,zèbre,zoo,épingle,bâton,bêtise,bonhomme,bottes,canne,cauchemar,cri,danse,déguisement,dinosaure,drapeau,enargent,enor,enrang,fête,figure,géant,gens,grand-mère,grand-père,joie,joue,journaux,maquillage,masque,monsieur,moustache,ogre,princesse,rue,trottoir,déguiser,défiler,éclater,essayer,marcher,semoquer,plaire,rencontrer,ressemblerà,retourner,rêver,rire,tapersur,danser,sauter,chanter,content,drôle,effrayé,heureux,joyeux,prêt,riche,terrible,Noël,boule,cadeau,canneàpêche,chance,cube,guirlande,humeur,papillon,spectacle,surprise,trou,visage,fairepeur,lever,maquiller,électrique,âge,an,année,après-midi,calendrier,début,dimanche,été,étoile,fin,heuredesmamans,heure,hiver,horloge,jeudi,jour,journée,lumière,lundi,lune,mardi,matin,mercredi,midi,minuit,minute,mois,moment,montre,nuit,ombre,pendule,retour,réveil,saison,samedi,semaine,soir,soleil,temps,univers,vacances,vendredi,avancer,briller,dîner,grandir,mettredutemps,suivre,retarder,aîné,jeune,lent,patient,rapide,sombre,vieux,aujourd’hui,bientôt,d’abord,demain,hier,maintenant,puis,toutdesuite,enavance,enretard,air,arc-en-ciel,brouillard,ciel,éclair,flocon,goutte,hirondelle,luge,neige,nuage,orage,ouragan,parapluie,parasol,ski,tempête,thermomètre,tonnerre,traîneau,vent,s’abriter,fairebeau,geler,semouiller,neiger,setromper,pleuvoir,venter,déçu,triste,chaud,froid,pluvieux,nuageux,humide,gelé,instable,changeant,assiette,balai,biscuit,boisson,bol,bonbon,céréale,confiture,coquetier,couteau,couvercle,couvert,cuillère,cuisine,cuisinière,désordre,dînette,éponge,évier,four,fourchette,lait,lave-linge,lessive,machine,nappe,pain,pile,plat,plateau,poêle,réfrigérateur,repas,tartine,torchon,vaisselle,accrocher,balayer,boire,frotter,manger,nettoyer,seservir,cuisiner,bon,creux,délicieux,argent,aspirateur,bague,barrette,bijou,bracelet,brosse,cadre,canapé,chambre,cheveu,chiffon,cil,coffre,coffret,collier,couette,coussin,couverture,dent,dentifrice,drap,fauteuil,feràrepasser,frange,glace,lampe,lit,ménage,or,oreiller,parfum,peigne,pouf,poupée,poussette,poussière,shampoing,sourcil,trésor,tube,vase,s’allonger,secoiffer,hésiter,selaver,semaquiller,passer,préférer,repasser,sesécher,secouer,téléphoner,beau,belle,confortable,coquet,douillet,adulte,album,amour,baiser,bavoir,biberon,bisou,caprice,cimetière,cousin,cousine,crèche,fils,frère,grand-parent,homme,femme,jumeau,maman,mari,mariage,mère,papa,parent,père,petit-enfant,petit-fils,petite-fille,rasoir,sœur,s’agiter,s’appeler,baver,bercer,seblottir,consoler,déménager,sedétester,s’embrasser,semarier,offrir,penser,serappeler,seraser,ronfler,seserrer,tricoter,ambulance,bosse,champignon,dentiste,docteur,fièvre,front,gorge,infirmier,infirmière,jambe,larme,médecin,menton,mine,ordonnance,pansement,peau,piqûre,poison,sang,santé,squelette,trousse,allerbien,attraperunemaladie,seblesser,détester,devoir,éternuer,segratter,guérir,semoucher,nepasoublier,seprotéger,recoudre,souffrir,tâter,tousser,trembler,guéri,pâle,araignée,brouette,chenille,coccinelle,fourmi,herbe,jonquille,lézard,pâquerette,rangée,râteau,rosé,souris,taupe,terrain,terre,terrier,tige,ver,cueillir,jardiner,sefaner,s’ouvrir,planter,mûr,profond,assez,portière,sac,voyager,billet,caisse,farce,grimace,grotte,pays,regard,ticket,sedoucher,tuer,cruel,bûche,buisson,camp,chasseur,châtaigne,chemin,chêne,corbeau,écorce,écureuil,forêt,gourde,lac,loupe,lutin,marron,mûre,moustique,muguet,nid,paysage,pin,rocher,sapin,sommet,tente,camper,chasser,s’éloigner,entendre,s’envoler,griller,grimper,guetter,s’imaginer,jeter,lancer,manger,marcher,montrer,semouiller,patauger,sepercher,seperdre,photographier,pique-niquer,pleuvoir,poser,poursuivre,ramasser,regarder,rencontrer,sereposer,respirer,revoir,rêver,sentir,siffler,transpirer,traverser,trouver,vivre,adresse,appartement,ascenseur,balcon,boucherie,boulanger,boulangerie,boutique,bus,caniveau,caravane,carrefour,cave,charcuterie,cinéma,cirque,clind’œil,cloche,clocher,clown,coiffeur,colis-route,courrier,croix,église,embouteillage,endroit,enveloppe,essence,facteur,fleuriste,foire,hôpital,hôtel,immeuble,incendie,laisse,magasin,manège,médicament,moineau,monde,monument,ouvrier,palais,panneau,paquet,parc,passage,pharmacie,pharmacien,piscine,place,police,policier,pompier,poste,promenade,quartier,square,timbre,travaux,usine,village,ville,voisin,volet,barrer,clignoter,secroiser,garer,photographier,reconnaître,retrouver,revoir,saluer,savoir,setoucher,setrouver,visiter,important,impossible,prudent,abricot,ail,aliment,ananas,banane,bifteck,café,carotte,cerise,chocolat,chou,citron,citrouille,clémentine,concombre,coquillage,corbeille,crabe,crevette,endive,farine,fraise,framboise,fromage,fruit,gâteau,haricot,huile,légume,marchand,melon,monnaie,navet,noisette,noix,nourriture,oignon,orange,panier,pâtes,pêche,persil,petitpois,poire,poireau,pomme,pommedeterre,prix,prune,queue,raisin,riz,salade,sucre,thé,tomate,viande,vin,acheter,ajouter,coûter,payer,peser,rendre,vendre,cher,léger,lourd,plein,baleine,bouée,île,jumelles,marin,mer,mouette,navire,pêcheur,plage,poisson,port,sardine,serviette,vague,voile,senoyer,ramer,nager'.split(',');
	word: string;
	isPlaying = false;
	hasPlayed = false;
	score = 0;
	time = 60;
	chrono = 0;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
		this.onRandomWord();
		this.changeChrono();
	}
	
	onRandomWord() {
		this.word = this.words[Math.floor(Math.random() * this.words.length-1)];
	}

	onStartGame() {
		this.onRandomWord();
		this.hasPlayed = true;
		this.score = 0;
		this.isPlaying = true;
		this.chrono = this.time;
	}

	onValidateWord() {
		this.score++;
		this.onRandomWord();
	}

	changeChrono() {
		setTimeout(() => {
			if (this.chrono > 0) {
				this.chrono --
			}
			if (this.chrono == 0) {
				this.isPlaying = false;
			}
			this.changeChrono();
		}, 1000);
	}

	onChangeTime() {
		let alert = this.alertCtrl.create({
			inputs: [
				{
					name: 'newTime'
				}
			],
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: (data: number) => {
						this.time = data['newTime'];
					}
				}
			]
		});
		alert.present();
	}

}