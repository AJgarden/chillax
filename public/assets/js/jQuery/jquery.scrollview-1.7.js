/*!
 * scrollview.js alpha v1.6
 * @copyright 2018 AJgarden
 * ##### Author: Jia #####
 * ##### Update: 2018/12/10 #####
 */

$.fn.scrollView = function (options) {
  var $selector = $(this)

  if (options === 'destroy') {
    $selector.removeAttr('data-scroll-view')
  } else {
    $selector.attr('data-scroll-view', 'init')

    var defaults = {
      start: 'default', // 'default'(string), selector(string) or px(integer)
      end: null,
      // null: until the bottom of page
      // selector(string): until the top or bottom of direct element
      // px(integer): until the direct px
      // only avaliable with repeat be true
      endKey: 'bottom',
      // 'top': the end point will be top of the end selector element
      // 'bottom': the end point will be bottom of the end selector element
      // float number(number): the end point will be position of the end selector element's percentage height
      // only avaliable with end be selector
      threshold: -200, // px(integer)
      addClass: 'scroll-view', // (string)
      repeat: false, // true or false
      onInit: function (element) {
        return false
      }, // callback(function) when element is initialized
      onChange: function (element) {
        return false
      }, // callback(function) when change status everytime
      onChangeAtStart: function (element) {
        return false
      }, // callback(function) when change status at start point
      onChangeAtEnd: function (element) {
        return false
      }, // callback(function) when change status at end point
      onAddClass: function (element) {
        return false
      }, // callback(function) after class added everytime
      onAddClassAtStart: function (element) {
        return false
      }, // callback(function) after class added at start point
      onAddClassAtEnd: function (element) {
        return false
      }, // callback(function) after class added at end point
      onRemoveClass: function (element) {
        return false
      }, // callback(function) after class removed everytime
      onRemoveClassAtStart: function (element) {
        return false
      }, // callback(function) after class removed at start point
      onRemoveClassAtEnd: function (element) {
        return false
      } // callback(function) after class removed at end point
    }
    var settings = $.extend({}, defaults, options)

    $selector.each(function (i, element) {
      var $this = $(element)
      settings.onInit.call(this, $this)
    })

    var currentTops = $selector.map(() => 0)

    $(window)
      .on('scroll', function () {
        var scrollTop = $(window).scrollTop()

        $selector.each(function (i, element) {
          if ($selector.attr('data-scroll-view') === 'init') {
            var $this = $(element)
            if ($this.hasClass(settings.addClass) === false) {
              if (settings.start === 'default') var pos = $this.offset().top - $(window).height()
              else if (typeof settings.start === 'string')
                var pos = $(settings.start).offset().top - $(window).height()
              else var pos = settings.start
              var pos = Math.max(pos, 1)
              if (settings.repeat === true) {
                if (settings.end !== null) {
                  if (typeof settings.end === 'string') {
                    if (settings.endKey === 'top')
                      var posE = $(settings.end).offset().top - $(window).height()
                    else if (typeof settings.endKey === 'number')
                      var posE =
                        $(settings.end).offset().top +
                        $(settings.end).outerHeight() * settings.endKey -
                        $(window).height()
                    else
                      var posE =
                        $(settings.end).offset().top +
                        $(settings.end).outerHeight() -
                        $(window).height()
                  } else {
                    var posE = settings.end
                  }
                  var posE = Math.min(posE, $(document).height() - 1)
                  if (scrollTop + settings.threshold >= pos && currentTops[i] < pos) {
                    $this.addClass(settings.addClass)
                    if (typeof settings.onAddClassAtStart === 'function') {
                      settings.onAddClassAtStart.call(this, $this)
                    }
                    if (typeof settings.onAddClass === 'function') {
                      settings.onAddClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtStart === 'function') {
                      settings.onChangeAtStart.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  } else if (scrollTop + settings.threshold <= posE && currentTops[i] > posE) {
                    $this.addClass(settings.addClass)
                    if (typeof settings.onAddClassAtEnd === 'function') {
                      settings.onAddClassAtEnd.call(this, $this)
                    }
                    if (typeof settings.onAddClass === 'function') {
                      settings.onAddClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtEnd === 'function') {
                      settings.onChangeAtEnd.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  }
                } else {
                  if (scrollTop + settings.threshold >= pos && currentTops[i] < pos) {
                    $this.addClass(settings.addClass)
                    if (typeof settings.onAddClassAtStart === 'function') {
                      settings.onAddClassAtStart.call(this, $this)
                    }
                    if (typeof settings.onAddClass === 'function') {
                      settings.onAddClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtStart === 'function') {
                      settings.onChangeAtStart.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  }
                }
              } else {
                if (scrollTop + settings.threshold >= pos) {
                  $this.addClass(settings.addClass)
                  if (typeof settings.onAddClassAtStart === 'function') {
                    settings.onAddClassAtStart.call(this, $this)
                  }
                  if (typeof settings.onAddClass === 'function') {
                    settings.onAddClass.call(this, $this)
                  }
                  if (typeof settings.onChangeAtStart === 'function') {
                    settings.onChangeAtStart.call(this, $this)
                  }
                  if (typeof settings.onChange === 'function') {
                    settings.onChange.call(this, $this)
                  }
                }
              }
            } else {
              if (settings.repeat === true) {
                if (settings.start === 'default') var pos = $this.offset().top - $(window).height()
                else if (typeof settings.start === 'string')
                  var pos = $(settings.start).offset().top - $(window).height()
                else var pos = settings.start
                var pos = Math.max(pos, 1)
                if (settings.end !== null) {
                  if (typeof settings.end === 'string') {
                    if (settings.endKey == 'top')
                      var posE = $(settings.end).offset().top - $(window).height()
                    else if (typeof settings.endKey === 'number')
                      var posE =
                        $(settings.end).offset().top +
                        $(settings.end).outerHeight() * settings.endKey -
                        $(window).height()
                    else
                      var posE =
                        $(settings.end).offset().top +
                        $(settings.end).outerHeight() -
                        $(window).height()
                  } else {
                    var posE = settings.end
                  }
                  var posE = Math.min(posE, $(document).height() - 1)
                  if (scrollTop + settings.threshold < pos && currentTops[i] >= pos) {
                    $this.removeClass(settings.addClass)
                    if (typeof settings.onRemoveClassAtStart === 'function') {
                      settings.onRemoveClassAtStart.call(this, $this)
                    }
                    if (typeof settings.onRemoveClass === 'function') {
                      settings.onRemoveClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtStart === 'function') {
                      settings.onChangeAtStart.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  } else if (scrollTop + settings.threshold > posE && currentTops[i] <= posE) {
                    $this.removeClass(settings.addClass)
                    if (typeof settings.onRemoveClassAtEnd === 'function') {
                      settings.onRemoveClassAtEnd.call(this, $this)
                    }
                    if (typeof settings.onRemoveClass === 'function') {
                      settings.onRemoveClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtEnd === 'function') {
                      settings.onChangeAtEnd.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  }
                } else {
                  if (scrollTop + settings.threshold > posE && currentTops[i] <= posE) {
                    $this.removeClass(settings.addClass)
                    if (typeof settings.onRemoveClassAtEnd === 'function') {
                      settings.onRemoveClassAtEnd.call(this, $this)
                    }
                    if (typeof settings.onRemoveClass === 'function') {
                      settings.onRemoveClass.call(this, $this)
                    }
                    if (typeof settings.onChangeAtEnd === 'function') {
                      settings.onChangeAtEnd.call(this, $this)
                    }
                    if (typeof settings.onChange === 'function') {
                      settings.onChange.call(this, $this)
                    }
                  }
                }
              }
            }
            currentTops[i] = scrollTop
          }
        })
      })
      .trigger('scroll')

    $(window).on('resize', function () {
      $(this).trigger('scroll')
    })
  }
}
