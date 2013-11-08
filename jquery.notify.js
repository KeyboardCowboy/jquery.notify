/**
 * jQuery Notify
 *
 * Turn page elements into iOS like notifications that drop down from the top
 * of the page.
 *
 * Author: Chris Albrecht, chris[at]162unlimited[dot]com
 * Version: 1.0.0
 * Date: 08/nov/2013
 *
 * Requires jQuery-1.7 or greater.
 */
(function ($) {
  function Notification() {};

  Notification.prototype = {
    s: {},  // Settings
    h: 0,   // Height of the notify element
    closeButton: $('<a href="#" class="close"><i class="icon-circle-arrow-up"></i></a>'),

    // Initialize
    initNotify: function(s) {
      // Merge the settings
      var defaults = {
        speedIn:   100,
        speedOut:  100,
        delayIn:   1000,
        delayOut:  5000,
        autoOpen:  true,
        autoClose: true
      };
      $.extend(this.s, defaults, s);

      // Add a close button
      this.addCloseButton();

      // Set the height
      this.h = this.outerHeight();

      // Instantiate the element
      this.setNotifyElement();

      // Execute the notifications
      this.notify();
    },

    // Add a close button
    addCloseButton: function() {
      var self = this;

      this.append(this.closeButton);

      this.closeButton.on('click', function() {
        self.clearQueue().closeNotify();
        return false;
      });
    },

    // Add the necessary css to the notification element
    setNotifyElement: function() {
      this.css({
        'position': 'fixed',
        'width': '100%',
        'top': -(this.h) + 'px',
        'left': 0
      });
    },

    // Start the natural notifications
    notify: function() {
      if (this.s.autoOpen) {
        this.delay(this.s.delayIn).openNotify();
      }

      if (this.s.autoClose) {
        this.delay(this.s.delayOut + this.s.speedIn).closeNotify();
      }
    },

    // Open the notifications
    openNotify: function(force) {
      this.animate({'top': 0}, this.s.speedIn);
    },

    // Close the notifications
    closeNotify: function(force) {
      this.animate({'top': -(this.h)}, this.s.speedOut);
    }
  };

  // Allow for bunding
  $.fn.notify = function(s) {
    var e = $(this);

    s = typeof s != 'object' ? {} : s;

    $.extend(true, e, new Notification);
    e.initNotify(s);
  };
})(jQuery);
