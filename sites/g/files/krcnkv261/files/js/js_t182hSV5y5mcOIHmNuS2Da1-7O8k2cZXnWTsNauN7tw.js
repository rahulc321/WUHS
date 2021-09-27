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
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return '<div id="' + id + '" class="progress" aria-live="polite">' + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>';
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || 'GET';
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;

    this.element = $(Drupal.theme('progressBar', id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element).find('div.progress__bar').css('width', percentage + '%');
        $(this.element).find('div.progress__percentage').html(percentage + '%');
      }
      $('div.progress__description', this.element).html(message);
      $('div.progress__label', this.element).html(label);
      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);

      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.uri) {
        var pb = this;

        var uri = this.uri;
        if (uri.indexOf('?') === -1) {
          uri += '?';
        } else {
          uri += '&';
        }
        uri += '_format=json';
        $.ajax({
          type: this.method,
          url: uri,
          data: '',
          dataType: 'json',
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(progress.percentage, progress.message, progress.label);

            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError('<pre>' + e.message + '</pre>');
          }
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(string);
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    }
  });
})(jQuery, Drupal);;
var loadjs = (function () {
  /**
   * Global dependencies.
   * @global {Object} document - DOM
   */

  var devnull = function() {},
    bundleIdCache = {},
    bundleResultCache = {},
    bundleCallbackQueue = {};


  /**
   * Subscribe to bundle load event.
   * @param {string[]} bundleIds - Bundle ids
   * @param {Function} callbackFn - The callback function
   */
  function subscribe(bundleIds, callbackFn) {
    // listify
    bundleIds = bundleIds.push ? bundleIds : [bundleIds];

    var depsNotFound = [],
      i = bundleIds.length,
      numWaiting = i,
      fn,
      bundleId,
      r,
      q;

    // define callback function
    fn = function (bundleId, pathsNotFound) {
      if (pathsNotFound.length) depsNotFound.push(bundleId);

      numWaiting--;
      if (!numWaiting) callbackFn(depsNotFound);
    };

    // register callback
    while (i--) {
      bundleId = bundleIds[i];

      // execute callback if in result cache
      r = bundleResultCache[bundleId];
      if (r) {
        fn(bundleId, r);
        continue;
      }

      // add to callback queue
      q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
      q.push(fn);
    }
  }


  /**
   * Publish bundle load event.
   * @param {string} bundleId - Bundle id
   * @param {string[]} pathsNotFound - List of files not found
   */
  function publish(bundleId, pathsNotFound) {
    // exit if id isn't defined
    if (!bundleId) return;

    var q = bundleCallbackQueue[bundleId];

    // cache result
    bundleResultCache[bundleId] = pathsNotFound;

    // exit if queue is empty
    if (!q) return;

    // empty callback queue
    while (q.length) {
      q[0](bundleId, pathsNotFound);
      q.splice(0, 1);
    }
  }


  /**
   * Load individual file.
   * @param {string} path - The file path
   * @param {Function} callbackFn - The callback function
   */
  function loadFile(path, callbackFn, args, numTries) {
    var doc = document,
      async = args.async,
      maxTries = (args.numRetries || 0) + 1,
      beforeCallbackFn = args.before || devnull,
      isCss,
      e;

    numTries = numTries || 0;

    if (/(^css!|\.css$)/.test(path)) {
      isCss = true;

      // css
      e = doc.createElement('link');
      e.rel = 'stylesheet';
      e.href = path.replace(/^css!/, '');  // remove "css!" prefix
    } else {
      // javascript
      e = doc.createElement('script');
      e.src = path;
      e.async = async === undefined ? true : async;
    }

    e.onload = e.onerror = e.onbeforeload = function (ev) {
      var result = ev.type[0];

      // Note: The following code isolates IE using `hideFocus` and treats empty
      // stylesheets as failures to get around lack of onerror support
      if (isCss && 'hideFocus' in e) {
        try {
          if (!e.sheet.cssText.length) result = 'e';
        } catch (x) {
          // sheets objects created from load errors don't allow access to
          // `cssText`
          result = 'e';
        }
      }

      // handle retries in case of load failure
      if (result == 'e') {
        // increment counter
        numTries += 1;

        // exit function and try again
        if (numTries < maxTries) {
          return loadFile(path, callbackFn, args, numTries);
        }
      }

      // execute callback
      callbackFn(path, result, ev.defaultPrevented);
    };

    // add to document (unless callback returns `false`)
    if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
  }


  /**
   * Load multiple files.
   * @param {string[]} paths - The file paths
   * @param {Function} callbackFn - The callback function
   */
  function loadFiles(paths, callbackFn, args) {
    // listify paths
    paths = paths.push ? paths : [paths];

    var numWaiting = paths.length,
      x = numWaiting,
      pathsNotFound = [],
      fn,
      i;

    // define callback function
    fn = function(path, result, defaultPrevented) {
      // handle error
      if (result == 'e') pathsNotFound.push(path);

      // handle beforeload event. If defaultPrevented then that means the load
      // will be blocked (ex. Ghostery/ABP on Safari)
      if (result == 'b') {
        if (defaultPrevented) pathsNotFound.push(path);
        else return;
      }

      numWaiting--;
      if (!numWaiting) callbackFn(pathsNotFound);
    };

    // load scripts
    for (i=0; i < x; i++) loadFile(paths[i], fn, args);
  }


  /**
   * Initiate script load and register bundle.
   * @param {(string|string[])} paths - The file paths
   * @param {(string|Function)} [arg1] - The bundleId or success callback
   * @param {Function} [arg2] - The success or error callback
   * @param {Function} [arg3] - The error callback
   */
  function loadjs(paths, arg1, arg2) {
    var bundleId,
      args;

    // bundleId (if string)
    if (arg1 && arg1.trim) bundleId = arg1;

    // args (default is {})
    args = (bundleId ? arg2 : arg1) || {};

    // throw error if bundle is already defined
    if (bundleId) {
      if (bundleId in bundleIdCache) {
        throw "LoadJS";
      } else {
        bundleIdCache[bundleId] = true;
      }
    }

    // load scripts
    loadFiles(paths, function (pathsNotFound) {
      // success and error callbacks
      if (pathsNotFound.length) (args.error || devnull)(pathsNotFound);
      else (args.success || devnull)();

      // publish bundle load event
      publish(bundleId, pathsNotFound);
    }, args);
  }


  /**
   * Execute callbacks when dependencies have been satisfied.
   * @param {(string|string[])} deps - List of bundle ids
   * @param {Object} args - success/error arguments
   */
  loadjs.ready = function ready(deps, args) {
    // subscribe to bundle load event
    subscribe(deps, function (depsNotFound) {
      // execute callbacks
      if (depsNotFound.length) (args.error || devnull)(depsNotFound);
      else (args.success || devnull)();
    });

    return loadjs;
  };


  /**
   * Manually satisfy bundle dependencies.
   * @param {string} bundleId - The bundle id
   */
  loadjs.done = function done(bundleId) {
    publish(bundleId, []);
  };


  /**
   * Reset loadjs dependencies statuses
   */
  loadjs.reset = function reset() {
    bundleIdCache = {};
    bundleResultCache = {};
    bundleCallbackQueue = {};
  };


  /**
   * Determine if bundle has already been defined
   * @param String} bundleId - The bundle id
   */
  loadjs.isDefined = function isDefined(bundleId) {
    return bundleId in bundleIdCache;
  };


// export
  return loadjs;

})();
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function ($, window, Drupal, drupalSettings, loadjs) {
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];
        if (typeof elementSettings.selector === 'undefined') {
          elementSettings.selector = '#' + base;
        }
        $(elementSettings.selector).once('drupal-ajax').each(function () {
          elementSettings.element = this;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });

      Drupal.ajax.bindAjaxLinks(document.body);

      $('.use-ajax-submit').once('ajax').each(function () {
        var elementSettings = {};

        elementSettings.url = $(this.form).attr('action');

        elementSettings.setClick = true;

        elementSettings.event = 'click';

        elementSettings.progress = { type: 'throbber' };
        elementSettings.base = $(this).attr('id');
        elementSettings.element = this;

        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    }
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode = void 0;
    var statusText = void 0;
    var responseText = void 0;
    if (xmlhttp.status) {
      statusCode = '\n' + Drupal.t('An AJAX HTTP error occurred.') + '\n' + Drupal.t('HTTP Result Code: !status', {
        '!status': xmlhttp.status
      });
    } else {
      statusCode = '\n' + Drupal.t('An AJAX HTTP request terminated abnormally.');
    }
    statusCode += '\n' + Drupal.t('Debugging information follows.');
    var pathText = '\n' + Drupal.t('Path: !uri', { '!uri': uri });
    statusText = '';

    try {
      statusText = '\n' + Drupal.t('StatusText: !statusText', {
        '!statusText': $.trim(xmlhttp.statusText)
      });
    } catch (e) {}

    responseText = '';

    try {
      responseText = '\n' + Drupal.t('ResponseText: !responseText', {
        '!responseText': $.trim(xmlhttp.responseText)
      });
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    responseText = responseText.replace(/[\n]+\s+/g, '\n');

    var readyStateText = xmlhttp.status === 0 ? '\n' + Drupal.t('ReadyState: !readyState', {
      '!readyState': xmlhttp.readyState
    }) : '';

    customMessage = customMessage ? '\n' + Drupal.t('CustomMessage: !customMessage', {
      '!customMessage': customMessage
    }) : '';

    this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;

    this.name = 'AjaxError';
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error('Drupal.ajax() function must be called with one configuration object only');
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);

    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return instance && instance.element !== false && !document.body.contains(instance.element);
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    $(element).find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
      var $linkElement = $(ajaxLink);

      var elementSettings = {
        progress: { type: 'throbber' },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }
      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? 'mousedown' : null,
      keypress: true,
      selector: base ? '#' + base : null,
      effect: 'none',
      speed: 'none',
      method: 'replaceWith',
      progress: {
        type: 'throbber',
        message: Drupal.t('Please wait...')
      },
      submit: {
        js: true
      }
    };

    $.extend(this, defaults, elementSettings);

    this.ajaxDeferred = null;

    this.commands = new Drupal.AjaxCommands();

    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = '#' + this.wrapper;
    }

    this.element = element;

    this.element_settings = elementSettings;

    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);
      if ($element.is('a')) {
        this.url = $element.attr('href');
      } else if (this.element && element.form) {
        this.url = this.$form.attr('action');
      }
    }

    var originalUrl = this.url;

    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;

    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === 'string') {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
            var customMessage = Drupal.t('The response failed verification so will not be processed.');
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        if (ajax.ajaxDeferred !== null && ajax.ajaxDeferred.then !== null && _typeof(ajax.ajaxDeferred) === 'object' && typeof ajax.ajaxDeferred.then === 'function') {
          ajax.ajaxDeferred.then(function () {
            ajax.ajaxing = false;
          });
        } else {
          ajax.ajaxing = false;
        }

        if (status === 'error' || status === 'parsererror') {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },

      dataType: 'json',
      jsonp: false,
      type: 'POST'
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf('?') === -1) {
      ajax.options.url += '?';
    } else {
      ajax.options.url += '&';
    }

    var wrapper = 'drupal_' + (elementSettings.dialogType || 'ajax');
    if (elementSettings.dialogRenderer) {
      wrapper += '.' + elementSettings.dialogRenderer;
    }
    ajax.options.url += Drupal.ajax.WRAPPER_FORMAT + '=' + wrapper;

    $(ajax.element).on(elementSettings.event, function (event) {
      if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) {
        throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
          '!url': ajax.url
        }));
      }
      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on('keypress', function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';

  Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);

      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + this.options.url + ': ' + e.message);

      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();

    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + ajax.options.url + ': ' + e.message);
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;

    var pageState = drupalSettings.ajaxPageState;
    options.data['ajax_page_state[theme]'] = pageState.theme;
    options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
    options.data['ajax_page_state[libraries]'] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};

      options.extraData.ajax_iframe_upload = '1';

      var v = $.fieldValue(this.element);
      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop('disabled', true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = 'setProgressIndicator' + this.progress.type.slice(0, 1).toUpperCase() + this.progress.type.slice(1).toLowerCase();
    if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
    var throbber = '<div class="throbber">&nbsp;</div>';

    return '<div class="ajax-progress ajax-progress-throbber">' + throbber + messageMarkup + '</div>';
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return '<div class="message">' + message + '</div>';
  };

  Drupal.theme.ajaxProgressBar = function ($element) {
    return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar('ajax-progress-' + this.element.id, $.noop, this.progress.method, $.noop);
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
    $('body').append(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    var ajaxDeferred = $.Deferred();
    this.ajaxDeferred = ajaxDeferred.promise();

    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }
    $(this.element).prop('disabled', false);

    var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();

    var focusChanged = false;
    var responseKeys = Object.keys(response);
    responseKeys.reduce(function (deferredCommand, key) {
      return deferredCommand.then(function () {
        var command = response[key].command;
        if (command && _this.commands[command]) {
          if (command === 'invoke' && response[key].method === 'focus') {
            focusChanged = true;
          }

          return _this.commands[command](_this, response[key], status);
        }
      });
    }, $.Deferred().resolve()).then(function () {
      if (!focusChanged && _this.element && !$(_this.element).data('disable-refocus')) {
        var target = false;

        for (var n = elementParents.length - 1; !target && n >= 0; n--) {
          target = document.querySelector('[data-drupal-selector="' + elementParents[n].getAttribute('data-drupal-selector') + '"]');
        }

        if (target) {
          $(target).trigger('focus');
        }
      }

      if (_this.$form && document.body.contains(_this.$form.get(0))) {
        var settings = _this.settings || drupalSettings;
        Drupal.attachBehaviors(_this.$form.get(0), settings);
      }

      _this.settings = null;

      ajaxDeferred.resolve();
    });
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;

    var effect = {};
    if (type === 'none') {
      effect.showEffect = 'show';
      effect.hideEffect = 'hide';
      effect.showSpeed = '';
    } else if (type === 'fade') {
      effect.showEffect = 'fadeIn';
      effect.hideEffect = 'fadeOut';
      effect.showSpeed = speed;
    } else {
      effect.showEffect = type + 'Toggle';
      effect.hideEffect = type + 'Toggle';
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();

    $(this.element).prop('disabled', false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }
    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function (i) {
      return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent));
    }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $('<div></div>').append($elements);
  };

  Drupal.AjaxCommands = function () {};
  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);

      var settings = response.settings || ajax.settings || drupalSettings;

      var $newContent = $($.parseHTML(response.data, document, true));

      $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);

      switch (method) {
        case 'html':
        case 'replaceWith':
        case 'replaceAll':
        case 'empty':
        case 'remove':
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;
        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== 'show') {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find('.ajax-new-content');
      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== 'show') {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents('html').length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector).each(function () {
        Drupal.detachBehaviors(this, settings);
      }).remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);
      if (!$element.hasClass('ajax-changed')) {
        $element.addClass('ajax-changed');
        if (response.asterisk) {
          $element.find(response.asterisk).append(' <abbr class="ajax-changed" title="' + Drupal.t('Changed') + '">*</abbr> ');
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text, response.title);
    },
    announce: function announce(ajax, response) {
      if (response.priority) {
        Drupal.announce(response.text, response.priority);
      } else {
        Drupal.announce(response.text);
      }
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {

          if (instance.selector) {
            var selector = instance.selector.replace('#', '');
            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply($element, _toConsumableArray(response.args));
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
    },
    update_build_id: function update_build_id(ajax, response, status) {
      $('input[name="form_build_id"][value="' + response.old + '"]').val(response.new);
    },
    add_css: function add_css(ajax, response, status) {
      $('head').prepend(response.data);
    },
    message: function message(ajax, response) {
      var messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
      if (response.clearPrevious) {
        messages.clear();
      }
      messages.add(response.message, response.messageOptions);
    },
    add_js: function add_js(ajax, response) {
      var deferred = $.Deferred();
      var parentEl = document.querySelector(response.selector || 'body');
      var settings = ajax.settings || drupalSettings;
      var scriptsSrc = response.data.map(function (script) {
        var uniqueBundleID = script.src + ajax.instanceIndex;
        loadjs(script.src, uniqueBundleID, {
          async: !!script.async,
          before: function before(path, scriptEl) {
            if (script.defer) {
              scriptEl.defer = true;
            }

            if (response.method === 'insertBefore') {
              parentEl.insertBefore(scriptEl, parentEl.firstChild);
            } else {
              parentEl[response.method](scriptEl);
            }

            return false;
          }
        });
        return uniqueBundleID;
      });
      loadjs.ready(scriptsSrc, {
        success: function success() {
          Drupal.attachBehaviors(parentEl, settings);
          deferred.resolve();
        }
      });
      return deferred.promise();
    }
  };
})(jQuery, window, Drupal, drupalSettings, loadjs);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  Drupal.theme.ajaxProgressBar = function ($element) {
    return $element.addClass('ajax-progress ajax-progress-bar');
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos !== -1) {
      query = query.substring(pos + 1);
    }
    var pair = void 0;
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split('=');

      if (pair[0] !== 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);

    var viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);

    if (viewHref && path.substring(0, viewHref.length + 1) === viewHref + '/') {
      returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
      returnObj.view_path = path;
    }
    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;

      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };
  Drupal.behaviors.ViewsAjaxView.detach = function (context, settings, trigger) {
    if (trigger === 'unload') {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;

        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = '.js-view-dom-id-' + ajaxViews[i].view_dom_id;
          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};

  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = '.js-view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf('Array') !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || '';
    if (queryString !== '') {
      queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        queryString = (/\?/.test(ajaxPath) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: { type: 'fullscreen' }
    };

    this.settings = settings;

    this.$exposed_form = $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once('exposed-form').each($.proxy(this.attachExposedFormAjax, this));

    this.$view.filter($.proxy(this.filterNestedViews, this)).once('ajax-pager').each($.proxy(this.attachPagerAjax, this));

    var selfSettings = $.extend({}, this.element_settings, {
      event: 'RefreshView',
      base: this.selector,
      element: this.$view.get(0)
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];

    $('input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var selfSettings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
    });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents('.view').length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');

    $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();

    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 * better_exposed_filters.js
 *
 * Provides some client-side functionality for the Better Exposed Filters module.
 */

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.betterExposedFilters = {
    attach: function (context, settings) {
      // Add highlight class to checked checkboxes for better theming.
      $('.bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]')
        // Highlight newly selected checkboxes.
        .change(function () {
          _bef_highlight(this, context);
        })
        .filter(':checked').closest('.form-item', context).addClass('highlight');
    }
  };

  /*
   * Helper functions
   */

  /**
   * Adds/Removes the highlight class from the form-item div as appropriate.
   */
  function _bef_highlight(elem, context) {
    $elem = $(elem, context);
    $elem.attr('checked')
      ? $elem.closest('.form-item', context).addClass('highlight')
      : $elem.closest('.form-item', context).removeClass('highlight');
  }

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * bef_select_all_none.js
 *
 * Adds select all/none toggle functionality to an exposed filter.
 */

(function ($) {
  Drupal.behaviors.betterExposedFiltersSelectAllNone = {
    attach: function (context) {
      /*
       * Add Select all/none links to specified checkboxes
       */
      var selected = $('.form-checkboxes.bef-select-all-none:not(.bef-processed)');
      if (selected.length) {
        var selAll = Drupal.t('Select All');
        var selNone = Drupal.t('Select None');

        // Set up a prototype link and event handlers.
        var link = $('<a class="bef-toggle" href="#">' + selAll + '</a>')
        link.click(function (event) {
          // Don't actually follow the link...
          event.preventDefault();
          event.stopPropagation();

          if (selAll == $(this).text()) {
            // Select all the checkboxes.
            $(this)
              .html(selNone)
              .siblings('.bef-select-all-none, .bef-tree')
              .find('input:checkbox').each(function () {
                $(this).prop('checked', true);
                // @TODO:
                // _bef_highlight(this, context);
              })
              .end()

              // attr() doesn't trigger a change event, so we do it ourselves. But just on
              // one checkbox otherwise we have many spinning cursors.
              .find('input[type=checkbox]:first').change();
          }
          else {
            // Unselect all the checkboxes.
            $(this)
              .html(selAll)
              .siblings('.bef-select-all-none, .bef-tree')
              .find('input:checkbox').each(function () {
                $(this).prop('checked', false);
                // @TODO:
                // _bef_highlight(this, context);
              })
              .end()

              // attr() doesn't trigger a change event, so we do it ourselves. But just on
              // one checkbox otherwise we have many spinning cursors.
              .find('input[type=checkbox]:first').change();
          }
        });

        // Add link to the page for each set of checkboxes.
        selected
          .addClass('bef-processed')
          .each(function (index) {
            // Clone the link prototype and insert into the DOM.
            var newLink = link.clone(true);

            newLink.insertBefore($(this));

            // If all checkboxes are already checked by default then switch to Select None.
            if ($('input:checkbox:checked', this).length == $('input:checkbox', this).length) {
              newLink.text(selNone);
            }
          });
      }

      // @TODO:
      // Add highlight class to checked checkboxes for better theming
      // $('.bef-tree input[type="checkbox"], .bef-checkboxes input[type="checkbox"]')
      // Highlight newly selected checkboxes
      //  .change(function () {
      //    _bef_highlight(this, context);
      //  })
      //  .filter(':checked').closest('.form-item', context).addClass('highlight')
      // ;
      // @TODO: Put this somewhere else...
      // Check for and initialize datepickers
      // if (Drupal.settings.better_exposed_filters.datepicker) {
      //  // Note: JavaScript does not treat "" as null
      //  if (Drupal.settings.better_exposed_filters.datepicker_options.dateformat) {
      //    $('.bef-datepicker').datepicker({
      //      dateFormat: Drupal.settings.better_exposed_filters.datepicker_options.dateformat
      //    });
      //  }
      //  else {
      //    $('.bef-datepicker').datepicker();
      //  }
      // }
    }                   // attach: function() {
  };                    // Drupal.behaviors.better_exposed_filters = {.

  Drupal.behaviors.betterExposedFiltersAllNoneNested = {
    attach:function (context, settings) {
      $('.bef-select-all-none-nested li').has('ul').once('bef-all-none-nested').each(function () {
        var $this = $(this);
        // Check/uncheck child terms along with their parent.
        $this.find('input:checkbox:first').change(function () {
          $(this).closest('li').find('ul li input:checkbox').prop('checked', this.checked);
        });

        // When a child term is checked or unchecked, set the parent term's
        // status as needed.
        $this.find('ul input:checkbox').change(function () {
          // Determine the number of unchecked sibling checkboxes.
          var $this = $(this);
          var uncheckedSiblings = $this.closest('li').siblings('li').find('> div > input:checkbox:not(:checked)').length;

          // If this term or any siblings are unchecked, uncheck the parent and
          // all ancestors.
          if (uncheckedSiblings || !this.checked) {
            $this.parents('ul').siblings('div').find('input:checkbox').prop('checked', false);
          }

          // If this and all sibling terms are checked, check the parent. Then
          // trigger the parent's change event to see if that change affects the
          // grandparent's checked state.
          if (this.checked && !uncheckedSiblings) {
            $(this).closest('ul').closest('li').find('input:checkbox:first').prop('checked', true).change();
          }
        });
      });
    }
  }

})(jQuery);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAnalyticsFilterSearch) {
    Drupal.atgeAnalyticsFilterSearch = {};
  }

  // Analytics for Better Exposed Filters
  Drupal.behaviors.atgeAnalyticsFilterSearch = {
    attach: function (context, settings) {
      const searchList = $('h1:first').text().trim();
      const formInput = $('.bef-exposed-form').find('.form-text');
      const viewHeader = $('.view-header');
      let resultCount = 0;

      if ($('.view-header').length) {
        // Get the total count from results summary. If not available, get results on page.
        resultCount = $('.view-header')[0].innerText ?
          $('.view-header')[0].innerText : $('.view-content').children().length;

        // Remove text that can appear after number of results
        if (resultCount.indexOf(' ') >= 0) {
          resultCount = resultCount.substr(0,resultCount.indexOf(' '));
        }
      }

      // If keyword is supplied, push to GA
      if (formInput.val()) {
        Drupal.behaviors.atgeAnalytics.searchClick(formInput.val(), resultCount, searchList);
      }

      $('.bef-exposed-form').on('submit',function () {
        const form = $(this);
        const checkboxArray = form.find('.form-type-checkbox input');
        const filtersSelected = [];

        // Put checked filters in array
        $.each(checkboxArray, function() {
          if ($(this).prop('checked') === true) {
            filtersSelected.push($(this).prop('labels')[0].innerHTML)
          }
        });

        // If filters checked, push to GA
        if (Array.isArray(filtersSelected) && filtersSelected.length) {
          Drupal.behaviors.atgeAnalytics.searchFilter('', filtersSelected.toString(), searchList);
        }
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";if("undefined"!=typeof window){var e=window.$||window.jQuery||window.Zepto;e&&(e.fn.shave=function(e,t){return function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw Error("maxHeight is required");var i="string"==typeof e?document.querySelectorAll(e):e;if(i){var o=n.character||"…",a=n.classname||"js-shave",r="boolean"!=typeof n.spaces||n.spaces,s='<span class="js-shave-char">'.concat(o,"</span>");"length"in i||(i=[i]);for(var c=0;c<i.length;c+=1){var d=i[c],h=d.style,f=d.querySelector(".".concat(a)),l=void 0===d.textContent?"innerText":"textContent";f&&(d.removeChild(d.querySelector(".js-shave-char")),d[l]=d[l]);var u=d[l],v=r?u.split(" "):u;if(!(v.length<2)){var g=h.height;h.height="auto";var p=h.maxHeight;if(h.maxHeight="none",d.offsetHeight<=t)h.height=g,h.maxHeight=p;else{for(var m=v.length-1,y=0,j=void 0;y<m;)j=y+m+1>>1,d[l]=r?v.slice(0,j).join(" "):v.slice(0,j),d.insertAdjacentHTML("beforeend",s),d.offsetHeight>t?m=r?j-1:j-2:y=j;d[l]=r?v.slice(0,m).join(" "):v.slice(0,m),d.insertAdjacentHTML("beforeend",s);var x=r?" ".concat(v.slice(m).join(" ")):v.slice(m),w=document.createTextNode(x),H=document.createElement("span");H.classList.add(a),H.style.display="none",H.appendChild(w),d.insertAdjacentElement("beforeend",H),h.height=g,h.maxHeight=p}}}}}(this,e,t),this})}});
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumGridComponentTruncator) {
    Drupal.rumGridComponentTruncator = {};
  }

  Drupal.behaviors.rumGridComponentTruncator = {
    attach: function(context, settings) {

      const container = '.t-content-type__grid';
      const target = '.t-content-type__grid--content .t-content-type__grid--body';
      const height = 208;
      const offset = '.t-content-type__grid--title';
      const extra = 20;

      Drupal.behaviors.atgeBaseGlobalFunctions.truncator(container, target, height, offset, extra);

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
