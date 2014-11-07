/*!
 * jQuery DependsOn Plugin v0.1
 * https://github.com/jcrombez/jquery-depends-on
 */
(function ($) {
	$.fn.dependsOn = function (parameters) {
		this.each(function () {
			var dependingElement = $(this);
			var elementToToggle = parameters.elementToToggle ? parameters.elementToToggle : dependingElement;

			dependingElement.bind('dependency-update', function () {
				var required = $(this).attr('required') == 'required';

				if (checkDependencies(parameters.dependencies)) {
					elementToToggle.slideDown();

					if (required) {
						dependingElement.attr('required', 'required');
					}
				} else {
					elementToToggle.slideUp();

					if (required) {
						dependingElement.removeAttr('required');
					}
				}
			});

			if (!parameters.dependencies) {
				return;
			}

			for (var i in parameters.dependencies) {
				var dependency = parameters.dependencies[i];

				if (!dependency.element || !dependency.value) {
					return;
				}

				dependency.element.each(function () {
					$(this).change({dependingElement: dependingElement}, function (e) {
						if (($(this).attr('type') === 'radio' && $(this).is(':checked')) || $(this).attr('type') !== 'radio') {
							e.data.dependingElement.trigger('dependency-update');
						}
					});
				});
			}

			dependingElement.trigger('dependency-update');

			function checkDependencies(dependencies) {
				var check = true;

				for (var i in dependencies) {
					var dependency = dependencies[i];
					check = checkDependency(dependency.element, dependency.value) && check;

					if (!check) {
						break;
					}
				}

				return check;
			}

			function checkDependency(dependencyElement, dependencyValue) {
				var check = true;

				dependencyElement.each(function () {
					if (!check) {
						return;
					}

					var element = $(this);

					if ((element.attr('type') === 'radio' && element.is(':checked')) || element.attr('type') !== 'radio') {
						if (
							dependencyValue instanceof Array &&
								jQuery.inArray(element.val(), dependencyValue) > -1
							) {
							check = true;
						} else if (
							typeof dependencyValue == 'string' &&
								element.val() == dependencyValue
							) {
							check = true;
						} else {
							check = false;
						}
					}
				});

				return check;
			}
		});

		return this;
	};
})(jQuery);
