/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBasePolyfills) {
    Drupal.atgeBasePolyfills = {};
  }

  Drupal.behaviors.atgeBasePolyfills = {

    /**
     * ATGE Polyfills
     *
     * Add any polyfill js here, so it can be applied universally.
     * This will fix bugs involving browser incompatibilities.
     *
     * @param context
     * @param settings
     */
    // Attach Polyfill js here.
    attach: function (context, settings) {
      // Polyfill the startsWith method on the String prototype to resolve IE11 error
      if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
          value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
          }
        });
      }

      // Polyfill the endsWith method on the String prototype to resolve IE11 error
      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
          if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
          }
          return this.substring(this_len - search.length, this_len) === search;
        };
      }

      // Polyfill the includes method on the String prototype to resolve IE11 error
      if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
          'use strict';

          if (search instanceof RegExp) {
            throw TypeError('first argument must not be a RegExp');
          }
          if (start === undefined) { start = 0; }
          return this.indexOf(search, start) !== -1;
        };
      }

      // Polyfill the forEach method on the NodeList prototype to resolve IE11 error
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  var initialized = false;

  function init() {
    if (!initialized) {
      initialized = true;
      const current_path = window.location.pathname;
      const files = drupalSettings.atge_external_js.files;
      const excludes = drupalSettings.atge_external_js.excluded;
      const disableAdmin = drupalSettings.atge_external_js.disable_admin;
      const disableFront = drupalSettings.atge_external_js.disable_front;

      if (null !== files && files[0] !== "") {
        for (var f in files) {
          const exclude_set = excludes[f].split('\n');
          if (exclude_set.length === 1 && exclude_set[0] === "") {
            $('head').append('<script src="https://' + files[f] + '"></script>');
          } else {
            var is_excluded = false;

            if (disableAdmin[f] === 1 && drupalSettings.path.currentPathIsAdmin ||
              disableFront[f] === 1 && !drupalSettings.path.currentPathIsAdmin) {
              is_excluded = true;
            }

            if (is_excluded === false) {
              for (var e in exclude_set) {
                if (exclude_set[e].trim().length !== 0) {
                  exclude_set[e] = exclude_set[e].trim();
                  var exclude_path = new RegExp('^' + exclude_set[e] + '$');
                  if (exclude_path.test(current_path) || (current_path === '/' && exclude_set[e] === '<front>') ||
                    (current_path.startsWith(exclude_set[e].replace('*', '')) &&
                      exclude_set[e].endsWith('/*'))) {
                    is_excluded = true;
                  }
                }
              }
              if (!is_excluded) {
                $('head').append('<script src="//' + files[f] + '"></script>');
              }
            }
          }
        }
      }
    }
  }

  Drupal.behaviors.atge_external_js = {
    attach: function () {
      init();
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  let initialized = false;

  function init() {
    if (!initialized) {
      initialized = true;
      const currentPath = window.location.pathname;
      const includesConfig = drupalSettings.atge_tint.include_paths;
      let includeSet = '';
      let isIncluded = false;

      if (includesConfig) {
        includeSet = includesConfig.split('\n');
      }

      for (let e in includeSet) {
        if (includeSet[e].trim().length !== 0) {
          includeSet[e] = includeSet[e].trim();
          let includePath = new RegExp('^' + includeSet[e] + '$');
          if (includePath.test(currentPath) || (currentPath === '/' && includeSet[e] === '<front>') ||
            (currentPath.startsWith(includeSet[e].replace('*', '')) &&
              includeSet[e].endsWith('/*'))) {
            isIncluded = true;
          }
        }
      }
      if (isIncluded) {
        $('head').append('<script defer src="https://cdn.hypemarks.com/pages/a5b5e5.js"></script>');
        }
    }
  }

  Drupal.behaviors.atge_tint = {
    attach: function () {
      init();
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/**
 * @file Common data layer helper.
 */

(function ($) {
  Drupal.behaviors.dataLayer = {

    /**
     * The language prefix list (no blank).
     *
     * @return {array}
     */
    langPrefixes: function langPrefixes() {
      var languages = Drupal.settings.dataLayer.languages,
          langList = [];

      for (var lang in languages) {
        if (languages[lang].prefix !== '') {
          langList.push(languages[lang].prefix);
        }
      }
      return langList;

      // With Underscore.js dependency.
      //var list = _.pluck(Drupal.settings.datalayer.languages, 'prefix');
      //return _.filter(list, function(lang) { return lang });
    },

    /**
     * Drupal behavior.
     */
    attach: function() { return }

  };
})(jQuery);
;
(function ($, Drupal, window, document) {
  Drupal.behaviors.atgeIECheck = {
    attach: function(context, settings) {
      var isIE = /*@cc_on!@*/false || !!document.documentMode;

      if (isIE) {
        $(context).find('body').addClass('is-ie');
      }
    }
  }
})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBaseGlobalFunctions) {
      Drupal.atgeBaseGlobalFunctions = {};
  }

  Drupal.behaviors.atgeBaseGlobalFunctions = {

    /**
     * Reusable Functions Example.
     * @param var1
     * @param var2
     */
    functionName: function(var1,var2) {
      // Custom code here.
      // How to use this function:
      // Drupal.behaviors.atgeBaseGlobalFunctions.functionName(var1,var2);
    },
    /**
     * Accordion Menus Helper Function.
     * @param accordionInner
     * @param accordionLinkTarget
     * @param accordionLinkParent
     * @param accordionLinkClass
     * @param accordionIconClass
     * @param accordionFirst (true or false).
     * @param accordionBreakpoint (should be integer such as 1024, 768, etc).
     */
    accordionMenus: function(accordionInner, accordionLinkTarget, accordionLinkParent, accordionLinkClass, accordionIconClass, accordionFirst, accordionBreakpoint) {
      // Check if the breakpoint param is defined or null.
      if (typeof accordionBreakpoint === 'undefined' || !accordionBreakpoint) {
        accordionBreakpoint = 1024;
      }

      var width = $(window).width();
      const themeAbbv = drupalSettings.atge_base.global.theme_abbv;

      function accordionMenuInit() {
        // Scrolling in IOS is causing resize to be triggered.  Detect if actual
        // mobile device and if not, reset the accordion on resize / load.
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && width < accordionBreakpoint) {
          // do nothing on actual mobile devices.
        }
        else {
          width = $(window).width();
          // Close submenus.
          $(accordionInner).hide();
          // Reset Classes
          $(accordionIconClass + ':not(.no-children)').removeClass('icon-' + themeAbbv + '-minus').addClass('icon-' + themeAbbv + '-plus');
          $(accordionLinkTarget).removeClass('active');
          // If the first item needs to be open on load, set accordionFirst var to
          //  true when calling Drupal.behaviors.atgeBaseGlobalFunctions.accordionMenus()
          if (accordionFirst === true) {
            $(accordionLinkParent).first().find(accordionIconClass).addClass('active');
            $(accordionLinkParent).first().find(accordionIconClass).removeClass('icon-' + themeAbbv + '-plus').addClass('icon-' + themeAbbv + '-minus');
            $(accordionLinkParent).first().find(accordionInner).show();
          }
        }
        if (width > (accordionBreakpoint - 1)) {
          $(accordionInner).show();
        }
      }

      // Iterate through each Mobile Menu Navigation Accordion item with children.
      $(accordionLinkTarget).once().each(function() {
        // Click event for menu items with children.
        $(this).on('click touch', function() {
          if (width < accordionBreakpoint) {
            // Prevent parent level links from going to their href so that they can act like accordions.
            //e.preventDefault();
            // Reset all the parent accordions not clicked.
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass).removeClass('active');
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass).next(accordionInner).slideUp();
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass+'.icon-' + themeAbbv + '-minus').removeClass('icon-' + themeAbbv + '-minus').addClass('icon-' + themeAbbv + '-plus');
            // Open the current accordion item.
            $(this).next(accordionInner).toggleClass('menu__accordion--subnav-1--active').slideToggle();
            // Update it's icon class.
            $(this).toggleClass('active');
            $(this).toggleClass('icon-' + themeAbbv + '-plus icon-' + themeAbbv + '-minus');
          }
        });
      });

      // Check if accordionFirst is set to True.
      if (accordionFirst === true) {
        // Detect if actual mobile device.
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && width < 1024) {
          // if yes, then when accordionFirst == true, we need the following to run
          // on load, but only once, outside of the resize function.
          $(accordionLinkParent).first().find(accordionIconClass).addClass('active');
          $(accordionLinkParent).first().find(accordionIconClass).removeClass('icon-' + themeAbbv + '-plus').addClass('icon-' + themeAbbv + '-minus');
          $(accordionLinkParent).first().find(accordionInner).show();
        }
      }

      // Call mobile menu init function.
      $(window).on('load', accordionMenuInit);
      // Rerun on window resize.
      $(window).resize(accordionMenuInit);
    },
    /**
     * Helper function to get height of tallest item, and force all other items,
     * to inherit that height.
     * @param getHeightTarget
     */
    equalHeightColumns: function(getHeightTarget) {

      function equalHeightColumns() {
        var targetProperty = 'min-height';
        var maxHeight = 0;

        $(getHeightTarget).css(targetProperty,'');

        $(getHeightTarget).each(function () {
          if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
          }
        });

        $(getHeightTarget).css(targetProperty, maxHeight);
      }
      // Select correct image on load.
      equalHeightColumns();
      // Update image on resize.
      $(window).resize(equalHeightColumns);

    },
    /**
     * Helper Function to Replace Object Fit Images with Image Background
     * images in versions of IE that don't allow object-fit usage.
     * @param imgTarget
     */
    ieObjectFitFix: function(imgTarget) {
      // IE Object Fit Fix.
      function ieObjectFitFix() {
        var userAgent, ieReg, ie;
        const width = $(window).width();

        userAgent = window.navigator.userAgent;
        ieReg = /msie|Trident.*rv[ :]*11\./gi;
        ie = ieReg.test(userAgent);

        // If IE is detected and we're at tablet and above screen widths.
        if(ie && width > 767) {
          // Then convert image to inline background image.
          $(imgTarget).each(function () {
            var imgUrl = $(this).prop('src'),
                imgHeight = $(this).height();
            if (imgUrl) {
              $(this).wrap('<div class="custom-object-fit" style="background-image:url(' + imgUrl + ');height:' + imgHeight + 'px;"></div>')
            }
          });
        }
      }

      // Select correct image on load.
      $(window).on('load', ieObjectFitFix);
      // Update image on resize.
      $(window).resize(ieObjectFitFix);
    },

    /**
     * Truncator helper function.
     *
     * @param container
     * @param target
     * @param height
     * @param offset
     * @param extra
     */
    truncator: function(container, target, height, offset, extra) {
      if (typeof offset === "undefined" || offset === null) {
        offset = null;
      }
      if (typeof extra === "undefined" || extra === null) {
        extra = 0;
      }
      // How to use this function:
      // Drupal.behaviors.atgeBaseGlobalFunctions.truncator(container, target, height, offset, extra);
      function truncator() {
        // Iterate through each container item.
        $(container).each(function () {
          // Set selector by finding target within $this
          const selector = $(this).find(target);
          // Set max container height; should be a number.
          const containerHeight = height;
          // Get height of other element if present; offset should be a selector.  if null, ignore.
          var titleHeight = offset !== null ? $(this).find(offset).height() : 0;
          // Set final height number to use as truncation base; var extra should be a number.
          var maxHeight = containerHeight - titleHeight - extra;

          // Pass final height number to shave plugin.
          selector.shave(maxHeight);

        });
      }

      // Run Truncator on load.
      $(window).on('load', truncator);
      // Update on Resize.
      $(window).resize(truncator);
    },

    /**
     * A helper function that provides error handling and animation assistance
     * to webforms.
     */
    webformErrorHandler: function() {

      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const telRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

      function validation(input) {
        var error = input.attr('required') ? (input.val() === '') : false;
        if (input.attr('type') === 'email') {
          error = error || !emailRegEx.test(input.val());
        }
        if (input.attr('type') === 'tel') {
          error = error || !telRegEx.test(input.val());
        }
        return error;
      }

      function errorHandling() {
        $('.animated--form-item input, .animated--form-item textarea').each(function (i, input) {
          const parent = $(input).parent();
          // On Focus of form field.
          $(input).focus(function () {
            parent.addClass('form-item__focus');
            // On blur of form field.
          }).blur(function () {
            parent.removeClass('form-item__focus')
                .toggleClass('form-item__content', $(input).val() !== '')
                .toggleClass('form-item__error', validation($(input)));
          });
          // On submit attempt, if a field has value, it needs the content class.
          if ($(input).val() !== '') {
            parent.addClass('form-item__content');
          }
        });
        $('.animated--form-item select').each(function (i, select) {
          const parent = $(select).parent();
          $(select).focus(function () {
            parent.addClass('form-item__focus');
          }).blur(function () {
            parent.removeClass('form-item__focus')
                .toggleClass('form-item__content', $(select).val() !== '')
                .toggleClass('form-item__error', validation($(select)));
          });
          // On submit attempt, if a field has value, it needs the content class.
          if ($(select).val() !== '') {
            parent.addClass('form-item__content');
          }
        });

      }

      errorHandling();
    },

    /**
     * A helper function for updating form region on submit.
     * @param form
     * @param component
     * @param confirmation
     */
    webformConfirmationHandler: function(form, component, confirmation) {

      // On form submit (via ajax), update component layout.
      $(document).once().ajaxComplete(function () {
        if ($(form + ' > div').hasClass(confirmation)) {
          // toggle grid classes.
          $(component).find('.grid__container--items').removeClass('optimized-width').addClass('constrained-width');
          // toggle layout classes
          $(component).find('.component__form').removeClass('component__form--twocol').addClass('component__form--onecol');
          // remove form component copy.
          $(component).find('.component__form--content').remove();
        }
      });

    },

  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBaseGlobalInteractions) {
      Drupal.atgeBaseGlobalInteractions = {};
  }

  Drupal.behaviors.atgeBaseGlobalInteractions = {

    /**
     * Global Interactions
     *
     * Add any js here that needs to load everywhere, but cannot be contained to
     * any set component or page element.
     *
     * @param context
     * @param settings
     */
    // Attach Global Styles here.
    attach: function (context, settings) {

      // Allow editing of table dialog properties.
      if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
        orig_allowInteraction = $.ui.dialog.prototype._allowInteraction;
        $.ui.dialog.prototype._allowInteraction = function (event) {
          if ($(event.target).closest('.cke_dialog').length) {
            return true;
          }
          return orig_allowInteraction.apply(this, arguments);
        };
      }

      // Iterate through each image
      $('img').once().each(function () {

        // Now check to see if images have the object-fit:cover property.
        if (($(this).parents(':eq(2)').hasClass('has-objectfit') &&
            $(this).parents(':eq(2)').attr('class').indexOf('--media') !== -1) ||
            ($(this).parents(':eq(3)').hasClass('has-objectfit') &&
            $(this).parents(':eq(3)').attr('class').indexOf('--media') !== -1) ||
            $(this).parent().hasClass('has-objectfit')) {
          // If yes, then call ieObjectFitFix function.
          Drupal.behaviors.atgeBaseGlobalFunctions.ieObjectFitFix(this);
        }

      });

      var coll = document.getElementsByClassName('collapsible-learn-more');
      var i;
      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
          var content = this.previousElementSibling;
          if ($(content).is(':visible')) {
            $(content).hide(125);
            $(this).find('a').text('Learn More');
          } else {
            $(content).show(125);
            $(this).find('a').text('Show Less');
          }
        });
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, window, document, undefined) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumBaseThemeInteractions) {
      Drupal.rumBaseThemeInteractions = {};
  }

  Drupal.behaviors.rumBaseThemeInteractions = {

    /**
     * Theme Interactions
     *
     * Add any js here that needs to load everywhere, but cannot be contained to
     * any set component or page element.
     *
     * @param context
     * @param settings
     */
    // Attach Theme Styles here.
    attach: function (context, settings) {

      // Allow editing of table dialog properties.
      if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
        orig_allowInteraction = $.ui.dialog.prototype._allowInteraction;
        $.ui.dialog.prototype._allowInteraction = function (event) {
          if ($(event.target).closest('.cke_dialog').length) {
            return true;
          }
          return orig_allowInteraction.apply(this, arguments);
        };
      }

      //add analytics attributes on icon Pinterest
      function gtmAttributes() {
        $('a[data-pin-log="button_pinit"]').attr('data-click-category', 'social');
        $('a[data-pin-log="button_pinit"]').attr('data-click-action', 'share');
        $('a[data-pin-log="button_pinit"]').attr('data-gtm', 'social');
        $('a[data-pin-log="button_pinit"]').attr('data-click-label', 'pinterest');
      }
      $(window).on('load', gtmAttributes);

      $(window).on('load', function() {
        if ($('.image--right-float').length) {
          $('.image--right-float').each(function() {
            let attrStyle = $(this).find('.c-atge-image span').attr('style');
            fixingWidthHeightTemplate(attrStyle, $(this));
          });
        }
        if ($('.image--left-float').length) {
          $('.image--left-float').each(function() {
            let attrStyle = $(this).find('.c-atge-image span').attr('style');
            fixingWidthHeightTemplate(attrStyle, $(this));
          });
        }
      });
      function fixingWidthHeightTemplate(attrStyle, imageFloat) {
        if (attrStyle.split(';').length > 1) {
          let spanImage = imageFloat.find('.c-atge-image span');
          spanImage.attr('style', '');
          $.each(attrStyle.split(';'), function(index, value) {
            let styles = value.split(': ');
            if (styles[0] == 'height') {
              let heighImg = spanImage.height();
              if (styles[1].indexOf('%') != -1) {
                styles[1] = styles[1].replace('%', '');
                spanImage.css('height', (heighImg*(styles[1])/100));
              }
              if (styles[1].indexOf('px') != -1) {
                styles[1] = styles[1].replace('px', '');
                spanImage.css('height', styles[1]);
              }
            } else {
              if (styles[0] == 'width') {
                let widthImg = spanImage.width();
                if (styles[1].indexOf('%') != -1) {
                  styles[1] = styles[1].replace('%', '');
                  spanImage.css('width', (widthImg*(styles[1])/100));
                }
                if (styles[1].indexOf('px') != -1) {
                  styles[1] = styles[1].replace('px', '');
                  spanImage.css('width', styles[1]);
                }
              } 
            }
          });
        }
      }
    }
  };

})(jQuery, Drupal, this, this.document);
;
/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');

      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr,>tr').eq(0);

      // avoid duplication when paginating
      $table.siblings().filter('.small-only').remove();

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr').each(function() {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        $(this).find('>td,>th').each(function(cellIndex) {
          if ($(this).html() !== ''){
            bodyMarkup += '<tr class="' + tr_class +'">';
            if ($topRow.find('>td,>th').eq(cellIndex).html()){
              bodyMarkup += '<td class="st-key">'+$topRow.find('>td,>th').eq(cellIndex).html()+'</td>';
            } else {
              bodyMarkup += '<td class="st-key"></td>';
            }
            bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
            bodyMarkup += '</tr>';
          }
        });

        markup += '<table class=" '+ table_css +' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });

      $table.find('>tfoot>tr>td').each(function(rowIndex,value) {
        if ($.trim($(value).text()) !== '') {
          markup += '<table class="'+ table_css + ' stacktable small-only"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {headIndex:0,displayHeader:true},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="'+ table_css +' stacktable small-only"><tbody></tbody></table>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class, displayHeader;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0);

      displayHeader = $table.data('display-header') === undefined ? settings.displayHeader : $table.data('display-header');

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr, >thead>tr').each(function(rowIndex) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');

        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          if (displayHeader) {
            markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('>th,>td').eq(headIndex).html()+'</th></tr>';
          }
        } else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('>td,>th').each(function(cellIndex) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
            } else {
              if ($(this).html() !== ''){
                bodyMarkup += '<tr class="' + tr_class +'">';
                if ($topRow.find('>td,>th').eq(cellIndex).html()){
                  bodyMarkup += '<td class="st-key">'+$topRow.find('>td,>th').eq(cellIndex).html()+'</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                bodyMarkup += '</tr>';
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      var $caption = $table.find(">caption").clone();
      var num_cols = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0).find('>td,>th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('>thead>tr,>tbody>tr,>tfoot>tr').each(function(index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('>td,>th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('>td,>th').each(function() {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                } else {
                  i++;
                }

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          var second = $(this).find('>td,>th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $stackcolumns.prepend($caption);
      $table.before($stackcolumns);
    });
  };

}(jQuery));
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeRichTextComponentResponsiveTables) {
    Drupal.atgeRichTextComponentResponsiveTables = {};
  }

  Drupal.behaviors.atgeRichTextComponentResponsiveTables = {
    attach: function(context, settings) {

      // Set Vars.
      const tableSelector = '.c-richtext table.component__resp-table';

      // Look for table markup in our rich text editor fields.
      if ($('.c-richtext table')) {
        // if there'a table that doesn't already have the component__resp-table
        // class then add it.
        $('.c-richtext table:not(.component__resp-table)').addClass('component__resp-table');
        // Reset Table Attributes.
        $(tableSelector).removeAttr('border').removeAttr('cellpadding').removeAttr('cellspacing').removeAttr('style');
        $(tableSelector).find('th').removeAttr('style');
        $(tableSelector).find('td').removeAttr('style');
      }


      // Init. Stack table Stack Columns JS
      $(tableSelector).once().stackcolumns({
        // This passes our class to the mobile version.
        myClass: 'component__resp-table'
      });

      // Once the mobile table has rendered, check to see if our Row & Column
      // Header cell (first cell in table) is empty or if it's just a &nbsp;
      if(!$.trim($('.c-richtext .st-head-row-main > .st-key').html()).length || $('.c-richtext .st-head-row-main > .st-key').html() === '&nbsp;') {
        // if it is, remove the empty cell.
        $(tableSelector).find('.st-head-row-main > .st-key').remove();
        // and add a colspan attribute to the remaining cell.
        $(tableSelector).find('.st-head-row-main > .st-val').attr('colspan','2');
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout = void 0;
  var result = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return this[0] && callback ? $.trim(callback(this[0])) : '';
  };

  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    if (typeof callback !== 'function') {
      var val = callback;
      callback = function callback() {
        return val;
      };
    }

    return this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    }).trigger('summaryUpdated');
  };

  Drupal.behaviors.formSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');
        if (previousValues === formValues) {
          e.preventDefault();
        } else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $('body').once('form-single-submit').on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  function fieldsList(form) {
    var $fieldList = $(form).find('[name]').map(function (index, element) {
      return element.getAttribute('id');
    });

    return $.makeArray($fieldList);
  }

  Drupal.behaviors.formUpdated = {
    attach: function attach(context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = (contextIsForm ? $context : $context.find('form')).once('form-updated');
      var formFields = void 0;

      if ($forms.length) {
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) {
            triggerFormUpdated(event.target);
          }, 300);
          formFields = fieldsList(form).join(',');

          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }

      if (contextIsForm) {
        formFields = fieldsList(context).join(',');

        var currentFields = $(context).attr('data-drupal-form-fields');

        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      if (trigger === 'unload') {
        var $forms = (contextIsForm ? $context : $context.find('form')).removeOnce('form-updated');
        if ($forms.length) {
          $.makeArray($forms).forEach(function (form) {
            form.removeAttribute('data-drupal-form-fields');
            $(form).off('.formUpdated');
          });
        }
      }
    }
  };

  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function attach(context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $('[data-user-info-from-browser]').once('user-info-from-browser');
      if ($forms.length) {
        userInfo.forEach(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          var browserData = localStorage.getItem('Drupal.visitor.' + info);
          var emptyOrDefault = $element.val() === '' || $element.attr('data-drupal-default-value') === $element.val();
          if ($element.length && emptyOrDefault && browserData) {
            $element.val(browserData);
          }
        });
      }
      $forms.on('submit', function () {
        userInfo.forEach(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          if ($element.length) {
            localStorage.setItem('Drupal.visitor.' + info, $element.val());
          }
        });
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e) {
    var url = void 0;
    if (e.type === 'click') {
      url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
    } else {
      url = window.location;
    }
    var hash = url.hash.substr(1);
    if (hash) {
      var $target = $('#' + hash);
      $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);

      setTimeout(function () {
        return $target.trigger('focus');
      }, 300);
    }
  };

  var debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);

  $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);

  $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  var states = {
    postponed: []
  };

  Drupal.states = states;

  function invert(a, invertState) {
    return invertState && typeof a !== 'undefined' ? !a : a;
  }

  function _compare2(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }

    return typeof a === 'undefined' || typeof b === 'undefined';
  }

  function ternary(a, b) {
    if (typeof a === 'undefined') {
      return b;
    }
    if (typeof b === 'undefined') {
      return a;
    }

    return a && b;
  }

  Drupal.behaviors.states = {
    attach: function attach(context, settings) {
      var $states = $(context).find('[data-drupal-states]');
      var il = $states.length;

      var _loop = function _loop(i) {
        var config = JSON.parse($states[i].getAttribute('data-drupal-states'));
        Object.keys(config || {}).forEach(function (state) {
          new states.Dependent({
            element: $($states[i]),
            state: states.State.sanitize(state),
            constraints: config[state]
          });
        });
      };

      for (var i = 0; i < il; i++) {
        _loop(i);
      }

      while (states.postponed.length) {
        states.postponed.shift()();
      }
    }
  };

  states.Dependent = function (args) {
    var _this = this;

    $.extend(this, { values: {}, oldValue: null }, args);

    this.dependees = this.getDependees();
    Object.keys(this.dependees || {}).forEach(function (selector) {
      _this.initializeDependee(selector, _this.dependees[selector]);
    });
  };

  states.Dependent.comparisons = {
    RegExp: function RegExp(reference, value) {
      return reference.test(value);
    },
    Function: function Function(reference, value) {
      return reference(value);
    },
    Number: function Number(reference, value) {
      return typeof value === 'string' ? _compare2(reference.toString(), value) : _compare2(reference, value);
    }
  };

  states.Dependent.prototype = {
    initializeDependee: function initializeDependee(selector, dependeeStates) {
      var _this2 = this;

      this.values[selector] = {};

      Object.keys(dependeeStates).forEach(function (i) {
        var state = dependeeStates[i];

        if ($.inArray(state, dependeeStates) === -1) {
          return;
        }

        state = states.State.sanitize(state);

        _this2.values[selector][state.name] = null;

        $(selector).on('state:' + state, { selector: selector, state: state }, function (e) {
          _this2.update(e.data.selector, e.data.state, e.value);
        });

        new states.Trigger({ selector: selector, state: state });
      });
    },
    compare: function compare(reference, selector, state) {
      var value = this.values[selector][state.name];
      if (reference.constructor.name in states.Dependent.comparisons) {
        return states.Dependent.comparisons[reference.constructor.name](reference, value);
      }

      return _compare2(reference, value);
    },
    update: function update(selector, state, value) {
      if (value !== this.values[selector][state.name]) {
        this.values[selector][state.name] = value;
        this.reevaluate();
      }
    },
    reevaluate: function reevaluate() {
      var value = this.verifyConstraints(this.constraints);

      if (value !== this.oldValue) {
        this.oldValue = value;

        value = invert(value, this.state.invert);

        this.element.trigger({
          type: 'state:' + this.state,
          value: value,
          trigger: true
        });
      }
    },
    verifyConstraints: function verifyConstraints(constraints, selector) {
      var result = void 0;
      if ($.isArray(constraints)) {
        var hasXor = $.inArray('xor', constraints) === -1;
        var len = constraints.length;
        for (var i = 0; i < len; i++) {
          if (constraints[i] !== 'xor') {
            var constraint = this.checkConstraints(constraints[i], selector, i);

            if (constraint && (hasXor || result)) {
              return hasXor;
            }
            result = result || constraint;
          }
        }
      } else if ($.isPlainObject(constraints)) {
          for (var n in constraints) {
            if (constraints.hasOwnProperty(n)) {
              result = ternary(result, this.checkConstraints(constraints[n], selector, n));

              if (result === false) {
                return false;
              }
            }
          }
        }
      return result;
    },
    checkConstraints: function checkConstraints(value, selector, state) {
      if (typeof state !== 'string' || /[0-9]/.test(state[0])) {
        state = null;
      } else if (typeof selector === 'undefined') {
        selector = state;
        state = null;
      }

      if (state !== null) {
        state = states.State.sanitize(state);
        return invert(this.compare(value, selector, state), state.invert);
      }

      return this.verifyConstraints(value, selector);
    },
    getDependees: function getDependees() {
      var cache = {};

      var _compare = this.compare;
      this.compare = function (reference, selector, state) {
        (cache[selector] || (cache[selector] = [])).push(state.name);
      };

      this.verifyConstraints(this.constraints);

      this.compare = _compare;

      return cache;
    }
  };

  states.Trigger = function (args) {
    $.extend(this, args);

    if (this.state in states.Trigger.states) {
      this.element = $(this.selector);

      if (!this.element.data('trigger:' + this.state)) {
        this.initialize();
      }
    }
  };

  states.Trigger.prototype = {
    initialize: function initialize() {
      var _this3 = this;

      var trigger = states.Trigger.states[this.state];

      if (typeof trigger === 'function') {
        trigger.call(window, this.element);
      } else {
        Object.keys(trigger || {}).forEach(function (event) {
          _this3.defaultTrigger(event, trigger[event]);
        });
      }

      this.element.data('trigger:' + this.state, true);
    },
    defaultTrigger: function defaultTrigger(event, valueFn) {
      var oldValue = valueFn.call(this.element);

      this.element.on(event, $.proxy(function (e) {
        var value = valueFn.call(this.element, e);

        if (oldValue !== value) {
          this.element.trigger({
            type: 'state:' + this.state,
            value: value,
            oldValue: oldValue
          });
          oldValue = value;
        }
      }, this));

      states.postponed.push($.proxy(function () {
        this.element.trigger({
          type: 'state:' + this.state,
          value: oldValue,
          oldValue: null
        });
      }, this));
    }
  };

  states.Trigger.states = {
    empty: {
      keyup: function keyup() {
        return this.val() === '';
      }
    },

    checked: {
      change: function change() {
        var checked = false;
        this.each(function () {
          checked = $(this).prop('checked');

          return !checked;
        });
        return checked;
      }
    },

    value: {
      keyup: function keyup() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }
        return this.val();
      },
      change: function change() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }
        return this.val();
      }
    },

    collapsed: {
      collapsed: function collapsed(e) {
        return typeof e !== 'undefined' && 'value' in e ? e.value : !this.is('[open]');
      }
    }
  };

  states.State = function (state) {
    this.pristine = state;
    this.name = state;

    var process = true;
    do {
      while (this.name.charAt(0) === '!') {
        this.name = this.name.substring(1);
        this.invert = !this.invert;
      }

      if (this.name in states.State.aliases) {
        this.name = states.State.aliases[this.name];
      } else {
        process = false;
      }
    } while (process);
  };

  states.State.sanitize = function (state) {
    if (state instanceof states.State) {
      return state;
    }

    return new states.State(state);
  };

  states.State.aliases = {
    enabled: '!disabled',
    invisible: '!visible',
    invalid: '!valid',
    untouched: '!touched',
    optional: '!required',
    filled: '!empty',
    unchecked: '!checked',
    irrelevant: '!relevant',
    expanded: '!collapsed',
    open: '!collapsed',
    closed: 'collapsed',
    readwrite: '!readonly'
  };

  states.State.prototype = {
    invert: false,

    toString: function toString() {
      return this.name;
    }
  };

  var $document = $(document);
  $document.on('state:disabled', function (e) {
    if (e.trigger) {
      $(e.target).prop('disabled', e.value).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value).find('select, input, textarea').prop('disabled', e.value);
    }
  });

  $document.on('state:required', function (e) {
    if (e.trigger) {
      if (e.value) {
        var label = 'label' + (e.target.id ? '[for=' + e.target.id + ']' : '');
        var $label = $(e.target).attr({ required: 'required', 'aria-required': 'true' }).closest('.js-form-item, .js-form-wrapper').find(label);

        if (!$label.hasClass('js-form-required').length) {
          $label.addClass('js-form-required form-required');
        }
      } else {
        $(e.target).removeAttr('required aria-required').closest('.js-form-item, .js-form-wrapper').find('label.js-form-required').removeClass('js-form-required form-required');
      }
    }
  });

  $document.on('state:visible', function (e) {
    if (e.trigger) {
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggle(e.value);
    }
  });

  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).prop('checked', e.value);
    }
  });

  $document.on('state:collapsed', function (e) {
    if (e.trigger) {
      if ($(e.target).is('[open]') === e.value) {
        $(e.target).find('> summary').trigger('click');
      }
    }
  });
})(jQuery, Drupal);;
/**
 * @file
 * JavaScript behaviors for custom webform #states.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.webform = Drupal.webform || {};
  Drupal.webform.states = Drupal.webform.states || {};
  Drupal.webform.states.slideDown = Drupal.webform.states.slideDown || {};
  Drupal.webform.states.slideDown.duration = 'slow';
  Drupal.webform.states.slideUp = Drupal.webform.states.slideUp || {};
  Drupal.webform.states.slideUp.duration = 'fast';

  /* ************************************************************************ */
  // jQuery functions.
  /* ************************************************************************ */

  /**
   * Check if an element has a specified data attribute.
   *
   * @param {string} data
   *   The data attribute name.
   *
   * @return {boolean}
   *   TRUE if an element has a specified data attribute.
   */
  $.fn.hasData = function (data) {
    return (typeof this.data(data) !== 'undefined');
  };

  /**
   * Check if element is within the webform or not.
   *
   * @return {boolean}
   *   TRUE if element is within the webform.
   */
  $.fn.isWebform = function () {
    return $(this).closest('form[id^="webform"], form[data-is-webform]').length ? true : false;
  };

  /**
   * Check if element is to be treated as a webform element.
   *
   * @return {boolean}
   *   TRUE if element is to be treated as a webform element.
   */
  $.fn.isWebformElement = function () {
    return ($(this).isWebform() || $(this).closest('[data-is-webform-element]').length) ? true : false;
  };

  /* ************************************************************************ */
  // Trigger.
  /* ************************************************************************ */

  // The change event is triggered by cut-n-paste and select menus.
  // Issue #2445271: #states element empty check not triggered on mouse
  // based paste.
  // @see https://www.drupal.org/node/2445271
  Drupal.states.Trigger.states.empty.change = function change() {
    return this.val() === '';
  };

  /* ************************************************************************ */
  // Dependents.
  /* ************************************************************************ */


  // Apply solution included in #1962800 patch.
  // Issue #1962800: Form #states not working with literal integers as
  // values in IE11.
  // @see https://www.drupal.org/project/drupal/issues/1962800
  // @see https://www.drupal.org/files/issues/core-states-not-working-with-integers-ie11_1962800_46.patch
  //
  // This issue causes pattern, less than, and greater than support to break.
  // @see https://www.drupal.org/project/webform/issues/2981724
  var states = Drupal.states;
  Drupal.states.Dependent.prototype.compare = function compare(reference, selector, state) {
    var value = this.values[selector][state.name];

    var name = reference.constructor.name;
    if (!name) {
      name = $.type(reference);

      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (name in states.Dependent.comparisons) {
      return states.Dependent.comparisons[name](reference, value);
    }

    if (reference.constructor.name in states.Dependent.comparisons) {
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }

    return _compare2(reference, value);
  };
  function _compare2(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }

    return typeof a === 'undefined' || typeof b === 'undefined';
  }

  // Adds pattern, less than, and greater than support to #state API.
  // @see http://drupalsun.com/julia-evans/2012/03/09/extending-form-api-states-regular-expressions
  Drupal.states.Dependent.comparisons.Object = function (reference, value) {
    if ('pattern' in reference) {
      return (new RegExp(reference['pattern'])).test(value);
    }
    else if ('!pattern' in reference) {
      return !((new RegExp(reference['!pattern'])).test(value));
    }
    else if ('less' in reference) {
      return (value !== '' && parseFloat(reference['less']) > parseFloat(value));
    }
    else if ('less_equal' in reference) {
      return (value !== '' && parseFloat(reference['less_equal']) >= parseFloat(value));
    }
    else if ('greater' in reference) {
      return (value !== '' && parseFloat(reference['greater']) < parseFloat(value));
    }
    else if ('greater_equal' in reference) {
      return (value !== '' && parseFloat(reference['greater_equal']) <= parseFloat(value));
    }
    else if ('between' in reference || '!between' in reference) {
      if (value === '') {
        return false;
      }

      var between = reference['between'] || reference['!between'];
      var betweenParts = between.split(':');
      var greater = betweenParts[0];
      var less = (typeof betweenParts[1] !== 'undefined') ? betweenParts[1] : null;
      var isGreaterThan = (greater === null || greater === '' || parseFloat(value) >= parseFloat(greater));
      var isLessThan = (less === null || less === '' || parseFloat(value) <= parseFloat(less));
      var result = (isGreaterThan && isLessThan);
      return (reference['!between']) ? !result : result;
    }
    else {
      return reference.indexOf(value) !== false;
    }
  };

  /* ************************************************************************ */
  // States events.
  /* ************************************************************************ */

  var $document = $(document);

  $document.on('state:required', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      var $target = $(e.target);
      // Fix #required file upload.
      // @see Issue #2860529: Conditional required File upload field don't work.
      toggleRequired($target.find('input[type="file"]'), e.value);

      // Fix #required for radios.
      // @see Issue #2856795: If radio buttons are required but not filled form is nevertheless submitted.
      if ($target.is('.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other')) {
        toggleRequired($target.find('input[type="radio"]'), e.value);
      }

      // Fix #required for checkboxes.
      // @see Issue #2938414: Checkboxes don't support #states required.
      // @see checkboxRequiredhandler
      if ($target.is('.js-form-type-checkboxes, .js-form-type-webform-checkboxes-other, .js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other')) {
        var $checkboxes = $target.find('input[type="checkbox"]');
        if (e.value) {
          // Add event handler.
          $checkboxes.on('click', statesCheckboxesRequiredEventHandler);
          // Initialize and add required attribute.
          checkboxesRequired($target);
        }
        else {
          // Remove event handler.
          $checkboxes.off('click', statesCheckboxesRequiredEventHandler);
          // Remove required attribute.
          toggleRequired($checkboxes, false);
        }
      }

      // Fix required label for elements without the for attribute.
      // @see Issue #3145300: Conditional Visible Select Other not working.
      if ($target.is('.js-form-type-webform-select-other, .js-webform-type-webform-select-other')) {
        var $select = $target.find('select');
        toggleRequired($select, e.value);
        copyRequireMessage($target, $select);
      }
      if ($target.find('> label:not([for])').length) {
        $target.find('> label').toggleClass('js-form-required form-required', e.value);
      }

      // Fix required label for checkboxes and radios.
      // @see Issue #2938414: Checkboxes don't support #states required
      // @see Issue #2731991: Setting required on radios marks all options required.
      // @see Issue #2856315: Conditional Logic - Requiring Radios in a Fieldset.
      // Fix #required for fieldsets.
      // @see Issue #2977569: Hidden fieldsets that become visible with conditional logic cannot be made required.
      if ($target.is('.js-webform-type-radios, .js-webform-type-checkboxes, fieldset')) {
        $target.find('legend span.fieldset-legend:not(.visually-hidden)').toggleClass('js-form-required form-required', e.value);
      }

      // Issue #2986017: Fieldsets shouldn't have required attribute.
      if ($target.is('fieldset')) {
        $target.removeAttr('required aria-required');
      }
    }
  });

  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).change();
    }
  });

  $document.on('state:readonly', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      $(e.target).prop('readonly', e.value).closest('.js-form-item, .js-form-wrapper').toggleClass('webform-readonly', e.value).find('input, textarea').prop('readonly', e.value);

      // Trigger webform:readonly.
      $(e.target).trigger('webform:readonly')
        .find('select, input, textarea, button').trigger('webform:readonly');
    }
  });

  $document.on('state:visible state:visible-slide', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      if (e.value) {
        $(':input', e.target).addBack().each(function () {
          restoreValueAndRequired(this);
          triggerEventHandlers(this);
        });
      }
      else {
        // @see https://www.sitepoint.com/jquery-function-clear-form-data/
        $(':input', e.target).addBack().each(function () {
          backupValueAndRequired(this);
          clearValueAndRequired(this);
          triggerEventHandlers(this);
        });
      }
    }
  });

  $document.on('state:visible-slide', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      var effect = e.value ? 'slideDown' : 'slideUp';
      var duration = Drupal.webform.states[effect].duration;
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper')[effect](duration);
    }
  });
  Drupal.states.State.aliases['invisible-slide'] = '!visible-slide';

  $document.on('state:disabled', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      // Make sure disabled property is set before triggering webform:disabled.
      // Copied from: core/misc/states.js
      $(e.target)
        .prop('disabled', e.value)
        .closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea, button').prop('disabled', e.value);

      // Never disable hidden file[fids] because the existing values will
      // be completely lost when the webform is submitted.
      var fileElements = $(e.target)
        .find(':input[type="hidden"][name$="[fids]"]');
      if (fileElements.length) {
        // Remove 'disabled' attribute from fieldset which will block
        // all disabled elements from being submitted.
        if ($(e.target).is('fieldset')) {
          $(e.target).prop('disabled', false);
        }
        fileElements.removeAttr('disabled');
      }

      // Trigger webform:disabled.
      $(e.target).trigger('webform:disabled')
        .find('select, input, textarea, button').trigger('webform:disabled');
    }
  });

  /* ************************************************************************ */
  // Behaviors.
  /* ************************************************************************ */

  /**
   * Adds HTML5 validation to required checkboxes.
   *
   * @type {Drupal~behavior}
   *
   * @see https://www.drupal.org/project/webform/issues/3068998
   */
  Drupal.behaviors.webformCheckboxesRequired = {
    attach: function (context) {
      $('.js-form-type-checkboxes.required, .js-form-type-webform-checkboxes-other.required, .js-webform-type-checkboxes.required, .js-webform-type-webform-checkboxes-other.required, .js-webform-type-webform-radios-other.checkboxes', context)
        .once('webform-checkboxes-required')
        .each(function () {
          var $element = $(this);
          $element.find('input[type="checkbox"]').on('click', statesCheckboxesRequiredEventHandler);
          setTimeout(function () {checkboxesRequired($element);});
        });
    }
  };

  /**
   * Adds HTML5 validation to required radios.
   *
   * @type {Drupal~behavior}
   *
   * @see https://www.drupal.org/project/webform/issues/2856795
   */
  Drupal.behaviors.webformRadiosRequired = {
    attach: function (context) {
      $('.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other', context)
        .once('webform-radios-required')
        .each(function () {
          var $element = $(this);
          setTimeout(function () {radiosRequired($(this))});
        });
    }
  };

  /**
   * Add HTML5 multiple checkboxes required validation.
   *
   * @param {jQuery} $element
   *   An jQuery object containing HTML5 radios.
   *
   * @see https://stackoverflow.com/a/37825072/145846
   */
  function checkboxesRequired($element) {
    var $firstCheckbox = $element.find('input[type="checkbox"]').first();
    var isChecked = $element.find('input[type="checkbox"]').is(':checked');
    toggleRequired($firstCheckbox, !isChecked);
    copyRequireMessage($element, $firstCheckbox);
  }

  /**
   * Add HTML5 radios required validation.
   *
   * @param {jQuery} $element
   *   An jQuery object containing HTML5 radios.
   *
   * @see https://www.drupal.org/project/webform/issues/2856795
   */
  function radiosRequired($element) {
    var $radios = $element.find('input[type="radio"]');
    var isRequired = $element.hasClass('required');
    toggleRequired($radios, isRequired);
    copyRequireMessage($element, $radios);
  }

  /* ************************************************************************ */
  // Event handlers.
  /* ************************************************************************ */

  /**
   * Trigger #states API HTML5 multiple checkboxes required validation.
   *
   * @see https://stackoverflow.com/a/37825072/145846
   */
  function statesCheckboxesRequiredEventHandler() {
    var $element = $(this).closest('.js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other');
    checkboxesRequired($element);
  }

  /**
   * Trigger an input's event handlers.
   *
   * @param {element} input
   *   An input.
   */
  function triggerEventHandlers(input) {
    var $input = $(input);
    var type = input.type;
    var tag = input.tagName.toLowerCase();
    // Add 'webform.states' as extra parameter to event handlers.
    // @see Drupal.behaviors.webformUnsaved
    var extraParameters = ['webform.states'];
    if (type === 'checkbox' || type === 'radio') {
      $input
        .trigger('change', extraParameters)
        .trigger('blur', extraParameters);
    }
    else if (tag === 'select') {
      $input
        .trigger('change', extraParameters)
        .trigger('blur', extraParameters);
    }
    else if (type !== 'submit' && type !== 'button' && type !== 'file') {
      $input
        .trigger('input', extraParameters)
        .trigger('change', extraParameters)
        .trigger('keydown', extraParameters)
        .trigger('keyup', extraParameters)
        .trigger('blur', extraParameters);

      // Make sure input mask is reset when value is restored.
      // @see https://www.drupal.org/project/webform/issues/3124155
      if ($input.attr('data-inputmask-mask')) {
        setTimeout(function () {$input.inputmask('remove').inputmask();});
      }
    }
  }

  /* ************************************************************************ */
  // Backup and restore value functions.
  /* ************************************************************************ */

  /**
   * Backup an input's current value and required attribute
   *
   * @param {element} input
   *   An input.
   */
  function backupValueAndRequired(input) {
    var $input = $(input);
    var type = input.type;
    var tag = input.tagName.toLowerCase(); // Normalize case.

    // Backup required.
    if ($input.prop('required') && !$input.hasData('webform-required')) {
      $input.data('webform-required', true);
    }

    // Backup value.
    if (!$input.hasData('webform-value')) {
      if (type === 'checkbox' || type === 'radio') {
        $input.data('webform-value', $input.prop('checked'));
      }
      else if (tag === 'select') {
        var values = [];
        $input.find('option:selected').each(function (i, option) {
          values[i] = option.value;
        });
        $input.data('webform-value', values);
      }
      else if (type !== 'submit' && type !== 'button') {
        $input.data('webform-value', input.value);
      }
    }
  }

  /**
   * Restore an input's value and required attribute.
   *
   * @param {element} input
   *   An input.
   */
  function restoreValueAndRequired(input) {
    var $input = $(input);

    // Restore value.
    var value = $input.data('webform-value');
    if (typeof value !== 'undefined') {
      var type = input.type;
      var tag = input.tagName.toLowerCase(); // Normalize case.

      if (type === 'checkbox' || type === 'radio') {
        $input.prop('checked', value);
      }
      else if (tag === 'select') {
        $.each(value, function (i, option_value) {
          $input.find("option[value='" + option_value + "']").prop('selected', true);
        });
      }
      else if (type !== 'submit' && type !== 'button') {
        input.value = value;
      }
      $input.removeData('webform-value');
    }

    // Restore required.
    var required = $input.data('webform-required');
    if (typeof required !== 'undefined') {
      if (required) {
        $input.prop('required', true);
      }
      $input.removeData('webform-required');
    }
  }

  /**
   * Clear an input's value and required attributes.
   *
   * @param {element} input
   *   An input.
   */
  function clearValueAndRequired(input) {
    var $input = $(input);

    // Check for #states no clear attribute.
    // @see https://css-tricks.com/snippets/jquery/make-an-jquery-hasattr/
    if ($input.closest('[data-webform-states-no-clear]').length) {
      return;
    }

    // Clear value.
    var type = input.type;
    var tag = input.tagName.toLowerCase(); // Normalize case.
    if (type === 'checkbox' || type === 'radio') {
      $input.prop('checked', false);
    }
    else if (tag === 'select') {
      if ($input.find('option[value=""]').length) {
        $input.val('');
      }
      else {
        input.selectedIndex = -1;
      }
    }
    else if (type !== 'submit' && type !== 'button') {
      input.value = (type === 'color') ? '#000000' : '';
    }

    // Clear required.
    $input.prop('required', false);
  }

  /* ************************************************************************ */
  // Helper functions.
  /* ************************************************************************ */

  /**
   * Toggle an input's required attributes.
   *
   * @param {element} $input
   *   An input.
   * @param {boolean} required
   */
  function toggleRequired($input, required) {
    if (required) {
      $input.attr({'required': 'required', 'aria-required': 'true'});
    }
    else {
      $input.removeAttr('required aria-required');
    }
  }

  /**
   * Copy the clientside_validation.module's message.
   *
   * @param {jQuery} $source
   *   The source element.
   * @param {jQuery} $destination
   *   The destination element.
   */
  function copyRequireMessage($source, $destination) {
    if ($source.attr('data-msg-required')) {
      $destination.attr('data-msg-required', $source.attr('data-msg-required'));
    }
  }

})(jQuery, Drupal);
;
/**
 * @file
 * JavaScript behaviors for webforms.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Remove single submit event listener.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for removing single submit event listener.
   *
   * @see Drupal.behaviors.formSingleSubmit
   */
  Drupal.behaviors.webformRemoveFormSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        $form.removeAttr('data-drupal-form-submit-last');
      }
      $('body')
        .once('webform-single-submit')
        .on('submit.singleSubmit', 'form.webform-remove-single-submit', onFormSubmit);
    }
  };

  /**
   * Prevent webform autosubmit on wizard pages.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for disabling webform autosubmit.
   *   Wizard pages need to be progressed with the Previous or Next buttons,
   *   not by pressing Enter.
   */
  Drupal.behaviors.webformDisableAutoSubmit = {
    attach: function (context) {
      // Not using context so that inputs loaded via Ajax will have autosubmit
      // disabled.
      // @see http://stackoverflow.com/questions/11235622/jquery-disable-form-submit-on-enter
      $('.js-webform-disable-autosubmit input')
        .not(':button, :submit, :reset, :image, :file')
        .once('webform-disable-autosubmit')
        .on('keyup keypress', function (e) {
          if (e.which === 13) {
            e.preventDefault();
            return false;
          }
        });
    }
  };

  /**
   * Skip client-side validation when submit button is pressed.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for the skipping client-side validation.
   *
   * @deprecated in Webform 8.x-5.x and will be removed in Webform 8.x-6.x.
   *   Use 'formnovalidate' attribute instead.
   */
  Drupal.behaviors.webformSubmitNoValidate = {
    attach: function (context) {
      $(context).find(':submit.js-webform-novalidate')
        .once('webform-novalidate')
        .attr('formnovalidate', 'formnovalidate');
    }
  };

  /**
   * Custom required and pattern validation error messages.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for the webform custom required and pattern
   *   validation error messages.
   *
   * @see http://stackoverflow.com/questions/5272433/html5-form-required-attribute-set-custom-validation-message
   **/
  Drupal.behaviors.webformRequiredError = {
    attach: function (context) {
      $(context).find(':input[data-webform-required-error], :input[data-webform-pattern-error]').once('webform-required-error')
        .on('invalid', function () {
          this.setCustomValidity('');
          if (this.valid) {
            return;
          }

          if (this.validity.patternMismatch && $(this).attr('data-webform-pattern-error')) {
            this.setCustomValidity($(this).attr('data-webform-pattern-error'));
          }
          else if (this.validity.valueMissing && $(this).attr('data-webform-required-error')) {
            this.setCustomValidity($(this).attr('data-webform-required-error'));
          }
        })
        .on('input change', function () {
          // Find all related elements by name and reset custom validity.
          // This specifically applies to required radios and checkboxes.
          var name = $(this).attr('name');
          $(this.form).find(':input[name="' + name + '"]').each(function () {
            this.setCustomValidity('');
          });
        });
    }
  };

  // When #state:required is triggered we need to reset the target elements
  // custom validity.
  $(document).on('state:required', function (e) {
    $(e.target).filter('[data-webform-required-error]')
      .each(function () {this.setCustomValidity('');});
  });

})(jQuery, Drupal);
;
/**
 * @file
 * JavaScript behaviors for details element.
 */

(function ($, Drupal) {

  'use strict';

  // Determine if local storage exists and is enabled.
  // This approach is copied from Modernizr.
  // @see https://github.com/Modernizr/Modernizr/blob/c56fb8b09515f629806ca44742932902ac145302/modernizr.js#L696-731
  var hasLocalStorage = (function () {
    try {
      localStorage.setItem('webform', 'webform');
      localStorage.removeItem('webform');
      return true;
    }
    catch (e) {
      return false;
    }
  }());

  /**
   * Attach handler to save details open/close state.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformDetailsSave = {
    attach: function (context) {
      if (!hasLocalStorage) {
        return;
      }

      // Summary click event handler.
      $('details > summary', context).once('webform-details-summary-save').click(function () {
        var $details = $(this).parent();


        // @see https://css-tricks.com/snippets/jquery/make-an-jquery-hasattr/
        if ($details[0].hasAttribute('data-webform-details-nosave')) {
          return;
        }

        var name = Drupal.webformDetailsSaveGetName($details);
        if (!name) {
          return;
        }

        var open = ($details.attr('open') !== 'open') ? '1' : '0';
        localStorage.setItem(name, open);
      });

      // Initialize details open state via local storage.
      $('details', context).once('webform-details-save').each(function () {
        var $details = $(this);

        var name = Drupal.webformDetailsSaveGetName($details);
        if (!name) {
          return;
        }

        var open = localStorage.getItem(name);
        if (open === null) {
          return;
        }

        if (open === '1') {
          $details.attr('open', 'open');
        }
        else {
          $details.removeAttr('open');
        }
      });
    }

  };

  /**
   * Get the name used to store the state of details element.
   *
   * @param {jQuery} $details
   *   A details element.
   *
   * @return {string}
   *   The name used to store the state of details element.
   */
  Drupal.webformDetailsSaveGetName = function ($details) {
    if (!hasLocalStorage) {
      return '';
    }

    // Any details element not included a webform must have define its own id.
    var webformId = $details.attr('data-webform-element-id');
    if (webformId) {
      return 'Drupal.webform.' + webformId.replace('--', '.');
    }

    var detailsId = $details.attr('id');
    if (!detailsId) {
      return '';
    }

    var $form = $details.parents('form');
    if (!$form.length || !$form.attr('id')) {
      return '';
    }

    var formId = $form.attr('id');
    if (!formId) {
      return '';
    }

    // ISSUE: When Drupal renders a webform in a modal dialog it appends a unique
    // identifier to webform ids and details ids. (i.e. my-form--FeSFISegTUI)
    // WORKAROUND: Remove the unique id that delimited using double dashes.
    formId = formId.replace(/--.+?$/, '').replace(/-/g, '_');
    detailsId = detailsId.replace(/--.+?$/, '').replace(/-/g, '_');
    return 'Drupal.webform.' + formId + '.' + detailsId;
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, debounce) {
  var liveElement = void 0;
  var announcements = [];

  Drupal.behaviors.drupalAnnounce = {
    attach: function attach(context) {
      if (!liveElement) {
        liveElement = document.createElement('div');
        liveElement.id = 'drupal-live-announce';
        liveElement.className = 'visually-hidden';
        liveElement.setAttribute('aria-live', 'polite');
        liveElement.setAttribute('aria-busy', 'false');
        document.body.appendChild(liveElement);
      }
    }
  };

  function announce() {
    var text = [];
    var priority = 'polite';
    var announcement = void 0;

    var il = announcements.length;
    for (var i = 0; i < il; i++) {
      announcement = announcements.pop();
      text.unshift(announcement.text);

      if (announcement.priority === 'assertive') {
        priority = 'assertive';
      }
    }

    if (text.length) {
      liveElement.innerHTML = '';

      liveElement.setAttribute('aria-busy', 'true');

      liveElement.setAttribute('aria-live', priority);

      liveElement.innerHTML = text.join('\n');

      liveElement.setAttribute('aria-busy', 'false');
    }
  }

  Drupal.announce = function (text, priority) {
    announcements.push({
      text: text,
      priority: priority
    });

    return debounce(announce, 200)();
  };
})(Drupal, Drupal.debounce);;
/**
 * @file
 * JavaScript behaviors for details element.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.webform = Drupal.webform || {};
  Drupal.webform.detailsToggle = Drupal.webform.detailsToggle || {};
  Drupal.webform.detailsToggle.options = Drupal.webform.detailsToggle.options || {};

  /**
   * Attach handler to toggle details open/close state.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformDetailsToggle = {
    attach: function (context) {
      $('.js-webform-details-toggle', context).once('webform-details-toggle').each(function () {
        var $form = $(this);
        var $tabs = $form.find('.webform-tabs');

        // Get only the main details elements and ignore all nested details.
        var selector = ($tabs.length) ? '.webform-tab' : '.js-webform-details-toggle, .webform-elements';
        var $details = $form.find('details').filter(function () {
          var $parents = $(this).parentsUntil(selector);
          return ($parents.find('details').length === 0);
        });

        // Toggle is only useful when there are two or more details elements.
        if ($details.length < 2) {
          return;
        }

        var options = $.extend({
          button: '<button type="button" class="webform-details-toggle-state"></button>'
        }, Drupal.webform.detailsToggle.options);

        // Create toggle buttons.
        var $toggle = $(options.button)
          .attr('title', Drupal.t('Toggle details widget state.'))
          .on('click', function (e) {
            var open;
            if (Drupal.webform.detailsToggle.isFormDetailsOpen($form)) {
              $form.find('details').removeAttr('open');
              open = 0;
            }
            else {
              $form.find('details').attr('open', 'open');
              open = 1;
            }
            Drupal.webform.detailsToggle.setDetailsToggleLabel($form);

            // Set the saved states for all the details elements.
            // @see webform.element.details.save.js
            if (Drupal.webformDetailsSaveGetName) {
              $form.find('details').each(function () {
                // Note: Drupal.webformDetailsSaveGetName checks if localStorage
                // exists and is enabled.
                // @see webform.element.details.save.js
                var name = Drupal.webformDetailsSaveGetName($(this));
                if (name) {
                  localStorage.setItem(name, open);
                }
              });
            }
          })
          .wrap('<div class="webform-details-toggle-state-wrapper"></div>')
          .parent();

        if ($tabs.length) {
          // Add toggle state before the tabs.
          $tabs.find('.item-list:first-child').eq(0).before($toggle);
        }
        else {
          // Add toggle state link to first details element.
          $details.eq(0).before($toggle);
        }

        Drupal.webform.detailsToggle.setDetailsToggleLabel($form);
      });
    }
  };

  /**
   * Determine if a webform's details are all opened.
   *
   * @param {jQuery} $form
   *   A webform.
   *
   * @return {boolean}
   *   TRUE if a webform's details are all opened.
   */
  Drupal.webform.detailsToggle.isFormDetailsOpen = function ($form) {
    return ($form.find('details[open]').length === $form.find('details').length);
  };

  /**
   * Set a webform's details toggle state widget label.
   *
   * @param {jQuery} $form
   *   A webform.
   */
  Drupal.webform.detailsToggle.setDetailsToggleLabel = function ($form) {
    var isOpen = Drupal.webform.detailsToggle.isFormDetailsOpen($form);

    var label = (isOpen) ? Drupal.t('Collapse all') : Drupal.t('Expand all');
    $form.find('.webform-details-toggle-state').html(label);

    var text = (isOpen) ? Drupal.t('All details have been expanded.') : Drupal.t('All details have been collapsed.');
    Drupal.announce(text);
  };

})(jQuery, Drupal);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.ExternalLinks) {
    Drupal.ExternalLinks = {};
  }

  Drupal.behaviors.sourceCodeOverrides = {
    attach: function (context, settings) {
      var defaultSourceCodes = drupalSettings.atgeSourceCodes.sourceCodes;
      var defaultSourceCode = defaultSourceCodes['default'];
      var mobileDefault = defaultSourceCodes['mobile-default'];
      var mobileBreakpoint = 768;

      // if there is a mobile default and we are within mobile limits
      if (window.innerWidth < mobileBreakpoint && mobileDefault) {
        // mobile source code should only overwrite the default source code
        if ($('[name=source_code]').val() === defaultSourceCode) {
          $('[name=source_code]').val(mobileDefault);
        }
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
// jQuery Mask Plugin v1.14.16
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,n,f){a instanceof String&&(a=String(a));for(var p=a.length,k=0;k<p;k++){var b=a[k];if(n.call(f,b,k,a))return{i:k,v:b}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,n,f){a!=Array.prototype&&a!=Object.prototype&&(a[n]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,n,f,p){if(n){f=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var k=a[p];k in f||(f[k]={});f=f[k]}a=a[a.length-1];p=f[a];n=n(p);n!=p&&null!=n&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:n})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,f){return $jscomp.findInternal(this,a,f).v}},"es6","es3");
(function(a,n,f){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports&&"undefined"===typeof Meteor?module.exports=a(require("jquery")):a(n||f)})(function(a){var n=function(b,d,e){var c={invalid:[],getCaret:function(){try{var a=0,r=b.get(0),h=document.selection,d=r.selectionStart;if(h&&-1===navigator.appVersion.indexOf("MSIE 10")){var e=h.createRange();e.moveStart("character",-c.val().length);a=e.text.length}else if(d||"0"===d)a=d;return a}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c=
b.get(0);if(c.setSelectionRange)c.setSelectionRange(a,a);else{var g=c.createTextRange();g.collapse(!0);g.moveEnd("character",a);g.moveStart("character",a);g.select()}}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){f===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){f=c.val()}).on("focus.mask",function(b){!0===e.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!k.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,e,t,f=0;f<d.length;f++)(b=l.translation[d.charAt(f)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),e=b.optional,
(b=b.recursive)?(a.push(d.charAt(f)),t={digit:d.charAt(f),pattern:c}):a.push(e||b?c+"?":c)):a.push(d.charAt(f).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");t&&(a=a.replace(new RegExp("("+t.digit+"(.*"+t.digit+")?)"),"($1)?").replace(new RegExp(t.digit,"g"),t.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
c=b}else c=b[c]();return c},calculateCaretPosition:function(a){var d=c.getMasked(),h=c.getCaret();if(a!==d){var e=b.data("mask-previus-caret-pos")||0;d=d.length;var g=a.length,f=a=0,l=0,k=0,m;for(m=h;m<d&&c.maskDigitPosMap[m];m++)f++;for(m=h-1;0<=m&&c.maskDigitPosMap[m];m--)a++;for(m=h-1;0<=m;m--)c.maskDigitPosMap[m]&&l++;for(m=e-1;0<=m;m--)c.maskDigitPosMapOld[m]&&k++;h>g?h=10*d:e>=h&&e!==g?c.maskDigitPosMapOld[h]||(e=h,h=h-(k-l)-a,c.maskDigitPosMap[h]&&(h=e)):h>e&&(h=h+(l-k)+f)}return h},behaviour:function(d){d=
d||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,l.byPassKeys)){e=c.getMasked();var h=c.getCaret(),g=b.data("mask-previus-value")||"";setTimeout(function(){c.setCaret(c.calculateCaretPosition(g))},a.jMaskGlobals.keyStrokeCompensation);c.val(e);c.setCaret(h);return c.callbacks(d)}},getMasked:function(a,b){var h=[],f=void 0===b?c.val():b+"",g=0,k=d.length,n=0,p=f.length,m=1,r="push",u=-1,w=0;b=[];if(e.reverse){r="unshift";m=-1;var x=0;g=k-1;n=p-1;var A=function(){return-1<
g&&-1<n}}else x=k-1,A=function(){return g<k&&n<p};for(var z;A();){var y=d.charAt(g),v=f.charAt(n),q=l.translation[y];if(q)v.match(q.pattern)?(h[r](v),q.recursive&&(-1===u?u=g:g===x&&g!==u&&(g=u-m),x===u&&(g-=m)),g+=m):v===z?(w--,z=void 0):q.optional?(g+=m,n-=m):q.fallback?(h[r](q.fallback),g+=m,n-=m):c.invalid.push({p:n,v:v,e:q.pattern}),n+=m;else{if(!a)h[r](y);v===y?(b.push(n),n+=m):(z=y,b.push(n+w),w++);g+=m}}a=d.charAt(x);k!==p+1||l.translation[a]||h.push(a);h=h.join("");c.mapMaskdigitPositions(h,
b,p);return h},mapMaskdigitPositions:function(a,b,d){a=e.reverse?a.length-d:0;c.maskDigitPosMap={};for(d=0;d<b.length;d++)c.maskDigitPosMap[b[d]+a]=1},callbacks:function(a){var g=c.val(),h=g!==f,k=[g,a,b,e],l=function(a,b,c){"function"===typeof e[a]&&b&&e[a].apply(this,c)};l("onChange",!0===h,k);l("onKeyPress",!0===h,k);l("onComplete",g.length===d.length,k);l("onInvalid",0<c.invalid.length,[g,a,b,c.invalid,e])}};b=a(b);var l=this,f=c.val(),k;d="function"===typeof d?d(c.val(),void 0,b,e):d;l.mask=
d;l.options=e;l.remove=function(){var a=c.getCaret();l.options.placeholder&&b.removeAttr("placeholder");b.data("mask-maxlength")&&b.removeAttr("maxlength");c.destroyEvents();c.val(l.getCleanVal());c.setCaret(a);return b};l.getCleanVal=function(){return c.getMasked(!0)};l.getMaskedVal=function(a){return c.getMasked(!1,a)};l.init=function(g){g=g||!1;e=e||{};l.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;l.byPassKeys=a.jMaskGlobals.byPassKeys;l.translation=a.extend({},a.jMaskGlobals.translation,e.translation);
l=a.extend(!0,{},l,e);k=c.getRegexMask();if(g)c.events(),c.val(c.getMasked());else{e.placeholder&&b.attr("placeholder",e.placeholder);b.data("mask")&&b.attr("autocomplete","off");g=0;for(var f=!0;g<d.length;g++){var h=l.translation[d.charAt(g)];if(h&&h.recursive){f=!1;break}}f&&b.attr("maxlength",d.length).data("mask-maxlength",!0);c.destroyEvents();c.events();g=c.getCaret();c.val(c.getMasked());c.setCaret(g)}};l.init(!b.is("input"))};a.maskWatchers={};var f=function(){var b=a(this),d={},e=b.attr("data-mask");
b.attr("data-mask-reverse")&&(d.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(d.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(d.selectOnFocus=!0);if(p(b,e,d))return b.data("mask",new n(this,e,d))},p=function(b,d,e){e=e||{};var c=a(b).data("mask"),f=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof d&&(d=d(b)),"object"!==typeof c||f(c.options)!==f(e)||c.mask!==d}catch(w){}},k=function(a){var b=document.createElement("div");a="on"+a;var e=a in b;e||(b.setAttribute(a,
"return;"),e="function"===typeof b[a]);return e};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,f=c.watchInterval;c=d.watchInputs||c.watchInputs;var k=function(){if(p(this,b,d))return a(this).data("mask",new n(this,b,d))};a(this).each(k);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(k)},f));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);
delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(f)};k={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&
k("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};k=a.jMaskGlobals=a.extend(!0,{},k,a.jMaskGlobals);k.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},k.watchInterval)},window.jQuery,window.Zepto);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.ExternalLinks) {
    Drupal.ExternalLinks = {};
  }

  Drupal.behaviors.rumFormPhoneAutocomplete = {
    attach: function (context, settings) {
      $('.form-type-tel input').on('keypress', function () {
        const keyCode = event.which;

        // Only allow 0-9, (), -, +, space keypresses.
        // Tab and backspace/delete work as well.
        if (keyCode >= 48 && keyCode <= 57) {
          return true;
        } else if (keyCode === 32 || keyCode === 40 ||
          keyCode === 41 || keyCode === 43 || keyCode === 45) {

          return true;
        } else {
          return false;
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/**
 * Execute custom logic on webforms.
 *
 * The primary purpose of this is to populate GA fields before submission.
 * There are several paths you could take:
 *   1. On document ready, populate the values. This works great, except you
 *      need to make sure "ga" is available. Which, you can't unless you use a
 *      timeout.
 *   2. On submit, populate the values. This does not work for AJAX forms.
 *   3. Debounce an event on [type="submit"] or :input. Doesn't work for
 *      programmatically submitted forms.
 *   4. Modify the GTM script to trigger an event when GA script has loaded.
 *      This requires all GTM instances to change.
 *
 * While Option 4 is the surest solution it would require coordination.
 * Instead, we'll go with Option 1 and use a setTimeout.
 */
(function ($, Drupal, drupalSettings, window) {

  if (!Drupal.atgeFormsWebform) {
    Drupal.atgeFormsWebform = {};
  }

  Drupal.behaviors.atgeFormsWebform = {
    attach: function (context, settings) {
      let forms = $('.webform-submission-form');

      // Call populateGAValues some time before form submit.
      forms.each(function(index, element) {
        // Determine if it is an ajax form.
        let form = $(element);
        if (form.parent().hasClass('webform-ajax-form-wrapper') || form.parent().parent().hasClass('webform-ajax-form-wrapper')) {
          // For AJAX forms, populate the fields after GA is available.
          Drupal.atgeFormsWebform.triggerAfterAnalyticsLoaded(function(isGALoaded){
            if (isGALoaded) {
              Drupal.atgeFormsWebform.populateGAValues(form);
            }
          });
        } else {
          // For non-AJAX forms, populate the fields on submit.
          form.on('submit', function (e) {
            Drupal.atgeFormsWebform.populateGAValues($(e.target));
          });
        }
      });
    }
  };

  /**
   * Calls the callback function when the "ga" object is available.
   *
   * After 5 tries waiting 500 ms it will halt attempts. In this case, the
   * callback is called with "false" as the parameter.
   *
   * @param {function} callback
   *   The callback function to call.
   */
  Drupal.atgeFormsWebform.triggerAfterAnalyticsLoaded = function(callback) {
    let tries = 0;

    let triggerAfterAnalyticsAvailiable = function() {
      tries++;

      // If we try too many times, don't do anything.
      if (tries > 5) {
        callback(false);
        return;
      }

      // If it's not available, try again.
      if (typeof window.ga === 'undefined') {
        setTimeout(triggerAfterAnalyticsAvailiable, 500);
        return;
      }

      // It's now available, call the callback.
      callback(true);
    };

    triggerAfterAnalyticsAvailiable();
  };

  /**
   * Populates GA fields.
   *
   * @param {object} form
   *   A jQuery object of the target form.
   */
  Drupal.atgeFormsWebform.populateGAValues = function(form) {
    if (typeof window.ga === 'undefined') {
      return;
    }

    // Only populate fields when GA is fully loaded.
    // @see https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#ready-callback
    window.ga(function () {
      let tracker = window.ga.getAll()[0];

      let clientId = tracker.get('clientId');
      if (clientId) {
        form.find("input[name='gaclientid']").val(clientId);
      }
      
      let userId = tracker.get('userId');
      if (userId) {
        form.find("input[name='gauserid']").val(userId);
      }
    });
  };

})(jQuery, Drupal, drupalSettings, window);
;
/**
 * @file
 * JavaScript behaviors for message element integration.
 */

(function ($, Drupal) {

  'use strict';

  // Determine if local storage exists and is enabled.
  // This approach is copied from Modernizr.
  // @see https://github.com/Modernizr/Modernizr/blob/c56fb8b09515f629806ca44742932902ac145302/modernizr.js#L696-731
  var hasLocalStorage = (function () {
    try {
      localStorage.setItem('webform', 'webform');
      localStorage.removeItem('webform');
      return true;
    }
    catch (e) {
      return false;
    }
  }());

  // Determine if session storage exists and is enabled.
  // This approach is copied from Modernizr.
  // @see https://github.com/Modernizr/Modernizr/blob/c56fb8b09515f629806ca44742932902ac145302/modernizr.js#L696-731
  var hasSessionStorage = (function () {
    try {
      sessionStorage.setItem('webform', 'webform');
      sessionStorage.removeItem('webform');
      return true;
    }
    catch (e) {
      return false;
    }
  }());

  /**
   * Behavior for handler message close.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformMessageClose = {
    attach: function (context) {
      $(context).find('.js-webform-message--close').once('webform-message--close').each(function () {
        var $element = $(this);

        var id = $element.attr('data-message-id');
        var storage = $element.attr('data-message-storage');
        var effect = $element.attr('data-message-close-effect') || 'hide';
        switch (effect) {
          case 'slide': effect = 'slideUp'; break;

          case 'fade': effect = 'fadeOut'; break;
        }

        // Check storage status.
        if (isClosed($element, storage, id)) {
          return;
        }

        // Only show element if it's style is not set to 'display: none'.
        if ($element.attr('style') !== 'display: none;') {
          $element.show();
        }

        $element.find('.js-webform-message__link').on('click', function (event) {
          $element[effect]();
          setClosed($element, storage, id);
          $element.trigger('close');
          event.preventDefault();
        });
      });
    }
  };

  function isClosed($element, storage, id) {
    if (!id || !storage) {
      return false;
    }

    switch (storage) {
      case 'local':
        if (hasLocalStorage) {
          return localStorage.getItem('Drupal.webform.message.' + id) || false;
        }
        return false;

      case 'session':
        if (hasSessionStorage) {
          return sessionStorage.getItem('Drupal.webform.message.' + id) || false;
        }
        return false;

      default:
        return false;
    }
  }

  function setClosed($element, storage, id) {
    if (!id || !storage) {
      return;
    }

    switch (storage) {
      case 'local':
        if (hasLocalStorage) {
          localStorage.setItem('Drupal.webform.message.' + id, true);
        }
        break;

      case 'session':
        if (hasSessionStorage) {
          sessionStorage.setItem('Drupal.webform.message.' + id, true);
        }
        break;

      case 'user':
      case 'state':
      case 'custom':
        $.get($element.find('.js-webform-message__link').attr('href'));
        return true;
    }
  }

})(jQuery, Drupal);
;
/**
 * @file
 * JavaScript behaviors for select menu.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Disable select menu options using JavaScript.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformSelectOptionsDisabled = {
    attach: function (context) {
      $('select[data-webform-select-options-disabled]', context).once('webform-select-options-disabled').each(function () {
        var $select = $(this);
        var disabled = $select.attr('data-webform-select-options-disabled').split(/\s*,\s*/);
        $select.find('option').filter(function isDisabled() {
          return ($.inArray(this.value, disabled) !== -1);
        }).attr('disabled', 'disabled');
      });
    }
  };


})(jQuery, Drupal);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeFormSelectOptions) {
    Drupal.atgeFormSelectOptions = {};
  }

  Drupal.behaviors.atgeFormSelectOptions = {
    attach: function(context, settings) {
      $('.form-select').find("option[value='empty']").prop("disabled", true);
      $('.form-select').find("option[value='separator']").prop("disabled", true);

      $('.webform-button--submit').on('click', function() {
        $('.form-select').find("option[value='empty']").prop("disabled", false);
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAnalyticsWebforms) {
    Drupal.atgeAnalyticsWebforms = {};
  }

  Drupal.behaviors.atgeAnalyticsWebforms = {
    // Check the page title for the form's name
    getFormName: function (form) {
      if (undefined !== $('h1:first')[0]) {
        return $('h1:first')[0].innerText;
      } if (form.closest('.c-form').find('h3')[0]) {
        return form.closest('.c-form').find('h3')[0].innerHTML.trim();
      } else if (undefined !== form.attr('data-name')) {
        return form.attr('data-name');
      }
    },

    // Push input, radio, and select elements to data layer.
    pushToGA: function (formName, sourceCode, field, formId) {
      let input = $('#' + formId)[0][field.name];
      field.value = $.trim(field.value);

      // Do not push PII or hidden values to data layer
      if (field.name !== 'first_name' && field.name !== 'last_name' &&
        field.name !== 'mobile_phone' && field.name !== 'zip_postal_code' && 
        input.type !== 'email' && input.type !== 'hidden') {
        if (!$(input).parent().hasClass('form-item-getform')) {
          if (input.type === 'select-one') {
            if (input.name == 'start_term' || input.name == 'semester_of_interest') {
              field.value = $(input).find('option:selected').text();
            }
            Drupal.behaviors.atgeAnalytics.formDropDown(formName, field.name, field.value, sourceCode);
          } else if (field.name === 'mcat_score') {
            Drupal.behaviors.atgeAnalytics.mCatScore(field.value);
          } else {
            Drupal.behaviors.atgeAnalytics.formFieldInput(formName, field.name, field.value, sourceCode);
          }
        }
      }
    },

    // Return true if the form is for event registration
    getEventStatus: function (form, formId) {
      if (form.find('#edit-event')[0] || form.find('#edit-event-type')[0]) {
        return true;
      } else if (formId.includes('event')) {
        return true;
      } else {
        return false;
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  $(document).ready(function () {
    // Analytics for webforms
    function pushInquiryFormToAnalytics(form) {
      let sourceCode = '';
      let isEvent;
      let formName = '';
      let formId = form.attr('id');
      let program = '';

      // Get the form's source code
      if (undefined !== form.find("input[name*=source_code]")[0]) {
        sourceCode = form.find("input[name*=source_code]")[0].value;
      }

      formName = Drupal.behaviors.atgeAnalyticsWebforms.getFormName(form);

      // Push form elements to data layer
      $.each(form.serializeArray(), function (i, field) {
        // Get the active select field, ignore the hidden field
        // The hidden field gets its value server-side
        if (field.name.includes('program_of_interest') && !program) {
          program = field.value;
        }
        Drupal.behaviors.atgeAnalyticsWebforms.pushToGA(formName, sourceCode, field, formId);
      });

      isEvent = Drupal.behaviors.atgeAnalyticsWebforms.getEventStatus(form, formId);


      // Perform event registration or form submit data layer push
      if (isEvent) {
        let eventType = '';
        if (undefined !== form.find("input[name*=event_type]")[0]) {
          eventType = form.find("input[name*=event_type]")[0].value;
        }
        Drupal.behaviors.atgeAnalytics.eventRegistration(eventType, formName);
      }

      // Create program cookie, to carry value over to thank you page
      if (program && window.location.hostname.includes('chamberlain') !== -1) {
        createCookie('program', program);
      }
      Drupal.behaviors.atgeAnalytics.formSubmit(formName, sourceCode);
    }

    let formItemOnFocus = null;
    $('.form-item select, .form-item input, .form-item textarea').on('focusin', function() {
      formItemOnFocus = this;
    });
    // Event e_formFieldValue should fire for all form fields
    $('.form-item select, .form-item input, .form-item textarea').on('focusout', function() {
      if($(this).is(":visible") && $(this).val() != "" && (this == formItemOnFocus || formItemOnFocus == null)) {
        let stepNum = 1;
        if ($(this).closest('form').attr('data-step-number') != undefined) {
          stepNum = $(this).closest('form').attr('data-step-number').substring(5, 6);
        }
        const formName = Drupal.behaviors.atgeAnalyticsWebforms.getFormName($(this).closest('form'));
        let fieldValue = $(this).val();
        let fieldName = '';

        if (this.type === 'select-one') {
          if (this.name == 'start_term' || this.name == 'semester_of_interest' ||
            this.name == 'event_id') {
            fieldValue = $(this).find('option:selected').text();
          }
        }

        if (this.type === 'radio') {
          fieldName = $($(this).closest('fieldset').find('span').get(0)).text();
        } else {
          fieldName = $('label[for="' + $(this).attr('id') + '"]').text();
        }
        if (this.name === 'zip' || this.name === 'first_name' ||
          this.name === 'last_name' || this.name === 'phone' ||
          this.name === 'email' || this.name === 'mobile_phone' ||
          this.name === 'email_address' || this.name === 'zip_code' ||
          this.name === 'zipcode' || this.name === 'zip_postal_code' ||
          this.name === 'phone_number') {
          fieldValue = 'PII';
        }
        Drupal.behaviors.atgeAnalytics.formFieldValue(formName, fieldName, fieldValue, stepNum);
      }
    });

    // On submit, process analytics functionality if there are no errors on the form
    $('form').on('submit', function () {
      if ($(this)[0].id.startsWith('webform-submission')) {
        let error = false;

        // Check for empty required fields on the form
        $("#" + (this).id + " :input").each(function () {
          if ($(this)[0].hasAttribute('required') && $(this)[0].value === "") {
            error = true;
          }
        });

        if (!error) {
          pushInquiryFormToAnalytics($(this));
        }
      }
    });

    function createCookie(cookieName, value) {
      document.cookie = cookieName + '=' + value +';path=/; domain=.' +
        location.hostname.replace('/^www\./i', '');
    }
  });
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumWebformUtility) {
    Drupal.rumWebformUtility = {};
  }

  Drupal.behaviors.rumWebformUtility = {
    attach: function (context, settings) {


      // Set CCN2 source code from the cookie on the webform. Varnish prevents
      // this from working through the source code redirect module on prod.
      const campaignCookie = Drupal.behaviors.rumWebformUtility.getCookie('campaign');
      if (campaignCookie !== '' && campaignCookie !== null) {
        const srcPartial = campaignCookie.split('&');
        const srcString = srcPartial[0].split('=');
        const srcVal = srcString[0];
        if ($('input[name="source_code"]')[0]) {
          $('input[name="source_code"]').val(srcVal);
        }
      }

      // Get gclid cookie to autofill the gclid field
      const gclidCookie = Drupal.behaviors.rumWebformUtility.getCookie('gclid');
      if (gclidCookie !== '' && gclidCookie !== null) {
        const gclidPartial = gclidCookie.split('&');
        const gclidString = gclidPartial[0].split('=');
        const gclidVal = gclidString[0];
        if ($('input[name="gclid"]')[0]) {
          $('input[name="gclid"]').val(gclidVal);
        }
      }

      // Get the landingPage cookie to autofill the url field
      const landingPageCookie = Drupal.behaviors.rumWebformUtility.getCookie('landingPage');
      if (landingPageCookie !== '' && landingPageCookie !== null) {
        if ($('input[name="url"]')[0]) {
          $('input[name="url"]').val(landingPageCookie);
        }
      }
    },

    getCookie: function (cName) {
      let cValue = document.cookie;
      let cStart = cValue.indexOf(' ' + cName + '=');
      if (cStart === -1) {
        cStart = cValue.indexOf(cName + '=');
      }
      if (cStart === -1) {
        cValue = null;
      } else {
        cStart = cValue.indexOf('=', cStart) + 1;
        let cEnd = cValue.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = cValue.length;
        }
        cValue = decodeURI(cValue.substring(cStart, cEnd));
      }
      return cValue;
    },
  };
})(jQuery, Drupal, drupalSettings);


;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.ExternalLinks) {
    Drupal.ExternalLinks = {};
  }

  Drupal.behaviors.ExternalLinks = {
    attach: function(context, settings) {

      // Set Base settings var.
      const atgeSettings = settings.atge_external_links.external_links;
      // Get the array of the whitelisted external links (passed from drupal).
      const linkItems = atgeSettings.whitelist;
      // Get enabled / disabled state of module.
      const onSwitch = atgeSettings.onswitch;
      // Get the value of the modal delay and multiply by 1000 to convert to
      // milliseconds.
      const modalSetting = atgeSettings.modal.delay;
      const modalDelay = modalSetting === '0' ? 0 : modalSetting * 1000;
      let modalFlag = modalDelay === 0;

      function externalLinkModal(anchor) {
        // Set Vars.
        const container = '.layout-container';
        const modalBlock = '.block__elm';
        const modalUnderlay = '.block__elm--underlay';
        const modalClose = '.block__elm--close';
        const modalDeclineBtn = '.block__elm--button-decline';
        const modalAcceptBtn = '.block__elm--button-accept';
        let autoClick;
        let resetBtn;

        // On Init, reset the accept button data-href attribute.
        $(modalAcceptBtn).attr('href', '');

        // On click of a true external link, prevent normal link behavior and
        // open the modal window.  Also, set the accept button data-href
        // attribute according to the link that was clicked.
        $(anchor, context).once('elmClicked').on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $(modalBlock).fadeIn();
          $(this).parents(container).find(modalAcceptBtn).attr('href', anchor.href);
          let dataHref = $(this).parents(container).find(modalAcceptBtn).attr('href');
          // If a specific amount of time passes before the user either declines
          // or accepts, proceed to URL set by data-href attribute.
          if (dataHref && modalFlag === false) {
            autoClick = setTimeout(function () {
              window.open(dataHref);
              $(modalBlock).fadeOut();
              $(modalAcceptBtn).attr('href', '');
            }, modalDelay);
          }
          // Set focus to first button for accessibility.
          $(this).parents(container).find(modalAcceptBtn).focus();
        });

        // On click of modal underlay, close, or decline buttons, fade out the
        // the modal window, reset the data-href attribute back to empty and
        // and stop link from executing on time-delay.
        $(modalUnderlay + ', ' + modalClose + ', ' + modalDeclineBtn, context).on('click', function (e) {
          e.stopPropagation();
          $(modalAcceptBtn).attr('href', '');
          $(modalBlock).fadeOut();
          clearTimeout(autoClick);
        });

        // On click of accept button, take the user to the URL set by the
        // data-href attribute.
        $(modalAcceptBtn, context).on('click', function (e) {
          e.stopPropagation();
          clearTimeout(autoClick);
          resetBtn = setTimeout(function () {
            $(modalBlock).fadeOut();
            $(modalAcceptBtn).attr('href', '');
          }, 500);
        });
      }

      if (onSwitch === 1) {
        // Iterate through each anchor link.
        $('.layout-container a', context).once('elmBehaviors').each(function () {
          if (location.hostname === this.hostname || this.href.match(/^mailto\:/) || this.href.match(/^tel\:/)) {
            // if the anchor hostname is local, add an internal link class.
            $(this).addClass('link--internal');
          }
          else {
            if ($.inArray(this.hostname, linkItems) !== -1) {
              // If our anchor's hostname matches a hostname in the linkItems
              // array, then add a whitelist class.
              $(this).addClass('link--whitelisted');
              $(this).attr('target', '_blank');
            }
            else {
              // If our anchor's host name is external and NOT in the linkItems
              // array, then add an external link class and process the external
              // link modal function.
              if (!$(this).attr('href') || $(this).attr('href') === '#' || $(this).attr('href') === '') {
                // Ignore in cases where there is no set href, an empty href, or a href="#".
              }
              else {
                $(this).addClass('link--external');
                externalLinkModal(this);
              }
            }
          }
        });
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.seckitIntegrity) {
    Drupal.seckitIntegrity = {};
  }

  Drupal.behaviors.seckitIntegrity = {
    attach: function (context, settings) {

      // Set Base settings var.
      const secKitSettings = settings.seckit.integrity;
      // Get enabled / disabled state of the integrity hash.
      const integrityStatus = secKitSettings.subresource_integrity;
      // Get enabled / disabled state of the crossorigin attribute.
      const crossOriginStatus = secKitSettings.subresource_crossorigin;

      setTimeout(function () {
        $("script").each(function (index) {
          var script = $(this).attr('src') ? $(this) : '';
          var hash = 'sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC';
          if (script[0]) {
            if (crossOriginStatus === 1) {
              $(this).attr('crossorigin', 'anonymous');
            }
            if (integrityStatus === 1) {
              $(this).attr('integrity', hash);
            }
          }
        });
      }, 3000);
    }
  };

})(jQuery, Drupal, drupalSettings);


;
