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
(function ($, Drupal, drupalSettings) {

  /**
   * Define base namespace.
   */
  if (!Drupal.atgeLivechat) {
    Drupal.atgeLivechat = {};
  }

  Drupal.behaviors.atgeLivechat = {
    attach: function (context, settings) {
      if (!drupalSettings.atge_live_chat.isGdprEnabled) {
        Drupal.behaviors.atgeLivechat.processChat();
      }
    },

    processChat: function () {
      if (drupalSettings.atge_live_chat.chat_enable) {
        const liveChatId = $('input[name="liveChatId"]')[0].value;
        const chatButton = $('#liveagent_button_online_' + liveChatId);

        if (chatButton[0] && !Drupal.behaviors.atgeLivechatGdpr.getCookie('has_logged_in')) {
          Drupal.behaviors.atgeLivechat.salesforceFunctions(liveChatId);
          Drupal.behaviors.atgeLivechat.startChat(chatButton, liveChatId);
        }
      }
    },

    salesforceFunctions: function (liveChatId) {
      if (!window._laq) {
        window._laq = [];
      }

      window._laq.push(function () {
        liveagent.showWhenOnline(liveChatId,
            document.getElementById('liveagent_button_online_' + liveChatId));
        liveagent.showWhenOffline(liveChatId,
            document.getElementById('liveagent_button_offline_' + liveChatId));
      });
    },

    startChat: function (chatButton, liveChatId) {
      const liveEnv = drupalSettings.atge_live_chat.sf_env_live;
      const liveDeployId = drupalSettings.atge_live_chat.deploy_id_live;
      const liveOrgId = drupalSettings.atge_live_chat.org_id_live;
      const proactiveEnv = drupalSettings.atge_live_chat.sf_env_proactive;
      const proactiveDeployId = drupalSettings.atge_live_chat.deploy_id_proactive;
      const proactiveOrgId = drupalSettings.atge_live_chat.org_id_proactive;

      if (drupalSettings.atge_live_chat.isGdprEnabled) {
        if (Drupal.behaviors.atgeLivechatGdpr.livechatAllowed()) {
          // Call proactive chat function if proactive chat block
          if ($('#block-proactive-chat')[0]) {
            Drupal.behaviors.atgeLivechat.initProactiveChat(proactiveEnv, proactiveDeployId, proactiveOrgId);
          }
          else {
            Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
          }
        }
      } else {
        if ($('#block-proactive-chat')[0]) {
          Drupal.behaviors.atgeLivechat.initProactiveChat(proactiveEnv, proactiveDeployId, proactiveOrgId);
        }
        else {
          Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
        }
      }

      chatButton.on('click', function () {
        Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
        liveagent.startChat(liveChatId);
      });

      Drupal.behaviors.atgeLivechat.setupMutations(chatButton);
    },

    setupMutations: function (chatButton) {
      // Observer hides parent <li> tag, to remove extra margin-right when chat
      // button is hidden. Alt text is added to proactive chat images.
      const stickyEnable = drupalSettings.atge_live_chat.sticky_enable;
      let assignProactiveAlt = false;
      let callButton = $('ul[region="utility_bottom"] li a[data-gtm="phone"], ' +
          'ul[region="footer"] li[data-gtm="phone"] a');
      let hideMobileProactive = false;
      let hideTabletProactive = false;

      if ($('input[name="proactiveHideMobile"]')[0]) {
        hideMobileProactive = $('input[name="proactiveHideMobile"]')[0].value === '1' ? true : false;
      }

      if ($('input[name="proactiveHideTablet"]')[0]) {
        hideTabletProactive = $('input[name="proactiveHideTablet"]')[0].value === '1' ? true : false;
      }
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
          if (chatButton.css('display') === 'none') {
            chatButton.parent().addClass('visually-hidden');
            chatButton.attr('tabindex', '-1');

            if (stickyEnable && callButton) {
              callButton.parent().removeClass('visually-hidden');
            }
          }
          else {
            chatButton.parent().removeClass('visually-hidden');
            if (stickyEnable && callButton) {
              callButton.parent().addClass('visually-hidden');
            }

            // This is a fix for the Chat button breaking the styles in the header on Safari
            // Do not execute if chat is on sticky footer, it alters the layout
            if (!stickyEnable) {
              let parentMenu = chatButton.closest('ul').find('li');
              parentMenu.css('flex', '0 0 auto');

              chatButton.attr('tabindex', '0');
            }
          }
        });
        if (!assignProactiveAlt) {
          $('div[id^="liveagent_invite_button_"]').children('img').each(function (index) {
            if (index === 0) {
              $(this).attr('alt', 'X Button');
            }
            else {
              $(this).attr('alt', 'Proactive Chat');
            }

            if (hideMobileProactive) {
              $(this).addClass('hide-on-mobile');
            }

            if (hideTabletProactive) {
              $(this).addClass('hide-on-tablet');
            }
            assignProactiveAlt = true;
          });
        }
      });

      observer.observe(chatButton[0], {
        attributes: true,
        attributeFilter: ['style']
      });
    },

    // Live chat script
    initLiveChat: function (liveEnv, liveDeployId, liveOrgId) {
      liveagent.init(liveEnv, liveDeployId, liveOrgId);
    },

    // Proactive chat script
    initProactiveChat: function (proactiveEnv, proactiveDeployId, proactiveOrgId) {
      liveagent.init(proactiveEnv, proactiveDeployId, proactiveOrgId);
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeLivechatGdpr) {
    Drupal.atgeLivechatGdpr = {};
  }

  Drupal.behaviors.atgeLivechatGdpr = {
    attach: function (context, settings) {

      if (drupalSettings.atge_live_chat.isGdprEnabled &&
          !Drupal.behaviors.atgeLivechatGdpr.gdprBannerClosed()) {

        // Check allowed GDPR values once the close button is clicked on the banner
        $(document).on('click', 'div[class^="optanon-alert-box-button-middle accept-cookie-container"] button,' +
            '#onetrust-accept-btn-handler, #accept-recommended-btn-handler, ' +
            '.save-preference-btn-handler', function () {
          // Gives time for the actualOptanonConsent to load on the browser
          setTimeout(function() {
            Drupal.behaviors.atgeLivechat.startChat();
          }, 1500);
        });
      }
    },

    getCookie: function(cName) {
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

    // Return true if OnetrustActiveGroups variable contains ",C0003," or continent is not 'EU'
    livechatAllowed: function() {
      const onetrustNewWorkflow = drupalSettings.atge_live_chat.enable_new_workflow;

      if (typeof window.continent !== 'undefined') {
        if (onetrustNewWorkflow) {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',C0003,');
        } else {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',3,');
        }
      }
    },

    // Return true if OptanonAlertBoxClosed cookie is present
    gdprBannerClosed: function() {
      const bannerClosed = Drupal.behaviors.atgeLivechatGdpr.getCookie('OptanonAlertBoxClosed');
      return bannerClosed;
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  $(document).ready(function () {

    // Analytics for live chat
    // Proactive chat is set to appear in the browser in 30 seconds after
    // page load
    setTimeout(function () {
      $('div[id^="liveagent_invite_button_"]').children().first().click(function () {
        Drupal.behaviors.atgeAnalytics.xButtonChat("proactive chat");
      });

      $('div[id^="liveagent_invite_button_"]').children().eq(1).click(function () {
        Drupal.behaviors.atgeAnalytics.openChat("proactive chat");
      });
    }, 30010);

    $('.menu .menu-item span[id^="liveagent_button_online_"]').click(function () {
      Drupal.behaviors.atgeAnalytics.openChat("non-proactive chat");
    });
  });
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumCookies) {
    Drupal.rumCookies = {};
  }

  // Converts the vc query param into a cookie
  Drupal.behaviors.rumCookies = {
    attach: function (context, settings) {
      const vcQuery = 'vc';
      const gclidQuery = 'gclid';
      const url = window.location.href;
      let queryResultArray = '';
      let vcValue = '';
      let gclidValue = '';

      // Creates campaign cookie
      if (url.indexOf('?' + vcQuery + '=') !== -1 || url.indexOf('&' + vcQuery + '=') !== -1) {
        queryResultArray = Drupal.behaviors.rumCookies.getQueryParams();
        vcValue = queryResultArray.vc;
        if (vcValue) {
          Drupal.behaviors.rumCookies.createCookie('campaign', vcValue);
        }
      }

      // Creates gclid cookie
      if (url.indexOf('?' + gclidQuery + '=') !== -1 || url.indexOf('&' + gclidQuery + '=') !== -1) {
        queryResultArray = Drupal.behaviors.rumCookies.getQueryParams();
        gclidValue = queryResultArray.gclid;
        if (gclidValue) {
          Drupal.behaviors.rumCookies.createCookie('gclid', gclidValue);
        }
      }

      // Creates landing page cookie
      if (document.referrer && !document.referrer.includes(window.location.origin)) {
        if (document.location.search) {
          Drupal.behaviors.rumCookies.createCookie('landingPage', url);
        }
      }
    },

    getQueryParams: function () {
      let queries = [];
      let urlParam;
      let urlParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (let i = 0; i < urlParams.length; i++) {
        urlParam = urlParams[i].split('=');
        queries[urlParam[0]] = urlParam[1];
      }
      return queries;
    },

    createCookie: function (cookieName, value) {
      document.cookie = cookieName + '=' + value +';path=/; domain=.' +
        location.hostname.replace('/^www\./i', '');

    },
  };
})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, window, document, undefined) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAnalytics) {
    Drupal.atgeAnalytics = {};
  }

  // Variable to control if the menu item is already clicked on mobile version.
  var menuItemNameClicked = null;

  Drupal.behaviors.atgeAnalytics = {

    navClick: function (menuType, menuItemName) {
      if (menuItemNameClicked !== menuItemName) {
        dataLayer.push({
          'event': 'e_navigationClick',
          'menuType': menuType,
          'menuItemName': menuItemName || 'error',
        });
      }
      menuItemNameClicked = menuItemName;
    },

    formSubmit: function (formName, formSourceCode) {
      dataLayer.push({
        'event': 'e_formSubmit',
        'formName': formName,
        'formSourceCode': formSourceCode
      });
    },

    formFieldInput: function (formName, fieldName, fieldValue, formSourceCode) {
      dataLayer.push({
        'event': 'e_formFieldInput',
        'formName': formName,
        'fieldName': fieldName,
        'fieldValue': fieldValue,
        'formSourceCode': formSourceCode
      });
    },

    formFieldValue: function (formName, fieldName, fieldValue, stepNum) {
      dataLayer.push({
        'event': 'e_formFieldValue',
        'fieldName': fieldName,
        'formName': formName,
        'formStepNumber': stepNum,
        'fieldValue': fieldValue
      });
    },

    formDropDown: function (formName, fieldName, selectedValue, formSourceCode) {
      dataLayer.push({
        'event': 'e_formDropdown',
        'fieldName': fieldName,
        'formName': formName,
        'selectedValue': selectedValue,
        'formSourceCode': formSourceCode
      });
    },

    eventRegistration: function (eventType, eventName) {
      dataLayer.push({
        'event': 'e_eventRegistration',
        'eventType': eventType,
        'eventName': eventName
      });
    },

    mCatScore: function (score) {
      dataLayer.push({
        'event': 'e_mcatScore',
        'mcatScore': score
      });
    },

    formPageSubmit: function (formName, formPage, stepPage) {
      dataLayer.push({
        'event': 'e_formPageSubmit',
        'formName': formName,
        'formPage': formPage,
        'formStepNumber': stepPage
      });
    },

    openChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatOpen',
        'chatType': chatType
      });
    },

    closeChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatClose',
        'chatType': chatType
      });
    },

    xButtonChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatXButton',
        'chatType': chatType
      });
    },

    searchClick: function (term, numResults, searchList) {
      dataLayer.push({
        'event': 'e_searchResults',
        'searchTerm': term,
        'results': numResults,
        'searchList': searchList
      });
    },

    searchFilter: function (query, filterSelected, searchList) {
      dataLayer.push({
        'event': 'e_searchFilter',
        'searchQueryParameter': query,
        'filterSelected': filterSelected,
        'searchList': searchList
      });
    },

    expandList: function (title, itemText) {
      dataLayer.push({
        'event': 'e_expandList',
        'listName': title,
        'listItem': itemText
      });
    },
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
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeCtaAnimations) {
    Drupal.atgeCtaAnimations = {};
  }

  Drupal.behaviors.atgeCtaAnimations = {
    attach: function(context, settings) {

      // Get animation option from drupal.
      const type = drupalSettings.atge_components_cta.animations;
      // Set a count so we can increment on each banner item.
      // We'll start at 2 since the header uses delay #1.
      let count = 2;

      // Iterate through each cta component.
      $('.c-cta-banner .is-animated').each(function () {
        // Set our animation targets.
        let animateTargets = '.c-cta-banner__content--header, .p-cta-banner__content--item';
        // Set base animation class for each element that needs to animate.
        $(this).find(animateTargets).addClass('animation');

        // Call waypoints library.
        $(this).waypoint(function () {
          // On waypoint scroll, fire the following animations via addClass.
          $(this.element).find('.c-cta-banner__content--header').addClass(type + ' animation--delay-1');
          // iterate through each item and update delay count.
          $(this.element).find('.p-cta-banner__content--item').each(function () {
            $(this).addClass(type + ' animation--delay-'+count);
            count++;
          });
        }, {
          // Set waypoints offset when component is 60% from top of window.
          offset: '60%'
        });
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeMediaCoverImageInteractions) {
    Drupal.atgeMediaCoverImageInteractions = {};
  }

  Drupal.behaviors.atgeMediaCoverImageInteractions = {
    attach: function(context, settings) {

      const videoInline = '.c-media.video-inline';

      // Load IE Object Fit Fix.
      Drupal.behaviors.atgeBaseGlobalFunctions.ieObjectFitFix('.e-media-cover-img');

      function hideOnExtVideo(cover, video) {

        // Get the YouTube video info from inside the clicked player container
        // Attach it to the window object so it can be used in another file
        // @see youtube.atge.iframe.async.js:56
        let clickedVideoId = $(video).attr('id');
        let vidInfoDiv = $(video).find('.atge-youtube-data');
        let youTubeVidId = $(vidInfoDiv).data('videoId');

        // If this function is defined on the window object, execute it
        // Downloads the YouTube JavaScript required to play videos
        // Plays the video that was clicked after the JS has been loaded
        if (typeof atgeAddYouTubeCode === 'function') {
          window.clickedVideo = clickedVideoId;
          atgeAddYouTubeCode();
        }

        // Remove the cover image on the video
        cover.fadeOut();

        // If there are videos on the page, play the one that was clicked
        // Stop the ones that were not clicked
        if (window.videosOnPage) {
          window.videosOnPage.map(function(video) {
            if (youTubeVidId === video.id) {
              video.player.playVideo();
            } else {
              video.player.stopVideo();
            }
          });
        }
        $(video).find('.yt-player').each(function (j, player) {
          player.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        });
        // Pause All Other Videos
        $(videoInline).find('.e-video--external').not($(video)).find('.yt-player').each(function(j, player) {
          player.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        });
      }

      // Hide Cover image on click for external videos.
      $(videoInline).find('.e-video--external').each(function (i, video) {
        $(video).find('.e-media-cover-img').on('click', function () {
          if (drupalSettings.atge_utility.isGdprEnabled) {
            if (Optanon.GetDomainData()['ShowAlertNotice'] === false ||
                Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
              hideOnExtVideo($(this), video);
            }
          } else {
            hideOnExtVideo($(this), video);
          }
        });
      });

      // Hide Cover image on click for internal videos.
      $(videoInline).find('.e-video--internal').each(function (i, video) {
        $(video).find('.e-media-cover-img').on('click', function () {
          $(this).fadeOut();
          $(video).find('.e-media__video--banner').each(function (j, player) {
            if(player.paused) {
              player.play();
              // Pause All Other Videos
              $(videoInline).find('.e-video--internal').not($(video)).find('.e-media__video--banner').each(function(k, player2) {
                player2.pause();
              });
            } else {
              player.pause();
            }
          });
        });
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAddYoutubeAsync) {
    Drupal.atgeAddYoutubeAsync = {};
  }
  Drupal.behaviors.atgeAddYoutubeAsync = {
    attach: function(context, settings) {
      //Define a function that downloads YouTube's JS files and can be called from another file
      //This allows us to defer loading the files until a user interacts with a video
      window.atgeAddYouTubeCode = function() {
        //Load the iFrame Player API code asynchronously
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Create an <iframe> (and YouTube player) after the API code downloads
        setTimeout(function () {
          $('.atge-youtube-data', context)
              .once('addYoutubeIframe')
              .each(function () {
                const dataset = $(this).data();
                const youtubeData = $(this);

                // Check for OneTrust object Optanon
                if (drupalSettings.atge_utility.isGdprEnabled) {
                  if (Optanon.GetDomainData()['ShowAlertNotice'] === true &&
                      !Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
                    Drupal.behaviors.atgeYoutubeGdpr.addGdprBanner(youtubeData, dataset);
                  }
                }
              });
        }, 1000);
      }
    },
    bannerCheckGdpr: function (context) {
      // Add a gdpr banner to each video if YouTube videos are blocked
      $('.atge-youtube-data', context)
          .once('addYoutubeIframe')
          .each(function () {
            const dataset = $(this).data();
            const youtubeData = $(this);

            if (drupalSettings.atge_utility.isGdprEnabled) {
              if (!Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
                Drupal.behaviors.atgeYoutubeGdpr.addGdprBanner(youtubeData, dataset);
              }
            }
          });
    },

    createVideos: function () {
      // This is only needed when the JS is first loaded
      // Find the YouTube data coming from the container
      // Use it to find all video IDs on the page
      var clickedVideo = window.clickedVideo;
      var vidInfoDiv = $('#'+clickedVideo).find('.atge-youtube-data');
      var vidId = $(vidInfoDiv).data('videoId');

      // Grab all of the video IDs on the page
      var videoIds = getAllVideoIds('.atge-youtube-data');

      // For each ID found, create a unique video player instance
      // Use .map() because IE11 doesn't support Array.prototype.forEach(), piece of junk
      // Add to the window object so we can start/stop videos when another cover image is clicked
      // @see cover-image.atge.interactions.jquery.js:39
      // @see carousel.atge.interactions.jquery.js
      window.videosOnPage = videoIds.map(function (id) {
        let player = new YT.Player('player-' + id, {
          height: '390',
          width: '640',
          videoId: id,
          playerVars: {
            rel: 0,
            autoplay: (vidId === id) ? 1 : 0
          }
        });

        return {
          id: id,
          player: player
        }
      });
    },
  };
})(jQuery, Drupal, drupalSettings);

function onYouTubeIframeAPIReady() {
  if (drupalSettings.atge_utility.isGdprEnabled) {
    if (Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
      Drupal.behaviors.atgeAddYoutubeAsync.createVideos();
    }
  } else {
    Drupal.behaviors.atgeAddYoutubeAsync.createVideos();
  }
}

/**
 * Gets all YouTube video IDs from data containers on the page
 * @param selector
 * @returns {[]}
 */
function getAllVideoIds(selector) {
  var videoIds = [];

  var allYouTubeData = document.querySelectorAll(selector);

  allYouTubeData.forEach(function(el) {
    videoIds.push(el.dataset.videoId);
  });

  return videoIds;
}
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeYoutubeGdpr) {
    Drupal.atgeYoutubeGdpr = {};
  }

  Drupal.behaviors.atgeYoutubeGdpr = {
    attach: function (context, settings) {
      if (drupalSettings.atge_utility.isGdprEnabled) {

        // Hide play icon on cover images during hover
        $('.e-media-cover-img').hover(function() {
              if (!Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
                $(this).removeClass('e-media-icon--play');
              }
            },
            function() {
              if (!Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
                $(this).addClass('e-media-icon--play');
              }
            });


        // Check allowed GDPR values once the close button is clicked on the banner
        $(document).on('click', 'div[class^="optanon-alert-box-button-middle accept-cookie-container"] button,' +
            '#onetrust-accept-btn-handler, #accept-recommended-btn-handler, ' +
            '.save-preference-btn-handler', function () {

          // Gives time for the actualOptanonConsent to load on the browser
          setTimeout(function() {
            if (Drupal.behaviors.atgeYoutubeGdpr.youtubeAllowed()) {
              Drupal.behaviors.atgeYoutubeGdpr.bannerCloseAddIframe();
            }
          }, 1500);
        });
      }
    },

    getCookie: function(cName) {
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

    // Return true if OnetrustActiveGroups variable contains ",C0004," or continent is not 'EU'
    youtubeAllowed: function() {
      const onetrustNewWorkflow = drupalSettings.atge_utility.enable_new_workflow;

      if (typeof window.continent !== 'undefined') {
        if (onetrustNewWorkflow) {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',C0004,');
        } else {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',4,');
        }
      }
    },

    // Return true if OptanonAlertBoxClosed cookie is present
    gdprBannerClosed: function() {
      const bannerClosed = Drupal.behaviors.atgeYoutubeGdpr.getCookie('OptanonAlertBoxClosed');
      return bannerClosed;
    },

    addGdprBanner: function(youtubeData, dataset) {
      const youtubeGdprText = drupalSettings.atge_gdpr_global.youtube_gdpr_text ?
          drupalSettings.atge_gdpr_global.youtube_gdpr_text : '';
      const cookieText = '<h4 class="cookie-text">' + youtubeGdprText +'</h4>';
      const gdprLayer = '<div class="gdpr-banner-layer"></div>';
      const containerId = $('#' + dataset.containerId);
      let gdprBanner = '<div class="gdpr-banner"></div>';

      if (youtubeData.siblings('.e-media-cover-img')[0]) {
        youtubeData.siblings('.e-media-cover-img').append(gdprBanner);
        youtubeData.siblings('.e-media-cover-img').find('.gdpr-banner')[0].insertAdjacentHTML('beforeend',
            cookieText + gdprLayer);
      } else {
        const cover = '<img title="'+ dataset.title +'" src="https://img.youtube.com/vi/'+ dataset.videoId +'/maxresdefault.jpg">';
        gdprBanner = '<div name="gdpr-banner" class="gdpr-banner e-media-cover-img e-media-icon--play has-objectfit"></div>';

        containerId[0].insertAdjacentHTML('beforeend', cover);
        containerId.find('img').wrap(gdprBanner);
        containerId.find('.gdpr-banner')[0].insertAdjacentHTML('beforeend',
            cookieText + gdprLayer);
      }
    },

    bannerCloseAddIframe: function() {
      $('.atge-youtube-data').each(function() {
        const dataset = $(this).data();
        let iframe = $('<iframe></iframe>');
        Drupal.behaviors.atgeYoutubeGdpr.removeGdprBanner($(this), dataset);
        if ($(this).parent().parent().find('.e-modal')[0]) {
          Drupal.behaviors.atgeAddYoutubeIframe.createIframe(iframe, dataset);
        } else {
          Drupal.behaviors.atgeAddYoutubeAsync.createVideos();
        }
      });
    },

    removeGdprBanner: function(youtubeData, dataset) {
      if (youtubeData.siblings('.e-media-cover-img')[0]) {
        youtubeData.siblings('.e-media-cover-img').find('img').unwrap('.gdpr-banner');
        youtubeData.siblings('.e-media-cover-img').find('h4').remove();
        youtubeData.siblings('.e-media-cover-img').find('.gdpr-banner-layer').remove();
      } else {
        $('#' + dataset.containerId).find('.gdpr-banner').remove();
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeCarouselTheme) {
    Drupal.atgeCarouselTheme = {};
  }

  Drupal.behaviors.atgeCarouselTheme = {
    attach: function(context, settings) {

      // Iterate through each usage of carousel component.
      $('.c-carousel').each(function (i, carousel) {

        const videoInline = $(carousel).find('.e-video');

        // Load IE Object Fit Fix.
        Drupal.behaviors.atgeBaseGlobalFunctions.ieObjectFitFix('.e-media-cover-img');

        // Hide Cover image on click for external videos.
        $(videoInline).find('.e-video--external').each(function (j, video) {
          $(video).find('.e-media-cover-img').on('click', function () {

            // Get the YouTube video info from inside the clicked player container
            // Attach it to the window object so it can be used in another file
            // @see youtube.atge.iframe.async.js:56
            let clickedVideoId = $(video).attr('id');
            let vidInfoDiv = $(video).find('.atge-youtube-data');
            let youTubeVidId = $(vidInfoDiv).data('videoId');

            // If this function is defined on the window object, execute it
            // Downloads the YouTube JavaScript required to play videos
            // Plays the video that was clicked after the JS has been loaded
            if (typeof atgeAddYouTubeCode === 'function') {
              window.clickedVideo = clickedVideoId;
              atgeAddYouTubeCode();
            }

            $(this).fadeOut();
            // If there are videos on the page, play the one that was clicked
            // Stop the ones that were not clicked
            if (window.videosOnPage) {
              window.videosOnPage.map(function(video) {
                if (youTubeVidId === video.id) {
                  video.player.playVideo();
                } else {
                  video.player.stopVideo();
                }
              });
            }

            $(video).find('.yt-player').each(function (k, player){
              player.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
            });
            // Pause All Other Videos
            $('.c-carousel').find('.e-video--external').not($(video)).find('.yt-player').each(function(k, player) {
              player.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            });
          });
        });

        // Hide Cover image on click for internal videos.
        $(videoInline).find('.e-video--internal').each(function (j, video) {
          $(video).find('.e-media-cover-img').on('click', function () {

            //Download YouTube JS as it's not downloaded immediately on page load
            if (typeof atgeAddYouTubeCode === 'function') {
              atgeAddYouTubeCode();
            }

            $(this).fadeOut();
            $(video).find('.e-media__video--banner').each(function (k, player) {
              if(player.paused) {
                player.play();
                // Pause All Other Videos
                $('.c-carousel').find('.e-video--internal').not($(video)).find('.e-media__video--banner').each(function(l, player2) {
                  player2.pause();
                });
              } else {
                player.pause();
              }
            });
          });
        });

      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBannerComponentInteractions) {
    Drupal.atgeBannerComponentInteractions = {};
  }

  Drupal.behaviors.atgeBannerComponentInteractions = {
    attach: function(context, settings) {

      // Create function to set media item mobile item.
      function setMediaItemMobileHeight() {
        // Variables.
        let width = $(window).width();

        // run on each media item.
        $('.c-banner').each(function () {
          // Set variable that gets height of the media container.
          let bannerItem = $(this).find('.c-banner__media--item');
          let bannerImg = $(this).find('.c-banner__media--item img');

          // Check if mobile.
          if (width < 1024) {
            let headerHeight = $(this).find('.p-banner__media').height();
            // Add class to media item.
            bannerItem.addClass('e-overlay-media');
            // Set dynamic height on media item image.
            bannerImg.css('max-height', headerHeight - 10);
          }
          else {
            // If we're not at a mobile screensize, reset the max-height.
            bannerImg.css('max-height', '');
          }

        });
      }

      // Check if media item exists.
      if ($('.c-banner__content--item:not(.e-media--no-overlay)').hasClass('c-banner__media--item')) {
        // Init function on load.
        $(window).on('load', setMediaItemMobileHeight);
        // Update function on resize.
        $(window).resize(setMediaItemMobileHeight);
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumHeaderMainNav) {
    Drupal.rumHeaderMainNav = {};
  }

  Drupal.behaviors.rumHeaderMainNav = {
    attach: function (context, settings) {

      $(document).ready(function() {
        var heroBanner = $('.hide-on-tablet .c-banner:first');
        if (heroBanner.length <= 0) heroBanner = $('.c-banner:first');
        var footerMenu = $('#block-secondaryfooternavigation');
        // Checking if theres Hero Banner in the page
        if (heroBanner.length > 0) {
          heroBannerPosition = heroBanner.offset();
          heroBannerHeight = Math.round(heroBanner.height());
          $(window).scroll(function () {
            heroBannerPosition = heroBanner.offset();
            currentTop = ($(window).scrollTop());
            if (currentTop > heroBannerHeight + heroBannerPosition.top - 70 ) {
              footerMenu.addClass('menu--visible');
            } else {
              footerMenu.removeClass('menu--visible');
            }
          });
        } else {
          footerMenu.addClass('menu--visible');
        }
      });
      
      function changeBackgroundHeader() {
        if($('.c-rum-banner--item').hasClass('p-banner__bg-color--none')){
          $('.region__header.alt-header').addClass('primary-color');
        }
      }
      $(window).on('load', changeBackgroundHeader);

      // Adding GTM to call-to-action classes
      const utilitySearch = $('#block-secondaryfooternavigation');
      utilitySearch.find('.menu-cta-link').attr({
        'data-gtm': 'call-to-action'
      });
      
      const mobileutility = $('#block-mobileutility');
      mobileutility.find('.menu-cta-link').attr({
        'data-gtm': 'call-to-action'
      });

      // Adding an attribute data-click-label to  
      // identify buttons with same text
      let callToAction = $('[data-gtm="call-to-action"]');
      let countAllCallToAction = [];
      let repeatedCallToAction = [];
      callToAction.each(function (i, button) {
        if ((button.text.trim() + ' - ' + button.href) in countAllCallToAction) {
          repeatedCallToAction[button.text.trim() + ' - ' + button.href] = button.text.trim();
        } else {
          countAllCallToAction[button.text.trim() + ' - ' + button.href] = button.text.trim();
        }
      });

      let key;
      for (key in repeatedCallToAction) {
        let numButton = 1;
        $('[data-gtm="call-to-action"]:contains("' + repeatedCallToAction[key] + '")').each(function (i, button) {
          if (key == (button.text.trim() + ' - ' + button.href)) {
            $(button).attr('data-click-label', button.text.trim() + ' - Button ' + numButton++);
          }
        });
      }

      //remove default navClick; add data attribute
      $('.block__menu--main li.call-to-action').find('a').once()
          .removeAttr('onClick')
          .attr('data-gtm', 'call-to-action')
    }
  };

})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeTBMegaMenu) {
    Drupal.atgeTBMegaMenu = {};
  }

  Drupal.behaviors.atgeTBMegaMenu = {
    attach: function(context, settings) {

      function setTBMegaMenuWidth() {
        let offset, windowWidth;

        // Determine window width so that tb mega menu can always span edge to edge.
        $('.tb-megamenu ul.tb-megamenu-nav > li').each(function (i, tbNavItem) {

          // Set const Vars.
          const dropDown = '.tb-full-width.mega-dropdown-menu';
          const dropDownInner = '.mega-dropdown-inner';
          const dataWidth = $(tbNavItem).find('.tb-megamenu-column').data('width');
          const tablet = window.matchMedia('(min-width:40em) and (max-width: 1023px)');

          offset = $(tbNavItem).find(dropDown).offset();
          windowWidth = $(window).width();

          // Get window width and apply it to submenu wrapper.
          $(tbNavItem).find(dropDown).css('width', windowWidth);
          // Get distance between browser edge and beginning of submenu.
          $(tbNavItem).find(dropDown).offset({left: 0});
          // Check Data Width Attributes and apply max-widths in cases of 3 & 4 data widths.
          if (dataWidth === 4) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-3');
          } else if (dataWidth === 3) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-4');
          } else if (dataWidth === 6) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-2');
          } else if (dataWidth === 12) {
            $(tbNavItem).find('.mega-dropdown-menu').children(dropDownInner).addClass('tb-col-12');
          }
        });
      }

      /* Check the viewport and decide which behavior */
      setTBMegaMenuWidth();

      /* After resizing the browser, reset everthing, then check the viewport and decide which behavior */
      $(window).resize(setTBMegaMenuWidth);

    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*
 * This is a dupe of tb_megamenus/tb-megamenus-frontend.js after having applied
 * tb_megamenu_a11y_compatibility.patch and tb_megamenu_frontend_js_is_touch_var_fix.patch
 * with overrides at lines 92 and 112 to disable mouseover event handling in favor of clicks
 */
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($, Drupal, drupalSettings) {
  "use strict";

  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };

  Drupal.behaviors.tbMegaMenuAction = {
    attach: function (context, settings) {

      var showMenu = function ($menuItem, mm_timeout) {
        $menuItem.children('.dropdown-toggle').attr('aria-expanded', 'true');
        if ($menuItem.hasClass ('mega')) {
          $menuItem.addClass ('animating');
          clearTimeout ($menuItem.data('animatingTimeout'));
          $menuItem.data('animatingTimeout', setTimeout(function(){$menuItem.removeClass ('animating')}, mm_timeout));
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout', setTimeout(function(){$menuItem.addClass ('open')}, 100));
        } else {
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout',
              setTimeout(function(){$menuItem.addClass ('open')}, 100));
        }
      };

      var hideMenu = function ($menuItem, mm_timeout) {

        $menuItem.children('.dropdown-toggle').attr('aria-expanded', 'false');

        if ($menuItem.hasClass ('mega')) {
          $menuItem.addClass ('animating');
          clearTimeout ($menuItem.data('animatingTimeout'));
          $menuItem.data('animatingTimeout',
              setTimeout(function(){$menuItem.removeClass ('animating')}, mm_timeout));
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout', setTimeout(function(){$menuItem.removeClass ('open')}, 100));
        } else {
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout',
              setTimeout(function(){$menuItem.removeClass ('open')}, 100));
        }
      };

      var button = $(context).find('.tb-megamenu-button').once('tb-megamenu-action');
      $(button).click(function () {
        if (parseInt($(this).parent().children('.nav-collapse').height())) {
          $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
          Drupal.TBMegaMenu.displayedMenuMobile = false;
        }
        else {
          $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
          Drupal.TBMegaMenu.displayedMenuMobile = true;
        }
      });


      var isTouch = false;
      if (!isTouch) {
        $(document).ready(function ($) {
          var mm_duration = 0;
          $('.tb-megamenu', context).each(function () {
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;

          //open mega on parent focus (tabbing forward)
          $('.nav > li > .dropdown-toggle, li.mega > .dropdown-toggle', context).on('focus', function(event) {
            var $this = $(this);
            var $subMenu = $this.closest('li');

            showMenu($subMenu, mm_timeout);
            // If the focus moves outside of the subMenu, close it.
            $(document).bind('focusin', function(event) {
              if ($subMenu.has(event.target).length) {
                return;
              }
              $(document).unbind(event);
              hideMenu($subMenu, mm_timeout);
            });
          });
          //open mega on child's focus (shift-tabbing back)
          $('li.mega.level-2 > a', context).bind('focus', function(event) {
            var $this = $(this);
            var $subMenu = $this.closest('li.mega.level-1');

            showMenu($subMenu, mm_timeout);
            // If the focus moves outside of the subMenu, close it.
            $(document).bind('focusin', function(event) {
              if ($subMenu.has(event.target).length) {
                return;
              }
              $(document).unbind(event);
              hideMenu($subMenu, mm_timeout);
            });
          });

          //Store previously clicked item in menu
          var previousMenuClick;

          $(document).once('dropdown-toggle').on('click', function(event) {
            if (!$(event.target).closest('.tb-megamenu-item').length) {
              hideMenu($('li.mega.open'), mm_timeout);
            } else {
              //If the target is an A but IS a parent nav item, store its value
              //then toggle the menu shut if it's the same item as opened the menu
              if ($(event.target).is('a') && $(event.target).hasClass('dropdown-toggle')) {
                event.preventDefault();

                if (previousMenuClick === event.target && $(event.target).parent().hasClass('open')) {
                  hideMenu($(event.target).parent(), mm_timeout);
                } else {
                  showMenu($(event.target).parent(), mm_timeout);
                }
              }

              //if the click happens to be on the close icon, hideMenu
              if ($(event.target).hasClass('mega-dropdown__close')) {
                hideMenu($('li.mega.open'), mm_timeout);
              }
              //Set the previous click variable to the event target for the next click
              previousMenuClick = event.target;
            }

          });
        });
      }

      $(window).resize(function () {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if (windowWidth != Drupal.TBMegaMenu.oldWindowWidth) {
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumFormSearchHeader) {
    Drupal.rumFormSearchHeader = {};
  }

  Drupal.behaviors.rumFormSearchHeader = {
    attach: function (context, settings) {

      //header search button and form
      $('.global-search').find('input').once()
          .attr('placeholder', 'What are you looking for?')
          .on('focus', function(e){
            $('.global-search').find('.form--inline').addClass('is-active');
          })
          .on('blur', function(e){
            $('.global-search').find('.form--inline').removeClass('is-active');
          });
      $('.global-search-trigger', context).once().on('click', function(e){
        e.preventDefault();
        $('.global-search')
            .toggleClass('is-active')
            .find('input').val('');
        $('.global-search').find('.form--inline input').focus();
      });

      $('.header--mobile-menu .e-icon.icon-rum-menu').click(function(){
        $('.menu__mobile--search').find('input.form-text').attr('placeholder', ' Search');
      })

    }
  };

})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteAltHeaderStyle) {
    Drupal.agteAltHeaderStyle = {};
  }

  Drupal.behaviors.agteAltHeaderStyle = {
    attach: function(context, settings) {
      // homepage
      if($(context).find('body').hasClass('path-frontpage')) {

        var header = $(context).find('.region__header').addClass('alt-header'),
            altHead = new Waypoint({
              element: $(context).find('.page--main'),
              handler: function(direction) {
                header.toggleClass('alt-header',function() {
                  return (direction === 'up');
                });
              },
              offset: -header.outerHeight()
            });

      } // homepage
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    if (this.options.wrapper) {
      this.$element.wrap(this.options.wrapper)
    }
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass)
      if (this.options.wrapper) {
        this.$element.unwrap()
      }
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteStickyHeader) {
    Drupal.agteStickyHeader = {};
  }

  Drupal.behaviors.agteStickyHeader = {
    attach: function(context, settings) {
      var sticky = null, stickyHeader, 
      stickyTimeout, currentWidth = $(window).width();
      function stickyMenuHeader() {
        //Check if exist alert banner above nav and define the offset for menu header
        let alertStickyAnchor = $(context).find('.c-alert.c-alert--stick'),
        sumHeight = 0;
        if (alertStickyAnchor.length) {
          alertStickyAnchor.each(function (i, anchor) {
            if ($(anchor).hasClass('c-alert--above-nav')) {
              sumHeight += $(anchor).outerHeight();
            }
          });
        }
        // Sticky Header
        stickyHeader = $(context).find('.region__header');
        if ($(window).width() >= 1024) {
          sticky = new Waypoint.Sticky({
            element: stickyHeader,
            offset: sumHeight,
            handler: function(direction) {
              if (direction === 'down') {
                this.element.css('top', sumHeight);
              } else {
                this.element.css('top', 0);
              }
            }
          });
        }
      }
      stickyMenuHeader();
      $(window).resize( function(){
        if (currentWidth != $(window).width()) {
            currentWidth = $(window).width();
          if (sticky != null) {
            sticky.destroy();
          }
          clearTimeout(stickyTimeout);
          stickyTimeout = setTimeout( function() {
            stickyMenuHeader();
          },300);
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeMobileMenu) {
    Drupal.atgeMobileMenu = {};
  }

  Drupal.behaviors.atgeMobileMenu = {
    attach: function(context, settings) {

      // Set vars.
      const mobileIcon = $('.menu__mobile--header .menu-button .e-icon', context);
      const mobileBtn = $('.header--mobile-menu', context);
      const mobileContent = $('.menu__mobile--content', context);
      const mobileSearch = $('.menu__mobile--search', context);
      const searchTarget = '.menu__mobile--search .form-type-textfield';
      const searchPlaceholder = Drupal.t(' What are you looking for?');

      var mobileWidth = $(window).width();

      const themeAbbv = drupalSettings.atge_base.global.theme_abbv;

      // Init Mobile Header elements.
      function mobileMenuInit() {
        // Hide Mobile Menu Content & close submenus.
        $(mobileContent).hide();

        // Reset Icon Class.
        mobileIcon.removeClass('icon-' + themeAbbv + '-close').addClass('icon-' + themeAbbv + '-menu');

        // Reset menu status class.
        mobileContent.removeClass('mobile-menu-open').addClass('mobile-menu-closed');

        // Search Bar Updates.
        // Clear the search input and submit button values.
        mobileSearch.find('input[type="submit"], input[type="text"]').val('');

        // Remove some classes from our submit button.
        mobileSearch.find('#edit-submit-acquia-search').removeClass('button e-btn--primary');

        // Append icon markup before the submit button.
        mobileSearch.find('.form-actions').once().prepend('<span class="icon-' + themeAbbv + '-search e-icon-search"></span>');

        // Add a placeholder to the input field.
        mobileSearch.find('input').once().attr('placeholder', searchPlaceholder);

        // If the reset button is present, remove it.
        mobileSearch.find('#edit-reset').remove();

        // Update hidden label for a11y.
        mobileSearch.find('label').addClass('visually-hidden').text(Drupal.t('Mobile Search'));
        // Update hidden label and reset ids / for attributes for a11y.
        const searchId = $(searchTarget).children('input').attr('id');
        $(searchTarget).children('input').attr('id',searchId+'-2');
        $(searchTarget).children('label').attr('for',searchId+'-2');
        $(searchTarget).children('label').text('Mobile Menu Search');

        mobileWidth = $(window).width();
      }

      // Mobile Menu Open / Close Toggle.
      mobileBtn.once('mobile-menu-open').on('click', function(e) {
        e.stopPropagation();

        // Conditions for if the menu is open or not.
        if (mobileContent.hasClass('mobile-menu-closed')) {
          mobileContent.removeClass('mobile-menu-closed').addClass('mobile-menu-open');
          mobileIcon.parent().addClass('is-active');
          mobileIcon.removeClass('icon-' + themeAbbv + '-menu').addClass('icon-' + themeAbbv + '-close').addClass('is-active');
          mobileIcon.attr('aria-expanded', 'true');
          mobileContent.slideDown();
        }
        else {
          mobileContent.removeClass('mobile-menu-open').addClass('mobile-menu-closed');
          mobileIcon.parent().removeClass('is-active');
          mobileIcon.addClass('icon-' + themeAbbv + '-menu').removeClass('icon-' + themeAbbv + '-close').removeClass('is-active');
          mobileIcon.attr('aria-expanded', 'false');
          mobileContent.slideUp();
          // If the mobile menu is active and we've clicked to close, reset the
          // menu accordions.
          $('.menu__accordion--subnav-1').removeClass('menu__accordion--subnav-1--active').hide();
          $('.menu__accordion--icon:not(.no-children)').removeClass('icon-' + themeAbbv + '-minus active').addClass('icon-' + themeAbbv + '-plus');
        }

        // TODO: is there a better solution for prevent a keyboard init resize?
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && mobileWidth < 768) {
          // Disable resize on actual mobile devices.
          // Opening the keyboard on some mobile devices triggers a resize which resets mobile menu.
          $(window).off('resize');
        }
      });

      // Allow the search icon click to trigger search submit.
      mobileSearch.find('.form-actions').on('click', function(e){
        e.preventDefault();
        $(this).parents('form').trigger('submit');
      });

      // Apply a focus class to the form wrapper so that we can include the
      // search button in the a11y form field outline.
      $(searchTarget).find('input').focus(function () {
        $(this).parents('.form--inline').addClass('is-focused');
      }).blur(function () {
        $(this).parents('.form--inline').removeClass('is-focused');
      });

      // When Mobile Menu items from the main menu don't have children, have the
      // arrow trigger the link.
      $('.menu__main--mobile .menu__accordion--parent > .menu-item').once().each(function () {
        // If when uses Mobile Menu "no-link" items allow span click to trigger the link.
        $(this).find('span.menu__accordion--link').on('click touch', function () {
          $(this).parent().find('.menu__accordion--icon')[0].click();
        });
        // Else, when Mobile Menu items from the main menu don't have children, have the
        // arrow trigger the link.
        $(this).find('.menu__accordion--icon.no-children').on('click touch', function () {
          $(this).parent().find('a')[0].click();
        });
      });

      // Call mobile menu init function.
      $(window).on('load', mobileMenuInit);
      // Rerun on window resize.
      $(window).resize(mobileMenuInit);

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteAccordionMenus) {
    Drupal.agteAccordionMenus = {};
  }

  Drupal.behaviors.agteAccordionMenus = {
    attach: function(context, settings) {

      // Accordion Menu Select Vars.
      const accordionInner = '.menu__accordion--subnav-1';
      const accordionLinkTarget = '.menu__accordion--parent > .menu-item--expanded > .menu__accordion--icon';
      const accordionLinkParent = '.menu-item--expanded';
      const accordionLinkClass = '.menu__accordion--link';
      const accordionIconClass = '.menu__accordion--icon';

      // Calling Accordion Menu Function.
      Drupal.behaviors.atgeBaseGlobalFunctions.accordionMenus(accordionInner, accordionLinkTarget, accordionLinkParent, accordionLinkClass, accordionIconClass, false);

    }
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
